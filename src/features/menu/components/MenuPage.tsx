import { useCallback, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { COMPANY } from "@/constants/company";
import { MENU_NAV_ITEMS } from "@/features/menu/constants";
import { MenuNavLink } from "@/features/menu/components/MenuNavLink";
import { RepelLogo } from "@/features/menu/components/RepelLogo";
import { useRepel } from "@/hooks/useRepel";

const DIVIDER_VARIANTS = {
  hidden: { scaleY: 0 },
  show: { scaleY: 1, transition: { duration: 0.9, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] as const } },
};

const PANEL_REPEL = { maxRepel: 32, stiffness: 140, damping: 26, mass: 0.7 };

const TILT_SPRING = { stiffness: 120, damping: 28, mass: 0.6 };
const MAX_TILT = 8; // degrees

/** Wraps children in a perspective container that tilts toward the cursor */
function NavTiltPanel({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  const rawRotX = useMotionValue(0);
  const rawRotY = useMotionValue(0);
  const rotateX = useSpring(rawRotX, TILT_SPRING);
  const rotateY = useSpring(rawRotY, TILT_SPRING);

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const { left, top, width, height } = el.getBoundingClientRect();
    // Normalise to -1 … +1
    const nx = ((e.clientX - left) / width - 0.5) * 2;
    const ny = ((e.clientY - top) / height - 0.5) * 2;
    rawRotY.set(nx * MAX_TILT);
    rawRotX.set(-ny * MAX_TILT);
  }, [rawRotX, rawRotY]);

  const onMouseLeave = useCallback(() => {
    rawRotX.set(0);
    rawRotY.set(0);
  }, [rawRotX, rawRotY]);

  return (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{ perspective: "900px" }}
      className="flex w-full flex-col items-stretch justify-center gap-1 md:w-3/5 md:items-end md:pl-8 lg:pl-14"
    >
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="w-full"
      >
        {children}
      </motion.div>
    </div>
  );
}

/** Letter-by-letter animated text */
function AnimatedText({ text, delay = 0, className }: { text: string; delay?: number; className?: string }) {
  return (
    <span className={className} aria-label={text}>
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: delay + i * 0.022 }}
          className="inline-block"
          style={{ whiteSpace: char === " " ? "pre" : undefined }}
        >
          {char}
        </motion.span>
      ))}
    </span>
  );
}

/** Soft cursor-tracking glow */
function CursorGlow() {
  const rawX = useMotionValue(-300);
  const rawY = useMotionValue(-300);
  const x = useSpring(rawX, { stiffness: 80, damping: 20 });
  const y = useSpring(rawY, { stiffness: 80, damping: 20 });

  const onMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    rawX.set(e.clientX - rect.left);
    rawY.set(e.clientY - rect.top);
  }, [rawX, rawY]);

  const onLeave = useCallback(() => {
    rawX.set(-300);
    rawY.set(-300);
  }, [rawX, rawY]);

  return (
    <div onMouseMove={onMove} onMouseLeave={onLeave} className="pointer-events-auto absolute inset-0">
      <motion.div
        style={{ x, y, translateX: "-50%", translateY: "-50%" }}
        className="pointer-events-none absolute h-64 w-64 rounded-full bg-primary/6 blur-3xl"
      />
    </div>
  );
}

export function MenuPage() {
  const navItems = MENU_NAV_ITEMS.map((item, i) => ({
    ...item,
    index: i + 1,
  }));

  // Shared repel hook — moves the entire left content block away from cursor
  const { containerRef: panelRef, x, y, onMouseMove, onMouseLeave } = useRepel(PANEL_REPEL);

  return (
    <section className="relative flex min-h-screen flex-col px-6 py-12 md:flex-row md:px-16 lg:px-24">

      {/* ── Left panel ── */}
      <div
        ref={panelRef}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        className="relative flex flex-col justify-center pb-8 md:w-2/5 md:pb-0 md:pr-12 lg:pr-20"
      >
        {/* Glow stays fixed to panel, doesn't move with content */}
        <CursorGlow />

        {/* Everything inside moves together as one repelling block */}
        <motion.div style={{ x, y }} className="relative z-10 flex flex-col">
          {/* Welcome badge — pulsing dot */}
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-primary/20 bg-card/50 px-4 py-1.5 font-body text-[10px] font-semibold uppercase tracking-[0.25em] text-primary md:mb-8 md:text-xs"
          >
            <motion.span
              animate={{ scale: [1, 1.5, 1], opacity: [1, 0.4, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="h-1.5 w-1.5 rounded-full bg-primary"
            />
            Welcome
          </motion.span>

          <RepelLogo />

          {/* Tagline — letter-by-letter stagger */}
          <div className="mt-6 md:mt-8">
            <AnimatedText
              text={COMPANY.tagline}
              delay={0.5}
              className="max-w-sm font-body text-sm leading-relaxed text-muted-foreground md:text-base"
            />
          </div>

          {/* Empowering message */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.0 }}
            className="mt-4 max-w-sm font-body text-xs leading-relaxed text-muted-foreground/60 md:mt-5 md:text-sm"
          >
            We empower visionary teams to build what the world needs next.
            Discover who we are, what drives us, and how we&apos;re shaping
            the future — one venture at a time.
          </motion.p>

          {/* Animated rule */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.7, delay: 1.1, ease: [0.25, 0.46, 0.45, 0.94] as const }}
            className="mt-8 h-px w-20 origin-left bg-primary/30 md:mt-10"
          />

          {/* Email pill */}
          <motion.a
            href={`mailto:${COMPANY.email}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.5 }}
            whileHover={{ x: 5, scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            className="mt-5 inline-flex w-fit items-center gap-2 rounded-full border border-border/40 px-5 py-2 font-body text-xs tracking-wide text-muted-foreground transition-colors hover:border-primary hover:text-primary"
          >
            {COMPANY.email}
          </motion.a>
        </motion.div>
      </div>

      {/* Vertical divider */}
      <motion.div
        variants={DIVIDER_VARIANTS}
        initial="hidden"
        animate="show"
        className="my-10 h-px w-full origin-left bg-border/30 md:my-0 md:h-auto md:w-px md:origin-top"
      />

      {/* ── Right panel — nav links ── */}
      <NavTiltPanel>
        <nav className="flex flex-col items-end gap-1">
          {navItems.map((item) => (
            <MenuNavLink key={item.href} item={item} />
          ))}
        </nav>
      </NavTiltPanel>

      {/* Bottom bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        className="absolute bottom-6 left-6 right-6 flex items-center justify-between font-body text-[10px] uppercase tracking-[0.25em] text-muted-foreground md:bottom-8 md:left-16 md:right-16 md:text-xs"
      >
        <span>© {new Date().getFullYear()} {COMPANY.name}</span>
        <span className="hidden sm:inline">Scroll to explore</span>
      </motion.div>
    </section>
  );
}
