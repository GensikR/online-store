"use client";

import React, { useState } from "react";
import { useCart } from "@/app/context/CartContext";
import Image from "next/image";
import Link from "next/link";

const ShoppingBagIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-24 w-24 text-gray-300"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={1.5}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
  </svg>
);

export default function CheckoutContent() {
  const { state } = useCart();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");

  if (!state) return null; // safety

  const subtotal = state.items.reduce(
    (sum, item) => sum + Number(item.price.toString().replace("$", "")) * item.quantity,
    0
  );
  const shippingCost = 0;
  const total = subtotal + shippingCost;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(
      `Order placed!\nName: ${name}\nEmail: ${email}\nAddress: ${address}\nTotal: $${total.toFixed(2)}`
    );
  };

  if (state.items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4 bg-gray-50">
        <ShoppingBagIcon />
        <h1 className="text-3xl font-bold mt-6 mb-2 text-gray-800">Your cart is empty</h1>
        <p className="text-gray-600 mb-6">Add some items to your cart before checking out.</p>
        <Link
          href="/"
          className="px-6 py-3 bg-[#d1b49f] text-white rounded-lg font-semibold hover:scale-105 transition-transform"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen flex justify-center py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">

        {/* Shipping Form */}
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-md space-y-6">
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">Shipping Information</h2>
          
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#d1b49f]"
          />
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#d1b49f]"
          />
          <textarea
            placeholder="Address, City, ZIP Code"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
            rows={3}
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#d1b49f]"
          />

          <button
            type="submit"
            className="w-full bg-[#d1b49f] text-white py-4 rounded-lg font-semibold text-lg transition-transform hover:scale-105 shadow-md"
          >
            Place Order
          </button>
        </form>

        {/* Order Summary */}
        <div className="bg-white p-8 rounded-xl shadow-md">
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Order Summary</h2>
          <div className="space-y-4 mb-6">
            {state.items.map((item) => (
              <div key={item.cartId} className="flex items-center gap-4">
                <div className="relative w-20 h-24 rounded-md overflow-hidden flex-shrink-0 border">
                  <Image src={item.images[0]} alt={item.name} fill className="object-cover" />
                  <span className="absolute -top-2 -right-2 bg-[#d1b49f] text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center">
                    {item.quantity}
                  </span>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800">{item.name}</h3>
                  <p className="text-sm text-gray-500">{item.price}</p>
                </div>
                <div className="font-semibold text-gray-800">
                  ${Number(item.price.toString().replace("$", "")) * item.quantity}
                </div>
              </div>
            ))}
          </div>

          <div className="border-t pt-4 space-y-2 text-gray-700">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span className="font-semibold">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping:</span>
              <span className="font-semibold">{shippingCost > 0 ? `$${shippingCost.toFixed(2)}` : "Free"}</span>
            </div>
            <div className="flex justify-between font-bold text-lg text-gray-900 border-t pt-2 mt-2">
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
