"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="max-w-2xl mx-auto px-6 py-32 text-center">
      <div className="text-6xl mb-6">⚠️</div>
      <h1 className="text-2xl font-light tracking-wide mb-4">
        エラーが発生しました
      </h1>
      <p className="text-gray-400 mb-10">
        {error.message || "予期しないエラーが発生しました。もう一度お試しください。"}
      </p>
      <button
        onClick={reset}
        className="inline-block px-10 py-4 bg-[#1A1A1A] text-white text-xs tracking-widest uppercase hover:bg-[#3A3A3A] transition-colors"
      >
        もう一度試す
      </button>
    </div>
  );
}
