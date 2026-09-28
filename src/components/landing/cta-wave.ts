import {
  calmLevel,
  createColumns,
  lerp,
  observeTheme,
  prepareCanvas,
  readPalette,
  speechLevel,
  traceBar,
  updateBoost,
  type WaveColumn,
  type WavePalette,
} from "./wave-math";

const PITCH = 6;
const BAR = 3;
/** Seconds the waveform speaks up when it comes into view. */
const PHRASE = 2.6;
const CALM_ENERGY = 0.3;

/**
 * Waveform band of the final call to action: it speaks up when it scrolls
 * into view, then settles and keeps breathing above the download actions.
 */
export class CtaWave {
  private readonly canvas: HTMLCanvasElement;
  private readonly reducedMotion: MediaQueryList;
  private context: CanvasRenderingContext2D | null = null;
  private columns: WaveColumn[] = [];
  private width = 0;
  private height = 0;
  private time = 0;
  private energy = CALM_ENERGY;
  private phrase = 0;
  private lastFrame = 0;
  private frameId = 0;
  private visible = false;
  private destroyed = false;
  private readonly pointer = { x: 0, y: 0, active: false };
  private readonly resizeObserver: ResizeObserver;
  private readonly intersectionObserver: IntersectionObserver;
  private readonly stopThemeObserver: () => void;
  private palette: WavePalette;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    this.palette = readPalette(canvas);
    this.stopThemeObserver = observeTheme(() => {
      this.palette = readPalette(canvas);
      this.draw();
    });
    this.resizeObserver = new ResizeObserver(() => {
      this.measure();
      this.draw();
    });
    this.resizeObserver.observe(canvas);
    this.intersectionObserver = new IntersectionObserver(
      (entries) => {
        const visible = entries[entries.length - 1].isIntersecting;
        if (visible && !this.visible) this.phrase = PHRASE;
        this.visible = visible;
        this.schedule();
      },
      { threshold: 0.35 },
    );
    this.intersectionObserver.observe(canvas);
    window.addEventListener("pointermove", this.handlePointerMove, {
      passive: true,
    });
    document.addEventListener("visibilitychange", this.handleChange);
    this.reducedMotion.addEventListener("change", this.handleChange);
    this.measure();
    this.draw();
  }

  destroy() {
    this.destroyed = true;
    cancelAnimationFrame(this.frameId);
    this.resizeObserver.disconnect();
    this.intersectionObserver.disconnect();
    this.stopThemeObserver();
    window.removeEventListener("pointermove", this.handlePointerMove);
    document.removeEventListener("visibilitychange", this.handleChange);
    this.reducedMotion.removeEventListener("change", this.handleChange);
  }

  private readonly handlePointerMove = (event: PointerEvent) => {
    if (event.pointerType === "touch" || !this.visible) return;
    const rect = this.canvas.getBoundingClientRect();
    this.pointer.x = event.clientX - rect.left;
    this.pointer.y = event.clientY - rect.top;
    this.pointer.active =
      this.pointer.y > -120 && this.pointer.y < rect.height + 120;
  };

  private readonly handleChange = () => {
    this.draw();
    this.schedule();
  };

  private measure() {
    const rect = this.canvas.getBoundingClientRect();
    if (rect.width < 1 || rect.height < 1) return;
    this.width = rect.width;
    this.height = rect.height;
    this.context = prepareCanvas(this.canvas, rect.width, rect.height);
    this.columns = createColumns(rect.width, PITCH, 1207, 0.18);
  }

  private schedule() {
    cancelAnimationFrame(this.frameId);
    if (
      this.destroyed ||
      !this.visible ||
      document.hidden ||
      this.reducedMotion.matches
    ) {
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
    this.phrase = Math.max(0, this.phrase - dt);
    const target = this.phrase > 0 ? 1 : CALM_ENERGY;
    const rate = target > this.energy ? 5 : 1.4;
    this.energy += (target - this.energy) * (1 - Math.exp(-dt * rate));
    updateBoost(this.columns, this.pointer, this.height / 2, dt);
    this.draw();
    this.schedule();
  };

  private draw() {
    const context = this.context;
    if (!context || this.columns.length === 0) return;
    const still = this.reducedMotion.matches;
    const energy = still ? 0.62 : this.energy;
    const time = still ? 1.7 : this.time;
    const max = this.height - 8;
    context.clearRect(0, 0, this.width, this.height);
    context.fillStyle = this.palette.waveCss;
    for (const column of this.columns) {
      if (column.edge <= 0.01) continue;
      const speaking = speechLevel(column, this.width, time);
      const calm = calmLevel(column, this.width, time) * 0.22;
      const level = Math.min(
        1,
        lerp(calm, speaking, energy) + column.boost * 0.22,
      );
      context.globalAlpha = column.edge * lerp(0.6, 0.95, energy);
      context.beginPath();
      traceBar(context, column.x, this.height / 2, BAR, BAR + level * max);
      context.fill();
    }
    context.globalAlpha = 1;
  }
}
