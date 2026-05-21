/** Shared framer-motion animation variants & scroll helpers */

import { useScroll, useTransform, useSpring, type MotionValue } from "framer-motion";
import { useRef } from "react";

/* ── Variants ── */

export const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

export const fadeDown = {
  hidden: { opacity: 0, y: -30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7 } },
};

export const fadeLeft = {
  hidden: { opacity: 0, x: -40 },
  show: { opacity: 1, x: 0, transition: { duration: 0.7 } },
};

export const fadeRight = {
  hidden: { opacity: 0, x: 40 },
  show: { opacity: 1, x: 0, transition: { duration: 0.7 } },
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.7 } },
};

export const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

export const staggerFast = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};

/* ── Scroll-bound hook: parallax Y offset ── */

export function useParallax(distance = 100) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useSpring(
    useTransform(scrollYProgress, [0, 1], [distance, -distance]),
    { stiffness: 100, damping: 30, restDelta: 0.001 }
  );
  return { ref, y };
}

/* ── Scroll-bound hook: opacity fade as element crosses viewport ── */

export function useScrollFade() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  return { ref, opacity };
}

/* ── Scroll-bound hook: scale up as element enters viewport ── */

export function useScrollScale(from = 0.85, to = 1) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const scale = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [from, to, to, from]);
  return { ref, scale };
}

/* ── Scroll-bound hook: horizontal slide driven by scroll ── */

export function useScrollX(distance = 200) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const x = useSpring(
    useTransform(scrollYProgress, [0, 1], [distance, -distance]),
    { stiffness: 80, damping: 30 }
  );
  return { ref, x };
}

/* ── One-screen scroll animation: progress 0→1 while element is pinned ── */

export function useOneScreenProgress() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  return { ref, progress: scrollYProgress };
}
