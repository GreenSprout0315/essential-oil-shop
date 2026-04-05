"use client";
import { use } from "react";
import { notFound } from "next/navigation";
import { getProductById } from "@/lib/products";
import { useCartStore } from "@/lib/store";
import Link from "next/link";
import Image from "next/image";
import ReviewSection from "@/components/ReviewSection";

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const product = getProductById(id);

  if (!product) notFound();

  const addItem = useCartStore((s) => s.addItem);

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <Link href="/products" className="text-xs tracking-widest uppercase text-gray-400 hover:text-[#1A1A1A] transition-colors mb-12 inline-flex items-center gap-2">
        ← 一覧に戻る
      </Link>

      <div className="grid md:grid-cols-2 gap-16 mt-8">
        {/* Image */}
        <div className="relative aspect-square bg-[#FAFAF8] overflow-hidden">
          <Image
            src={product.image}
            alt={product.nameJa}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        </div>

        {/* Info */}
        <div className="flex flex-col justify-center">
          <p className="text-xs tracking-[0.4em] uppercase text-[#C9A84C] mb-4">{product.category}</p>
          <h1 className="text-4xl font-light tracking-wide mb-1">{product.name}</h1>
          <p className="text-gray-400 text-lg mb-8">{product.nameJa}</p>

          <p className="text-gray-600 leading-relaxed mb-8">{product.description}</p>

          <div className="mb-8">
            <p className="text-xs tracking-widest uppercase text-gray-400 mb-3">Benefits</p>
            <div className="flex flex-wrap gap-2">
              {product.benefits.map((b) => (
                <span key={b} className="px-3 py-1 text-xs border border-[#C9A84C] text-[#C9A84C] tracking-wider">
                  {b}
                </span>
              ))}
            </div>
          </div>

          <div className="border-t border-gray-100 pt-8">
            <div className="flex items-center justify-between mb-6">
              <span className="text-sm text-gray-400 tracking-wider">{product.size}</span>
              <span className="text-3xl font-light">¥{product.price.toLocaleString()}</span>
            </div>
            <button
              onClick={() => addItem(product)}
              className="w-full py-4 bg-[#1A1A1A] text-white text-xs tracking-widest uppercase hover:bg-[#3A3A3A] transition-colors"
            >
              カートに追加
            </button>
            <Link
              href="/cart"
              className="block w-full mt-3 py-4 border border-[#1A1A1A] text-center text-xs tracking-widest uppercase hover:bg-[#1A1A1A] hover:text-white transition-all"
            >
              カートを見る
            </Link>
          </div>

          <div className="mt-8 p-4 bg-[#FAFAF8] text-xs text-gray-500 leading-relaxed">
            <p className="font-medium text-[#1A1A1A] mb-1">ご注意</p>
            原液での使用は避け、必ずキャリアオイルで希釈してご使用ください。
            お子様の手の届かない場所に保管してください。
          </div>
        </div>
      </div>

      <ReviewSection productId={id} />
    </div>
  );
}
