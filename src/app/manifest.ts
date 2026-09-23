import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "DKGRFX — Visual Artist, Designer & Photographer",
    short_name: "DKGRFX",
    description:
      "Multidisciplinary visual practice exploring art, design, photography, people, movement, and real moments. REAL MOMENTS → ART.",
    start_url: "/",
    display: "standalone",
    background_color: "#000000",
    theme_color: "#000000",
    icons: [
      {
        src: "/icon.png",
        sizes: "any",
        type: "image/png",
      },
      {
        src: "/apple-icon.png",
        sizes: "any",
        type: "image/png",
      },
    ],
  };
}
