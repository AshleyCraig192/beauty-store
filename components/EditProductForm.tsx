"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  brand: string;
};

export default function EditProductForm({ product }: { product: Product }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: product.name,
    description: product.description,
    price: product.price.toString(),
    stock: product.stock.toString(),
    category: product.category,
    brand: product.brand ?? "",
  });

  const handleSubmit = async () => {
    setLoading(true);
    const res = await fetch(`/api/products/${product.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: form.name,
        description: form.description,
        price: parseFloat(form.price),
        stock: parseInt(form.stock),
        category: form.category,
        brand: form.brand,
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
    <div className="flex flex-col gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
        <input
          type="text"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
        <textarea
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm"
          rows={4}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Price (R)</label>
        <input
          type="number"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Stock</label>
        <input
          type="number"
          value={form.stock}
          onChange={(e) => setForm({ ...form, stock: e.target.value })}
          className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm"
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

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Brand</label>
        <input
          type="text"
          value={form.brand}
          onChange={(e) => setForm({ ...form, brand: e.target.value })}
          className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm"
          placeholder="e.g. COSRX"
        />
      </div>

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="bg-black text-white px-6 py-2 rounded-md text-sm hover:bg-gray-800 disabled:opacity-50"
      >
        {loading ? "Saving..." : "Save Changes"}
      </button>
    </div>
  );
}