"use client";

import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { products as localProductsRaw } from "@/data/products";
import { db } from "@/app/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import { Product } from "@/types";

type Props = {
  category: string;
  onSelectProduct: (product: Product) => void;
};

// --- Arrow Icon ---
const ArrowIcon = ({ direction }: { direction: "left" | "right" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    {direction === "left" ? (
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
    ) : (
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    )}
  </svg>
);

const ProductsReel: React.FC<Props> = ({ category, onSelectProduct }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [firestoreProducts, setFirestoreProducts] = useState<Product[]>([]);
  const [localProducts, setLocalProducts] = useState<Product[]>([]);

  // Normalize local products to unified Product type
  useEffect(() => {
    const normalized = localProductsRaw.map((p) => ({
      id: String(p.id ?? Math.random()), // ensure string ID
      name: p.title ?? "Product",
      title: p.title ?? "Product",
      category: p.category ?? "default",
      price: Number(p.price) || 0,
      description: p.desc ?? "",
      details: p.details ?? "",
      images: p.images ?? [],
    })) as Product[];

    setLocalProducts(normalized);
  }, []);

  // Fetch Firestore products for the category
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const snapshot = await getDocs(collection(db, "inventory"));
        const fetched: Product[] = snapshot.docs
          .map((doc) => {
            const data = doc.data();
            return {
              id: String(data.id ?? data.name ?? doc.id),
              name: data.name ?? data.title ?? "Product",
              title: data.title ?? data.name ?? "Product",
              category: data.category ?? "default",
              price: Number(data.price) || 0,
              description: data.description ?? data.desc ?? "",
              details: data.details ?? "",
              images: data.images ?? [],
            } as Product;
          })
          .filter((p) => p.category === category);
        setFirestoreProducts(fetched);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProducts();
  }, [category]);

  const combinedProducts = [
    ...localProducts.filter((p) => p.category === category),
    ...firestoreProducts,
  ];

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: direction === "left" ? -300 : 300, behavior: "smooth" });
  };

  return (
    <section className="w-full py-16 bg-gradient-to-b from-white via-[#faf7f5] to-[#f3eee9]">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 text-center px-4">
          <h2 className="font-serif text-4xl font-bold text-gray-900 md:text-5xl">{category} Products</h2>
          <div className="mx-auto mt-4 h-1 w-24 rounded-full bg-[#d1b49f]" />
        </div>

        <div className="relative">
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto px-4 sm:px-6 pb-4 snap-x snap-proximity scrollbar-hide scroll-smooth"
          >
            {combinedProducts.map((product) => (
              <div
                key={product.id}
                onClick={() => onSelectProduct(product)}
                className="cursor-pointer group relative snap-start w-[80%] sm:w-72 lg:w-80 flex-shrink-0 h-96 overflow-hidden rounded-2xl shadow-md transition-shadow hover:shadow-xl"
              >
                <Image
                  src={product.images[0] ?? ""}
                  alt={product.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                  <h3 className="font-serif text-2xl font-semibold drop-shadow-md">{product.title}</h3>
                  <p className="mt-2 text-lg font-bold text-white drop-shadow-md">${product.price}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop Scroll Buttons */}
          <div className="hidden md:block">
            <button
              onClick={() => scroll("left")}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-white/80 rounded-full shadow-md hover:bg-white transition-transform hover:scale-110"
              aria-label="Scroll left"
            >
              <ArrowIcon direction="left" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-white/80 rounded-full shadow-md hover:bg-white transition-transform hover:scale-110"
              aria-label="Scroll right"
            >
              <ArrowIcon direction="right" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductsReel;
