"use client";

import { useEffect, useState } from "react";

type Product = {
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
      const data = await res.json();
      data.sort((a: Product, b: Product) => a.category.localeCompare(b.category));
      setProducts(data);
    } catch (err: unknown) {
      console.error(err);
    }
    setLoading(false);
  };

  const handleModify = (product: Product) => {
    setEditing(product.name);
    setFormData({ ...product });
  };

  const handleSave = async () => {
    if (!editing) return;

    try {
      const res = await fetch("/api/inventory/manage-product", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: editing, updatedFields: formData }),
      });
      const data = await res.json();
      if (res.ok) {
        alert("Product updated");
        setEditing(null);
        fetchProducts();
      } else {
        alert(data.error || "Error updating product");
      }
    } catch (err: unknown) {
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
        body: JSON.stringify({ name: product.name, updatedFields: { quantity: 0 } }),
      });
      const data = await res.json();
      if (res.ok) fetchProducts();
      else alert(data.error || "Error deleting product");
    } catch (err: unknown) {
      console.error(err);
      alert("Network error");
    }
  };

  const handleChange = (field: keyof Product, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="flex flex-col gap-4 p-4 max-w-3xl mx-auto">
      <button
        onClick={goBack}
        className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 mb-4"
      >
        Back
      </button>

      {products.map((product) => (
        <div key={product.name} className="border p-4 rounded flex flex-col gap-2">
          {editing === product.name ? (
            <>
              <input
                type="text"
                value={formData.name || ""}
                onChange={(e) => handleChange("name", e.target.value)}
                placeholder="Name"
                className="border p-2 rounded"
              />
              <input
                type="text"
                value={formData.description || ""}
                onChange={(e) => handleChange("description", e.target.value)}
                placeholder="Description"
                className="border p-2 rounded"
              />
              <textarea
                value={formData.details || ""}
                onChange={(e) => handleChange("details", e.target.value)}
                placeholder="Details"
                className="border p-2 rounded"
              />
              <input
                type="number"
                value={formData.price || 0}
                onChange={(e) => handleChange("price", parseFloat(e.target.value))}
                placeholder="Price"
                className="border p-2 rounded"
              />
              <input
                type="number"
                value={formData.quantity || 0}
                onChange={(e) => handleChange("quantity", parseInt(e.target.value))}
                placeholder="Quantity"
                className="border p-2 rounded"
              />
              <input
                type="text"
                value={formData.category || ""}
                onChange={(e) => handleChange("category", e.target.value)}
                placeholder="Category"
                className="border p-2 rounded"
              />
              <button
                onClick={handleSave}
                className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 mt-2"
              >
                Save
              </button>
              <button
                onClick={() => setEditing(null)}
                className="bg-gray-600 text-white px-3 py-1 rounded hover:bg-gray-700 mt-2"
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              <p>
                <strong>{product.name}</strong> ({product.category}) - ${product.price} - Qty:{" "}
                {product.quantity}
              </p>
              <p>{product.description}</p>
              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => handleModify(product)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                >
                  Modify
                </button>
                <button
                  onClick={() => handleDelete(product)}
                  className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
}
