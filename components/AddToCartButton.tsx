"use client";

import { useCart } from "@/lib/cartContext";

type Props = {
  product: {
    id: string;
    name: string;
    price: number;
  };
  outOfStock: boolean;
};

export default function AddToCartButton({ product, outOfStock }: Props) {
  const { addItem } = useCart();

  return (
    <button
      onClick={() => addItem({ ...product, quantity: 1 })}
      disabled={outOfStock}
      className="bg-black text-white px-6 py-3 rounded-md text-sm font-medium hover:bg-gray-800 disabled:opacity-50"
    >
      {outOfStock ? "Out of Stock" : "Add to Cart"}
    </button>
  );
}