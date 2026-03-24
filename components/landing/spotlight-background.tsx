"use client";

/**
 * Landing hero: bitmap sits under a surface-colored veil. A canvas luminance mask
 * cuts a soft “spotlight” through the veil so the bitmap shows only where you’ve
 * moved the pointer. Each frame the mask “heals” toward white so previous strokes
 * fade (paint-brush trail). prefers-reduced-motion: full bitmap, no veil/masking.
 *
 * Touch: pointer events update the spotlight from taps/drags; fine pointer users
 * get hover + move.
 *
 * Important: the mask PNG from canvas is opaque in alpha. The veil must use
 * luminance masking (`mask-mode` / `-webkit-mask-source-type`) so dark pixels
 * punch through; alpha-only masks would keep the veil solid everywhere.
 */

import * as React from "react";
import { cn } from "@/lib/utils";

const BITMAP_OPACITY = 0.45;
/** Main brush radius in CSS px; soft falloff extends past this in the gradient. */
const BRUSH_RADIUS_PX = 360;
/** Downscaled mask canvas for performance; applied stretched to full hero. */
const MASK_SCALE = 0.3;
/** Lower = slower “veil” return → smoother, more paint-like trail. */
const HEAL_ALPHA = 0.028;
const DECAY_FRAMES_AFTER_LEAVE = 260;

type SpotlightBackgroundProps = {
  children: React.ReactNode;
  /** Merged onto the root wrapper (e.g. `min-h-[100dvh]` for full-viewport mask on auth pages). */
  className?: string;
  /** Veil color over the bitmap; default matches dashboard surface. */
  veilClassName?: string;
  /** Bitmap layer strength (0–1). */
  bitmapOpacity?: number;
};

export function SpotlightBackground({
  children,
  className,
  veilClassName = "bg-surface",
  bitmapOpacity = BITMAP_OPACITY,
}: SpotlightBackgroundProps) {
  const wrapRef = React.useRef<HTMLDivElement>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const [reducedMotion, setReducedMotion] = React.useState(false);

  const pxRef = React.useRef(0);
  const pyRef = React.useRef(0);
  const hasPointerRef = React.useRef(false);
  const leaveFramesRef = React.useRef(0);
  const rafRef = React.useRef<number | null>(null);

  React.useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const onChange = () => setReducedMotion(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const applyMask = React.useCallback((dataUrl: string) => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const veil = wrap.querySelector(
      "[data-spotlight-veil]",
    ) as HTMLElement | null;
    if (!veil) return;
    // Set luminance before mask-image so WebKit applies the correct mask type (canvas
    // PNGs are opaque in alpha; alpha-only masks would hide the whole effect).
    veil.style.setProperty("mask-mode", "luminance");
    veil.style.setProperty("-webkit-mask-source-type", "luminance");
    veil.style.maskImage = `url("${dataUrl}")`;
    veil.style.webkitMaskImage = `url("${dataUrl}")`;
    veil.style.maskSize = "100% 100%";
    veil.style.webkitMaskSize = "100% 100%";
    veil.style.maskRepeat = "no-repeat";
    veil.style.webkitMaskRepeat = "no-repeat";
    veil.style.maskPosition = "0 0";
    veil.style.webkitMaskPosition = "0 0";
  }, []);

  const layoutCanvas = React.useCallback(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;
    const w = Math.max(1, wrap.clientWidth);
    const h = Math.max(1, wrap.clientHeight);
    const cw = Math.max(1, Math.floor(w * MASK_SCALE));
    const ch = Math.max(1, Math.floor(h * MASK_SCALE));
    canvas.width = cw;
    canvas.height = ch;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, cw, ch);
    applyMask(canvas.toDataURL("image/png"));
  }, [applyMask]);

  const drawFrame = React.useCallback(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas || reducedMotion) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const cw = canvas.width;
    const ch = canvas.height;
    if (cw < 2 || ch < 2) return;

    const wCss = Math.max(1, wrap.clientWidth);
    const hCss = Math.max(1, wrap.clientHeight);

    // Heal mask toward white (veil closes → bitmap hides again).
    ctx.globalCompositeOperation = "source-over";
    ctx.fillStyle = `rgba(255,255,255,${HEAL_ALPHA})`;
    ctx.fillRect(0, 0, cw, ch);

    if (hasPointerRef.current) {
      const mx = (pxRef.current / wCss) * cw;
      const my = (pyRef.current / hCss) * ch;
      const r = (BRUSH_RADIUS_PX / wCss) * cw;
      // Wide, many-stop falloff reads like soft bristles / wash, not a hard circle.
      const g = ctx.createRadialGradient(mx, my, 0, mx, my, r);
      g.addColorStop(0, "rgba(0,0,0,1)");
      g.addColorStop(0.12, "rgba(6,6,6,1)");
      g.addColorStop(0.28, "rgba(38,38,38,1)");
      g.addColorStop(0.48, "rgba(95,95,95,1)");
      g.addColorStop(0.64, "rgba(155,155,155,1)");
      g.addColorStop(0.78, "rgba(210,210,210,1)");
      g.addColorStop(0.9, "rgba(245,245,245,1)");
      g.addColorStop(1, "rgba(255,255,255,1)");
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(mx, my, r, 0, Math.PI * 2);
      ctx.fill();
    }

    applyMask(canvas.toDataURL("image/png"));

    if (hasPointerRef.current) {
      leaveFramesRef.current = DECAY_FRAMES_AFTER_LEAVE;
    } else if (leaveFramesRef.current > 0) {
      leaveFramesRef.current -= 1;
    }

    const shouldRun =
      hasPointerRef.current || leaveFramesRef.current > 0;
    if (shouldRun) {
      rafRef.current = requestAnimationFrame(drawFrame);
    } else {
      rafRef.current = null;
    }
  }, [applyMask, reducedMotion]);

  const scheduleFrame = React.useCallback(() => {
    if (reducedMotion) return;
    if (rafRef.current == null) {
      rafRef.current = requestAnimationFrame(drawFrame);
    }
  }, [drawFrame, reducedMotion]);

  const updatePointer = React.useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (reducedMotion) return;
      const wrap = wrapRef.current;
      if (!wrap) return;
      const r = wrap.getBoundingClientRect();
      pxRef.current = e.clientX - r.left;
      pyRef.current = e.clientY - r.top;
      hasPointerRef.current = true;
      scheduleFrame();
    },
    [reducedMotion, scheduleFrame],
  );

  const onPointerLeave = React.useCallback(() => {
    hasPointerRef.current = false;
    scheduleFrame();
  }, [scheduleFrame]);

  React.useEffect(() => {
    if (reducedMotion) return;
    const wrap = wrapRef.current;
    if (!wrap) return;
    const ro = new ResizeObserver(() => {
      layoutCanvas();
      scheduleFrame();
    });
    ro.observe(wrap);
    layoutCanvas();
    return () => {
      ro.disconnect();
      if (rafRef.current != null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, [layoutCanvas, reducedMotion, scheduleFrame]);

  if (reducedMotion) {
    return (
      <div
        className={cn(
          "relative flex min-h-0 flex-1 flex-col overflow-hidden",
          className,
        )}
      >
        <div
          className="pointer-events-none absolute inset-0 bg-[url('/bitmap.svg')] bg-cover bg-center"
          style={{ opacity: bitmapOpacity }}
          aria-hidden
        />
        <div
          data-spotlight-veil
          className={cn("pointer-events-none absolute inset-0", veilClassName)}
          aria-hidden
        />
        <div className="relative z-10 flex min-h-0 flex-1 flex-col">
          {children}
        </div>
      </div>
    );
  }

  return (
    <div
      ref={wrapRef}
      className={cn(
        "relative flex min-h-0 flex-1 flex-col overflow-hidden",
        className,
      )}
      onPointerMove={updatePointer}
      onPointerEnter={updatePointer}
      onPointerLeave={onPointerLeave}
      onPointerDown={updatePointer}
    >
      <canvas
        ref={canvasRef}
        className="pointer-events-none fixed -left-[9999px] -top-[9999px] opacity-0"
        aria-hidden
      />

      <div
        className="pointer-events-none absolute inset-0 bg-[url('/bitmap.svg')] bg-cover bg-center"
        style={{ opacity: bitmapOpacity }}
        aria-hidden
      />

      <div
        data-spotlight-veil
        className={cn("pointer-events-none absolute inset-0", veilClassName)}
        aria-hidden
      />

      <div className="relative z-10 flex min-h-0 flex-1 flex-col">
        {children}
      </div>
    </div>
  );
}
