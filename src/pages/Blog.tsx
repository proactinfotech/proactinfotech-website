import { motion } from "framer-motion";
import { stagger, fadeUp, fadeLeft, fadeRight } from "@/lib/animations";
import { ExploreButton } from "@/components/layout/ExploreButton";
import { RepelWrapper } from "@/components/ui/RepelWrapper";

const Blog = () => {
  return (
    <section className="flex min-h-[100svh] items-center px-6 py-20 md:px-20 md:py-28">
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
          Blog
        </motion.span>
        <RepelWrapper variants={fadeUp}>
          <h1 className="max-w-5xl font-display text-[clamp(2rem,6vw,6.5rem)] font-bold leading-[0.9] tracking-tight text-foreground">
            Insights,
            <br />
            <span className="text-primary">stories &</span>
            <br />
            <span className="text-accent">updates.</span>
          </h1>
        </RepelWrapper>
        <motion.p
          variants={fadeRight}
          className="mt-10 max-w-lg text-base leading-relaxed text-muted-foreground md:text-lg"
        >
          Coming soon. Stay tuned for insights, stories, and updates from the Proact Infotech team.
        </motion.p>
        <ExploreButton />
      </motion.div>
    </section>
  );
};

export default Blog;
