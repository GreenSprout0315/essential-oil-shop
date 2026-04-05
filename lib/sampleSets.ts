import type { Product } from "./products";

// サンプルセットはカートに追加できるよう Product 型に合わせて定義
export const sampleSetProduct: Product = {
  id: "sample-set-4",
  number: 0,
  name: "Sample Set",
  nameJa: "はじめてのアロマ 4本セット",
  description:
    "北東北を代表する4種のエッセンシャルオイルを1mlずつ詰め合わせた入門セット。クロモジ・アキタスギ・アオモリトドマツ・ニオイヒバ、それぞれ異なる個性をお試しください。",
  price: 9900,
  category: "set",
  benefits: ["4種類お試し", "送料込み", "ギフトにも"],
  size: "1ml × 4本",
  image:
    "https://kitaguninomori.com/wp-content/uploads/2024/11/No1%E3%82%AF%E3%83%AD%E3%83%A2%E3%82%B8_2.jpeg",
  featured: false,
};

// セットに含まれる商品の情報（表示用）
export const sampleSetItems = [
  {
    id: "kuromoji-1ml",
    nameJa: "クロモジ",
    name: "Kuromoji",
    description: "スズランのような甘く優雅な香り",
    price: 4400,
    image:
      "https://kitaguninomori.com/wp-content/uploads/2024/11/No1%E3%82%AF%E3%83%AD%E3%83%A2%E3%82%B8_2.jpeg",
  },
  {
    id: "akitasugi-1ml",
    nameJa: "アキタスギ",
    name: "Akita Sugi",
    description: "懐かしい杉の香りで安らぎを感じさせる",
    price: 1848,
    image:
      "https://kitaguninomori.com/wp-content/uploads/2024/11/No2%E3%82%A2%E3%82%AD%E3%82%BF%E3%82%B9%E3%82%AE_2.jpeg",
  },
  {
    id: "aomoritodomatsu-1ml",
    nameJa: "アオモリトドマツ",
    name: "Aomori Todomatsu",
    description: "気高く爽やかで凛とした森の香り",
    price: 3300,
    image:
      "https://kitaguninomori.com/wp-content/uploads/2024/11/No3%E3%82%A2%E3%82%AA%E3%83%A2%E3%83%AA%E3%83%88%E3%83%89%E3%83%9E%E3%83%84_2.jpeg",
  },
  {
    id: "nioihiba-1ml",
    nameJa: "ニオイヒバ",
    name: "Nioi Hiba",
    description: "きりりとした清涼感が特徴",
    price: 2156,
    image:
      "https://kitaguninomori.com/wp-content/uploads/2024/11/No6%E3%83%8B%E3%82%AA%E3%82%A4%E3%83%92%E3%83%90_2.jpeg",
  },
];

export const sampleSetOriginalPrice = sampleSetItems.reduce(
  (sum, item) => sum + item.price,
  0
); // 11,704
