"use client";

import { useState } from "react";
import InventoryAdd from "./InventoryAdd";
import ManageProducts from "./ManageProducts";
// import InventoryMod later if needed

export default function AdminInventory() {
  const [view, setView] = useState<"main" | "add" | "manage">("main");

  if (view === "add") return <InventoryAdd goBack={() => setView("main")} />;
  if (view === "manage") return <ManageProducts goBack={() => setView("main")} />;

  return (
    <div className="flex flex-col gap-4">
      <button
        onClick={() => setView("add")}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Add Product
      </button>
      <button
        onClick={() => setView("manage")}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Manage Products
      </button>
    </div>
  );
}
