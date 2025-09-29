"use client";

import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import Image from "next/image";
import Link from "next/link";

const ShoppingBagIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
    </svg>
);

const CheckoutPage: React.FC = () => {
  const { state } = useCart();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");

  const subtotal = state.items.reduce(
    (sum, item) => sum + Number(item.price.toString().replace("$", "")) * item.quantity,
    0
  );
  
  // Assuming free shipping for this example
  const shippingCost = 0;
  const total = subtotal + shippingCost;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Order placed!\nName: ${name}\nEmail: ${email}\nAddress: ${address}\nTotal: $${total.toFixed(2)}`);
  };

  if (state.items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4 bg-gray-50">
        <ShoppingBagIcon />
        <h1 className="text-3xl font-serif font-bold mt-6 mb-2">Your cart is empty</h1>
        <p className="text-gray-600 mb-6">Add some items to your cart before checking out.</p>
        <Link href="/" className="px-6 py-3 bg-[#d1b49f] text-white rounded-lg font-semibold hover:scale-105 transition-transform">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 font-sans">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-serif font-bold text-center mb-12 text-gray-800">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-10">
          
          {/* Order Summary (Right Column on Desktop) */}
          <div className="lg:order-last">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                {state.items.map((item) => (
                  <div key={item.id} className="flex items-center gap-4">
                    <div className="relative w-16 h-20 rounded-md overflow-hidden flex-shrink-0 border">
                      <Image src={item.images[0]} alt={item.title} fill className="object-cover" />
                      <span className="absolute -top-2 -right-2 bg-[#d1b49f] text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center">{item.quantity}</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800">{item.title}</h3>
                      <p className="text-sm text-gray-500">{item.price}</p>
                    </div>
                    <div className="font-semibold text-gray-800">{`$${(Number(item.price.toString().replace("$", "")) * item.quantity).toFixed(2)}`}</div>
                  </div>
                ))}
              </div>
              
              <div className="flex items-center gap-2 mb-6">
                <input type="text" placeholder="Discount code" className="w-full border rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#d1b49f]"/>
                <button className="px-4 py-2 bg-gray-200 text-gray-700 text-sm font-semibold rounded-lg hover:bg-gray-300 transition-colors">Apply</button>
              </div>

              <div className="space-y-2 border-t pt-4 text-gray-700">
                <div className="flex justify-between"><span>Subtotal:</span><span className="font-semibold">${subtotal.toFixed(2)}</span></div>
                <div className="flex justify-between"><span>Shipping:</span><span className="font-semibold">{shippingCost > 0 ? `$${shippingCost.toFixed(2)}` : 'Free'}</span></div>
                <div className="flex justify-between font-bold text-lg text-gray-900 border-t pt-2 mt-2"><span>Total:</span><span>${total.toFixed(2)}</span></div>
              </div>
            </div>
          </div>
          
          {/* Shipping Form (Left Column on Desktop) */}
          <div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold mb-4 text-gray-800">Contact Information</h2>
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#d1b49f]"
                />
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-4 text-gray-800">Shipping Address</h2>
                <div className="space-y-4">
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
                    className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#d1b49f]"
                    rows={3}
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-[#d1b49f] text-white py-4 rounded-lg font-semibold text-base transition-transform hover:scale-105 shadow-sm hover:shadow-md"
              >
                Place Order
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;