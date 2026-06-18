import { db } from "@/lib/db";
import ShopContent from "@/components/ShopContent";

export const dynamic = "force-dynamic";

export default async function ShopPage() {
  const products = await db.product.findMany({
    orderBy: { createdAt: "desc" },
  });

  const categories = [...new Set(products.map((p) => p.category))];
  const brands = [...new Set(products.map((p) => p.brand).filter(Boolean))];

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
        <ShopContent products={products} categories={categories} brands={brands} />
      </div>
    </div>
  );
}