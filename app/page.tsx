"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Truck,
  Clock,
  RotateCcw,
  Shield,
  Headphones,
  Shirt,
} from "lucide-react";
import ProductCard from "@/components/product/ProductCard";
import HeroSlider from "@/components/home/HeroSlider";
import { useCategories } from "@/hooks/useCategories";
import {
  useProducts,
  useBestSellerProducts,
  useFeaturedProducts,
  useNewArrivalProducts,
} from "@/hooks/useProducts";
import { getMinioUrl } from "@/lib/utils";

const trustItems = [
  { icon: Truck, label: "ÜCRETSİZ KARGO", sub: "999 TL ve üzeri" },
  { icon: Clock, label: "HIZLI TESLİMAT", sub: "1-3 iş günü" },
  { icon: RotateCcw, label: "KOLAY İADE", sub: "14 gün içinde" },
  { icon: Shield, label: "GÜVENLİ ÖDEME", sub: "256 bit SSL" },
  { icon: Headphones, label: "7/24 DESTEK", sub: "Her zaman yanınızda" },
];

export default function HomePage() {
  const { data: rootCategoriesData, isLoading: isCategoriesLoading } = useCategories(true);
  const { data: allCategoriesData } = useCategories(false);

  // Veritabanı sorguları
  const { data: bestSellersData, isLoading: isBestSellersLoading } = useBestSellerProducts(4);
  const { data: featuredData, isLoading: isFeaturedLoading } = useFeaturedProducts(4);
  const { data: newArrivalsData, isLoading: isNewArrivalsLoading } = useNewArrivalProducts(4);
  const { data: allProductsData } = useProducts({ take: 8 });

  const categories =
    rootCategoriesData && rootCategoriesData.length > 0
      ? rootCategoriesData
      : allCategoriesData || [];

  const allProducts = allProductsData?.data || [];

  // Çok Satanlar
  const bestSellers =
    (bestSellersData?.data && bestSellersData.data.length > 0)
      ? bestSellersData.data
      : allProducts.filter((p) => p.isBestSeller);

  // Öne Çıkanlar
  const featuredProducts =
    (featuredData?.data && featuredData.data.length > 0)
      ? featuredData.data
      : allProducts.filter((p) => p.isFeatured).length > 0
      ? allProducts.filter((p) => p.isFeatured)
      : allProducts;

  // Yeni Gelenler
  const newArrivals =
    (newArrivalsData?.data && newArrivalsData.data.length > 0)
      ? newArrivalsData.data
      : allProducts.filter((p) => p.isNewArrival);

  return (
    <>
      {/* Dinamik Hero Slider */}
      <HeroSlider />

      {/* ─── 1. ÇOK SATANLAR ─── */}
      <section className="bg-gradient-to-b from-gray-50/60 to-white py-10 md:py-14 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between mb-6 pb-2 border-b border-gray-100">
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">
              Çok Satanlar
            </h2>
            <Link
              href="/koleksiyon/cok-satanlar"
              className="text-xs sm:text-sm font-semibold text-gray-700 hover:text-[#4A5D3E] flex items-center gap-1 transition-colors"
            >
              <span>Tümünü Gör</span> <ArrowRight size={14} />
            </Link>
          </div>

          {isBestSellersLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((n) => (
                <div key={n} className="rounded-xl aspect-[3/4] bg-gray-200 animate-pulse" />
              ))}
            </div>
          ) : bestSellers.length === 0 ? (
            <div className="text-center py-12 border border-dashed rounded-xl bg-white text-muted-foreground text-sm">
              Henüz çok satan ürün listelenmedi.
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {bestSellers.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  badge="Çok Satan"
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ─── 3. ÖNE ÇIKANLAR VİTRİNİ ─── */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-10 md:py-14">
        <div className="flex items-center justify-between mb-6 pb-2 border-b border-gray-100">
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">
            Öne Çıkanlar
          </h2>
          <Link
            href="/koleksiyon/one-cikanlar"
            className="text-xs sm:text-sm font-semibold text-gray-700 hover:text-[#4A5D3E] flex items-center gap-1 transition-colors"
          >
            <span>Tümünü Gör</span> <ArrowRight size={14} />
          </Link>
        </div>

        {isFeaturedLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="rounded-xl aspect-[3/4] bg-gray-100 animate-pulse" />
            ))}
          </div>
        ) : featuredProducts.length === 0 ? (
          <div className="text-center py-12 border border-dashed rounded-xl bg-white text-muted-foreground text-sm">
            Henüz öne çıkan ürün eklenmedi.
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {featuredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </div>
        )}
      </section>

      {/* ─── 4. YENİ GELENLER ─── */}
      {newArrivals.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 md:px-8 pb-10 md:pb-14">
          <div className="flex items-center justify-between mb-6 pb-2 border-b border-gray-100">
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">
              Yeni Gelenler
            </h2>
            <Link
              href="/koleksiyon/yeni-gelenler"
              className="text-xs sm:text-sm font-semibold text-gray-700 hover:text-[#4A5D3E] flex items-center gap-1 transition-colors"
            >
              <span>Tümünü Gör</span> <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {newArrivals.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                badge="Yeni"
              />
            ))}
          </div>
        </section>
      )}

      {/* ─── 5. GÜVEN ROZETLERİ ─── */}
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
