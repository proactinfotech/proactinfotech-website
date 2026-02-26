import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { COMPANY } from "@/constants/company";
import { fadeLeft, fadeRight, useParallax, useScrollScale } from "@/lib/animations";
import { RepelWrapper } from "@/components/ui/RepelWrapper";

export function WorkingSection() {
  const textBlock = useParallax(40);
  const imageBlock = useScrollScale(0.88, 1);

  return (
    <section id="careers" className="px-6 py-16 md:px-20 md:py-40">
      <div className="mx-auto max-w-7xl">
        <div className="grid items-start gap-16 md:gap-20 md:grid-cols-2">
          <motion.div
            ref={textBlock.ref}
            style={{ y: textBlock.y }}
            initial={{ opacity: 0, x: -60 }}
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
              Careers
            </span>
            <RepelWrapper config={{ maxRepel: 18 }}>
              <h2 className="mt-8 font-display text-[clamp(2rem,5vw,5.5rem)] font-bold leading-[0.95] text-foreground">
                Working at
                <br />
                <span className="text-primary">{COMPANY.name}</span>
              </h2>
            </RepelWrapper>
            <p className="mt-10 max-w-md text-base leading-relaxed text-muted-foreground md:text-lg">
              We believe the best work happens when exceptional people come
              together with a shared mission. Our culture celebrates bold
              ideas, intellectual honesty, and the pursuit of greatness.
            </p>
            <motion.a
              href={COMPANY.jobsUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="mt-12 inline-flex items-center gap-2 rounded-full border border-border px-8 py-3 text-sm font-medium text-foreground transition-colors hover:border-primary hover:text-primary"
            >
              View open positions
              <ArrowUpRight size={14} />
            </motion.a>
          </motion.div>

          <motion.div
            ref={imageBlock.ref}
            style={{ scale: imageBlock.scale }}
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="flex aspect-[4/3] items-center justify-center rounded-2xl border border-border bg-secondary/30"
          >
            <span className="font-display text-6xl font-bold text-foreground/5 md:text-8xl">
              Culture
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
