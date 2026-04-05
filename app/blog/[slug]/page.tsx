import { notFound } from "next/navigation";
import { getPostBySlug, posts, formatDate } from "@/lib/posts";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [{ url: post.image }],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [post.image],
    },
    alternates: {
      canonical: `https://essential-oil-shop.vercel.app/blog/${slug}`,
    },
  };
}

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  // 他の記事（現在の記事以外）
  const related = posts.filter((p) => p.slug !== slug).slice(0, 2);

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <Link
        href="/blog"
        className="text-xs tracking-widest uppercase text-gray-400 hover:text-[#1A1A1A] transition-colors mb-12 inline-flex items-center gap-2"
      >
        ← ブログ一覧に戻る
      </Link>

      <div className="mt-8">
        <p className="text-xs tracking-widest uppercase text-[#C9A84C] mb-4">
          {post.category}
        </p>
        <h1 className="text-3xl font-light tracking-wide leading-snug mb-4">
          {post.title}
        </h1>
        <p className="text-xs text-gray-400 mb-10">{formatDate(post.date)}</p>

        <div className="relative aspect-[16/9] overflow-hidden bg-[#FAFAF8] mb-12">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, 800px"
          />
        </div>

        {/* 本文 */}
        <div className="prose prose-sm max-w-none text-gray-600 leading-relaxed space-y-6">
          {post.content.split("\n\n").map((block, i) => {
            if (block.startsWith("## ")) {
              return (
                <h2
                  key={i}
                  className="text-xl font-light tracking-wide text-[#1A1A1A] mt-10 mb-4 pt-6 border-t border-gray-100"
                >
                  {block.replace("## ", "")}
                </h2>
              );
            }
            if (block.startsWith("### ")) {
              return (
                <h3
                  key={i}
                  className="text-base font-medium tracking-wide text-[#1A1A1A] mt-6 mb-2"
                >
                  {block.replace("### ", "")}
                </h3>
              );
            }
            if (block.startsWith("**") && block.endsWith("**")) {
              return (
                <p key={i} className="font-medium text-[#1A1A1A]">
                  {block.replace(/\*\*/g, "")}
                </p>
              );
            }
            if (block.startsWith("- ")) {
              const items = block.split("\n").filter((l) => l.startsWith("- "));
              return (
                <ul key={i} className="list-disc list-inside space-y-1 text-gray-600">
                  {items.map((item, j) => (
                    <li key={j}>{item.replace(/^- /, "").replace(/\*\*/g, "")}</li>
                  ))}
                </ul>
              );
            }
            // インライン **bold** を処理
            const parts = block.split(/(\*\*[^*]+\*\*)/g);
            return (
              <p key={i} className="leading-relaxed">
                {parts.map((part, j) =>
                  part.startsWith("**") && part.endsWith("**") ? (
                    <strong key={j} className="font-medium text-[#1A1A1A]">
                      {part.replace(/\*\*/g, "")}
                    </strong>
                  ) : (
                    part
                  )
                )}
              </p>
            );
          })}
        </div>
      </div>

      {/* 関連記事 */}
      {related.length > 0 && (
        <div className="mt-20 border-t border-gray-100 pt-12">
          <p className="text-xs tracking-[0.4em] uppercase text-[#C9A84C] mb-8">
            Related Articles
          </p>
          <div className="grid md:grid-cols-2 gap-8">
            {related.map((r) => (
              <Link key={r.slug} href={`/blog/${r.slug}`} className="group block">
                <div className="relative aspect-[4/3] overflow-hidden bg-[#FAFAF8] mb-4">
                  <Image
                    src={r.image}
                    alt={r.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 300px"
                  />
                </div>
                <p className="text-xs tracking-widest uppercase text-[#C9A84C] mb-1">
                  {r.category}
                </p>
                <h3 className="text-sm font-light tracking-wide group-hover:text-[#C9A84C] transition-colors">
                  {r.title}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* CTA */}
      <div className="mt-16 p-8 bg-[#FAFAF8] text-center">
        <p className="text-xs tracking-[0.4em] uppercase text-[#C9A84C] mb-3">Shop</p>
        <p className="text-lg font-light tracking-wide mb-6">北東北産エッセンシャルオイルを見る</p>
        <Link
          href="/products"
          className="inline-block px-10 py-3 bg-[#1A1A1A] text-white text-xs tracking-widest uppercase hover:bg-[#3A3A3A] transition-colors"
        >
          商品一覧へ
        </Link>
      </div>
    </div>
  );
}
