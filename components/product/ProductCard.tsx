"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";
import { formatPrice, Product } from "@/lib/data";
import { useWishlist } from "@/context/WishlistContext";

interface ProductCardProps {
  id: string;
  slug: string;
  name: string;
  price: number;
  oldPrice?: number;
  image: string;
  badge?: string;
  product?: Product;
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
  const wishlisted = isWishlisted(id);

  return (
    <div className="group bg-white rounded-xl border border-gray-100 shadow-card hover:shadow-card-hover transition-all duration-300 overflow-hidden">
      <Link href={`/urun/${slug}`} className="block relative">
        <div className="relative aspect-[3/4] overflow-hidden bg-gray-50">
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 50vw, 25vw"
          />
          {badge && (
            <span className="absolute top-2 left-2 bg-[#4A5D3E] text-white text-[10px] font-semibold px-2 py-0.5 rounded-full tracking-wide">
              {badge}
            </span>
          )}
        </div>
      </Link>

      <div className="p-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <Link href={`/urun/${slug}`}>
              <h3 className="text-sm font-medium text-gray-900 truncate hover:text-[#4A5D3E] transition-colors">
                {name}
              </h3>
            </Link>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-sm font-semibold text-gray-900">
                {formatPrice(price)}
              </span>
              {oldPrice && (
                <span className="text-xs text-gray-400 line-through">
                  {formatPrice(oldPrice)}
                </span>
              )}
            </div>
          </div>
          <button
            onClick={() => product && toggleItem(product)}
            aria-label="Favorilere ekle"
            className="p-1.5 rounded-lg hover:bg-gray-50 transition-colors shrink-0"
          >
            <Heart
              size={16}
              className={
                wishlisted
                  ? "fill-[#4A5D3E] text-[#4A5D3E]"
                  : "text-gray-300 hover:text-gray-500"
              }
            />
          </button>
        </div>
      </div>
    </div>
  );
}
