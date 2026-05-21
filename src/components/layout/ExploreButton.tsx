import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { fadeUp } from "@/lib/animations";

interface ExploreButtonProps {
  targetId?: string;
}

export function ExploreButton({ targetId }: ExploreButtonProps) {
  const handleClick = () => {
    if (targetId) {
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
        return;
      }
    }
    // Default: scroll down one viewport height
    window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
  };

  return (
    <motion.button
      variants={fadeUp}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleClick}
      className="mt-16 flex items-center gap-3 text-sm text-muted-foreground transition-colors hover:text-foreground md:mt-24"
      aria-label="Scroll to explore"
    >
      <span className="flex h-12 w-12 items-center justify-center rounded-full border border-border transition-colors hover:border-primary/50">
        <ArrowDown size={18} className="animate-bounce" />
      </span>
      <span className="hidden text-xs uppercase tracking-widest md:inline">
        Explore
      </span>
    </motion.button>
  );
}
