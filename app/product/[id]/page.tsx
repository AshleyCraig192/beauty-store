import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import Image from "next/image";
import AddToCartButton from "@/components/AddToCartButton";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const product = await db.product.findUnique({
    where: { id },
  });

  if (!product) {
    notFound();
  }

  return (
    <div className="w-full">
      {/* Breadcrumb */}
      <div className="w-full bg-[#fdf6ee] py-3 px-6 border-b border-[#f0e6dc]">
        <div className="max-w-7xl mx-auto">
          <p className="text-xs text-[#8c7b6e]">
            <Link href="/" className="hover:text-[#1a1a1a]">Home</Link>
            {" / "}
            <Link href="/shop" className="hover:text-[#1a1a1a]">Shop</Link>
            {" / "}
            <span className="text-[#1a1a1a]">{product.name}</span>
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="bg-[#fdf6ee] rounded-lg h-96 flex items-center justify-center overflow-hidden border border-[#f0e6dc]">
            {product.images.length > 0 ? (
              <Image
                src={product.images[0]}
                alt={product.name}
                width={600}
                height={400}
                className="w-full h-full object-cover rounded-lg"
              />
            ) : (
              <span className="text-[#8c7b6e]">No image</span>
            )}
          </div>

          {/* Product Details */}
          <div className="flex flex-col justify-center">
            <p className="text-xs tracking-widest uppercase text-[#8c7b6e] mb-2">{product.category}</p>
            <h1
              className="text-3xl font-bold text-[#1a1a1a] mb-4"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              {product.name}
            </h1>
            <p className="text-2xl font-semibold text-[#1a1a1a] mb-4">
              R{product.price.toFixed(2)}
            </p>
            <p className="text-sm text-[#8c7b6e] leading-relaxed mb-6">
              {product.description}
            </p>
            <p className="text-xs text-[#8c7b6e] mb-6 uppercase tracking-widest">
              {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
            </p>
            <AddToCartButton
              product={{ id: product.id, name: product.name, price: product.price }}
              outOfStock={product.stock === 0}
            />

            {/* Authenticity Badge */}
            <div className="mt-8 p-4 bg-[#fdf6ee] border border-[#f0e6dc] rounded-lg">
              <p className="text-xs text-[#8c7b6e] text-center tracking-widest uppercase">
                ✓ 100% Authentic — Sourced from authorised distributors
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}