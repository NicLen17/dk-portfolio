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

export function ContactSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  const [form, setForm] = useState<ContactFormData>(defaultForm);

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
    const url = buildContactMessage(form);
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
                  href="https://www.instagram.com/dkgrfx"
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
                        @dkgrfx
                      </p>
                    </div>
                  </div>
                  <span className="text-neutral-500 group-hover:text-white transition-colors text-xs ml-2">
                    ↗
                  </span>
                </a>

                {/* LinkedIn */}
                <a
                  href="https://www.linkedin.com/in/david-baros-0329772b0"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between p-3.5 bg-black hover:bg-neutral-900 border border-white/10 hover:border-white/25 transition-all duration-200"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <svg className="w-4 h-4 text-neutral-400 group-hover:text-white transition-colors flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                    </svg>
                    <div className="truncate">
                      <p className="text-xs font-body font-semibold uppercase tracking-[0.15em] text-white">
                        LinkedIn
                      </p>
                      <p className="text-[11px] font-body text-neutral-400 group-hover:text-neutral-300 truncate">
                        David Baros
                      </p>
                    </div>
                  </div>
                  <span className="text-neutral-500 group-hover:text-white transition-colors text-xs ml-2">
                    ↗
                  </span>
                </a>

                {/* Email */}
                <a
                  href="mailto:grfxdk@gmail.com"
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
                        grfxdk@gmail.com
                      </p>
                    </div>
                  </div>
                  <span className="text-neutral-500 group-hover:text-white transition-colors text-xs ml-2">
                    ↗
                  </span>
                </a>

                {/* WhatsApp Direct */}
                <a
                  href="https://wa.me/16784387649"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between p-3.5 bg-black hover:bg-neutral-900 border border-white/10 hover:border-white/25 transition-all duration-200"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <svg className="w-4 h-4 text-neutral-400 group-hover:text-white transition-colors flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                    </svg>
                    <div className="truncate">
                      <p className="text-xs font-body font-semibold uppercase tracking-[0.15em] text-white">
                        WhatsApp
                      </p>
                      <p className="text-[11px] font-body text-neutral-400 group-hover:text-neutral-300 truncate">
                        Direct Chat
                      </p>
                    </div>
                  </div>
                  <span className="text-neutral-500 group-hover:text-white transition-colors text-xs ml-2">
                    ↗
                  </span>
                </a>

                {/* Linktree */}
                <a
                  href="https://linktr.ee/dkbvii"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group sm:col-span-2 flex items-center justify-between p-3.5 bg-black hover:bg-neutral-900 border border-white/10 hover:border-white/25 transition-all duration-200"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <svg className="w-4 h-4 text-neutral-400 group-hover:text-white transition-colors flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M7.953 15.066c-.08.163-.08.324-.08.486 0 1.296.972 2.268 2.268 2.268h3.726c1.296 0 2.268-.972 2.268-2.268 0-.162 0-.323-.08-.486l3.24-1.863c.405.647.648 1.376.648 2.187C19.943 18.119 18.125 20 15.867 20H8.133C5.875 20 4 18.119 4 15.39c0-.811.243-1.54.648-2.187l3.305 1.863zM12 4l4.05 6.885L12 13.007 7.95 10.885 12 4zm0 2.268L9.435 10.56l2.565 1.458 2.565-1.458L12 6.268z" />
                    </svg>
                    <div className="truncate">
                      <p className="text-xs font-body font-semibold uppercase tracking-[0.15em] text-white">
                        Linktree / Hub
                      </p>
                      <p className="text-[11px] font-body text-neutral-400 group-hover:text-neutral-300 truncate">
                        linktr.ee/dkbvii
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

          {/* Right — Form */}
          <motion.form
            onSubmit={handleSubmit}
            className="flex flex-col gap-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
          >
            {/* Services */}
            <fieldset>
              <legend className="text-xs font-body font-semibold uppercase tracking-[0.2em] text-neutral-400 mb-5">
                What are you looking for?
              </legend>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {SERVICE_OPTIONS.map((service) => (
                  <ServiceCheckbox
                    key={service}
                    label={service}
                    checked={form.services.includes(service)}
                    onChange={toggleService}
                  />
                ))}
              </div>
            </fieldset>

            {/* Name */}
            <div>
              <label className="block text-xs font-body uppercase tracking-[0.2em] text-neutral-500 mb-3">
                Name
              </label>
              <input
                type="text"
                required
                placeholder="Your name"
                className={inputClass}
                value={form.name}
                onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-body uppercase tracking-[0.2em] text-neutral-500 mb-3">
                Email
              </label>
              <input
                type="email"
                required
                placeholder="your@email.com"
                className={inputClass}
                value={form.email}
                onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
              />
            </div>

            {/* Project Details */}
            <div>
              <label className="block text-xs font-body uppercase tracking-[0.2em] text-neutral-500 mb-3">
                Project Details
              </label>
              <textarea
                required
                placeholder="Tell me about your project..."
                rows={5}
                className={`${inputClass} resize-none`}
                value={form.projectDetails}
                onChange={(e) =>
                  setForm((p) => ({ ...p, projectDetails: e.target.value }))
                }
              />
            </div>

            {/* Submit */}
            <div className="pt-2">
              <Button type="submit" size="lg" className="w-full sm:w-auto">
                SEND VIA WHATSAPP →
              </Button>
              <p className="mt-3 text-xs font-body text-neutral-600">
                Your inquiry will open WhatsApp with a pre-filled message ready to send.
              </p>
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
