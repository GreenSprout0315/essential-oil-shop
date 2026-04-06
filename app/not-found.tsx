import Link from "next/link";

export default function NotFound() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-32 text-center">
      <div className="text-6xl mb-6">🌲</div>
      <h1 className="text-2xl font-light tracking-wide mb-4">
        ページが見つかりません
      </h1>
      <p className="text-gray-400 mb-10">
        お探しのページは存在しないか、移動した可能性があります。
      </p>
      <Link
        href="/"
        className="inline-block px-10 py-4 bg-[#1A1A1A] text-white text-xs tracking-widest uppercase hover:bg-[#3A3A3A] transition-colors"
      >
        ホームに戻る
      </Link>
    </div>
  );
}
