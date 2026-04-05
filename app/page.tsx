import Link from "next/link";
import { getFeaturedProducts } from "@/lib/products";
import ProductCard from "@/components/ProductCard";

export default function HomePage() {
  const featured = getFeaturedProducts();

  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-[85vh] flex items-center bg-[#FAFAF8]">
        <div className="max-w-6xl mx-auto px-6 w-full grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-xs tracking-[0.4em] uppercase text-[#C9A84C] mb-6">北東北の森から · 100% Pure · Natural</p>
            <h1 className="text-5xl md:text-6xl font-light leading-tight tracking-wide text-[#1A1A1A] mb-8">
              森を仕事にする人が、<br />届ける香り。
            </h1>
            <p className="text-gray-500 text-lg font-light leading-relaxed mb-10 max-w-md">
              北東北の希少な天然木から抽出した<br />
              100%ピュアなエッセンシャルオイル。<br />
              芳香用アロマ雑貨として、暮らしに森の香りを。
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/products"
                className="px-10 py-4 bg-[#1A1A1A] text-white text-xs tracking-widest uppercase hover:bg-[#3A3A3A] transition-colors"
              >
                コレクションを見る
              </Link>
              <Link
                href="/diagnosis"
                className="px-10 py-4 border border-[#C9A84C] text-[#C9A84C] text-xs tracking-widest uppercase hover:bg-[#C9A84C] hover:text-white transition-all"
              >
                🌿 香り診断
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

      {/* Features strip */}
      <section className="py-16 border-y border-gray-100">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { icon: "🌿", label: "100% ピュア" },
            { icon: "🌲", label: "北東北産天然木" },
            { icon: "📦", label: "送料 800円（全国一律）" },
            { icon: "🏔️", label: "林業家が直接届ける" },
          ].map((f) => (
            <div key={f.label}>
              <div className="text-3xl mb-2">{f.icon}</div>
              <p className="text-xs tracking-widest uppercase text-gray-500">{f.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-xs tracking-[0.4em] uppercase text-[#C9A84C] mb-3">Our Selection</p>
            <h2 className="text-3xl font-light tracking-wide">人気のオイル</h2>
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
              すべてのオイルを見る
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-[#1A1A1A] text-white py-24">
        <div className="max-w-2xl mx-auto text-center px-6">
          <p className="text-xs tracking-[0.4em] uppercase text-[#C9A84C] mb-6">New Member Offer</p>
          <h2 className="text-4xl font-light tracking-wide mb-6">
            初回ご購入で<br />
            <span className="text-[#C9A84C]">10%オフ</span>
          </h2>
          <p className="text-gray-400 mb-10">メルマガ登録で特別クーポンをプレゼント</p>
          <div className="flex max-w-sm mx-auto gap-3">
            <input
              type="email"
              placeholder="メールアドレス"
              className="flex-1 px-4 py-3 bg-white/10 border border-white/20 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-[#C9A84C]"
            />
            <button className="px-6 py-3 bg-[#C9A84C] text-white text-xs tracking-widest uppercase hover:bg-[#E8C97A] transition-colors">
              登録
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
