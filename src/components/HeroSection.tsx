"use client"; // This component might need client-side interactivity if search is complex

import { useState } from "react";
import { useRouter } from "next/navigation"; // For Next.js 13+ App Router
import Image from "next/image";
import Link from "next/link";

const HeroSection = () => {
  const [propertyType, setPropertyType] = useState("");
  const [location, setLocation] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const router = useRouter();

  const handleHeroSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (propertyType) params.append("type", propertyType);
    if (location) params.append("location", location);
    if (priceRange) params.append("price", priceRange);

    router.push(`/buy?${params.toString()}`); // Example: direct to buy page with search params
  };

  return (
    <section className="relative h-[70vh] flex items-center justify-center text-white overflow-hidden">
      <Image
        src="/hero-bg.jpg" // Replace with a high-quality hero background image
        alt="Beautiful home exterior"
        layout="fill"
        objectFit="cover"
        quality={90}
        className="z-0"
      />
      <div className="absolute inset-0 bg-black opacity-50 z-10"></div>{" "}
      {/* Overlay */}
      <div className="relative z-20 text-center p-6">
        <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6 animate-fade-in-up">
          Find Your Dream Home
        </h1>
        <p className="text-xl md:text-2xl mb-10 max-w-2xl mx-auto animate-fade-in-up delay-200">
          Your Trusted Partner in Real Estate. Explore properties, sell with
          ease, and find expert advice.
        </p>

        {/* Prominent Search Bar */}
        <form
          onSubmit={handleHeroSearch}
          className="bg-white p-6 rounded-lg shadow-xl inline-flex flex-wrap gap-4 max-w-4xl animate-fade-in-up delay-400"
        >
          <select
            className="p-3 border border-gray-300 rounded-md text-gray-700 focus:ring-blue-500 focus:border-blue-500"
            value={propertyType}
            onChange={(e) => setPropertyType(e.target.value)}
          >
            <option value="">Property Type</option>
            <option value="apartment">Apartment</option>
            <option value="house">House</option>
            <option value="land">Land</option>
            <option value="commercial">Commercial</option>
          </select>
          <input
            type="text"
            placeholder="Location (e.g., Dhaka, Gulshan)"
            className="p-3 border border-gray-300 rounded-md text-gray-700 focus:ring-blue-500 focus:border-blue-500"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <select
            className="p-3 border border-gray-300 rounded-md text-gray-700 focus:ring-blue-500 focus:border-blue-500"
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
          >
            <option value="">Price Range</option>
            <option value="0-100k">0 - $100,000</option>
            <option value="100k-300k">$100,000 - $300,000</option>
            <option value="300k-500k">$300,000 - $500,000</option>
            <option value="500k+">$500,000+</option>
          </select>
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-md text-lg font-semibold transition-colors duration-200"
          >
            Search Properties
          </button>
        </form>

        {/* Call to Action (Browse Properties) */}
        <div className="mt-8 animate-fade-in-up delay-600">
          <Link
            href="/buy"
            className="inline-block bg-white text-blue-600 px-8 py-3 rounded-md text-lg font-semibold shadow-lg hover:bg-gray-100 transition-colors duration-200"
          >
            Browse All Properties
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
