import { db } from "@/lib/db";
import Link from "next/link";
import Image from "next/image";
import AddToCartButton from "@/components/AddToCartButton";

export const dynamic = "force-dynamic";

export default async function ShopPage() {
  const products = await db.product.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="w-full">
      {/* Page Header */}
      <div className="w-full bg-[#f5ede6] py-12 text-center">
        <p className="text-xs tracking-widest uppercase text-[#8c7b6e] mb-2">Litsy Global Beauty</p>
        <h1
          className="text-4xl font-bold text-[#1a1a1a]"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Shop All Products
        </h1>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {products.length === 0 ? (
          <div className="text-center py-24 border border-dashed border-[#f0e6dc] rounded-lg">
            <p className="text-[#8c7b6e]">No products available yet. Check back soon!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {products.map((product) => (
              <div key={product.id} className="bg-white rounded-lg overflow-hidden border border-[#f0e6dc] flex flex-col shadow-sm hover:shadow-md transition-shadow">
                <Link href={`/product/${product.id}`}>
                  <div className="bg-[#fdf6ee] h-48 flex items-center justify-center overflow-hidden">
                    {product.images.length > 0 ? (
                      <Image
                        src={product.images[0]}
                        alt={product.name}
                        width={300}
                        height={200}
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
                    <h3 className="text-sm font-medium text-[#1a1a1a] mb-2 hover:text-[#8c7b6e] transition-colors leading-snug">
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
        )}
      </div>
    </div>
  );
}