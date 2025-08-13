// app/cart/page.tsx
"use client";

import { useCart } from "@/context/cartContext"; // Adjust path
import Link from "next/link";
import Image from "next/image"; // Using Next/Image for optimization
import { TrashIcon, PlusIcon, MinusIcon } from "@heroicons/react/24/outline";

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal, clearCart } =
    useCart();

  if (cartItems.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-8 text-white bg-slate-900">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-24 h-24 text-slate-500 mb-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
          />
        </svg>
        <h1 className="text-3xl font-semibold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-teal-500">
          Your Cart is Empty
        </h1>
        <p className="text-gray-400 mb-8">
          Looks like you haven't added anything to your cart yet.
        </p>
        <Link
          href="/products"
          className="bg-rose-500 hover:bg-rose-600 text-white font-bold py-3 px-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-purple-900 text-white py-12 md:py-20">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl md:text-4xl font-extrabold mb-10 text-center text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-cyan-500 to-sky-500">
          Your Shopping Cart 🛒
        </h1>

        <div className="bg-slate-800 shadow-2xl rounded-xl p-6 md:p-8">
          {/* Cart Items */}
          <div className="space-y-6 mb-8">
            {cartItems.map((item: any) => (
              <div
                key={item.id}
                className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 border border-slate-700 rounded-lg hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center gap-4 w-full md:w-auto">
                  <div className="w-20 h-20 md:w-24 md:h-24 rounded-md overflow-hidden bg-slate-700">
                    <Image
                      src={item.image}
                      alt={item.title}
                      width={100}
                      height={100}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div>
                    <h3 className="text-md md:text-lg font-semibold text-gray-100 hover:text-teal-400 transition-colors">
                      <Link href={`/products/${item.id}`}>{item.title}</Link>
                    </h3>
                    <p className="text-sm text-gray-400">
                      Price: ${item.price.toFixed(2)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 md:gap-4">
                  <div className="flex items-center border border-slate-600 rounded-md">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="p-2 text-gray-300 hover:bg-slate-700 rounded-l-md transition-colors"
                      aria-label="Decrease quantity"
                    >
                      <MinusIcon className="w-5 h-5" />
                    </button>
                    <span className="px-3 py-1.5 text-sm font-medium w-10 text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-2 text-gray-300 hover:bg-slate-700 rounded-r-md transition-colors"
                      aria-label="Increase quantity"
                    >
                      <PlusIcon className="w-5 h-5" />
                    </button>
                  </div>
                  <p className="text-md font-semibold text-sky-400 w-20 text-right">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-rose-500 hover:text-rose-400 p-2 rounded-md hover:bg-rose-500/10 transition-all"
                    aria-label="Remove item"
                  >
                    <TrashIcon className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Cart Summary & Actions */}
          <div className="border-t border-slate-700 pt-8">
            <div className="flex justify-between items-center mb-4">
              <p className="text-xl font-semibold text-gray-200">Subtotal:</p>
              <p className="text-2xl font-bold text-sky-400">
                ${getCartTotal().toFixed(2)}
              </p>
            </div>
            <p className="text-sm text-gray-400 text-right mb-6">
              Shipping & taxes calculated at checkout.
            </p>

            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <button
                onClick={clearCart}
                className="text-gray-400 hover:text-white border border-slate-600 hover:border-rose-500 hover:bg-rose-500/20 py-2.5 px-6 rounded-lg transition-all duration-300 text-sm w-full md:w-auto"
              >
                Clear Cart
              </button>
              <Link
                href="/checkout"
                className="w-full md:w-auto bg-rose-500 hover:bg-rose-600 text-white font-bold py-3 px-10 rounded-lg text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 ease-in-out text-center"
              >
                Proceed to Checkout
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
