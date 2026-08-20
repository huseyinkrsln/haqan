"use client";

import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { Tag, Copy, Check, X, Sparkles } from "lucide-react";
import { axiosInstance } from "@/lib/axios";

interface CouponDto {
  id?: number;
  Id?: number;
  code?: string;
  Code?: string;
  discountType?: string;
  DiscountType?: string;
  value?: number;
  Value?: number;
  minOrderAmount?: number;
  MinOrderAmount?: number;
  startDate?: string;
  StartDate?: string;
  endDate?: string;
  EndDate?: string;
  isShowcase?: boolean;
  IsShowcase?: boolean;
  isShowCase?: boolean;
  IsShowCase?: boolean;
}

// Güvenli Kopyalama Fonksiyonu (HTTP LAN IP ve HTTPS dahil tüm ortamlarda çalışır)
function copyToClipboard(text: string): Promise<boolean> {
  return new Promise((resolve) => {
    if (typeof window === "undefined") {
      resolve(false);
      return;
    }

    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard
        .writeText(text)
        .then(() => resolve(true))
        .catch(() => fallbackCopy(text, resolve));
    } else {
      fallbackCopy(text, resolve);
    }
  });
}

function fallbackCopy(text: string, resolve: (success: boolean) => void) {
  try {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.left = "-999999px";
    textArea.style.top = "-999999px";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    const successful = document.execCommand("copy");
    textArea.remove();
    resolve(successful);
  } catch {
    resolve(false);
  }
}

export default function StickyCouponBar() {
  const [copied, setCopied] = useState(false);
  const [closed, setClosed] = useState(false);

  // Backend'den kuponları anlık çek
  const { data: coupons } = useQuery<CouponDto[]>({
    queryKey: ["active-coupons"],
    queryFn: async () => {
      try {
        const res = await axiosInstance.get("/api/coupons/getall?take=50&isAscending=false");
        const raw = res.data;
        const list: CouponDto[] = Array.isArray(raw)
          ? raw
          : Array.isArray(raw?.data)
          ? raw.data
          : Array.isArray(raw?.data?.data)
          ? raw.data.data
          : [];
        return list;
      } catch {
        return [];
      }
    },
    staleTime: 0,
    refetchOnWindowFocus: true,
  });

  // Panelde "Vitrinde Göster" seçilmiş veya süresi dolmamış aktif kuponu bul
  const activeCoupon = useMemo(() => {
    if (!coupons || coupons.length === 0) {
      return null;
    }

    const now = new Date();

    const isNotExpired = (c: CouponDto) => {
      const rawEnd = c.endDate || c.EndDate;
      if (!rawEnd) return true;
      const end = new Date(rawEnd);
      end.setHours(23, 59, 59, 999);
      return end >= now;
    };

    // 1. Öncelik: Admin panelinden "Vitrinde / Alt Çubukta Göster" seçilmiş ve tarihi geçerli kupon
    const showcaseCoupon = coupons.find(
      (c) =>
        (c.isShowcase === true ||
          c.IsShowcase === true ||
          c.isShowCase === true ||
          c.IsShowCase === true) &&
        isNotExpired(c)
    );

    if (showcaseCoupon) {
      return {
        code: showcaseCoupon.code || showcaseCoupon.Code || "",
        discountType: showcaseCoupon.discountType || showcaseCoupon.DiscountType || "Percentage",
        value: showcaseCoupon.value ?? showcaseCoupon.Value ?? 0,
        minOrderAmount: showcaseCoupon.minOrderAmount ?? showcaseCoupon.MinOrderAmount ?? 0,
      };
    }

    // 2. Öncelik: Tarihi dolmamış ilk aktif kupon
    const validList = coupons.filter(isNotExpired);
    const target = validList.length > 0 ? validList[0] : coupons[0];

    if (!target) return null;

    return {
      code: target.code || target.Code || "",
      discountType: target.discountType || target.DiscountType || "Percentage",
      value: target.value ?? target.Value ?? 0,
      minOrderAmount: target.minOrderAmount ?? target.MinOrderAmount ?? 0,
    };
  }, [coupons]);

  if (closed || !activeCoupon || !activeCoupon.code) return null;

  const isFixed =
    String(activeCoupon.discountType).toLowerCase() === "fixedamount" ||
    String(activeCoupon.discountType).toLowerCase() === "fixed" ||
    String(activeCoupon.discountType) === "0";

  const discountText = isFixed
    ? `₺${activeCoupon.value} İndirim`
    : `%${activeCoupon.value} İndirim`;

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const success = await copyToClipboard(activeCoupon.code);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <aside
      aria-label="İndirim Kuponu"
      className="fixed bottom-16 sm:bottom-6 left-3 right-3 sm:left-1/2 sm:-translate-x-1/2 sm:w-auto z-40 animate-in fade-in slide-in-from-bottom-3 duration-300 pointer-events-auto flex justify-center"
    >
      <div className="w-full sm:w-auto bg-[#121316]/95 backdrop-blur-xl text-white px-3.5 py-2 sm:px-4.5 sm:py-2.5 rounded-full shadow-[0_12px_36px_rgba(0,0,0,0.3)] border border-white/12 ring-1 ring-white/5 flex items-center justify-between sm:justify-start gap-3 sm:gap-4 transition-all hover:border-white/20">
        {/* İkon & Açıklama */}
        <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
          <div className="w-7 h-7 rounded-full bg-[#4A5D3E] flex items-center justify-center text-white shrink-0 shadow-xs">
            <Tag size={13} />
          </div>
          <div className="min-w-0 leading-tight">
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] sm:text-xs font-bold text-white tracking-tight truncate">
                İlk Alışverişe Özel {discountText}
              </span>
              <Sparkles size={11} className="text-amber-400 shrink-0 hidden sm:inline" />
            </div>
            <p className="text-[9px] sm:text-[10px] text-gray-400 truncate">
              {activeCoupon.minOrderAmount && activeCoupon.minOrderAmount > 0
                ? `₺${activeCoupon.minOrderAmount.toLocaleString("tr-TR")} üzeri siparişlerde`
                : "Tüm koleksiyonlarda geçerli"}
            </p>
          </div>
        </div>

        {/* Kupon Kodu & Kapatma Butonu (Boşluksuz ve Dengeli) */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          <button
            onClick={handleCopy}
            title="Kodu kopyala"
            className="flex items-center gap-1.5 bg-white/10 hover:bg-white/15 active:scale-95 text-white px-2.5 py-1.5 rounded-full border border-white/15 text-[11px] sm:text-xs font-mono font-bold tracking-wider transition-all cursor-pointer shadow-2xs group"
          >
            <span className="text-[#A3CF8F] group-hover:text-white transition-colors">{activeCoupon.code}</span>
            {copied ? (
              <Check size={13} className="text-emerald-400 shrink-0" />
            ) : (
              <Copy size={11} className="text-gray-400 group-hover:text-gray-200 shrink-0" />
            )}
          </button>

          <div className="w-[1px] h-3.5 bg-white/15 hidden sm:block" />

          {/* Kapat Butonu */}
          <button
            onClick={() => setClosed(true)}
            aria-label="Kapat"
            className="text-gray-400 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X size={13} />
          </button>
        </div>
      </div>
    </aside>
  );
}
