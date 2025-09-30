"use client";

import { useState } from "react";
import AdminInventory from "./AdminInventory";

export default function AdminDash() {
  const [showInventory, setShowInventory] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
      <div className="max-w-4xl w-full bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center gap-6">
        <h1 className="text-4xl font-extrabold text-gray-800 text-center">
          Admin Dashboard
        </h1>
        {!showInventory ? (
          <>
            <p className="text-gray-600 text-center">
              Welcome back! Use the buttons below to manage your store inventory.
            </p>
            <button
              onClick={() => setShowInventory(true)}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg shadow-lg hover:bg-blue-700 transition-all text-lg font-semibold"
            >
              Manage Inventory
            </button>
          </>
        ) : (
          <div className="w-full">
            <AdminInventory />
            <button
              onClick={() => setShowInventory(false)}
              className="mt-6 bg-gray-600 text-white px-6 py-2 rounded-lg shadow hover:bg-gray-700 transition-all"
            >
              Back to Dashboard
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
