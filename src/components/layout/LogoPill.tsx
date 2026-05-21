import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { COMPANY } from "@/constants/company";
import { usePageTransition } from "@/components/layout/PageTransition";

export function LogoPill() {
  const [scrolled, setScrolled] = useState(false);
  const { navigateTo } = usePageTransition();
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 120);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const goHome = () => { if (pathname !== "/") navigateTo("/"); };

  return (
    <div className="fixed left-0 right-0 top-0 z-50 hidden justify-center md:flex">
      <AnimatePresence mode="wait">
        {scrolled ? (
          <motion.div
            key="pill"
            initial={{ opacity: 0, y: -10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.9 }}
            transition={{ duration: 0.25 }}
            className="mt-5"
          >
            <button
              onClick={goHome}
              className="flex items-center gap-2.5 rounded-full border border-border bg-card px-6 py-3"
              aria-label="Home"
            >
              <span className="font-display text-base font-bold text-primary">P</span>
              <span className="text-sm font-medium text-foreground">
                {COMPANY.name}
              </span>
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="centered"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="pt-8"
          >
            <button onClick={goHome} aria-label="Home">
              <span className="font-display text-[clamp(2rem,4vw,3.5rem)] font-bold text-foreground">
                {COMPANY.name}
              </span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function MobileLogoPill() {
  const [scrolled, setScrolled] = useState(false);
  const { navigateTo } = usePageTransition();
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const goHome = () => { if (pathname !== "/") navigateTo("/"); };

  return (
    <div className="fixed left-0 right-0 top-0 z-50 flex justify-center md:hidden">
      <AnimatePresence mode="wait">
        {scrolled ? (
          <motion.div
            key="pill-mobile"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-4"
          >
            <button
              onClick={goHome}
              className="flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5"
            >
              <span className="font-display text-sm font-bold text-primary">P</span>
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="centered-mobile"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="pt-5"
          >
            <button onClick={goHome} aria-label="Home">
              <span className="font-display text-2xl font-bold text-foreground">
                {COMPANY.name}
              </span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
