import { useEffect, useState } from "react";

/**
 * Hero border frame effect: a thin rounded border inset from viewport edges.
 * Fades out as user scrolls down. Uses fixed positioning values.
 */
export function useHeroBorderFade(fadeDistance = 400) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      setProgress(Math.min(window.scrollY / fadeDistance, 1));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [fadeDistance]);

  const baseInset = 12;
  // Border moves outward on scroll (inset shrinks toward 0)
  const borderInset = baseInset * (1 - progress);
  const opacity = 1 - progress;
  const borderRadius = 20 * (1 - progress);

  return { borderInset, opacity, borderRadius, progress };
}
