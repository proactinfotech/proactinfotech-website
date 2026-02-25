import { motion } from "framer-motion";
import { Linkedin } from "lucide-react";
import { COMPANY } from "@/constants/company";
import { TEAM, type TeamMember } from "@/constants/team";
import { stagger, fadeUp, fadeLeft, fadeRight, useParallax } from "@/lib/animations";
import { ExploreButton } from "@/components/layout/ExploreButton";

const About = () => (
  <>
    <AboutHero />
    <StorySection />
    <TeamSection />
  </>
);

function AboutHero() {
  return (
    <section id="about-hero" className="flex min-h-[70vh] items-end px-6 pb-20 pt-32 md:min-h-[80vh] md:pb-24 md:px-20">
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="show"
        className="mx-auto w-full max-w-7xl"
      >
        <motion.span
          variants={fadeLeft}
          initial="hidden"
          animate="show"
          className="mb-8 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-primary"
        >
          <motion.span
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="h-px w-10 origin-left bg-primary"
          />
          About
        </motion.span>
        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="max-w-5xl font-display text-[clamp(2.5rem,9vw,9rem)] font-bold leading-[0.9] tracking-tight text-foreground"
        >
          We exist
          <br />
          <span className="text-primary">to build</span>
          <br />
          <span className="text-accent">what </span>
          matter.
        </motion.h1>
        <motion.p
          variants={fadeRight}
          className="mt-10 max-w-lg text-base leading-relaxed text-muted-foreground md:text-lg"
        >
          We are a collective of founders, operators, and engineers united by one
          belief — that the companies shaping the next decade haven&apos;t been
          built yet. We&apos;re here to change that.
        </motion.p>
        <ExploreButton />
      </motion.div>
    </section>
  );
}

function StorySection() {
  const leftCol = useParallax(40);
  const rightCol = useParallax(60);

  return (
    <section id="story" className="px-6 py-24 md:py-32 md:px-20">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 md:gap-20 md:grid-cols-2">
          <motion.div
            ref={leftCol.ref}
            style={{ y: leftCol.y }}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-primary">
              <motion.span
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="h-px w-8 origin-left bg-primary"
              />
              Our Story
            </span>
            <h2 className="mt-8 font-display text-[clamp(2rem,4vw,4rem)] font-bold leading-[1] text-foreground">
              Born from conviction,
              <br />
              <span className="text-accent">built for scale.</span>
            </h2>
          </motion.div>
          <motion.div
            ref={rightCol.ref}
            style={{ y: rightCol.y }}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="flex flex-col justify-center"
          >
            <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
              {COMPANY.name} was founded with a simple thesis: the most important
              companies of the next decade haven&apos;t been built yet. We set out to
              change that — assembling world-class teams, providing patient capital,
              and creating the conditions for breakthrough innovation.
            </p>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground md:text-lg">
              Today we operate across AI, fintech, and cloud infrastructure — each
              venture driven by the same relentless ambition to redefine its industry.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function TeamSection() {
  const heading = useParallax(30);

  return (
    <section id="team" className="px-6 py-24 md:py-32 md:px-20">
      <div className="mx-auto max-w-7xl">
        <motion.div
          ref={heading.ref}
          style={{ y: heading.y }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 md:mb-20"
        >
          <span className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-primary">
            <span className="h-px w-8 bg-primary" />
            Leadership
          </span>
          <h2 className="mt-8 font-display text-[clamp(2rem,5vw,5rem)] font-bold leading-[0.95] text-foreground">
            The team behind
            <br />
            <span className="text-accent">the vision.</span>
          </h2>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 md:gap-8">
          {TEAM.map((member, i) => (
            <TeamCard key={member.name} member={member} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── TeamCard ────────────────────────────────────────────────────────────────

interface TeamCardProps {
  member: TeamMember;
  index: number;
}

function TeamCard({ member, index }: TeamCardProps) {
  const initials = member.name
    .split(" ")
    .map((n) => n[0])
    .join("");

  const indexLabel = String(index + 1).padStart(2, "0");

  return (
    <motion.article
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.65, delay: 0.1 * index, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4, transition: { duration: 0.3, ease: "easeOut" } }}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card"
    >
      {/* Full photo area — full width, natural proportions */}
      <div className="relative w-full overflow-hidden bg-gradient-to-br from-secondary/30 via-secondary/10 to-background">
        {member.photo ? (
          <img
            src={member.photo}
            alt={member.name}
            className="w-full object-contain transition-transform duration-500 group-hover:scale-[1.02]"
          />
        ) : (
          <div className="flex aspect-[3/4] w-full items-center justify-center">
            <span
              className="inline-block font-display font-bold text-primary/25 transition-all duration-500 group-hover:scale-110 group-hover:text-primary/50"
              style={{ fontSize: "clamp(2.5rem,5vw,4rem)" }}
            >
              {initials}
            </span>
          </div>
        )}

        {/* Bio reveal overlay */}
        <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-foreground/85 via-foreground/30 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <p className="translate-y-3 text-xs leading-relaxed text-background/90 transition-transform duration-300 group-hover:translate-y-0">
            {member.bio}
          </p>
        </div>
      </div>

      {/* Bottom: name + role + linkedin */}
      <div className="flex items-stretch px-4 pb-4 pt-3">
        {/* Left 80% — role + name */}
        <div className="w-4/5 pr-2">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-primary">
            {member.role}
          </p>
          <h3 className="mt-1 font-display text-base font-bold leading-tight text-foreground md:text-lg">
            {member.name}
          </h3>
        </div>

        {/* Right 20% — number above linkedin */}
        <div className="flex w-1/5 flex-col items-center justify-end gap-1">
          <span className="font-display text-2xl font-bold text-foreground/[0.07] transition-colors duration-300 group-hover:text-primary/20">
            {indexLabel}
          </span>
          {member.linkedin && (
            <a
              href={member.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${member.name} on LinkedIn`}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-muted-foreground transition-all duration-300 hover:border-primary hover:text-primary"
            >
              <Linkedin size={14} />
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}

export default About;
