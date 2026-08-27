"use client";

import { useState } from "react";
import { Tag, ChevronRight, CheckCircle2, AlertCircle, Loader2, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { formatPrice } from "@/lib/utils";
import { axiosInstance } from "@/lib/axios";

import { useSiteSettings } from "@/hooks/useSiteSettings";

interface CartSummaryProps {
  subtotal: number;
  showCheckoutButton?: boolean;
}

interface AppliedCoupon {
  id: number;
  code: string;
  discountType: string;
  value: number;
  minOrderAmount: number;
  discountAmount: number;
}

export default function CartSummary({
  subtotal,
  showCheckoutButton = true,
}: CartSummaryProps) {
  const { data: settings } = useSiteSettings();

  const shippingThreshold = Number(settings?.freeshippingthreshold || settings?.freeShippingThreshold || 1500);
  const shippingFee = Number(settings?.flatshippingrate || settings?.flatShippingRate || 79.90);

  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<AppliedCoupon | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const router = useRouter();

  const discount = appliedCoupon ? appliedCoupon.discountAmount : 0;
  const shipping = subtotal >= shippingThreshold ? 0 : shippingFee;
  const total = Math.max(0, subtotal - discount + shipping);

  const handleApplyCoupon = async () => {
    const code = couponCode.trim().toUpperCase();
    if (!code) {
      setErrorMessage("Lütfen geçerli bir kupon kodu giriniz.");
      return;
    }

    setLoading(true);
    setErrorMessage(null);

    try {
      let found: any = null;

      // 1. Doğrudan özel getbycode endpoint'ini çağır
      try {
        const res = await axiosInstance.get(`/api/Coupons/getbycode?code=${encodeURIComponent(code)}`);
        const raw = res.data;
        found = raw?.data || raw?.Data || raw;
      } catch (e: any) {
        console.warn("getbycode çağrısı fallback'e yönlendiriliyor:", e?.response?.data || e?.message);
        // 2. Fallback: getall üzerinden ara
        const res = await axiosInstance.get(`/api/Coupons/getall?page=1&take=100`);
        const raw = res.data;
        const list: any[] = Array.isArray(raw)
          ? raw
          : raw?.data || raw?.Data || raw?.items || raw?.Items || [];
        found = list.find((c: any) => {
          const itemCode = (c.code || c.Code || "").toString().trim().toUpperCase();
          return itemCode === code;
        });
      }

      console.log("Kupon arama sonucu:", found);

      if (!found || (!found.code && !found.Code && !found.id && !found.Id)) {
        setErrorMessage("Girdiğiniz kupon kodu bulunamadı veya geçersiz.");
        return;
      }

      const itemCode = found.code || found.Code || code;
      const startDate = found.startDate || found.StartDate;
      const endDate = found.endDate || found.EndDate;
      const minAmount = Number(found.minOrderAmount ?? found.MinOrderAmount ?? 0);
      const val = Number(found.value ?? found.Value ?? 0);
      const discountType = (found.discountType || found.DiscountType || "Percentage").toString();

      // Tarih kontrolü (Eğer geçerli tarih parse edilebilirse)
      const now = new Date();
      if (startDate) {
        const start = new Date(startDate);
        if (!isNaN(start.getTime()) && start > now) {
          setErrorMessage("Bu kupon kodu henüz aktif değildir.");
          return;
        }
      }
      if (endDate) {
        const end = new Date(endDate);
        if (!isNaN(end.getTime()) && end < now) {
          setErrorMessage("Bu kupon kodunun geçerlilik süresi dolmuştur.");
          return;
        }
      }

      // Minimum sepet tutarı kontrolü
      if (minAmount > 0 && subtotal < minAmount) {
        setErrorMessage(
          `Bu kupon için minimum sepet tutarı ${formatPrice(minAmount)} olmalıdır.`
        );
        return;
      }

      // İndirim tutarı hesaplama
      let calculatedDiscount = 0;
      const isPercentage =
        discountType.toLowerCase().includes("percent") ||
        discountType === "Percentage";

      if (isPercentage) {
        calculatedDiscount = Math.round((subtotal * val) / 100);
      } else {
        calculatedDiscount = Math.min(val, subtotal);
      }

      setAppliedCoupon({
        id: found.id || found.Id || 0,
        code: itemCode,
        discountType: discountType,
        value: val,
        minOrderAmount: minAmount,
        discountAmount: calculatedDiscount,
      });
      setErrorMessage(null);
    } catch (err: any) {
      console.error("Kupon sorgulama hatası:", err);
      setErrorMessage("Kupon doğrulanırken bir hata oluştu.");
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode("");
    setErrorMessage(null);
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-2xs p-5 sm:p-6 space-y-4">
      <h2 className="font-serif text-lg font-bold text-gray-900">Sipariş Özeti</h2>

      <div className="space-y-3 text-sm">
        <div className="flex justify-between text-gray-600">
          <span>Ara Toplam</span>
          <span className="font-medium text-gray-900">{formatPrice(subtotal)}</span>
        </div>

        {appliedCoupon && (
          <div className="flex justify-between text-emerald-600 bg-emerald-50/70 border border-emerald-100 rounded-xl px-3 py-2 text-xs sm:text-sm font-medium">
            <div className="flex items-center gap-1.5 min-w-0">
              <CheckCircle2 size={14} className="shrink-0 text-emerald-600" />
              <span className="truncate">Kupon ({appliedCoupon.code})</span>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <span className="font-bold">-{formatPrice(discount)}</span>
              <button
                onClick={handleRemoveCoupon}
                className="text-gray-400 hover:text-red-500 transition-colors p-0.5 rounded cursor-pointer"
                title="Kuponu Kaldır"
              >
                <X size={13} />
              </button>
            </div>
          </div>
        )}

        <div className="flex justify-between text-gray-600">
          <span>Kargo</span>
          <span className={`font-medium ${shipping === 0 ? "text-emerald-600" : "text-gray-900"}`}>
            {shipping === 0 ? "ÜCRETSİZ" : formatPrice(shipping)}
          </span>
        </div>

        {subtotal < shippingThreshold && (
          <p className="text-xs text-[#4A5D3E] bg-[#4A5D3E]/5 rounded-lg px-3 py-2">
            {formatPrice(shippingThreshold - subtotal)} daha alışveriş yapın, kargo ücretsiz!
          </p>
        )}

        <div className="border-t border-gray-100 pt-3 flex justify-between">
          <span className="font-bold text-gray-900">Toplam</span>
          <span className="font-bold text-xl text-gray-900">{formatPrice(total)}</span>
        </div>
      </div>

      {/* ─── KUPON KODU SORGULAMA ALANI ─── */}
      {!appliedCoupon ? (
        <div className="space-y-2 pt-2 border-t border-gray-100">
          <div className="flex gap-2">
            <div className="flex-1 flex items-center gap-2 border border-gray-200 rounded-xl px-3 py-2 focus-within:border-[#4A5D3E] transition-colors bg-gray-50/50">
              <Tag size={14} className="text-gray-400 shrink-0" />
              <input
                type="text"
                value={couponCode}
                onChange={(e) => {
                  setCouponCode(e.target.value.toUpperCase());
                  if (errorMessage) setErrorMessage(null);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleApplyCoupon();
                  }
                }}
                placeholder="İndirim kupon kodu"
                className="flex-1 text-xs sm:text-sm outline-none bg-transparent font-mono uppercase"
              />
            </div>
            <button
              onClick={handleApplyCoupon}
              disabled={loading || !couponCode.trim()}
              className="px-4 py-2 bg-[#4A5D3E] hover:bg-[#38472F] disabled:opacity-50 text-white text-xs sm:text-sm font-semibold rounded-xl transition-colors shrink-0 flex items-center gap-1.5 cursor-pointer"
            >
              {loading && <Loader2 size={13} className="animate-spin" />}
              Uygula
            </button>
          </div>

          {errorMessage && (
            <div className="flex items-start gap-1.5 text-xs text-rose-600 bg-rose-50 border border-rose-100 rounded-lg p-2.5 animate-in fade-in duration-200">
              <AlertCircle size={14} className="shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}
        </div>
      ) : null}

      {showCheckoutButton && (
        <button
          onClick={() => router.push("/odeme")}
          className="w-full flex items-center justify-center gap-2 bg-[#4A5D3E] hover:bg-[#38472F] text-white font-semibold py-3.5 rounded-xl transition-all tracking-wider text-sm shadow-xs cursor-pointer mt-4"
        >
          ÖDEMEYE GEÇ
          <ChevronRight size={16} />
        </button>
      )}
    </div>
  );
}
