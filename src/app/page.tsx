// app/page.tsx
import Link from "next/link";

// Placeholder for a dynamic component fetching featured products from an API
async function getFeaturedProducts() {
  try {
    const res = await fetch("https://fakestoreapi.com/products?limit=4"); // Fetching 4 products as an example
    if (!res.ok) {
      throw new Error("Failed to fetch products");
    }
    return res.json();
  } catch (error) {
    console.error(error);
    return []; // Return empty array on error
  }
}

export default async function HomePage() {
  const featuredProducts = await getFeaturedProducts();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center text-center overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute z-0 w-auto min-w-full min-h-full max-w-none opacity-30"
        >
          {/* Replace with your own video or a high-quality stock video */}
          <source src="/videos/hero-background.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="relative z-10 p-8">
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 drop-shadow-lg animate-fadeInUp">
            Style Redefined.
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-300 drop-shadow-md animate-fadeInUp animation-delay-300">
            Discover the latest trends and timeless classics.
          </p>
          <Link
            href="/products"
            className="bg-rose-500 hover:bg-rose-600 text-white font-bold py-4 px-10 rounded-lg text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 ease-in-out animate-fadeInUp animation-delay-600"
          >
            Shop Now
          </Link>
        </div>
      </section>

      {/* Collections Teaser */}
      <section className="py-16 md:py-24 bg-opacity-20 bg-black">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500">
            Explore Our Collections
          </h2>
          <p className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto">
            From casual wear to elegant evening attire, find your perfect look.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Example Collection Cards - Replace with Link components to actual category pages */}
            <div className="group relative rounded-xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-300">
              <img
                src="https://images.unsplash.com/photo-1523381294911-8d3cead13475?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2xvdGhpbmd8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60"
                alt="Men's Collection"
                className="w-full h-80 object-cover group-hover:opacity-80 transition-opacity duration-300"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <h3 className="text-2xl font-semibold text-white">Men's</h3>
              </div>
            </div>
            <div className="group relative rounded-xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-300">
              <img
                src="https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Y2xvdGhpbmd8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60"
                alt="Women's Collection"
                className="w-full h-80 object-cover group-hover:opacity-80 transition-opacity duration-300"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <h3 className="text-2xl font-semibold text-white">Women's</h3>
              </div>
            </div>
            <div className="group relative rounded-xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-300">
              <img
                src="https://images.unsplash.com/photo-1556905055-8f358a7a47b2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGNsb3RoaW5nfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60"
                alt="Accessories"
                className="w-full h-80 object-cover group-hover:opacity-80 transition-opacity duration-300"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <h3 className="text-2xl font-semibold text-white">
                  Accessories
                </h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-rose-400 to-lime-400">
            ✨ Hot Right Now ✨
          </h2>
          {featuredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {featuredProducts.map((product: any) => (
                <Link
                  href={`/products/${product.id}`}
                  key={product.id}
                  className="group block bg-slate-800 rounded-xl overflow-hidden shadow-xl hover:shadow-fuchsia-500/30 transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="relative aspect-square overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-in-out"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity duration-300"></div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-semibold mb-2 truncate text-gray-100 group-hover:text-rose-400 transition-colors duration-300">
                      {product.title}
                    </h3>
                    <p className="text-2xl font-bold text-sky-400 mb-3">
                      ${product.price.toFixed(2)}
                    </p>
                    <button className="w-full bg-rose-500 hover:bg-rose-600 text-white font-semibold py-2 px-4 rounded-md transition-colors duration-300 transform group-hover:scale-105 group-hover:shadow-lg">
                      View Details
                    </button>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-400">
              Loading featured products or none available...
            </p>
          )}
          <div className="text-center mt-16">
            <Link
              href="/products"
              className="bg-transparent hover:bg-purple-500 text-purple-400 font-semibold hover:text-white py-3 px-8 border border-purple-400 hover:border-transparent rounded-lg transition-all duration-300"
            >
              Shop All Products
            </Link>
          </div>
        </div>
      </section>

      {/* Call to Action / Newsletter */}
      <section className="py-16 md:py-24 bg-opacity-30 bg-black">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-500 to-red-500">
            Stay In The Loop!
          </h2>
          <p className="text-lg text-gray-400 mb-8 max-w-xl mx-auto">
            Subscribe to our newsletter for exclusive deals, new arrivals, and
            style tips.
          </p>
          <form className="max-w-md mx-auto flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              placeholder="your.email@example.com"
              className="flex-grow p-4 rounded-lg bg-slate-800 border border-slate-700 focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none transition-all duration-300 text-white placeholder-gray-500"
              required
            />
            <button
              type="submit"
              className="bg-rose-500 hover:bg-rose-600 text-white font-bold py-4 px-8 rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}

// Add some basic CSS for animations in globals.css or a style tag if preferred:
/*
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.animate-fadeInUp {
  animation: fadeInUp 0.8s ease-out forwards;
}
.animation-delay-300 { animation-delay: 0.3s; }
.animation-delay-600 { animation-delay: 0.6s; }
*/
