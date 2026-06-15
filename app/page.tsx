import { db } from "@/lib/db";
import Link from "next/link";
import Image from "next/image";
import AddToCartButton from "@/components/AddToCartButton";

export const dynamic = "force-dynamic";

export default async function Home() {
  const featuredProducts = await db.product.findMany({
    take: 4,
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="flex flex-col w-full">
      {/* Hero Banner */}
      <section className="w-full relative min-h-[500px] flex items-center justify-center">
        <Image
          src="/hero-banner.jpg"
          alt="Litsy Hero Banner"
          fill
          className="object-cover"
          priority
        />
        <div className="relative z-10 text-center px-6 py-20">
          <p className="text-xs tracking-widest uppercase text-[#8c7b6e] mb-4">
            Premium Asian Beauty
          </p>
          <h1
            className="text-5xl md:text-6xl font-bold text-[#1a1a1a] mb-6"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Lit From Within
          </h1>
          <p className="text-sm text-[#8c7b6e] max-w-xl mx-auto mb-8 leading-relaxed">
            Discover a thoughtfully curated selection of premium Asian self-care products.
            Reveal a luminous, healthy glow that celebrates your natural beauty.
          </p>
          <Link
            href="/shop"
            className="inline-block bg-[#1a1a1a] text-white px-8 py-3 text-xs tracking-widest uppercase hover:bg-[#8c7b6e] transition-colors"
          >
            Shop Now
          </Link>
        </div>
      </section>

      {/* About Strip */}
      <section className="w-full bg-[#1a1a1a] py-4 text-center">
        <p
          className="text-[#f5ede6] text-lg tracking-widest uppercase"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Love the skin you're in
        </p>
      </section>

      {/* Featured Products */}
      {featuredProducts.length > 0 && (
        <section className="w-full max-w-7xl mx-auto px-6 py-16">
          <div className="text-center mb-10">
            <p className="text-xs tracking-widest uppercase text-[#8c7b6e] mb-2">Handpicked for you</p>
            <h2
              className="text-3xl font-bold text-[#1a1a1a]"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Featured Products
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-lg overflow-hidden shadow-sm border border-[#f0e6dc] flex flex-col">
                <Link href={`/product/${product.id}`}>
                  <div className="bg-[#fdf6ee] h-56 flex items-center justify-center overflow-hidden">
                    {product.images.length > 0 ? (
                      <Image
                        src={product.images[0]}
                        alt={product.name}
                        width={300}
                        height={224}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-[#8c7b6e] text-sm">No image</span>
                    )}
                  </div>
                </Link>
                <div className="p-4 flex flex-col flex-1">
                  <p className="text-xs text-[#8c7b6e] uppercase tracking-widest mb-1">{product.category}</p>
                  <Link href={`/product/${product.id}`}>
                    <h3 className="text-sm font-medium text-[#1a1a1a] mb-2 hover:text-[#8c7b6e] transition-colors">
                      {product.name}
                    </h3>
                  </Link>
                  <p className="text-sm font-semibold text-[#1a1a1a] mb-4">R{product.price.toFixed(2)}</p>
                  <div className="mt-auto">
                    <AddToCartButton
                      product={{ id: product.id, name: product.name, price: product.price }}
                      outOfStock={product.stock === 0}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/shop"
              className="inline-block border border-[#1a1a1a] text-[#1a1a1a] px-8 py-3 text-xs tracking-widest uppercase hover:bg-[#1a1a1a] hover:text-white transition-colors"
            >
              View All Products
            </Link>
          </div>
        </section>
      )}

      {/* Brand Story */}
      <section className="w-full bg-[#fdf6ee] py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xs tracking-widest uppercase text-[#8c7b6e] mb-4">Our Story</p>
          <h2
            className="text-3xl font-bold text-[#1a1a1a] mb-6"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Confidence, in your own skin
          </h2>
          <p className="text-sm text-[#8c7b6e] leading-relaxed max-w-2xl mx-auto">
            Dedicated to self-care rooted in centuries of tradition and minimalism, combined with
            modern dermatological science. Litsy brings a thoughtfully chosen range of genuine
            Asian skincare and beauty treasures to South Africa.
          </p>
        </div>
      </section>

      {/* Features */}
      <section className="w-full max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="p-6">
            <div className="text-3xl mb-4">✨</div>
            <h3 className="text-sm font-semibold uppercase tracking-widest text-[#1a1a1a] mb-2">100% Authentic</h3>
            <p className="text-xs text-[#8c7b6e] leading-relaxed">
              Sourced exclusively from reputable brands and authorised distributors.
            </p>
          </div>
          <div className="p-6">
            <div className="text-3xl mb-4">🚚</div>
            <h3 className="text-sm font-semibold uppercase tracking-widest text-[#1a1a1a] mb-2">Fast Delivery</h3>
            <p className="text-xs text-[#8c7b6e] leading-relaxed">
              Same day courier booking on all confirmed orders across South Africa.
            </p>
          </div>
          <div className="p-6">
            <div className="text-3xl mb-4">🔒</div>
            <h3 className="text-sm font-semibold uppercase tracking-widest text-[#1a1a1a] mb-2">Secure Payments</h3>
            <p className="text-xs text-[#8c7b6e] leading-relaxed">
              Safe and encrypted checkout powered by Stripe.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}