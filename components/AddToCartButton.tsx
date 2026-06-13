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
      className="w-full border border-[#1a1a1a] text-[#1a1a1a] py-2 text-xs tracking-widest uppercase hover:bg-[#1a1a1a] hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {outOfStock ? "Out of Stock" : "Add to Cart"}
    </button>
  );
}