// app/components/Nav.tsx

"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

// --- ICONS (No changes here) ---
const CartIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${className}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.658-.463 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" /></svg>
);
const PhoneIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" /></svg>
);
const MessageIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z" clipRule="evenodd" /></svg>
);

const Nav: React.FC = () => {
  // Mobile menu state is still needed
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Removed isScrolled state and useEffect hook

  const phoneNumberHref = "+15551234567";
  const prefilledMessage =
    "Hi Lolla! I'm interested in an item from your store.";

  // Removed linkColor and iconColor variables

  return (
    // --- FIX: Header is now always solid white with a bottom border ---
    <header className="fixed top-0 left-0 right-0 z-50 h-20 bg-white border-b border-gray-200">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex h-full items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 transition-opacity duration-300 hover:opacity-80"
          >
            <Image
              src="/images/logo.png"
              alt="Lolla's Store Logo"
              width={80}
              height={80}
              priority
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-10">
            <a
              href={`sms:${phoneNumberHref}?&body=${encodeURIComponent(
                prefilledMessage
              )}`}
              // --- FIX: Static dark text color ---
              className="font-sans text-sm font-medium tracking-wide text-gray-700 hover:text-black"
            >
              Text Us
            </a>
            <a
              href={`tel:${phoneNumberHref}`}
               // --- FIX: Static dark text color ---
              className="font-sans text-sm font-medium tracking-wide text-gray-700 hover:text-black"
            >
              Call Us
            </a>
            <a
              href="/cart"
              aria-label="Shopping Cart"
               // --- FIX: Static dark icon color ---
              className="transition-colors duration-300 text-gray-600 hover:text-black"
            >
              <CartIcon />
            </a>
          </nav>

          {/* Mobile Nav */}
          <div className="flex items-center gap-4 md:hidden">
            <a href="/cart" aria-label="Shopping Cart" className="text-gray-600">
              <CartIcon />
            </a>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="rounded-lg bg-[#d1b49f] px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white shadow-sm transition-transform hover:scale-105"
            >
              Contact
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu (logic remains the same) */}
      {isMobileMenuOpen && (
        <div
          className="absolute top-20 left-0 w-full bg-white shadow-lg border-t md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <div className="flex flex-col divide-y">
            <a
              href={`tel:${phoneNumberHref}`}
              className="flex items-center gap-3 px-6 py-3 text-base font-medium text-gray-700 hover:bg-gray-50"
            >
              <PhoneIcon /> Call Us
            </a>
            <a
              href={`sms:${phoneNumberHref}?&body=${encodeURIComponent(
                prefilledMessage
              )}`}
              className="flex items-center gap-3 px-6 py-3 text-base font-medium text-gray-700 hover:bg-gray-50"
            >
              <MessageIcon /> Text Us
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Nav;