"use client";
import { useEffect } from "react";
import Link from "next/link";
import { useCartStore } from "@/lib/store";

export default function CartToast() {
  const toastMessage = useCartStore((s) => s.toastMessage);
  const hideToast = useCartStore((s) => s.hideToast);

  useEffect(() => {
    if (!toastMessage) return;
    const timer = setTimeout(() => {
      hideToast();
    }, 3000);
    return () => clearTimeout(timer);
  }, [toastMessage, hideToast]);

  return (
    <div
      role="status"
      aria-live="polite"
      className={`fixed top-4 right-4 z-50 transition-all duration-300 ease-in-out ${
        toastMessage
          ? "translate-y-0 opacity-100"
          : "-translate-y-4 opacity-0 pointer-events-none"
      }`}
    >
      <div className="bg-[#1A1A1A] text-white px-6 py-4 shadow-lg max-w-sm flex flex-col gap-3">
        <p className="text-sm font-light tracking-wide">{toastMessage}</p>
        <div className="flex items-center gap-3">
          <Link
            href="/cart"
            onClick={hideToast}
            className="text-xs tracking-widest uppercase text-[#C9A84C] hover:text-white transition-colors"
          >
            カートを見る →
          </Link>
          <button
            onClick={hideToast}
            className="ml-auto text-xs text-gray-400 hover:text-white transition-colors tracking-wider"
          >
            閉じる
          </button>
        </div>
      </div>
    </div>
  );
}
