"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

type Product = {
  id: number;
  title: string;
  desc: string;
  details: string;
  images: string[];
  price: string;
};

type Props = {
  product: Product;
  onClose: () => void;
};

const CartIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 mr-2"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
  </svg>
);

const ProductView: React.FC<Props> = ({ product, onClose }) => {
  const [activeImage, setActiveImage] = useState(product.images[0]);
  const detailPoints = product.details.split(",");

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md"
      onClick={onClose}
    >
      <motion.div
        className="relative w-full max-w-4xl rounded-2xl bg-white shadow-2xl p-4 md:p-8 m-4 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.3 }}
      >
        {/* --- Top-left Back Button (always visible) --- */}
        <button
          onClick={onClose}
          className="absolute left-4 top-4 z-10 flex items-center gap-2 text-gray-700 hover:text-gray-900 font-semibold"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mt-6">
          {/* --- Image Gallery --- */}
          <div className="flex flex-col gap-4">
            {/* Main Image */}
            <div className="relative aspect-square w-full rounded-xl overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeImage}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="absolute inset-0"
                >
                  <Image src={activeImage} alt={product.title} layout="fill" className="object-cover" />
                </motion.div>
              </AnimatePresence>
            </div>
            {/* Thumbnails */}
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((img) => (
                <button
                  key={img}
                  onClick={() => setActiveImage(img)}
                  className={`relative aspect-square rounded-md overflow-hidden transition-all duration-200 ${
                    activeImage === img ? "ring-2 ring-[#d1b49f] ring-offset-2" : "hover:opacity-80"
                  }`}
                >
                  <Image src={img} alt="Thumbnail" layout="fill" className="object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* --- Product Info & Actions --- */}
          <div className="flex flex-col">
            <h2 className="font-serif text-4xl font-bold text-gray-800 mb-2">{product.title}</h2>
            <p className="text-3xl md:text-4xl font-extrabold text-[#d1b49f] mb-4">{product.price}</p>
            <p className="text-gray-600 mb-6">{product.desc}</p>

            <ul className="space-y-2 mb-8 text-sm text-gray-700">
              {detailPoints.map((point) => (
                <li key={point} className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-2 text-green-500 flex-shrink-0"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>{point.trim()}</span>
                </li>
              ))}
            </ul>

            <div className="mt-auto flex flex-col gap-4">
              <button className="flex w-full items-center justify-center bg-[#d1b49f] text-white px-6 py-3 rounded-lg font-semibold text-base transition-transform hover:scale-105">
                <CartIcon />
                Add to Cart
              </button>
              <button className="w-full border border-gray-300 px-6 py-3 rounded-lg font-semibold text-gray-700 hover:bg-gray-100 transition">
                Buy Now
              </button>
            </div>
          </div>
        </div>

        {/* --- Mobile Bottom Close Button --- */}
        <button
          onClick={onClose}
          className="mt-6 w-full md:hidden bg-gray-200 text-gray-800 py-3 rounded-lg font-semibold hover:bg-gray-300 transition"
        >
          Close
        </button>
      </motion.div>
    </div>
  );
};

export default ProductView;
