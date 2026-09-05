"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  Sparkles,
  ShoppingBag,
  Layers,
  X,
  Heart,
  Check,
  Tag,
} from "lucide-react";
import { Outfit } from "@/hooks/useOutfits";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useToast } from "@/context/ToastContext";
import { getMinioUrl, formatPrice } from "@/lib/utils";

interface OutfitDetailModalProps {
  outfit: Outfit | null;
  onClose: () => void;
}

export default function OutfitDetailModal({ outfit, onClose }: OutfitDetailModalProps) {
  const { addMultipleItems } = useCart();
  const { toggleOutfit, isOutfitWishlisted } = useWishlist();
  const { toast } = useToast();

  const [selectedVariants, setSelectedVariants] = useState<Record<number, number>>({});
  const [selectedSizeNames, setSelectedSizeNames] = useState<Record<number, string>>({});
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  // Kombin açıldığında her parçanın stoktaki ilk bedenini otomatik seç
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

  // Modal açıkken arka plandaki sayfanın scroll olmasını engelle (Scroll Lock)
  useEffect(() => {
    if (outfit) {
      const prevOverflow = document.body.style.overflow;
      const prevTouchAction = document.body.style.touchAction;
      document.body.style.overflow = "hidden";
      document.body.style.touchAction = "none";

      return () => {
        document.body.style.overflow = prevOverflow;
        document.body.style.touchAction = prevTouchAction;
      };
    }
  }, [outfit]);

  if (!outfit) return null;

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

    const totalOriginal = outfit.totalOriginalPrice || outfit.price;
    let distributedSum = 0;

    const cartItems = outfit.items.map((item, index) => {
      const variantId = selectedVariants[item.productId];
      const sizeName = selectedSizeNames[item.productId] || "Standart";
      const itemBasePrice = item.productDiscountPrice || item.productBasePrice || 0;

      let itemBundlePrice: number;
      if (index === outfit.items.length - 1) {
        itemBundlePrice = Math.max(0, outfit.price - distributedSum);
      } else {
        const ratio =
          totalOriginal > 0 ? itemBasePrice / totalOriginal : 1 / outfit.items.length;
        itemBundlePrice = Math.round(outfit.price * ratio);
        distributedSum += itemBundlePrice;
      }

      return {
        id: item.productId,
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
        slug: item.productSlug || "",
        availableVariants: item.variants || [],
      };
    });

    const success = addMultipleItems(cartItems);
    setIsAddingToCart(false);

    if (success) {
      toast.success(`"${outfit.title}" kombini sepetinize eklendi!`);
      onClose();
    }
  };

  const savings = (outfit.totalOriginalPrice || outfit.price) - outfit.price;

  return (
    <div className="fixed inset-0 z-[100] overflow-hidden flex items-end md:items-stretch justify-end overscroll-contain">
      {/* Karartma Backdrop */}
      <div
        onClick={onClose}
        onTouchMove={(e) => e.preventDefault()}
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-300"
      />

      {/* Responsive Sheet: Mobilde Bottom Sheet (aşağıdan yukarı), Masaüstünde Sağ Drawer */}
      <div className="relative z-10 w-full md:max-w-3xl lg:max-w-4xl bg-white shadow-2xl flex flex-col h-[90vh] h-[90dvh] max-h-[90dvh] md:h-full md:max-h-none rounded-t-3xl md:rounded-none animate-in slide-in-from-bottom md:slide-in-from-right duration-300 overflow-hidden overscroll-contain">
        
        {/* ─── MOBİL: Üst Sürükleme / Çekmece Çubuğu ─── */}
        <div className="pt-2 pb-1 flex justify-center md:hidden shrink-0 bg-white">
          <div className="w-12 h-1.5 bg-stone-300 rounded-full" />
        </div>

        {/* ─── MOBİL: Ergonomik & Kompakt Başlık Kartı ─── */}
        <div className="px-4 py-2.5 border-b border-stone-200/80 bg-stone-50/80 md:hidden flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-12 h-14 rounded-xl bg-stone-200 overflow-hidden border border-stone-200 shrink-0 shadow-2xs">
              <img
                src={getMinioUrl(outfit.coverImageUrl)}
                alt={outfit.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="px-2 py-0.5 rounded-full bg-[#4A5D3E]/10 text-[#4A5D3E] text-[9px] font-bold tracking-wider uppercase">
                  {outfit.itemCount} Parça Set
                </span>
                {outfit.showDiscountBadge && outfit.discountValue && (
                  <span className="px-1.5 py-0.5 rounded-full bg-rose-600 text-white text-[9px] font-black">
                    %{outfit.discountValue}
                  </span>
                )}
              </div>
              <h3 className="text-xs font-bold text-stone-900 truncate mt-0.5 font-serif">
                {outfit.title}
              </h3>
              <div className="flex items-baseline gap-1.5 mt-0.5">
                <span className="text-sm font-bold font-serif text-[#4A5D3E]">
                  {formatPrice(outfit.price)}
                </span>
                {outfit.showDiscountBadge && outfit.totalOriginalPrice && outfit.totalOriginalPrice > outfit.price && (
                  <span className="text-[10px] text-stone-400 line-through">
                    {formatPrice(outfit.totalOriginalPrice)}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <button
              type="button"
              onClick={() => toggleOutfit(outfit)}
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors cursor-pointer ${
                isOutfitWishlisted(outfit.id)
                  ? "bg-rose-50 text-rose-500"
                  : "bg-white text-stone-500 border border-stone-200"
              }`}
              title={isOutfitWishlisted(outfit.id) ? "Favorilerden Çıkar" : "Favorilere Ekle"}
            >
              <Heart
                size={15}
                className={isOutfitWishlisted(outfit.id) ? "fill-rose-500 text-rose-500" : ""}
              />
            </button>
            <button
              type="button"
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-stone-200/70 text-stone-600 hover:text-stone-900 flex items-center justify-center cursor-pointer"
              title="Kapat"
            >
              <X size={17} />
            </button>
          </div>
        </div>

        {/* ─── MASAÜSTÜ: Üst Başlık Çubuğu ─── */}
        <div className="hidden md:flex px-6 py-4 border-b border-stone-200/80 bg-white items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <span className="w-8 h-8 rounded-full bg-[#4A5D3E]/10 text-[#4A5D3E] flex items-center justify-center shrink-0">
              <Sparkles size={15} className="text-amber-500" />
            </span>
            <div>
              <h3 className="font-serif text-lg font-bold text-stone-900 leading-tight">
                {outfit.title}
              </h3>
              <span className="text-[11px] font-semibold text-stone-500">
                {outfit.itemCount} Parça Kombin Seti
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => toggleOutfit(outfit)}
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors cursor-pointer ${
                isOutfitWishlisted(outfit.id)
                  ? "bg-rose-50 text-rose-500"
                  : "bg-stone-100 text-stone-500 hover:text-rose-500 hover:bg-stone-200"
              }`}
              title={isOutfitWishlisted(outfit.id) ? "Favorilerden Çıkar" : "Favorilere Ekle"}
            >
              <Heart
                size={16}
                className={isOutfitWishlisted(outfit.id) ? "fill-rose-500 text-rose-500" : ""}
              />
            </button>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-stone-100 text-stone-500 hover:text-stone-900 hover:bg-stone-200 flex items-center justify-center transition-colors cursor-pointer"
              title="Kapat"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* ─── GÖVDE: 2 Sütun (Masaüstü) / Tek Akıcı Liste (Mobil) ─── */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden min-h-0">
          
          {/* MASAÜSTÜ SOL SÜTUN: Büyük Görsel ve Detaylar */}
          <div className="hidden md:flex md:w-5/12 lg:w-9/20 bg-stone-950 relative flex-col justify-end p-6 overflow-hidden shrink-0">
            <img
              src={getMinioUrl(outfit.coverImageUrl)}
              alt={outfit.title}
              className="absolute inset-0 w-full h-full object-cover opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/30 to-transparent" />

            <div className="relative z-10 space-y-2.5">
              <span className="px-3 py-1 rounded-full bg-[#4A5D3E] text-white text-[10px] font-bold tracking-widest uppercase inline-block shadow-xs">
                ÖZEL KOMBİN · {outfit.itemCount} PARÇA
              </span>
              <h2 className="text-xl md:text-2xl font-serif font-bold text-white leading-tight">
                {outfit.title}
              </h2>
              {outfit.description && (
                <p className="text-white/85 text-xs font-light line-clamp-3 leading-relaxed">
                  {outfit.description}
                </p>
              )}

              <div className="pt-2 flex items-baseline gap-2.5">
                <span className="text-2xl font-bold font-serif text-amber-400">
                  {formatPrice(outfit.price)}
                </span>
                {outfit.showDiscountBadge && outfit.totalOriginalPrice && outfit.totalOriginalPrice > outfit.price && (
                  <span className="text-xs text-stone-300 line-through">
                    {formatPrice(outfit.totalOriginalPrice)}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* SAĞ SÜTUN (MOBİLDE TAM ALAN): Kombin Parçaları & Beden Seçimleri */}
          <div className="flex-1 flex flex-col justify-between overflow-hidden bg-white min-h-0">
            
            {/* Kaydırılabilir Parça Listesi */}
            <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-3.5 overscroll-contain">
              <div className="flex items-center justify-between pb-2 border-b border-stone-100">
                <span className="text-xs font-bold uppercase tracking-wider text-stone-800 flex items-center gap-1.5">
                  <Layers size={14} className="text-[#4A5D3E]" /> Kombin Parçaları ({outfit.items.length})
                </span>
                <span className="text-[11px] text-stone-400 font-light">
                  Her ürün için beden seçin
                </span>
              </div>

              <div className="space-y-3">
                {outfit.items.map((item, idx) => {
                  const currentSelectedVariantId = selectedVariants[item.productId];

                  return (
                    <div
                      key={item.id}
                      className="p-3 sm:p-4 rounded-2xl border border-stone-200/90 bg-stone-50/50 hover:bg-white hover:border-stone-300 transition-all space-y-2.5 shadow-2xs"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-13 h-15 rounded-xl bg-white border border-stone-200 overflow-hidden shrink-0 shadow-2xs">
                          <img
                            src={getMinioUrl(item.imageUrl || outfit.coverImageUrl)}
                            alt={item.productName}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <span className="text-[9px] sm:text-[10px] font-mono font-bold text-stone-400 uppercase tracking-wider">
                            PARÇA #{idx + 1}
                          </span>
                          <h4 className="text-xs sm:text-sm font-bold text-stone-900 truncate">
                            {item.productName}
                          </h4>
                          <div className="flex items-center gap-2 mt-0.5 text-[11px] text-stone-600">
                            <span
                              className="w-2.5 h-2.5 rounded-full border border-stone-300 shrink-0"
                              style={{ backgroundColor: item.colorHexCode || "#ccc" }}
                            />
                            <span className="truncate">{item.colorName || "Standart Renk"}</span>
                            <span className="text-stone-300">·</span>
                            <span className="font-semibold text-[#4A5D3E]">
                              {formatPrice(item.productDiscountPrice || item.productBasePrice)}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Beden Seçimi Butonları */}
                      <div className="pt-2 border-t border-stone-200/60">
                        <div className="text-[11px] font-semibold text-stone-700 flex items-center justify-between mb-1.5">
                          <span>Beden:</span>
                          {selectedSizeNames[item.productId] ? (
                            <span className="text-[#4A5D3E] font-bold text-[11px] flex items-center gap-1">
                              <Check size={12} /> {selectedSizeNames[item.productId]}
                            </span>
                          ) : (
                            <span className="text-rose-500 font-medium text-[10px]">
                              Beden seçilmedi
                            </span>
                          )}
                        </div>

                        <div className="flex flex-wrap gap-1.5">
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
                                  className={`min-w-[40px] h-9 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center ${
                                    isOutOfStock
                                      ? "bg-stone-100 text-stone-300 line-through cursor-not-allowed border border-dashed border-stone-200"
                                      : isSelected
                                      ? "bg-[#4A5D3E] text-white shadow-xs scale-105"
                                      : "bg-white text-stone-800 border border-stone-300 hover:border-stone-800 active:scale-95"
                                  }`}
                                >
                                  {variant.sizeName}
                                </button>
                              );
                            })
                          ) : (
                            <span className="text-xs text-stone-400 italic">Standart Beden</span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ─── ALT SABİT AKSİYON VE FİYAT ÇUBUĞU ─── */}
            <div className="p-3.5 sm:p-5 pb-6 sm:pb-5 border-t border-stone-200/90 bg-white space-y-2.5 sm:space-y-3 shrink-0 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] z-20">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] sm:text-[11px] text-stone-500 font-medium block">
                    Kombin Set Fiyatı ({outfit.itemCount} Parça):
                  </span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-lg sm:text-xl font-bold font-serif text-[#4A5D3E]">
                      {formatPrice(outfit.price)}
                    </span>
                    {outfit.showDiscountBadge && outfit.totalOriginalPrice && outfit.totalOriginalPrice > outfit.price && (
                      <span className="text-xs text-stone-400 line-through">
                        {formatPrice(outfit.totalOriginalPrice)}
                      </span>
                    )}
                  </div>
                </div>

                {outfit.showDiscountBadge && savings > 0 && (
                  <div className="bg-emerald-50 border border-emerald-200/60 px-2.5 py-1 rounded-full text-right">
                    <p className="text-[11px] font-bold text-emerald-700">
                      {formatPrice(savings)} İndirim Avantajı
                    </p>
                  </div>
                )}
              </div>

              <button
                type="button"
                onClick={handleAddBundleToCart}
                disabled={isAddingToCart}
                className="w-full py-3.5 rounded-2xl bg-[#4A5D3E] hover:bg-[#3d4d33] active:scale-[0.99] text-white font-bold text-xs sm:text-sm tracking-wider uppercase transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer"
              >
                <ShoppingBag size={18} />
                {isAddingToCart
                  ? "Sepete Ekleniyor..."
                  : `Tüm Kombini Sepete Ekle (${outfit.itemCount} Parça)`}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
