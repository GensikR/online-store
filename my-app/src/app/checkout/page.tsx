"use client";

import React from "react";
import { CartProvider } from "@/app/context/CartContext";
import CheckoutContent from "@/app/components/front/CheckoutContent";

export default function CheckoutPage() {
  return (
    <CartProvider>
      <CheckoutContent />
    </CartProvider>
  );
}
