export default function Footer() {
  return (
    <footer className="bg-[#1A1A1A] text-white mt-24">
      <div className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-12">
        <div>
          <h3 className="text-lg font-light tracking-[0.2em] mb-4">林業家のアロマ</h3>
          <p className="text-gray-400 text-sm leading-relaxed">
            林業コンサルタントが届ける、<br />
            北東北の希少な天然木から抽出した<br />
            100%ピュアなエッセンシャルオイル。
          </p>
        </div>
        <div>
          <h4 className="text-sm tracking-widest uppercase text-gray-400 mb-4">Shop</h4>
          <ul className="space-y-2 text-sm text-gray-500">
            <li><a href="/products" className="hover:text-white transition-colors">すべての商品</a></li>
            <li><a href="/products?category=5ml" className="hover:text-white transition-colors">5ml シリーズ</a></li>
            <li><a href="/products?category=1ml" className="hover:text-white transition-colors">1ml シリーズ</a></li>
            <li><a href="/diagnosis" className="hover:text-white transition-colors">香り診断</a></li>
            <li><a href="/tokushoho" className="hover:text-white transition-colors">特定商取引法に基づく表記</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm tracking-widest uppercase text-gray-400 mb-4">Info</h4>
          <ul className="space-y-2 text-sm text-gray-500">
            <li>お問い合わせ: s_miyamoto@greensprout0315.com</li>
            <li>営業時間: 平日 10:00–18:00</li>
            <li>送料: 全国一律 800円</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-gray-800 py-6 text-center text-gray-600 text-xs tracking-wider">
        © {new Date().getFullYear()} AURA ESSENCE. All rights reserved.
      </div>
    </footer>
  );
}
