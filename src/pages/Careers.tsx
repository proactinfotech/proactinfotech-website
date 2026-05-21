import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { COMPANY } from "@/constants/company";
import { stagger, fadeUp, fadeLeft, fadeRight, useParallax } from "@/lib/animations";
import { ExploreButton } from "@/components/layout/ExploreButton";
import { RepelWrapper } from "@/components/ui/RepelWrapper";

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
    <PeopleFirstSection />
    <WhyJoinSection />
    <OpeningsSection />
  </>
);

function CareersHero() {
  return (
    <section id="careers-hero" className="flex min-h-[100svh] items-center px-6 py-20 md:min-h-[80vh] md:py-32 md:px-20">
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
        <RepelWrapper variants={fadeUp}>
          <h1 className="max-w-5xl font-display text-[clamp(2rem,6vw,6.5rem)] font-bold leading-[0.9] tracking-tight text-foreground">
            Do the most
            <br />
            <span className="text-primary">important work</span>
            <br />
            <span className="text-accent">of your </span>
            career.
          </h1>
        </RepelWrapper>
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

function PeopleFirstSection() {
  const left = useParallax(25);
  const right = useParallax(25);

  return (
    <section className="px-6 py-24 md:px-20 md:py-32">
      <div className="mx-auto max-w-7xl">

        {/* Two-column layout, open and breathable */}
        <div className="grid gap-16 md:grid-cols-2 md:gap-24 lg:gap-32">

          {/* Left col — intro text */}
          <motion.div
            ref={left.ref}
            style={{ y: left.y }}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex flex-col justify-center"
          >
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="mb-8 font-display text-[clamp(1.8rem,3.5vw,3rem)] font-bold leading-[1.05] text-foreground"
            >
              Hiring is the most important role<br />
              at <span className="text-primary">{COMPANY.name}</span>
            </motion.h2>
            <p className="text-lg leading-[1.8] text-muted-foreground">
              Identifying, recruiting, and enabling the right people in the right teams is by far one of the highest leverage roles any of us play within the organization.
            </p>
            <p className="mt-6 text-lg leading-[1.8] text-muted-foreground">
              We are always on the lookout for exceptional folks to join {COMPANY.name}, no matter their experience. If you&apos;re passionate about what we&apos;re building, we&apos;ll find a place for you.
            </p>
            <p className="mt-8 font-display text-xl font-semibold leading-snug text-foreground md:text-2xl">
              We create opportunities around great people, not the other way around.
            </p>
          </motion.div>

          {/* Right col — questions */}
          <motion.div
            ref={right.ref}
            style={{ y: right.y }}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="flex flex-col justify-center"
          >
            <h2 className="font-display text-[clamp(1.6rem,3vw,2.8rem)] font-bold leading-[1.1] text-foreground">
              When we meet potential team members, we ask{" "}
              <span className="text-primary">ourselves:</span>
            </h2>
            <motion.ul
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="mt-10 space-y-5"
            >
              {[
                "Are they smarter than us?",
                "Are they more ambitious than us?",
                "Do they take full ownership of their lives?",
                "Are they comfortable saying, \"I don't know\"?",
              ].map((q) => (
                <motion.li
                  key={q}
                  variants={fadeUp}
                  className="flex items-start gap-4 text-lg leading-relaxed text-muted-foreground"
                >
                  <span className="mt-[0.55rem] h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  {q}
                </motion.li>
              ))}
            </motion.ul>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.55 }}
              className="mt-8 text-base text-muted-foreground/60"
            >
              If that sounds like you, we&apos;d love to meet&hellip;
            </motion.p>
          </motion.div>

        </div>
      </div>
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
