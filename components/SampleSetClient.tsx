"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/lib/store";
import { sampleSetProduct, sampleSetItems, sampleSetOriginalPrice } from "@/lib/sampleSets";

export default function SampleSetClient() {
  const addItem = useCartStore((s) => s.addItem);
  const showToast = useCartStore((s) => s.showToast);
  const [added, setAdded] = useState(false);

  const discountRate = Math.round(
    (1 - sampleSetProduct.price / sampleSetOriginalPrice) * 100
  );

  const handleAddToCart = () => {
    addItem(sampleSetProduct);
    showToast(`${sampleSetProduct.nameJa}をカートに追加しました`);
    setAdded(true);
    setTimeout(() => setAdded(false), 3000);
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <Link
        href="/products"
        className="text-xs tracking-widest uppercase text-gray-400 hover:text-[#1A1A1A] transition-colors mb-12 inline-flex items-center gap-2"
      >
        ← 商品一覧に戻る
      </Link>

      {/* Hero */}
      <div className="grid md:grid-cols-2 gap-16 mt-8">
        <div className="relative aspect-square bg-[#FAFAF8] overflow-hidden flex items-center justify-center">
          <div className="grid grid-cols-2 gap-3 p-8 w-full h-full">
            {sampleSetItems.map((item) => (
              <div key={item.id} className="relative aspect-square overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.nameJa}
                  fill
                  className="object-cover"
                  sizes="200px"
                />
              </div>
            ))}
          </div>
          {/* 割引バッジ */}
          <div className="absolute top-4 right-4 w-14 h-14 rounded-full bg-[#C9A84C] flex items-center justify-center">
            <span className="text-white text-xs font-medium text-center leading-tight">
              {discountRate}%<br />OFF
            </span>
          </div>
        </div>

        <div className="flex flex-col justify-center">
          <p className="text-xs tracking-[0.4em] uppercase text-[#C9A84C] mb-4">
            Starter Set · 1ml × 4
          </p>
          <h1 className="text-3xl font-light tracking-wide mb-2">
            はじめてのアロマ
          </h1>
          <p className="text-gray-400 text-lg mb-6">4本セット</p>

          <p className="text-gray-600 leading-relaxed mb-8">
            {sampleSetProduct.description}
          </p>

          {/* セット内容 */}
          <div className="mb-8">
            <p className="text-xs tracking-widest uppercase text-gray-400 mb-3">
              セット内容
            </p>
            <div className="space-y-2">
              {sampleSetItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between text-sm py-2 border-b border-gray-100"
                >
                  <div>
                    <span className="font-medium">{item.nameJa}</span>
                    <span className="text-gray-400 ml-2 text-xs">{item.description}</span>
                  </div>
                  <span className="text-gray-400 text-xs ml-4 shrink-0">
                    ¥{item.price.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* 価格 */}
          <div className="border-t border-gray-100 pt-8">
            <div className="flex items-end justify-between mb-2">
              <span className="text-xs tracking-widest uppercase text-gray-400">
                通常合計
              </span>
              <span className="text-gray-400 line-through text-lg">
                ¥{sampleSetOriginalPrice.toLocaleString()}
              </span>
            </div>
            <div className="flex items-end justify-between mb-6">
              <span className="text-xs tracking-widest uppercase text-[#C9A84C]">
                セット価格
              </span>
              <span className="text-3xl font-light">
                ¥{sampleSetProduct.price.toLocaleString()}
              </span>
            </div>

            {added ? (
              <div className="w-full py-4 bg-green-700 text-white text-xs tracking-widest uppercase text-center">
                カートに追加しました
              </div>
            ) : (
              <button
                onClick={handleAddToCart}
                className="w-full py-4 bg-[#1A1A1A] text-white text-xs tracking-widest uppercase hover:bg-[#3A3A3A] transition-colors"
              >
                カートに追加
              </button>
            )}

            <Link
              href="/cart"
              className="block w-full mt-3 py-4 border border-[#1A1A1A] text-center text-xs tracking-widest uppercase hover:bg-[#1A1A1A] hover:text-white transition-all"
            >
              カートを見る
            </Link>
          </div>

          <div className="mt-6 p-4 bg-[#FAFAF8] text-xs text-gray-500 leading-relaxed space-y-1">
            <p><span className="text-[#1A1A1A] font-medium">送料</span>：全国一律 800円</p>
            <p><span className="text-[#1A1A1A] font-medium">内容量</span>：各1ml（計4本）</p>
            <p><span className="text-[#1A1A1A] font-medium">用途</span>：芳香用アロマ雑貨</p>
          </div>
        </div>
      </div>

      {/* おすすめポイント */}
      <div className="mt-20 border-t border-gray-100 pt-12">
        <p className="text-xs tracking-[0.4em] uppercase text-[#C9A84C] mb-8 text-center">
          Why This Set
        </p>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "香りを試してから選べる",
              body: "1mlの少量サイズで4種類を体験。気に入った香りを見つけてから5mlをご購入いただけます。",
            },
            {
              title: "北東北の森を凝縮",
              body: "甘系・木系・森系・清涼系と異なる個性の4種を厳選。北東北の多様な森の香りを一度に楽しめます。",
            },
            {
              title: "ギフトにも最適",
              body: "アロマ初心者の方へのプレゼントとして喜ばれます。林業家が届けるストーリー付きで特別感のある贈り物に。",
            },
          ].map((point) => (
            <div key={point.title} className="text-center px-4">
              <h3 className="text-sm font-medium tracking-wide mb-3">{point.title}</h3>
              <p className="text-xs text-gray-500 leading-relaxed">{point.body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
