// app/(components)/Footer.tsx
import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-gray-400 py-12 md:py-16 border-t border-slate-800">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              GlamourGrove
            </h3>
            <p className="text-sm">
              Discover your style with our curated collections of
              fashion-forward apparel and accessories.
            </p>
            {/* Social Media Icons Placeholder */}
            <div className="flex space-x-4 mt-4">
              <a
                href="#"
                aria-label="Facebook"
                className="hover:text-rose-400 transition-colors"
              >
                FB
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="hover:text-rose-400 transition-colors"
              >
                IG
              </a>
              <a
                href="#"
                aria-label="Twitter"
                className="hover:text-rose-400 transition-colors"
              >
                TW
              </a>
            </div>
          </div>
          <div>
            <h4 className="text-md font-semibold text-white mb-4">Shop</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/products"
                  className="hover:text-rose-400 transition-colors"
                >
                  All Products
                </Link>
              </li>
              <li>
                <Link
                  href="/products?category=men"
                  className="hover:text-rose-400 transition-colors"
                >
                  Men's Collection
                </Link>
              </li>
              <li>
                <Link
                  href="/products?category=women"
                  className="hover:text-rose-400 transition-colors"
                >
                  Women's Collection
                </Link>
              </li>
              <li>
                <Link
                  href="/sale"
                  className="hover:text-rose-400 transition-colors"
                >
                  Sale
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-md font-semibold text-white mb-4">
              Customer Service
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/contact"
                  className="hover:text-rose-400 transition-colors"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="hover:text-rose-400 transition-colors"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="/shipping"
                  className="hover:text-rose-400 transition-colors"
                >
                  Shipping & Returns
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="hover:text-rose-400 transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-md font-semibold text-white mb-4">
              Newsletter
            </h4>
            <p className="text-sm mb-3">
              Stay updated with our latest arrivals and offers.
            </p>
            <form className="flex">
              <input
                type="email"
                placeholder="your.email@example.com"
                className="w-full p-2 rounded-l-md bg-slate-800 border border-slate-700 focus:ring-1 focus:ring-rose-500 outline-none text-sm text-white"
              />
              <button
                type="submit"
                className="bg-rose-500 hover:bg-rose-600 text-white font-semibold p-2 rounded-r-md text-sm transition-colors"
              >
                Sign Up
              </button>
            </form>
          </div>
        </div>
        <div className="border-t border-slate-700 pt-8 text-center text-sm">
          <p>
            &copy; {currentYear} GlamourGrove. All Rights Reserved. Designed
            with 💖.
          </p>
        </div>
      </div>
    </footer>
  );
}
