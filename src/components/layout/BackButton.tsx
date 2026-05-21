import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { usePageTransition } from "@/components/layout/PageTransition";

/**
 * Fixed back button shown on all pages except the menu root.
 * Navigates to "/" using the page transition system.
 */
export function BackButton() {
  const { pathname } = useLocation();
  const { navigateTo } = usePageTransition();
  const isMenuPage = pathname === "/";

  return (
    <AnimatePresence>
      {!isMenuPage && (
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
          onClick={() => navigateTo("/")}
          className="fixed left-5 top-5 z-50 flex items-center gap-2 rounded-full border border-border/40 bg-card/90 px-4 py-2.5 font-body text-xs font-medium uppercase tracking-widest text-foreground backdrop-blur-md transition-colors hover:border-primary hover:text-primary md:left-8 md:top-8 md:px-5 md:py-3 md:text-sm"
          aria-label="Back to menu"
        >
          <ArrowLeft size={16} strokeWidth={1.8} />
          <span className="hidden sm:inline">Menu</span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
