"use client";
import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/lib/products";
import { useCartStore } from "@/lib/store";
import { useState } from "react";

export default function ProductCard({ product }: { product: Product }) {
  const addItem = useCartStore((s) => s.addItem);
  const showToast = useCartStore((s) => s.showToast);
  const [added, setAdded] = useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem(product);
    showToast(`${product.nameJa}をカートに追加しました`);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="group flex flex-col">
      {/* 画像 */}
      <Link href={`/products/${product.id}`} className="block relative">
        <div className="relative overflow-hidden bg-[#FAFAF8] aspect-square mb-4">
          <Image
            src={product.image}
            alt={product.nameJa}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 50vw, 25vw"
          />
          {/* 人気バッジ */}
          {product.featured && (
            <div className="absolute top-2 left-2 bg-[#C9A84C] text-white text-[10px] tracking-widest px-2 py-1 uppercase">
              人気
            </div>
          )}
          {/* ホバー時クイックビュー */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 flex items-end justify-center pb-4 opacity-0 group-hover:opacity-100">
            <span className="text-white text-xs tracking-widest uppercase bg-black/60 px-4 py-2">
              詳細を見る →
            </span>
          </div>
        </div>
      </Link>

      {/* 情報 */}
      <div className="flex-1 flex flex-col">
        <p className="text-[10px] text-[#C9A84C] tracking-widest uppercase mb-1">
          {product.category}
        </p>
        <Link href={`/products/${product.id}`}>
          <h3 className="font-light text-base tracking-wide hover:text-[#C9A84C] transition-colors leading-snug">
            {product.name}
          </h3>
        </Link>
        <p className="text-xs text-gray-400 mb-2">{product.nameJa}</p>

        {/* ベネフィットタグ */}
        <div className="flex flex-wrap gap-1 mb-3">
          {product.benefits.slice(0, 2).map((b) => (
            <span
              key={b}
              className="text-[10px] px-2 py-0.5 bg-[#FAFAF8] text-gray-500 border border-gray-100"
            >
              {b}
            </span>
          ))}
        </div>

        <div className="mt-auto">
          <p className="text-lg font-light text-[#1A1A1A] mb-3">
            ¥{product.price.toLocaleString()}
            <span className="text-xs text-gray-400 ml-1">（税込）</span>
          </p>

          <button
            onClick={handleAdd}
            className={`w-full py-3 text-xs tracking-widest uppercase transition-all duration-200 ${
              added
                ? "bg-green-700 text-white"
                : "bg-[#C9A84C] text-white hover:bg-[#b8963f]"
            }`}
          >
            {added ? "追加しました ✓" : "カートに追加"}
          </button>
        </div>
      </div>
    </div>
  );
}
