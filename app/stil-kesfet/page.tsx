"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Sparkles,
  ShoppingBag,
  Eye,
  Heart,
  Loader2,
} from "lucide-react";
import { useInfiniteOutfits, Outfit } from "@/hooks/useOutfits";
import { useWishlist } from "@/context/WishlistContext";
import { getMinioUrl, formatPrice } from "@/lib/utils";
import OutfitDetailModal from "@/components/outfit/OutfitDetailModal";

export default function StilKesfetPage() {
  const router = useRouter();
  const { toggleOutfit, isOutfitWishlisted } = useWishlist();
  const [activeOutfit, setActiveOutfit] = useState<Outfit | null>(null);

  // Sonsuz Kaydırmalı Kombin Sorgusu
  const {
    data,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteOutfits({ take: 8 });

  // Tüm sayfalardaki kombinleri birleştir
  const outfits = useMemo(() => {
    if (!data?.pages) return [];
    return data.pages.flatMap((page: any) => {
      if (Array.isArray(page)) return page;
      if (Array.isArray(page?.data)) return page.data;
      if (Array.isArray(page?.Data)) return page.Data;
      return [];
    });
  }, [data]);

  const totalOutfitsCount = useMemo(() => {
    if (!data?.pages?.[0]) return outfits.length;
    const firstPage: any = data.pages[0];
    return firstPage?.totalRecords ?? firstPage?.TotalRecords ?? outfits.length;
  }, [data, outfits.length]);

  // Sonsuz kaydırma için Sentinel IntersectionObserver
  const observerTarget = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const target = observerTarget.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  // Sayfa yüklendiğinde veya hash değiştiğinde (#kombin-X) ilgili kombini otomatik aç
  useEffect(() => {
    if (!outfits || outfits.length === 0) return;
    const hash = window.location.hash;
    if (hash && hash.startsWith("#kombin-")) {
      const id = Number(hash.replace("#kombin-", ""));
      const target = outfits.find((o) => o.id === id);
      if (target) {
        setActiveOutfit(target);
      }
    }
  }, [outfits]);

  const handleOpenOutfitModal = (outfit: Outfit) => {
    setActiveOutfit(outfit);
  };

  const filteredOutfits = outfits;

  return (
    <div className="bg-[#FAF9F6]/40 min-h-screen pb-24 md:pb-10 w-full max-w-full text-slate-900">
      {/* ─── HERO HEADER (MİNİMAL & KOMPAKT) ─── */}
      <div className="border-b border-stone-200/80 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-3.5 md:py-4 w-full max-w-full">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-[#4A5D3E]/10 text-[#4A5D3E]">
                  <Sparkles size={14} className="text-amber-500" />
                </span>
                <h1 className="text-lg md:text-xl font-serif font-bold tracking-tight text-stone-900">
                  STİL KEŞFET
                </h1>
              </div>
              <span className="hidden sm:inline-block text-xs text-stone-400 font-light border-l border-stone-200 pl-3">
                Özenle hazırlanan paket kombin setleri
              </span>
            </div>

            <div className="flex items-center gap-1.5 bg-stone-100/90 px-3 py-1 rounded-full border border-stone-200/70 text-xs text-stone-600 shrink-0">
              <span className="font-bold text-stone-900">{filteredOutfits.length}</span>
              <span className="text-[11px] text-stone-500">Kombin</span>
            </div>
          </div>
        </div>
      </div>

      {/* ─── KOMBİN LİSTESİ / GRID (Koleksiyon Sayfası ile Birebir Konteyner ve Ölçü) ─── */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 sm:py-6 md:py-8 w-full max-w-full">
        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div
                key={i}
                className="rounded-2xl sm:rounded-3xl bg-white border border-gray-200/80 p-3.5 shadow-sm animate-pulse space-y-3"
              >
                <div className="aspect-[3/4] bg-stone-200 rounded-xl" />
                <div className="h-4 bg-stone-200 rounded w-3/4" />
                <div className="h-3 bg-stone-200 rounded w-1/2" />
                <div className="h-8 bg-stone-200 rounded-xl" />
              </div>
            ))}
          </div>
        ) : filteredOutfits.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-stone-200 p-8">
            <div className="w-16 h-16 rounded-full bg-[#4A5D3E]/10 text-[#4A5D3E] flex items-center justify-center mx-auto mb-4">
              <Sparkles size={28} />
            </div>
            <h3 className="text-xl font-serif font-bold text-stone-800">
              Henüz Kombin Bulunmuyor
            </h3>
            <p className="text-stone-500 text-sm mt-1 max-w-md mx-auto">
              Yeni sezon kombinlerimiz stilistlerimiz tarafından hazırlanıyor. Çok yakında burada olacak!
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 mt-6 px-6 py-2.5 rounded-full bg-stone-900 text-white text-xs font-bold tracking-wider uppercase hover:bg-[#4A5D3E] transition-colors"
            >
              Koleksiyonlara Göz At
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {filteredOutfits.map((outfit) => {
              const savings = (outfit.totalOriginalPrice || outfit.price) - outfit.price;

              return (
                <div
                  key={outfit.id}
                  id={`kombin-${outfit.id}`}
                  onClick={() => handleOpenOutfitModal(outfit)}
                  className="group bg-white rounded-2xl sm:rounded-3xl border border-gray-200/80 shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.08)] hover:border-gray-300 hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col h-full cursor-pointer"
                >
                  {/* Görsel Alanı (aspect-[3/4]) */}
                  <div className="relative aspect-[3/4] overflow-hidden bg-[#F6F6F4] flex items-center justify-center">
                    <img
                      src={getMinioUrl(outfit.coverImageUrl)}
                      alt={outfit.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />

                    {/* Lüks Rozetler (Sol Üst) */}
                    <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5 z-10 pointer-events-none">
                      <span className="bg-gray-900/90 backdrop-blur-md text-white text-[8px] sm:text-[9px] font-bold px-2.5 py-0.5 sm:py-1 rounded-full tracking-wider uppercase border border-white/15 shadow-xs self-start">
                        {outfit.itemCount} Parça Set
                      </span>
                      {outfit.showDiscountBadge && outfit.discountValue && (
                        <span className="bg-rose-600 text-white text-[9px] sm:text-[10px] font-black px-2 sm:px-2.5 py-0.5 rounded-full tracking-wide shadow-xs border border-white/20 self-start animate-in fade-in duration-300">
                          -%{outfit.discountValue}
                        </span>
                      )}
                    </div>

                    {/* Favori (Kalp) Butonu (Sağ Üst) */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleOutfit(outfit);
                      }}
                      className={`absolute top-2.5 right-2.5 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-all z-10 shadow-xs cursor-pointer active:scale-90 ${
                        isOutfitWishlisted(outfit.id)
                          ? "bg-[#4A5D3E] text-white shadow-sm"
                          : "bg-white/90 text-gray-500 hover:bg-white hover:text-rose-600 backdrop-blur-md"
                      }`}
                      title={isOutfitWishlisted(outfit.id) ? "Favorilerden Çıkar" : "Favorilere Ekle"}
                      aria-label="Kombini Favorilere Ekle/Çıkar"
                    >
                      <Heart
                        size={14}
                        fill={isOutfitWishlisted(outfit.id) ? "currentColor" : "none"}
                        className={isOutfitWishlisted(outfit.id) ? "text-white" : ""}
                      />
                    </button>
                  </div>

                  {/* Bilgi & Seçenekler Alanı (ProductCard ile 1-e-1 Birebir) */}
                  <div className="p-3.5 sm:p-4 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Marka / Kategori Başlığı */}
                      <div className="flex items-center justify-between gap-1 text-[9px] sm:text-[10px] text-gray-400 mb-1">
                        <span className="truncate uppercase tracking-widest font-semibold text-gray-400">
                          HAQAN STİL
                        </span>
                      </div>

                      {/* Kombin Başlığı (Koyu, Belirgin & Zarif Tipografi) */}
                      <h3 className="text-xs sm:text-sm font-bold font-serif text-stone-950 line-clamp-1 group-hover:text-[#4A5D3E] transition-colors leading-snug tracking-tight">
                        {outfit.title}
                      </h3>
                    </div>

                    {/* Fiyat Alanı (ProductCard ile Birebir) */}
                    <div className="pt-2.5 mt-2.5 border-t border-gray-100 flex items-baseline gap-1.5 sm:gap-2 flex-wrap">
                      <span className="text-xs sm:text-sm md:text-base font-bold tracking-tight text-gray-900 whitespace-nowrap">
                        {formatPrice(outfit.price)}
                      </span>
                      {outfit.showDiscountBadge && outfit.totalOriginalPrice && outfit.totalOriginalPrice > outfit.price && (
                        <span className="text-[10px] sm:text-xs text-gray-400 line-through whitespace-nowrap">
                          {formatPrice(outfit.totalOriginalPrice)}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Sonsuz Kaydırma Yükleniyor Göstergesi & Sentinel */}
        {isFetchingNextPage && (
          <div className="py-8 flex flex-col items-center justify-center gap-2 text-stone-500 text-xs">
            <Loader2 className="w-6 h-6 animate-spin text-[#4A5D3E]" />
            <span>Daha fazla kombin yükleniyor...</span>
          </div>
        )}

        <div ref={observerTarget} className="h-6" />

        {!hasNextPage && outfits.length > 0 && (
          <p className="text-center text-xs text-stone-400 py-6 border-t border-stone-200/60 mt-6">
            Tüm kombinler listelendi ({outfits.length} kombin)
          </p>
        )}
      </div>

      {/* ─── KOMBİN DETAY & BEDEN SEÇİMİ (MOBİLDE BOTTOM SHEET / MASAÜSTÜNDE SAĞ DRAWER) ─── */}
      <OutfitDetailModal
        outfit={activeOutfit}
        onClose={() => setActiveOutfit(null)}
      />
    </div>
  );
}
