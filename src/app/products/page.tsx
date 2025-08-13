// app/products/page.tsx
import Link from "next/link";

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

async function getAllProducts(): Promise<Product[]> {
  try {
    const res = await fetch("https://fakestoreapi.com/products"); // Fetch all products
    if (!res.ok) {
      throw new Error("Failed to fetch products");
    }
    return res.json();
  } catch (error) {
    console.error(error);
    return []; // Return empty array on error
  }
}

export default async function ProductsPage() {
  const products = await getAllProducts();

  return (
    <div className="min-h-screen bg-slate-900 text-white py-12 md:py-20">
      <div className="container mx-auto px-6">
        <header className="mb-12 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-500 to-emerald-500">
            Our Collection
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Browse through our curated selection of the finest apparel and
            accessories.
          </p>
        </header>

        {/* Placeholder for Filters/Sorting - you'd build these as interactive components */}
        <div className="mb-10 p-6 bg-slate-800 rounded-lg shadow-md flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-gray-300">
            Filters: (Category, Price Range, etc.) - Coming Soon!
          </div>
          <div className="flex items-center gap-2">
            <label htmlFor="sort" className="text-gray-300">
              Sort by:
            </label>
            <select
              id="sort"
              className="bg-slate-700 text-white p-2 rounded-md focus:ring-2 focus:ring-teal-500 outline-none"
            >
              <option value="featured">Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="newest">Newest Arrivals</option>
            </select>
          </div>
        </div>

        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
            {products.map((product: Product) => (
              <Link
                href={`/products/${product.id}`}
                key={product.id}
                className="group bg-slate-800 rounded-xl overflow-hidden shadow-2xl hover:shadow-teal-500/40 transition-all duration-300 transform hover:-translate-y-2 flex flex-col"
              >
                <div className="relative w-full aspect-[4/5] overflow-hidden">
                  {" "}
                  {/* Aspect ratio for clothing */}
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-in-out"
                  />
                  <div className="absolute top-0 right-0 m-3 bg-rose-500 text-white text-xs font-semibold px-3 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse">
                    New
                  </div>
                </div>
                <div className="p-5 flex flex-col flex-grow">
                  <h3 className="text-md font-semibold mb-2 truncate text-gray-100 group-hover:text-teal-400 transition-colors duration-300 flex-grow">
                    {product.title}
                  </h3>
                  <div className="flex justify-between items-center mt-auto">
                    <p className="text-xl font-bold text-sky-400">
                      ${product.price.toFixed(2)}
                    </p>
                    {/* Basic Rating Display */}
                    <div className="flex items-center">
                      {[...Array(Math.round(product.rating.rate))].map(
                        (_, i) => (
                          <svg
                            key={i}
                            className="w-4 h-4 text-yellow-400 fill-current"
                            viewBox="0 0 20 20"
                          >
                            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 .5l2.939 5.455 6.572.955-4.756 4.635 1.123 6.545z" />
                          </svg>
                        )
                      )}
                      <span className="ml-1 text-xs text-gray-400">
                        ({product.rating.count})
                      </span>
                    </div>
                  </div>
                  <button className="mt-4 w-full bg-teal-500 hover:bg-teal-600 text-white font-semibold py-2.5 px-4 rounded-md transition-colors duration-300 transform group-hover:scale-105 group-hover:shadow-lg text-sm">
                    Quick View
                  </button>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <svg
              className="mx-auto h-12 w-12 text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                vectorEffect="non-scaling-stroke"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h3 className="mt-2 text-xl font-medium text-gray-300">
              No products found
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              We couldn't find any products matching your criteria or our store
              is currently empty. Please check back later!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
