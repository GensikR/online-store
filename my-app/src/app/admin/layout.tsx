"use client";

import React from "react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* You can add an admin nav here if you want */}
      <main className="flex-grow p-6">{children}</main>
    </div>
  );
}
