"use client";

import { useCart } from "@/lib/cartContext";
import toast from "react-hot-toast";

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

  const handleAddToCart = () => {
    addItem({ ...product, quantity: 1 });
    toast.success(`${product.name} added to cart`);
  };

  return (
    <button
      onClick={handleAddToCart}
      disabled={outOfStock}
      className="w-full border border-[#1a1a1a] text-[#1a1a1a] py-2 text-xs tracking-widest uppercase hover:bg-[#1a1a1a] hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {outOfStock ? "Out of Stock" : "Add to Cart"}
    </button>
  );
}