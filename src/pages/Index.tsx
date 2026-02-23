import { HeroSection } from "@/features/home/components/HeroSection";
import { MarqueeStrip } from "@/features/home/components/MarqueeStrip";
import { BusinessesSection } from "@/features/home/components/BusinessesSection";
import { VisionMission } from "@/features/home/components/VisionMission";
import { WorkingSection } from "@/features/home/components/WorkingSection";
import { ImpactSection } from "@/features/home/components/ImpactSection";

const Index = () => {
  return (
    <div id="hero">
      <HeroSection />
      <BusinessesSection />
      <MarqueeStrip />
      <VisionMission />
      <WorkingSection />
      <ImpactSection />
    </div>
  );
};

export default Index;
