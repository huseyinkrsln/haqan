"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";
import { Product } from "@/types/api.types";
import { getMinioUrl, formatPrice } from "@/lib/utils";
import { useWishlist } from "@/context/WishlistContext";

interface ProductCardProps {
  id?: string | number;
  slug?: string;
  name?: string;
  price?: number;
  oldPrice?: number;
  image?: string;
  badge?: string;
  product?: Product | any;
}

export default function ProductCard({
  id,
  slug,
  name,
  price,
  oldPrice,
  image,
  badge,
  product,
}: ProductCardProps) {
  const { toggleItem, isWishlisted } = useWishlist();

  // Bilgileri prop'lardan ya da product nesnesinden çıkar
  const productId = String(product?.id ?? id ?? "");
  const productSlug = product?.slug || slug || String(productId);
  const productName = product?.name || name || "Ürün";

  // Yalnızca stoğu olan renkler
  const colors = useMemo(() => {
    const rawColors = product?.colors || [];
    const variants = product?.variants || [];

    if (variants.length > 0) {
      return rawColors.filter((c: any) => {
        const cId = Number(c.colorId ?? c.id);
        const colorVariants = variants.filter((v: any) => Number(v.colorId) === cId);
        if (colorVariants.length === 0) return true;
        const totalStock = colorVariants.reduce((sum: number, v: any) => sum + (v.stockQuantity || 0), 0);
        return totalStock > 0;
      });
    }

    return rawColors;
  }, [product?.colors, product?.variants]);

  // Beden seçenekleri (Yalnızca stoğu olan bedenler)
  const sizes = useMemo(() => {
    const rawSizes = product?.sizes || [];
    const variants = product?.variants || [];

    if (variants.length > 0) {
      const inStockSizes = new Set<string>();
      variants.forEach((v: any) => {
        if ((v.stockQuantity || 0) > 0 && v.sizeName) {
          inStockSizes.add(v.sizeName);
        }
      });
      if (inStockSizes.size > 0) {
        return Array.from(inStockSizes);
      }
    }
    return rawSizes;
  }, [product?.sizes, product?.variants]);

  // Fiyat hesaplama
  const currentPrice =
    product?.discountPrice && product.discountPrice > 0
      ? product.discountPrice
      : product?.basePrice ?? price ?? 0;

  const originalPrice =
    product?.discountPrice && product.discountPrice > 0
      ? product?.basePrice
      : oldPrice;

  // İndirim oranı hesaplama
  const discountPercent =
    originalPrice && originalPrice > currentPrice
      ? Math.round(((originalPrice - currentPrice) / originalPrice) * 100)
      : null;

  // Görsel bulma
  const defaultImage =
    image ||
    product?.mainImageUrl ||
    product?.images?.[0] ||
    (typeof product?.images?.[0] === "string"
      ? product?.images?.[0]
      : product?.images?.[0]?.imageUrl);

  const [activeImage, setActiveImage] = useState<string | null>(null);
  const resolvedImage = activeImage || defaultImage;
  const imageUrl = getMinioUrl(resolvedImage);

  // Rozet belirleme
  const displayBadge =
    badge ||
    (product?.isNewArrival
      ? "Yeni"
      : product?.isBestSeller
      ? "Çok Satan"
      : product?.isFeatured
      ? "Öne Çıkan"
      : undefined);

  const productObj: Product = product || {
    id: productId,
    name: productName,
    slug: productSlug,
    basePrice: currentPrice,
    discountPrice: discountPercent ? currentPrice : undefined,
    mainImageUrl: resolvedImage,
    images: resolvedImage ? [{ id: 1, imageUrl: resolvedImage, isProductMain: true, isMain: true }] : [],
    colors: colors,
    variants: [],
  };

  const wishlisted = isWishlisted(productId);

  return (
    <div className="group bg-white rounded-2xl sm:rounded-3xl border border-gray-200/80 shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.08)] hover:border-gray-300 hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col h-full">
      {/* ─── Görsel Alanı (Zarif Kenarlı ve Yumuşak Arka Plan) ─── */}
      <Link href={`/urun/${productSlug}`} className="block relative">
        <div className="relative aspect-[3/4] overflow-hidden bg-[#F6F6F4] flex items-center justify-center">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={productName}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              sizes="(max-width: 768px) 50vw, 25vw"
            />
          ) : (
            <div className="flex flex-col items-center justify-center p-4 text-center text-gray-300 group-hover:text-[#4A5D3E] transition-colors">
              <span className="font-serif text-xl font-bold tracking-widest text-gray-400 mb-1">HQ</span>
              <span className="text-[9px] uppercase tracking-widest font-semibold">Görsel Yok</span>
            </div>
          )}

          {/* 🌟 LÜKS ROZETLER (Kapsül Tasarım) 🌟 */}
          <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5 z-10 max-w-[calc(100%-44px)] pointer-events-none">
            {displayBadge && (
              <span className="bg-gray-900/90 backdrop-blur-md text-white text-[8px] sm:text-[9px] font-bold px-2.5 py-0.5 sm:py-1 rounded-full tracking-wider uppercase border border-white/15 shadow-xs self-start">
                {displayBadge}
              </span>
            )}
            {discountPercent && (
              <span className="bg-rose-600 text-white text-[9px] sm:text-[10px] font-black px-2 sm:px-2.5 py-0.5 rounded-full tracking-wide shadow-xs border border-white/20 self-start animate-in fade-in duration-300">
                -%{discountPercent}
              </span>
            )}
          </div>

          {/* Favori Butonu (Yüzen Kapsül) */}
          <button
            onClick={(e) => {
              e.preventDefault();
              toggleItem(productObj);
            }}
            aria-label="Favorilere ekle"
            className={`absolute top-2.5 right-2.5 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-all z-10 shadow-xs cursor-pointer active:scale-90 ${
              wishlisted
                ? "bg-[#4A5D3E] text-white shadow-sm"
                : "bg-white/90 text-gray-500 hover:bg-white hover:text-rose-600 backdrop-blur-md"
            }`}
          >
            <Heart size={14} fill={wishlisted ? "currentColor" : "none"} />
          </button>
        </div>
      </Link>

      {/* ─── Bilgi & Seçenekler Alanı ─── */}
      <div className="p-3.5 sm:p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Marka Başlığı */}
          <div className="flex items-center justify-between gap-1 text-[9px] sm:text-[10px] text-gray-400 mb-1">
            <span className="truncate uppercase tracking-widest font-semibold text-gray-400">
              {product?.brandName || product?.categoryName || "HAQAN"}
            </span>
          </div>

          {/* Ürün İsmi (Koyu, Belirgin & Zarif Tipografi) */}
          <Link href={`/urun/${productSlug}`} className="block">
            <h3
              className="text-xs sm:text-sm font-bold font-serif text-stone-950 line-clamp-1 hover:text-[#4A5D3E] transition-colors leading-snug tracking-tight"
              title={productName}
            >
              {productName}
            </h3>
          </Link>

          {/* Renk Seçenekleri */}
          {colors && colors.length > 0 && (
            <div className="flex items-center gap-1.5 mt-2">
              {colors.map((c: any) => (
                <Link
                  key={c.colorId ?? c.id}
                  href={`/urun/${productSlug}?color=${c.colorId ?? c.id}`}
                  title={c.colorName}
                  onMouseEnter={() => {
                    if (c.imageUrl) setActiveImage(c.imageUrl);
                  }}
                  onMouseLeave={() => setActiveImage(null)}
                  className="w-3.5 h-3.5 rounded-full border border-gray-300 ring-1 ring-black/5 hover:scale-125 transition-transform cursor-pointer relative"
                  style={{ backgroundColor: c.hexCode || "#000000" }}
                />
              ))}
              {colors.length > 3 && (
                <span className="text-[9px] text-gray-400 font-medium ml-0.5">
                  +{colors.length - 3}
                </span>
              )}
            </div>
          )}

          {/* Beden Seçenekleri (Tümü Açık, Kalın & Kurumsal Ayırıcı) */}
          {sizes && sizes.length > 0 && (
            <div className="flex items-center gap-1.5 mt-2 flex-wrap">
              {sizes.map((s: string, idx: number) => (
                <span
                  key={s}
                  className="inline-flex items-center text-[10px] sm:text-[11px] font-bold text-gray-800 tracking-wider"
                >
                  <span>{s}</span>
                  {idx < sizes.length - 1 && (
                    <span className="text-gray-300 font-light ml-1.5 select-none">·</span>
                  )}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Fiyat Alanı */}
        <div className="pt-2.5 mt-2.5 border-t border-gray-100 flex items-baseline gap-1.5 sm:gap-2 flex-wrap">
          <span
            className={`text-xs sm:text-sm md:text-base font-bold tracking-tight whitespace-nowrap ${
              discountPercent ? "text-rose-600" : "text-gray-900"
            }`}
          >
            {formatPrice(currentPrice)}
          </span>
          {originalPrice && originalPrice > currentPrice && (
            <span className="text-[10px] sm:text-xs text-gray-400 line-through whitespace-nowrap">
              {formatPrice(originalPrice)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
