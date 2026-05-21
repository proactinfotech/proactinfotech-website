import { motion } from "framer-motion";
import { COMPANY } from "@/constants/company";

/**
 * Logo mark + company name — entrance animation only.
 * Cursor-repel is handled by the parent left-panel wrapper in MenuPage.
 */
export function RepelLogo() {
  return (
    <div className="flex items-center gap-5 md:gap-7">
      {/* Logo mark — height matches 2 lines of the h1 */}
      <motion.img
        src="/images/logo.png"
        alt={`${COMPANY.name} logo`}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="h-[clamp(4.5rem,12vw,7.6rem)] w-auto shrink-0 object-contain"
      />
      {/* Name — two words forced onto two lines */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="font-display text-[clamp(2.4rem,7vw,3.8rem)] font-bold leading-[1] tracking-tight text-foreground"
      >
        {COMPANY.name.split(" ").map((word, i) => (
          <span key={i} className="block">{word}</span>
        ))}
      </motion.h1>
    </div>
  );
}
