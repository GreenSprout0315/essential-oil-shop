"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { products, Product } from "@/lib/products";

// ─── クイック診断ロジック ───

type Question = {
  label: string;
  options: { text: string; tags: string[] }[];
};

const QUESTIONS: Question[] = [
  {
    label: "今の気分は？",
    options: [
      { text: "リラックスしたい", tags: ["安らぎ", "リラックス"] },
      { text: "気分をリフレッシュしたい", tags: ["リフレッシュ", "フレッシュ"] },
      { text: "集中力を高めたい", tags: ["集中力UP", "清涼感"] },
      { text: "癒されたい", tags: ["甘く優雅な香り", "高級感"] },
    ],
  },
  {
    label: "どんなシーンで使いたい？",
    options: [
      { text: "寝室でぐっすり眠りたい", tags: ["安らぎ", "リラックス", "甘く優雅な香り"] },
      { text: "仕事や勉強に集中したい", tags: ["集中力UP", "清涼感", "フレッシュ"] },
      { text: "お部屋の空気をきれいにしたい", tags: ["消臭", "フレッシュ"] },
      { text: "森の中にいるような気分になりたい", tags: ["森林浴", "凛とした香り"] },
    ],
  },
  {
    label: "好きな香りのタイプは？",
    options: [
      { text: "甘く華やかな花のような香り", tags: ["甘く優雅な香り", "高級感"] },
      { text: "すっきり爽やかな香り", tags: ["清涼感", "爽やかな香り", "リフレッシュ"] },
      { text: "落ち着く木の温もりの香り", tags: ["安らぎ", "森林浴", "リラックス"] },
      { text: "フルーティーで明るい香り", tags: ["柑橘系", "すっきり", "爽やか"] },
    ],
  },
];

function scoreProducts(selectedTags: string[]): Product[] {
  const fivemlProducts = products.filter((p) => p.category === "5ml");
  const scored = fivemlProducts.map((p) => {
    const score = p.benefits.reduce(
      (sum, b) => sum + (selectedTags.includes(b) ? 1 : 0),
      0
    );
    return { product: p, score };
  });
  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, 3).map((s) => s.product);
}

// ─── AIチャット診断 ───

type Message = {
  role: "user" | "assistant";
  content: string;
};

const INITIAL_MESSAGE: Message = {
  role: "assistant",
  content: "こんにちは！GreenSproutの香り診断へようこそ🌿\n\nあなたにぴったりのエッセンシャルオイルをご提案します。\n\nまず、今どんな気分や体の状態ですか？気軽に教えてください！",
};

function parseProducts(text: string) {
  const ids = [...text.matchAll(/\[product:([^\]]+)\]/g)].map((m) => m[1]);
  return ids.map((id) => products.find((p) => p.id === id)).filter(Boolean);
}

function MessageBubble({ message }: { message: Message }) {
  const isUser = message.role === "user";
  const cleanText = message.content.replace(/\[product:[^\]]+\]/g, "").trim();
  const suggestedProducts = parseProducts(message.content);

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-4`}>
      <div className={`max-w-[80%] ${isUser ? "order-2" : "order-1"}`}>
        {!isUser && (
          <div className="text-xs text-[#C9A84C] tracking-widest uppercase mb-1">Advisor</div>
        )}
        <div
          className={`px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap ${
            isUser
              ? "bg-[#1A1A1A] text-white"
              : "bg-[#FAFAF8] border border-gray-100 text-[#1A1A1A]"
          }`}
        >
          {cleanText}
        </div>

        {suggestedProducts.length > 0 && (
          <div className="mt-3 space-y-2">
            {suggestedProducts.map((p) => p && (
              <Link
                key={p.id}
                href={`/products/${p.id}`}
                className="flex items-center gap-3 border border-[#C9A84C]/40 px-4 py-3 hover:bg-[#C9A84C]/5 transition-colors"
              >
                <div className="text-2xl">🌿</div>
                <div>
                  <p className="text-sm font-medium text-[#1A1A1A]">{p.nameJa}</p>
                  <p className="text-xs text-gray-400">¥{p.price.toLocaleString()} · {p.benefits.slice(0, 2).join(" · ")}</p>
                </div>
                <div className="ml-auto text-xs text-[#C9A84C] tracking-widest uppercase">詳細 →</div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── クイック診断コンポーネント ───

function QuickDiagnosis({ onSwitchToChat }: { onSwitchToChat: () => void }) {
  const [step, setStep] = useState(0);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [results, setResults] = useState<Product[] | null>(null);

  function handleSelect(tags: string[]) {
    const newTags = [...selectedTags, ...tags];
    setSelectedTags(newTags);

    if (step + 1 < QUESTIONS.length) {
      setStep(step + 1);
    } else {
      setResults(scoreProducts(newTags));
    }
  }

  function handleReset() {
    setStep(0);
    setSelectedTags([]);
    setResults(null);
  }

  if (results) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-12">
        <div className="text-center mb-10">
          <p className="text-xs tracking-[0.4em] uppercase text-[#C9A84C] mb-3">Your Results</p>
          <h2 className="text-2xl font-light tracking-wide mb-2">あなたにおすすめの香り</h2>
          <p className="text-sm text-gray-400">あなたの好みにぴったりのオイルを見つけました</p>
        </div>

        <div className="space-y-4 mb-10">
          {results.map((p, i) => (
            <Link
              key={p.id}
              href={`/products/${p.id}`}
              className="flex items-center gap-4 border border-gray-200 p-4 hover:border-[#C9A84C] transition-colors group"
            >
              <div className="relative w-20 h-20 flex-shrink-0 bg-[#FAFAF8] overflow-hidden">
                <Image
                  src={p.image}
                  alt={p.nameJa}
                  fill
                  className="object-cover"
                  sizes="80px"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  {i === 0 && (
                    <span className="text-[10px] tracking-widest uppercase bg-[#C9A84C] text-white px-2 py-0.5">
                      Best Match
                    </span>
                  )}
                  <p className="text-base font-light text-[#1A1A1A]">{p.nameJa}</p>
                </div>
                <p className="text-xs text-gray-400 mb-1 line-clamp-1">{p.description}</p>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-[#1A1A1A]">¥{p.price.toLocaleString()}</span>
                  <span className="text-xs text-gray-300">|</span>
                  <span className="text-xs text-gray-400">{p.benefits.join(" · ")}</span>
                </div>
              </div>
              <div className="text-xs text-[#C9A84C] tracking-widest uppercase group-hover:translate-x-1 transition-transform">
                詳細 →
              </div>
            </Link>
          ))}
        </div>

        {/* 1mlお試し提案 */}
        <div className="bg-[#FAFAF8] p-6 mb-8 text-center">
          <p className="text-sm text-[#1A1A1A] mb-2">まずは少量から試してみたい方へ</p>
          <p className="text-xs text-gray-400 mb-4">すべてのオイルに手軽な1mlサイズもあります</p>
          <Link
            href="/products?category=1ml"
            className="inline-block px-6 py-2 border border-[#C9A84C] text-[#C9A84C] text-xs tracking-widest uppercase hover:bg-[#C9A84C] hover:text-white transition-colors"
          >
            1mlシリーズを見る
          </Link>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={handleReset}
            className="flex-1 px-6 py-3 border border-gray-200 text-sm text-gray-600 hover:border-[#1A1A1A] hover:text-[#1A1A1A] transition-colors"
          >
            もう一度診断する
          </button>
          <button
            onClick={onSwitchToChat}
            className="flex-1 px-6 py-3 bg-[#1A1A1A] text-white text-sm hover:bg-[#3A3A3A] transition-colors"
          >
            AIアドバイザーに相談する
          </button>
        </div>
      </div>
    );
  }

  const question = QUESTIONS[step];

  return (
    <div className="max-w-2xl mx-auto px-6 py-12">
      {/* プログレス */}
      <div className="flex items-center gap-2 mb-10">
        {QUESTIONS.map((_, i) => (
          <div
            key={i}
            className={`h-0.5 flex-1 transition-colors ${
              i <= step ? "bg-[#C9A84C]" : "bg-gray-200"
            }`}
          />
        ))}
      </div>

      <p className="text-xs tracking-[0.4em] uppercase text-[#C9A84C] mb-3">
        Question {step + 1} / {QUESTIONS.length}
      </p>
      <h2 className="text-2xl font-light tracking-wide mb-8">{question.label}</h2>

      <div className="grid gap-3">
        {question.options.map((opt) => (
          <button
            key={opt.text}
            onClick={() => handleSelect(opt.tags)}
            className="text-left px-5 py-4 border border-gray-200 text-sm text-[#1A1A1A] hover:border-[#C9A84C] hover:bg-[#C9A84C]/5 transition-colors"
          >
            {opt.text}
          </button>
        ))}
      </div>

      <div className="mt-8 text-center">
        <button
          onClick={onSwitchToChat}
          className="text-xs text-gray-400 hover:text-[#C9A84C] transition-colors tracking-widest uppercase"
        >
          AIアドバイザーに自由に相談する →
        </button>
      </div>
    </div>
  );
}

// ─── AIチャットコンポーネント ───

function ChatDiagnosis({ onSwitchToQuick }: { onSwitchToQuick: () => void }) {
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  async function send() {
    const text = input.trim();
    if (!text || loading) return;

    const userMessage: Message = { role: "user", content: text };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/diagnosis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });
      const data = await res.json();
      if (data.message) {
        setMessages([...newMessages, { role: "assistant", content: data.message }]);
      }
    } finally {
      setLoading(false);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  }

  return (
    <div className="flex flex-col flex-1">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-6 py-8">
        <div className="max-w-2xl mx-auto">
          {messages.map((m, i) => (
            <MessageBubble key={i} message={m} />
          ))}
          {loading && (
            <div className="flex justify-start mb-4">
              <div className="bg-[#FAFAF8] border border-gray-100 px-4 py-3 text-sm text-gray-400">
                <span className="animate-pulse">考え中...</span>
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>
      </div>

      {/* Input */}
      <div className="border-t border-gray-100 bg-white px-6 py-4">
        <div className="max-w-2xl mx-auto flex gap-3">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="気になることや悩みを自由に入力してください..."
            rows={1}
            className="flex-1 px-4 py-3 border border-gray-200 text-sm text-[#1A1A1A] placeholder-gray-400 resize-none focus:outline-none focus:border-[#C9A84C] bg-[#FAFAF8]"
          />
          <button
            onClick={send}
            disabled={!input.trim() || loading}
            className="px-6 py-3 bg-[#1A1A1A] text-white text-xs tracking-widest uppercase hover:bg-[#3A3A3A] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            送信
          </button>
        </div>
        <div className="max-w-2xl mx-auto mt-2 flex items-center justify-between">
          <p className="text-xs text-gray-400">
            Enterで送信 · Shift+Enterで改行
          </p>
          <button
            onClick={onSwitchToQuick}
            className="text-xs text-gray-400 hover:text-[#C9A84C] transition-colors"
          >
            かんたん診断に切り替え
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── メインページ ───

export default function DiagnosisPage() {
  const [mode, setMode] = useState<"quick" | "chat">("quick");

  return (
    <div className="min-h-screen bg-[#FAFAF8] flex flex-col">
      {/* Header */}
      <div className="border-b border-gray-100 bg-white px-6 py-4">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <div>
            <p className="text-xs tracking-[0.4em] uppercase text-[#C9A84C]">Aroma Diagnosis</p>
            <h1 className="text-lg font-light tracking-wide text-[#1A1A1A]">香り診断</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex border border-gray-200 text-xs">
              <button
                onClick={() => setMode("quick")}
                className={`px-3 py-1.5 transition-colors ${
                  mode === "quick"
                    ? "bg-[#1A1A1A] text-white"
                    : "text-gray-400 hover:text-[#1A1A1A]"
                }`}
              >
                かんたん
              </button>
              <button
                onClick={() => setMode("chat")}
                className={`px-3 py-1.5 transition-colors ${
                  mode === "chat"
                    ? "bg-[#1A1A1A] text-white"
                    : "text-gray-400 hover:text-[#1A1A1A]"
                }`}
              >
                AI相談
              </button>
            </div>
            <Link href="/products" className="text-xs tracking-widest uppercase text-gray-400 hover:text-[#1A1A1A] transition-colors">
              商品一覧 →
            </Link>
          </div>
        </div>
      </div>

      {mode === "quick" ? (
        <QuickDiagnosis onSwitchToChat={() => setMode("chat")} />
      ) : (
        <ChatDiagnosis onSwitchToQuick={() => setMode("quick")} />
      )}
    </div>
  );
}
