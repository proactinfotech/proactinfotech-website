import { motion } from "framer-motion";
import { COMPANY } from "@/constants/company";
import { fadeUp, useParallax } from "@/lib/animations";
import { TextRevealSection } from "@/components/layout/TextRevealSection";

const VISION_ITEMS = [
  {
    label: "Our Vision",
    text: COMPANY.vision,
  },
  {
    label: "Our Mission",
    text: COMPANY.mission,
  },
  {
    label: "Our Approach",
    text: "We provide the resources and runway for ambitious teams to think in decades while shipping in weeks. Patient capital meets impatient execution, creating the conditions for breakthrough innovation across every venture we build.",
  },
];

export function VisionMission() {
  const heading = useParallax(60);

  return (
    <>
      <section id="vision" className="px-6 py-40 md:px-20">
        <div className="mx-auto max-w-7xl">
          <motion.div
            ref={heading.ref}
            style={{ y: heading.y }}
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
          >
            <h2 className="max-w-5xl font-display text-[clamp(2rem,6vw,6rem)] font-bold leading-[1] text-foreground">
              We build companies that{" "}
              <span className="text-primary">redefine industries</span>{" "}
              through{" "}
              <span className="text-accent">relentless innovation.</span>
            </h2>
          </motion.div>
        </div>
      </section>

      <TextRevealSection items={VISION_ITEMS} sectionLabel="What We Do" />
    </>
  );
}
