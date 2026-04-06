import Link from "next/link";
import { getFeaturedProducts } from "@/lib/products";
import ProductCard from "@/components/ProductCard";
import Image from "next/image";

export default function HomePage() {
  const featured = getFeaturedProducts();

  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center bg-[#FAFAF8]">
        <div className="max-w-6xl mx-auto px-6 w-full grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-xs tracking-[0.4em] uppercase text-[#C9A84C] mb-6">
              北東北の森から · 100% Pure · Natural
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light leading-tight tracking-wide text-[#1A1A1A] mb-6">
              森を仕事にする人が<br />届ける、香り。
            </h1>
            <p className="text-gray-500 text-lg font-light leading-relaxed mb-4 max-w-md">
              北東北の希少な天然木から抽出した<br />
              100%ピュアなエッセンシャルオイル。<br />
              芳香用アロマ雑貨として、暮らしに森の香りを。
            </p>
            {/* 小さな信頼テキスト */}
            <p className="text-xs text-gray-400 mb-8 flex items-center gap-2">
              <span className="text-[#C9A84C]">★★★★★</span>
              お客様満足度 高評価獲得中 · 全国送料一律800円
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/products"
                className="px-10 py-4 bg-[#C9A84C] text-white text-xs tracking-widest uppercase hover:bg-[#b8963f] transition-colors shadow-md"
              >
                今すぐ購入する
              </Link>
              <Link
                href="/sample-set"
                className="px-10 py-4 border border-[#1A1A1A] text-[#1A1A1A] text-xs tracking-widest uppercase hover:bg-[#1A1A1A] hover:text-white transition-all"
              >
                お試しセットを見る
              </Link>
            </div>
          </div>

          {/* Hero visual */}
          <div className="hidden md:flex justify-center items-center">
            <div className="relative w-80 h-80">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#E8C97A]/20 to-[#C9A84C]/10" />
              <div className="absolute inset-8 rounded-full bg-gradient-to-br from-[#E8C97A]/30 to-[#C9A84C]/20" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-8xl mb-2">✦</div>
                  <p className="text-xs tracking-[0.4em] uppercase text-[#C9A84C]">AURA ESSENCE</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 数字で見る信頼 */}
      <section className="py-14 bg-[#1A1A1A] text-white">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { num: "11", unit: "種類", label: "豊富なラインナップ" },
            { num: "100%", unit: "", label: "ピュア・無添加" },
            { num: "800", unit: "円", label: "全国一律送料" },
            { num: "10%", unit: "OFF", label: "初回購入特典" },
          ].map((s) => (
            <div key={s.label}>
              <p className="text-3xl font-light text-[#C9A84C]">
                {s.num}<span className="text-lg">{s.unit}</span>
              </p>
              <p className="text-xs tracking-widest text-gray-400 mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 安心ポイント */}
      <section className="py-16 border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { icon: "🌿", title: "100% ピュア", body: "添加物・香料不使用。天然木の純粋な香り。" },
            { icon: "🌲", title: "産地直送", body: "北東北の森から林業家が直接お届け。" },
            { icon: "📦", title: "送料一律800円", body: "全国どこでも同一料金。" },
            { icon: "🎁", title: "初回10%オフ", body: "メルマガ登録でクーポンをプレゼント。" },
          ].map((f) => (
            <div key={f.title} className="px-2">
              <div className="text-3xl mb-3">{f.icon}</div>
              <p className="text-sm font-medium text-[#1A1A1A] mb-1">{f.title}</p>
              <p className="text-xs text-gray-400 leading-relaxed">{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 人気商品 */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-xs tracking-[0.4em] uppercase text-[#C9A84C] mb-3">Best Sellers</p>
            <h2 className="text-3xl font-light tracking-wide">人気のオイル</h2>
            <p className="text-gray-400 text-sm mt-3">多くのお客様に選ばれているエッセンシャルオイル</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {featured.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
          <div className="text-center mt-16">
            <Link
              href="/products"
              className="inline-block px-12 py-4 border border-[#1A1A1A] text-xs tracking-widest uppercase hover:bg-[#1A1A1A] hover:text-white transition-all"
            >
              すべてのオイルを見る（11種類）
            </Link>
          </div>
        </div>
      </section>

      {/* お客様の声 */}
      <section className="py-24 bg-[#FAFAF8]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-xs tracking-[0.4em] uppercase text-[#C9A84C] mb-3">Reviews</p>
            <h2 className="text-3xl font-light tracking-wide">お客様の声</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "A.T. 様",
                rating: 5,
                product: "クロモジ 5ml",
                comment: "他では手に入らない香りです。寝る前にディフューザーで使うと、とても落ち着きます。リピート確定です。",
              },
              {
                name: "M.S. 様",
                rating: 5,
                product: "アオモリトドマツ 5ml",
                comment: "本当に森の中にいるような気分になれます。在宅ワーク中に使っていますが、集中力が全然違います。",
              },
              {
                name: "K.Y. 様",
                rating: 5,
                product: "はじめてのアロマ 4本セット",
                comment: "セットを購入して4種類試せてよかったです。林業家の方が作っているというストーリーも好きです。",
              },
            ].map((r) => (
              <div key={r.name} className="bg-white p-6 shadow-sm">
                <div className="flex gap-0.5 mb-3">
                  {[...Array(r.rating)].map((_, i) => (
                    <span key={i} className="text-[#C9A84C]">★</span>
                  ))}
                </div>
                <p className="text-sm text-gray-600 leading-relaxed mb-4">"{r.comment}"</p>
                <div className="border-t border-gray-100 pt-3">
                  <p className="text-xs font-medium text-[#1A1A1A]">{r.name}</p>
                  <p className="text-xs text-gray-400">{r.product}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* サンプルセットバナー */}
      <section className="py-20 bg-white border-y border-gray-100">
        <div className="max-w-4xl mx-auto px-6 md:flex items-center gap-12">
          <div className="flex-1 mb-8 md:mb-0">
            <p className="text-xs tracking-[0.4em] uppercase text-[#C9A84C] mb-3">Starter Set</p>
            <h2 className="text-3xl font-light tracking-wide mb-4">
              初めての方には<br />4本セットがおすすめ
            </h2>
            <p className="text-gray-500 text-sm leading-relaxed mb-6">
              クロモジ・アキタスギ・アオモリトドマツ・ニオイヒバを<br />
              1mlずつお試しいただける入門セット。<br />
              通常価格より<span className="text-[#C9A84C] font-medium">約15%オフ</span>でご提供しています。
            </p>
            <Link
              href="/sample-set"
              className="inline-block px-10 py-4 bg-[#C9A84C] text-white text-xs tracking-widest uppercase hover:bg-[#b8963f] transition-colors"
            >
              セットを見る — ¥9,900
            </Link>
          </div>
          <div className="flex-shrink-0 grid grid-cols-2 gap-2 w-48">
            {[
              "https://kitaguninomori.com/wp-content/uploads/2024/11/No1%E3%82%AF%E3%83%AD%E3%83%A2%E3%82%B8_2.jpeg",
              "https://kitaguninomori.com/wp-content/uploads/2024/11/No2%E3%82%A2%E3%82%AD%E3%82%BF%E3%82%B9%E3%82%AE_2.jpeg",
              "https://kitaguninomori.com/wp-content/uploads/2024/11/No3%E3%82%A2%E3%82%AA%E3%83%A2%E3%83%AA%E3%83%88%E3%83%89%E3%83%9E%E3%83%84_2.jpeg",
              "https://kitaguninomori.com/wp-content/uploads/2024/11/No6%E3%83%8B%E3%82%AA%E3%82%A4%E3%83%92%E3%83%90_2.jpeg",
            ].map((src, i) => (
              <div key={i} className="relative aspect-square overflow-hidden">
                <Image src={src} alt="" fill className="object-cover" sizes="96px" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner（メルマガ） */}
      <section className="bg-[#1A1A1A] text-white py-24">
        <div className="max-w-2xl mx-auto text-center px-6">
          <p className="text-xs tracking-[0.4em] uppercase text-[#C9A84C] mb-6">New Member Offer</p>
          <h2 className="text-4xl font-light tracking-wide mb-4">
            初回ご購入で<br />
            <span className="text-[#C9A84C]">10%オフ</span>
          </h2>
          <p className="text-gray-400 text-sm mb-2">メルマガ登録で特別クーポンをプレゼント</p>
          <p className="text-gray-500 text-xs mb-10">新商品・季節のおすすめ情報もいち早くお届けします</p>
          <div className="flex max-w-sm mx-auto gap-3">
            <input
              type="email"
              placeholder="メールアドレスを入力"
              className="flex-1 px-4 py-3 bg-white/10 border border-white/20 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-[#C9A84C]"
            />
            <button className="px-6 py-3 bg-[#C9A84C] text-white text-xs tracking-widest uppercase hover:bg-[#b8963f] transition-colors whitespace-nowrap">
              登録する
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
