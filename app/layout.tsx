import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartToast from "@/components/CartToast";

const siteUrl = "https://essential-oil-shop.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "林業家のアロマ | 北東北産天然木エッセンシャルオイル専門店",
    template: "%s | 林業家のアロマ",
  },
  description: "林業コンサルタントが届ける、北東北の希少な天然木から抽出した100%ピュアなエッセンシャルオイル専門店。クロモジ・アキタスギ・アオモリトドマツなど11種類を取り揃えています。",
  openGraph: {
    type: "website",
    locale: "ja_JP",
    url: siteUrl,
    siteName: "林業家のアロマ",
    title: "林業家のアロマ | 北東北産天然木エッセンシャルオイル専門店",
    description: "林業コンサルタントが届ける、北東北産100%ピュアなエッセンシャルオイル専門店。",
  },
  twitter: {
    card: "summary_large_image",
    title: "林業家のアロマ | 北東北産天然木エッセンシャルオイル専門店",
    description: "林業コンサルタントが届ける、北東北産100%ピュアなエッセンシャルオイル専門店。",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: {
    canonical: siteUrl,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className="h-full">
      <body className="min-h-full flex flex-col antialiased">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <CartToast />
      </body>
    </html>
  );
}
