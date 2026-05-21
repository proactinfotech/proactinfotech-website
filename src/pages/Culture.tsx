import { motion } from "framer-motion";
import { COMPANY } from "@/constants/company";
import { stagger, fadeUp, fadeLeft, fadeRight, useParallax } from "@/lib/animations";
import { TextRevealSection } from "@/components/layout/TextRevealSection";
import { ExploreButton } from "@/components/layout/ExploreButton";
import { RepelWrapper } from "@/components/ui/RepelWrapper";

const VALUES = [
  { title: "Intellectual Courage", description: "We seek out the hardest truths. The best ideas emerge when people are brave enough to challenge assumptions and speak honestly." },
  { title: "Radical Ownership", description: "We don't wait for permission. Everyone at the company has the authority — and the responsibility — to drive outcomes." },
  { title: "Relentless Craft", description: "Details matter. We hold ourselves to the highest standard in everything we build, write, and ship." },
  { title: "Long-Term Thinking", description: "We optimize for decades, not quarters. Every decision is made with our grandchildren's world in mind." },
];

const PRINCIPLES_ITEMS = [
  {
    label: "Principle 01",
    text: "We hire missionaries, not mercenaries. Passion can't be faked, and it's the fuel that powers everything we build.",
  },
  {
    label: "Principle 02",
    text: "We debate ideas fiercely and commit fully. Rigorous intellectual debate leads to better decisions, and once made, we align completely.",
  },
  {
    label: "Principle 03",
    text: "We celebrate learning from failure. The only failure is not trying at all. Every experiment teaches us something new.",
  },
  {
    label: "Principle 04",
    text: "We default to transparency and build for the user. Information asymmetry kills trust, and every interaction is designed with the end user in mind.",
  },
];

const Culture = () => (
  <>
    <CultureHero />
    <ValuesSection />
    <TextRevealSection items={PRINCIPLES_ITEMS} sectionLabel="Operating Principles" />
    <LifeSection />
  </>
);

function CultureHero() {
  return (
    <section id="culture-hero" className="flex min-h-[100svh] items-center px-6 py-20 md:min-h-[80vh] md:py-32 md:px-20">
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
          Culture
        </motion.span>
        <RepelWrapper variants={fadeUp}>
          <h1 className="max-w-5xl font-display text-[clamp(2rem,6vw,6.5rem)] font-bold leading-[0.9] tracking-tight text-foreground">
            How we work
            <br />
            <span className="text-primary">defines what</span>
            <br />
            <span className="text-accent">we build.</span>
          </h1>
        </RepelWrapper>
        <motion.p
          variants={fadeRight}
          className="mt-10 max-w-lg text-base leading-relaxed text-muted-foreground md:text-lg"
        >
          Our culture isn&apos;t a poster on the wall. It&apos;s how we make decisions,
          how we disagree, and what we refuse to compromise on.
        </motion.p>
        <ExploreButton />
      </motion.div>
    </section>
  );
}

function ValuesSection() {
  const heading = useParallax(40);

  return (
    <section id="values" className="px-6 py-24 md:py-32 md:px-20">
      <div className="mx-auto max-w-7xl">
        <motion.div
          ref={heading.ref}
          style={{ y: heading.y }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 md:mb-20"
        >
          <h2 className="font-display text-[clamp(2rem,5vw,5rem)] font-bold leading-[0.95] text-foreground">
            Our Values
          </h2>
        </motion.div>

        <div className="grid gap-8 md:gap-12 md:grid-cols-2">
          {VALUES.map((value, i) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50, scale: 0.94 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              whileHover={{ y: -4, transition: { duration: 0.3 } }}
              className="border-t border-border pt-8 md:pt-10"
            >
              <h3 className="font-display text-2xl font-bold text-primary md:text-4xl">
                {value.title}
              </h3>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">
                {value.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function LifeSection() {
  const leftCol = useParallax(35);
  const rightCol = useParallax(55);

  return (
    <section id="life" className="px-6 py-24 md:py-32 md:px-20">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 md:gap-20 md:grid-cols-2">
          <motion.div
            ref={leftCol.ref}
            style={{ y: leftCol.y }}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-primary">
              <span className="h-px w-8 bg-primary" />
              Life at {COMPANY.name}
            </span>
            <h2 className="mt-8 font-display text-[clamp(2rem,4vw,4.5rem)] font-bold leading-[0.95] text-foreground">
              Built for people
              <br />
              <span className="text-accent">who want to matter.</span>
            </h2>
          </motion.div>

          <motion.div
            ref={rightCol.ref}
            style={{ y: rightCol.y }}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="flex flex-col justify-center"
          >
            <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
              We foster an environment where curiosity thrives, collaboration is natural,
              and every voice shapes the direction of the company. Remote-first, globally
              distributed, unapologetically ambitious.
            </p>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground md:text-lg">
              Annual team retreats. Unlimited learning budgets. Real equity. And the kind
              of problems that keep you up at night — in the best way.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default Culture;
