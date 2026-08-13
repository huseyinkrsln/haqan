"use client";

import { useState } from "react";
import { Tag, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { formatPrice } from "@/lib/data";

interface CartSummaryProps {
  subtotal: number;
  showCheckoutButton?: boolean;
}

const SHIPPING_THRESHOLD = 999;
const SHIPPING_FEE = 49;

export default function CartSummary({
  subtotal,
  showCheckoutButton = true,
}: CartSummaryProps) {
  const [coupon, setCoupon] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  const [discount, setDiscount] = useState(0);
  const router = useRouter();

  const shipping = subtotal >= SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
  const total = subtotal - discount + shipping;

  const applyCoupon = () => {
    if (coupon.toUpperCase() === "HAQAN10") {
      setDiscount(Math.round(subtotal * 0.1));
      setCouponApplied(true);
    } else {
      alert("Geçersiz kupon kodu.");
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-card p-5 space-y-4">
      <h2 className="font-serif text-lg font-bold text-gray-900">Sipariş Özeti</h2>

      <div className="space-y-3 text-sm">
        <div className="flex justify-between text-gray-600">
          <span>Ara Toplam</span>
          <span className="font-medium text-gray-900">{formatPrice(subtotal)}</span>
        </div>
        {discount > 0 && (
          <div className="flex justify-between text-green-600">
            <span>İndirim (HAQAN10)</span>
            <span className="font-medium">-{formatPrice(discount)}</span>
          </div>
        )}
        <div className="flex justify-between text-gray-600">
          <span>Kargo</span>
          <span className={`font-medium ${shipping === 0 ? "text-green-600" : "text-gray-900"}`}>
            {shipping === 0 ? "ÜCRETSİZ" : formatPrice(shipping)}
          </span>
        </div>
        {subtotal < SHIPPING_THRESHOLD && (
          <p className="text-xs text-[#4A5D3E] bg-[#4A5D3E]/5 rounded-lg px-3 py-2">
            {formatPrice(SHIPPING_THRESHOLD - subtotal)} daha alışveriş yapın, kargo ücretsiz!
          </p>
        )}
        <div className="border-t border-gray-100 pt-3 flex justify-between">
          <span className="font-bold text-gray-900">Toplam</span>
          <span className="font-bold text-xl text-gray-900">{formatPrice(total)}</span>
        </div>
      </div>

      {/* Coupon */}
      {!couponApplied ? (
        <div className="flex gap-2">
          <div className="flex-1 flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-2 focus-within:border-[#4A5D3E] transition-colors">
            <Tag size={14} className="text-gray-400 shrink-0" />
            <input
              type="text"
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
              placeholder="Kupon kodu"
              className="flex-1 text-sm outline-none bg-transparent"
            />
          </div>
          <button
            onClick={applyCoupon}
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-sm font-medium rounded-lg transition-colors"
          >
            Uygula
          </button>
        </div>
      ) : (
        <p className="text-xs text-green-600 bg-green-50 rounded-lg px-3 py-2 font-medium">
          ✓ Kupon kodu uygulandı — %10 indirim
        </p>
      )}

      {showCheckoutButton && (
        <button
          onClick={() => router.push("/odeme")}
          className="w-full flex items-center justify-center gap-2 bg-[#4A5D3E] hover:bg-[#3A4B30] text-white font-semibold py-3.5 rounded-xl transition-colors tracking-wider text-sm"
        >
          ÖDEMEYE GEÇ
          <ChevronRight size={16} />
        </button>
      )}
    </div>
  );
}
