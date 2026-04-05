import { notFound } from "next/navigation";
import { getProductById, products } from "@/lib/products";
import { Metadata } from "next";
import ProductDetailClient from "@/components/ProductDetailClient";

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const product = getProductById(id);
  if (!product) return {};

  const title = `${product.nameJa}（${product.name}）${product.size} | 林業家のアロマ`;
  const description = `${product.description} ¥${product.price.toLocaleString()}（税込）。北東北産100%ピュアエッセンシャルオイル。`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [{ url: product.image, width: 800, height: 800, alt: product.nameJa }],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [product.image],
    },
  };
}

export function generateStaticParams() {
  return products.map((p) => ({ id: p.id }));
}

export default async function ProductDetailPage({ params }: Props) {
  const { id } = await params;
  const product = getProductById(id);
  if (!product) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${product.nameJa}（${product.name}）`,
    description: product.description,
    image: product.image,
    brand: { "@type": "Brand", name: "林業家のアロマ" },
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: "JPY",
      availability: "https://schema.org/InStock",
      url: `https://essential-oil-shop.vercel.app/products/${product.id}`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProductDetailClient product={product} />
    </>
  );
}
