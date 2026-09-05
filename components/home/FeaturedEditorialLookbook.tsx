"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Sparkles,
  ShoppingBag,
  Check,
  Tag,
  Eye,
} from "lucide-react";
import { Outfit } from "@/hooks/useOutfits";
import { useCart, CartItem } from "@/context/CartContext";
import { useToast } from "@/context/ToastContext";
import { getMinioUrl, formatPrice } from "@/lib/utils";

interface FeaturedEditorialLookbookProps {
  outfit: Outfit;
}

export default function FeaturedEditorialLookbook({ outfit }: FeaturedEditorialLookbookProps) {
  const { addMultipleItems } = useCart();
  const { toast } = useToast();

  const [selectedVariants, setSelectedVariants] = useState<Record<number, number>>({});
  const [selectedSizeNames, setSelectedSizeNames] = useState<Record<number, string>>({});
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  // Kombin yüklendiğinde her parçanın stoktaki ilk bedenini otomatik seç
  useEffect(() => {
    if (!outfit) return;
    const initialVariants: Record<number, number> = {};
    const initialSizes: Record<number, string> = {};

    outfit.items?.forEach((item) => {
      const inStockVariant =
        item.variants?.find((v) => v.stockQuantity > 0) || item.variants?.[0];
      if (inStockVariant) {
        initialVariants[item.productId] = inStockVariant.id;
        initialSizes[item.productId] = inStockVariant.sizeName;
      }
    });

    setSelectedVariants(initialVariants);
    setSelectedSizeNames(initialSizes);
  }, [outfit]);

  if (!outfit) return null;

  const totalOriginal =
    outfit.totalOriginalPrice ||
    outfit.items?.reduce((sum, i) => sum + (i.productDiscountPrice ?? i.productBasePrice), 0) ||
    outfit.price;

  const savings = Math.max(0, totalOriginal - outfit.price);
  const discountPercent =
    outfit.discountValue ||
    (totalOriginal > outfit.price
      ? Math.round(((totalOriginal - outfit.price) / totalOriginal) * 100)
      : null);

  const handleSelectVariant = (productId: number, variantId: number, sizeName: string) => {
    setSelectedVariants((prev) => ({ ...prev, [productId]: variantId }));
    setSelectedSizeNames((prev) => ({ ...prev, [productId]: sizeName }));
  };

  const handleAddBundleToCart = () => {
    if (!outfit) return;

    for (const item of outfit.items) {
      if (!selectedVariants[item.productId]) {
        toast.error(`Lütfen "${item.productName}" için bir beden seçin.`);
        return;
      }
    }

    setIsAddingToCart(true);

    const totalOrig = outfit.totalOriginalPrice || outfit.price;
    let distributedSum = 0;

    const cartItems: CartItem[] = outfit.items.map((item, index) => {
      const variantId = selectedVariants[item.productId];
      const sizeName = selectedSizeNames[item.productId] || "Standart";
      const itemBasePrice = item.productDiscountPrice || item.productBasePrice || 0;

      let itemBundlePrice: number;
      if (index === outfit.items.length - 1) {
        itemBundlePrice = Math.max(0, outfit.price - distributedSum);
      } else {
        const ratio = totalOrig > 0 ? itemBasePrice / totalOrig : 1 / outfit.items.length;
        itemBundlePrice = Math.round(outfit.price * ratio);
        distributedSum += itemBundlePrice;
      }

      return {
        id: `${item.productId}_${variantId}`,
        productId: item.productId,
        variantId: variantId,
        outfitId: outfit.id,
        outfitTitle: outfit.title,
        outfitCoverImageUrl: outfit.coverImageUrl,
        outfitPrice: outfit.price,
        originalPrice: itemBasePrice,
        name: item.productName,
        price: itemBundlePrice,
        image: item.imageUrl || outfit.coverImageUrl,
        size: sizeName,
        color: item.colorName || "Standart",
        quantity: 1,
        slug: item.productSlug || String(item.productId),
        availableVariants: item.variants || [],
      };
    });

    const success = addMultipleItems(cartItems);
    setIsAddingToCart(false);

    if (success) {
      toast.success(`"${outfit.title}" kombini sepetinize eklendi!`);
    }
  };

  return (
    <section className="py-12 md:py-16 bg-[#111111] text-white relative overflow-hidden">
      {/* İnce Arka Plan Işık Efekti */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-[#4A5D3E]/15 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-amber-500/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        {/* ─── Başlık Alanı ─── */}
        <div className="text-center max-w-2xl mx-auto mb-8 md:mb-12 space-y-2">
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white leading-tight">
            {outfit.title}
          </h2>
          <p className="text-xs sm:text-sm text-stone-400 font-light leading-relaxed">
            {outfit.description ||
              "Tek tek seçmekle vakit kaybetmeyin. Stil danışmanlarımızın hazırladığı kusursuz kombin şimdi avantajlı set fiyatıyla."}
          </p>
        </div>

        {/* ─── Ana Gövde: 2 Kolonlu Sayfaya Gömülü Lüks Kart ─── */}
        <div className="bg-[#18181A] border border-stone-800 rounded-3xl p-4 sm:p-6 md:p-8 lg:p-10 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">

            {/* ── SOL KOLON: Büyük Lookbook Manken Görseli ── */}
            <div className="lg:col-span-6 xl:col-span-7">
              <div className="relative aspect-[3/4] max-w-[500px] mx-auto rounded-2xl overflow-hidden bg-stone-900 border border-stone-800 shadow-2xl group">
                <img
                  src={getMinioUrl(outfit.coverImageUrl)}
                  alt={outfit.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              </div>
            </div>

            {/* ── SAĞ KOLON: Parça Listesi & Doğrudan Beden Seçimleri & Sepete Ekle ── */}
            <div className="lg:col-span-6 xl:col-span-5 flex flex-col justify-between h-full space-y-6">

              {/* Üst Bar: Parça Sayısı & İndirim Rozeti */}
              <div className="flex items-center justify-between border-b border-stone-800 pb-4">
                <span className="text-xs sm:text-sm font-bold tracking-wider text-stone-300 uppercase">
                  {outfit.itemCount || outfit.items?.length || 0} PARÇALI AKILLI PAKET
                </span>
                {discountPercent ? (
                  <span className="bg-amber-400 text-stone-950 text-[10px] sm:text-xs font-black px-2.5 py-1 rounded-md uppercase tracking-wider shadow-sm">
                    SET OLARAK AL: %{discountPercent} İNDİRİM
                  </span>
                ) : (
                  <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] sm:text-xs font-black px-2.5 py-1 rounded-md uppercase tracking-wider">
                    ÖZEL SET FİYATI
                  </span>
                )}
              </div>

              {/* Parça Kartları Listesi (Gömülü Beden Seçimli) */}
              <div className="space-y-3 max-h-[380px] overflow-y-auto pr-1 scrollbar-thin">
                {outfit.items?.map((item, idx) => {
                  const itemPrice = item.productDiscountPrice || item.productBasePrice || 0;
                  const currentSelectedVariantId = selectedVariants[item.productId];

                  return (
                    <div
                      key={idx}
                      className="p-3 sm:p-3.5 rounded-2xl border border-stone-800 bg-stone-900/90 hover:bg-stone-850 hover:border-stone-700 transition-all shadow-xs"
                    >
                      {/* Ürün Başlık & Görsel */}
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-14 rounded-xl bg-stone-950 border border-stone-700/60 overflow-hidden shrink-0 flex items-center justify-center">
                          <img
                            src={getMinioUrl(item.imageUrl || outfit.coverImageUrl)}
                            alt={item.productName}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-1">
                            <h4 className="text-xs sm:text-sm font-bold text-white truncate leading-snug">
                              {item.productName}
                            </h4>
                            <span className="text-xs font-bold text-amber-400 shrink-0">
                              {formatPrice(itemPrice)}
                            </span>
                          </div>

                          <div className="flex items-center gap-2 mt-0.5 text-[11px] text-stone-400">
                            {item.colorName && (
                              <span>Renk: <strong className="text-stone-300 font-semibold">{item.colorName}</strong></span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Doğrudan Beden Seçimi Hap Butonları */}
                      <div className="mt-2.5 pt-2 border-t border-stone-800/80 flex items-center justify-between gap-2">
                        <span className="text-[10px] font-semibold text-stone-400 uppercase tracking-wider">
                          Beden:
                        </span>

                        <div className="flex items-center gap-1.5 flex-wrap justify-end">
                          {item.variants && item.variants.length > 0 ? (
                            item.variants.map((variant) => {
                              const isSelected = currentSelectedVariantId === variant.id;
                              const isOutOfStock = variant.stockQuantity <= 0;

                              return (
                                <button
                                  key={variant.id}
                                  type="button"
                                  disabled={isOutOfStock}
                                  onClick={() =>
                                    handleSelectVariant(item.productId, variant.id, variant.sizeName)
                                  }
                                  className={`min-w-[32px] h-7 px-2 rounded-lg text-[11px] font-bold transition-all cursor-pointer flex items-center justify-center ${
                                    isOutOfStock
                                      ? "bg-stone-900 text-stone-600 line-through cursor-not-allowed border border-stone-800"
                                      : isSelected
                                      ? "bg-[#4A5D3E] text-white shadow-xs scale-105 border border-[#4A5D3E]"
                                      : "bg-stone-800 text-stone-300 border border-stone-700 hover:border-stone-500 hover:text-white"
                                  }`}
                                >
                                  {variant.sizeName}
                                </button>
                              );
                            })
                          ) : (
                            <span className="text-[11px] text-stone-400 italic">Standart Beden</span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Fiyat Özeti & Doğrudan Sepete Ekle Butonu */}
              <div className="pt-4 border-t border-stone-800 space-y-4">
                <div className="flex items-end justify-between">
                  <div>
                    <span className="text-[11px] text-stone-400 font-medium block">
                      Kombin Özel Fiyatı
                    </span>
                    <div className="flex items-baseline gap-2.5 mt-0.5">
                      <span className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                        {formatPrice(outfit.price)}
                      </span>
                      {totalOriginal > outfit.price && (
                        <span className="text-xs sm:text-sm text-stone-500 line-through">
                          {formatPrice(totalOriginal)}
                        </span>
                      )}
                    </div>
                  </div>

                  {savings > 0 && (
                    <div className="text-right">
                      <span className="inline-block bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] sm:text-xs font-bold px-2.5 py-1 rounded-lg">
                        Toplam {formatPrice(savings)} Tasarruf
                      </span>
                    </div>
                  )}
                </div>

                <button
                  type="button"
                  disabled={isAddingToCart}
                  onClick={handleAddBundleToCart}
                  className="w-full py-3.5 px-6 rounded-2xl bg-[#4A5D3E] hover:bg-[#3d4d33] text-white text-xs sm:text-sm font-bold tracking-wider uppercase shadow-xl hover:shadow-[#4A5D3E]/20 transition-all flex items-center justify-center gap-2.5 cursor-pointer active:scale-[0.99]"
                >
                  <ShoppingBag size={16} />
                  <span>
                    {isAddingToCart
                      ? "Sepete Ekleniyor..."
                      : `TÜM KOMBİNİ SEPETE EKLE (${outfit.itemCount || outfit.items?.length || 0} PARÇA)`}
                  </span>
                </button>
              </div>

            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
