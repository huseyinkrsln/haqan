"use client";

import { Subcategory } from "@/lib/data";

interface CategoryFilterTabsProps {
  subcategories: Subcategory[];
  activeSlug: string;
  onSelect: (slug: string) => void;
}

export default function CategoryFilterTabs({
  subcategories,
  activeSlug,
  onSelect,
}: CategoryFilterTabsProps) {
  return (
    <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
      {subcategories.map((sub) => (
        <button
          key={sub.slug}
          onClick={() => onSelect(sub.slug)}
          className={`flex items-center gap-1.5 shrink-0 px-4 py-2 rounded-full text-sm font-medium border transition-all ${
            activeSlug === sub.slug
              ? "bg-[#4A5D3E] text-white border-[#4A5D3E]"
              : "bg-white text-gray-600 border-gray-200 hover:border-[#4A5D3E] hover:text-[#4A5D3E]"
          }`}
        >
          {sub.name}
          <span
            className={`text-xs font-semibold ${
              activeSlug === sub.slug ? "text-white/70" : "text-[#4A5D3E]"
            }`}
          >
            {sub.count}
          </span>
        </button>
      ))}
    </div>
  );
}
