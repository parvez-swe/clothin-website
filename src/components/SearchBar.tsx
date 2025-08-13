"use client"; // This component might need client-side interactivity

import { useState } from "react";
import { useRouter } from "next/navigation"; // For Next.js 13+ App Router

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Construct search URL with query parameters
    const params = new URLSearchParams();
    if (query) params.append("q", query);
    if (location) params.append("location", location);
    if (priceRange) params.append("price", priceRange);

    router.push(`/buy?${params.toString()}`); // Example: direct to buy page with search params
  };

  return (
    <form
      onSubmit={handleSearch}
      className="flex items-center border border-gray-300 rounded-full px-4 py-2 focus-within:ring-2 focus-within:ring-blue-300"
    >
      <input
        type="text"
        placeholder="Property type, location..."
        className="outline-none bg-transparent flex-grow text-gray-700"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {/* You can add more specific filters here, e.g., dropdowns for location/price */}
      <button type="submit" className="ml-2 text-blue-600 hover:text-blue-800">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </button>
    </form>
  );
};

export default SearchBar;
