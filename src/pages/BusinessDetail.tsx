import { useParams, Navigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight, ArrowLeft } from "lucide-react";
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

  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[70vh] items-end overflow-hidden px-6 pb-14 pt-24 md:min-h-screen md:pb-24 md:pt-32 md:px-20">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="show"
          className="relative z-10 mx-auto w-full max-w-7xl"
        >
          <motion.div variants={fadeUp}>
            <Link
              to="/"
              className="mb-12 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground md:mb-16"
            >
              <ArrowLeft size={14} />
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
            <h1 className="font-display text-[clamp(2.5rem,7vw,7.5rem)] font-bold leading-[0.85] tracking-tight text-foreground">
              {business.name}
            </h1>
          </RepelWrapper>
          <motion.p
            variants={fadeUp}
            className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground md:text-xl"
          >
            {business.description}
          </motion.p>
        </motion.div>
      </section>

      {/* Description */}
      <section className="px-6 py-24 md:py-40 md:px-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 md:gap-20 md:grid-cols-2">
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
              <h2 className="mt-8 font-display text-[clamp(1.5rem,4vw,4.5rem)] font-bold leading-[1] text-foreground">
                {business.description}
              </h2>
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
