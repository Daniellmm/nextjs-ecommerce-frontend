
import Header from "@/components/Header";
import Hero from "./home/page";
import BrowseSection from "@/components/BrowseSection";
import Footer from "@/components/Footer";
import NewProductsSection from "@/components/sections/NewProductsSection";
import TopSellingSection from "@/components/sections/TopSellingSection";
import CustomerReview from "@/components/CustomerReview";

// export const revalidate = 1800; // Revalidate every 30 minutes

export default function Home() {
  return (
    <div className="overflow-x-hidden">
      <Header />

      {/* Hero section (static content) */}
      <Hero />

      {/* New Products section with cached data */}
      <NewProductsSection />

      {/* Top Selling section with cached data */}
      <TopSellingSection />

      {/* Browse section (static content) */}
      <BrowseSection />

      {/* Customer Reviews section */}
      <CustomerReview />

      <Footer />
    </div>
  );
}