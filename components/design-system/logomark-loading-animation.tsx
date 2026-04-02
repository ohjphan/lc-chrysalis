"use client";

import { useEffect, useMemo, useReducer } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BRAND_SECONDARY_PALETTE_HEX } from "@/lib/brand-avatar-colors";

/** Matches Learning Commons logo chevrons (see public/lc-logo.svg). */
const LEFT_PATH =
  "M26.1412 11.1563L18.8667 3.88057L22.7471 0L33.9029 11.1563L22.7629 22.2968L18.8825 18.4162L26.1412 11.1563Z";
const RIGHT_PATH =
  "M7.76169 11.156L14.9923 3.92509L11.1119 0.043637L0 11.156L11.1101 22.2657L14.9905 18.3851L7.76169 11.156Z";

const DIAMOND_PATH = "M50 18 L82 50 L50 82 L18 50 Z";
const SQUARE_PATH = "M28 28 L72 28 L72 72 L28 72 Z";

/** Center LC mark paths in a 100×100 viewBox (original coords ~0–34 × 0–22). */
const MARK_GROUP_TRANSFORM = "translate(50 50) scale(2.35) translate(-16.5 -11)";

const BRAND_GREEN = "#1DB470";

/** Ring geometry in the 100×100 ring viewBox (center 50,50). */
const RING_R = 46;
const RING_C = 2 * Math.PI * RING_R;
const RING_ARC = RING_C * 0.24;

const sequence = ["mark", "diamond", "square", "diamond"] as const;

const nSecondary = BRAND_SECONDARY_PALETTE_HEX.length;

type LoaderState = { step: number; colorIndex: number };

function loaderTick(state: LoaderState): LoaderState {
  const next = (state.step + 1) % sequence.length;
  if (sequence[next] === "mark") {
    return { step: next, colorIndex: state.colorIndex };
  }
  const nextColor =
    state.colorIndex < 0
      ? 0
      : (state.colorIndex + 1) % nSecondary;
  return { step: next, colorIndex: nextColor };
}

export function LogomarkLoadingAnimation() {
  const [{ step, colorIndex }, dispatch] = useReducer(loaderTick, {
    step: 0,
    colorIndex: -1,
  });

  useEffect(() => {
    const id = setInterval(() => {
      dispatch();
    }, 900);
    return () => clearInterval(id);
  }, []);

  const state = sequence[step];

  const morphFill =
    colorIndex >= 0
      ? BRAND_SECONDARY_PALETTE_HEX[colorIndex % nSecondary]!
      : BRAND_SECONDARY_PALETTE_HEX[0]!;

  const label = useMemo(() => {
    if (state === "mark") return "Loading...";
    if (state === "diamond") return "Processing...";
    return "Almost there...";
  }, [state]);

  const progressAccent = state === "mark" ? BRAND_GREEN : morphFill;

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="[perspective:600px]">
        <div className="relative flex h-20 w-20 shrink-0 items-center justify-center">
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
              strokeWidth="3"
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
                  strokeWidth="3"
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
            className="relative z-10 h-10 w-10"
            animate={{
              rotateY: state === "square" ? 180 : 0,
              scale: state === "mark" ? 1 : 1.05,
            }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformStyle: "preserve-3d" }}
          >
            <AnimatePresence mode="wait">
              {state === "mark" && (
                <motion.g
                  key="mark"
                  initial={{ opacity: 0, scale: 0.88 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.08 }}
                  transition={{ duration: 0.4 }}
                >
                  <g transform={MARK_GROUP_TRANSFORM}>
                    <path d={LEFT_PATH} fill={BRAND_GREEN} />
                    <path d={RIGHT_PATH} fill={BRAND_GREEN} />
                  </g>
                </motion.g>
              )}

              {state === "diamond" && (
                <motion.path
                  key="diamond"
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

              {state === "square" && (
                <motion.path
                  key="square"
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

      <motion.p
        className="mt-5 text-sm font-medium text-foreground"
        key={label}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
      >
        {label}
      </motion.p>
    </div>
  );
}
