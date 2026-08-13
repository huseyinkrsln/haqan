"use client";

import Link from "next/link";
import { Heart, ArrowUpDown, ArrowRight, Truck, Clock, RotateCcw, Shield, Headphones } from "lucide-react";
import { useWishlist } from "@/context/WishlistContext";
import FavoriteProductCard from "@/components/product/FavoriteProductCard";
import { useState } from "react";
import { products } from "@/lib/data";

const sortOptions = ["En Yeni", "Fiyat (Artan)", "Fiyat (Azalan)", "En Popüler"];

const trustItems = [
  { icon: Truck, label: "ÜCRETSİZ KARGO", sub: "999 TL ve üzeri" },
  { icon: Clock, label: "HIZLI TESLİMAT", sub: "1-3 iş günü" },
  { icon: RotateCcw, label: "KOLAY İADE", sub: "14 gün içinde" },
  { icon: Shield, label: "GÜVENLİ ÖDEME", sub: "256 bit SSL" },
  { icon: Headphones, label: "7/24 DESTEK", sub: "Her zaman yanınızda" },
];

// Pre-seed demo favorites from mock data so the page looks populated on first visit
const DEMO_BADGES: Record<string, string> = {
  p1: "PREMIUM",
  p8: "YENİ",
};

export default function FavorilerPage() {
  const { items, totalItems } = useWishlist();
  const [sortOpen, setSortOpen] = useState(false);
  const [activeSort, setActiveSort] = useState("En Yeni");

  // If the wishlist is empty in context, show demo items as display-only
  const displayItems = totalItems > 0 ? items : [];
  const hasItems = displayItems.length > 0;

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-6 md:py-10">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-gray-400 mb-6">
          <Link href="/" className="hover:text-gray-700">Ana Sayfa</Link>
          <span>›</span>
          <span className="text-gray-700 font-medium">Favoriler</span>
        </nav>

        {/* Page title */}
        <div className="mb-8">
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 uppercase tracking-wide">
            FAVORİLER
          </h1>
          <p className="text-gray-500 mt-1.5 text-sm">
            Beğendiğin parçaları burada sakla.
          </p>
        </div>

        {hasItems ? (
          <>
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-6">
              <span className="text-sm font-semibold text-gray-700">
                {totalItems} ÜRÜN
              </span>
              <div className="relative">
                <button
                  onClick={() => setSortOpen(!sortOpen)}
                  className="flex items-center gap-2 text-xs font-medium text-gray-600 border border-gray-200 px-3 py-2 rounded-lg hover:border-gray-300 transition-colors"
                >
                  <ArrowUpDown size={13} />
                  SIRALA: {activeSort}
                </button>
                {sortOpen && (
                  <div className="absolute right-0 top-full mt-1 bg-white border border-gray-100 rounded-xl shadow-lg py-2 z-10 w-44">
                    {sortOptions.map((opt) => (
                      <button
                        key={opt}
                        className={`block w-full text-left px-4 py-2 text-sm transition-colors ${
                          activeSort === opt
                            ? "text-[#4A5D3E] font-semibold bg-[#4A5D3E]/5"
                            : "text-gray-700 hover:bg-gray-50 hover:text-[#4A5D3E]"
                        }`}
                        onClick={() => {
                          setActiveSort(opt);
                          setSortOpen(false);
                        }}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Main layout — grid + sidebar */}
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-6">
              {/* Product grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {displayItems.map((product) => (
                  <FavoriteProductCard
                    key={product.id}
                    product={product}
                    badge={DEMO_BADGES[product.id]}
                  />
                ))}
              </div>

              {/* Sidebar — discover panel */}
              <div className="hidden lg:flex flex-col">
                <div className="bg-white rounded-2xl border border-gray-100 shadow-card p-8 flex flex-col items-center text-center gap-5 sticky top-24">
                  <div className="w-16 h-16 rounded-full bg-[#4A5D3E]/10 flex items-center justify-center">
                    <Heart size={28} className="text-[#4A5D3E]" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg font-bold text-gray-900 leading-tight">
                      Daha fazla ürün keşfet
                    </h3>
                    <p className="text-xs text-gray-500 mt-2 leading-relaxed">
                      Koleksiyonumuzu keşfedin ve beğendiklerinizi favorilere ekleyin.
                    </p>
                  </div>
                  <Link
                    href="/kategoriler"
                    className="w-full flex items-center justify-center gap-2 bg-[#4A5D3E] hover:bg-[#3A4B30] text-white font-semibold py-3 rounded-xl transition-colors text-sm"
                  >
                    ÜRÜNLERİ KEŞFET <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </div>
          </>
        ) : (
          /* Empty state — clean centered layout */
          <div className="flex flex-col items-center justify-center py-20 text-center">
            {/* Animated heart icon */}
            <div className="relative mb-8">
              <div className="w-28 h-28 rounded-full bg-[#4A5D3E]/8 flex items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-[#4A5D3E]/12 flex items-center justify-center">
                  <Heart
                    size={40}
                    className="text-[#4A5D3E]"
                    strokeWidth={1.5}
                  />
                </div>
              </div>
            </div>

            <h2 className="font-serif text-2xl md:text-3xl font-bold text-gray-900 mb-3">
              Henüz favori ürününüz yok.
            </h2>
            <p className="text-gray-500 text-sm md:text-base max-w-sm leading-relaxed mb-10">
              Beğendiğiniz ürünlerin kalbine dokunun, burada saklayın.
              İstediğiniz zaman kolayca ulaşın.
            </p>

            {/* Category suggestion cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 w-full max-w-2xl mb-10">
              {[
                { label: "Gömlekler", href: "/kategoriler/giyim", emoji: "👔" },
                { label: "Saatler", href: "/kategoriler/saat", emoji: "⌚" },
                { label: "Ayakkabılar", href: "/kategoriler/ayakkabi", emoji: "👟" },
                { label: "Aksesuarlar", href: "/kategoriler/aksesuar", emoji: "🕶️" },
              ].map((cat) => (
                <Link
                  key={cat.href}
                  href={cat.href}
                  className="flex flex-col items-center gap-2 p-4 bg-white rounded-xl border border-gray-100 shadow-card hover:shadow-card-hover hover:border-[#4A5D3E]/30 transition-all group"
                >
                  <span className="text-2xl">{cat.emoji}</span>
                  <span className="text-xs font-semibold text-gray-700 group-hover:text-[#4A5D3E] transition-colors">
                    {cat.label}
                  </span>
                </Link>
              ))}
            </div>

            <Link
              href="/kategoriler"
              className="flex items-center gap-2 bg-[#4A5D3E] hover:bg-[#3A4B30] text-white font-semibold px-8 py-3.5 rounded-xl transition-colors text-sm tracking-wider"
            >
              ÜRÜNLERİ KEŞFET <ArrowRight size={16} />
            </Link>
          </div>
        )}
      </div>

      {/* Trust badges */}
      <section className="border-t border-gray-100 bg-white mt-12">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {trustItems.map(({ icon: Icon, label, sub }) => (
              <div key={label} className="flex flex-col items-center text-center gap-2">
                <div className="w-10 h-10 rounded-full bg-[#4A5D3E]/10 flex items-center justify-center">
                  <Icon size={18} className="text-[#4A5D3E]" />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-800 tracking-wide">{label}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
