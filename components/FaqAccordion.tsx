"use client";
import { useState } from "react";

type FaqItem = {
  question: string;
  answer: string;
};

type FaqCategory = {
  title: string;
  items: FaqItem[];
};

export default function FaqAccordion({ categories }: { categories: FaqCategory[] }) {
  return (
    <div className="space-y-12">
      {categories.map((category) => (
        <section key={category.title}>
          <h2 className="text-lg font-light tracking-wide text-[#1A1A1A] mb-6 border-b border-gray-200 pb-3">
            {category.title}
          </h2>
          <div className="divide-y divide-gray-100">
            {category.items.map((item) => (
              <AccordionItem key={item.question} item={item} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

function AccordionItem({ item }: { item: FaqItem }) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-start justify-between gap-4 py-5 text-left cursor-pointer"
        aria-expanded={open}
      >
        <span className="text-sm font-medium text-[#1A1A1A] tracking-wide leading-relaxed">
          Q. {item.question}
        </span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-4 w-4 text-gray-400 flex-shrink-0 mt-0.5 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${open ? "max-h-96 opacity-100 pb-5" : "max-h-0 opacity-0"}`}
      >
        <p className="text-sm text-gray-600 leading-relaxed pl-6">
          A. {item.answer}
        </p>
      </div>
    </div>
  );
}
