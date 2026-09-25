import Link from "next/link";
import { Button } from "@/components/ui/Button";

export const metadata = {
  title: "Sanity Studio Admin | DKGRFX",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminPage() {
  const studioUrl =
    process.env.NEXT_PUBLIC_SANITY_STUDIO_URL ||
    (process.env.NODE_ENV === "development"
      ? "http://localhost:3333"
      : "https://dkgrfx.sanity.studio");

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-6">
      <div className="max-w-md w-full border border-neutral-800 bg-neutral-950 p-8 rounded-xl text-center shadow-2xl">
        <div className="w-12 h-12 bg-white text-black font-black text-xl flex items-center justify-center rounded-lg mx-auto mb-6">
          DK
        </div>
        <h1 className="font-heading font-black text-2xl mb-2 tracking-tight">
          SANITY STUDIO ADMIN
        </h1>
        <p className="text-neutral-400 text-sm mb-6 leading-relaxed">
          The content management studio runs in high-performance standalone mode
          (Vite-powered, auto-updating).
        </p>

        <div className="flex flex-col gap-3">
          <Button
            href={studioUrl}
            isExternal
            variant="primary"
            size="lg"
            className="w-full justify-center text-xs tracking-widest font-heading font-black"
          >
            OPEN SANITY STUDIO →
          </Button>

          <Link
            href="/"
            className="text-xs font-mono text-neutral-500 hover:text-white transition-colors pt-2"
          >
            ← Return to Portfolio
          </Link>
        </div>
      </div>
    </div>
  );
}
