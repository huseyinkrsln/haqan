"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingBag, Check } from "lucide-react";
import { Product } from "@/types/api.types";
import { formatPrice, getMinioUrl } from "@/lib/utils";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";
import { useState } from "react";

interface FavoriteProductCardProps {
  product: Product;
  badge?: string;
}

export default function FavoriteProductCard({
  product,
  badge,
}: FavoriteProductCardProps) {
  const { toggleItem, isWishlisted } = useWishlist();
  const { addItem, items: cartItems } = useCart();
  const [addedToCart, setAddedToCart] = useState(false);

  const wishlisted = isWishlisted(String(product.id));

  const mainImg = product.images?.find((img) => img.isProductMain || img.isMain);
  const imageUrl = getMinioUrl(mainImg?.imageUrl || product.mainImageUrl || product.images?.[0]?.imageUrl);

  const price = product.discountPrice && product.discountPrice > 0 ? product.discountPrice : product.basePrice;
  const originalPrice = product.discountPrice && product.discountPrice > 0 ? product.basePrice : undefined;

  // İndirim oranı
  const discountPercent =
    originalPrice && originalPrice > price
      ? Math.round(((originalPrice - price) / originalPrice) * 100)
      : null;

  // Sepette var mı kontrolü
  const isAlreadyInCart = cartItems.some((i) => String(i.id) === String(product.id));

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    if (addedToCart) return; // Çift tıklamayı ve tekrar eklemeyi engelle

    const inStockVariant = product.variants?.find((v: any) => (v.stockQuantity || 0) > 0);
    const realVariantId = inStockVariant?.variantId || inStockVariant?.id || product.variants?.[0]?.variantId || product.variants?.[0]?.id;

    addItem({
      id: String(product.id),
      variantId: realVariantId ? Number(realVariantId) : undefined,
      name: product.name,
      price: price,
      image: imageUrl,
      size: inStockVariant?.sizeName || product.variants?.[0]?.sizeName || "Standart",
      color: inStockVariant?.colorName || product.variants?.[0]?.colorName || "Standart",
      quantity: 1,
      slug: product.slug,
    });

    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 1200);
  };

  return (
    <div className="group bg-white rounded-2xl sm:rounded-3xl border border-gray-200/80 shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.08)] hover:border-gray-300 hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col h-full">
      {/* Görsel Alanı */}
      <Link href={`/urun/${product.slug}`} className="block relative">
        <div className="relative aspect-[3/4] overflow-hidden bg-[#F6F6F4] flex items-center justify-center">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              sizes="(max-width: 768px) 50vw, 25vw"
            />
          ) : (
            <div className="flex flex-col items-center justify-center p-4 text-center text-gray-300 group-hover:text-[#4A5D3E] transition-colors">
              <span className="font-serif text-base font-bold tracking-widest text-gray-400 mb-1">HQ</span>
              <span className="text-[9px] uppercase tracking-widest font-medium">Görsel Yok</span>
            </div>
          )}

          {/* Rozetler */}
          <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5 z-10 max-w-[calc(100%-44px)] pointer-events-none">
            {badge && (
              <span className="bg-gray-900/90 backdrop-blur-md text-white text-[8px] sm:text-[9px] font-bold px-2.5 py-0.5 rounded-full tracking-wider uppercase border border-white/15 shadow-xs self-start">
                {badge}
              </span>
            )}
            {discountPercent && (
              <span className="bg-rose-600 text-white text-[9px] sm:text-[10px] font-black px-2 sm:px-2.5 py-0.5 rounded-full tracking-wide shadow-xs border border-white/20 self-start">
                -%{discountPercent}
              </span>
            )}
          </div>

          {/* Favoriden Çıkar Butonu */}
          <button
            onClick={(e) => {
              e.preventDefault();
              toggleItem(product);
            }}
            aria-label="Favorilerden çıkar"
            className="absolute top-2.5 right-2.5 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-all shadow-xs cursor-pointer active:scale-90 bg-[#4A5D3E] text-white hover:bg-rose-600"
            title="Favorilerden çıkar"
          >
            <Heart size={14} fill="currentColor" />
          </button>
        </div>
      </Link>

      {/* Bilgi & Buton Alanı */}
      <div className="p-3.5 sm:p-4 flex flex-col gap-2.5 flex-1 justify-between">
        <div>
          {/* Kategori/Marka */}
          <span className="block text-[9px] sm:text-[10px] uppercase tracking-widest font-semibold text-gray-400 mb-0.5">
            {product.categoryName || product.brandName || "HAQAN"}
          </span>

          {/* Başlık */}
          <Link href={`/urun/${product.slug}`} className="block">
            <h3 className="text-xs sm:text-sm font-medium text-gray-900 line-clamp-1 hover:text-[#4A5D3E] transition-colors">
              {product.name}
            </h3>
          </Link>
        </div>

        {/* Fiyat */}
        <div className="pt-2 border-t border-gray-100 flex items-baseline gap-2 flex-wrap">
          <span
            className={`text-xs sm:text-sm md:text-base font-bold tracking-tight ${
              discountPercent ? "text-rose-600" : "text-gray-900"
            }`}
          >
            {formatPrice(price)}
          </span>
          {originalPrice && (
            <span className="text-[10px] sm:text-xs text-gray-400 line-through">
              {formatPrice(originalPrice)}
            </span>
          )}
        </div>

        {/* 🌟 SEPETE EKLE BUTONU 🌟 */}
        <button
          onClick={handleAddToCart}
          disabled={addedToCart}
          className={`w-full mt-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs font-bold tracking-wider transition-all shadow-2xs cursor-pointer ${
            addedToCart
              ? "bg-emerald-600 text-white border border-emerald-600 cursor-not-allowed"
              : "bg-[#4A5D3E] text-white hover:bg-[#3D4D33] active:scale-[0.98]"
          }`}
        >
          {addedToCart ? (
            <>
              <Check size={14} />
              EKLENDİ ✓
            </>
          ) : (
            <>
              <ShoppingBag size={14} />
              SEPETE EKLE
            </>
          )}
        </button>
      </div>
    </div>
  );
}
