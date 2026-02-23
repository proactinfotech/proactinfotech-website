import { useEffect, useRef, useState } from "react";

/**
 * Returns a scroll-speed-aware velocity value.
 * Positive = scrolling down, negative = scrolling up.
 */
const EMA_ALPHA = 0.15; // lower = smoother, slower to react

export function useScrollVelocity() {
  const [velocity, setVelocity] = useState(0);
  const lastScroll = useRef(0);
  const lastTime = useRef(Date.now());
  const smoothed = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const now = Date.now();
      const dt = Math.max(now - lastTime.current, 16);
      const dy = window.scrollY - lastScroll.current;
      const raw = dy / dt;

      smoothed.current = smoothed.current * (1 - EMA_ALPHA) + raw * EMA_ALPHA;

      setVelocity(smoothed.current);
      lastScroll.current = window.scrollY;
      lastTime.current = now;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return velocity;
}
