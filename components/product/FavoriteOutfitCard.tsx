"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, Sparkles, ArrowRight, Eye } from "lucide-react";
import { Outfit } from "@/hooks/useOutfits";
import { formatPrice, getMinioUrl } from "@/lib/utils";
import { useWishlist } from "@/context/WishlistContext";

interface FavoriteOutfitCardProps {
  outfit: Outfit;
  onInspect?: (outfit: Outfit) => void;
}

export default function FavoriteOutfitCard({ outfit, onInspect }: FavoriteOutfitCardProps) {
  const { toggleOutfit, isOutfitWishlisted } = useWishlist();
  const coverUrl = getMinioUrl(outfit.coverImageUrl);
  const wishlisted = isOutfitWishlisted(outfit.id);

  return (
    <div className="group bg-white rounded-2xl sm:rounded-3xl border-2 border-amber-200/70 shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.08)] hover:border-amber-300 hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col h-full">
      {/* Görsel Alanı */}
      <div className="relative aspect-[3/4] overflow-hidden bg-stone-100">
        {coverUrl ? (
          <Image
            src={coverUrl}
            alt={outfit.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            sizes="(max-width: 768px) 50vw, 25vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-xs text-stone-400">
            Kombin Görseli
          </div>
        )}

        {/* Rozetler */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5 z-10 pointer-events-none">
          <span className="inline-flex items-center gap-1 bg-stone-900/90 backdrop-blur-md text-amber-300 text-[8px] sm:text-[9px] font-bold px-2.5 py-0.5 rounded-full tracking-wider uppercase border border-amber-400/20 shadow-xs">
            <Sparkles size={10} className="text-amber-400" />
            {outfit.itemCount || outfit.items?.length || 0} Parça Set
          </span>
          {outfit.showDiscountBadge && outfit.discountValue && (
            <span className="bg-rose-600 text-white text-[9px] sm:text-[10px] font-black px-2 sm:px-2.5 py-0.5 rounded-full tracking-wide shadow-xs border border-white/20">
              %{outfit.discountValue} İNDİRİM
            </span>
          )}
        </div>

        {/* Favorilerden Çıkar Butonu */}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            toggleOutfit(outfit);
          }}
          aria-label="Favorilerden çıkar"
          className="absolute top-2.5 right-2.5 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-all shadow-xs cursor-pointer active:scale-90 bg-rose-500 text-white hover:bg-rose-600"
          title="Favorilerden çıkar"
        >
          <Heart size={14} fill="currentColor" />
        </button>
      </div>

      {/* Bilgi & Buton Alanı */}
      <div className="p-3.5 sm:p-4 flex flex-col gap-2.5 flex-1 justify-between bg-stone-50/40">
        <div>
          <span className="block text-[9px] sm:text-[10px] uppercase tracking-widest font-semibold text-amber-800 mb-0.5">
            HAQAN STİL KOMBİNİ
          </span>

          <h3 className="text-xs sm:text-sm font-bold text-stone-900 line-clamp-1 group-hover:text-[#4A5D3E] transition-colors">
            {outfit.title}
          </h3>

          {/* Mini Parça İkonları */}
          {outfit.items && outfit.items.length > 0 && (
            <div className="flex items-center gap-1.5 mt-2">
              {outfit.items.slice(0, 4).map((item, idx) => (
                <div
                  key={idx}
                  className="w-7 h-8 rounded-md bg-white border border-stone-200 overflow-hidden relative"
                  title={item.productName}
                >
                  <img
                    src={getMinioUrl(item.imageUrl || outfit.coverImageUrl)}
                    alt={item.productName}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
              {outfit.items.length > 4 && (
                <span className="text-[10px] font-bold text-stone-400">
                  +{outfit.items.length - 4}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Fiyat */}
        <div className="pt-2 border-t border-stone-200/70 flex items-baseline gap-1.5">
          <span className="text-xs sm:text-sm md:text-base font-bold text-stone-900 tracking-tight">
            {formatPrice(outfit.price)}
          </span>
        </div>

        {/* 🌟 KOMBİNİ İNCELE BUTONU 🌟 */}
        {onInspect ? (
          <button
            type="button"
            onClick={() => onInspect(outfit)}
            className="w-full mt-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs font-bold tracking-wider transition-all shadow-2xs bg-[#4A5D3E] text-white hover:bg-[#3D4D33] active:scale-[0.98] cursor-pointer"
          >
            <Eye size={14} />
            KOMBİNİ İNCELE & SEPETE EKLE
          </button>
        ) : (
          <Link
            href={`/stil-kesfet#kombin-${outfit.id}`}
            className="w-full mt-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs font-bold tracking-wider transition-all shadow-2xs bg-[#4A5D3E] text-white hover:bg-[#3D4D33] active:scale-[0.98] cursor-pointer"
          >
            <Eye size={14} />
            KOMBİNİ İNCELE & SEPETE EKLE
          </Link>
        )}
      </div>
    </div>
  );
}
