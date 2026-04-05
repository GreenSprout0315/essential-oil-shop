import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { products } from "@/lib/products";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const SYSTEM_PROMPT = `あなたはGreenSproutというエッセンシャルオイルショップの香り診断アドバイザーです。
お客様の悩みや目的を丁寧にヒアリングし、最適な精油を1〜3種提案してください。

以下の商品ラインナップから提案してください：
${products.map((p) => `- ${p.nameJa}（${p.name}）: ${p.benefits.join("、")} / ¥${p.price.toLocaleString()} / ID: ${p.id}`).join("\n")}

会話のルール：
- 丁寧でやさしい口調で話す
- 一度に多くを聞かずに、1〜2問ずつ自然な会話を進める
- 体の悩み、気分、目的、香りの好みなど必要な情報を引き出す
- 最終的な提案では商品名・おすすめ理由・使い方を簡潔に伝える
- 提案する商品のIDを必ず含める（例: [product:lavender-10ml]）`;

type Message = {
  role: "user" | "assistant";
  content: string;
};

const MOCK_RESPONSES = [
  "ありがとうございます！もう少し教えていただけますか？\nそれは主に日中に感じることが多いですか？それとも夜ですか？",
  "なるほど、そうなんですね。\n香りの好みはありますか？たとえば「甘く優雅な香り」「スッキリした森林の香り」「フレッシュで清涼感のある香り」など、どれが近いですか？",
  "わかりました！いくつかのオイルをおすすめします。\n\n**クロモジ**は甘く優雅なスズランのような香りで、高級香水と同じ主成分を持つ稀少なオイルです。リラックスと心の落ち着きに最適です。[product:kuromoji-5ml]\n\n**アオモリトドマツ**は気高く爽やかな「森の香り」で、気分のリフレッシュにぴったりです。[product:aomoritodomatsu-5ml]\n\nまずはクロモジから試してみるのがおすすめですよ！",
];

export async function POST(req: NextRequest) {
  const { messages } = await req.json() as { messages: Message[] };

  try {
    const response = await client.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      messages,
    });

    const text = response.content[0].type === "text" ? response.content[0].text : "";
    return NextResponse.json({ message: text });
  } catch {
    // API未設定・クレジット不足時はモック応答で動作確認
    const userTurns = messages.filter((m) => m.role === "user").length;
    const mock = MOCK_RESPONSES[Math.min(userTurns - 1, MOCK_RESPONSES.length - 1)];
    return NextResponse.json({ message: mock });
  }
}
