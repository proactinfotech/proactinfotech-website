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
    <footer className="relative z-50 overflow-hidden px-6 pb-8 pt-14 md:px-20 md:pt-20">
      <div className="mx-auto max-w-7xl">

        {/* Top section: tagline + CTA left, nav columns right */}
        <div className="flex flex-col gap-12 md:grid md:grid-cols-12 md:gap-20">

          {/* Tagline + CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="md:col-span-5"
          >
            <p className="max-w-sm font-display text-[clamp(1.4rem,3vw,2.5rem)] font-medium leading-[1.2] text-foreground">
              {COMPANY.tagline}
            </p>
            <a
              href={COMPANY.jobsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-3"
            >
              <motion.span
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="rounded-full bg-primary px-6 py-3 text-sm font-semibold uppercase tracking-wider text-primary-foreground transition-opacity hover:opacity-90"
              >
                Work with us
              </motion.span>
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <ArrowUpRight size={16} />
              </span>
            </a>
          </motion.div>

          {/* Nav columns — 3-col on mobile with better spacing */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="grid grid-cols-3 gap-6 md:col-span-6 md:col-start-7 md:gap-16"
          >
            <FooterColumn title="Navigate" links={footerNav.navigate} />
            <FooterColumn title="Businesses" links={footerNav.businesses} />
            <FooterColumn title="Connect" links={footerNav.connect} />
          </motion.div>
        </div>

        {/* Brand lockup — centered, full width */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-12 flex items-center justify-center gap-4 overflow-hidden md:mt-20 md:gap-6"
        >
          <motion.img
            src="/images/logo.png"
            alt={COMPANY.name}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75, delay: 0.1 }}
            className="h-[clamp(2.5rem,8vw,8rem)] w-auto shrink-0 object-contain"
          />
          <span
            className="font-display text-[clamp(2.2rem,9vw,10rem)] font-bold leading-[0.9] tracking-tight"
            style={{ color: "#2E4B3C" }}
          >
            {COMPANY.name}
          </span>
        </motion.div>

        {/* Bottom bar */}
        <div className="mt-6 flex flex-col gap-3 border-t border-border/30 pt-6 text-[10px] uppercase tracking-widest text-muted-foreground md:flex-row md:items-center md:justify-between md:text-xs">
          <span>© {new Date().getFullYear()} {COMPANY.name}. All rights reserved.</span>
          <div className="flex gap-6">
            <Link to="/" className="transition-colors hover:text-foreground">Privacy Policy</Link>
            <Link to="/" className="transition-colors hover:text-foreground">Terms</Link>
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
