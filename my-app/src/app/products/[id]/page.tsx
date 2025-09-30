"use client";

import React, { use } from "react";
import { useRouter } from "next/navigation";
import { products } from "@/data/products";
import ProductView from "../../components/front/ProductView";

type Props = {
  params: Promise<{ id: string }>; // params is now a Promise
};

export default function ProductPage({ params }: Props) {
  const router = useRouter();

  // Unwrap the promise with React.use()
  const { id } = use(params);

  // Find the product by id
  const product = products.find((p) => p.id === Number(id));

  if (!product) return <div className="p-6">Product not found</div>;

  return (
    <ProductView
      product={product}
      onClose={() => router.back()} // go back to previous page
    />
  );
}
