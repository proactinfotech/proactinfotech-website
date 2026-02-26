import { useRef, useCallback } from "react";
import { useMotionValue, useSpring, type MotionValue } from "framer-motion";

export interface RepelConfig {
  /** Max pixel offset the element can be pushed. Default: 20 */
  maxRepel?: number;
  /** Spring stiffness. Default: 160 */
  stiffness?: number;
  /** Spring damping. Default: 24 */
  damping?: number;
  /** Spring mass. Default: 0.7 */
  mass?: number;
}

export interface RepelReturn {
  containerRef: React.RefObject<HTMLDivElement>;
  x: MotionValue<number>;
  y: MotionValue<number>;
  onMouseMove: (e: React.MouseEvent<HTMLDivElement>) => void;
  onMouseLeave: () => void;
}

const DEFAULT_CONFIG: Required<RepelConfig> = {
  maxRepel: 20,
  stiffness: 160,
  damping: 24,
  mass: 0.7,
};

/**
 * Provides cursor-repel motion values for a container element.
 * The returned `x` / `y` springs push content away from the cursor.
 */
export function useRepel(config: RepelConfig = {}): RepelReturn {
  const { maxRepel, stiffness, damping, mass } = { ...DEFAULT_CONFIG, ...config };

  const containerRef = useRef<HTMLDivElement>(null);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness, damping, mass });
  const y = useSpring(rawY, { stiffness, damping, mass });

  const onMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const el = containerRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.sqrt(dx * dx + dy * dy) || 1;
      const maxDist = Math.max(rect.width, rect.height) * 1.2;

      if (dist < maxDist) {
        const strength = (1 - dist / maxDist) * maxRepel;
        rawX.set(-(dx / dist) * strength);
        rawY.set(-(dy / dist) * strength);
      } else {
        rawX.set(0);
        rawY.set(0);
      }
    },
    [rawX, rawY, maxRepel],
  );

  const onMouseLeave = useCallback(() => {
    rawX.set(0);
    rawY.set(0);
  }, [rawX, rawY]);

  return { containerRef, x, y, onMouseMove, onMouseLeave };
}
