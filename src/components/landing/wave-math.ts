/** Shared math and drawing helpers for the waveform canvases of the landing page. */

import { mulberry32 } from "@/lib/seeded-random";

export { mulberry32 };

export type Rgb = readonly [number, number, number];

/** Colors of the canvases, read from the custom properties of the page. */
export interface WavePalette {
  /** Waveform bars (`--wave`). */
  wave: Rgb;
  waveCss: string;
  /** Text color, the state a bar reaches once it has become type (`--wave-ink`). */
  ink: Rgb;
}

// Dark theme values, used when a custom property cannot be read.
const FALLBACK_WAVE: Rgb = [92, 175, 255];
const FALLBACK_INK: Rgb = [245, 245, 247];

function parseColor(value: string): Rgb | null {
  const hex = value.match(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i)?.[1];
  if (hex) {
    const digits =
      hex.length === 3
        ? Array.from(hex, (digit) => digit + digit)
        : hex.match(/../g);
    if (!digits) return null;
    const [r, g, b] = digits.map((digit) => parseInt(digit, 16));
    return [r, g, b];
  }
  const channels = value.match(/^rgba?\(\s*(\d+)[\s,]+(\d+)[\s,]+(\d+)/i);
  if (!channels) return null;
  return [Number(channels[1]), Number(channels[2]), Number(channels[3])];
}

/** Reads the canvas colors that apply to `element` in the current theme. */
export function readPalette(element: Element): WavePalette {
  const style = getComputedStyle(element);
  const read = (name: string, fallback: Rgb) =>
    parseColor(style.getPropertyValue(name).trim()) ?? fallback;
  const wave = read("--wave", FALLBACK_WAVE);
  return {
    wave,
    waveCss: `rgb(${wave[0]} ${wave[1]} ${wave[2]})`,
    ink: read("--wave-ink", FALLBACK_INK),
  };
}

/** Calls `onChange` when the theme class on `<html>` changes. Returns the cleanup. */
export function observeTheme(onChange: () => void): () => void {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  });
  return () => observer.disconnect();
}

export interface WaveColumn {
  /** Horizontal center in CSS pixels. */
  x: number;
  /** Stable per-bar loudness between 0 and 1. */
  rand: number;
  /** Oscillation speed in radians per second. */
  speed: number;
  /** Oscillation phase offset. */
  phase: number;
  /** Opacity factor that fades the waveform out towards the edges. */
  edge: number;
  /** Smoothed pointer influence between 0 and 1. */
  boost: number;
}

export function clamp01(value: number): number {
  return value < 0 ? 0 : value > 1 ? 1 : value;
}

export function lerp(from: number, to: number, amount: number): number {
  return from + (to - from) * amount;
}

export function smoothstep(edge0: number, edge1: number, value: number) {
  const x = clamp01((value - edge0) / (edge1 - edge0));
  return x * x * (3 - 2 * x);
}

export function easeOutCubic(x: number): number {
  return 1 - Math.pow(1 - x, 3);
}

export function easeInOutCubic(x: number): number {
  return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
}

/** Damped spring from 0 to 1 with a single small overshoot. */
export function spring(x: number): number {
  if (x <= 0) return 0;
  if (x >= 1) return 1;
  const value =
    1 - Math.exp(-7.2 * x) * (Math.cos(6.4 * x) + 0.5 * Math.sin(6.4 * x));
  // Blend into exactly 1 so the landing has no visible snap.
  return lerp(value, 1, smoothstep(0.8, 1, x));
}

/** Evenly spaced bars across `width`, centered, fading out at both edges. */
export function createColumns(
  width: number,
  pitch: number,
  seed: number,
  edgeFade = 0.14,
): WaveColumn[] {
  const count = Math.max(2, Math.floor(width / pitch) + 1);
  const offset = (width - (count - 1) * pitch) / 2;
  const random = mulberry32(seed);
  return Array.from({ length: count }, (_, index) => {
    const x = offset + index * pitch;
    const u = x / width;
    return {
      x,
      rand: random(),
      speed: 3.2 + random() * 3.4,
      phase: random() * Math.PI * 2,
      edge: smoothstep(0, edgeFade, u) * smoothstep(1, 1 - edgeFade, u),
      boost: 0,
    };
  });
}

/**
 * Loudness of one bar while someone is speaking, between 0 and 1. Syllables
 * travel across the bars, words swell and fade, and every bar keeps its own
 * rhythm, like the recording indicator of the apps.
 */
export function speechLevel(
  column: WaveColumn,
  width: number,
  time: number,
): number {
  const u = column.x / width;
  const envelope = Math.pow(Math.sin(Math.PI * clamp01(u)), 0.65);
  const drift = Math.sin(time * 0.6) * 1.4;
  const syllable = 0.5 + 0.5 * Math.sin(u * 19 - time * 3.4 + drift);
  // Words are bursts with short pauses between them.
  const word = smoothstep(
    0.18,
    0.72,
    0.5 + 0.5 * Math.sin(u * 6.1 + time * 1.15 + 0.8),
  );
  const own = 0.5 + 0.5 * Math.sin(time * column.speed + column.phase);
  const voice = 0.1 + 0.9 * word * (0.42 + 0.58 * syllable);
  const level =
    envelope * voice * (0.3 + 0.7 * column.rand) * (0.5 + 0.5 * own);
  return Math.min(1, 0.05 + 1.3 * level);
}

/** Loudness of one bar of the resting line: a slow breath, between 0 and 1. */
export function calmLevel(
  column: WaveColumn,
  width: number,
  time: number,
): number {
  const u = column.x / width;
  const swell = 0.5 + 0.5 * Math.sin(u * 9 - time * 0.55);
  const own = 0.5 + 0.5 * Math.sin(time * column.speed * 0.22 + column.phase);
  return (0.2 + 0.8 * column.rand) * (0.35 + 0.4 * swell + 0.25 * own);
}

/** Eases every bar's pointer influence towards the current pointer position. */
export function updateBoost(
  columns: WaveColumn[],
  pointer: { x: number; y: number; active: boolean },
  centerY: number,
  dt: number,
) {
  const follow = 1 - Math.exp(-dt * 9);
  for (const column of columns) {
    let target = 0;
    if (pointer.active) {
      const dx = (column.x - pointer.x) / 90;
      const dy = (centerY - pointer.y) / 190;
      target = Math.exp(-(dx * dx) - dy * dy);
    }
    column.boost += (target - column.boost) * follow;
    if (column.boost < 0.001) column.boost = 0;
  }
}

export function mixColor(from: Rgb, to: Rgb, amount: number): string {
  const r = Math.round(lerp(from[0], to[0], amount));
  const g = Math.round(lerp(from[1], to[1], amount));
  const b = Math.round(lerp(from[2], to[2], amount));
  return `rgb(${r} ${g} ${b})`;
}

/** Adds one vertical bar with fully rounded ends to the current path. */
export function traceBar(
  context: CanvasRenderingContext2D,
  centerX: number,
  centerY: number,
  width: number,
  height: number,
) {
  const h = Math.max(height, width);
  const x = centerX - width / 2;
  const y = centerY - h / 2;
  const radius = width / 2;
  if (typeof context.roundRect === "function") {
    context.roundRect(x, y, width, h, radius);
    return;
  }
  context.moveTo(x, y + radius);
  context.arc(x + radius, y + radius, radius, Math.PI, 0);
  context.lineTo(x + width, y + h - radius);
  context.arc(x + radius, y + h - radius, radius, 0, Math.PI);
  context.closePath();
}

/** Sizes the backing store for the device pixel ratio and returns a scaled context. */
export function prepareCanvas(
  canvas: HTMLCanvasElement,
  width: number,
  height: number,
): CanvasRenderingContext2D | null {
  const ratio = Math.min(window.devicePixelRatio || 1, 2.5);
  const pixelWidth = Math.max(1, Math.round(width * ratio));
  const pixelHeight = Math.max(1, Math.round(height * ratio));
  if (canvas.width !== pixelWidth) canvas.width = pixelWidth;
  if (canvas.height !== pixelHeight) canvas.height = pixelHeight;
  const context = canvas.getContext("2d");
  if (!context) return null;
  context.setTransform(ratio, 0, 0, ratio, 0, 0);
  return context;
}
