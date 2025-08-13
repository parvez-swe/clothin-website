// app/checkout/page.tsx
"use client";

import { useCart } from "@/context/cartContext"; // Adjust path
import Link from "next/link";
import { useEffect, useState } from "react";
import { CheckCircleIcon } from "@heroicons/react/24/solid";

export default function CheckoutPage() {
  const { getCartTotal, cartItems, clearCart } = useCart();
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);

  const total = getCartTotal();

  // Simulate placing order
  const handlePlaceOrder = () => {
    // In a real app, you would send cartItems and total to a backend API
    // and handle payment processing.
    console.log("Order Placed:", { items: cartItems, total });
    setIsOrderPlaced(true);
    clearCart(); // Clear cart after "placing order"
  };

  // If order is placed, show confirmation
  if (isOrderPlaced) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center p-8 text-white bg-gradient-to-br from-green-800 via-emerald-700 to-teal-800">
        <CheckCircleIcon className="w-24 h-24 text-lime-400 mb-6" />
        <h1 className="text-4xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-lime-300 to-emerald-300">
          Order Placed Successfully!
        </h1>
        <p className="text-lg text-gray-200 mb-8 max-w-md">
          Thank you for your purchase. Your order is being processed and you'll
          receive a confirmation email shortly.
        </p>
        <Link
          href="/"
          className="bg-lime-500 hover:bg-lime-600 text-white font-bold py-3 px-8 rounded-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  // If cart is empty and order not yet placed, redirect or show message
  if (cartItems.length === 0 && !isOrderPlaced) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center p-8 text-white bg-slate-900">
        <h1 className="text-3xl font-semibold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-orange-500">
          Your cart is empty.
        </h1>
        <p className="text-gray-400 mb-8">
          Please add items to your cart before proceeding to checkout.
        </p>
        <Link
          href="/products"
          className="bg-rose-500 hover:bg-rose-600 text-white font-bold py-3 px-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
        >
          Shop Products
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-purple-900 text-white py-12 md:py-20">
      <div className="container mx-auto px-4 max-w-3xl">
        <h1 className="text-3xl md:text-4xl font-extrabold mb-10 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-rose-500">
          Checkout 🛍️
        </h1>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Order Summary */}
          <div className="bg-slate-800 shadow-xl rounded-xl p-6 md:p-8 order-last md:order-first">
            <h2 className="text-2xl font-semibold mb-6 text-gray-100 border-b border-slate-700 pb-3">
              Order Summary
            </h2>
            <div className="space-y-3 mb-6">
              {cartItems.map((item: any) => (
                <div
                  key={item.id}
                  className="flex justify-between items-start text-sm"
                >
                  <div className="flex-grow">
                    <p className="text-gray-200">
                      {item.title}{" "}
                      <span className="text-gray-400">x {item.quantity}</span>
                    </p>
                  </div>
                  <p className="text-gray-300 min-w-[60px] text-right">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
            <div className="border-t border-slate-700 pt-4 space-y-2">
              <div className="flex justify-between text-md">
                <p className="text-gray-300">Subtotal:</p>
                <p className="text-gray-200">${total.toFixed(2)}</p>
              </div>
              <div className="flex justify-between text-md">
                <p className="text-gray-300">Shipping:</p>
                <p className="text-gray-200">FREE</p> {/* Placeholder */}
              </div>
              <div className="flex justify-between text-xl font-bold mt-3 border-t border-slate-600 pt-3">
                <p className="text-sky-300">Total:</p>
                <p className="text-sky-300">${total.toFixed(2)}</p>
              </div>
            </div>
          </div>

          {/* Shipping & Payment Form (Placeholder) */}
          <div className="bg-slate-800 shadow-xl rounded-xl p-6 md:p-8">
            <h2 className="text-2xl font-semibold mb-6 text-gray-100 border-b border-slate-700 pb-3">
              Shipping & Payment
            </h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handlePlaceOrder();
              }}
            >
              <div className="space-y-5">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-300 mb-1"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    required
                    className="w-full p-3 rounded-md bg-slate-700 border border-slate-600 focus:ring-1 focus:ring-rose-500 outline-none text-sm text-white placeholder-gray-500"
                    placeholder="you@example.com"
                  />
                </div>
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-300 mb-1"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    required
                    className="w-full p-3 rounded-md bg-slate-700 border border-slate-600 focus:ring-1 focus:ring-rose-500 outline-none text-sm text-white placeholder-gray-500"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label
                    htmlFor="address"
                    className="block text-sm font-medium text-gray-300 mb-1"
                  >
                    Shipping Address
                  </label>
                  <textarea
                    name="address"
                    id="address"
                    rows={3}
                    required
                    className="w-full p-3 rounded-md bg-slate-700 border border-slate-600 focus:ring-1 focus:ring-rose-500 outline-none text-sm text-white placeholder-gray-500"
                    placeholder="123 Main St, Anytown, USA"
                  ></textarea>
                </div>

                {/* Simplified Payment Info Placeholder */}
                <div className="border-t border-slate-700 pt-5">
                  <h3 className="text-lg font-medium text-gray-200 mb-3">
                    Payment Details (Demo)
                  </h3>
                  <p className="text-xs text-gray-400 mb-3">
                    This is a demo. Do not enter real card details.
                  </p>
                  <div>
                    <label
                      htmlFor="card-number"
                      className="block text-sm font-medium text-gray-300 mb-1"
                    >
                      Card Number
                    </label>
                    <input
                      type="text"
                      name="card-number"
                      id="card-number"
                      className="w-full p-3 rounded-md bg-slate-700 border border-slate-600 focus:ring-1 focus:ring-rose-500 outline-none text-sm text-white placeholder-gray-500"
                      placeholder="•••• •••• •••• 1234"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-rose-500 hover:bg-rose-600 text-white font-bold py-3.5 px-6 rounded-lg text-lg shadow-lg hover:shadow-xl transform hover:scale-102 transition-all duration-300 ease-in-out"
                >
                  Place Order (${total.toFixed(2)})
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
