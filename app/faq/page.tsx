import FaqAccordion from "@/components/FaqAccordion";

export const metadata = {
  title: "よくある質問（FAQ） | 林業家のアロマ",
  description:
    "林業家のアロマのエッセンシャルオイルに関するよくある質問をまとめました。商品の使い方、注文・配送、精油の基礎知識についてお答えします。",
  alternates: {
    canonical: "https://essential-oil-shop.vercel.app/faq",
  },
};

const faqCategories = [
  {
    title: "商品について",
    items: [
      {
        question: "エッセンシャルオイルと精油は同じですか？",
        answer:
          "はい、同じものです。植物から抽出した天然100%の芳香成分を「精油（エッセンシャルオイル）」と呼びます。",
      },
      {
        question: "使用期限はどのくらいですか？",
        answer:
          "未開封で約2年、開封後は1年以内のご使用をおすすめします。直射日光・高温多湿を避けて保管してください。",
      },
      {
        question: "肌に直接つけても大丈夫ですか？",
        answer:
          "エッセンシャルオイルは高濃度のため、原液を直接肌につけないでください。使用する場合はキャリアオイルで1〜3%に希釈してください。",
      },
      {
        question: "1mlサイズと5mlサイズで中身は同じですか？",
        answer:
          "はい、同じオイルです。1mlは約20滴分で、初めての方やお試しに最適です。",
      },
    ],
  },
  {
    title: "ご注文・配送",
    items: [
      {
        question: "送料はいくらですか？",
        answer: "全国一律800円（税込）です。",
      },
      {
        question: "届くまでどのくらいかかりますか？",
        answer: "ご注文確認後、2〜5営業日でお届けいたします。",
      },
      {
        question: "支払い方法は何がありますか？",
        answer:
          "クレジットカード（Visa、Mastercard、American Express、JCB）がご利用いただけます。",
      },
      {
        question: "ギフト包装はできますか？",
        answer:
          "現在ギフト包装は承っておりませんが、シンプルで上品なパッケージのため、そのまま贈り物としてもお使いいただけます。",
      },
    ],
  },
  {
    title: "使い方",
    items: [
      {
        question: "初心者におすすめのオイルはどれですか？",
        answer:
          "アキタスギやヒノキは馴染み深い香りで始めやすいです。迷ったら「香り診断」をお試しください。",
      },
      {
        question: "ディフューザーがなくても使えますか？",
        answer:
          "はい。ティッシュやコットンに1〜2滴垂らすだけでも香りを楽しめます。",
      },
      {
        question: "ペットがいる部屋でも使えますか？",
        answer:
          "猫や小鳥などは精油の成分に敏感な場合があります。ペットのいる空間では十分な換気を行い、ペットの様子をよく観察してください。",
      },
    ],
  },
];

export default function FaqPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-24">
      <div className="mb-16">
        <p className="text-xs tracking-[0.4em] uppercase text-[#C9A84C] mb-3">
          FAQ
        </p>
        <h1 className="text-3xl font-light tracking-wide">よくある質問</h1>
      </div>

      <FaqAccordion categories={faqCategories} />

      <p className="mt-16 text-xs text-gray-400 text-center">
        その他ご不明な点がございましたら、お気軽にメールにてお問い合わせください。
      </p>
    </div>
  );
}
