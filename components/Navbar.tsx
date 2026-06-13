"use client";

import Link from "next/link";
import { SignInButton, UserButton, useAuth } from "@clerk/nextjs";
import { useCart } from "@/lib/cartContext";

export default function Navbar() {
  const { isSignedIn } = useAuth();
  const { items } = useCart();

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="w-full bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
      <Link href="/" className="text-xl font-semibold tracking-tight text-gray-900">
        Beauty Store
      </Link>

      <div className="flex items-center gap-6">
        <Link href="/shop" className="text-sm text-gray-600 hover:text-gray-900">
          Shop
        </Link>
        {isSignedIn && (
        <Link href="/account" className="text-sm text-gray-600 hover:text-gray-900">
          My Orders
        </Link>
      )}
        <Link href="/cart" className="text-sm text-gray-600 hover:text-gray-900 relative">
          Cart
          {itemCount > 0 && (
            <span className="absolute -top-2 -right-4 bg-black text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
              {itemCount}
            </span>
          )}
        </Link>
        {isSignedIn ? (
          <UserButton />
        ) : (
          <SignInButton mode="modal">
            <button className="text-sm bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800">
              Sign In
            </button>
          </SignInButton>
        )}
      </div>
    </nav>
  );
}