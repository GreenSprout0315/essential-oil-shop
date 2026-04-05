"use client";
import { useState, useEffect } from "react";

type Review = {
  id: string;
  name: string;
  rating: number;
  comment: string;
  date: string;
};

export default function ReviewSection({ productId }: { productId: string }) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [name, setName] = useState("");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [hoverRating, setHoverRating] = useState(0);

  useEffect(() => {
    const stored = localStorage.getItem(`reviews-${productId}`);
    if (stored) setReviews(JSON.parse(stored));
  }, [productId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !comment.trim()) return;

    const newReview: Review = {
      id: Date.now().toString(),
      name: name.trim(),
      rating,
      comment: comment.trim(),
      date: new Date().toLocaleDateString("ja-JP"),
    };

    const updated = [newReview, ...reviews];
    setReviews(updated);
    localStorage.setItem(`reviews-${productId}`, JSON.stringify(updated));
    setName("");
    setComment("");
    setRating(5);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  const averageRating =
    reviews.length > 0
      ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
      : null;

  return (
    <div className="mt-16 border-t border-gray-100 pt-12">
      <h2 className="text-xs tracking-[0.4em] uppercase text-[#C9A84C] mb-6">
        Customer Reviews
      </h2>

      {/* 平均評価 */}
      {averageRating && (
        <div className="flex items-center gap-3 mb-8">
          <span className="text-4xl font-light">{averageRating}</span>
          <div>
            <div className="flex gap-0.5">
              {[1, 2, 3, 4, 5].map((s) => (
                <span
                  key={s}
                  className={`text-lg ${
                    s <= Math.round(parseFloat(averageRating))
                      ? "text-[#C9A84C]"
                      : "text-gray-200"
                  }`}
                >
                  ★
                </span>
              ))}
            </div>
            <p className="text-xs text-gray-400 mt-1">{reviews.length}件のレビュー</p>
          </div>
        </div>
      )}

      {/* レビュー一覧 */}
      {reviews.length > 0 ? (
        <div className="space-y-6 mb-12">
          {reviews.map((review) => (
            <div key={review.id} className="bg-[#FAFAF8] p-5">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium tracking-wide">{review.name}</span>
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <span
                        key={s}
                        className={`text-sm ${s <= review.rating ? "text-[#C9A84C]" : "text-gray-200"}`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                </div>
                <span className="text-xs text-gray-400">{review.date}</span>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">{review.comment}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-gray-400 mb-12">まだレビューがありません。最初のレビューを書いてみましょう。</p>
      )}

      {/* レビュー投稿フォーム */}
      <div className="border-t border-gray-100 pt-8">
        <h3 className="text-xs tracking-[0.3em] uppercase text-gray-500 mb-6">
          レビューを書く
        </h3>

        {submitted && (
          <div className="mb-4 p-3 bg-green-50 text-green-700 text-xs tracking-wider">
            レビューを投稿しました。ありがとうございます。
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs tracking-widest uppercase text-gray-400 mb-2">
              お名前
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="山田 太郎"
              required
              className="w-full border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-[#C9A84C] bg-white"
            />
          </div>

          <div>
            <label className="block text-xs tracking-widest uppercase text-gray-400 mb-2">
              評価
            </label>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setRating(s)}
                  onMouseEnter={() => setHoverRating(s)}
                  onMouseLeave={() => setHoverRating(0)}
                  className={`text-2xl transition-colors ${
                    s <= (hoverRating || rating) ? "text-[#C9A84C]" : "text-gray-200"
                  }`}
                >
                  ★
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs tracking-widest uppercase text-gray-400 mb-2">
              コメント
            </label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="香りの感想や使用シーンをお聞かせください"
              required
              rows={4}
              className="w-full border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-[#C9A84C] bg-white resize-none"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-[#1A1A1A] text-white text-xs tracking-widest uppercase hover:bg-[#3A3A3A] transition-colors"
          >
            レビューを投稿する
          </button>
        </form>
      </div>
    </div>
  );
}
