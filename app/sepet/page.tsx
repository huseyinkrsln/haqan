"use client";

import Link from "next/link";
import { ShoppingBag, ArrowRight } from "lucide-react";
import { useCart } from "@/context/CartContext";
import CartItem from "@/components/cart/CartItem";
import CartSummary from "@/components/cart/CartSummary";

export default function SepetPage() {
  const { items, totalPrice } = useCart();

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-6 md:py-10">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-gray-400 mb-6">
        <Link href="/" className="hover:text-gray-700">Ana Sayfa</Link>
        <span>›</span>
        <span className="text-gray-700 font-medium">Sepetim</span>
      </nav>

      <h1 className="font-serif text-2xl md:text-3xl font-bold text-gray-900 mb-8">
        Sepetim{" "}
        {items.length > 0 && (
          <span className="text-[#4A5D3E] text-lg ml-2">({items.length} ürün)</span>
        )}
      </h1>

      {items.length === 0 ? (
        /* Empty cart state */
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-6">
            <ShoppingBag size={32} className="text-gray-300" />
          </div>
          <h2 className="font-serif text-xl font-semibold text-gray-700 mb-2">
            Sepetiniz boş
          </h2>
          <p className="text-gray-500 text-sm mb-8 max-w-xs">
            Beğendiğiniz ürünleri sepete ekleyerek alışverişe başlayabilirsiniz.
          </p>
          <Link
            href="/kategoriler"
            className="flex items-center gap-2 bg-[#4A5D3E] hover:bg-[#3A4B30] text-white font-semibold px-6 py-3 rounded-xl transition-colors text-sm"
          >
            Alışverişe Başla <ArrowRight size={16} />
          </Link>
        </div>
      ) : (
        /* Cart with items */
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8">
          {/* Cart items list */}
          <div className="space-y-3">
            {items.map((item) => (
              <CartItem key={`${item.id}-${item.size}-${item.color}`} item={item} />
            ))}
          </div>

          {/* Order summary */}
          <div>
            <CartSummary subtotal={totalPrice} />
          </div>
        </div>
      )}
    </div>
  );
}
