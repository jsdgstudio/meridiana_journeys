"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import type { ContactContent } from "@/types/content";
import type { Locale } from "@/types/tour";
import esStrings from "@/content/i18n/es.json";
import enStrings from "@/content/i18n/en.json";

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
  const [draftReady, setDraftReady] = useState(false);
  const copy = locale === "en" ? enStrings.contact : esStrings.contact;
  const emailBody = [
    copy.mailIntro,
    "",
    `${labels.name[locale]}: ${data.name.trim()}`,
    `${labels.country[locale]}: ${data.country.trim()}`,
    `${labels.email[locale]}: ${data.email.trim()}`,
    "",
    `${labels.message[locale]}:\n${data.message.trim()}`,
  ].join("\n");
  const emailHref = `mailto:${content.email}?subject=${encodeURIComponent(copy.mailSubject)}&body=${encodeURIComponent(emailBody)}`;

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
    setDraftReady(false);
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
    setErrors({});
    setDraftReady(true);
  }

  return (
    <motion.form
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

          <p className="font-sans text-xs text-negro/60 leading-relaxed" id="contact-delivery-note">
            {copy.deliveryNotice}
          </p>

          {/* Prepare an email draft; the visitor sends it in their own email app. */}
          <div className="pt-2">
            <Button
              type="submit"
              variant="primary"
              size="lg"
            >
              {copy.prepareEmail}
            </Button>
          </div>

          {draftReady && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="border-l border-tumbaga pl-5 space-y-4"
              role="status"
            >
              <p className="font-sans text-sm text-negro/70 leading-relaxed">
                {copy.readyNotice}
              </p>
              <a
                href={emailHref}
                className="inline-flex items-center border border-tumbaga px-6 py-3 font-sans text-sm uppercase tracking-widest text-negro hover:bg-tumbaga hover:text-marfil focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tumbaga"
              >
                {copy.openEmail}
              </a>
              <p className="font-sans text-xs text-negro/60 leading-relaxed">
                {copy.manualEmail} {content.email}
              </p>
            </motion.div>
          )}

          {/* Response time note */}
          <p className="font-sans text-xs text-negro/35 tracking-wide">
            {content.responseTime[locale]}
          </p>
    </motion.form>
  );
}
