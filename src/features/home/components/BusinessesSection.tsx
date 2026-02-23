import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
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
  const isEven = index % 2 === 0;
  return (
    <motion.div
      initial={{ opacity: 0, x: isEven ? 60 : -60 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="relative flex items-center justify-center overflow-hidden md:min-h-[420px]"
      style={{ background: biz.color }}
    >
      {/* subtle radial overlay */}
      <div className="pointer-events-none absolute inset-0 bg-black/10" />
      <span
        className="relative select-none font-display text-[clamp(5rem,14vw,12rem)] font-bold leading-none tracking-tighter text-white/10"
        aria-hidden
      >
        {zeroPad(index)}
      </span>
    </motion.div>
  );
}

function TextPanel({ biz, index }: { biz: Business; index: number }) {
  const isEven = index % 2 === 0;
  return (
    <motion.div
      initial={{ opacity: 0, x: isEven ? -60 : 60 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col justify-center px-10 py-14 md:px-16 md:py-20"
    >
      <span className="font-mono text-xs font-semibold uppercase tracking-[0.3em] text-primary">
        {zeroPad(index)}
      </span>

      <h3 className="mt-4 font-display text-[clamp(2rem,4.5vw,4rem)] font-bold leading-[1.05] text-foreground">
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
    </motion.div>
  );
}

function BusinessRow({ biz, index }: BusinessRowProps) {
  const isEven = index % 2 === 0;

  return (
    <div className="grid grid-cols-1 overflow-hidden rounded-2xl border-2 border-border md:grid-cols-2">
      {isEven ? (
        <>
          <TextPanel biz={biz} index={index} />
          <ColorPanel biz={biz} index={index} />
        </>
      ) : (
        <>
          <ColorPanel biz={biz} index={index} />
          <TextPanel biz={biz} index={index} />
        </>
      )}
    </div>
  );
}

/* ── main section ────────────────────────── */

export function BusinessesSection() {
  const heading = useParallax(50);

  return (
    <section id="businesses" className="relative px-6 py-28 md:px-20 md:py-40">
      <div className="mx-auto max-w-6xl">
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

        <div className="flex flex-col gap-6 md:gap-8">
          {BUSINESSES.map((biz, i) => (
            <BusinessRow key={biz.slug} biz={biz} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

