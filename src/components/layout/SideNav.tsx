import { useState, useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowUp, Briefcase, Eye, Users, Sparkles,
  BookOpen, Heart, Compass, Sun, Star, Mail,
} from "lucide-react";
import { PAGE_SECTIONS, type SectionLink } from "@/constants/navigation";

const ICON_MAP: Record<string, React.ElementType> = {
  "arrow-up": ArrowUp,
  briefcase: Briefcase,
  eye: Eye,
  users: Users,
  sparkles: Sparkles,
  "book-open": BookOpen,
  heart: Heart,
  compass: Compass,
  sun: Sun,
  star: Star,
  mail: Mail,
};

export function SideNav() {
  const { pathname } = useLocation();
  const sections = useMemo(() => PAGE_SECTIONS[pathname] ?? [], [pathname]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (sections.length === 0) return;

    let hideTimeout: ReturnType<typeof setTimeout>;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
            setVisible(true);
            clearTimeout(hideTimeout);
            hideTimeout = setTimeout(() => setVisible(false), 2000);
          }
        }
      },
      { threshold: 0.3 },
    );

    // Small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      sections.forEach((s) => {
        const el = document.getElementById(s.id);
        if (el) observer.observe(el);
      });
    }, 300);

    return () => {
      clearTimeout(timer);
      clearTimeout(hideTimeout);
      observer.disconnect();
    };
  }, [sections, pathname]);

  // Also show on scroll activity
  useEffect(() => {
    let hideTimeout: ReturnType<typeof setTimeout>;

    const onScroll = () => {
      if (sections.length === 0) return;
      setVisible(true);
      clearTimeout(hideTimeout);
      hideTimeout = setTimeout(() => setVisible(false), 2000);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      clearTimeout(hideTimeout);
      window.removeEventListener("scroll", onScroll);
    };
  }, [sections]);

  const activeSection = sections.find((s) => s.id === activeId);
  const Icon = activeSection ? ICON_MAP[activeSection.icon] : null;

  if (sections.length === 0) return null;

  return (
    <AnimatePresence>
      {visible && activeSection && (
        <motion.div
          key={activeSection.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          transition={{ duration: 0.3 }}
          className="fixed right-6 top-5 z-50 hidden md:flex"
        >
          <div className="flex items-center gap-3 rounded-full border border-border bg-card/90 px-5 py-3 backdrop-blur-md">
            {Icon && <Icon size={16} className="text-primary" />}
            <span className="text-xs font-semibold uppercase tracking-widest text-foreground">
              {activeSection.label}
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
