"use client";

import { useState } from "react";
import AdminInventory from "./AdminInventory";

export default function AdminDash() {
  const [showInventory, setShowInventory] = useState(false);

  return (
    <div className="p-6">
      {!showInventory ? (
        <button
          onClick={() => setShowInventory(true)}
          className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700"
        >
          Inventory Management
        </button>
      ) : (
        <AdminInventory />
      )}
    </div>
  );
}
