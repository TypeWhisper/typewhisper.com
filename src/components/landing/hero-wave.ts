import {
  calmLevel,
  clamp01,
  createColumns,
  easeInOutCubic,
  easeOutCubic,
  lerp,
  mixColor,
  mulberry32,
  observeTheme,
  prepareCanvas,
  readPalette,
  speechLevel,
  spring,
  traceBar,
  updateBoost,
  type WaveColumn,
  type WavePalette,
} from "./wave-math";

/** What the hero is doing right now, mirrored in the small status label. */
export type HeroWavePhase = "listening" | "typing" | "done";

export interface HeroWaveElements {
  /** Positioned element the canvas covers completely. */
  host: HTMLElement;
  canvas: HTMLCanvasElement;
  /** The real headline. It stays in the DOM and is only faded by opacity. */
  title: HTMLElement;
  /** Zero-size inline-block at the end of the headline, marks the baseline. */
  baseline: HTMLElement;
  /** Spacer beneath the headline where the resting waveform line lives. */
  line: HTMLElement;
}

interface Particle {
  /** Final horizontal center. */
  x: number;
  /** Index of the waveform bar this particle starts in. */
  source: number;
  /** Final vertical center and height. Unused for the resting bar. */
  centerY: number;
  height: number;
  /** True for a piece of a glyph, false for the bar that stays a waveform. */
  glyph: boolean;
  /** Start offsets inside the morph and inside the rewind, in seconds. */
  delay: number;
  rewindDelay: number;
}

interface Layout {
  width: number;
  height: number;
  text: string;
  columns: WaveColumn[];
  particles: Particle[];
  /** Bar widths of the waveform and of the glyph pieces. */
  waveBar: number;
  glyphBar: number;
  midY: number;
  lineY: number;
  waveMax: number;
  calmMax: number;
  /** Time until the last particle has landed. */
  morphDuration: number;
  rewindDuration: number;
}

interface Sequence {
  elapsed: number;
  /** Seconds the old headline takes to return into the waveform, 0 for none. */
  rewind: number;
  /** Fade the real headline out first (replay) instead of cutting (new text). */
  dissolve: boolean;
  /** Bars grow out of the line at the very first run. */
  intro: boolean;
  morphStart: number;
  /** Rebuild the particles from the DOM once the rewind has finished. */
  relayout: boolean;
}

/*
 * Timing in seconds. The first run has three beats: listening (LISTEN),
 * becoming type (SWEEP to TRAVEL), and text (HOLD, RESOLVE). With two
 * headline lines the crisp headline stands after about 0.9 seconds, and
 * about one second after a platform switch. The headline is the largest
 * element of the page, so the whole run stays this short.
 */
const LISTEN = 0.26;
const LISTEN_AGAIN = 0.16;
const SWEEP = 0.2;
const TRAVEL = 0.2;
const LINE_LAG = 0.03;
const JITTER = 0.02;
const HOLD = 0.03;
const RESOLVE = 0.14;
const DISSOLVE = 0.08;
const REWIND_SWEEP = 0.1;
const REWIND_TRAVEL = 0.16;
const REWIND_JITTER = 0.016;
const INTRO_GROW = 0.16;
/** Resolution of the offscreen glyph mask relative to CSS pixels. */
const MASK_SCALE = 2;

function readHeadlineText(title: HTMLElement): string {
  return (title.textContent ?? "").replace(/\s+/g, " ").trim();
}

interface Glyph {
  char: string;
  left: number;
  top: number;
  height: number;
}

/** Reads the position of every visible character from the rendered headline. */
function readGlyphs(title: HTMLElement): Glyph[] {
  const glyphs: Glyph[] = [];
  const walker = document.createTreeWalker(title, NodeFilter.SHOW_TEXT);
  const range = document.createRange();
  let node = walker.nextNode() as Text | null;
  while (node) {
    let offset = 0;
    for (const char of node.data) {
      if (char.trim() !== "") {
        range.setStart(node, offset);
        range.setEnd(node, offset + char.length);
        let best: DOMRect | null = null;
        for (const rect of Array.from(range.getClientRects())) {
          if (!best || rect.width > best.width) best = rect;
        }
        if (best && best.width > 0) {
          glyphs.push({
            char,
            left: best.left,
            top: best.top,
            height: best.height,
          });
        }
      }
      offset += char.length;
    }
    node = walker.nextNode() as Text | null;
  }
  return glyphs;
}

function buildLayout(elements: HeroWaveElements): Layout | null {
  const hostRect = elements.host.getBoundingClientRect();
  const titleRect = elements.title.getBoundingClientRect();
  const lineRect = elements.line.getBoundingClientRect();
  const width = hostRect.width;
  const height = hostRect.height;
  if (width < 200 || height < 200 || titleRect.height < 10) return null;

  const style = getComputedStyle(elements.title);
  const fontSize = parseFloat(style.fontSize);
  const glyphs = readGlyphs(elements.title);
  if (!fontSize || glyphs.length === 0) return null;

  // Bars get finer with smaller type so the letters stay readable.
  const pitch = Math.min(6, Math.max(2.5, Math.round(fontSize * 0.1) / 2));
  const stride = pitch >= 4.5 ? 1 : 2;
  const glyphBar = Math.max(1.5, Math.round(pitch * 0.6 * 2) / 2);
  const wavePitch = pitch * stride;
  const waveBar = Math.min(3, Math.max(2, Math.round(wavePitch * 0.55)));

  const columns = createColumns(width, wavePitch, 20260927);
  const gridStart = columns[0].x;

  // Draw the headline into a mask, glyph by glyph at its measured position.
  const padding = Math.ceil(fontSize * 0.3);
  const originX = titleRect.left - padding;
  const originY = titleRect.top - padding;
  const mask = document.createElement("canvas");
  mask.width = Math.ceil((titleRect.width + padding * 2) * MASK_SCALE);
  mask.height = Math.ceil((titleRect.height + padding * 2) * MASK_SCALE);
  const maskContext = mask.getContext("2d", { willReadFrequently: true });
  if (!maskContext || mask.width === 0 || mask.height === 0) return null;

  const probe = elements.baseline.getBoundingClientRect();
  const last = glyphs[glyphs.length - 1];
  let ascent = probe.bottom - last.top;
  maskContext.font = `${style.fontStyle} ${style.fontWeight} ${fontSize * MASK_SCALE}px ${style.fontFamily}`;
  if (!(ascent > fontSize * 0.5 && ascent < fontSize * 1.4)) {
    const metrics = maskContext.measureText("Hg");
    const fontAscent = metrics.fontBoundingBoxAscent;
    const fontDescent = metrics.fontBoundingBoxDescent;
    if (!fontAscent || !fontDescent) return null;
    ascent = (last.height * fontAscent) / (fontAscent + fontDescent);
  }
  if ("textRendering" in maskContext) {
    maskContext.textRendering = "geometricPrecision";
  }
  maskContext.textBaseline = "alphabetic";
  maskContext.textAlign = "left";
  maskContext.fillStyle = "#fff";
  const lineTops: number[] = [];
  for (const glyph of glyphs) {
    maskContext.fillText(
      glyph.char,
      (glyph.left - originX) * MASK_SCALE,
      (glyph.top + ascent - originY) * MASK_SCALE,
    );
    if (!lineTops.some((top) => Math.abs(top - glyph.top) < fontSize * 0.3)) {
      lineTops.push(glyph.top);
    }
  }
  lineTops.sort((a, b) => a - b);
  const lineHeight = last.height;

  const pixels = maskContext.getImageData(0, 0, mask.width, mask.height).data;
  const midY = titleRect.top + titleRect.height / 2 - hostRect.top;
  const lineY = lineRect.top + lineRect.height / 2 - hostRect.top;
  const random = mulberry32(977);
  const particles: Particle[] = [];

  const delayAt = (x: number) => clamp01(x / width) * SWEEP;
  const rewindAt = (x: number) => (1 - clamp01(x / width)) * REWIND_SWEEP;

  // One resting bar per waveform column.
  columns.forEach((column, index) => {
    particles.push({
      x: column.x,
      source: index,
      centerY: 0,
      height: 0,
      glyph: false,
      delay: delayAt(column.x) + 0.012,
      rewindDelay: rewindAt(column.x),
    });
  });

  // One particle per vertical run of ink in every sampled column.
  const titleLeft = titleRect.left - hostRect.left;
  const titleRight = titleRect.right - hostRect.left;
  const first = Math.ceil((titleLeft - padding - gridStart) / pitch);
  const lastColumn = Math.floor((titleRight + padding - gridStart) / pitch);
  const sampleWidth = Math.max(1, Math.round(glyphBar * MASK_SCALE));
  const minRun = 1.5 * MASK_SCALE;
  let lines = 1;
  for (let index = first; index <= lastColumn; index += 1) {
    const x = gridStart + index * pitch;
    const pixelLeft = Math.round(
      (x + hostRect.left - originX - glyphBar / 2) * MASK_SCALE,
    );
    if (pixelLeft < 0 || pixelLeft + sampleWidth > mask.width) continue;
    let runStart = -1;
    for (let row = 0; row <= mask.height; row += 1) {
      let filled = false;
      if (row < mask.height) {
        let sum = 0;
        const base = (row * mask.width + pixelLeft) * 4 + 3;
        for (let dx = 0; dx < sampleWidth; dx += 1)
          sum += pixels[base + dx * 4];
        filled = sum / sampleWidth > 118;
      }
      if (filled && runStart < 0) runStart = row;
      if (!filled && runStart >= 0) {
        if (row - runStart >= minRun) {
          const top = runStart / MASK_SCALE + originY - hostRect.top;
          const bottom = row / MASK_SCALE + originY - hostRect.top;
          const centerY = (top + bottom) / 2;
          let line = 0;
          lineTops.forEach((lineTop, lineIndex) => {
            const center = lineTop + lineHeight / 2 - hostRect.top;
            const current = lineTops[line] + lineHeight / 2 - hostRect.top;
            if (Math.abs(center - centerY) < Math.abs(current - centerY)) {
              line = lineIndex;
            }
          });
          lines = Math.max(lines, line + 1);
          particles.push({
            x,
            source: Math.min(
              columns.length - 1,
              Math.max(0, Math.round(index / stride)),
            ),
            centerY,
            height: bottom - top,
            glyph: true,
            delay: delayAt(x) + line * LINE_LAG + random() * JITTER,
            rewindDelay: rewindAt(x) + random() * REWIND_JITTER,
          });
        }
        runStart = -1;
      }
    }
  }
  if (particles.length === columns.length) return null;

  return {
    width,
    height,
    text: readHeadlineText(elements.title),
    columns,
    particles,
    waveBar,
    glyphBar,
    midY,
    lineY,
    waveMax: Math.min(250, Math.max(110, titleRect.height * 0.98)),
    calmMax: Math.min(26, Math.max(15, fontSize * 0.26)),
    morphDuration: SWEEP + (lines - 1) * LINE_LAG + JITTER + TRAVEL,
    rewindDuration: REWIND_SWEEP + REWIND_JITTER + REWIND_TRAVEL,
  };
}

/**
 * Hero canvas: a live waveform listens, its bars assemble the headline, and
 * the bar-built headline resolves into the real one while the remaining bars
 * settle into a resting line beneath it.
 */
export class HeroWave {
  private readonly elements: HeroWaveElements;
  private readonly onPhase: (phase: HeroWavePhase) => void;
  private readonly reducedMotion: MediaQueryList;
  private context: CanvasRenderingContext2D | null = null;
  private layout: Layout | null = null;
  private sequence: Sequence | null = null;
  private phase: HeroWavePhase | null = null;
  private time = 0;
  private lastFrame = 0;
  private frameId = 0;
  private visible = true;
  private destroyed = false;
  private started = false;
  private midY = 0;
  private lineY = 0;
  private readonly pointer = { x: 0, y: 0, active: false };
  private resizeObserver: ResizeObserver | null = null;
  private intersectionObserver: IntersectionObserver | null = null;
  private palette: WavePalette;
  private stopThemeObserver: (() => void) | null = null;

  constructor(
    elements: HeroWaveElements,
    onPhase: (phase: HeroWavePhase) => void,
  ) {
    this.elements = elements;
    this.onPhase = onPhase;
    this.reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    this.palette = readPalette(elements.host);
  }

  /** Waits for the fonts, then plays the first run. Never throws. */
  async start() {
    try {
      if (document.fonts?.ready) await document.fonts.ready;
      const style = getComputedStyle(this.elements.title);
      await document.fonts?.load(
        `${style.fontWeight} ${style.fontSize} ${style.fontFamily}`,
        readHeadlineText(this.elements.title),
      );
    } catch {
      /* A failed font load only means the fallback font is measured. */
    }
    if (this.destroyed) return;
    try {
      if (!this.rebuild()) {
        this.fail();
        return;
      }
      // A late start finds the headline already shown by the CSS failsafe.
      // It stays; hiding it again to type it would only delay the reader.
      const shown = getComputedStyle(this.elements.title).opacity !== "0";
      this.started = true;
      this.elements.host.dataset.wave = "on";
      this.observe();
      if (this.reducedMotion.matches || shown) {
        this.finish();
        this.draw();
        this.schedule();
        return;
      }
      this.play({ rewind: false, dissolve: false, intro: true });
    } catch {
      this.fail();
    }
  }

  /** Replays the whole sequence from the finished headline. */
  replay() {
    if (!this.started || !this.layout || this.reducedMotion.matches) return;
    if (this.sequence) return;
    this.play({ rewind: true, dissolve: true, intro: false });
  }

  /**
   * Call after the headline text may have changed (before the browser
   * paints). Returns whether a new headline is being typed.
   */
  headlineChanged(): boolean {
    if (!this.started || !this.layout) return false;
    const text = readHeadlineText(this.elements.title);
    if (text === this.layout.text) return false;
    if (this.reducedMotion.matches) {
      this.rebuild();
      this.draw();
      return true;
    }
    const sequence = this.sequence;
    if (sequence && sequence.elapsed < sequence.morphStart) {
      // Still listening: the new headline simply is what gets typed.
      sequence.relayout = true;
      return true;
    }
    this.play({ rewind: true, dissolve: false, intro: false, relayout: true });
    return true;
  }

  destroy() {
    this.destroyed = true;
    cancelAnimationFrame(this.frameId);
    this.resizeObserver?.disconnect();
    this.intersectionObserver?.disconnect();
    this.stopThemeObserver?.();
    window.removeEventListener("pointermove", this.handlePointerMove);
    document.documentElement.removeEventListener(
      "pointerleave",
      this.handlePointerLeave,
    );
    document.removeEventListener("visibilitychange", this.handleVisibility);
    this.reducedMotion.removeEventListener("change", this.handleMotionChange);
    this.elements.title.style.opacity = "";
    delete this.elements.host.dataset.wave;
  }

  /**
   * Switches the canvas off and leaves the real headline. Nothing of the old
   * run survives, so no later frame can hide the headline again; a rebuild
   * that succeeds after a resize switches the canvas back on.
   */
  private fail() {
    cancelAnimationFrame(this.frameId);
    this.sequence = null;
    if (this.layout && this.context) {
      this.context.clearRect(0, 0, this.layout.width, this.layout.height);
    }
    this.layout = null;
    this.elements.host.dataset.wave = "off";
    this.elements.title.style.opacity = "";
    this.setPhase("done");
  }

  private observe() {
    let lastWidth = this.elements.host.getBoundingClientRect().width;
    this.resizeObserver = new ResizeObserver(() => {
      if (this.destroyed) return;
      const width = this.elements.host.getBoundingClientRect().width;
      const widthChanged = Math.abs(width - lastWidth) > 0.5;
      lastWidth = width;
      if (widthChanged && this.sequence) this.finish();
      if (this.sequence && !widthChanged) {
        // Height changes during a run come from the headline itself.
        this.sequence.relayout = true;
        return;
      }
      if (!this.rebuild()) {
        this.fail();
        return;
      }
      if (this.elements.host.dataset.wave === "off") {
        this.elements.host.dataset.wave = "on";
        this.schedule();
      }
      this.draw();
    });
    this.resizeObserver.observe(this.elements.host);
    this.resizeObserver.observe(this.elements.title);

    this.intersectionObserver = new IntersectionObserver((entries) => {
      this.visible = entries[entries.length - 1].isIntersecting;
      this.schedule();
    });
    this.intersectionObserver.observe(this.elements.host);

    window.addEventListener("pointermove", this.handlePointerMove, {
      passive: true,
    });
    document.documentElement.addEventListener(
      "pointerleave",
      this.handlePointerLeave,
    );
    document.addEventListener("visibilitychange", this.handleVisibility);
    this.reducedMotion.addEventListener("change", this.handleMotionChange);
    this.stopThemeObserver = observeTheme(this.handleThemeChange);
  }

  /** A new theme only recolors the current frame; the sequence keeps its place. */
  private readonly handleThemeChange = () => {
    this.palette = readPalette(this.elements.host);
    this.draw();
  };

  private readonly handlePointerMove = (event: PointerEvent) => {
    if (event.pointerType === "touch") return;
    const rect = this.elements.host.getBoundingClientRect();
    this.pointer.x = event.clientX - rect.left;
    this.pointer.y = event.clientY - rect.top;
    this.pointer.active =
      this.pointer.y > -40 && this.pointer.y < rect.height + 40;
  };

  private readonly handlePointerLeave = () => {
    this.pointer.active = false;
  };

  private readonly handleVisibility = () => {
    this.schedule();
  };

  private readonly handleMotionChange = () => {
    if (this.reducedMotion.matches) {
      this.finish();
      this.draw();
    } else {
      this.schedule();
    }
  };

  private setPhase(phase: HeroWavePhase) {
    if (this.phase === phase) return;
    this.phase = phase;
    this.onPhase(phase);
  }

  /** Measures the DOM again and replaces the particles. */
  private rebuild(): boolean {
    const layout = buildLayout(this.elements);
    if (!layout) return false;
    const context = prepareCanvas(
      this.elements.canvas,
      layout.width,
      layout.height,
    );
    if (!context) return false;
    const previous = this.layout;
    if (previous && previous.columns.length === layout.columns.length) {
      layout.columns.forEach((column, index) => {
        column.boost = previous.columns[index].boost;
      });
    }
    if (!previous || previous.width !== layout.width) {
      this.midY = layout.midY;
      this.lineY = layout.lineY;
    }
    this.context = context;
    this.layout = layout;
    return true;
  }

  private play(options: {
    rewind: boolean;
    dissolve: boolean;
    intro: boolean;
    relayout?: boolean;
  }) {
    const layout = this.layout;
    if (!layout) return;
    const rewind = options.rewind
      ? layout.rewindDuration + (options.dissolve ? DISSOLVE * 0.6 : 0)
      : 0;
    this.sequence = {
      elapsed: 0,
      rewind,
      dissolve: options.dissolve,
      intro: options.intro,
      morphStart: rewind + (options.intro ? LISTEN : LISTEN_AGAIN),
      relayout: options.relayout ?? false,
    };
    this.elements.title.style.opacity = options.dissolve ? "1" : "0";
    this.setPhase("listening");
    this.lastFrame = 0;
    this.schedule();
  }

  /** Jumps to the finished state: real headline visible, resting line below. */
  private finish() {
    this.sequence = null;
    this.elements.title.style.opacity = "";
    this.setPhase("done");
  }

  private schedule() {
    cancelAnimationFrame(this.frameId);
    if (this.destroyed || !this.started || !this.layout) return;
    if (!this.visible || document.hidden || this.reducedMotion.matches) {
      this.lastFrame = 0;
      return;
    }
    this.frameId = requestAnimationFrame(this.tick);
  }

  private readonly tick = (now: number) => {
    const dt = this.lastFrame
      ? Math.min(0.05, (now - this.lastFrame) / 1000)
      : 0;
    this.lastFrame = now;
    this.time += dt;
    const layout = this.layout;
    if (layout) {
      const sequence = this.sequence;
      if (sequence) {
        sequence.elapsed += dt;
        if (sequence.relayout && sequence.elapsed >= sequence.rewind) {
          sequence.relayout = false;
          if (!this.rebuild()) {
            this.fail();
            return;
          }
        }
      }
      const current = this.layout ?? layout;
      const follow = 1 - Math.exp(-dt * 7);
      this.midY += (current.midY - this.midY) * follow;
      this.lineY += (current.lineY - this.lineY) * follow;
      const resting =
        !sequence || sequence.elapsed > sequence.morphStart + TRAVEL;
      updateBoost(
        current.columns,
        this.pointer,
        resting ? this.lineY : this.midY,
        dt,
      );
      this.draw();
    }
    this.schedule();
  };

  private draw() {
    const layout = this.layout;
    const context = this.context;
    if (!layout || !context) return;
    context.clearRect(0, 0, layout.width, layout.height);

    const sequence = this.sequence;
    if (!sequence) {
      this.drawParticles(layout, () => 1, 0, 1);
      return;
    }

    const elapsed = sequence.elapsed;
    if (elapsed < sequence.rewind) {
      const fade = sequence.dissolve ? clamp01(elapsed / DISSOLVE) : 1;
      const start = sequence.dissolve ? DISSOLVE * 0.6 : 0;
      this.elements.title.style.opacity = String(1 - fade);
      this.drawParticles(
        layout,
        (particle) =>
          1 -
          easeInOutCubic(
            clamp01((elapsed - start - particle.rewindDelay) / REWIND_TRAVEL),
          ),
        fade,
        1,
      );
      return;
    }

    if (elapsed < sequence.morphStart) {
      this.elements.title.style.opacity = "0";
      const grow = sequence.intro
        ? easeOutCubic(clamp01(elapsed / INTRO_GROW))
        : 1;
      this.drawParticles(layout, () => 0, 1, grow);
      return;
    }

    const morph = elapsed - sequence.morphStart;
    const resolve = easeInOutCubic(
      clamp01((morph - layout.morphDuration - HOLD) / RESOLVE),
    );
    this.setPhase("typing");
    this.elements.title.style.opacity = String(resolve);
    this.drawParticles(
      layout,
      (particle) => spring(clamp01((morph - particle.delay) / TRAVEL)),
      1 - resolve,
      1,
    );
    if (resolve >= 1) this.finish();
  }

  /**
   * Draws every bar between its place in the live waveform (progress 0) and
   * its final place (progress 1): a piece of a glyph or the resting line.
   */
  private drawParticles(
    layout: Layout,
    progressOf: (particle: Particle) => number,
    glyphAlpha: number,
    grow: number,
  ) {
    const context = this.context;
    if (!context) return;
    const { columns, width } = layout;
    const { wave, waveCss, ink } = this.palette;
    const time = this.time;
    const waveHeights = new Float32Array(columns.length);
    const calmHeights = new Float32Array(columns.length);
    columns.forEach((column, index) => {
      const level = speechLevel(column, width, time);
      waveHeights[index] =
        layout.waveBar +
        grow * (level * layout.waveMax + column.boost * layout.waveMax * 0.16);
      calmHeights[index] =
        layout.waveBar +
        calmLevel(column, width, time) * layout.calmMax +
        column.boost * layout.calmMax * 1.15;
    });

    for (const particle of layout.particles) {
      const progress = progressOf(particle);
      const column = columns[particle.source];
      const waveHeight = waveHeights[particle.source];
      if (!particle.glyph) {
        const amount = clamp01(progress);
        const alpha = column.edge * lerp(0.95, 0.62, amount);
        if (alpha <= 0.01) continue;
        context.globalAlpha = alpha;
        context.fillStyle = waveCss;
        context.beginPath();
        traceBar(
          context,
          particle.x,
          lerp(this.midY, this.lineY, progress),
          layout.waveBar,
          Math.max(
            layout.waveBar,
            lerp(waveHeight, calmHeights[particle.source], progress),
          ),
        );
        context.fill();
        continue;
      }

      if (progress <= 0) continue;
      const amount = clamp01(progress);
      const alpha = lerp(column.edge * 0.95, glyphAlpha, amount);
      if (alpha <= 0.01) continue;
      const offsetY = particle.centerY - layout.midY;
      context.globalAlpha = alpha;
      context.fillStyle = mixColor(wave, ink, amount * amount);
      context.beginPath();
      traceBar(
        context,
        lerp(column.x, particle.x, amount),
        this.midY + offsetY * progress,
        lerp(layout.waveBar, layout.glyphBar, amount),
        Math.max(1, lerp(waveHeight, particle.height, progress)),
      );
      context.fill();
    }
    context.globalAlpha = 1;
  }
}
