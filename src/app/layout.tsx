import type { Metadata, Viewport } from "next";
import { Archivo, Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Analytics } from "@vercel/analytics/next";

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  variable: "--font-heading",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#000000",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://dkgrfx.com"),
  title: {
    default: "DKGRFX — Visual Artist • Designer • Photographer",
    template: "%s | DKGRFX",
  },
  description:
    "Multidisciplinary visual artist and photographer specializing in sports photography, digital illustration, graphic design, and custom commissions. REAL MOMENTS → ART.",
  applicationName: "DKGRFX Portfolio",
  authors: [{ name: "DKGRFX", url: "https://dkgrfx.com" }],
  creator: "DKGRFX",
  publisher: "DKGRFX",
  keywords: [
    "DKGRFX",
    "visual artist",
    "photographer",
    "graphic designer",
    "sports photography",
    "custom artwork",
    "commissions",
    "Atlanta photographer",
    "digital art",
    "sports graphics",
    "David Baros",
    "event photography",
    "creative direction",
  ],
  category: "Visual Arts & Photography",
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon.png", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: [
      { url: "/apple-icon.png", type: "image/png" },
      { url: "/apple-touch-icon.png", type: "image/png" },
    ],
  },
  manifest: "/manifest.webmanifest",
  openGraph: {
    title: "DKGRFX — Visual Artist • Designer • Photographer",
    description:
      "A multidisciplinary visual practice exploring art, design, photography, people, movement, and real moments. REAL MOMENTS → ART.",
    url: "https://dkgrfx.com",
    siteName: "DKGRFX",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "DKGRFX — Visual Artist • Designer • Photographer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DKGRFX — Visual Artist • Designer • Photographer",
    description:
      "Multidisciplinary visual practice exploring art, design, photography, people, movement, and real moments.",
    creator: "@dkgrfx",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://dkgrfx.com/#person",
      "name": "Darwin (DKGRFX)",
      "alternateName": ["DKGRFX", "David Baros"],
      "jobTitle": "Visual Artist, Designer & Photographer",
      "description":
        "Multidisciplinary visual artist and photographer specializing in sports photography, digital art commissions, and graphic design.",
      "url": "https://dkgrfx.com",
      "image": "https://dkgrfx.com/logo.png",
      "sameAs": [
        "https://www.instagram.com/dkgrfx",
        "https://www.linkedin.com/in/david-baros-0329772b0",
        "https://linktr.ee/dkbvii"
      ],
      "knowsAbout": [
        "Sports Photography",
        "Digital Illustration",
        "Graphic Design",
        "Photo Retouching",
        "Art Direction",
        "Poster Design"
      ]
    },
    {
      "@type": "WebSite",
      "@id": "https://dkgrfx.com/#website",
      "url": "https://dkgrfx.com",
      "name": "DKGRFX",
      "description": "Visual Artist • Designer • Photographer Portfolio",
      "publisher": {
        "@id": "https://dkgrfx.com/#person"
      },
      "inLanguage": "en-US"
    },
    {
      "@type": "ProfessionalService",
      "@id": "https://dkgrfx.com/#service",
      "name": "DKGRFX Visual Arts & Photography",
      "image": "https://dkgrfx.com/logo.png",
      "url": "https://dkgrfx.com",
      "telephone": "+16784387649",
      "email": "grfxdk@gmail.com",
      "priceRange": "$$",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Atlanta",
        "addressRegion": "GA",
        "addressCountry": "US"
      }
    }
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${archivo.variable} ${inter.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-body bg-black text-white antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
