import { motion } from "framer-motion";
import { COMPANY } from "@/constants/company";
import { ExploreButton } from "@/components/layout/ExploreButton";
import { RepelWrapper } from "@/components/ui/RepelWrapper";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};

const Investors = () => {
  return (
    <section className="flex min-h-[100svh] items-center px-6 py-20 md:px-20 md:py-28">
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="show"
        className="mx-auto w-full max-w-7xl"
      >
        <motion.span
          variants={fadeUp}
          className="mb-8 inline-block text-xs font-semibold uppercase tracking-[0.3em] text-primary"
        >
          Investors
        </motion.span>
        <RepelWrapper variants={fadeUp}>
          <h1 className="font-display text-[clamp(2.5rem,6.5vw,7rem)] font-bold leading-[0.9] tracking-tight text-foreground">
            Coming
            <br />
            <span className="text-primary">Soon.</span>
          </h1>
        </RepelWrapper>
        <motion.p
          variants={fadeUp}
          className="mt-12 max-w-lg text-base leading-relaxed text-muted-foreground md:text-lg"
        >
          We&apos;re preparing our investor relations page. Check back soon for
          financial updates, reports, and shareholder information about {COMPANY.name}.
        </motion.p>
        <motion.div variants={fadeUp} className="mt-12 flex">
          <ExploreButton />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Investors;
