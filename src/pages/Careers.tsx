import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { COMPANY } from "@/constants/company";
import { stagger, fadeUp, fadeLeft, fadeRight, useParallax } from "@/lib/animations";
import { ExploreButton } from "@/components/layout/ExploreButton";

const PERKS = [
  { title: "Remote-first", description: "Work from anywhere. We hire globally and trust our people." },
  { title: "Competitive equity", description: "Meaningful ownership in the businesses you help build." },
  { title: "Unlimited PTO", description: "We measure output, not hours. Rest when you need to." },
  { title: "Learning budget", description: "$5,000/year for courses, books, conferences, and tools." },
  { title: "Team retreats", description: "Annual all-hands in incredible locations around the world." },
  { title: "Health & wellness", description: "Comprehensive coverage for you and your family." },
];

const Careers = () => (
  <>
    <CareersHero />
    <WhyJoinSection />
    <OpeningsSection />
  </>
);

function CareersHero() {
  return (
    <section id="careers-hero" className="flex min-h-[70vh] items-end px-6 pb-20 pt-32 md:min-h-[80vh] md:pb-24 md:px-20">
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="show"
        className="mx-auto w-full max-w-7xl"
      >
        <motion.span
          variants={fadeLeft}
          className="mb-8 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-primary"
        >
          <motion.span
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="h-px w-10 origin-left bg-primary"
          />
          Careers
        </motion.span>
        <motion.h1
          variants={fadeUp}
          className="max-w-5xl font-display text-[clamp(2.5rem,9vw,9rem)] font-bold leading-[0.9] tracking-tight text-foreground"
        >
          Do the most
          <br />
          <span className="text-primary">important work</span>
          <br />
          <span className="text-accent">of your </span>
          career.
        </motion.h1>
        <motion.p
          variants={fadeRight}
          className="mt-10 max-w-lg text-base leading-relaxed text-muted-foreground md:text-lg"
        >
          We&apos;re looking for builders, thinkers, and doers who want to leave
          a dent in the universe. If that&apos;s you, we&apos;d love to talk.
        </motion.p>
        <ExploreButton />
      </motion.div>
    </section>
  );
}

function WhyJoinSection() {
  const heading = useParallax(40);

  return (
    <section id="why-join" className="px-6 py-24 md:py-32 md:px-20">
      <div className="mx-auto max-w-7xl">
        <motion.div
          ref={heading.ref}
          style={{ y: heading.y }}
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 md:mb-20"
        >
          <h2 className="font-display text-[clamp(2rem,5vw,5rem)] font-bold leading-[0.95] text-foreground">
            Why <span className="text-primary">{COMPANY.name}</span>
          </h2>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 md:gap-8 lg:grid-cols-3">
          {PERKS.map((perk, i) => (
            <motion.div
              key={perk.title}
              initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40, scale: 0.94 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.08 * i }}
              whileHover={{ y: -4, transition: { duration: 0.3 } }}
              className="border-t border-border pt-6 md:pt-8"
            >
              <h3 className="font-display text-xl font-bold text-primary md:text-2xl">
                {perk.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {perk.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function OpeningsSection() {
  const content = useParallax(30);

  return (
    <section id="openings" className="px-6 py-24 md:py-32 md:px-20">
      <div className="mx-auto max-w-7xl">
        <motion.div
          ref={content.ref}
          style={{ y: content.y }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between"
        >
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-display text-[clamp(2rem,4vw,4.5rem)] font-bold leading-[0.95] text-foreground">
              Open <span className="text-accent">Positions</span>
            </h2>
            <p className="mt-4 max-w-md text-base leading-relaxed text-muted-foreground">
              Explore our current openings and find where you can make the biggest impact.
            </p>
          </motion.div>
          <motion.a
            href={COMPANY.jobsUrl}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 rounded-full border border-border px-8 py-4 text-sm font-medium text-foreground transition-colors hover:border-primary hover:text-primary md:px-10"
          >
            View all openings
            <ArrowUpRight size={16} />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}

export default Careers;
