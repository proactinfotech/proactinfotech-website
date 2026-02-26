import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { COMPANY } from "@/constants/company";
import { BUSINESSES } from "@/constants/businesses";

const footerNav = {
  navigate: [
    { label: "Home", href: "/home" },
    { label: "About", href: "/about" },
    { label: "Culture", href: "/culture" },
    { label: "Careers", href: "/careers" },
    { label: "Investors", href: "/investors" },
    { label: "Blog", href: "/blog" },
  ],
  businesses: BUSINESSES.map((b) => ({
    label: b.name,
    href: `/businesses/${b.slug}`,
  })),
  connect: [
    { label: "Contact", href: "/contact" },
    { label: "LinkedIn", href: "#" },
    { label: "X", href: "#" },
  ],
};

export function Footer() {
  return (
    <footer className="relative z-50 overflow-hidden px-6 pb-8 pt-16 md:px-20">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-16 md:grid-cols-12 md:gap-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="md:col-span-5"
          >
            <p className="max-w-md font-display text-[clamp(1.5rem,3vw,2.5rem)] font-medium leading-[1.2] text-foreground">
              {COMPANY.tagline}
            </p>
            <a href={COMPANY.jobsUrl} target="_blank" rel="noopener noreferrer" className="mt-10 inline-flex items-center gap-3">
              <motion.span
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="rounded-full bg-primary px-6 py-3 text-sm font-semibold uppercase tracking-wider text-primary-foreground transition-opacity hover:opacity-90"
              >
                Work with us
              </motion.span>
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <ArrowUpRight size={16} />
              </span>
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="grid grid-cols-3 gap-4 md:col-span-6 md:col-start-7 md:gap-16"
          >
            <FooterColumn title="Navigate" links={footerNav.navigate} />
            <FooterColumn title="Businesses" links={footerNav.businesses} />
            <FooterColumn title="Connect" links={footerNav.connect} />
          </motion.div>
        </div>

        {/* Giant brand lockup — logo mark + wordmark */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-10 flex items-end gap-3 md:mt-20 md:gap-4"
        >
          <motion.img
            src="/images/logo.png"
            alt={COMPANY.name}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75, delay: 0.1 }}
            className="h-[clamp(2rem,9vw,8.5rem)] w-auto shrink-0 object-contain"
          />
          <span
            className="mb-1 min-w-0 font-display text-[clamp(1.6rem,9.5vw,10rem)] font-bold leading-[0.9] tracking-tight md:mb-3"
            style={{ color: "#2E4B3C" }}
          >
            {COMPANY.name}
          </span>
        </motion.div>

        <div className="mt-8 flex flex-col items-center justify-between gap-4 text-xs uppercase tracking-widest text-muted-foreground md:flex-row">
          <span>
            © {new Date().getFullYear()} {COMPANY.name}. All rights reserved.
          </span>
          <div className="flex gap-6">
            <Link to="/" className="transition-colors hover:text-foreground">
              Privacy Policy
            </Link>
            <Link to="/" className="transition-colors hover:text-foreground">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <h4 className="mb-4 text-[10px] font-semibold uppercase tracking-widest text-primary md:mb-6 md:text-xs">
        {title}
      </h4>
      <ul className="space-y-2 md:space-y-3">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              to={link.href}
              className="text-xs text-foreground transition-colors hover:text-primary md:text-sm"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
