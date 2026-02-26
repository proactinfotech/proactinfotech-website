import { useState } from "react";
import { motion } from "framer-motion";
import { usePageTransition } from "@/components/layout/PageTransition";
import type { MenuNavItem } from "@/features/menu/types";

const ITEM_VARIANTS = {
  hidden: { opacity: 0, x: 60 },
  show: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, delay: 0.3 + i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] as const },
  }),
};

interface MenuNavLinkProps {
  item: MenuNavItem;
}

export function MenuNavLink({ item }: MenuNavLinkProps) {
  const { navigateTo } = usePageTransition();
  const [hovered, setHovered] = useState(false);
  const formattedIndex = String(item.index).padStart(2, "0");

  return (
    <motion.button
      custom={item.index}
      variants={ITEM_VARIANTS}
      initial="hidden"
      animate="show"
      onClick={() => navigateTo(item.href)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group w-full text-right"
      aria-label={`Navigate to ${item.label}`}
    >
      <motion.div
        animate={{
          x: hovered ? -12 : 0,
          backgroundColor: hovered
            ? "hsla(36, 76%, 85%, 0.88)"
            : "hsla(36, 76%, 85%, 0.28)",
          borderColor: hovered
            ? "hsl(16 88% 53% / 0.45)"
            : "hsl(16 88% 53% / 0.14)",
        }}
        transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="flex items-center justify-end gap-3 rounded-xl border px-4 py-2 md:gap-6 md:px-8 md:py-3"
      >
        {/* Arrow (appears on hover, left side) */}
        <motion.span
          animate={{ opacity: hovered ? 1 : 0, x: hovered ? 0 : 12 }}
          transition={{ duration: 0.3 }}
          className="font-body text-lg text-primary md:text-xl"
        >
          →
        </motion.span>

        {/* Label */}
        <motion.span
          animate={{
            color: hovered ? "hsl(16 88% 53%)" : "hsl(170 70% 12%)",
          }}
          transition={{ duration: 0.35 }}
          className="font-display text-[clamp(1.3rem,5vw,4.5rem)] font-bold uppercase leading-[1] tracking-tight"
        >
          {item.label}
        </motion.span>

        {/* Index number */}
        <motion.span
          animate={{ opacity: hovered ? 1 : 0.35 }}
          transition={{ duration: 0.3 }}
          className="min-w-[1.5rem] font-body text-[10px] font-medium tracking-widest text-primary md:text-xs"
        >
          {formattedIndex}
        </motion.span>
      </motion.div>
    </motion.button>
  );
}
