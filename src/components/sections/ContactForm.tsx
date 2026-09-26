"use client";

import { useState } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServiceCheckbox } from "@/components/ui/ServiceCheckbox";
import { Button } from "@/components/ui/Button";
import { buildContactMessage } from "@/lib/whatsapp";
import type { ServiceOption, ContactFormData } from "@/types";
import type { SanitySiteSettings } from "@/sanity/types";

const SERVICE_OPTIONS: ServiceOption[] = [
  "Photography",
  "Graphic Design",
  "Custom Artwork",
  "Art Commission",
  "Event Coverage",
  "Prints",
  "Other",
];

const defaultForm: ContactFormData = {
  name: "",
  email: "",
  services: [],
  projectDetails: "",
  referenceFile: null,
};

import { useLanguage } from "@/i18n/LanguageContext";
import { resolveLocale } from "@/lib/locale";

interface ContactFormProps {
  siteSettings?: SanitySiteSettings | null;
}

export function ContactForm({ siteSettings }: ContactFormProps) {
  const { lang, t } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  const [form, setForm] = useState<ContactFormData>(defaultForm);

  const instagramHandle = siteSettings?.instagramHandle || "@dkgrfx";
  const instagramUrl = siteSettings?.instagramUrl || "https://www.instagram.com/dkgrfx";
  const contactEmail = siteSettings?.contactEmail || "contact@dkgrfx.com";
  const locationText = resolveLocale(siteSettings?.location, lang) || "Atlanta, GA // Worldwide";

  const toggleService = (service: ServiceOption, checked: boolean) => {
    setForm((prev) => ({
      ...prev,
      services: checked
        ? [...prev.services, service]
        : prev.services.filter((s) => s !== service),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const url = buildContactMessage(form, lang);
    window.open(url, "_blank");
  };

  const inputClass =
    "w-full bg-transparent border-b border-white/20 focus:border-white pb-3 text-white placeholder:text-neutral-600 font-body text-sm transition-colors duration-200 outline-none";

  return (
    <section id="contact" className="py-24 md:py-36 bg-neutral-950" ref={ref}>
      <div className="max-w-[1600px] mx-auto px-6 md:px-10 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
          {/* Left — Heading & Socials */}
          <div className="flex flex-col justify-between h-full">
            <div>
              <SectionLabel className="mb-4">Get In Touch</SectionLabel>
              <SectionHeading className="text-[clamp(2rem,3.8vw,3.75rem)] leading-[0.96] tracking-tight text-white mb-6">
                {["LET'S CREATE", "SOMETHING."]}
              </SectionHeading>

              <motion.div
                className="mt-6 space-y-3 max-w-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
              >
                <p className="text-sm md:text-base font-body text-neutral-300 font-medium">
                  Photography • Graphic Design • Custom Art • Event Coverage
                </p>
                <p className="text-sm font-body text-neutral-400 leading-relaxed">
                  Fill out the form and your inquiry will go directly to DKGRFX via WhatsApp for a fast, personal response — or reach out directly through any of the channels below.
                </p>
              </motion.div>
            </div>

            {/* Social & Direct Contact Links */}
            <motion.div
              className="mt-10 md:mt-12 pt-8 border-t border-white/10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
            >
              <p className="text-xs font-body font-semibold uppercase tracking-[0.2em] text-neutral-400 mb-4">
                Connect & Follow
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Instagram */}
                <a
                  href={instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between p-3.5 bg-black hover:bg-neutral-900 border border-white/10 hover:border-white/25 transition-all duration-200"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <svg className="w-4 h-4 text-neutral-400 group-hover:text-white transition-colors flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                    <div className="truncate">
                      <p className="text-xs font-body font-semibold uppercase tracking-[0.15em] text-white">
                        Instagram
                      </p>
                      <p className="text-[11px] font-body text-neutral-400 group-hover:text-neutral-300 truncate">
                        {instagramHandle}
                      </p>
                    </div>
                  </div>
                  <span className="text-neutral-500 group-hover:text-white transition-colors text-xs ml-2">
                    ↗
                  </span>
                </a>

                {/* Email */}
                <a
                  href={`mailto:${contactEmail}`}
                  className="group flex items-center justify-between p-3.5 bg-black hover:bg-neutral-900 border border-white/10 hover:border-white/25 transition-all duration-200"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <svg className="w-4 h-4 text-neutral-400 group-hover:text-white transition-colors flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                    </svg>
                    <div className="truncate">
                      <p className="text-xs font-body font-semibold uppercase tracking-[0.15em] text-white">
                        Email
                      </p>
                      <p className="text-[11px] font-body text-neutral-400 group-hover:text-neutral-300 truncate">
                        {contactEmail}
                      </p>
                    </div>
                  </div>
                  <span className="text-neutral-500 group-hover:text-white transition-colors text-xs ml-2">
                    ↗
                  </span>
                </a>
              </div>
            </motion.div>
          </div>

          {/* Right — Interactive Form */}
          <motion.form
            onSubmit={handleSubmit}
            className="flex flex-col gap-6 bg-black border border-white/10 p-6 md:p-10"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
          >
            <div>
              <p className="text-xs font-body font-semibold uppercase tracking-[0.2em] text-neutral-400 mb-4">
                What are you interested in?
              </p>
              <div className="grid grid-cols-2 gap-2">
                {SERVICE_OPTIONS.map((service) => (
                  <ServiceCheckbox
                    key={service}
                    label={service}
                    checked={form.services.includes(service)}
                    onChange={toggleService}
                  />
                ))}
              </div>
            </div>

            <div>
              <input
                type="text"
                placeholder="YOUR NAME *"
                required
                value={form.name}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, name: e.target.value }))
                }
                className={inputClass}
              />
            </div>

            <div>
              <input
                type="email"
                placeholder="YOUR EMAIL *"
                required
                value={form.email}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, email: e.target.value }))
                }
                className={inputClass}
              />
            </div>

            <div>
              <textarea
                placeholder="TELL ME ABOUT YOUR PROJECT OR IDEA..."
                rows={3}
                value={form.projectDetails}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    projectDetails: e.target.value,
                  }))
                }
                className={`${inputClass} resize-none`}
              />
            </div>

            <div className="pt-2">
              <Button type="submit" variant="primary" size="lg" className="w-full justify-center">
                SEND VIA WHATSAPP →
              </Button>
              <p className="text-xs text-neutral-500 text-center mt-3">
                Opens WhatsApp with your pre-filled inquiry. No spam ever.
              </p>
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
