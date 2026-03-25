import HeroSection from "@/components/home/HeroSection";
import SearchSection from "@/components/home/SearchSection";
import StatsSection from "@/components/home/StatsSection";
import FeaturedPackages from "@/components/home/FeaturedPackages";
import PopularDestinations from "@/components/home/PopularDestinations";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import NewsletterSection from "@/components/home/NewsletterSection";
import CTASection from "@/components/home/CTASection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <SearchSection />
      <StatsSection />
      <FeaturedPackages />
      <PopularDestinations />
      <WhyChooseUs />
      <TestimonialsSection />
      <CTASection />
      <NewsletterSection />
    </>
  );
}
