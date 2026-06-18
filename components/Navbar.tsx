"use client";

import Link from "next/link";
import { SignInButton, UserButton, useAuth } from "@clerk/nextjs";
import { useCart } from "@/lib/cartContext";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";

const categories = [
  "Skincare",
  "Makeup",
  "Haircare",
  "Fragrance",
  "Body Care",
  "Nail Care",
  "Tools & Accessories",
];

export default function Navbar() {
  const { isSignedIn, sessionClaims } = useAuth();
  const { items } = useCart();
  const [shopOpen, setShopOpen] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const isAdmin = (sessionClaims?.metadata as { role?: string })?.role === "admin";

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShopOpen(false);
        setCategoriesOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
      <nav className="w-full bg-white border-b border-[#f0e6dc] px-6 flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center">
          <Link href="/" className="text-xs tracking-widest uppercase text-[#1a1a1a] hover:text-[#8c7b6e] transition-colors px-4 py-0 border-r border-[#f0e6dc] relative group">
            Home
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#8c7b6e] group-hover:w-full transition-all duration-300" />
          </Link>

          {/* Shop Dropdown */}
          <div className="relative border-r border-[#f0e6dc]" ref={dropdownRef}>
            <button
              onClick={() => {
                setShopOpen(!shopOpen);
                setCategoriesOpen(false);
              }}
              className="text-xs tracking-widest uppercase text-[#1a1a1a] hover:text-[#8c7b6e] transition-colors px-4 py-3 relative group flex items-center gap-1"
            >
              Shop
              <span className="text-[#8c7b6e]">▾</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#8c7b6e] group-hover:w-full transition-all duration-300" />
            </button>

            <div className={`absolute top-full left-0 bg-white border border-[#f0e6dc] shadow-md z-50 min-w-48 transition-all duration-200 origin-top ${shopOpen ? "opacity-100 scale-y-100" : "opacity-0 scale-y-0 pointer-events-none"}`}>
              <Link
                href="/shop"
                onClick={() => setShopOpen(false)}
                className="block px-4 py-3 text-xs tracking-widest uppercase text-[#1a1a1a] hover:text-[#8c7b6e] hover:bg-[#fdf6ee] transition-colors border-b border-[#f0e6dc] relative group"
              >
                All Products
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#8c7b6e] group-hover:w-full transition-all duration-300" />
              </Link>

              {/* Categories nested dropdown */}
              <div className="relative">
                <button
                  onClick={() => setCategoriesOpen(!categoriesOpen)}
                  className="w-full text-left px-4 py-3 text-xs tracking-widest uppercase text-[#1a1a1a] hover:text-[#8c7b6e] hover:bg-[#fdf6ee] transition-colors border-b border-[#f0e6dc] flex items-center justify-between"
                >
                  Categories
                  <span className="text-[#8c7b6e]">▸</span>
                </button>

                <div className={`absolute top-0 left-full bg-white border border-[#f0e6dc] shadow-md z-50 min-w-48 transition-all duration-200 origin-left ${categoriesOpen ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0 pointer-events-none"}`}>
                  {categories.map((category) => (
                    <Link
                      key={category}
                      href={`/shop?category=${encodeURIComponent(category)}`}
                      onClick={() => {
                        setShopOpen(false);
                        setCategoriesOpen(false);
                      }}
                      className="block px-4 py-3 text-xs tracking-widest uppercase text-[#1a1a1a] hover:text-[#8c7b6e] hover:bg-[#fdf6ee] transition-colors border-b border-[#f0e6dc] last:border-0 relative group"
                    >
                      {category}
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#8c7b6e] group-hover:w-full transition-all duration-300" />
                    </Link>
                  ))}
                </div>
              </div>

              <Link
                href="/shop?brand=true"
                onClick={() => setShopOpen(false)}
                className="block px-4 py-3 text-xs tracking-widest uppercase text-[#1a1a1a] hover:text-[#8c7b6e] hover:bg-[#fdf6ee] transition-colors relative group"
              >
                Brands
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#8c7b6e] group-hover:w-full transition-all duration-300" />
              </Link>
            </div>
          </div>

          {isAdmin && (
            <Link href="/admin" className="text-xs tracking-widest uppercase text-[#8c7b6e] hover:text-[#1a1a1a] transition-colors px-4 py-0 border-r border-[#f0e6dc] relative group">
              Admin
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#8c7b6e] group-hover:w-full transition-all duration-300" />
            </Link>
          )}
        </div>

        <div className="flex items-center">
          <Link href="/cart" className="text-xs tracking-widest uppercase text-[#1a1a1a] hover:text-[#8c7b6e] transition-colors px-4 py-0 border-l border-[#f0e6dc] relative group">
            Cart
            {itemCount > 0 && (
              <span className="absolute -top-1 right-3 bg-[#1a1a1a] text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                {itemCount}
              </span>
            )}
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#8c7b6e] group-hover:w-full transition-all duration-300" />
          </Link>
          <div className="px-4 py-0 border-l border-[#f0e6dc]">
            {isSignedIn ? (
              <UserButton>
                <UserButton.MenuItems>
                  <UserButton.Link
                    label="My Orders"
                    labelIcon={<span>📦</span>}
                    href="/account"
                  />
                </UserButton.MenuItems>
              </UserButton>
            ) : (
              <SignInButton mode="modal">
                <button className="text-xs tracking-widest uppercase text-[#1a1a1a] hover:text-[#8c7b6e] transition-colors relative group">
                  Sign In
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#8c7b6e] group-hover:w-full transition-all duration-300" />
                </button>
              </SignInButton>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}