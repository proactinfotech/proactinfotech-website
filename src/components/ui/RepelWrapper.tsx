import { motion } from "framer-motion";
import { useRepel, type RepelConfig } from "@/hooks/useRepel";

interface RepelWrapperProps extends Omit<React.ComponentProps<typeof motion.div>, "ref"> {
  /** Repel behaviour config. Omit to use sensible defaults. */
  config?: RepelConfig;
}

/**
 * Generic cursor-repel wrapper.
 *
 * Children float away from the cursor as one cohesive unit.
 * All Framer Motion props (`variants`, `initial`, `animate`, `whileInView`, etc.)
 * are forwarded to the outer `motion.div`, so this component participates
 * correctly in variant stagger trees.
 *
 * @example
 * ```tsx
 * // Inside a stagger parent — replaces motion.h1
 * <RepelWrapper variants={fadeUp} className="...">
 *   <h1 className="...">Heading text</h1>
 * </RepelWrapper>
 *
 * // Standalone with custom strength
 * <RepelWrapper config={{ maxRepel: 30 }}>
 *   <SomeComponent />
 * </RepelWrapper>
 * ```
 */
export function RepelWrapper({
  children,
  config,
  style,
  ...motionProps
}: RepelWrapperProps) {
  const { containerRef, x, y, onMouseMove, onMouseLeave } = useRepel(config);

  return (
    <motion.div
      ref={containerRef}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      {...motionProps}
    >
      <motion.div style={{ x, y, ...style }}>
        {children}
      </motion.div>
    </motion.div>
  );
}
