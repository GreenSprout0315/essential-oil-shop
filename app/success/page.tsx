"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useCartStore } from "@/lib/store";
import Link from "next/link";
import Image from "next/image";
import { Suspense } from "react";
import { getFeaturedProducts } from "@/lib/products";

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

  const featuredProducts = getFeaturedProducts().slice(0, 3);

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

  const siteUrl = "https://essential-oil-shop.vercel.app";
  const shareText = "北東北の森から届く、100%ピュアなエッセンシャルオイルを購入しました。森の香りに癒されています。";
  const xShareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(siteUrl)}`;

  return (
    <div className="max-w-4xl mx-auto px-6 py-32">
      {/* 購入完了メッセージ */}
      <div className="text-center mb-16">
        <div className="text-6xl mb-8">✦</div>
        <p className="text-xs tracking-[0.4em] uppercase text-[#C9A84C] mb-4">Order Confirmed</p>
        <h1 className="text-3xl font-light tracking-wide mb-6 text-[#1A1A1A]">
          ご注文ありがとうございます
        </h1>
        <p className="text-gray-500 font-light leading-relaxed mb-6 max-w-lg mx-auto">
          北東北の森の恵みをお届けできることを、心より嬉しく思います。<br />
          お手元に届くまで、どうぞお楽しみにお待ちください。
        </p>
        {info && (
          <div className="bg-[#FAFAF8] py-6 px-8 mb-6 text-sm text-gray-600 space-y-2 max-w-lg mx-auto">
            {info.email && <p>確認メールを <span className="text-[#1A1A1A]">{info.email}</span> 宛にお送りしました</p>}
            <p>ご請求金額: <span className="text-[#1A1A1A] font-medium">¥{info.amount.toLocaleString()}</span></p>
          </div>
        )}
        {!info && !error && (
          <p className="text-gray-400 mb-6 animate-pulse">確認中...</p>
        )}
        {info && (
          <p className="text-gray-500 text-sm leading-relaxed">
            通常3〜5営業日以内に発送いたします。
          </p>
        )}
      </div>

      {/* おすすめ商品セクション */}
      <section className="mb-20">
        <div className="text-center mb-10">
          <p className="text-xs tracking-[0.4em] uppercase text-[#C9A84C] mb-3">Recommended</p>
          <h2 className="text-2xl font-light tracking-wide text-[#1A1A1A]">こちらもおすすめ</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {featuredProducts.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.id}`}
              className="group block"
            >
              <div className="relative overflow-hidden bg-[#FAFAF8] aspect-square mb-4">
                <Image
                  src={product.image}
                  alt={product.nameJa}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <p className="text-[10px] text-[#C9A84C] tracking-widest uppercase mb-1">
                {product.category}
              </p>
              <h3 className="font-light text-base tracking-wide group-hover:text-[#C9A84C] transition-colors leading-snug">
                {product.name}
              </h3>
              <p className="text-xs text-gray-400 mb-2">{product.nameJa}</p>
              <p className="text-lg font-light text-[#1A1A1A]">
                ¥{product.price.toLocaleString()}
                <span className="text-xs text-gray-400 ml-1">(税込)</span>
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* 次のアクションCTA */}
      <section className="mb-20">
        <div className="text-center mb-10">
          <p className="text-xs tracking-[0.4em] uppercase text-[#C9A84C] mb-3">Next Step</p>
          <h2 className="text-2xl font-light tracking-wide text-[#1A1A1A]">もっと楽しむ</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <Link
            href="/products"
            className="group block border border-gray-200 p-8 text-center hover:border-[#C9A84C] transition-colors"
          >
            <div className="text-3xl mb-4">🌲</div>
            <h3 className="font-light text-base tracking-wide mb-2 text-[#1A1A1A] group-hover:text-[#C9A84C] transition-colors">
              商品一覧を見る
            </h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              11種類のエッセンシャルオイルから<br />お気に入りを見つけてください
            </p>
          </Link>
          <Link
            href="/diagnosis"
            className="group block border border-gray-200 p-8 text-center hover:border-[#C9A84C] transition-colors"
          >
            <div className="text-3xl mb-4">✨</div>
            <h3 className="font-light text-base tracking-wide mb-2 text-[#1A1A1A] group-hover:text-[#C9A84C] transition-colors">
              香り診断を試す
            </h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              あなたにぴったりの香りを<br />AIがご提案します
            </p>
          </Link>
          <Link
            href="/blog"
            className="group block border border-gray-200 p-8 text-center hover:border-[#C9A84C] transition-colors"
          >
            <div className="text-3xl mb-4">📖</div>
            <h3 className="font-light text-base tracking-wide mb-2 text-[#1A1A1A] group-hover:text-[#C9A84C] transition-colors">
              ブログを読む
            </h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              アロマの楽しみ方や<br />森の物語をお届けします
            </p>
          </Link>
        </div>
      </section>

      {/* SNSシェア誘導 */}
      <section className="text-center mb-16">
        <p className="text-xs tracking-[0.4em] uppercase text-[#C9A84C] mb-6">Share</p>
        <p className="text-gray-500 font-light mb-6">購入をシェアする</p>
        <div className="flex justify-center gap-6">
          <a
            href="https://www.instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 border border-gray-200 text-xs tracking-widest uppercase text-gray-600 hover:border-[#C9A84C] hover:text-[#C9A84C] transition-all"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
            </svg>
            Instagram
          </a>
          <a
            href={xShareUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 border border-gray-200 text-xs tracking-widest uppercase text-gray-600 hover:border-[#C9A84C] hover:text-[#C9A84C] transition-all"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
            X (Twitter)
          </a>
        </div>
      </section>

      {/* トップに戻るリンク */}
      <div className="text-center">
        <Link
          href="/"
          className="inline-block text-xs tracking-widest uppercase text-gray-400 hover:text-[#C9A84C] transition-colors"
        >
          トップページに戻る
        </Link>
      </div>
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
