"use client";

import Link from "next/link";
import { SignInButton, UserButton, useAuth } from "@clerk/nextjs";
import { useCart } from "@/lib/cartContext";
import Image from "next/image";

export default function Navbar() {
  const { isSignedIn, sessionClaims } = useAuth();
  const { items } = useCart();

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const isAdmin = (sessionClaims?.metadata as { role?: string })?.role === "admin";

  return (
    <header className="w-full">
      {/* Announcement Bar */}
      <div className="w-full bg-[#f5ede6] text-center py-2 text-xs tracking-widest text-[#8c7b6e] uppercase">
        Free shipping on orders of R750+
      </div>

      {/* Logo Section */}
      <div className="w-full bg-white py-6 flex items-center justify-center border-b border-[#f0e6dc]">
        <Link href="/">
          <Image
            src="/litsy-logo.png"
            alt="Litsy Global Beauty"
            width={120}
            height={60}
            className="object-contain"
          />
        </Link>
      </div>

      {/* Navigation */}
      <nav className="w-full bg-white border-b border-[#f0e6dc] px-6 py-3 flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center gap-8">
          <Link href="/" className="text-xs tracking-widest uppercase text-[#1a1a1a] hover:text-[#8c7b6e] transition-colors">
            Home
          </Link>
          <Link href="/shop" className="text-xs tracking-widest uppercase text-[#1a1a1a] hover:text-[#8c7b6e] transition-colors">
            Shop
          </Link>
          {isAdmin && (
            <Link href="/admin" className="text-xs tracking-widest uppercase text-[#8c7b6e] hover:text-[#1a1a1a] transition-colors">
              Admin
            </Link>
          )}
        </div>

        <div className="flex items-center gap-6">
          {isSignedIn && (
            <Link href="/account" className="text-xs tracking-widest uppercase text-[#1a1a1a] hover:text-[#8c7b6e] transition-colors">
              My Orders
            </Link>
          )}
          <Link href="/cart" className="text-xs tracking-widest uppercase text-[#1a1a1a] hover:text-[#8c7b6e] transition-colors relative">
            Cart
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-4 bg-[#1a1a1a] text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </Link>
          {isSignedIn ? (
            <UserButton />
          ) : (
            <SignInButton mode="modal">
              <button className="text-xs tracking-widest uppercase text-[#1a1a1a] hover:text-[#8c7b6e] transition-colors">
                Sign In
              </button>
            </SignInButton>
          )}
        </div>
      </nav>
    </header>
  );
}