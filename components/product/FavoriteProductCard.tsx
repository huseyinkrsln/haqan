"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingBag } from "lucide-react";
import { Product, formatPrice } from "@/lib/data";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";
import { useState } from "react";
import StarRating from "@/components/ui/StarRating";

interface FavoriteProductCardProps {
  product: Product;
  badge?: string;
}

export default function FavoriteProductCard({
  product,
  badge,
}: FavoriteProductCardProps) {
  const { toggleItem, isWishlisted } = useWishlist();
  const { addItem } = useCart();
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [addedToCart, setAddedToCart] = useState(false);

  const wishlisted = isWishlisted(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      size: product.sizes[1] ?? product.sizes[0],
      color: selectedColor.name,
      quantity: 1,
      slug: product.slug,
    });
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  return (
    <div className="group bg-white rounded-xl border border-gray-100 shadow-card hover:shadow-card-hover transition-all duration-300 overflow-hidden flex flex-col">
      {/* Image area */}
      <Link href={`/urun/${product.slug}`} className="block relative">
        <div className="relative aspect-[3/4] overflow-hidden bg-gray-50">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 50vw, 25vw"
          />
          {/* Badge */}
          {badge && (
            <span className="absolute top-2.5 left-2.5 bg-[#4A5D3E] text-white text-[9px] font-bold px-2 py-0.5 rounded-full tracking-wider uppercase">
              {badge}
            </span>
          )}
          {/* Wishlist button */}
          <button
            onClick={(e) => {
              e.preventDefault();
              toggleItem(product);
            }}
            aria-label="Favorilerden çıkar"
            className={`absolute top-2.5 right-2.5 w-8 h-8 rounded-full flex items-center justify-center transition-all shadow-sm ${
              wishlisted
                ? "bg-[#4A5D3E] text-white"
                : "bg-white/90 text-gray-400 hover:bg-white"
            }`}
          >
            <Heart size={14} fill={wishlisted ? "currentColor" : "none"} />
          </button>
        </div>
      </Link>

      {/* Info area */}
      <div className="p-3 flex flex-col gap-2 flex-1">
        {/* Name + color name */}
        <div>
          <Link href={`/urun/${product.slug}`}>
            <h3 className="text-sm font-semibold text-gray-900 truncate hover:text-[#4A5D3E] transition-colors">
              {product.name}
            </h3>
          </Link>
          <p className="text-xs text-gray-400 mt-0.5">{selectedColor.name}</p>
        </div>

        {/* Price + Rating */}
        <div className="flex items-center justify-between gap-2">
          <span className="text-sm font-bold text-gray-900">
            {formatPrice(product.price)}
          </span>
          <StarRating rating={product.rating} reviewCount={product.reviewCount} size={11} />
        </div>

        {/* Color swatches */}
        <div className="flex gap-1.5">
          {product.colors.slice(0, 5).map((color) => (
            <button
              key={color.name}
              onClick={() => setSelectedColor(color)}
              title={color.name}
              className={`w-4 h-4 rounded-full border transition-all ${
                selectedColor.name === color.name
                  ? "border-[#4A5D3E] scale-125 shadow"
                  : "border-gray-200 hover:border-gray-400"
              }`}
              style={{ backgroundColor: color.hex }}
              aria-label={color.name}
            />
          ))}
        </div>

        {/* Add to cart button */}
        <button
          onClick={handleAddToCart}
          className={`mt-auto flex items-center justify-center gap-1.5 py-2 rounded-lg border text-xs font-semibold tracking-wider transition-all ${
            addedToCart
              ? "bg-[#4A5D3E] text-white border-[#4A5D3E]"
              : "border-[#4A5D3E] text-[#4A5D3E] hover:bg-[#4A5D3E] hover:text-white"
          }`}
        >
          <ShoppingBag size={12} />
          {addedToCart ? "EKLENDİ ✓" : "SEPETE EKLE"}
        </button>
      </div>
    </div>
  );
}
