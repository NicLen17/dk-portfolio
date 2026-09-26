import { sanityFetch } from "@/sanity/fetch";
import { SITE_SETTINGS_QUERY } from "@/sanity/queries";
import type { SanitySiteSettings } from "@/sanity/types";
import { ContactForm } from "./ContactForm";

// Server Component fetching siteSettings from Sanity
export async function ContactSection() {
  const siteSettings = await sanityFetch<SanitySiteSettings>({
    query: SITE_SETTINGS_QUERY,
    tags: ["siteSettings"],
    revalidate: 60,
  });

  return <ContactForm siteSettings={siteSettings} />;
}
