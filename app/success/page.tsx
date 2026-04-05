"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useCartStore } from "@/lib/store";
import Link from "next/link";
import { Suspense } from "react";

type SessionInfo = {
  amount: number;
  email: string | null;
};

function SuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const clearCart = useCartStore((s) => s.clearCart);
  const [info, setInfo] = useState<SessionInfo | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!sessionId) {
      setError(true);
      return;
    }

    fetch(`/api/verify-session?session_id=${sessionId}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.error) {
          setError(true);
        } else {
          setInfo(data);
          clearCart();
        }
      })
      .catch(() => setError(true));
  }, [sessionId, clearCart]);

  if (error) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-32 text-center">
        <p className="text-gray-400 mb-8">注文情報を確認できませんでした</p>
        <Link href="/products" className="inline-block px-12 py-4 border border-[#1A1A1A] text-xs tracking-widest uppercase hover:bg-[#1A1A1A] hover:text-white transition-all">
          商品一覧へ
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-32 text-center">
      <div className="text-6xl mb-8">✦</div>
      <p className="text-xs tracking-[0.4em] uppercase text-[#C9A84C] mb-4">Order Confirmed</p>
      <h1 className="text-3xl font-light tracking-wide mb-6">
        ご注文ありがとうございます
      </h1>
      {info && (
        <div className="bg-[#FAFAF8] py-6 px-8 mb-10 text-sm text-gray-600 space-y-2">
          {info.email && <p>確認メールを <span className="text-[#1A1A1A]">{info.email}</span> 宛にお送りしました</p>}
          <p>ご請求金額: <span className="text-[#1A1A1A] font-medium">¥{info.amount.toLocaleString()}</span></p>
        </div>
      )}
      {!info && !error && (
        <p className="text-gray-400 mb-10 animate-pulse">確認中...</p>
      )}
      {info && (
        <p className="text-gray-500 leading-relaxed mb-12">
          通常3〜5営業日以内に発送いたします。
        </p>
      )}
      <Link
        href="/products"
        className="inline-block px-12 py-4 border border-[#1A1A1A] text-xs tracking-widest uppercase hover:bg-[#1A1A1A] hover:text-white transition-all"
      >
        引き続きショッピング
      </Link>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<div className="text-center py-32 text-gray-400 animate-pulse">確認中...</div>}>
      <SuccessContent />
    </Suspense>
  );
}
