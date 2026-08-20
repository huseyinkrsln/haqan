"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useSliders } from "@/hooks/useSliders";
import { getMinioUrl } from "@/lib/utils";

export default function HeroSlider() {
  const { data: sliders, isLoading } = useSliders();
  const [currentIndex, setCurrentIndex] = useState(0);

  const activeSliders = sliders || [];

  // Otomatik geçiş (5 saniyede bir)
  useEffect(() => {
    if (activeSliders.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % activeSliders.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [activeSliders.length]);

  if (isLoading) {
    return (
      <section className="relative h-[60vh] md:h-[75vh] bg-gray-900 animate-pulse flex items-center justify-center">
        <div className="max-w-7xl mx-auto px-6 w-full">
          <div className="h-6 w-32 bg-white/20 rounded mb-4" />
          <div className="h-14 w-80 bg-white/20 rounded mb-4" />
          <div className="h-4 w-96 bg-white/10 rounded mb-8" />
          <div className="h-12 w-44 bg-white/20 rounded-xl" />
        </div>
      </section>
    );
  }

  // Eğer veritabanında slider yoksa varsayılan hero
  if (activeSliders.length === 0) {
    return (
      <section className="relative h-[60vh] md:h-[75vh] overflow-hidden bg-gray-900">
        <Image
          src="https://images.unsplash.com/photo-1617137968427-85924c800a22?w=1600&q=85"
          alt="HAQAN WEAR Hero"
          fill
          className="object-cover opacity-70"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
        <div className="relative h-full flex items-center">
          <div className="max-w-7xl mx-auto px-6 md:px-8 w-full">
            <div className="max-w-xl animate-fade-in">
              <span className="text-[#a3b899] text-xs tracking-[0.4em] font-medium uppercase mb-4 block">
                Yeni Sezon
              </span>
              <h1 className="font-serif text-4xl md:text-6xl font-bold text-white leading-tight mb-4">
                Stilini Yeniden<br />Tanımla
              </h1>
              <p className="text-white/70 text-sm md:text-base mb-8 leading-relaxed">
                Zamansız tasarımlar ve premium kumaşlarla her anın en iyisi için.
              </p>
              <div className="flex gap-4 flex-wrap">
                <Link
                  href="/kategoriler"
                  className="flex items-center gap-2 bg-[#4A5D3E] hover:bg-[#3A4B30] text-white font-semibold px-6 py-3 rounded-xl transition-colors text-sm tracking-wider shadow-lg"
                >
                  Koleksiyonu Keşfet <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const current = activeSliders[currentIndex];
  const slideImageUrl = getMinioUrl(current.imageUrl);

  return (
    <section className="relative h-[60vh] md:h-[75vh] overflow-hidden bg-gray-900">
      {activeSliders.map((slide, idx) => {
        const img =
          getMinioUrl(slide.imageUrl) ||
          "https://images.unsplash.com/photo-1617137968427-85924c800a22?w=1600&q=85";
        return (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              idx === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
            }`}
          >
            <Image
              src={img}
              alt={slide.title || "HAQAN WEAR"}
              fill
              className="object-cover opacity-75"
              priority={idx === 0}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/40 to-transparent" />
            <div className="relative h-full flex items-center z-20">
              <div className="max-w-7xl mx-auto px-6 md:px-8 w-full">
                <div className="max-w-xl animate-fade-in">
                  {slide.subTitle && (
                    <span className="text-[#a3b899] text-xs tracking-[0.4em] font-medium uppercase mb-4 block">
                      {slide.subTitle}
                    </span>
                  )}
                  {slide.title && (
                    <h1 className="font-serif text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4">
                      {slide.title}
                    </h1>
                  )}
                  {slide.targetUrl && (
                    <div className="flex gap-4 flex-wrap mt-6">
                      <Link
                        href={slide.targetUrl}
                        className="flex items-center gap-2 bg-[#4A5D3E] hover:bg-[#3A4B30] text-white font-semibold px-6 py-3 rounded-xl transition-colors text-sm tracking-wider shadow-lg"
                      >
                        {slide.buttonText || "İncele"} <ArrowRight size={16} />
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {/* Navigasyon Okları */}
      {activeSliders.length > 1 && (
        <>
          <button
            onClick={() =>
              setCurrentIndex((prev) =>
                prev === 0 ? activeSliders.length - 1 : prev - 1
              )
            }
            className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-2.5 rounded-full bg-black/40 hover:bg-black/70 text-white backdrop-blur-xs transition-colors"
            aria-label="Önceki Slayt"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={() =>
              setCurrentIndex((prev) => (prev + 1) % activeSliders.length)
            }
            className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-2.5 rounded-full bg-black/40 hover:bg-black/70 text-white backdrop-blur-xs transition-colors"
            aria-label="Sonraki Slayt"
          >
            <ChevronRight size={20} />
          </button>

          {/* Noktalar */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2">
            {activeSliders.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Slayt ${idx + 1}`}
                className={`h-2 rounded-full transition-all ${
                  idx === currentIndex
                    ? "w-8 bg-[#4A5D3E]"
                    : "w-2 bg-white/50 hover:bg-white/80"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
}
