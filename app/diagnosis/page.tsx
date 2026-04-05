"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { products } from "@/lib/products";

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

export default function DiagnosisPage() {
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
    <div className="min-h-screen bg-[#FAFAF8] flex flex-col">
      {/* Header */}
      <div className="border-b border-gray-100 bg-white px-6 py-4">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <div>
            <p className="text-xs tracking-[0.4em] uppercase text-[#C9A84C]">Aroma Diagnosis</p>
            <h1 className="text-lg font-light tracking-wide text-[#1A1A1A]">香り診断</h1>
          </div>
          <Link href="/products" className="text-xs tracking-widest uppercase text-gray-400 hover:text-[#1A1A1A] transition-colors">
            商品一覧 →
          </Link>
        </div>
      </div>

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
        <p className="max-w-2xl mx-auto mt-2 text-xs text-gray-400">
          Enterで送信 · Shift+Enterで改行
        </p>
      </div>
    </div>
  );
}
