import { HeroSection } from "@/components/sections/HeroSection";
import { SelectedWorkSection } from "@/components/sections/SelectedWorkSection";
import { ThreePillarsSection } from "@/components/sections/ThreePillarsSection";
import { EventGalleriesSection } from "@/components/sections/EventGalleriesSection";
import { CommissionsSection } from "@/components/sections/CommissionsSection";
import { AboutPreviewSection } from "@/components/sections/AboutPreviewSection";
import { ContactSection } from "@/components/sections/ContactSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <SelectedWorkSection />
      <ThreePillarsSection />
      <EventGalleriesSection />
      <CommissionsSection />
      <AboutPreviewSection />
      <ContactSection />
    </>
  );
}
