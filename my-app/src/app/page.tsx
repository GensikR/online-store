"use client";

import React, { useState } from "react";
import { CartProvider } from "@/app/context/CartContext";
import LandingHero from "./components/front/LandingHero";
import Nav from "./components/front/Nav";
import ProductsReel from "./components/front/ProductsReel";
import ProductView from "./components/front/ProductView";
import { Product } from "@/types";
import Footer from "./components/front/Footer";

export default function Home() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  return (
    <CartProvider>
      <div>
        <Nav />

        <main className="pt-20">
          <LandingHero />

          <ProductsReel
            category="Clothing"
            onSelectProduct={(product: Product) => setSelectedProduct(product)}
          />
          <ProductsReel
            category="Shoes"
            onSelectProduct={(product: Product) => setSelectedProduct(product)}
          />
          <ProductsReel
            category="Accessories"
            onSelectProduct={(product: Product) => setSelectedProduct(product)}
          />

          {/* Overlay the product view */}
          {selectedProduct && (
            <div className="fixed inset-0 z-50 bg-black/50 flex justify-center items-start pt-20">
              <div className="relative w-full max-w-7xl p-4">
                <ProductView
                  product={selectedProduct}
                  onClose={() => setSelectedProduct(null)}
                />
              </div>
            </div>
          )}
        </main>
      </div>
      <Footer/>
    </CartProvider>
    
    
  );
}
