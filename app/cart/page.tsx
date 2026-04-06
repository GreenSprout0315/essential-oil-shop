"use client";
import Link from "next/link";
import { useCartStore } from "@/lib/store";
import { SHIPPING_FEE } from "@/lib/constants";

export default function CartPage() {
  const { items, removeItem, updateQuantity, totalPrice } = useCartStore();

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-32 text-center">
        <div className="text-6xl mb-6">🛒</div>
        <h1 className="text-2xl font-light tracking-wide mb-4">カートは空です</h1>
        <p className="text-gray-400 mb-10">商品を追加してください</p>
        <Link
          href="/products"
          className="inline-block px-10 py-4 bg-[#1A1A1A] text-white text-xs tracking-widest uppercase hover:bg-[#3A3A3A] transition-colors"
        >
          商品を見る
        </Link>
      </div>
    );
  }

  const shipping = SHIPPING_FEE;
  const total = totalPrice() + shipping;

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-light tracking-wide mb-12">カート</h1>

      <div className="grid md:grid-cols-3 gap-12">
        {/* Items */}
        <div className="md:col-span-2 space-y-6">
          {items.map(({ product, quantity }) => (
            <div key={product.id} className="flex gap-6 py-6 border-b border-gray-100">
              <div className="w-20 h-20 bg-[#FAFAF8] flex items-center justify-center flex-shrink-0 text-xs tracking-wider text-[#C9A84C] font-light">
                No.{product.number}
              </div>
              <div className="flex-1">
                <p className="text-xs text-[#C9A84C] tracking-wider mb-1">{product.category}</p>
                <h3 className="font-light text-lg">{product.name}</h3>
                <p className="text-sm text-gray-400">{product.size}</p>
                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center border border-gray-200">
                    <button
                      onClick={() => updateQuantity(product.id, quantity - 1)}
                      className="w-8 h-8 text-gray-500 hover:text-[#1A1A1A] transition-colors"
                    >
                      −
                    </button>
                    <span className="w-8 text-center text-sm">{quantity}</span>
                    <button
                      onClick={() => updateQuantity(product.id, quantity + 1)}
                      className="w-8 h-8 text-gray-500 hover:text-[#1A1A1A] transition-colors"
                    >
                      ＋
                    </button>
                  </div>
                  <p className="font-light">¥{(product.price * quantity).toLocaleString()}</p>
                </div>
              </div>
              <button
                onClick={() => removeItem(product.id)}
                className="text-gray-300 hover:text-gray-600 transition-colors self-start"
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="md:col-span-1">
          <div className="bg-[#FAFAF8] p-6">
            <h2 className="text-sm tracking-widest uppercase mb-6">注文概要</h2>
            <div className="space-y-3 text-sm mb-6">
              <div className="flex justify-between">
                <span className="text-gray-500">小計</span>
                <span>¥{totalPrice().toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">送料</span>
                <span>¥{shipping.toLocaleString()}</span>
              </div>
              <div className="border-t border-gray-200 pt-3 flex justify-between font-medium">
                <span>合計</span>
                <span>¥{total.toLocaleString()}</span>
              </div>
            </div>
            <Link
              href="/checkout"
              className="block w-full py-4 bg-[#1A1A1A] text-white text-center text-xs tracking-widest uppercase hover:bg-[#3A3A3A] transition-colors"
            >
              チェックアウト
            </Link>
            <Link
              href="/products"
              className="block text-center text-xs text-gray-400 mt-4 hover:text-[#1A1A1A] transition-colors"
            >
              買い物を続ける
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
