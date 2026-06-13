"use client";

import { useCart } from "@/lib/cartContext";
import Link from "next/link";
import { useState } from "react";

export default function CartPage() {
  const { items, removeItem, total } = useCart();
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState({
    name: "",
    street: "",
    city: "",
    province: "",
    postalCode: "",
    phone: "",
  });

  const handleCheckout = async () => {
    setLoading(true);
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items, shippingAddress: address }),
    });

    const data = await res.json();

    if (data.url) {
      window.location.href = data.url;
    } else {
      alert("Something went wrong");
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="w-full">
        <div className="w-full bg-[#f5ede6] py-12 text-center">
          <h1
            className="text-4xl font-bold text-[#1a1a1a]"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Your Cart
          </h1>
        </div>
        <div className="max-w-3xl mx-auto px-6 py-24 text-center">
          <p className="text-[#8c7b6e] mb-8">Your cart is empty</p>
          <Link
            href="/shop"
            className="inline-block border border-[#1a1a1a] text-[#1a1a1a] px-8 py-3 text-xs tracking-widest uppercase hover:bg-[#1a1a1a] hover:text-white transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Page Header */}
      <div className="w-full bg-[#f5ede6] py-12 text-center">
        <h1
          className="text-4xl font-bold text-[#1a1a1a]"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Your Cart
        </h1>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Cart Items */}
        <div className="border border-[#f0e6dc] rounded-lg overflow-hidden mb-8">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between px-6 py-4 border-b border-[#f0e6dc] last:border-0 bg-white"
            >
              <div>
                <p className="font-medium text-[#1a1a1a] text-sm">{item.name}</p>
                <p className="text-xs text-[#8c7b6e] mt-1">Qty: {item.quantity}</p>
              </div>
              <div className="flex items-center gap-6">
                <p className="font-semibold text-[#1a1a1a] text-sm">
                  R{(item.price * item.quantity).toFixed(2)}
                </p>
                <button
                  onClick={() => removeItem(item.id)}
                  className="text-xs text-[#8c7b6e] hover:text-red-500 uppercase tracking-widest transition-colors"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Total */}
        <div className="flex items-center justify-between mb-8 py-4 border-t border-b border-[#f0e6dc]">
          <p className="text-sm uppercase tracking-widest text-[#1a1a1a] font-semibold">Total</p>
          <p className="text-xl font-bold text-[#1a1a1a]">R{total.toFixed(2)}</p>
        </div>

        {/* Shipping Address */}
        <div className="bg-white border border-[#f0e6dc] rounded-lg p-6 mb-8">
          <h2
            className="text-lg font-bold text-[#1a1a1a] mb-6"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Shipping Address
          </h2>
          <div className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Full Name"
              value={address.name}
              onChange={(e) => setAddress({ ...address, name: e.target.value })}
              className="w-full border border-[#f0e6dc] px-3 py-2 text-sm focus:outline-none focus:border-[#8c7b6e] bg-[#fffaf6]"
            />
            <input
              type="text"
              placeholder="Street Address"
              value={address.street}
              onChange={(e) => setAddress({ ...address, street: e.target.value })}
              className="w-full border border-[#f0e6dc] px-3 py-2 text-sm focus:outline-none focus:border-[#8c7b6e] bg-[#fffaf6]"
            />
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="City"
                value={address.city}
                onChange={(e) => setAddress({ ...address, city: e.target.value })}
                className="w-full border border-[#f0e6dc] px-3 py-2 text-sm focus:outline-none focus:border-[#8c7b6e] bg-[#fffaf6]"
              />
              <input
                type="text"
                placeholder="Province"
                value={address.province}
                onChange={(e) => setAddress({ ...address, province: e.target.value })}
                className="w-full border border-[#f0e6dc] px-3 py-2 text-sm focus:outline-none focus:border-[#8c7b6e] bg-[#fffaf6]"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Postal Code"
                value={address.postalCode}
                onChange={(e) => setAddress({ ...address, postalCode: e.target.value })}
                className="w-full border border-[#f0e6dc] px-3 py-2 text-sm focus:outline-none focus:border-[#8c7b6e] bg-[#fffaf6]"
              />
              <input
                type="text"
                placeholder="Phone Number"
                value={address.phone}
                onChange={(e) => setAddress({ ...address, phone: e.target.value })}
                className="w-full border border-[#f0e6dc] px-3 py-2 text-sm focus:outline-none focus:border-[#8c7b6e] bg-[#fffaf6]"
              />
            </div>
          </div>
        </div>

        <button
          onClick={handleCheckout}
          disabled={loading}
          className="w-full bg-[#1a1a1a] text-white py-4 text-xs tracking-widest uppercase hover:bg-[#8c7b6e] transition-colors disabled:opacity-50"
        >
          {loading ? "Redirecting to checkout..." : "Proceed to Checkout"}
        </button>
      </div>
    </div>
  );
}