import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp, ArrowLeft, ArrowRight } from "lucide-react";
import { usePageTransition } from "@/components/layout/PageTransition";
import { PAGES } from "@/constants/navigation";

const PILL_CLASS =
  "flex items-center gap-2.5 rounded-full border border-border bg-card/90 px-4 py-2.5 text-xs font-semibold uppercase tracking-widest text-muted-foreground shadow-md backdrop-blur-md transition-colors hover:border-primary hover:text-primary";

export function ScrollToTop() {
  const [show, setShow] = useState(false);
  const { pathname } = useLocation();
  const { navigateTo } = usePageTransition();
  const isMenuPage = pathname === "/";

  const currentIndex = PAGES.findIndex((p) => p.href === pathname);
  const nextPage = currentIndex >= 0 ? PAGES[(currentIndex + 1) % PAGES.length] : null;

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 300);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col-reverse items-end gap-2">
      {/* Back to menu — always visible on inner pages */}
      <AnimatePresence>
        {!isMenuPage && (
          <motion.button
            initial={{ opacity: 0, x: 16, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 16, scale: 0.9 }}
            transition={{ duration: 0.22 }}
            onClick={() => navigateTo("/")}
            className={PILL_CLASS}
            aria-label="Back to menu"
          >
            <ArrowLeft size={13} strokeWidth={2.2} />
            Menu
          </motion.button>
        )}
      </AnimatePresence>

      {/* Next page — cycles through PAGES order */}
      <AnimatePresence>
        {!isMenuPage && nextPage && (
          <motion.button
            initial={{ opacity: 0, x: 16, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 16, scale: 0.9 }}
            transition={{ duration: 0.22, delay: 0.05 }}
            onClick={() => navigateTo(nextPage.href)}
            className={PILL_CLASS}
            aria-label={`Go to ${nextPage.label}`}
          >
            {nextPage.label}
            <ArrowRight size={13} strokeWidth={2.2} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Scroll to top — appears after scrolling down */}
      <AnimatePresence>
        {show && (
          <motion.button
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            transition={{ duration: 0.22 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className={PILL_CLASS}
            aria-label="Scroll to top"
          >
            <ArrowUp size={13} strokeWidth={2.2} />
            Top
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
