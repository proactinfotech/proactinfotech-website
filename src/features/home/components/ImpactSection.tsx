import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useParallax } from "@/lib/animations";

const STATS = [
  { stat: "50M+", label: "Lives impacted" },
  { stat: "12", label: "Countries" },
  { stat: "100%", label: "Carbon neutral goal" },
];

export function ImpactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const heading = useParallax(50);

  return (
    <section ref={sectionRef} id="impact" className="px-6 py-40 md:px-20">
      <div className="mx-auto max-w-7xl">
        <motion.div
          ref={heading.ref}
          style={{ y: heading.y }}
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
        >
          <span className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-primary">
            <motion.span
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="h-px w-8 origin-left bg-primary"
            />
            Our Impact
          </span>
          <h2 className="mt-8 max-w-4xl font-display text-[clamp(2rem,6vw,6rem)] font-bold leading-[0.95] text-foreground">
            Making a difference
            <br />
            <span className="text-accent">beyond business.</span>
          </h2>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted-foreground">
            We&apos;re committed to creating positive change — from climate
            conscious operations to community engagement. Details coming soon.
          </p>
        </motion.div>

        <div className="mt-20 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {STATS.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, x: i === 0 ? -50 : i === 2 ? 50 : 0, y: i === 1 ? 50 : 0, scale: 0.9 }}
              whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 + i * 0.15, type: "spring", stiffness: 100 }}
              whileHover={{ y: -6, transition: { duration: 0.3 } }}
              className="rounded-xl border border-border bg-secondary/30 p-8 transition-colors duration-300 hover:border-primary/30 md:p-10"
            >
              <div className="font-display text-[clamp(2.5rem,5vw,5rem)] font-bold leading-none text-primary">
                {item.stat}
              </div>
              <div className="mt-4 text-xs uppercase tracking-widest text-muted-foreground">
                {item.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
