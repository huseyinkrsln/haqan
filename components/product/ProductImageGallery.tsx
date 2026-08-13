"use client";

import { useState } from "react";
import Image from "next/image";
import { ZoomIn, ChevronLeft, ChevronRight } from "lucide-react";

interface ProductImageGalleryProps {
  images: string[];
  productName: string;
}

export default function ProductImageGallery({
  images,
  productName,
}: ProductImageGalleryProps) {
  const [selected, setSelected] = useState(0);

  const prev = () => setSelected((s) => (s === 0 ? images.length - 1 : s - 1));
  const next = () => setSelected((s) => (s === images.length - 1 ? 0 : s + 1));

  return (
    <>
      {/* Desktop: vertical thumbnails + main image */}
      <div className="hidden md:flex gap-3 sticky top-20">
        {/* Thumbnails */}
        <div className="flex flex-col gap-2 w-20 shrink-0">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setSelected(i)}
              className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                i === selected
                  ? "border-[#4A5D3E]"
                  : "border-transparent hover:border-gray-300"
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

        {/* Main Image */}
        <div className="flex-1 relative rounded-2xl overflow-hidden bg-gray-50 aspect-[4/5] group">
          <Image
            src={images[selected]}
            alt={productName}
            fill
            className="object-cover"
            sizes="(max-width: 1280px) 50vw, 600px"
            priority
          />
          <button className="absolute top-3 right-3 bg-white/80 backdrop-blur-sm rounded-lg p-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <ZoomIn size={16} className="text-gray-700" />
          </button>
        </div>
      </div>

      {/* Mobile: full-width + horizontal thumbnails + dots */}
      <div className="md:hidden">
        {/* Main image */}
        <div className="relative aspect-square bg-gray-50 overflow-hidden rounded-xl">
          <Image
            src={images[selected]}
            alt={productName}
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
          <button
            onClick={prev}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-1.5"
            aria-label="Önceki"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={next}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-1.5"
            aria-label="Sonraki"
          >
            <ChevronRight size={16} />
          </button>
          <button className="absolute top-3 right-3 bg-white/80 backdrop-blur-sm rounded-lg p-1.5">
            <ZoomIn size={14} className="text-gray-700" />
          </button>
        </div>

        {/* Thumbnails strip */}
        <div className="flex gap-2 mt-2 overflow-x-auto scrollbar-hide pb-1">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setSelected(i)}
              className={`relative w-16 h-16 shrink-0 rounded-lg overflow-hidden border-2 transition-all ${
                i === selected
                  ? "border-[#4A5D3E]"
                  : "border-transparent opacity-60"
              }`}
            >
              <Image
                src={img}
                alt={`${productName} - ${i + 1}`}
                fill
                className="object-cover"
                sizes="64px"
              />
            </button>
          ))}
        </div>

        {/* Dots indicator */}
        <div className="flex justify-center gap-1.5 mt-2">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setSelected(i)}
              className={`w-1.5 h-1.5 rounded-full transition-all ${
                i === selected ? "bg-[#4A5D3E] w-4" : "bg-gray-300"
              }`}
              aria-label={`Resim ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </>
  );
}
