"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function NewProductForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category: "",
    brand: ""
  });

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    setImageUrl(data.secure_url);
    setUploading(false);
  };

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
        images: imageUrl ? [imageUrl] : [],
        brand: form.brand
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
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Product Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm"
        />
        {uploading && <p className="text-sm text-gray-500 mt-1">Uploading...</p>}
        {imageUrl && (
          <div className="mt-2">
            <Image
              src={imageUrl}
              alt="Product preview"
              width={200}
              height={200}
              className="rounded-md object-cover"
            />
          </div>
        )}
      </div>

      <button
        onClick={handleSubmit}
        disabled={loading || uploading}
        className="bg-black text-white px-6 py-2 rounded-md text-sm hover:bg-gray-800 disabled:opacity-50"
      >
        {loading ? "Saving..." : "Save Product"}
      </button>
    </div>
  );
}