"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Shirt, Maximize2 } from "lucide-react";
import { getMinioUrl } from "@/lib/utils";

interface ProductImageGalleryProps {
  images?: (string | { imageUrl: string })[];
  productName: string;
}

export default function ProductImageGallery({
  images = [],
  productName,
}: ProductImageGalleryProps) {
  const [selected, setSelected] = useState(0);

  const validImages = images
    .map((img) => getMinioUrl(typeof img === "string" ? img : img?.imageUrl))
    .filter((url) => Boolean(url && url.trim().length > 0));

  const hasImages = validImages.length > 0;
  const safeIndex = Math.min(selected, Math.max(0, validImages.length - 1));

  const prev = () => setSelected((s) => (s === 0 ? validImages.length - 1 : s - 1));
  const next = () => setSelected((s) => (s === validImages.length - 1 ? 0 : s + 1));

  if (!hasImages) {
    return (
      <div className="w-full aspect-[3/4] rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 flex flex-col items-center justify-center text-white/30 border border-gray-100 shadow-2xs">
        <Shirt size={64} className="mb-3 text-[#4A5D3E]/80 animate-pulse" />
        <span className="font-serif text-2xl font-bold tracking-widest text-white/60">HAQAN</span>
        <span className="text-xs uppercase tracking-widest font-medium mt-1 text-white/40">Görsel Eklenmedi</span>
      </div>
    );
  }

  return (
    <>
      {/* Desktop: dikey küçük resimler + dikey 3:4 ana görsel */}
      <div className="hidden md:flex gap-3 sticky top-20">
        {/* Thumbnails */}
        {validImages.length > 1 && (
          <div className="flex flex-col gap-2 w-20 shrink-0 max-h-[600px] overflow-y-auto scrollbar-hide">
            {validImages.map((img, i) => (
              <button
                key={i}
                onClick={() => setSelected(i)}
                className={`relative aspect-[3/4] rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                  i === safeIndex
                    ? "border-[#4A5D3E] shadow-xs"
                    : "border-gray-200 hover:border-gray-400 opacity-70 hover:opacity-100"
                }`}
              >
                <Image
                  src={img}
                  alt={`${productName} - ${i + 1}`}
                  fill
                  className="object-cover"
                  sizes="80px"
                />
              </button>
            ))}
          </div>
        )}

        {/* Main Image (Kart ile Birebir 3:4 Dikey Moda Oranı) */}
        <div className="flex-1 relative rounded-2xl overflow-hidden bg-gray-50 aspect-[3/4] group border border-gray-100 shadow-2xs">
          <Image
            src={validImages[safeIndex]}
            alt={productName}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 1280px) 50vw, 600px"
            priority
          />
        </div>
      </div>

      {/* Mobile: 3:4 dikey ana görsel + yatay küçük resimler */}
      <div className="md:hidden">
        {/* Main image (3:4 Oranı Sayesinde Mankenin Başı/Ayakları Asla Kesilmez) */}
        <div className="relative aspect-[3/4] bg-gray-50 overflow-hidden rounded-2xl border border-gray-100 shadow-2xs">
          <Image
            src={validImages[safeIndex]}
            alt={productName}
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
          {validImages.length > 1 && (
            <>
              <button
                onClick={prev}
                className="absolute left-2.5 top-1/2 -translate-y-1/2 bg-white/85 backdrop-blur-xs rounded-full p-2 shadow-sm text-gray-800"
                aria-label="Önceki"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={next}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 bg-white/85 backdrop-blur-xs rounded-full p-2 shadow-sm text-gray-800"
                aria-label="Sonraki"
              >
                <ChevronRight size={18} />
              </button>

              {/* Sayfa Göstergesi (1/3) */}
              <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-xs text-white text-[10px] font-semibold px-2.5 py-1 rounded-full">
                {safeIndex + 1} / {validImages.length}
              </div>
            </>
          )}
        </div>

        {/* Thumbnails strip */}
        {validImages.length > 1 && (
          <div className="flex gap-2 mt-3 overflow-x-auto scrollbar-hide pb-1">
            {validImages.map((img, i) => (
              <button
                key={i}
                onClick={() => setSelected(i)}
                className={`relative w-14 aspect-[3/4] shrink-0 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                  i === safeIndex
                    ? "border-[#4A5D3E] shadow-xs"
                    : "border-gray-200 opacity-60"
                }`}
              >
                <Image
                  src={img}
                  alt={`${productName} - ${i + 1}`}
                  fill
                  className="object-cover"
                  sizes="56px"
                />
              </button>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
