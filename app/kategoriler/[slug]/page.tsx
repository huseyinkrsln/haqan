"use client";

import Image from "next/image";
import Link from "next/link";
import { use, useState } from "react";
import { notFound } from "next/navigation";
import { ArrowUpDown } from "lucide-react";
import {
  getCategoryBySlug,
  getProductsByCategory,
} from "@/lib/data";
import CategoryFilterTabs from "@/components/category/CategoryFilterTabs";
import ProductGrid from "@/components/category/ProductGrid";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function CategoryPage({ params }: PageProps) {
  const { slug } = use(params);
  const category = getCategoryBySlug(slug);

  if (!category) notFound();

  const [activeSubcat, setActiveSubcat] = useState(
    category.subcategories[0]?.slug ?? ""
  );
  const [sortOpen, setSortOpen] = useState(false);

  const filteredProducts = getProductsByCategory(category.slug, activeSubcat);
  const activeSubcategory = category.subcategories.find(
    (s) => s.slug === activeSubcat
  );

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-6 md:py-10">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-gray-400 mb-6">
        <Link href="/" className="hover:text-gray-700">Ana Sayfa</Link>
        <span>›</span>
        <Link href="/kategoriler" className="hover:text-gray-700">Kategoriler</Link>
        <span>›</span>
        <span className="text-gray-700 font-medium">{category.name}</span>
      </nav>

      {/* Category Hero Banner */}
      <div className="relative h-44 md:h-64 rounded-2xl overflow-hidden mb-8">
        <Image
          src={category.image}
          alt={category.name}
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-center px-6 md:px-10">
          <h1 className="font-serif text-3xl md:text-5xl font-bold text-white uppercase tracking-wide">
            {category.name}
          </h1>
          <p className="text-white/70 text-sm mt-2">{category.description}</p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="mb-6">
        <CategoryFilterTabs
          subcategories={category.subcategories}
          activeSlug={activeSubcat}
          onSelect={setActiveSubcat}
        />
      </div>

      {/* Section header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-baseline gap-2">
          <h2 className="font-serif text-xl font-bold text-gray-900">
            {activeSubcategory?.name}
          </h2>
          <span className="text-sm text-[#4A5D3E] font-semibold">
            {activeSubcategory?.count} Model
          </span>
        </div>
        <div className="relative">
          <button
            onClick={() => setSortOpen(!sortOpen)}
            className="flex items-center gap-2 text-xs font-medium text-gray-600 border border-gray-200 px-3 py-2 rounded-lg hover:border-gray-300 transition-colors"
          >
            <ArrowUpDown size={13} />
            SIRALAMA
          </button>
          {sortOpen && (
            <div className="absolute right-0 top-full mt-1 bg-white border border-gray-100 rounded-xl shadow-lg py-2 z-10 w-44">
              {["Önerilen", "En Yeni", "Fiyat (Artan)", "Fiyat (Azalan)"].map(
                (opt) => (
                  <button
                    key={opt}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#4A5D3E] transition-colors"
                    onClick={() => setSortOpen(false)}
                  >
                    {opt}
                  </button>
                )
              )}
            </div>
          )}
        </div>
      </div>

      {/* Product Grid */}
      <ProductGrid products={filteredProducts} />
    </div>
  );
}
