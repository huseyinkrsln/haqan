"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";
import { CartItem as CartItemType, useCart } from "@/context/CartContext";
import { formatPrice, getMinioUrl } from "@/lib/utils";

interface CartItemProps {
  item: CartItemType;
  onRequestRemove?: (item: CartItemType) => void;
}

export default function CartItem({ item, onRequestRemove }: CartItemProps) {
  const { removeItem, increaseQuantity, decreaseQuantity } = useCart();
  const imageUrl = getMinioUrl(item.image);
  const productTarget = item.slug || (item.productId ? String(item.productId) : item.id);

  const handleDecrease = () => {
    if (item.quantity > 1) {
      decreaseQuantity(item.id, item.size, item.color);
    } else {
      if (onRequestRemove) {
        onRequestRemove(item);
      } else {
        removeItem(item.id, item.size, item.color);
      }
    }
  };

  const handleRemove = () => {
    if (onRequestRemove) {
      onRequestRemove(item);
    } else {
      removeItem(item.id, item.size, item.color);
    }
  };

  return (
    <div className="flex gap-4 p-4 bg-white rounded-2xl border border-gray-100 shadow-card hover:shadow-card-hover transition-shadow">
      <Link href={`/urun/${productTarget}`} className="relative w-24 h-28 md:w-28 md:h-32 shrink-0 rounded-xl overflow-hidden bg-slate-900 border border-gray-100 flex items-center justify-center">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={item.name}
            fill
            className="object-cover"
            sizes="112px"
          />
        ) : (
          <span className="font-serif text-sm font-bold text-white/50">HQ</span>
        )}
      </Link>

      <div className="flex-1 min-w-0 flex flex-col justify-between">
        <div>
          <Link href={`/urun/${productTarget}`}>
            <h3 className="font-semibold text-gray-900 text-sm md:text-base truncate hover:text-[#4A5D3E] transition-colors">
              {item.name}
            </h3>
          </Link>
          {item.outfitTitle && (
            <div className="mt-1">
              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-800 bg-amber-50 border border-amber-200/80 px-2 py-0.5 rounded-full">
                ✨ {item.outfitTitle} Set Parçası
              </span>
            </div>
          )}
          <div className="flex gap-3 mt-1">
            {item.size && <span className="text-xs text-gray-500 font-medium">Beden: {item.size}</span>}
            {item.color && <span className="text-xs text-gray-500 font-medium">Renk: {item.color}</span>}
          </div>
          <p className="font-bold text-gray-900 mt-2 text-sm md:text-base">
            {formatPrice(item.price * item.quantity)}
          </p>
        </div>

        <div className="flex items-center justify-between mt-3">
          {/* Quantity stepper */}
          <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden bg-gray-50">
            <button
              onClick={handleDecrease}
              className="px-2.5 py-1.5 hover:bg-gray-100 transition-colors text-gray-600 cursor-pointer"
              aria-label="Azalt"
            >
              <Minus size={13} />
            </button>
            <span className="px-3 py-1.5 text-xs font-bold text-gray-900 border-x border-gray-200 min-w-[36px] text-center bg-white select-none">
              {item.quantity}
            </span>
            <button
              onClick={() => increaseQuantity(item.id, item.size, item.color)}
              className="px-2.5 py-1.5 hover:bg-gray-100 transition-colors text-gray-600 cursor-pointer"
              aria-label="Artır"
            >
              <Plus size={13} />
            </button>
          </div>

          {/* Remove */}
          <button
            onClick={handleRemove}
            className="p-2 text-gray-400 hover:text-red-500 transition-colors rounded-lg hover:bg-red-50 cursor-pointer"
            aria-label="Kaldır"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
