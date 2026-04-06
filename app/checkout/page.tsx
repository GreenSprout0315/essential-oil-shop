"use client";
import { useState } from "react";
import { useCartStore } from "@/lib/store";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { SHIPPING_FEE } from "@/lib/constants";

export default function CheckoutPage() {
  const { items, totalPrice } = useCartStore();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const shipping = SHIPPING_FEE;
  const total = totalPrice() + shipping;

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-32 text-center">
        <h1 className="text-2xl font-light tracking-wide mb-4">カートが空です</h1>
        <Link href="/products" className="inline-block px-10 py-4 bg-[#1A1A1A] text-white text-xs tracking-widest uppercase">
          商品を見る
        </Link>
      </div>
    );
  }

  async function handleCheckout() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((i) => ({
            name: `${i.product.name} (${i.product.nameJa})`,
            price: i.product.price,
            quantity: i.quantity,
          })),
          shipping,
        }),
      });

      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        setError(data.error || "エラーが発生しました");
      }
    } catch {
      setError("ネットワークエラーが発生しました");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-light tracking-wide mb-12">チェックアウト</h1>

      <div className="grid md:grid-cols-2 gap-16">
        {/* Order summary */}
        <div>
          <h2 className="text-sm tracking-widest uppercase mb-6">ご注文内容</h2>
          <div className="space-y-4">
            {items.map(({ product, quantity }) => (
              <div key={product.id} className="flex justify-between items-center py-4 border-b border-gray-100">
                <div className="flex gap-4 items-center">
                  <span className="text-xs tracking-wider text-[#C9A84C] font-light w-10 text-center">
                    No.{product.number}
                  </span>
                  <div>
                    <p className="font-light">{product.name}</p>
                    <p className="text-xs text-gray-400">{product.size} × {quantity}</p>
                  </div>
                </div>
                <p>¥{(product.price * quantity).toLocaleString()}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">小計</span>
              <span>¥{totalPrice().toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">送料</span>
              <span>¥{shipping.toLocaleString()}</span>
            </div>
            <div className="flex justify-between font-medium text-lg pt-4 border-t border-gray-200">
              <span>合計</span>
              <span>¥{total.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Payment */}
        <div>
          <h2 className="text-sm tracking-widest uppercase mb-6">お支払い</h2>

          <div className="bg-[#FAFAF8] p-6 mb-6">
            <p className="text-sm text-gray-600 leading-relaxed">
              安全な決済にはStripeを使用しています。
              ご注文内容を確認の上、「Stripeで支払う」ボタンをクリックしてください。
            </p>
            <div className="flex gap-2 mt-4">
              {["VISA", "MC", "AMEX", "JCB"].map((card) => (
                <span key={card} className="px-2 py-1 text-xs border border-gray-200 text-gray-400">
                  {card}
                </span>
              ))}
            </div>
          </div>

          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 text-red-600 text-sm">
              {error}
            </div>
          )}

          <button
            onClick={handleCheckout}
            disabled={loading}
            className="w-full py-4 bg-[#C9A84C] text-white text-xs tracking-widest uppercase hover:bg-[#E8C97A] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "処理中..." : `Stripeで支払う — ¥${total.toLocaleString()}`}
          </button>

          <Link
            href="/cart"
            className="block text-center text-xs text-gray-400 mt-4 hover:text-[#1A1A1A] transition-colors"
          >
            カートに戻る
          </Link>

          <p className="text-xs text-gray-400 mt-6 text-center">
            SSL暗号化通信により安全に保護されています
          </p>
        </div>
      </div>
    </div>
  );
}
