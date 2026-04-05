"use client";
import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/lib/products";
import { useCartStore } from "@/lib/store";

export default function ProductCard({ product }: { product: Product }) {
  const addItem = useCartStore((s) => s.addItem);

  return (
    <div className="group">
      <Link href={`/products/${product.id}`}>
        <div className="relative overflow-hidden bg-[#FAFAF8] aspect-square mb-4">
          <Image
            src={product.image}
            alt={product.nameJa}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 50vw, 25vw"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-all duration-300" />
        </div>
      </Link>

      <div className="flex items-start justify-between mb-2">
        <div>
          <p className="text-xs text-[#C9A84C] tracking-widest uppercase mb-1">{product.category}</p>
          <Link href={`/products/${product.id}`}>
            <h3 className="font-light text-lg tracking-wide hover:text-[#C9A84C] transition-colors">
              {product.name}
            </h3>
          </Link>
          <p className="text-sm text-gray-500">{product.nameJa}</p>
        </div>
        <p className="text-lg font-light text-[#1A1A1A]">
          ¥{product.price.toLocaleString()}
        </p>
      </div>

      <button
        onClick={() => addItem(product)}
        className="w-full mt-3 py-3 text-xs tracking-widest uppercase border border-[#1A1A1A] text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white transition-all duration-200"
      >
        カートに追加
      </button>
    </div>
  );
}
