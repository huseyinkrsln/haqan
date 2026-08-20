"use client";

import { use, useState } from "react";
import Link from "next/link";
import { useProductBySlug, useProducts } from "@/hooks/useProducts";
import ProductImageGallery from "@/components/product/ProductImageGallery";
import ProductInfo from "@/components/product/ProductInfo";
import ProductCard from "@/components/product/ProductCard";
import { ShieldCheck, Truck, RotateCcw, Award } from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function ProductPage({ params }: PageProps) {
  const { slug } = use(params);
  const { data: product, isLoading } = useProductBySlug(slug);

  // Seçili renge göre galeri resimlerini filtreleme
  const [selectedColorId, setSelectedColorId] = useState<number | undefined>(undefined);

  // İlgili ürünler (Aynı kategorideki diğer ürünler)
  const { data: relatedData } = useProducts({
    categoryId: product?.categoryId,
    take: 4,
  });

  const relatedProducts = (relatedData?.data || []).filter(
    (p) => p.id !== product?.id
  );

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-10 animate-pulse">
        <div className="h-4 w-48 bg-gray-200 rounded mb-8" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="aspect-[4/5] bg-gray-200 rounded-2xl" />
          <div className="space-y-4">
            <div className="h-8 w-3/4 bg-gray-200 rounded" />
            <div className="h-6 w-1/4 bg-gray-200 rounded" />
            <div className="h-24 bg-gray-100 rounded-xl" />
            <div className="h-12 bg-gray-200 rounded-xl" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-20 text-center">
        <h1 className="font-serif text-2xl font-bold text-gray-900 mb-2">Ürün Bulunamadı</h1>
        <p className="text-gray-500 text-sm mb-6">Aradığınız ürün mevcut değil veya yayından kaldırılmış olabilir.</p>
        <Link
          href="/kategoriler"
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#4A5D3E] text-white text-xs font-semibold"
        >
          Koleksiyonları Keşfet
        </Link>
      </div>
    );
  }

  // Renk bazlı resimler veya tüm resimler
  const activeColorImages = selectedColorId
    ? product.productColors?.find((pc) => pc.colorId === selectedColorId)?.images ||
      product.images?.filter((img) => img.colorId === selectedColorId) ||
      product.images
    : product.images;

  const galleryImages = (activeColorImages && activeColorImages.length > 0)
    ? activeColorImages
    : product.images || [];

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-6 md:py-10">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-gray-400 mb-6 overflow-x-auto scrollbar-hide">
        <Link href="/" className="hover:text-gray-900 shrink-0 transition-colors">Ana Sayfa</Link>
        <span>/</span>
        {product.categoryName && (
          <>
            <Link
              href="/koleksiyon/erkek-giyim"
              className="hover:text-gray-900 shrink-0 transition-colors font-medium text-gray-600"
            >
              {product.categoryName}
            </Link>
            <span>/</span>
          </>
        )}
        <span className="text-gray-900 font-semibold truncate">{product.name}</span>
      </nav>

      {/* Main Product Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-14">
        {/* Sol Kolon: Galeri */}
        <div>
          <ProductImageGallery
            images={galleryImages}
            productName={product.name}
          />
        </div>

        {/* Sağ Kolon: Bilgiler & Satın Alma */}
        <div className="space-y-6">
          <ProductInfo
            product={product}
            selectedColorId={selectedColorId}
            onColorChange={(cId) => setSelectedColorId(cId)}
          />

          {/* Rozetler ve Güvenceler */}
          <div className="grid grid-cols-2 gap-3 pt-4 border-t border-gray-100">
            <div className="flex items-center gap-2.5 p-3 rounded-xl bg-gray-50/80 border border-gray-100">
              <Truck size={18} className="text-[#4A5D3E] shrink-0" />
              <div>
                <p className="text-[11px] font-bold text-gray-800">Ücretsiz Kargo</p>
                <p className="text-[10px] text-gray-500">999 TL üzeri siparişlerde</p>
              </div>
            </div>
            <div className="flex items-center gap-2.5 p-3 rounded-xl bg-gray-50/80 border border-gray-100">
              <RotateCcw size={18} className="text-[#4A5D3E] shrink-0" />
              <div>
                <p className="text-[11px] font-bold text-gray-800">14 Gün İade</p>
                <p className="text-[10px] text-gray-500">Kolay & hızlı iade garantisi</p>
              </div>
            </div>
            <div className="flex items-center gap-2.5 p-3 rounded-xl bg-gray-50/80 border border-gray-100">
              <ShieldCheck size={18} className="text-[#4A5D3E] shrink-0" />
              <div>
                <p className="text-[11px] font-bold text-gray-800">Güvenli Ödeme</p>
                <p className="text-[10px] text-gray-500">256-bit SSL şifreleme</p>
              </div>
            </div>
            <div className="flex items-center gap-2.5 p-3 rounded-xl bg-gray-50/80 border border-gray-100">
              <Award size={18} className="text-[#4A5D3E] shrink-0" />
              <div>
                <p className="text-[11px] font-bold text-gray-800">%100 Orijinal</p>
                <p className="text-[10px] text-gray-500">Premium kalite kumaş</p>
              </div>
            </div>
          </div>

          {/* Açıklama */}
          {product.description && (
            <div className="pt-4 border-t border-gray-100">
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-800 mb-2">
                Ürün Açıklaması
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed whitespace-pre-line">
                {product.description}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* İlgili / Benzer Ürünler */}
      {relatedProducts.length > 0 && (
        <section className="mt-16 pt-12 border-t border-gray-100">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="text-[#4A5D3E] text-xs font-semibold uppercase tracking-wider block mb-1">
                Kombin & Öneriler
              </span>
              <h2 className="font-serif text-2xl font-bold text-gray-900">
                Benzer Ürünler
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {relatedProducts.map((relProduct) => (
              <ProductCard
                key={relProduct.id}
                product={relProduct}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
