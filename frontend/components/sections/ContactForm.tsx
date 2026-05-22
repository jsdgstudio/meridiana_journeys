"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import type { ContactContent } from "@/types/content";
import type { Locale } from "@/types/tour";

interface ContactFormProps {
  content: ContactContent;
  locale: Locale;
}

interface FormData {
  name: string;
  country: string;
  email: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

const labels = {
  name:    { es: "Nombre",              en: "Name"           },
  country: { es: "País",                en: "Country"        },
  email:   { es: "Correo electrónico",  en: "Email"          },
  message: { es: "Mensaje",             en: "Message"        },
  messagePlaceholder: {
    es: "Cuéntanos lo que estás buscando, cuántas personas viajan, cualquier contexto que nos ayude a entender tu visión.",
    en: "Tell us what you're looking for, how many people are travelling, any context that helps us understand your vision.",
  },
  submit:      { es: "Enviar consulta", en: "Send inquiry" },
  submitting:  { es: "Enviando…",       en: "Sending…"     },
  successTitle:{ es: "Mensaje recibido", en: "Message received" },
  successBody: {
    es: "Nos pondremos en contacto contigo en menos de 48 horas. Mientras tanto, si quieres explorar más, los itinerarios están esperando.",
    en: "We'll be in touch within 48 hours. In the meantime, the itineraries are waiting if you'd like to keep exploring.",
  },
  errors: {
    nameRequired:    { es: "El nombre es obligatorio",  en: "Name is required"    },
    emailRequired:   { es: "El correo es obligatorio",  en: "Email is required"   },
    emailInvalid:    { es: "El correo no es válido",    en: "Email is not valid"   },
    messageRequired: { es: "El mensaje es obligatorio", en: "Message is required" },
  },
};

function validate(data: FormData, locale: Locale): FormErrors {
  const errs: FormErrors = {};
  if (!data.name.trim()) errs.name = labels.errors.nameRequired[locale];
  if (!data.email.trim()) {
    errs.email = labels.errors.emailRequired[locale];
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errs.email = labels.errors.emailInvalid[locale];
  }
  if (!data.message.trim()) errs.message = labels.errors.messageRequired[locale];
  return errs;
}

const inputBase =
  "w-full bg-transparent border border-negro/20 px-4 py-3 font-sans text-sm text-negro placeholder:text-negro/30 focus:border-tumbaga focus:outline-none transition-colors duration-200";

const labelBase = "block label text-xs tracking-widest uppercase text-negro/45 mb-2";

interface FieldProps {
  id: string;
  label: string;
  error?: string;
  children: React.ReactNode;
}

function Field({ id, label, error, children }: FieldProps) {
  return (
    <div className="space-y-1">
      <label htmlFor={id} className={labelBase}>{label}</label>
      {children}
      {error && (
        <p id={`${id}-error`} className="font-sans text-xs text-terracota mt-1" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

export function ContactForm({ content, locale }: ContactFormProps) {
  const [data, setData] = useState<FormData>({
    name: "", country: "", email: "", message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof FormData, boolean>>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
    if (touched[name as keyof FormData]) {
      const newErrors = validate({ ...data, [name]: value }, locale);
      setErrors((prev) => ({ ...prev, [name]: newErrors[name as keyof FormErrors] }));
    }
  }

  function handleBlur(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const newErrors = validate(data, locale);
    setErrors((prev) => ({ ...prev, [name]: newErrors[name as keyof FormErrors] }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const newErrors = validate(data, locale);
    setTouched({ name: true, email: true, message: true });
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setStatus("submitting");
    // TODO: Connect to Resend API
    setTimeout(() => setStatus("success"), 800);
  }

  return (
    <AnimatePresence mode="wait">
      {status === "success" ? (
        <motion.div
          key="success"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          className="py-12 space-y-6"
        >
          <div className="w-8 h-px bg-tumbaga" />
          <h3 className="font-display text-2xl font-light text-negro">
            {labels.successTitle[locale]}
          </h3>
          <p className="font-sans text-sm leading-relaxed text-negro/60 max-w-md">
            {labels.successBody[locale]}
          </p>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          onSubmit={handleSubmit}
          noValidate
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="space-y-7"
        >
          {/* Name + Country row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Field id="field-name" label={labels.name[locale]} error={errors.name}>
              <input
                id="field-name"
                name="name"
                type="text"
                autoComplete="name"
                value={data.name}
                onChange={handleChange}
                onBlur={handleBlur}
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? "field-name-error" : undefined}
                className={`${inputBase} ${errors.name ? "border-terracota" : ""}`}
              />
            </Field>
            <Field id="field-country" label={labels.country[locale]}>
              <input
                id="field-country"
                name="country"
                type="text"
                autoComplete="country-name"
                value={data.country}
                onChange={handleChange}
                className={inputBase}
              />
            </Field>
          </div>

          {/* Email */}
          <Field id="field-email" label={labels.email[locale]} error={errors.email}>
            <input
              id="field-email"
              name="email"
              type="email"
              autoComplete="email"
              value={data.email}
              onChange={handleChange}
              onBlur={handleBlur}
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "field-email-error" : undefined}
              className={`${inputBase} ${errors.email ? "border-terracota" : ""}`}
            />
          </Field>

          {/* Message */}
          <Field id="field-message" label={labels.message[locale]} error={errors.message}>
            <textarea
              id="field-message"
              name="message"
              rows={5}
              placeholder={labels.messagePlaceholder[locale]}
              value={data.message}
              onChange={handleChange}
              onBlur={handleBlur}
              aria-invalid={!!errors.message}
              aria-describedby={errors.message ? "field-message-error" : undefined}
              className={`${inputBase} resize-none ${errors.message ? "border-terracota" : ""}`}
            />
          </Field>

          {/* Submit */}
          <div className="pt-2">
            <Button
              type="submit"
              variant="primary"
              size="lg"
              disabled={status === "submitting"}
            >
              {status === "submitting"
                ? labels.submitting[locale]
                : labels.submit[locale]}
            </Button>
          </div>

          {/* Response time note */}
          <p className="font-sans text-xs text-negro/35 tracking-wide">
            {content.responseTime[locale]}
          </p>
        </motion.form>
      )}
    </AnimatePresence>
  );
}
