export const metadata = {
  title: "特定商取引法に基づく表記 | 林業家のアロマ",
};

const items: { label: string; value: string | string[] }[] = [
  { label: "販売業者", value: "GreenSprout株式会社" },
  { label: "運営責任者", value: "宮本 俊輔" },
  { label: "所在地", value: "宮城県仙台市若林区沖野1-37-7" },
  { label: "電話番号", value: "080-1455-1642" },
  { label: "メールアドレス", value: "s_miyamoto@greensprout0315.com" },
  { label: "販売価格", value: "各商品ページに記載の価格（税込）" },
  {
    label: "送料",
    value: "全国一律 800円（税込）",
  },
  { label: "支払い方法", value: "クレジットカード（VISA・MasterCard・AMEX・JCB）" },
  { label: "支払い時期", value: "ご注文時にクレジットカード決済が確定します" },
  {
    label: "商品の引渡し時期",
    value: "ご注文確認後、5営業日以内に発送いたします",
  },
  {
    label: "返品・交換について",
    value: [
      "未開封・未使用品に限り、商品到着後7日以内にご連絡いただいた場合のみ対応いたします。",
      "お客様都合による返品の送料はお客様負担となります。",
      "開封済み・使用済みの商品は返品・交換をお受けできません。",
      "商品に不備・破損があった場合は、到着後7日以内にメールにてご連絡ください。",
    ],
  },
  {
    label: "キャンセルについて",
    value: "発送前のみキャンセルを承ります。発送後のキャンセルはお受けできません。",
  },
  {
    label: "動作環境",
    value: "最新版のGoogle Chrome・Safari・Firefox・Edge推奨",
  },
];

export default function TokushohoPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-24">
      <div className="mb-16">
        <p className="text-xs tracking-[0.4em] uppercase text-[#C9A84C] mb-3">Legal</p>
        <h1 className="text-3xl font-light tracking-wide">特定商取引法に基づく表記</h1>
      </div>

      <dl className="divide-y divide-gray-100">
        {items.map(({ label, value }) => (
          <div key={label} className="py-6 grid md:grid-cols-3 gap-4">
            <dt className="text-sm font-medium text-[#1A1A1A] tracking-wide">{label}</dt>
            <dd className="md:col-span-2 text-sm text-gray-600 leading-relaxed">
              {Array.isArray(value) ? (
                <ul className="space-y-1">
                  {value.map((v, i) => (
                    <li key={i}>{v}</li>
                  ))}
                </ul>
              ) : (
                value
              )}
            </dd>
          </div>
        ))}
      </dl>

      <p className="mt-16 text-xs text-gray-400 text-center">
        上記の内容は予告なく変更される場合があります。最新情報は本ページをご確認ください。
      </p>
    </div>
  );
}
