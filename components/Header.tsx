"use client";
import Link from "next/link";
import { useCartStore } from "@/lib/store";
import { useState } from "react";

export default function Header() {
  const totalItems = useCartStore((s) => s.totalItems());
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-light tracking-[0.2em] text-[#1A1A1A]">
          林業家のアロマ
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          <Link href="/products" className="text-sm tracking-widest uppercase text-gray-500 hover:text-[#1A1A1A] transition-colors">
            All
          </Link>
          <Link href="/products?category=5ml" className="text-sm tracking-widest uppercase text-gray-500 hover:text-[#1A1A1A] transition-colors">
            5ml
          </Link>
          <Link href="/products?category=1ml" className="text-sm tracking-widest uppercase text-gray-500 hover:text-[#1A1A1A] transition-colors">
            1ml
          </Link>
          <Link href="/diagnosis" className="text-sm tracking-widest uppercase text-[#C9A84C] hover:text-[#1A1A1A] transition-colors">
            診断
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <Link href="/cart" className="relative flex items-center gap-2 text-sm tracking-widest uppercase text-[#1A1A1A]">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-[#C9A84C] text-white text-xs flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>

          {/* Hamburger */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-1"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="メニュー"
          >
            <span className={`block w-5 h-px bg-[#1A1A1A] transition-all duration-200 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`block w-5 h-px bg-[#1A1A1A] transition-all duration-200 ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block w-5 h-px bg-[#1A1A1A] transition-all duration-200 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <nav className="md:hidden border-t border-gray-100 bg-white px-6 py-4 flex flex-col gap-4">
          <Link href="/products" onClick={() => setMenuOpen(false)} className="text-sm tracking-widest uppercase text-gray-500 hover:text-[#1A1A1A] transition-colors py-2">
            すべての商品
          </Link>
          <Link href="/products?category=5ml" onClick={() => setMenuOpen(false)} className="text-sm tracking-widest uppercase text-gray-500 hover:text-[#1A1A1A] transition-colors py-2">
            5ml シリーズ
          </Link>
          <Link href="/products?category=1ml" onClick={() => setMenuOpen(false)} className="text-sm tracking-widest uppercase text-gray-500 hover:text-[#1A1A1A] transition-colors py-2">
            1ml シリーズ
          </Link>
          <Link href="/diagnosis" onClick={() => setMenuOpen(false)} className="text-sm tracking-widest uppercase text-[#C9A84C] hover:text-[#1A1A1A] transition-colors py-2">
            🌿 香り診断
          </Link>
        </nav>
      )}
    </header>
  );
}
