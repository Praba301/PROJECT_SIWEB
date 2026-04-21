import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import StatsSection from "@/components/sections/StatsSection";
import AboutSection from "@/components/sections/AboutSection";
import VisiMisiSection from "@/components/sections/VisiMisiSection";
import CoreValuesSection from "@/components/sections/CoreValuesSection";
import LayananSection from "@/components/sections/LayananSection";
import RuteSection from "@/components/sections/RuteSection";
import PricingSection from "@/components/sections/PricingSection";
import TeamSection from "@/components/sections/TeamSection";

export default function HomePage() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <StatsSection />
      <AboutSection />
      <VisiMisiSection />
      <CoreValuesSection />
      <LayananSection />
      <RuteSection />
      <PricingSection />
      <TeamSection />
      <Footer />
    </main>
  );
}