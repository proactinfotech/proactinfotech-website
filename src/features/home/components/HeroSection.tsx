import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { COMPANY } from "@/constants/company";
import { stagger, fadeUp } from "@/lib/animations";

function scrollToBusinesses() {
  const el = document.getElementById("businesses");
  if (el) el.scrollIntoView({ behavior: "smooth" });
}

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const textY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const lineScaleY = useTransform(scrollYProgress, [0, 0.5], [1, 2.5]);

  return (
    <section ref={sectionRef} id="hero" className="relative min-h-screen overflow-hidden">
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="show"
        style={{ y: textY, opacity: textOpacity }}
        className="relative z-10 flex min-h-screen flex-col justify-center px-6 py-32 md:px-20"
      >
        <div className="mx-auto w-full max-w-7xl">
          <motion.div variants={fadeUp} className="mb-10 flex items-center gap-3">
            <motion.span
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="h-px w-10 origin-left bg-primary"
            />
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
              {COMPANY.name}
            </span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="max-w-6xl font-display text-[clamp(3rem,10vw,10rem)] font-bold leading-[0.95] tracking-tight text-foreground"
          >
            Engineering
            <br />
            <span className="text-primary">the future</span>
            <br />
            <span className="text-accent">of tech</span>
            nology.
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-10 max-w-md text-base leading-relaxed text-muted-foreground md:text-lg"
          >
            {COMPANY.tagline}
          </motion.p>

          <motion.button
            variants={fadeUp}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollToBusinesses}
            className="mt-24 flex items-center gap-3 text-sm text-muted-foreground transition-colors hover:text-foreground"
            aria-label="Scroll to businesses"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-full border border-border transition-colors hover:border-primary/50">
              <ArrowDown size={18} className="animate-bounce" />
            </span>
            <span className="hidden text-xs uppercase tracking-widest md:inline">
              Explore
            </span>
          </motion.button>
        </div>
      </motion.div>
    </section>
  );
}
