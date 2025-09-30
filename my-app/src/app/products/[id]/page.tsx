"use client";

import React, { useState } from "react";
import ProductsReel from "@/app/components/front/ProductsReel";
import ProductView from "@/app/components/front/ProductView";
import { Product } from "@/types";

export default function ProductsPage() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  return (
    <div>
      {!selectedProduct && (
        <ProductsReel category="All" onSelectProduct={setSelectedProduct} />
      )}

      {selectedProduct && (
        <ProductView product={selectedProduct} onClose={() => setSelectedProduct(null)} />
      )}
    </div>
  );
}
