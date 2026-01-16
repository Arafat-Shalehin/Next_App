import FeaturedItems from "@/components/home/FeaturedItems";
import Hero from "@/components/home/Hero";

export default function Home() {
  return (
    <div className="bg-base-cream">
      <Hero />
      <FeaturedItems detailsBasePath="/all-page" />
    </div>
  );
}
