import { useHeroBorderFade } from "@/hooks/useHeroBorderFade";

/**
 * Viewport-edge border frame overlay used on every page.
 * Creates a rounded window effect: a dark outer frame with rounded corners
 * sits on top of the viewport edges, making the page appear inside a
 * rounded rectangle. Fades out on scroll.
 */
export function HeroBorderFrame() {
  const { borderInset, opacity, borderRadius } = useHeroBorderFade();

  if (opacity <= 0) return null;

  // We use a large box-shadow on a transparent inset element to create
  // the dark outer frame that covers the viewport edges outside the rounded rect.
  return (
    <div
      className="pointer-events-none fixed inset-0 z-[100] overflow-hidden"
      style={{ opacity }}
    >
      <div
        style={{
          position: "absolute",
          top: `${borderInset}px`,
          left: `${borderInset}px`,
          right: `${borderInset}px`,
          bottom: `${borderInset}px`,
          borderRadius: `${borderRadius}px`,
          // Large spread shadow fills the area outside the rounded rect
          boxShadow: `0 0 0 ${borderInset + 50}px #2E4B3C`,
          border: "1.5px solid hsl(var(--primary) / 0.15)",
        }}
      />
    </div>
  );
}
