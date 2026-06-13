import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="w-full bg-[#1a1a1a] text-[#f5ede6] mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        <div className="flex flex-col gap-4">
          <Image
            src="/litsy-logo.png"
            alt="Litsy Global Beauty"
            width={80}
            height={40}
            className="object-contain invert"
          />
          <p className="text-xs text-[#8c7b6e] leading-relaxed max-w-xs">
            Premium Asian self-care products, thoughtfully curated for South Africa.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-xs tracking-widest uppercase text-[#f5ede6] mb-2">Shop</h3>
          <Link href="/shop" className="text-xs text-[#8c7b6e] hover:text-[#f5ede6] transition-colors">All Products</Link>
          <Link href="/shop" className="text-xs text-[#8c7b6e] hover:text-[#f5ede6] transition-colors">Skincare</Link>
          <Link href="/shop" className="text-xs text-[#8c7b6e] hover:text-[#f5ede6] transition-colors">Haircare</Link>
          <Link href="/shop" className="text-xs text-[#8c7b6e] hover:text-[#f5ede6] transition-colors">Makeup</Link>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-xs tracking-widest uppercase text-[#f5ede6] mb-2">Information</h3>
          <Link href="/account" className="text-xs text-[#8c7b6e] hover:text-[#f5ede6] transition-colors">My Orders</Link>
          <Link href="/cart" className="text-xs text-[#8c7b6e] hover:text-[#f5ede6] transition-colors">Cart</Link>
          <p className="text-xs text-[#8c7b6e]">Free shipping on orders R750+</p>
        </div>

      </div>

      <div className="border-t border-[#2a2a2a] py-4 text-center">
        <p className="text-xs text-[#8c7b6e]">
          © {new Date().getFullYear()} Litsy Global Beauty. All rights reserved.
        </p>
      </div>
    </footer>
  );
}