import { Metadata } from "next";
import SampleSetClient from "@/components/SampleSetClient";

export const metadata: Metadata = {
  title: "はじめてのアロマ 4本セット",
  description:
    "北東北を代表する4種のエッセンシャルオイルを1mlずつ詰め合わせた入門セット。クロモジ・アキタスギ・アオモリトドマツ・ニオイヒバを通常より約15%オフでお試しいただけます。",
  alternates: {
    canonical: "https://essential-oil-shop.vercel.app/sample-set",
  },
};

export default function SampleSetPage() {
  return <SampleSetClient />;
}
