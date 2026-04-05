import { Metadata } from "next";
import { posts, formatDate } from "@/lib/posts";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "ブログ",
  description: "エッセンシャルオイルの使い方・素材の知識・北東北の森のストーリーをお届けします。",
  alternates: {
    canonical: "https://essential-oil-shop.vercel.app/blog",
  },
};

export default function BlogPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <div className="text-center mb-16">
        <p className="text-xs tracking-[0.4em] uppercase text-[#C9A84C] mb-3">Journal</p>
        <h1 className="text-4xl font-light tracking-wide">ブログ</h1>
        <p className="text-gray-400 text-sm mt-4">
          香りの知識・使い方・北東北の森のストーリー
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-10">
        {posts.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`} className="group block">
            <div className="relative aspect-[4/3] overflow-hidden bg-[#FAFAF8] mb-5">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
            <p className="text-xs tracking-widest uppercase text-[#C9A84C] mb-2">
              {post.category}
            </p>
            <h2 className="text-base font-light tracking-wide leading-snug mb-2 group-hover:text-[#C9A84C] transition-colors">
              {post.title}
            </h2>
            <p className="text-xs text-gray-400 leading-relaxed line-clamp-2 mb-3">
              {post.excerpt}
            </p>
            <p className="text-xs text-gray-300">{formatDate(post.date)}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
