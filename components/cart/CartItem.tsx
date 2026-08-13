"use client";

import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";
import { CartItem as CartItemType } from "@/context/CartContext";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/data";

interface CartItemProps {
  item: CartItemType;
}

export default function CartItem({ item }: CartItemProps) {
  const { removeItem, updateQuantity } = useCart();

  return (
    <div className="flex gap-4 p-4 bg-white rounded-xl border border-gray-100 shadow-card">
      <div className="relative w-24 h-28 md:w-28 md:h-32 shrink-0 rounded-lg overflow-hidden bg-gray-50">
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-cover"
          sizes="112px"
        />
      </div>

      <div className="flex-1 min-w-0 flex flex-col justify-between">
        <div>
          <h3 className="font-semibold text-gray-900 text-sm md:text-base truncate">
            {item.name}
          </h3>
          <div className="flex gap-3 mt-1">
            <span className="text-xs text-gray-500">Beden: {item.size}</span>
            <span className="text-xs text-gray-500">Renk: {item.color}</span>
          </div>
          <p className="font-bold text-gray-900 mt-2 text-sm md:text-base">
            {formatPrice(item.price * item.quantity)}
          </p>
        </div>

        <div className="flex items-center justify-between mt-3">
          {/* Quantity stepper */}
          <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
            <button
              onClick={() =>
                updateQuantity(item.id, item.size, item.color, item.quantity - 1)
              }
              className="px-2.5 py-1.5 hover:bg-gray-50 transition-colors text-gray-600"
              aria-label="Azalt"
            >
              <Minus size={13} />
            </button>
            <span className="px-3 py-1.5 text-sm font-semibold text-gray-900 border-x border-gray-200 min-w-[36px] text-center">
              {item.quantity}
            </span>
            <button
              onClick={() =>
                updateQuantity(item.id, item.size, item.color, item.quantity + 1)
              }
              className="px-2.5 py-1.5 hover:bg-gray-50 transition-colors text-gray-600"
              aria-label="Artır"
            >
              <Plus size={13} />
            </button>
          </div>

          {/* Remove */}
          <button
            onClick={() => removeItem(item.id, item.size, item.color)}
            className="p-2 text-gray-400 hover:text-red-500 transition-colors rounded-lg hover:bg-red-50"
            aria-label="Kaldır"
          >
            <Trash2 size={15} />
          </button>
        </div>
      </div>
    </div>
  );
}
