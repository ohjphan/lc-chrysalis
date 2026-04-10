"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type LoadingIndicatorSize = "sm" | "md" | "lg";

const RING_RADIUS = 44;
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;
const RING_ARC_LENGTH = RING_CIRCUMFERENCE * 0.24;
const RING_START_X = 50;
const RING_START_Y = 50 - RING_RADIUS;

const SIZE_STYLES = {
  sm: {
    ring: "size-10",
    ringStroke: 3,
    dot: "size-[6px]",
    gap: "gap-1.5",
    bounce: 5,
  },
  md: {
    ring: "size-12",
    ringStroke: 3.5,
    dot: "size-[7px]",
    gap: "gap-2",
    bounce: 6,
  },
  lg: {
    ring: "size-14",
    ringStroke: 4,
    dot: "size-[8px]",
    gap: "gap-2.5",
    bounce: 7,
  },
} as const;

type LoadingIndicatorProps = {
  size?: LoadingIndicatorSize;
  className?: string;
  "aria-label"?: string;
};

export function SimpleRingLoader({
  size = "md",
  className,
  "aria-label": ariaLabel = "Loading",
}: LoadingIndicatorProps) {
  const dims = SIZE_STYLES[size];

  return (
    <div
      role="status"
      aria-label={ariaLabel}
      className={cn("inline-flex items-center justify-center", className)}
    >
      <svg
        viewBox="0 0 100 100"
        className={cn("block", dims.ring)}
        aria-hidden="true"
      >
        <circle
          cx="50"
          cy="50"
          r={RING_RADIUS}
          fill="none"
          stroke="var(--border-subtle)"
          strokeWidth={dims.ringStroke}
        />
        <motion.g
          animate={{ rotate: 360 }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{ transformOrigin: "50% 50%" }}
        >
          <circle
            cx="50"
            cy="50"
            r={RING_RADIUS}
            fill="none"
            stroke="var(--accent-green)"
            strokeWidth={dims.ringStroke}
            strokeLinecap="round"
            strokeDasharray={`${RING_ARC_LENGTH} ${RING_CIRCUMFERENCE}`}
            transform="rotate(-90 50 50)"
          />
        </motion.g>
      </svg>
    </div>
  );
}

export function BouncingDotsLoader({
  size = "md",
  className,
  "aria-label": ariaLabel = "Loading",
}: LoadingIndicatorProps) {
  const dims = SIZE_STYLES[size];

  return (
    <div
      role="status"
      aria-label={ariaLabel}
      className={cn("inline-flex items-center justify-center", className)}
    >
      <div className={cn("flex items-center", dims.gap)} aria-hidden="true">
        {[0, 1, 2].map((index) => (
          <motion.span
            key={index}
            className={cn("block rounded-full bg-accent-green", dims.dot)}
            animate={{
              y: [0, -dims.bounce, 0],
              opacity: [0.65, 1, 0.65],
              scale: [0.96, 1, 0.96],
            }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: index * 0.12,
            }}
          />
        ))}
      </div>
    </div>
  );
}

export function DotToRingLoader({
  size = "md",
  className,
  "aria-label": ariaLabel = "Loading",
}: LoadingIndicatorProps) {
  const dims = SIZE_STYLES[size];
  const cycleDuration = 2.4;

  return (
    <div
      role="status"
      aria-label={ariaLabel}
      className={cn("inline-flex items-center justify-center", className)}
    >
      <svg
        viewBox="0 0 100 100"
        className={cn("block", dims.ring)}
        aria-hidden="true"
      >
        <motion.circle
          cx="50"
          cy="50"
          r={dims.ringStroke + 2.5}
          fill="var(--accent-green)"
          animate={{
            cx: [50, 50, 50, 50, 50, 50, 50, RING_START_X, RING_START_X, 50],
            cy: [50, 41, 50, 50, 41, 50, 22, RING_START_Y, RING_START_Y, 50],
            opacity: [1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
            scale: [1, 1.04, 1, 1, 1.04, 1, 1, 1, 1, 1],
          }}
          transition={{
            duration: cycleDuration,
            times: [0, 0.06, 0.14, 0.22, 0.3, 0.38, 0.46, 0.54, 0.62, 1],
            ease: "easeInOut",
            repeat: Infinity,
          }}
        />

        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0, 0, 1, 1, 0, 0] }}
          transition={{
            duration: cycleDuration,
            times: [0, 0.4, 0.54, 0.62, 0.82, 0.92, 1],
            ease: "easeInOut",
            repeat: Infinity,
          }}
        >
          <motion.g
            animate={{ rotate: [0, 0, 0, 720, 720, 720, 720] }}
            transition={{
              duration: cycleDuration,
              times: [0, 0.4, 0.58, 0.82, 0.9, 0.96, 1],
              ease: ["easeInOut", "linear", "easeInOut"],
              repeat: Infinity,
            }}
            style={{ transformOrigin: "50% 50%" }}
          >
            <motion.circle
              cx="50"
              cy="50"
              r={RING_RADIUS}
              fill="none"
              stroke="var(--accent-green)"
              strokeWidth={dims.ringStroke + 2}
              strokeLinecap="round"
              animate={{
                strokeDasharray: [
                  `0 ${RING_CIRCUMFERENCE}`,
                  `0 ${RING_CIRCUMFERENCE}`,
                  `${RING_ARC_LENGTH * 0.35} ${RING_CIRCUMFERENCE}`,
                  `${RING_ARC_LENGTH} ${RING_CIRCUMFERENCE}`,
                  `${RING_ARC_LENGTH} ${RING_CIRCUMFERENCE}`,
                  `${RING_ARC_LENGTH} ${RING_CIRCUMFERENCE}`,
                  `0 ${RING_CIRCUMFERENCE}`,
                ],
              }}
              transition={{
                duration: cycleDuration,
                times: [0, 0.4, 0.5, 0.58, 0.82, 0.9, 1],
                ease: "easeInOut",
                repeat: Infinity,
              }}
              transform="rotate(-90 50 50)"
            />
            <circle
              cx={RING_START_X}
              cy={RING_START_Y}
              r={dims.ringStroke + 2}
              fill="var(--accent-green)"
            />
          </motion.g>
        </motion.g>
      </svg>
    </div>
  );
}
