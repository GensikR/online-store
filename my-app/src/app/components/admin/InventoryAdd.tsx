"use client";

import { useState } from "react";

type Props = {
  goBack: () => void;
};

export default function InventoryAdd({ goBack }: Props) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [details, setDetails] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [images, setImages] = useState<string[]>([""]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleAdd = async () => {
    if (!name || !description || !details || !price || !quantity || images.some((img) => !img)) {
      setError("Please fill all fields and image URLs");
      setSuccess("");
      return;
    }

    const product = {
      name,
      description,
      details,
      price: parseFloat(price),
      quantity: parseInt(quantity),
      images,
    };

    try {
      const res = await fetch("/api/inventory/add-product", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      });

      const data = await res.json();
      if (res.ok) {
        setSuccess("Product added successfully!");
        setError("");
        setName("");
        setDescription("");
        setDetails("");
        setPrice("");
        setQuantity("");
        setImages([""]);
      } else {
        setError(data.error || "Error adding product");
        setSuccess("");
      }
    } catch (err: unknown) {
      console.error(err);
      setError("Network error");
      setSuccess("");
    }
  };

  const handleImageChange = (index: number, value: string) => {
    const newImages = [...images];
    newImages[index] = value;
    setImages(newImages);
  };

  const addImageField = () => setImages([...images, ""]);

  return (
    <div className="max-w-lg mx-auto p-4 border rounded shadow flex flex-col gap-4">
      <h2 className="text-2xl font-bold">Add Product</h2>

      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border p-2 rounded"
      />
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="border p-2 rounded"
      />
      <textarea
        placeholder="Details"
        value={details}
        onChange={(e) => setDetails(e.target.value)}
        className="border p-2 rounded"
      />
      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        className="border p-2 rounded"
      />
      <input
        type="number"
        placeholder="Quantity"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        className="border p-2 rounded"
      />

      <div className="flex flex-col gap-2">
        <label className="font-semibold">Image URLs:</label>
        {images.map((img, i) => (
          <input
            key={i}
            type="text"
            placeholder={`Image URL ${i + 1}`}
            value={img}
            onChange={(e) => handleImageChange(i, e.target.value)}
            className="border p-2 rounded"
          />
        ))}
        <button
          onClick={addImageField}
          className="bg-gray-600 text-white px-3 py-1 rounded hover:bg-gray-700"
        >
          Add Another Image
        </button>
      </div>

      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}

      <div className="flex gap-4 mt-2">
        <button
          onClick={handleAdd}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Add Product
        </button>
        <button
          onClick={goBack}
          className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
        >
          Back
        </button>
      </div>
    </div>
  );
}
