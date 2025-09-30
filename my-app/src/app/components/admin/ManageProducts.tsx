"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

type Product = {
  id: string; // Unique ID
  name: string;
  description: string;
  details: string;
  price: number;
  quantity: number;
  images: string[];
  category: string;
};

type Props = { goBack: () => void };

export default function ManageProducts({ goBack }: Props) {
  const [products, setProducts] = useState<Product[]>([]);
  const [editing, setEditing] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Product>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/inventory/get-products");
      const data: Product[] = await res.json();
      data.sort((a, b) => a.category.localeCompare(b.category));
      setProducts(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleModify = (product: Product) => {
    setEditing(product.id);
    setFormData({ ...product });
  };

  const handleSave = async () => {
    if (!editing) return;

    try {
      const res = await fetch("/api/inventory/manage-product", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: editing, updatedFields: formData }),
      });
      const data = await res.json();
      if (res.ok) {
        setEditing(null);
        fetchProducts();
      } else {
        alert(data.error || "Error updating product");
      }
    } catch (err) {
      console.error(err);
      alert("Network error");
    }
  };

  const handleDelete = async (product: Product) => {
    if (!confirm(`Delete product "${product.name}"?`)) return;

    try {
      const res = await fetch("/api/inventory/manage-product", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: product.id, updatedFields: { quantity: 0 } }),
      });
      const data = await res.json();
      if (res.ok) fetchProducts();
      else alert(data.error || "Error deleting product");
    } catch (err) {
      console.error(err);
      alert("Network error");
    }
  };

  const handleChange = (field: keyof Product, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  if (loading)
    return <p className="text-center mt-20 text-gray-500">Loading products...</p>;

  return (
    <div className="min-h-screen bg-gray-50 py-10 flex flex-col items-center px-4">
      {/* Header */}
      <div className="w-full max-w-5xl flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Manage Products</h2>
        <button
          onClick={goBack}
          className="bg-gray-600 text-white px-5 py-2 rounded-xl shadow hover:bg-gray-700 transition-all"
        >
          Back
        </button>
      </div>

      {/* Products Grid */}
      <div className="grid gap-6 w-full grid-cols-1 md:grid-cols-2">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-2xl shadow-lg p-6 flex flex-col gap-4 hover:shadow-2xl transition-shadow"
          >
            {/* Product Image */}
            {product.images?.[0] && (
              <div className="relative w-full h-48 mb-4 rounded-xl overflow-hidden">
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            )}

            {/* Edit Form */}
            {editing === product.id ? (
              <div className="flex flex-col gap-3">
                {["name", "description", "details", "category"].map((field) => (
                  <input
                    key={field}
                    type="text"
                    value={formData[field as keyof Product] || ""}
                    onChange={(e) =>
                      handleChange(field as keyof Product, e.target.value)
                    }
                    placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                    className="border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                ))}
                {["price", "quantity"].map((field) => (
                  <input
                    key={field}
                    type="number"
                    value={formData[field as keyof Product] || 0}
                    onChange={(e) =>
                      handleChange(
                        field as keyof Product,
                        field === "price"
                          ? parseFloat(e.target.value)
                          : parseInt(e.target.value)
                      )
                    }
                    placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                    className="border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                ))}
                <div className="flex gap-3 mt-2">
                  <button
                    onClick={handleSave}
                    className="bg-green-600 text-white px-4 py-2 rounded-xl shadow hover:bg-green-700 transition-all"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditing(null)}
                    className="bg-gray-600 text-white px-4 py-2 rounded-xl shadow hover:bg-gray-700 transition-all"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              // Display Product Info
              <div className="flex flex-col gap-2">
                <h3 className="text-xl font-semibold">{product.name}</h3>
                <p className="text-gray-500">{product.category}</p>
                <p className="text-gray-700">{product.description}</p>
                <p className="font-medium text-gray-800">
                  Price: ${product.price} | Qty: {product.quantity}
                </p>
                <div className="flex gap-3 mt-3">
                  <button
                    onClick={() => handleModify(product)}
                    className="bg-yellow-500 text-white px-4 py-2 rounded-xl shadow hover:bg-yellow-600 transition-all"
                  >
                    Modify
                  </button>
                  <button
                    onClick={() => handleDelete(product)}
                    className="bg-red-600 text-white px-4 py-2 rounded-xl shadow hover:bg-red-700 transition-all"
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
