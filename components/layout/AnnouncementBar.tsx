"use client";

import { Sparkles, Truck, Zap, RotateCcw } from "lucide-react";
import { useSiteSettings } from "@/hooks/useSiteSettings";

export default function AnnouncementBar() {
  const { data: settings } = useSiteSettings();

  const isActive =
    settings?.announcementisactive !== "false" &&
    settings?.announcementIsActive !== "false";
  if (!isActive) return null;

  const threshold =
    settings?.freeshippingthreshold ||
    settings?.freeShippingThreshold ||
    "1500";
  const announcementText =
    settings?.announcementtext ||
    settings?.announcementText ||
    "";

  return (
    <div className="bg-[#4A5D3E] text-white text-xs select-none border-b border-[#3D4D33]">
      {/* 🌟 1. KAT: ESKİ 3'LÜ SABİT BİLGİ BANDI 🌟 */}
      <div className="py-2">
        <div className="max-w-7xl mx-auto px-4 hidden md:grid grid-cols-3 divide-x divide-white/20">
          <div className="flex items-center gap-2.5 px-4 justify-center">
            <Truck size={14} className="shrink-0 opacity-90" />
            <div>
              <span className="font-semibold tracking-wide">ÜCRETSİZ KARGO</span>
              <span className="text-white/70 ml-1.5">
                {threshold} TL ve üzeri siparişlerde geçerli
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2.5 px-4 justify-center">
            <Zap size={14} className="shrink-0 opacity-90" />
            <div>
              <span className="font-semibold tracking-wide">HIZLI TESLİMAT</span>
              <span className="text-white/70 ml-1.5">1-3 iş günü içinde kapıda</span>
            </div>
          </div>
          <div className="flex items-center gap-2.5 px-4 justify-center">
            <RotateCcw size={14} className="shrink-0 opacity-90" />
            <div>
              <span className="font-semibold tracking-wide">KOLAY İADE</span>
              <span className="text-white/70 ml-1.5">14 gün içinde değişim</span>
            </div>
          </div>
        </div>

        {/* Mobil Sabit Kargo Bilgisi */}
        <div className="md:hidden flex items-center justify-center gap-2 px-4 text-center">
          <Truck size={12} className="shrink-0" />
          <span className="font-medium text-[11px]">
            ÜCRETSİZ KARGO — {threshold} TL ve üzeri siparişlerde geçerli
          </span>
        </div>
      </div>

      {/* 🌟 2. KAT: ONUN ALTINDA SADECE ANNOUNCEMENTTEXT DOLUYSA GÖRÜNEN KAYAN ŞERİT 🌟 */}
      {announcementText && announcementText.trim() ? (
        <div className="bg-[#3D4D33] py-1.5 border-t border-white/10 overflow-hidden flex whitespace-nowrap group">
          <div className="animate-marquee items-center text-[11px] font-medium tracking-wider uppercase">
            {Array.from({ length: 24 }).map((_, i) => (
              <div key={i} className="flex items-center shrink-0 px-6">
                <span className="text-white tracking-widest">
                  {announcementText}
                </span>
                <span className="text-white/35 ml-6 font-bold">•</span>
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
