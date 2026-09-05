"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2, Sparkles, Layers } from "lucide-react";
import { CartItem as CartItemType, useCart } from "@/context/CartContext";
import { formatPrice, getMinioUrl } from "@/lib/utils";
import { useToast } from "@/context/ToastContext";

interface OutfitCartCardProps {
  outfitId: number;
  title: string;
  coverImageUrl?: string;
  price: number;
  quantity: number;
  items: CartItemType[];
  onRequestRemove?: () => void;
}

export default function OutfitCartCard({
  outfitId,
  title,
  coverImageUrl,
  price,
  quantity,
  items,
  onRequestRemove,
}: OutfitCartCardProps) {
  const { updateOutfitQuantity, removeOutfit, updateItemVariant } = useCart();
  const { toast } = useToast();
  const coverUrl = getMinioUrl(coverImageUrl);

  const handleDecrease = () => {
    if (quantity > 1) {
      updateOutfitQuantity(outfitId, quantity - 1);
    } else {
      if (onRequestRemove) {
        onRequestRemove();
      } else {
        removeOutfit(outfitId);
        toast.success(`"${title}" sepetten kaldırıldı.`);
      }
    }
  };

  const handleIncrease = () => {
    updateOutfitQuantity(outfitId, quantity + 1);
  };

  const handleRemove = () => {
    if (onRequestRemove) {
      onRequestRemove();
    } else {
      removeOutfit(outfitId);
      toast.success(`"${title}" sepetten kaldırıldı.`);
    }
  };

  const handleSizeChange = (item: CartItemType, newVariantId: number, newSizeName: string) => {
    updateItemVariant(item.cartItemId || item.id, newVariantId, newSizeName);
    toast.success(`Beden "${newSizeName}" olarak güncellendi.`);
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200/90 shadow-card hover:shadow-card-hover transition-all overflow-hidden">
      {/* ─── KOMBİN PAKET ÜST BAŞLIĞI (GENEL TEMAYA UYUMLU AÇIK & LÜKS TASARIM) ─── */}
      <div className="bg-[#FAF9F6] border-b border-gray-200/80 p-4 sm:p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5 min-w-0">
            {/* Kombin Kapak Görseli */}
            <Link
              href={`/stil-kesfet#kombin-${outfitId}`}
              className="relative w-14 h-18 sm:w-16 sm:h-20 shrink-0 rounded-xl overflow-hidden bg-white border border-gray-200 shadow-2xs group cursor-pointer"
            >
              {coverUrl ? (
                <Image
                  src={coverUrl}
                  alt={title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="80px"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-xs text-gray-400 font-serif font-bold">
                  HQ
                </div>
              )}
            </Link>

            {/* Kombin Başlık ve Fiyat */}
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="inline-flex items-center gap-1 text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#4A5D3E] bg-[#4A5D3E]/10 border border-[#4A5D3E]/20 px-2.5 py-0.5 rounded-full">
                  <Sparkles size={11} className="text-amber-500" />
                  Kombin Seti
                </span>
                <span className="text-[11px] text-gray-400 font-medium">
                  {items.length} Parça
                </span>
              </div>
              <Link
                href={`/stil-kesfet#kombin-${outfitId}`}
                className="hover:text-[#4A5D3E] transition-colors"
              >
                <h3 className="font-serif font-bold text-base sm:text-lg text-gray-900 truncate">
                  {title}
                </h3>
              </Link>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="font-bold text-gray-900 text-base sm:text-lg">
                  {formatPrice(price * quantity)}
                </span>
                {quantity > 1 && (
                  <span className="text-xs text-gray-400 font-normal">
                    ({formatPrice(price)} / paket)
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Kombin Ana Adet ve Silme Kontrolleri */}
          <div className="flex items-center justify-between sm:justify-end gap-3 pt-2 sm:pt-0 border-t border-gray-200/60 sm:border-t-0">
            {/* Adet Stepper */}
            <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden bg-white shadow-2xs">
              <button
                type="button"
                onClick={handleDecrease}
                className="px-2.5 py-1.5 hover:bg-gray-100 transition-colors text-gray-600 cursor-pointer"
                aria-label="Kombin Adedini Azalt"
                title="Kombin Adedini Azalt"
              >
                <Minus size={13} />
              </button>
              <span className="px-3 py-1.5 text-xs font-bold text-gray-900 border-x border-gray-200 min-w-[36px] text-center bg-gray-50 select-none">
                {quantity}
              </span>
              <button
                type="button"
                onClick={handleIncrease}
                className="px-2.5 py-1.5 hover:bg-gray-100 transition-colors text-gray-600 cursor-pointer"
                aria-label="Kombin Adedini Artır"
                title="Kombin Adedini Artır"
              >
                <Plus size={13} />
              </button>
            </div>

            {/* Paketi Kaldır */}
            <button
              type="button"
              onClick={handleRemove}
              className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
              aria-label="Kombini Sepetten Sil"
              title="Kombini Sepetten Sil"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* ─── KOMBİN İÇİNDEKİ PARÇALARIN LİSTESİ ─── */}
      <div className="p-4 sm:p-5 bg-white">
        <div className="flex items-center justify-between mb-3 text-xs text-gray-400 font-semibold uppercase tracking-wider">
          <span className="flex items-center gap-1.5">
            <Layers size={13} className="text-[#4A5D3E]" />
            Paket Parçaları (Sadece Beden Değiştirilebilir)
          </span>
        </div>

        <div className="space-y-2.5">
          {items.map((item, idx) => {
            const itemImageUrl = getMinioUrl(item.image);
            const cleanName = item.name.replace(/\(.*?\)/g, "").trim();
            const productTarget = item.slug || (item.productId ? String(item.productId) : item.id);

            return (
              <div
                key={`${item.id}-${item.size}-${item.color}-${idx}`}
                className="flex items-center justify-between gap-3 p-3 bg-gray-50/70 rounded-xl border border-gray-100 hover:border-gray-200 transition-colors"
              >
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  {/* Parça Görseli */}
                  <Link
                    href={`/urun/${productTarget}`}
                    className="relative w-12 h-14 sm:w-14 sm:h-16 shrink-0 rounded-lg overflow-hidden bg-white border border-gray-200"
                  >
                    {itemImageUrl ? (
                      <Image
                        src={itemImageUrl}
                        alt={cleanName}
                        fill
                        className="object-cover"
                        sizes="60px"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-[10px] text-gray-300 font-serif">
                        HQ
                      </div>
                    )}
                  </Link>

                  {/* Parça Bilgileri */}
                  <div className="min-w-0 flex-1">
                    <Link
                      href={`/urun/${productTarget}`}
                      className="font-medium text-xs sm:text-sm text-gray-900 hover:text-[#4A5D3E] transition-colors truncate block"
                    >
                      {cleanName}
                    </Link>
                    <div className="flex flex-wrap items-center gap-2 mt-1 text-[11px] text-gray-500">
                      {item.color && (
                        <span>
                          Renk: <strong className="text-gray-700">{item.color}</strong>
                        </span>
                      )}
                      <span className="text-gray-300">•</span>
                      <span>
                        Adet: <strong className="text-gray-700">{item.quantity}</strong>
                      </span>
                    </div>
                  </div>
                </div>

                {/* 🌟 SADECE BEDEN DEĞİŞİM ALANI 🌟 */}
                <div className="shrink-0 flex items-center gap-2">
                  <span className="text-xs font-medium text-gray-500 hidden sm:inline-block">
                    Beden:
                  </span>
                  {item.availableVariants && item.availableVariants.length > 0 ? (
                    <select
                      value={item.variantId || ""}
                      onChange={(e) => {
                        const newVarId = Number(e.target.value);
                        const match = item.availableVariants?.find((v) => v.id === newVarId);
                        if (match) {
                          handleSizeChange(item, match.id, match.sizeName);
                        }
                      }}
                      className="text-xs font-semibold text-gray-800 bg-white border border-gray-200 hover:border-gray-300 rounded-lg px-2.5 py-1.5 outline-none focus:ring-1 focus:ring-[#4A5D3E] cursor-pointer shadow-2xs"
                    >
                      {item.availableVariants.map((v) => (
                        <option
                          key={v.id}
                          value={v.id}
                          disabled={v.stockQuantity <= 0}
                        >
                          {v.sizeName} {v.stockQuantity <= 0 ? "(Tükendi)" : ""}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <span className="inline-block text-xs font-bold text-gray-700 bg-white border border-gray-200 px-2.5 py-1 rounded-md shadow-2xs">
                      {item.size || "Standart"}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
