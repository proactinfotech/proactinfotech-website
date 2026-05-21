import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useVelocity,
  useSpring,
  useAnimationFrame,
} from "framer-motion";
import { COMPANY } from "@/constants/company";

const BASE_SPEED = 0.55;      // px per frame at rest
const VELOCITY_FACTOR = 0.025; // how much scroll velocity adds to speed

export function MarqueeStrip() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);

  // Continuous JS-driven x position — no CSS animation involved
  const x = useMotionValue(0);

  // Framer-native velocity pipeline: scrollY → velocity → spring-smoothed
  const { scrollY } = useScroll();
  const rawVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(rawVelocity, {
    stiffness: 25,
    damping: 20,
    restDelta: 0.001,
  });

  // Subtle skew driven by scroll progress through this section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const skewX = useTransform(scrollYProgress, [0, 0.5, 1], [2, 0, -2]);

  useAnimationFrame(() => {
    if (!stripRef.current) return;

    // scrollVelocity is in px/s; scale it down to px/frame contribution
    const velocityBoost = smoothVelocity.get() * VELOCITY_FACTOR;
    const delta = BASE_SPEED + velocityBoost;

    // Seamless wrap: loop at the halfway point (2 copies out of 4)
    const halfWidth = stripRef.current.scrollWidth / 2;
    let next = x.get() - delta;
    if (next <= -halfWidth) next += halfWidth;
    if (next > 0) next -= halfWidth;
    x.set(next);
  });

  const words = COMPANY.marqueeText.split(" · ");
  // 4 copies ensures the strip is always wider than the viewport
  const repeated = [...words, ...words, ...words, ...words];

  return (
    <motion.div
      ref={sectionRef}
      style={{ skewX }}
      className="overflow-hidden border-y border-border/50 py-10 md:py-14"
    >
      <motion.div
        ref={stripRef}
        className="flex whitespace-nowrap will-change-transform"
        style={{ x }}
      >
        {repeated.map((word, i) => (
          <span
            key={i}
            className="mx-10 font-display text-[clamp(3rem,7vw,7rem)] font-bold text-primary md:mx-16"
          >
            {word}
          </span>
        ))}
      </motion.div>
    </motion.div>
  );
}

