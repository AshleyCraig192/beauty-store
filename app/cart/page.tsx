"use client";

import { useCart } from "@/lib/cartContext";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const { items, removeItem, total, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
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
      <div className="max-w-3xl mx-auto px-6 py-24 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Your Cart</h1>
        <p className="text-gray-500 mb-8">Your cart is empty</p>
        <Link
          href="/shop"
          className="bg-black text-white px-6 py-3 rounded-md text-sm hover:bg-gray-800"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Cart</h1>

      <div className="border border-gray-200 rounded-lg overflow-hidden mb-8">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between px-4 py-4 border-b border-gray-100 last:border-0"
          >
            <div>
              <p className="font-medium text-gray-900">{item.name}</p>
              <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
            </div>
            <div className="flex items-center gap-4">
              <p className="font-medium">R{(item.price * item.quantity).toFixed(2)}</p>
              <button
                onClick={() => removeItem(item.id)}
                className="text-sm text-red-500 hover:text-red-700"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between mb-8">
        <p className="text-lg font-semibold text-gray-900">Total</p>
        <p className="text-lg font-bold text-gray-900">R{total.toFixed(2)}</p>
      </div>

      {/* Shipping Address */}
      <div className="border border-gray-200 rounded-lg p-6 mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Shipping Address</h2>
        <div className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Full Name"
            value={address.name}
            onChange={(e) => setAddress({ ...address, name: e.target.value })}
            className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm"
          />
          <input
            type="text"
            placeholder="Street Address"
            value={address.street}
            onChange={(e) => setAddress({ ...address, street: e.target.value })}
            className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm"
          />
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="City"
              value={address.city}
              onChange={(e) => setAddress({ ...address, city: e.target.value })}
              className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm"
            />
            <input
              type="text"
              placeholder="Province"
              value={address.province}
              onChange={(e) => setAddress({ ...address, province: e.target.value })}
              className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Postal Code"
              value={address.postalCode}
              onChange={(e) => setAddress({ ...address, postalCode: e.target.value })}
              className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm"
            />
            <input
              type="text"
              placeholder="Phone Number"
              value={address.phone}
              onChange={(e) => setAddress({ ...address, phone: e.target.value })}
              className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm"
            />
          </div>
        </div>
      </div>

      <button
        onClick={handleCheckout}
        disabled={loading}
        className="w-full bg-black text-white py-3 rounded-md text-sm font-medium hover:bg-gray-800 disabled:opacity-50"
      >
        {loading ? "Redirecting to checkout..." : "Proceed to Checkout"}
      </button>
    </div>
  );
}