import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { ArrowUpRight } from "lucide-react";
import { COMPANY } from "@/constants/company";

interface FormState {
  firstName: string;
  lastName: string;
  email: string;
  subject: string;
  message: string;
}

const INITIAL_STATE: FormState = { firstName: "", lastName: "", email: "", subject: "", message: "" };

export function ContactForm() {
  const [form, setForm] = useState<FormState>(INITIAL_STATE);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const body = [
      `Name: ${form.firstName} ${form.lastName}`,
      `Email: ${form.email}`,
      "",
      form.message,
    ].join("\n");

    const mailto = `mailto:${COMPANY.email}?subject=${encodeURIComponent(form.subject)}&body=${encodeURIComponent(body)}`;

    window.location.href = mailto;

    toast.success("Your mail client is opening — send the email from there!");
    setForm(INITIAL_STATE);
    setSubmitting(false);
  };

  const update = (field: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const inputClass =
    "w-full rounded-xl border border-border bg-background px-4 py-3.5 text-sm text-foreground placeholder:text-muted-foreground/50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/40 md:text-base";

  return (
    <form onSubmit={handleSubmit} className="space-y-5 md:space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <Field label="First Name">
          <input
            type="text"
            required
            value={form.firstName}
            onChange={(e) => update("firstName", e.target.value)}
            placeholder="Ava"
            className={inputClass}
          />
        </Field>
        <Field label="Last Name">
          <input
            type="text"
            required
            value={form.lastName}
            onChange={(e) => update("lastName", e.target.value)}
            placeholder="Chen"
            className={inputClass}
          />
        </Field>
      </div>

      <Field label="Work Email">
        <input
          type="email"
          required
          value={form.email}
          onChange={(e) => update("email", e.target.value)}
          placeholder="you@company.com"
          className={inputClass}
        />
      </Field>

      <Field label="Subject">
        <input
          type="text"
          required
          value={form.subject}
          onChange={(e) => update("subject", e.target.value)}
          placeholder="What's this about?"
          className={inputClass}
        />
      </Field>

      <Field label="Message">
        <textarea
          required
          rows={5}
          value={form.message}
          onChange={(e) => update("message", e.target.value)}
          placeholder="Tell us more about your enquiry…"
          className={`${inputClass} resize-none`}
        />
      </Field>

      <motion.button
        type="submit"
        disabled={submitting}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-8 py-3.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-50"
      >
        {submitting ? "Sending…" : "Send Message"}
        {!submitting && <ArrowUpRight size={16} />}
      </motion.button>

      <p className="text-center text-xs text-muted-foreground">
        We typically respond within 1–2 business days.
      </p>
    </form>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {label}
      </label>
      {children}
    </div>
  );
}
