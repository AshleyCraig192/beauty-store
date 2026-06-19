"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import AddToCartButton from "@/components/AddToCartButton";

type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  images: string[];
  category: string;
  brand: string;
};

type Props = {
  products: Product[];
  categories: string[];
  brands: string[];
};

export default function ShopContent({ products, categories, brands }: Props) {
  const searchParams = useSearchParams();
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [maxPrice, setMaxPrice] = useState<number>(
    Math.max(...products.map((p) => p.price))
  );

  const highestPrice = Math.max(...products.map((p) => p.price));

  useEffect(() => {
    const category = searchParams.get("category");
    if (category) {
      setSelectedCategories([category]);
    }
  }, [searchParams]);

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const toggleBrand = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand)
        ? prev.filter((b) => b !== brand)
        : [...prev, brand]
    );
  };

  const filteredProducts = products.filter((product) => {
    if (selectedCategories.length > 0 && !selectedCategories.includes(product.category)) return false;
    if (selectedBrands.length > 0 && !selectedBrands.includes(product.brand)) return false;
    if (inStockOnly && product.stock === 0) return false;
    if (product.price > maxPrice) return false;
    return true;
  });

  return (
    <div className="flex gap-8">
      {/* Filter Sidebar */}
      <div className="w-64 flex-shrink-0">
        <div className="border border-[#f0e6dc] rounded-lg p-6 sticky top-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xs tracking-widest uppercase font-semibold text-[#1a1a1a]">Filter</h2>
            <button
              onClick={() => {
                setSelectedCategories([]);
                setSelectedBrands([]);
                setInStockOnly(false);
                setMaxPrice(highestPrice);
              }}
              className="text-xs text-[#8c7b6e] hover:text-[#1a1a1a] transition-colors"
            >
              Clear all
            </button>
          </div>

          {/* Availability */}
          <div className="mb-6 pb-6 border-b border-[#f0e6dc]">
            <h3 className="text-xs tracking-widest uppercase text-[#1a1a1a] mb-3 font-medium">Availability</h3>
            <label className="flex items-center justify-between cursor-pointer mb-2">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                  className="accent-[#1a1a1a]"
                />
                <span className="text-xs text-[#1a1a1a]">In stock</span>
              </div>
              <span className="text-xs text-[#8c7b6e]">
                {products.filter((p) => p.stock > 0).length}
              </span>
            </label>
            <label className="flex items-center justify-between cursor-pointer">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={false}
                  readOnly
                  className="accent-[#1a1a1a]"
                />
                <span className="text-xs text-[#1a1a1a]">Out of stock</span>
              </div>
              <span className="text-xs text-[#8c7b6e]">
                {products.filter((p) => p.stock === 0).length}
              </span>
            </label>
          </div>

          {/* Price */}
          <div className="mb-6 pb-6 border-b border-[#f0e6dc]">
            <h3 className="text-xs tracking-widest uppercase text-[#1a1a1a] mb-3 font-medium">Price</h3>
            <p className="text-xs text-[#8c7b6e] mb-3">
              The highest price is R{highestPrice.toFixed(2)}
            </p>
            <input
              type="range"
              min={0}
              max={highestPrice}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-[#1a1a1a]"
            />
            <div className="flex items-center gap-2 mt-2">
              <div className="border border-[#f0e6dc] rounded px-2 py-1 text-xs text-[#1a1a1a] w-full text-center">
                R 0
              </div>
              <div className="border border-[#f0e6dc] rounded px-2 py-1 text-xs text-[#1a1a1a] w-full text-center">
                R {maxPrice.toFixed(0)}
              </div>
            </div>
          </div>

          {/* Category */}
          <div className="mb-6 pb-6 border-b border-[#f0e6dc]">
            <h3 className="text-xs tracking-widest uppercase text-[#1a1a1a] mb-3 font-medium">Category</h3>
            <div className="flex flex-col gap-2">
              {categories.map((category) => (
                <label key={category} className="flex items-center justify-between cursor-pointer">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(category)}
                      onChange={() => toggleCategory(category)}
                      className="accent-[#1a1a1a]"
                    />
                    <span className="text-xs text-[#1a1a1a]">{category}</span>
                  </div>
                  <span className="text-xs text-[#8c7b6e]">
                    {products.filter((p) => p.category === category).length}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Brand */}
          {brands.length > 0 && (
            <div className="mb-6">
              <h3 className="text-xs tracking-widest uppercase text-[#1a1a1a] mb-3 font-medium">Brand</h3>
              <div className="flex flex-col gap-2">
                {brands.map((brand) => (
                  <label key={brand} className="flex items-center justify-between cursor-pointer">
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={selectedBrands.includes(brand)}
                        onChange={() => toggleBrand(brand)}
                        className="accent-[#1a1a1a]"
                      />
                      <span className="text-xs text-[#1a1a1a]">{brand}</span>
                    </div>
                    <span className="text-xs text-[#8c7b6e]">
                      {products.filter((p) => p.brand === brand).length}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Product Grid */}
      <div className="flex-1">
        <p className="text-xs text-[#8c7b6e] mb-6 uppercase tracking-widest">
          {filteredProducts.length} products
        </p>

        {filteredProducts.length === 0 ? (
          <div className="text-center py-24 border border-dashed border-[#f0e6dc] rounded-lg">
            <p className="text-[#8c7b6e]">No products match your filters</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
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