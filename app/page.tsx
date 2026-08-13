import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Truck, Clock, RotateCcw, Shield, Headphones } from "lucide-react";
import { categories, products } from "@/lib/data";
import ProductCard from "@/components/product/ProductCard";

export const metadata: Metadata = {
  title: "HAQAN WEAR — Premium Erkek Giyim",
  description: "Zamansız tasarımlar ve premium kumaşlarla erkek giyiminde yeni standartlar.",
};

const trustItems = [
  { icon: Truck, label: "ÜCRETSİZ KARGO", sub: "999 TL ve üzeri" },
  { icon: Clock, label: "HIZLI TESLİMAT", sub: "1-3 iş günü" },
  { icon: RotateCcw, label: "KOLAY İADE", sub: "14 gün içinde" },
  { icon: Shield, label: "GÜVENLİ ÖDEME", sub: "256 bit SSL" },
  { icon: Headphones, label: "7/24 DESTEK", sub: "Her zaman yanınızda" },
];

export default function HomePage() {
  const featuredProducts = products.slice(0, 4);

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[60vh] md:h-[75vh] overflow-hidden bg-gray-900">
        <Image
          src="https://images.unsplash.com/photo-1617137968427-85924c800a22?w=1600&q=85"
          alt="HAQAN WEAR Hero"
          fill
          className="object-cover opacity-70"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
        <div className="relative h-full flex items-center">
          <div className="max-w-7xl mx-auto px-6 md:px-8">
            <div className="max-w-xl animate-fade-in">
              <span className="text-[#a3b899] text-xs tracking-[0.4em] font-medium uppercase mb-4 block">
                Yeni Koleksiyon
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
                  className="flex items-center gap-2 bg-[#4A5D3E] hover:bg-[#3A4B30] text-white font-semibold px-6 py-3 rounded-xl transition-colors text-sm tracking-wider"
                >
                  Koleksiyonu Keşfet <ArrowRight size={16} />
                </Link>
                <Link
                  href="/kategoriler/giyim"
                  className="flex items-center gap-2 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white font-medium px-6 py-3 rounded-xl transition-colors text-sm border border-white/20"
                >
                  Giyim
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-gray-900">
              Kategoriler
            </h2>
            <p className="text-gray-500 text-sm mt-1">Tarzınızı yansıtan kategorileri keşfedin.</p>
          </div>
          <Link
            href="/kategoriler"
            className="text-sm font-medium text-[#4A5D3E] hover:underline flex items-center gap-1"
          >
            Tümü <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/kategoriler/${cat.slug}`}
              className="group relative rounded-2xl overflow-hidden aspect-[3/4] block"
            >
              <Image
                src={cat.image}
                alt={cat.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 50vw, 20vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="font-serif text-lg font-bold text-white">{cat.name}</h3>
                <p className="text-white/70 text-xs mt-0.5 line-clamp-2">{cat.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 pb-12 md:pb-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-gray-900">
              Öne Çıkan Ürünler
            </h2>
            <p className="text-gray-500 text-sm mt-1">En çok tercih edilen parçalar.</p>
          </div>
          <Link
            href="/kategoriler/giyim"
            className="text-sm font-medium text-[#4A5D3E] hover:underline flex items-center gap-1"
          >
            Tümü <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {featuredProducts.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              slug={product.slug}
              name={product.name}
              price={product.price}
              image={product.images[0]}
              product={product}
            />
          ))}
        </div>
      </section>

      {/* Trust Badges */}
      <section className="border-t border-gray-100 bg-white">
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
