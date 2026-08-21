"use client";

import { useState, useMemo, useEffect } from "react";
import { Heart, ShoppingBag, Check, AlertCircle, Minus, Plus, Ban, CheckCircle2, BadgeCheck } from "lucide-react";
import { Product } from "@/types/api.types";
import { formatPrice, getMinioUrl } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";

interface ProductInfoProps {
  product: Product;
  selectedColorId?: number;
  onColorChange?: (colorId: number) => void;
}

export default function ProductInfo({
  product,
  selectedColorId,
  onColorChange,
}: ProductInfoProps) {
  const { addItem } = useCart();
  const { toggleItem, isWishlisted } = useWishlist();

  // 🌟 1. RENKLER 🌟
  const availableColors = useMemo(() => {
    return (product.colors || []).map((c: any) => ({
      id: Number(c.colorId ?? c.id),
      name: c.colorName ?? c.name ?? "Renk",
      hex: c.hexCode ?? c.hex ?? "#000000",
    }));
  }, [product.colors]);

  const [activeColorId, setActiveColorId] = useState<number>(
    selectedColorId || availableColors[0]?.id || 0
  );

  useEffect(() => {
    if (selectedColorId && availableColors.some((c) => c.id === selectedColorId)) {
      setActiveColorId(selectedColorId);
    } else if (availableColors.length > 0 && (!activeColorId || !availableColors.some((c) => c.id === activeColorId))) {
      const defaultId = availableColors[0].id;
      setActiveColorId(defaultId);
      if (onColorChange) onColorChange(defaultId);
    }
  }, [selectedColorId, availableColors]);

  const [selectedSizeId, setSelectedSizeId] = useState<number | null>(null);
  const [sizeError, setSizeError] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  // 🌟 2. SEÇİLİ RENGE AİT BEDEN VARYANTLARI 🌟
  const availableVariants = useMemo(() => {
    const variants = product.variants || [];
    if (variants.length === 0) return [];
    if (!activeColorId) return variants;

    const filtered = variants.filter((v: any) => Number(v.colorId) === Number(activeColorId));
    return filtered.length > 0 ? filtered : variants;
  }, [product.variants, activeColorId]);

  // İlk açılışta veya renk değiştiğinde ilk stoklu bedeni otomatik seç
  useEffect(() => {
    if (availableVariants.length > 0) {
      const firstInStock = availableVariants.find((v: any) => (v.stockQuantity ?? 0) > 0);
      if (firstInStock) {
        setSelectedSizeId(Number(firstInStock.sizeId ?? firstInStock.variantId ?? firstInStock.id));
      }
    }
  }, [availableVariants]);

  // Renk değişimi
  const handleColorSelect = (colorId: number) => {
    setActiveColorId(colorId);
    setSizeError(false);

    const newVariants = (product.variants || []).filter(
      (v: any) => Number(v.colorId) === Number(colorId)
    );
    const matched = newVariants.find(
      (v: any) => Number(v.sizeId ?? v.variantId ?? v.id) === Number(selectedSizeId)
    );

    if (!matched || (matched.stockQuantity ?? 0) <= 0) {
      const firstInStock = newVariants.find((v: any) => (v.stockQuantity ?? 0) > 0);
      setSelectedSizeId(firstInStock ? Number(firstInStock.sizeId ?? firstInStock.variantId ?? firstInStock.id) : null);
    }

    if (onColorChange) onColorChange(colorId);
  };

  // Seçili varyant
  const activeVariant = availableVariants.find((v: any) => {
    const sId = v.sizeId ?? v.variantId ?? v.id;
    return Number(sId) === Number(selectedSizeId);
  });

  const activeStock = activeVariant?.stockQuantity ?? 0;
  const hasAnyStockInColor = availableVariants.length === 0 || availableVariants.some((v: any) => (v.stockQuantity ?? 0) > 0);
  const isSelectedSizeOutOfStock = activeVariant !== undefined && activeStock <= 0;
  const isEntireColorOutOfStock = availableVariants.length > 0 && !hasAnyStockInColor;

  // Fiyat hesaplama
  const priceDiff = activeVariant?.priceDifference || 0;
  const basePrice =
    product.discountPrice && product.discountPrice > 0
      ? product.discountPrice
      : product.basePrice;
  const currentPrice = basePrice + priceDiff;
  const originalPrice =
    product.discountPrice && product.discountPrice > 0
      ? product.basePrice + priceDiff
      : undefined;

  // İndirim Oranı
  const discountPercent =
    originalPrice && originalPrice > currentPrice
      ? Math.round(((originalPrice - currentPrice) / originalPrice) * 100)
      : null;

  const wishlisted = isWishlisted(String(product.id));

  const handleAddToCart = () => {
    if (availableVariants.length > 0 && selectedSizeId === null) {
      setSizeError(true);
      return;
    }

    if (isSelectedSizeOutOfStock || isEntireColorOutOfStock) {
      return;
    }

    const colorObj = availableColors.find((c) => c.id === activeColorId);
    const sizeName = activeVariant?.sizeName || "Standart";

    const mainImg = product.images?.find((img) => img.isProductMain || img.isMain);
    const resolvedImage = mainImg?.imageUrl || product.mainImageUrl || product.images?.[0]?.imageUrl || "";

    const realVariantId = activeVariant?.variantId || activeVariant?.id || availableVariants[0]?.variantId || availableVariants[0]?.id;

    addItem({
      id: String(product.id),
      variantId: realVariantId ? Number(realVariantId) : undefined,
      name: product.name,
      price: currentPrice,
      image: resolvedImage,
      size: sizeName,
      color: colorObj?.name || "Standart",
      quantity,
      slug: product.slug,
    });

    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2200);
  };

  return (
    <div className="space-y-6">
      {/* Kategori & Rozetler */}
      <div className="flex items-center gap-2 flex-wrap">
        {product.categoryName && (
          <span className="text-xs font-bold tracking-widest text-[#4A5D3E] uppercase bg-[#4A5D3E]/10 px-2.5 py-1 rounded-full">
            {product.categoryName}
          </span>
        )}
        {product.isNewArrival && (
          <span className="text-xs font-bold text-white bg-slate-900 px-2.5 py-1 rounded-full">
            Yeni Sezon
          </span>
        )}
        {product.isBestSeller && (
          <span className="text-xs font-bold text-white bg-[#4A5D3E] px-2.5 py-1 rounded-full">
            Çok Satan
          </span>
        )}
      </div>

      {/* Başlık & Marka */}
      <div>
        <h1 className="font-serif text-2xl md:text-3xl font-bold text-gray-900 leading-tight">
          {product.name}
        </h1>
        {product.brandName && (
          <p className="text-xs text-gray-400 uppercase tracking-widest mt-1 font-semibold">
            {product.brandName}
          </p>
        )}
      </div>

      {/* Fiyat Alanı */}
      <div className="flex items-center gap-3 flex-wrap">
        <span
          className={`text-2xl md:text-3xl font-extrabold tracking-tight ${
            discountPercent ? "text-rose-600" : "text-gray-900"
          }`}
        >
          {formatPrice(currentPrice)}
        </span>
        {originalPrice && (
          <span className="text-base text-gray-400 line-through font-medium">
            {formatPrice(originalPrice)}
          </span>
        )}
        {discountPercent && (
          <span className="bg-rose-600 text-white text-xs font-black px-2.5 py-1 rounded-lg tracking-wider shadow-xs">
            -%{discountPercent} İNDİRİM
          </span>
        )}
        {priceDiff !== 0 && (
          <span className="text-xs font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-md">
            {priceDiff > 0 ? `+₺${priceDiff} Beden Farkı` : `-₺${Math.abs(priceDiff)} İndirim Farkı`}
          </span>
        )}
      </div>

      {/* 🌟 1. RENKLER 🌟 */}
      {availableColors.length > 0 && (
        <div className="pt-2 border-t border-gray-100">
          <p className="text-xs font-semibold tracking-widest text-gray-500 uppercase mb-2.5">
            Renk: <span className="text-gray-900 font-bold">{availableColors.find((c) => c.id === activeColorId)?.name}</span>
          </p>
          <div className="flex gap-2.5 flex-wrap">
            {availableColors.map((color) => (
              <button
                key={color.id}
                onClick={() => handleColorSelect(color.id)}
                title={color.name}
                className={`w-8 h-8 rounded-full border-2 transition-all relative flex items-center justify-center cursor-pointer ${
                  activeColorId === color.id
                    ? "border-[#4A5D3E] scale-110 shadow-md ring-2 ring-[#4A5D3E]/30"
                    : "border-gray-200 hover:border-gray-400"
                }`}
                style={{ backgroundColor: color.hex }}
                aria-label={color.name}
              >
                {activeColorId === color.id && (
                  <Check size={14} className={color.hex.toLowerCase() === "#ffffff" ? "text-black" : "text-white"} />
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 🌟 2. BEDENLER 🌟 */}
      {availableVariants.length > 0 && (
        <div className="pt-2 border-t border-gray-100">
          <div className="flex items-center justify-between mb-2.5">
            <p className="text-xs font-semibold tracking-widest text-gray-500 uppercase flex items-center gap-1.5">
              <span>Beden Seçin</span>
              {sizeError && (
                <span className="text-rose-600 font-bold lowercase text-[11px] animate-pulse">
                  — lütfen bir beden seçiniz
                </span>
              )}
            </p>
            {activeVariant && activeStock > 0 && (
              <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1">
                <CheckCircle2 size={13} /> Stokta Var
              </span>
            )}
          </div>

          <div className="flex gap-2.5 flex-wrap">
            {availableVariants.map((v: any, index: number) => {
              const stock = v.stockQuantity ?? 0;
              const inStock = stock > 0;
              const sizeId = v.sizeId ?? v.variantId ?? v.id ?? index;
              const isSelected = selectedSizeId === sizeId;
              const variantDiff = v.priceDifference || 0;

              return (
                <button
                  key={v.variantId || v.id || sizeId || index}
                  disabled={!inStock}
                  onClick={() => {
                    setSelectedSizeId(sizeId);
                    setSizeError(false);
                  }}
                  className={`relative px-4 py-2.5 text-xs sm:text-sm font-semibold rounded-xl border transition-all cursor-pointer flex items-center gap-1.5 ${
                    !inStock
                      ? "opacity-40 bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed line-through"
                      : isSelected
                      ? "bg-[#4A5D3E] text-white border-[#4A5D3E] shadow-sm ring-2 ring-[#4A5D3E]/30"
                      : sizeError
                      ? "bg-white text-gray-800 border-rose-300 hover:border-[#4A5D3E]"
                      : "bg-white text-gray-800 border-gray-200 hover:border-[#4A5D3E] hover:text-[#4A5D3E]"
                  }`}
                  title={!inStock ? "Bu bedenin stoğu tükendi" : undefined}
                >
                  <span>{v.sizeName || "Beden"}</span>

                  {variantDiff !== 0 && inStock && (
                    <span
                      className={`text-[10px] font-mono font-bold px-1 py-0.5 rounded ${
                        isSelected
                          ? "bg-white/20 text-white"
                          : "bg-amber-100 text-amber-800"
                      }`}
                    >
                      {variantDiff > 0 ? `+₺${variantDiff}` : `-₺${Math.abs(variantDiff)}`}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Stok Uyarı Mesajları */}
          {selectedSizeId !== null && activeStock > 0 && activeStock <= 5 && (
            <div className="flex items-center gap-1.5 text-xs text-amber-600 font-medium mt-2 animate-in fade-in">
              <AlertCircle size={14} />
              Acele edin! Seçilen bedenden son {activeStock} adet kaldı.
            </div>
          )}

          {selectedSizeId !== null && isSelectedSizeOutOfStock && (
            <div className="flex items-center gap-1.5 text-xs text-rose-600 font-semibold mt-2 animate-in fade-in">
              <Ban size={14} />
              Seçtiğiniz bedenin stoğu tükenmiştir.
            </div>
          )}
        </div>
      )}

      {/* 🌟 SATIN ALMA VE SEPETE EKLEME ALANI (DOĞRU BUTON DURUMU) 🌟 */}
      <div className="flex gap-2.5 sm:gap-3 items-center pt-3 border-t border-gray-100">
        {/* Adet Seçici */}
        <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden bg-white shrink-0 shadow-2xs">
          <button
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="px-3 py-2.5 hover:bg-gray-50 transition-colors text-gray-600 cursor-pointer"
            aria-label="Azalt"
          >
            <Minus size={15} />
          </button>
          <span className="px-3 py-2.5 font-bold text-xs sm:text-sm min-w-[36px] text-center text-gray-900">
            {quantity}
          </span>
          <button
            onClick={() => setQuantity((q) => Math.min(Math.max(1, activeStock || 99), q + 1))}
            className="px-3 py-2.5 hover:bg-gray-50 transition-colors text-gray-600 cursor-pointer"
            aria-label="Artır"
          >
            <Plus size={15} />
          </button>
        </div>

        {/* Sepete Ekle Butonu */}
        <button
          onClick={handleAddToCart}
          disabled={isSelectedSizeOutOfStock || isEntireColorOutOfStock}
          className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 sm:px-6 rounded-xl font-bold text-xs sm:text-sm transition-all shadow-md cursor-pointer ${
            isSelectedSizeOutOfStock || isEntireColorOutOfStock
              ? "bg-gray-200 text-gray-400 cursor-not-allowed shadow-none"
              : addedToCart
              ? "bg-emerald-600 text-white"
              : "bg-[#4A5D3E] text-white hover:bg-[#3D4D33] active:scale-[0.98]"
          }`}
        >
          {addedToCart ? (
            <>
              <Check size={16} />
              Sepete Eklendi!
            </>
          ) : isEntireColorOutOfStock ? (
            "Bu Renkte Stok Tükendi"
          ) : isSelectedSizeOutOfStock ? (
            "Bu Beden Tükendi"
          ) : (
            <>
              <ShoppingBag size={16} />
              Sepete Ekle
            </>
          )}
        </button>

        {/* Favori Butonu */}
        <button
          onClick={() => toggleItem(product)}
          aria-label="Favorilere ekle"
          className={`p-3 rounded-xl border transition-all shrink-0 cursor-pointer shadow-2xs ${
            wishlisted
              ? "bg-rose-50 border-rose-200 text-rose-600"
              : "border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-gray-900"
          }`}
        >
          <Heart size={18} className={wishlisted ? "fill-current text-rose-600" : ""} />
        </button>
      </div>

      {/* 🌟 4. ÖNE ÇIKAN ÖZELLİKLER (FEATURES) 🌟 */}
      {product.features && product.features.length > 0 && (
        <div className="pt-4 border-t border-gray-100 space-y-2.5">
          <p className="text-xs font-semibold tracking-widest text-gray-500 uppercase flex items-center gap-1.5">
            <BadgeCheck size={15} className="text-[#4A5D3E]" />
            Öne Çıkan Özellikler
          </p>
          <div className="flex flex-wrap gap-2">
            {product.features.map((f: any) => (
              <div
                key={f.id}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border border-gray-200/80 bg-gray-50/70 text-gray-800 text-xs font-medium shadow-2xs"
              >
                {f.icon ? (
                  <img
                    src={getMinioUrl(f.icon)}
                    alt={f.name}
                    className="w-4 h-4 object-contain shrink-0"
                  />
                ) : (
                  <CheckCircle2 size={14} className="text-[#4A5D3E] shrink-0" />
                )}
                <span>{f.name}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Açıklama */}
      {product.description && (
        <div className="pt-4 border-t border-gray-100">
          <p className="text-xs font-semibold tracking-widest text-gray-500 uppercase mb-2">
            Ürün Açıklaması
          </p>
          <p className="text-sm text-gray-600 leading-relaxed">
            {product.description}
          </p>
        </div>
      )}
    </div>
  );
}
