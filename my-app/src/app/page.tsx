import LandingHero from "./components/front/LandingHero";
import Nav from "./components/front/Nav";
import ProductsReel from "./components/front/ProductsReel";

export default function Home() {
  return (
    <div>
      <Nav /> {/* The Nav is fixed and floats on top */}
      
      {/* FIX: Add padding-top to main content to offset the navbar's height */}
      <main className="pt-20"> 
        <LandingHero />
        <ProductsReel category="Clothing" />
        <ProductsReel category="Shoes" />
        <ProductsReel category="Accessories" />
      </main>
    </div>
  );
}