"use client";

import { useEffect, useMemo, useReducer } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BRAND_SECONDARY_PALETTE_HEX } from "@/lib/brand-avatar-colors";
import { cn } from "@/lib/utils";

const DIAMOND_PATH = "M50 18 L82 50 L50 82 L18 50 Z";
const CIRCLE_PATH =
  "M50 18 C67.673 18 82 32.327 82 50 C82 67.673 67.673 82 50 82 C32.327 82 18 67.673 18 50 C18 32.327 32.327 18 50 18 Z";
const SQUARE_PATH = "M28 28 L72 28 L72 72 L28 72 Z";

const BRAND_GREEN = "#1DB470";
const EXCLUDED_LOADING_COLORS = new Set(["#FFFA55", "#FF554C"]);

/** Ring geometry in the 100×100 ring viewBox (center 50,50). */
const RING_R = 46;
const RING_C = 2 * Math.PI * RING_R;
const RING_ARC = RING_C * 0.24;

const sequence = ["diamond", "circle", "square", "diamond"] as const;

const LOADING_MORPH_COLORS = [
  BRAND_GREEN,
  ...BRAND_SECONDARY_PALETTE_HEX.filter(
    (hex) => !EXCLUDED_LOADING_COLORS.has(hex),
  ),
] as const;
const nMorphColors = LOADING_MORPH_COLORS.length;

type LoaderState = { step: number; colorIndex: number };

function loaderTick(state: LoaderState): LoaderState {
  const next = (state.step + 1) % sequence.length;
  return {
    step: next,
    colorIndex: (state.colorIndex + 1) % nMorphColors,
  };
}

const SIZE_STYLES = {
  sm: {
    outer: "h-12 w-12",
    logo: "h-6 w-6",
    trackStroke: 2,
    arcStroke: 2,
  },
  md: {
    outer: "h-16 w-16",
    logo: "h-8 w-8",
    trackStroke: 2.5,
    arcStroke: 2.5,
  },
  lg: {
    outer: "h-20 w-20",
    logo: "h-10 w-10",
    trackStroke: 3,
    arcStroke: 3,
  },
} as const;

export type LogomarkLoadingSize = keyof typeof SIZE_STYLES;

export type LogomarkLoadingAnimationProps = {
  /** `sm` / `md`: no status text. `lg`: includes label (default). */
  size?: LogomarkLoadingSize;
  className?: string;
};

export function LogomarkLoadingAnimation({
  size = "lg",
  className,
}: LogomarkLoadingAnimationProps) {
  const [{ step, colorIndex }, dispatch] = useReducer(loaderTick, {
    step: 0,
    colorIndex: 0,
  });
  const dims = SIZE_STYLES[size];
  const showLabel = size === "lg";

  useEffect(() => {
    const id = setInterval(() => {
      dispatch();
    }, 900);
    return () => clearInterval(id);
  }, []);

  const state = sequence[step];

  const morphFill = LOADING_MORPH_COLORS[colorIndex % nMorphColors]!;

  const label = useMemo(() => {
    if (step === 0) return "Loading...";
    if (step === 1) return "Processing...";
    if (step === 2) return "Almost there...";
    return "Loading...";
  }, [step]);

  const progressAccent = morphFill;

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center",
        className,
      )}
    >
      <div className="[perspective:600px]">
        <div
          className={cn(
            "relative flex shrink-0 items-center justify-center",
            dims.outer,
          )}
        >
          <svg
            viewBox="0 0 100 100"
            className="pointer-events-none absolute inset-0 size-full"
            aria-hidden
          >
            <circle
              cx="50"
              cy="50"
              r={RING_R}
              fill="none"
              stroke="var(--border-subtle)"
              strokeWidth={dims.trackStroke}
            />
            <g transform="translate(50 50)">
              <motion.g
                animate={{ rotate: 360 }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                <motion.circle
                  cx="0"
                  cy="0"
                  r={RING_R}
                  fill="none"
                  strokeWidth={dims.arcStroke}
                  strokeLinecap="round"
                  strokeDasharray={`${RING_ARC} ${RING_C}`}
                  transform="rotate(-90)"
                  animate={{ stroke: progressAccent }}
                  transition={{
                    duration: 0.45,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                />
              </motion.g>
            </g>
          </svg>

          <motion.svg
            viewBox="0 0 100 100"
            className={cn("relative z-10", dims.logo)}
            animate={{
              rotateY: state === "square" ? 180 : 0,
              scale: 1.05,
            }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformStyle: "preserve-3d" }}
          >
            <AnimatePresence mode="wait">
              {state === "diamond" && (
                <motion.path
                  key={`diamond-${step}`}
                  d={DIAMOND_PATH}
                  initial={{
                    opacity: 0,
                    scale: 0.84,
                    rotate: -18,
                    fill: morphFill,
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    rotate: 0,
                    fill: morphFill,
                  }}
                  exit={{ opacity: 0, scale: 1.08, rotate: 18 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                />
              )}

              {state === "circle" && (
                <motion.path
                  key={`circle-${step}`}
                  d={CIRCLE_PATH}
                  initial={{
                    opacity: 0,
                    scale: 0.88,
                    rotate: 8,
                    fill: morphFill,
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    rotate: 0,
                    fill: morphFill,
                  }}
                  exit={{ opacity: 0, scale: 1.06, rotate: -8 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                />
              )}

              {state === "square" && (
                <motion.path
                  key={`square-${step}`}
                  d={SQUARE_PATH}
                  initial={{
                    opacity: 0,
                    scale: 0.9,
                    rotate: 45,
                    fill: morphFill,
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    rotate: 0,
                    fill: morphFill,
                  }}
                  exit={{ opacity: 0, scale: 1.08 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                />
              )}

            </AnimatePresence>
          </motion.svg>
        </div>
      </div>

      {showLabel ? (
        <motion.p
          className="mt-5 text-sm font-medium text-foreground"
          key={label}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
        >
          {label}
        </motion.p>
      ) : null}
    </div>
  );
}
