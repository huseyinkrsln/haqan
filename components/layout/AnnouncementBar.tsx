"use client";

import { Truck, Zap, RotateCcw } from "lucide-react";

const items = [
  { icon: Truck, text: "ÜCRETSİZ KARGO", sub: "999 TL ve üzeri siparişlerde geçerli" },
  { icon: Zap, text: "HIZLI TESLİMAT", sub: "1-3 iş günü içinde kapıda" },
  { icon: RotateCcw, text: "KOLAY İADE", sub: "14 gün içinde ücretsiz değişim" },
];

export default function AnnouncementBar() {
  return (
    <div className="bg-[#4A5D3E] text-white text-xs">
      <div className="max-w-7xl mx-auto px-4 hidden md:grid grid-cols-3 divide-x divide-white/20">
        {items.map(({ icon: Icon, text, sub }) => (
          <div key={text} className="flex items-center gap-2.5 py-2.5 px-4 justify-center">
            <Icon size={14} className="shrink-0 opacity-90" />
            <div>
              <span className="font-semibold tracking-wide">{text}</span>
              <span className="text-white/70 ml-1.5">{sub}</span>
            </div>
          </div>
        ))}
      </div>
      {/* Mobile: show single clean top bar */}
      <div className="md:hidden flex items-center justify-center gap-2 py-2 px-4 text-center">
        <Truck size={12} className="shrink-0" />
        <span className="font-medium text-[11px]">ÜCRETSİZ KARGO — 999 TL ve üzeri siparişlerde</span>
      </div>
    </div>
  );
}
