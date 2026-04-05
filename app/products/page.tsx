"use client";
import { useState } from "react";
import { products, categories } from "@/lib/products";
import ProductCard from "@/components/ProductCard";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function ProductsContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "すべて";
  const [selected, setSelected] = useState(initialCategory);

  const filtered = selected === "すべて"
    ? products
    : products.filter((p) => p.category === selected);

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <div className="text-center mb-12">
        <p className="text-xs tracking-[0.4em] uppercase text-[#C9A84C] mb-3">All Products</p>
        <h1 className="text-4xl font-light tracking-wide">エッセンシャルオイル</h1>
      </div>

      {/* Category filter */}
      <div className="flex justify-center gap-6 mb-16">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelected(cat)}
            className={`text-xs tracking-widest uppercase pb-2 transition-all ${
              selected === cat
                ? "text-[#1A1A1A] border-b border-[#C9A84C]"
                : "text-gray-400 hover:text-[#1A1A1A]"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {filtered.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-gray-400 py-24">該当する商品がありません</p>
      )}
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="text-center py-24 text-gray-400">Loading...</div>}>
      <ProductsContent />
    </Suspense>
  );
}
