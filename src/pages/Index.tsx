
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import PropertyTypeSection from "@/components/PropertyTypeSection";
import TrustedSection from "@/components/TrustedSection";
import PopularSearches from "@/components/PopularSearches";
import MarketSection from "@/components/MarketSection";
import AgentsSection from "@/components/AgentsSection";
import NeighborhoodsSection from "@/components/NeighborhoodsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import CTASection from "@/components/CTASection";
import InsightsSection from "@/components/InsightsSection";
import WorkTogetherSection from "@/components/WorkTogetherSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <PropertyTypeSection />
        <TrustedSection />
        <PopularSearches />
        <MarketSection />
        <AgentsSection />
        <NeighborhoodsSection />
        <TestimonialsSection />
        <CTASection />
        <InsightsSection />
        <WorkTogetherSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
