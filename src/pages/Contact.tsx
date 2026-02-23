import { motion } from "framer-motion";
import { ContactForm } from "@/features/contact/components/ContactForm";
import { Mail } from "lucide-react";
import { COMPANY } from "@/constants/company";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

const fadeLeft = {
  hidden: { opacity: 0, x: -40 },
  show: { opacity: 1, x: 0, transition: { duration: 0.8 } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};

const FEATURES = [
  "Partnership & investment inquiries",
  "Media and press requests",
  "Career opportunities",
  "General business enquiries",
];

const Contact = () => {
  return (
    <section id="contact-form" className="min-h-screen px-6 pb-32 pt-32 md:px-20">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-16 md:grid-cols-[2fr_3fr] md:gap-20 lg:gap-28">

          {/* Left column — info */}
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="show"
            className="flex flex-col justify-center"
          >
            <motion.span
              variants={fadeLeft}
              className="mb-6 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-primary"
            >
              <motion.span
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="h-px w-10 origin-left bg-primary"
              />
              Contact
            </motion.span>

            <motion.h1
              variants={fadeUp}
              className="font-display text-[clamp(2.5rem,6vw,6rem)] font-bold leading-[0.9] tracking-tight text-foreground"
            >
              Get in
              <br />
              <span className="text-primary">Touch.</span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="mt-8 max-w-sm text-base leading-relaxed text-muted-foreground md:text-lg"
            >
              Have a question, partnership idea, or just want to say hello?
              We&apos;d love to hear from you.
            </motion.p>

            <motion.ul variants={fadeUp} className="mt-10 space-y-3">
              {FEATURES.map((f) => (
                <li key={f} className="flex items-start gap-3 text-sm text-muted-foreground">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  {f}
                </li>
              ))}
            </motion.ul>

            <motion.div variants={fadeUp} className="mt-12 space-y-4 border-t border-border pt-10">
              <a
                href={`mailto:${COMPANY.email}`}
                className="flex items-center gap-3 text-sm text-muted-foreground transition-colors hover:text-primary"
              >
                <Mail size={16} className="shrink-0 text-primary" />
                {COMPANY.email}
              </a>
            </motion.div>
          </motion.div>

          {/* Right column — form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="rounded-2xl border border-border bg-card/60 p-8 md:p-10"
          >
            <ContactForm />
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Contact;
