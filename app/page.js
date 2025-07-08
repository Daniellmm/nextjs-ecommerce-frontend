import Header from "@/components/Header";
import Hero from "./home/page";
import NewProduct from "@/components/NewProduct";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Products";
import TopSelling from "@/components/TopSelling";
import BrowseSection from "@/components/BrowseSection";
import CustomerReview from "@/components/CustomerReview";
import Footer from "@/components/Footer";

export default async function Home() {
  await mongooseConnect();
  const newProducts = await Product.find({}, null, {sort: {createdAt: -1}, limit: 4}).lean();

  const topSelling = await Product.find({topSelling: true}, null, {sort: {topSelling: -1, price: 1}, limit: 4}).lean();

  return (
    <div className="overflow-x-hidden">
      <Header />
      <Hero />
      <NewProduct newProducts={JSON.parse(JSON.stringify(newProducts))} />
      <TopSelling topSelling={JSON.parse(JSON.stringify(topSelling))} />
      <BrowseSection />
      <CustomerReview />
      <Footer />
    </div>
  );
}