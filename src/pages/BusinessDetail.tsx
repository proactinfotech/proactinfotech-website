import { useParams, Navigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight, ArrowLeft, ChevronDown } from "lucide-react";
import { getBusinessBySlug, BUSINESSES } from "@/constants/businesses";
import { RepelWrapper } from "@/components/ui/RepelWrapper";

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

const BusinessDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const business = slug ? getBusinessBySlug(slug) : undefined;

  if (!business) return <Navigate to="/" replace />;

  const otherBusinesses = BUSINESSES.filter((b) => b.slug !== slug);

  const scrollToFeatures = () => {
    const element = document.getElementById("what-we-offer");
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* Hero */}
      <section className="relative w-full overflow-hidden px-6 py-20 md:py-32 md:px-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 md:gap-16 md:grid-cols-2 items-start">
            {/* Left Content */}
            <motion.div
              variants={stagger}
              initial="hidden"
              animate="show"
              className="relative z-10 pt-8"
            >
              <motion.div
                variants={fadeUp}
                className="mb-8"
              >
                <Link
                  to="/home"
                  className="inline-flex items-center gap-1 rounded-full border border-border px-3 py-2 text-xs font-medium text-muted-foreground transition-all duration-300 hover:border-primary hover:text-primary"
                >
                  <ArrowLeft size={12} />
                  Back
                </Link>
              </motion.div>
              <motion.span
                variants={fadeUp}
                className="mb-6 inline-block text-xs font-semibold uppercase tracking-[0.3em]"
                style={{ color: business.color }}
              >
                {business.tagline}
              </motion.span>
              <RepelWrapper variants={fadeUp}>
                <h1 className="font-display text-[clamp(2.5rem,5vw,5.5rem)] font-bold leading-[0.95] tracking-tight text-foreground">
                  {business.name}
                </h1>
              </RepelWrapper>
              <motion.p
                variants={fadeUp}
                className="mt-6 max-w-sm text-base leading-relaxed text-muted-foreground md:text-lg"
              >
                {business.description}
              </motion.p>

              {/* Explore Button */}
              <motion.div
                variants={fadeUp}
                className="mt-8"
              >
                <button
                  onClick={scrollToFeatures}
                  className="inline-flex items-center gap-2 text-sm font-medium text-foreground transition-all duration-300 hover:gap-3"
                >
                  Explore
                  <motion.div
                    animate={{ y: [0, 4, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <ChevronDown size={16} />
                  </motion.div>
                </button>
              </motion.div>
            </motion.div>

            {/* Right Visual Panel */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative h-[320px] md:h-[420px] rounded-3xl overflow-hidden"
              style={{ background: business.color }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-black/5 to-black/10" />
              <div className="absolute inset-0 opacity-20">
                <svg viewBox="0 0 100 100" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
                  <defs>
                    <pattern id={`pattern-${slug}`} x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                      <circle cx="10" cy="10" r="1" fill="white" opacity="0.3" />
                    </pattern>
                  </defs>
                  <rect width="100" height="100" fill={`url(#pattern-${slug})`} />
                </svg>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Description */}
      <section className="px-6 py-24 md:py-40 md:px-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 md:gap-20 md:grid-cols-2 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <span className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-primary">
                <span className="h-px w-8 bg-primary" />
                Overview
              </span>
              <h2 className="mt-8 font-display text-[clamp(2rem,4vw,4.5rem)] font-bold leading-[1.1] text-foreground max-w-lg">
                What makes {business.name} different
              </h2>
              <p className="mt-6 text-base leading-relaxed text-muted-foreground md:text-lg">
                {business.description}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="flex flex-col justify-center"
            >
              <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
                {business.longDescription}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      {business.features && business.features.length > 0 && (
        <section id="what-we-offer" className="border-t border-border px-6 py-24 md:py-40 md:px-20">
          <div className="mx-auto max-w-7xl">
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-16 font-display text-[clamp(1.5rem,3vw,3rem)] font-bold text-foreground md:mb-20"
            >
              What we <span style={{ color: business.color }}>offer</span>
            </motion.h3>
            <div className="grid gap-8 md:gap-12 md:grid-cols-2">
              {business.features.map((feature, i) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.05 + i * 0.1 }}
                  className="group rounded-xl border border-border p-8 transition-all duration-300 hover:border-primary/50 md:p-10 hover:bg-background"
                >
                  <div
                    className="mb-4 inline-block h-12 w-12 rounded-lg p-2"
                    style={{ backgroundColor: `${business.color}20` }}
                  >
                    <div
                      className="h-full w-full rounded"
                      style={{ backgroundColor: business.color, opacity: 0.1 }}
                    />
                  </div>
                  <h4 className="mt-4 font-display text-xl font-bold text-foreground md:text-2xl">
                    {feature.title}
                  </h4>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Stats */}
      <section className="border-t border-border px-6 py-24 md:py-32 md:px-20">
        <div className="mx-auto max-w-7xl">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16 font-display text-[clamp(1.5rem,3vw,3rem)] font-bold text-foreground md:mb-20"
          >
            Impact at a <span className="text-accent">glance</span>
          </motion.h3>
          <div className="grid gap-8 sm:grid-cols-3 md:gap-16">
            {[
              { value: "10M+", label: "Users worldwide" },
              { value: "99.99%", label: "Uptime SLA" },
              { value: "50+", label: "Enterprise clients" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
                className="border-t border-border pt-6 md:pt-8"
              >
                <span
                  className="font-display text-[clamp(2rem,5vw,5rem)] font-bold"
                  style={{ color: business.color }}
                >
                  {stat.value}
                </span>
                <p className="mt-2 text-xs uppercase tracking-widest text-muted-foreground md:text-sm">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Other businesses */}
      <section className="px-6 py-24 md:py-32 md:px-20">
        <div className="mx-auto max-w-7xl">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12 font-display text-[clamp(1.5rem,3vw,3rem)] font-bold text-foreground md:mb-16"
          >
            Our other <span className="text-primary">businesses</span>
          </motion.h3>

          <div className="grid gap-6 md:gap-8 md:grid-cols-2">
            {otherBusinesses.map((biz, i) => (
              <motion.div
                key={biz.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
              >
                <Link
                  to={`/businesses/${biz.slug}`}
                  className="group block rounded-xl border border-border p-8 transition-all duration-500 hover:border-primary/30 md:p-10"
                >
                  <h4 className="font-display text-2xl font-bold text-foreground transition-transform duration-300 group-hover:translate-x-1 md:text-4xl">
                    {biz.name}
                  </h4>
                  <p className="mt-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    {biz.tagline}
                  </p>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:mt-6">
                    {biz.description}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-foreground transition-colors group-hover:text-primary md:mt-6">
                    Learn more
                    <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* External CTA */}
      <section className="px-6 py-24 md:py-32 md:px-20">
        <div className="mx-auto max-w-7xl text-center">
          <motion.a
            href={business.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-3 rounded-full border border-border px-10 py-4 text-sm font-medium text-foreground transition-colors hover:border-primary hover:text-primary md:px-12 md:py-5"
          >
            Visit {business.name}
            <ArrowUpRight size={16} />
          </motion.a>
        </div>
      </section>


    </>
  );
};

export default BusinessDetail;
