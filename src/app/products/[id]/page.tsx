// app/products/[id]/page.tsx
"use client"; // Make this a client component to use hooks

import Link from "next/link";
import { Suspense, useEffect, useState } from "react"; // Import useEffect and useState
import { useCart } from "@/context/cartContext"; // Adjust path
import {
  ArrowLeftIcon,
  ShoppingCartIcon,
  StarIcon as StarSolidIcon,
} from "@heroicons/react/24/solid";
import { StarIcon as StarOutlineIcon } from "@heroicons/react/24/outline";

// Define a type for your product data
interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

async function getProductDetails(id: string): Promise<Product | null> {
  try {
    const res = await fetch(`https://fakestoreapi.com/products/${id}`);
    if (!res.ok) {
      if (res.status === 404) return null;
      throw new Error(`Failed to fetch product: ${res.statusText}`);
    }
    return res.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}

// Fetch related products (e.g., by category)
async function getRelatedProducts(
  category: string,
  currentProductId: number
): Promise<Product[]> {
  if (!category) return [];
  try {
    const res = await fetch(
      `https://fakestoreapi.com/products/category/${encodeURIComponent(
        category
      )}?limit=5`
    ); // Get 5 products
    if (!res.ok) {
      throw new Error("Failed to fetch related products");
    }
    const products: Product[] = await res.json();
    // Filter out the current product from related products and limit to 4
    return products.filter((p) => p.id !== currentProductId).slice(0, 4);
  } catch (error) {
    console.error(error);
    return [];
  }
}

// A simple loading component for product details
function ProductDetailsSkeleton() {
  // ... (Skeleton from previous response, keep it as is) ...
  return (
    <div className="container mx-auto px-4 py-12 md:py-20 animate-pulse">
      <div className="grid md:grid-cols-2 gap-12 items-start">
        <div className="bg-slate-700 rounded-lg aspect-square"></div>{" "}
        {/* Image Placeholder */}
        <div>
          <div className="h-10 bg-slate-700 rounded w-3/4 mb-4"></div>{" "}
          {/* Title Placeholder */}
          <div className="h-6 bg-slate-700 rounded w-1/4 mb-6"></div>{" "}
          {/* Category Placeholder */}
          <div className="h-12 bg-slate-700 rounded w-1/3 mb-6"></div>{" "}
          {/* Price Placeholder */}
          <div className="space-y-3">
            <div className="h-4 bg-slate-700 rounded"></div>
            <div className="h-4 bg-slate-700 rounded w-5/6"></div>
            <div className="h-4 bg-slate-700 rounded w-4/6"></div>
          </div>{" "}
          {/* Description Placeholder */}
          <div className="mt-8 h-12 bg-slate-700 rounded w-1/2"></div>{" "}
          {/* Button Placeholder */}
        </div>
      </div>
    </div>
  );
}

// Loading skeleton for related product cards
function RelatedProductCardSkeleton() {
  return (
    <div className="group bg-slate-800 rounded-xl overflow-hidden shadow-lg animate-pulse">
      <div className="relative aspect-[4/5] bg-slate-700"></div>
      <div className="p-5">
        <div className="h-5 bg-slate-700 rounded w-3/4 mb-2"></div>
        <div className="h-8 bg-slate-700 rounded w-1/2 mb-3"></div>
        <div className="h-10 bg-slate-700 rounded"></div>
      </div>
    </div>
  );
}

export default function ProductDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null | undefined>(undefined); // undefined for initial loading state
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRelatedLoading, setIsRelatedLoading] = useState(true);
  const [addedToCartMessage, setAddedToCartMessage] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      setIsLoading(true);
      const fetchedProduct = await getProductDetails(params.id);
      setProduct(fetchedProduct);
      setIsLoading(false);

      if (fetchedProduct) {
        setIsRelatedLoading(true);
        const fetchedRelated = await getRelatedProducts(
          fetchedProduct.category,
          fetchedProduct.id
        );
        setRelatedProducts(fetchedRelated);
        setIsRelatedLoading(false);
      } else {
        setIsRelatedLoading(false); // No product, so no related products to load
      }
    };
    fetchProduct();
  }, [params.id]);

  const handleAddToCart = () => {
    if (product) {
      const { id, title, price, image } = product; // Destructure only needed properties
      addToCart({ id, title, price, image });
      setAddedToCartMessage(true);
      setTimeout(() => setAddedToCartMessage(false), 2000); // Hide message after 2 seconds
    }
  };

  if (isLoading) {
    return <ProductDetailsSkeleton />;
  }

  if (product === null) {
    // Explicitly null means product not found
    // ... (Not Found JSX from previous response, keep it as is) ...
    return (
      <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center text-center p-8">
        <svg
          className="mx-auto h-16 w-16 text-rose-500 mb-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 4a2 2 0 100-4 2 2 0 000 4z"
          />
        </svg>
        <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-orange-500 mb-4">
          Product Not Found
        </h1>
        <p className="text-lg text-gray-400 mb-8">
          Sorry, we couldn't find the product you're looking for. It might have
          been removed or the link is incorrect.
        </p>
        <Link
          href="/products"
          className="bg-rose-500 hover:bg-rose-600 text-white font-bold py-3 px-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
        >
          Back to Products
        </Link>
      </div>
    );
  }

  if (!product) return null; // Should be covered by isLoading or null check, but as a fallback.

  const renderStars = (rate: number) => {
    const fullStars = Math.round(rate);
    const emptyStars = 5 - fullStars;
    return (
      <>
        {[...Array(fullStars)].map((_, i) => (
          <StarSolidIcon
            key={`full-${i}`}
            className="w-5 h-5 text-yellow-400"
          />
        ))}
        {[...Array(emptyStars)].map((_, i) => (
          <StarOutlineIcon
            key={`empty-${i}`}
            className="w-5 h-5 text-yellow-400"
          />
        ))}
      </>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-purple-900 text-white py-12 md:py-20">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <Link
            href="/products"
            className="text-teal-400 hover:text-teal-300 transition-colors duration-300 flex items-center group text-sm"
          >
            <ArrowLeftIcon className="h-5 w-5 mr-2 transform group-hover:-translate-x-1 transition-transform duration-300" />
            Back to Products
          </Link>
        </div>

        <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* Product Image Gallery */}
          <div className="relative group aspect-square rounded-xl shadow-2xl overflow-hidden bg-slate-800">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-full object-contain p-4 md:p-8 transition-transform duration-500 ease-in-out group-hover:scale-105"
            />
          </div>

          {/* Product Details */}
          <div className="py-4">
            <span className="text-sm font-medium text-rose-400 uppercase tracking-wider mb-2 block">
              {product.category}
            </span>
            <h1 className="text-3xl lg:text-5xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-sky-300 via-fuchsia-400 to-rose-400">
              {product.title}
            </h1>

            <div className="flex items-center mb-6">
              <div className="flex items-center">
                {renderStars(product.rating.rate)}
              </div>
              <span className="ml-3 text-sm text-gray-400">
                ({product.rating.count} reviews)
              </span>
            </div>

            <p className="text-3xl font-bold text-sky-400 mb-6">
              ${product.price.toFixed(2)}
            </p>

            <div className="prose prose-invert prose-sm md:prose-base max-w-none text-gray-300 mb-8 leading-relaxed">
              <p>{product.description}</p>
            </div>

            {/* Size/Color Selectors (Placeholder) */}
            {/* ... (Keep your existing size/color selectors) ... */}

            <button
              onClick={handleAddToCart}
              className="w-full md:w-auto bg-rose-500 hover:bg-rose-600 text-white font-bold py-4 px-10 rounded-lg text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 ease-in-out flex items-center justify-center gap-2"
            >
              <ShoppingCartIcon className="h-6 w-6" />
              Add to Cart
            </button>
            {addedToCartMessage && (
              <p className="text-green-400 mt-3 text-sm">✓ Added to cart!</p>
            )}
          </div>
        </div>

        {/* Related Products Section */}
        <section className="mt-16 md:mt-24 pt-12 border-t border-slate-700">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-10 text-transparent bg-clip-text bg-gradient-to-r from-lime-400 via-green-500 to-emerald-500">
            🌿 You Might Also Like 🌿
          </h2>
          {isRelatedLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[...Array(4)].map((_, i) => (
                <RelatedProductCardSkeleton key={i} />
              ))}
            </div>
          ) : relatedProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
              {relatedProducts.map((relatedProd: Product) => (
                <Link
                  href={`/products/${relatedProd.id}`}
                  key={relatedProd.id}
                  className="group bg-slate-800 rounded-xl overflow-hidden shadow-xl hover:shadow-green-500/30 transition-all duration-300 transform hover:-translate-y-1.5 flex flex-col"
                >
                  <div className="relative w-full aspect-[4/5] overflow-hidden">
                    <img
                      src={relatedProd.image}
                      alt={relatedProd.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-in-out"
                    />
                  </div>
                  <div className="p-5 flex flex-col flex-grow">
                    <h3 className="text-sm font-semibold mb-2 truncate text-gray-100 group-hover:text-green-400 transition-colors duration-300 flex-grow">
                      {relatedProd.title}
                    </h3>
                    <div className="mt-auto">
                      <p className="text-lg font-bold text-sky-400">
                        ${relatedProd.price.toFixed(2)}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500">
              No related products found.
            </p>
          )}
        </section>
      </div>
    </div>
  );
}

// Removed generateStaticParams for simplicity with client-side fetching,
// or you can adapt it if you need SSG for the main product and CSR for related.
