import { motion } from "framer-motion";
import { Clock } from "lucide-react";

const Blog = () => {
  return (
    <section className="flex min-h-screen items-center px-6 pt-24 md:px-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mx-auto w-full max-w-7xl"
      >
        <div className="mb-8 flex h-20 w-20 items-center justify-center rounded-full border border-border bg-secondary">
          <Clock size={32} className="text-primary" />
        </div>
        <h1 className="font-display text-[clamp(3rem,8vw,8rem)] font-bold leading-[0.9] text-foreground">
          <span className="text-primary">Blog</span>
        </h1>
        <p className="mt-6 max-w-lg text-lg text-muted-foreground">
          Coming soon. Stay tuned for insights, stories, and updates.
        </p>
      </motion.div>
    </section>
  );
};

export default Blog;
