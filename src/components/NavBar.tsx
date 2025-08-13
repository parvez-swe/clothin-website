// app/(components)/Navbar.tsx
"use client";

import Link from "next/link";
// import { useCart } from "@/context/CartContext"; // Adjust path as needed
import {
  ShoppingBagIcon,
  UserCircleIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline"; // Using Heroicons
import { useCart } from "@/context/cartContext";
// import { useCart } from "@/context/";

export default function NavBar() {
  const { getItemCount } = useCart();
  const itemCount = getItemCount();

  return (
    <nav className="sticky top-0 z-50 bg-slate-900 bg-opacity-80 backdrop-blur-md shadow-lg text-white">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link
          href="/"
          className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500 hover:opacity-80 transition-opacity"
        >
          GlamourGrove
        </Link>

        <div className="hidden md:flex items-center space-x-6 text-sm font-medium">
          <Link href="/" className="hover:text-rose-400 transition-colors">
            Home
          </Link>
          <Link
            href="/products"
            className="hover:text-rose-400 transition-colors"
          >
            All Products
          </Link>
          {/* Add more links like 'Men', 'Women', 'Sale' as needed */}
          <Link
            href="/#collections"
            className="hover:text-rose-400 transition-colors"
          >
            Collections
          </Link>{" "}
          {/* Example link to a section on homepage */}
          <Link
            href="/contact"
            className="hover:text-rose-400 transition-colors"
          >
            Contact
          </Link>
        </div>

        <div className="flex items-center space-x-4 md:space-x-6">
          <button
            aria-label="Search"
            className="hover:text-rose-400 transition-colors p-2"
          >
            <MagnifyingGlassIcon className="h-6 w-6" />
          </button>
          <Link
            href="/cart"
            className="relative hover:text-rose-400 transition-colors p-2"
            aria-label="Shopping Cart"
          >
            <ShoppingBagIcon className="h-6 w-6" />
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </Link>
          <button
            aria-label="User Account"
            className="hover:text-rose-400 transition-colors p-2"
          >
            <UserCircleIcon className="h-6 w-6" />
          </button>
          {/* Mobile Menu Button (optional, add functionality if needed) */}
          <button
            className="md:hidden hover:text-rose-400 transition-colors p-2"
            aria-label="Open menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
}
