import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent, MotionValue } from "framer-motion";

interface TextRevealItem {
  text: string;
}

interface TextRevealSectionProps {
  items: TextRevealItem[];
  sectionLabel?: string;
}

/**
 * Integrated Bio-style pinned scroll section.
 * The section pins to the viewport. Shows one paragraph at a time.
 * As the user scrolls, words highlight from dim to bright.
 * When one paragraph is fully highlighted, it crossfades to the next.
 * Progress bar fills across the top. Step counter shows "01 / 03".
 */
export function TextRevealSection({ items, sectionLabel }: TextRevealSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const total = items.length;
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const idx = Math.min(Math.floor(v * total), total - 1);
    setActiveIndex(idx);
  });

  return (
    <div
      ref={containerRef}
      style={{ height: `${total * 200}vh` }}
      className="relative"
    >
      <div className="sticky top-0 flex h-screen flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-8 md:px-20">
          {sectionLabel && (
            <span className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-primary">
              <span className="h-2 w-2 rounded-sm bg-primary" />
              {sectionLabel}
            </span>
          )}
        </div>

        {/* Progress bar */}
        <div className="relative mx-6 mt-6 h-[2px] md:mx-20">
          <div className="h-full w-full bg-border/30" />
          <motion.div
            className="absolute inset-y-0 left-0 origin-left bg-primary"
            style={{ scaleX: scrollYProgress }}
          />
        </div>

        {/* Step counter */}
        <div className="px-6 pt-6 md:px-20">
          <CurrentStep activeIndex={activeIndex} total={total} />
        </div>

        {/* Text area — fills remaining height and centers the text within it */}
        <div className="flex flex-1 items-center px-6 md:px-20">
          <div className="relative w-full max-w-4xl min-h-[35vh] md:ml-auto md:mr-0">
            {items.map((item, i) => (
              <ItemReveal
                key={i}
                text={item.text}
                index={i}
                total={total}
                progress={scrollYProgress}
                isActive={i === activeIndex}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function CurrentStep({
  activeIndex,
  total,
}: {
  activeIndex: number;
  total: number;
}) {
  return (
    <div className="flex items-baseline gap-2">
      {Array.from({ length: total }, (_, i) => (
        <span
          key={i}
          className={`text-sm font-medium transition-opacity duration-300 ${
            i <= activeIndex ? "opacity-100 text-foreground" : "opacity-25 text-foreground"
          }`}
        >
          {String(i + 1).padStart(2, "0")}
          {i < total - 1 && (
            <span className="ml-2 mr-1 text-muted-foreground/30">/</span>
          )}
        </span>
      ))}
    </div>
  );
}

function ItemReveal({
  text,
  index,
  total,
  progress,
  isActive,
}: {
  text: string;
  index: number;
  total: number;
  progress: MotionValue<number>;
  isActive: boolean;
}) {
  const segStart = index / total;
  const segEnd = (index + 1) / total;
  const words = text.split(" ");

  return (
    <div
      className="absolute inset-x-0 transition-opacity duration-300"
      style={{ opacity: isActive ? 1 : 0, pointerEvents: isActive ? "auto" : "none" }}
    >
      <p className="font-display text-[clamp(1.3rem,3.2vw,2.8rem)] font-medium leading-[1.35] tracking-tight">
        {words.map((word, wi) => (
          <WordReveal
            key={wi}
            word={word}
            wordIndex={wi}
            totalWords={words.length}
            segStart={segStart}
            segEnd={segEnd}
            progress={progress}
          />
        ))}
      </p>
    </div>
  );
}

function WordReveal({
  word,
  wordIndex,
  totalWords,
  segStart,
  segEnd,
  progress,
}: {
  word: string;
  wordIndex: number;
  totalWords: number;
  segStart: number;
  segEnd: number;
  progress: MotionValue<number>;
}) {
  // Words highlight across 90% of the segment duration
  const segLen = segEnd - segStart;
  const highlightRange = segLen * 0.9;
  const wordStart = segStart + (wordIndex / totalWords) * highlightRange;
  const wordEnd = segStart + ((wordIndex + 1) / totalWords) * highlightRange;

  const color = useTransform(
    progress,
    [wordStart, wordEnd],
    ["hsl(var(--foreground) / 0.15)", "hsl(var(--foreground) / 1)"]
  );

  return (
    <motion.span style={{ color }}>
      {word}{" "}
    </motion.span>
  );
}
