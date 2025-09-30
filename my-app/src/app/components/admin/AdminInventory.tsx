"use client";

import { useState } from "react";
import InventoryAdd from "./InventoryAdd";
import ManageProducts from "./ManageProducts";

export default function AdminInventory() {
  const [view, setView] = useState<"main" | "add" | "manage">("main");

  if (view === "add") return <InventoryAdd goBack={() => setView("main")} />;
  if (view === "manage") return <ManageProducts goBack={() => setView("main")} />;

  return (
    <div className="flex flex-col items-center gap-6 mt-6">
      <button
        onClick={() => setView("add")}
        className="bg-green-600 text-white px-6 py-3 rounded-xl shadow-lg hover:bg-green-700 transition-all w-64 text-lg font-medium"
      >
        Add Product
      </button>
      <button
        onClick={() => setView("manage")}
        className="bg-blue-600 text-white px-6 py-3 rounded-xl shadow-lg hover:bg-blue-700 transition-all w-64 text-lg font-medium"
      >
        Manage Products
      </button>
    </div>
  );
}
