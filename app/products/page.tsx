import { Metadata } from "next";
import ProductsClient from "@/components/ProductsClient";

export const metadata: Metadata = {
  title: "エッセンシャルオイル一覧",
  description: "クロモジ・アキタスギ・アオモリトドマツなど、北東北産天然木から抽出した100%ピュアなエッセンシャルオイルを11種類取り揃えています。5mlと1mlサイズをご用意。",
  alternates: {
    canonical: "https://essential-oil-shop.vercel.app/products",
  },
};

export default function ProductsPage() {
  return <ProductsClient />;
}
