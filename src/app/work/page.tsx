import type { Metadata } from "next";
import { WorkPageClient } from "@/components/work/WorkPageClient";

export const metadata: Metadata = {
  title: "Portfolio & Selected Works",
  description:
    "Explore the visual portfolio of DKGRFX across sports photography, digital art commissions, and high-impact graphic design.",
  alternates: {
    canonical: "/work",
  },
  openGraph: {
    title: "Portfolio & Selected Works | DKGRFX",
    description:
      "Explore the visual portfolio of DKGRFX across sports photography, digital art commissions, and high-impact graphic design.",
    url: "https://dkgrfx.com/work",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Portfolio & Selected Works | DKGRFX",
    description:
      "Explore the visual portfolio of DKGRFX across sports photography, digital art commissions, and high-impact graphic design.",
  },
};

export default function WorkPage() {
  return <WorkPageClient />;
}
