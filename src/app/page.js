import CategoriesSection from "@/components/home/CategoriesSection";
import FaqSection from "@/components/home/FaqSection";
import FeaturedItems from "@/components/home/FeaturedItems";
import FeaturesSection from "@/components/home/FeaturesSection";
import FinalCtaSection from "@/components/home/FinalCtaSection";
import Hero from "@/components/home/Hero";
import HowItWorksSection from "@/components/home/HowItWorksSection";

export default function Home() {
  return (
    <div className="bg-base-cream">
      <Hero />
      <FeaturedItems detailsBasePath="/all-page" />
      <FeaturesSection />
      <HowItWorksSection />
      <CategoriesSection />
      <FaqSection />
      <FinalCtaSection />
    </div>
  );
}
