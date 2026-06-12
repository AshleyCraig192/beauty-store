"use client";

import { useRouter } from "next/navigation";

export default function DeleteProductButton({ id }: { id: string }) {
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    await fetch("/api/products", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    router.refresh();
  };

  return (
    <button
      onClick={handleDelete}
      className="text-red-500 hover:text-red-700"
    >
      Delete
    </button>
  );
}