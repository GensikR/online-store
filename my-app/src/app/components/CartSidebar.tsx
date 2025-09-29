"use client";

import React from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../context/CartContext";
import { useRouter } from "next/navigation"; // added router

// --- SVG Icons ---
const CloseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const TrashIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>
);

const ShoppingBagIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
  </svg>
);

// --- Format price helper ---
const formatPrice = (price: string | number) => {
  const num = typeof price === "string" ? Number(price.toString().replace("$", "")) : price;
  return `$${num.toFixed(2)}`;
};

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const CartSidebar: React.FC<Props> = ({ isOpen, onClose }) => {
  const { state, dispatch } = useCart();
  const router = useRouter(); // added router

  const subtotal = state.items.reduce(
    (sum, item) => sum + Number(item.price.toString().replace("$", "")) * item.quantity,
    0
  );

  const freeShippingThreshold = 100;
  const progressPercentage = Math.min((subtotal / freeShippingThreshold) * 100, 100);

  const handleCheckout = () => {
    onClose(); // close sidebar
    router.push("/checkout"); // navigate to checkout
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div className="fixed inset-0 z-50" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          ></motion.div>

          {/* Sidebar */}
          <motion.div
            className="absolute top-0 right-0 w-full max-w-lg bg-white h-full shadow-2xl flex flex-col font-sans"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800">Your Cart</h2>
              <button onClick={onClose} className="text-gray-400 hover:text-gray-800 transition-colors">
                <CloseIcon />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-5">
              {state.items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <ShoppingBagIcon />
                  <p className="mt-4 text-lg font-medium text-gray-800">Your cart is empty</p>
                  <p className="mt-2 text-gray-500">Looks like you haven&apos;t added anything yet.</p>
                </div>
              ) : (
                <div className="divide-y divide-gray-200">
                  {state.items.map((item) => (
                    <div key={item.id} className="flex flex-col sm:flex-row items-center sm:items-start gap-4 py-5">
                      <div className="relative w-20 h-24 rounded-lg overflow-hidden flex-shrink-0">
                        <Image src={item.images[0]} alt={item.title} fill className="object-cover" />
                      </div>
                      <div className="flex-1 w-full flex flex-col sm:flex-row sm:items-center justify-between">
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-800">{item.title}</h3>
                          <p className="text-lg font-bold text-[#d1b49f] mt-1">{formatPrice(item.price)}</p>
                        </div>

                        <div className="flex items-center gap-2 mt-3 sm:mt-0">
                          <button
                            onClick={() => dispatch({ type: "DECREASE_QTY", payload: item.id })}
                            className="w-10 h-10 border rounded-md text-gray-600 hover:bg-gray-100 flex items-center justify-center text-xl font-bold"
                          >
                            -
                          </button>
                          <span className="w-12 h-12 flex items-center justify-center font-extrabold text-2xl text-[#d1b49f] bg-gray-100 rounded-full border-2 border-[#d1b49f] shadow-md">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => dispatch({ type: "INCREASE_QTY", payload: item.id })}
                            className="w-10 h-10 border rounded-md text-gray-600 hover:bg-gray-100 flex items-center justify-center text-xl font-bold"
                          >
                            +
                          </button>
                          <button
                            onClick={() => dispatch({ type: "REMOVE_ITEM", payload: item.id })}
                            className="text-gray-400 hover:text-red-500 transition-colors ml-4 flex-shrink-0"
                          >
                            <TrashIcon />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {state.items.length > 0 && (
              <div className="p-5 border-t border-gray-200 bg-gray-50">
                <div className="mb-4">
                  <p className="text-sm text-center text-gray-600 mb-2">
                    {subtotal >= freeShippingThreshold
                      ? "You got free shipping!"
                      : `Add ${formatPrice(freeShippingThreshold - subtotal)} more for free shipping`}
                  </p>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-[#d1b49f] h-2 rounded-full transition-all duration-500"
                      style={{ width: `${progressPercentage}%` }}
                    ></div>
                  </div>
                </div>

                <div className="flex justify-between font-semibold text-lg text-gray-800 mb-4">
                  <span>Subtotal:</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>

                {/* Checkout Button */}
                <button
                  onClick={handleCheckout} // navigate to checkout
                  className="w-full bg-[#d1b49f] text-white py-3 rounded-lg font-semibold text-base transition-transform hover:scale-105 shadow-sm hover:shadow-md"
                >
                  Proceed to Checkout
                </button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CartSidebar;
