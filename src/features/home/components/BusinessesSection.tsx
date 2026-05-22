import { useState, useRef, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { BUSINESSES, type Business } from "@/constants/businesses";
import { COMPANY } from "@/constants/company";
import { useParallax } from "@/lib/animations";

/* ── helpers ─────────────────────────────── */

function zeroPad(n: number) {
  return String(n + 1).padStart(2, "0");
}

/* ── sub-components ──────────────────────── */

interface BusinessRowProps {
  biz: Business;
  index: number;
}

function ColorPanel({ biz, index }: { biz: Business; index: number }) {
  return (
    <div
      className="relative flex items-center overflow-hidden min-h-32 md:min-h-48"
      style={{ background: biz.color }}
    >
      {/* subtle radial overlay */}
      <div className="pointer-events-none absolute inset-0 bg-black/10" />
      
      {/* Left section - Number (20%) */}
      <div className="relative w-1/5 h-full flex items-center justify-center">
        <span
          className="select-none font-display text-xl md:text-3xl font-bold leading-none tracking-tighter text-white/30"
          aria-hidden
        >
          {zeroPad(index)}
        </span>
      </div>
      
      {/* Right section - Logo (80%) */}
      <div className="relative w-4/5 h-full flex items-center justify-center">
        <img 
          src="/images/logo.png" 
          alt={`${biz.name} logo`}
          className="relative w-16 h-16 md:w-28 md:h-28 object-contain opacity-30"
        />
      </div>
    </div>
  );
}

function TextPanel({ biz, index }: { biz: Business; index: number }) {
  return (
    <div className="flex flex-col justify-center px-6 py-10 md:px-16 md:py-20">
      {/* <span className="font-mono text-xs font-semibold uppercase tracking-[0.3em] text-primary">
        {zeroPad(index)}
      </span> */}

      <h3 className="mt-4 font-display text-[clamp(1.5rem,6vw,4rem)] font-bold leading-[1.05] text-foreground">
        {biz.name}
      </h3>

      <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.28em] text-muted-foreground">
        {biz.tagline}
      </p>

      <p className="mt-6 max-w-sm text-sm leading-relaxed text-muted-foreground md:text-base">
        {biz.description}
      </p>

      <Link
        to={`/businesses/${biz.slug}`}
        className="mt-8 inline-flex w-fit items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-medium text-foreground transition-all duration-300 hover:border-primary hover:text-primary"
      >
        Explore
        <ArrowUpRight size={14} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </Link>
    </div>
  );
}

/* ── main section ────────────────────────── */

const SLIDE_DISTANCE = 380;
const EASE: [number, number, number, number] = [0.25, 1, 0.3, 1];
const AUTO_INTERVAL = 3500;

const cardVariants = {
  enter: (dir: number) => ({
    x: dir >= 0 ? SLIDE_DISTANCE : -SLIDE_DISTANCE,
    opacity: 0,
    scale: 0.88,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: EASE },
  },
  exit: (dir: number) => ({
    x: dir >= 0 ? -SLIDE_DISTANCE : SLIDE_DISTANCE,
    opacity: 0,
    scale: 0.88,
    transition: { duration: 0.6, ease: EASE },
  }),
};

const sideCardVariants = {
  enter: (dir: number) => ({
    x: dir >= 0 ? SLIDE_DISTANCE : -SLIDE_DISTANCE,
    opacity: 0,
    scale: 0.72,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 0.78,
    transition: { duration: 0.6, ease: EASE },
  },
  exit: (dir: number) => ({
    x: dir >= 0 ? -SLIDE_DISTANCE : SLIDE_DISTANCE,
    opacity: 0,
    scale: 0.72,
    transition: { duration: 0.6, ease: EASE },
  }),
};

export function BusinessesSection() {
  const heading = useParallax(50);
  const [currentIndex, setCurrentIndex] = useState(0);
  const direction = useRef(0);
  const paused = useRef(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const prevIndex = (currentIndex - 1 + BUSINESSES.length) % BUSINESSES.length;
  const nextIndex = (currentIndex + 1) % BUSINESSES.length;

  const handlePrev = useCallback(() => {
    direction.current = -1;
    setCurrentIndex((i) => (i - 1 + BUSINESSES.length) % BUSINESSES.length);
  }, []);

  const handleNext = useCallback(() => {
    direction.current = 1;
    setCurrentIndex((i) => (i + 1) % BUSINESSES.length);
  }, []);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      if (!paused.current) handleNext();
    }, AUTO_INTERVAL);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [handleNext]);

  const slideTransition = (delay: number) => ({
    duration: 0.6,
    ease: EASE,
    delay,
  });

  return (
    <section id="businesses" className="relative px-6 py-28 md:px-20 md:py-40">
      <div className="mx-auto w-full max-w-7xl">
        <motion.div
          ref={heading.ref}
          style={{ y: heading.y }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="mb-20 md:mb-28"
        >
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
            Portfolio
          </span>
          <h2 className="mt-4 font-display text-[clamp(2.5rem,6vw,6rem)] font-bold leading-[0.95] text-foreground">
            Our Businesses
          </h2>
          <p className="mt-6 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">
            At the heart of {COMPANY.name}&apos;s success lies the synergy between
            our group companies. Each brand embodies the principles of innovation,
            adaptability, and excellence.
          </p>
        </motion.div>

        <div
          className="relative flex items-center justify-center"
          onMouseEnter={() => { paused.current = true; }}
          onMouseLeave={() => { paused.current = false; }}
        >
          {/* Left Arrow */}
          <motion.button
            onClick={handlePrev}
            className="absolute left-0 z-30 p-2 md:p-3 rounded-full border-2 border-border hover:border-primary hover:text-primary transition-colors duration-300"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <ChevronLeft size={24} />
          </motion.button>

          {/* Carousel Container */}
          <div className="w-full flex items-center justify-center gap-6 md:gap-8 px-12 md:px-20 overflow-hidden">
            {/* Left Card */}
            <div className="hidden md:flex flex-1 min-w-0 justify-end">
              <div className="w-full max-w-xs">
                <AnimatePresence mode="popLayout" custom={direction.current}>
                  <motion.div
                    key={`left-${prevIndex}`}
                    custom={direction.current}
                    variants={sideCardVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={slideTransition(0)}
                    className="flex flex-col overflow-hidden rounded-2xl border-2 border-border cursor-pointer origin-center"
                    onClick={handlePrev}
                  >
                    <ColorPanel biz={BUSINESSES[prevIndex]} index={prevIndex} />
                    <TextPanel biz={BUSINESSES[prevIndex]} index={prevIndex} />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Center Card */}
            <div className="flex-1 min-w-0 md:flex-1">
              <div className="w-full max-w-sm">
                <AnimatePresence mode="popLayout" custom={direction.current}>
                  <motion.div
                    key={`center-${currentIndex}`}
                    custom={direction.current}
                    variants={cardVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={slideTransition(0.08)}
                    className="flex flex-col overflow-hidden rounded-2xl border-2 border-primary cursor-default origin-center"
                  >
                    <ColorPanel biz={BUSINESSES[currentIndex]} index={currentIndex} />
                    <TextPanel biz={BUSINESSES[currentIndex]} index={currentIndex} />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Right Card */}
            <div className="hidden md:flex flex-1 min-w-0 justify-start">
              <div className="w-full max-w-xs">
                <AnimatePresence mode="popLayout" custom={direction.current}>
                  <motion.div
                    key={`right-${nextIndex}`}
                    custom={direction.current}
                    variants={sideCardVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={slideTransition(0.16)}
                    className="flex flex-col overflow-hidden rounded-2xl border-2 border-border cursor-pointer origin-center"
                    onClick={handleNext}
                  >
                    <ColorPanel biz={BUSINESSES[nextIndex]} index={nextIndex} />
                    <TextPanel biz={BUSINESSES[nextIndex]} index={nextIndex} />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Right Arrow */}
          <motion.button
            onClick={handleNext}
            className="absolute right-0 z-30 p-2 md:p-3 rounded-full border-2 border-border hover:border-primary hover:text-primary transition-colors duration-300"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <ChevronRight size={24} />
          </motion.button>
        </div>

        {/* Dot indicators */}
        <div className="mt-10 flex items-center justify-center gap-2">
          {BUSINESSES.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                direction.current = i > currentIndex ? 1 : -1;
                setCurrentIndex(i);
              }}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === currentIndex
                  ? "w-6 bg-primary"
                  : "w-2 bg-border hover:bg-muted-foreground"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

