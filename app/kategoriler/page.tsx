import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Truck, Clock, RotateCcw, Shield, Headphones, Shirt, Watch, Footprints, Glasses } from "lucide-react";
import { categories } from "@/lib/data";

export const metadata: Metadata = {
  title: "Kategoriler",
  description: "HAQAN WEAR kategorilerini keşfedin — Giyim, Saat, Kemer, Ayakkabı ve Aksesuar.",
};

const trustItems = [
  { icon: Truck, label: "ÜCRETSİZ KARGO", sub: "999 TL ve üzeri" },
  { icon: Clock, label: "HIZLI TESLİMAT", sub: "1-3 iş günü" },
  { icon: RotateCcw, label: "KOLAY İADE", sub: "14 gün içinde" },
  { icon: Shield, label: "GÜVENLİ ÖDEME", sub: "256 bit SSL" },
  { icon: Headphones, label: "7/24 DESTEK", sub: "Her zaman yanınızda" },
];

export default function KategorilerPage() {
  return (
    <>
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-gray-400 mb-6">
          <Link href="/" className="hover:text-gray-700">Ana Sayfa</Link>
          <span>›</span>
          <span className="text-gray-700 font-medium">Kategoriler</span>
        </nav>

        {/* Title */}
        <div className="mb-8">
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 uppercase tracking-wide">
            KATEGORİLER
          </h1>
          <p className="text-gray-500 mt-2">Tarzınızı yansıtan kategorileri keşfedin.</p>
        </div>

        {/* Main bento grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
          {categories.slice(0, 3).map((cat) => (
            <Link
              key={cat.slug}
              href={`/kategoriler/${cat.slug}`}
              className="group relative rounded-2xl overflow-hidden aspect-[4/5] block"
            >
              <Image
                src={cat.image}
                alt={cat.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <h2 className="font-serif text-2xl font-bold text-white">{cat.name.toUpperCase()}</h2>
                <p className="text-white/70 text-xs mt-1">{cat.description}</p>
                <div className="mt-3 w-8 h-8 rounded-full border border-white/40 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                  <ArrowRight size={14} className="text-white" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-4">
          {categories.slice(3).map((cat) => (
            <Link
              key={cat.slug}
              href={`/kategoriler/${cat.slug}`}
              className="group relative rounded-2xl overflow-hidden aspect-[16/9] md:aspect-[2/1] block"
            >
              <Image
                src={cat.image}
                alt={cat.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 50vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />
              <div className="absolute bottom-0 left-0 p-5">
                <h2 className="font-serif text-2xl font-bold text-white">{cat.name.toUpperCase()}</h2>
                <p className="text-white/70 text-xs mt-1">{cat.description}</p>
                <div className="mt-3 w-8 h-8 rounded-full border border-white/40 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                  <ArrowRight size={14} className="text-white" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Trust badges */}
      <section className="border-t border-gray-100 bg-white mt-8">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {trustItems.map(({ icon: Icon, label, sub }) => (
              <div key={label} className="flex flex-col items-center text-center gap-2">
                <div className="w-10 h-10 rounded-full bg-[#4A5D3E]/10 flex items-center justify-center">
                  <Icon size={18} className="text-[#4A5D3E]" />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-800 tracking-wide">{label}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
