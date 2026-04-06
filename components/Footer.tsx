export default function Footer() {
  return (
    <footer className="bg-[#1A1A1A] text-white mt-24">
      <div className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="md:col-span-1">
          <h3 className="text-lg font-light tracking-[0.2em] mb-4">林業家のアロマ</h3>
          <p className="text-gray-400 text-sm leading-relaxed mb-6">
            林業コンサルタントが届ける、<br />
            北東北の希少な天然木から抽出した<br />
            100%ピュアなエッセンシャルオイル。
          </p>
          {/* SNSリンク */}
          <div className="flex gap-4">
            <a
              href="https://www.instagram.com/greensprout0315/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-[#C9A84C] transition-colors"
              aria-label="Instagram"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
            <a
              href="https://x.com/greensprout0315"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-[#C9A84C] transition-colors"
              aria-label="X (Twitter)"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.259 5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
          </div>
        </div>

        <div>
          <h4 className="text-sm tracking-widest uppercase text-gray-400 mb-4">Shop</h4>
          <ul className="space-y-2 text-sm text-gray-500">
            <li><a href="/products" className="hover:text-white transition-colors">すべての商品</a></li>
            <li><a href="/products?category=5ml" className="hover:text-white transition-colors">5ml シリーズ</a></li>
            <li><a href="/products?category=1ml" className="hover:text-white transition-colors">1ml シリーズ</a></li>
            <li><a href="/sample-set" className="hover:text-white transition-colors">はじめてのセット</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm tracking-widest uppercase text-gray-400 mb-4">Guide</h4>
          <ul className="space-y-2 text-sm text-gray-500">
            <li><a href="/diagnosis" className="hover:text-white transition-colors">香り診断</a></li>
            <li><a href="/blog" className="hover:text-white transition-colors">ブログ</a></li>
            <li><a href="/tokushoho" className="hover:text-white transition-colors">特定商取引法に基づく表記</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm tracking-widest uppercase text-gray-400 mb-4">Info</h4>
          <ul className="space-y-3 text-sm text-gray-500">
            <li>
              <span className="text-gray-400 block text-xs mb-0.5">お問い合わせ</span>
              s_miyamoto@greensprout0315.com
            </li>
            <li>
              <span className="text-gray-400 block text-xs mb-0.5">営業時間</span>
              平日 10:00–18:00
            </li>
            <li>
              <span className="text-gray-400 block text-xs mb-0.5">送料</span>
              全国一律 800円
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-gray-800 py-6 text-center text-gray-600 text-xs tracking-wider">
        © {new Date().getFullYear()} 林業家のアロマ. All rights reserved.
      </div>
    </footer>
  );
}
