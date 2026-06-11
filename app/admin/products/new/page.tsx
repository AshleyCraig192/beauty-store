"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewProductPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category: "",
  });

  const handleSubmit = async () => {
    setLoading(true);
    const res = await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: form.name,
        description: form.description,
        price: parseFloat(form.price),
        stock: parseInt(form.stock),
        category: form.category,
        images: [],
      }),
    });

    if (res.ok) {
      router.push("/admin/products");
    } else {
      alert("Something went wrong");
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Add Product</h1>

      <div className="flex flex-col gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm"
            placeholder="e.g. Rose Face Cream"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm"
            rows={4}
            placeholder="Describe the product..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Price (R)</label>
          <input
            type="number"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm"
            placeholder="e.g. 299.99"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Stock</label>
          <input
            type="number"
            value={form.stock}
            onChange={(e) => setForm({ ...form, stock: e.target.value })}
            className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm"
            placeholder="e.g. 50"
          />
        </div>

<div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
          <select
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm"
          >
            <option value="">Select a category</option>
            <option value="Skincare">Skincare</option>
            <option value="Makeup">Makeup</option>
            <option value="Haircare">Haircare</option>
            <option value="Fragrance">Fragrance</option>
            <option value="Body Care">Body Care</option>
            <option value="Nail Care">Nail Care</option>
            <option value="Tools & Accessories">Tools & Accessories</option>
          </select>
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="bg-black text-white px-6 py-2 rounded-md text-sm hover:bg-gray-800 disabled:opacity-50"
        >
          {loading ? "Saving..." : "Save Product"}
        </button>
      </div>
    </div>
  );
}