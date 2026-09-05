"use client";

import Link from "next/link";
import { useState, useMemo, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Heart, ArrowUpDown, ArrowRight, Truck, Clock, RotateCcw, Shield, Headphones, Check, Sparkles, ShoppingBag } from "lucide-react";
import { useWishlist } from "@/context/WishlistContext";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import FavoriteProductCard from "@/components/product/FavoriteProductCard";
import FavoriteOutfitCard from "@/components/product/FavoriteOutfitCard";
import AuthRequiredView from "@/components/auth/AuthRequiredView";
import OutfitDetailModal from "@/components/outfit/OutfitDetailModal";
import { Outfit } from "@/hooks/useOutfits";

const sortOptions = [
  { label: "En Yeniler", value: "en-yeni" },
  { label: "Fiyat (Artan)", value: "fiyat-artan" },
  { label: "Fiyat (Azalan)", value: "fiyat-azalan" },
  { label: "İsim (A-Z)", value: "isim-a-z" },
  { label: "İsim (Z-A)", value: "isim-z-a" },
];

export default function FavorilerPage() {
  const { data: session, status } = useSession();
  const { items, outfits, totalItems, totalProducts, totalOutfits } = useWishlist();
  const { data: settings } = useSiteSettings();
  const threshold = settings?.freeshippingthreshold || settings?.freeShippingThreshold || "1500";

  const [activeTab, setActiveTab] = useState<"all" | "products" | "outfits">("all");
  const [selectedInspectOutfit, setSelectedInspectOutfit] = useState<Outfit | null>(null);

  const trustItems = [
    { icon: Truck, label: "ÜCRETSİZ KARGO", sub: `${threshold} TL ve üzeri` },
    { icon: Clock, label: "HIZLI TESLİMAT", sub: "1-3 iş günü" },
    { icon: RotateCcw, label: "KOLAY İADE", sub: "14 gün içinde" },
    { icon: Shield, label: "GÜVENLİ ÖDEME", sub: "256 bit SSL" },
    { icon: Headphones, label: "7/24 DESTEK", sub: "Her zaman yanınızda" },
  ];

  const router = useRouter();
  const searchParams = useSearchParams();

  const urlSort = searchParams.get("sort") || "en-yeni";
  const [activeSort, setActiveSort] = useState(urlSort);
  const [sortOpen, setSortOpen] = useState(false);

  useEffect(() => {
    if (urlSort && urlSort !== activeSort) {
      setActiveSort(urlSort);
    }
  }, [urlSort]);

  const handleSortChange = (value: string) => {
    setActiveSort(value);
    setSortOpen(false);
    const params = new URLSearchParams(searchParams.toString());
    params.set("sort", value);
    router.replace(`/favoriler?${params.toString()}`, { scroll: false });
  };

  // 🌟 GÜVENLİ & ANLIK SIRALAMA HESAPLAMASI (ÜRÜNLER İÇİN) 🌟
  const sortedItems = useMemo(() => {
    if (!items || items.length === 0) return [];
    const list = [...items];

    switch (activeSort) {
      case "fiyat-artan":
        return list.sort((a, b) => {
          const priceA = a.discountPrice && a.discountPrice > 0 ? a.discountPrice : a.basePrice;
          const priceB = b.discountPrice && b.discountPrice > 0 ? b.discountPrice : b.basePrice;
          return Number(priceA) - Number(priceB);
        });

      case "fiyat-azalan":
        return list.sort((a, b) => {
          const priceA = a.discountPrice && a.discountPrice > 0 ? a.discountPrice : a.basePrice;
          const priceB = b.discountPrice && b.discountPrice > 0 ? b.discountPrice : b.basePrice;
          return Number(priceB) - Number(priceA);
        });

      case "isim-a-z":
        return list.sort((a, b) => (a.name || "").localeCompare(b.name || "", "tr"));

      case "isim-z-a":
        return list.sort((a, b) => (b.name || "").localeCompare(a.name || "", "tr"));

      case "en-yeni":
      default:
        return list.sort((a, b) => Number(b.id || 0) - Number(a.id || 0));
    }
  }, [items, activeSort]);

  // 🌟 SIRALANMIŞ KOMBİNLER 🌟
  const sortedOutfits = useMemo(() => {
    if (!outfits || outfits.length === 0) return [];
    const list = [...outfits];

    switch (activeSort) {
      case "fiyat-artan":
        return list.sort((a, b) => Number(a.price) - Number(b.price));

      case "fiyat-azalan":
        return list.sort((a, b) => Number(b.price) - Number(a.price));

      case "isim-a-z":
        return list.sort((a, b) => (a.title || "").localeCompare(b.title || "", "tr"));

      case "isim-z-a":
        return list.sort((a, b) => (b.title || "").localeCompare(a.title || "", "tr"));

      case "en-yeni":
      default:
        return list.sort((a, b) => Number(b.id || 0) - Number(a.id || 0));
    }
  }, [outfits, activeSort]);

  // Yükleme Durumu
  if (status === "loading") {
    return (
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 animate-pulse space-y-6">
        <div className="h-6 w-32 bg-gray-200 rounded" />
        <div className="h-10 w-48 bg-gray-200 rounded" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6">
          {[1, 2, 3, 4].map((n) => (
            <div key={n} className="aspect-[3/4] bg-gray-200 rounded-3xl" />
          ))}
        </div>
      </div>
    );
  }

  // 🌟 GİRİŞ YAPILMAMIŞSA KORUMA EKRANI 🌟
  if (status === "unauthenticated" || !session?.user) {
    return (
      <AuthRequiredView
        title="Favorilerinizi Görüntülemek İçin Giriş Yapın"
        description="Beğendiğiniz seçkin tasarımları ve kombinleri favori listenize eklemek, saklamak ve özel indirim fırsatlarından haberdar olmak için lütfen giriş yapınız."
        callbackUrl="/favoriler"
        iconType="heart"
      />
    );
  }

  const hasAnyFavorites = totalItems > 0;
  const currentSortLabel = sortOptions.find((o) => o.value === activeSort)?.label || "En Yeni";

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-6 md:py-10">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-gray-400 mb-6">
          <Link href="/" className="hover:text-gray-700">Ana Sayfa</Link>
          <span>/</span>
          <span className="text-gray-700 font-medium">Favorilerim</span>
        </nav>

        {/* Başlık */}
        <div className="mb-6">
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 uppercase tracking-wide">
            FAVORİLERİM
          </h1>
          <p className="text-gray-500 mt-1.5 text-sm">
            Beğendiğiniz seçkin parçaları ve özel kombinleri burada saklayabilir ve tek tıkla sepete ekleyebilirsiniz.
          </p>
        </div>

        {hasAnyFavorites ? (
          <>
            {/* 🌟 TAB FİLTRELERİ & SIRALAMA TOOLBAR 🌟 */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 mb-6 pb-4 border-b border-gray-100">
              {/* Sekmeler: Mobilde tam genişlik 3 sütunlu segmented control, masaüstünde estetik pill */}
              <div className="w-full sm:w-auto grid grid-cols-3 sm:flex items-center gap-1 sm:gap-1.5 p-1 sm:p-1.5 bg-stone-100/90 rounded-2xl border border-stone-200/60 shadow-2xs">
                <button
                  type="button"
                  onClick={() => setActiveTab("all")}
                  className={`flex items-center justify-center gap-1.5 px-2.5 sm:px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer select-none ${
                    activeTab === "all"
                      ? "bg-white text-stone-900 shadow-xs border border-stone-200/60"
                      : "text-stone-500 hover:text-stone-900 hover:bg-white/50"
                  }`}
                >
                  <span className="truncate">Tümü</span>
                  <span
                    className={`px-1.5 py-0.5 rounded-full text-[10px] font-extrabold leading-none transition-colors ${
                      activeTab === "all"
                        ? "bg-stone-900 text-white"
                        : "bg-stone-200/80 text-stone-600"
                    }`}
                  >
                    {totalItems}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab("products")}
                  className={`flex items-center justify-center gap-1.5 px-2.5 sm:px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer select-none ${
                    activeTab === "products"
                      ? "bg-white text-stone-900 shadow-xs border border-stone-200/60"
                      : "text-stone-500 hover:text-stone-900 hover:bg-white/50"
                  }`}
                >
                  <span className="truncate">Ürünler</span>
                  <span
                    className={`px-1.5 py-0.5 rounded-full text-[10px] font-extrabold leading-none transition-colors ${
                      activeTab === "products"
                        ? "bg-stone-900 text-white"
                        : "bg-stone-200/80 text-stone-600"
                    }`}
                  >
                    {totalProducts}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab("outfits")}
                  className={`flex items-center justify-center gap-1 sm:gap-1.5 px-2 sm:px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer select-none ${
                    activeTab === "outfits"
                      ? "bg-white text-[#4A5D3E] shadow-xs border border-amber-200/70"
                      : "text-stone-500 hover:text-stone-900 hover:bg-white/50"
                  }`}
                >
                  <Sparkles size={12} className="text-amber-500 shrink-0" />
                  <span className="truncate">Kombinler</span>
                  <span
                    className={`px-1.5 py-0.5 rounded-full text-[10px] font-extrabold leading-none transition-colors ${
                      activeTab === "outfits"
                        ? "bg-amber-500 text-white"
                        : "bg-stone-200/80 text-stone-600"
                    }`}
                  >
                    {totalOutfits}
                  </span>
                </button>
              </div>

              {/* 🌟 SIRALAMA MENÜSÜ 🌟 */}
              <div className="relative flex justify-end sm:justify-start">
                <button
                  onClick={() => setSortOpen(!sortOpen)}
                  className="w-full sm:w-auto flex items-center justify-center sm:justify-start gap-2 text-xs font-semibold text-gray-700 bg-white border border-gray-200/80 px-3.5 py-2.5 rounded-xl hover:border-gray-400 shadow-2xs transition-colors cursor-pointer"
                >
                  <ArrowUpDown size={13} className="text-[#4A5D3E]" />
                  <span>SIRALA: <strong className="text-gray-900">{currentSortLabel}</strong></span>
                </button>

                {sortOpen && (
                  <div className="absolute right-0 top-full mt-2 bg-white border border-gray-100 rounded-2xl shadow-xl py-2 z-20 w-48 animate-in fade-in zoom-in-95 duration-150">
                    {sortOptions.map((opt) => (
                      <button
                        key={opt.value}
                        className={`w-full flex items-center justify-between px-4 py-2.5 text-xs transition-colors cursor-pointer ${
                          activeSort === opt.value
                            ? "text-[#4A5D3E] font-bold bg-[#4A5D3E]/10"
                            : "text-gray-700 hover:bg-gray-50 hover:text-[#4A5D3E]"
                        }`}
                        onClick={() => handleSortChange(opt.value)}
                      >
                        <span>{opt.label}</span>
                        {activeSort === opt.value && <Check size={14} />}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-6">
              {/* Product & Outfit Grid */}
              <div className="space-y-8">
                {/* 🌟 KOMBİNLER BÖLÜMÜ 🌟 */}
                {(activeTab === "all" || activeTab === "outfits") && sortedOutfits.length > 0 && (
                  <div>
                    {activeTab === "all" && (
                      <div className="flex items-center gap-2 mb-4">
                        <span className="w-2 h-2 rounded-full bg-amber-500" />
                        <h2 className="text-sm font-bold text-stone-900 uppercase tracking-wider">
                          Favori Kombinler ({sortedOutfits.length})
                        </h2>
                      </div>
                    )}
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
                      {sortedOutfits.map((outfit) => (
                        <FavoriteOutfitCard
                          key={`fav-outfit-${outfit.id}`}
                          outfit={outfit}
                          onInspect={setSelectedInspectOutfit}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* 🌟 TEKİL ÜRÜNLER BÖLÜMÜ 🌟 */}
                {(activeTab === "all" || activeTab === "products") && sortedItems.length > 0 && (
                  <div>
                    {activeTab === "all" && sortedOutfits.length > 0 && (
                      <div className="flex items-center gap-2 mb-4 pt-4 border-t border-gray-100">
                        <span className="w-2 h-2 rounded-full bg-[#4A5D3E]" />
                        <h2 className="text-sm font-bold text-stone-900 uppercase tracking-wider">
                          Favori Ürünler ({sortedItems.length})
                        </h2>
                      </div>
                    )}
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
                      {sortedItems.map((product) => (
                        <FavoriteProductCard
                          key={`fav-prod-${product.id}`}
                          product={product}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Seçili Sekmede Eleman Yoksa */}
                {activeTab === "outfits" && sortedOutfits.length === 0 && (
                  <div className="py-16 text-center bg-white rounded-3xl border border-stone-200/80 p-8">
                    <Sparkles size={32} className="mx-auto text-amber-500 mb-3" />
                    <h3 className="font-serif text-lg font-bold text-stone-800 mb-1">
                      Henüz favori kombininiz yok
                    </h3>
                    <p className="text-xs text-stone-500 mb-6 max-w-xs mx-auto">
                      Stil Keşfet sayfamızdaki özenle tasarlanmış paket kombinleri inceleyip favorilerinize ekleyebilirsiniz.
                    </p>
                    <Link
                      href="/stil-kesfet"
                      className="inline-flex items-center gap-2 bg-[#4A5D3E] hover:bg-[#3A4B30] text-white font-bold px-6 py-2.5 rounded-xl text-xs transition-colors"
                    >
                      Kombinleri Keşfet <ArrowRight size={14} />
                    </Link>
                  </div>
                )}

                {activeTab === "products" && sortedItems.length === 0 && (
                  <div className="py-16 text-center bg-white rounded-3xl border border-stone-200/80 p-8">
                    <ShoppingBag size={32} className="mx-auto text-stone-400 mb-3" />
                    <h3 className="font-serif text-lg font-bold text-stone-800 mb-1">
                      Henüz favori ürününüz yok
                    </h3>
                    <p className="text-xs text-stone-500 mb-6 max-w-xs mx-auto">
                      Koleksiyonlarımızı inceleyerek beğendiğiniz parçaları favorilerinize ekleyebilirsiniz.
                    </p>
                    <Link
                      href="/koleksiyon/erkek-giyim"
                      className="inline-flex items-center gap-2 bg-[#4A5D3E] hover:bg-[#3A4B30] text-white font-bold px-6 py-2.5 rounded-xl text-xs transition-colors"
                    >
                      Ürünleri Keşfet <ArrowRight size={14} />
                    </Link>
                  </div>
                )}
              </div>

              {/* Sidebar */}
              <div className="hidden lg:flex flex-col">
                <div className="bg-white rounded-3xl border border-gray-200/70 shadow-card p-8 flex flex-col items-center text-center gap-5 sticky top-24">
                  <div className="w-16 h-16 rounded-full bg-[#4A5D3E]/10 flex items-center justify-center">
                    <Heart size={28} className="text-[#4A5D3E]" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg font-bold text-gray-900 leading-tight">
                      Koleksiyonu Keşfet
                    </h3>
                    <p className="text-xs text-gray-500 mt-2 leading-relaxed">
                      HAQAN'ın yeni sezon erkek ve kadın parçalarını ve kombinlerini keşfedip listenizi genişletin.
                    </p>
                  </div>
                  <div className="w-full flex flex-col gap-2">
                    <Link
                      href="/stil-kesfet"
                      className="w-full flex items-center justify-center gap-2 bg-stone-900 hover:bg-black text-white font-bold py-3 rounded-xl transition-colors text-xs shadow-md uppercase tracking-wider"
                    >
                      KOMBİNLERİ GÖR <Sparkles size={13} className="text-amber-400" />
                    </Link>
                    <Link
                      href="/koleksiyon/erkek-giyim"
                      className="w-full flex items-center justify-center gap-2 bg-[#4A5D3E] hover:bg-[#3A4B30] text-white font-bold py-3 rounded-xl transition-colors text-xs shadow-md uppercase tracking-wider"
                    >
                      ÜRÜNLERİ KEŞFET <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          /* Empty state */
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="relative mb-8">
              <div className="w-28 h-28 rounded-full bg-[#4A5D3E]/8 flex items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-[#4A5D3E]/12 flex items-center justify-center">
                  <Heart
                    size={40}
                    className="text-[#4A5D3E]"
                    strokeWidth={1.5}
                  />
                </div>
              </div>
            </div>

            <h2 className="font-serif text-2xl md:text-3xl font-bold text-gray-900 mb-3">
              Henüz favori ürün veya kombininiz yok.
            </h2>
            <p className="text-gray-500 text-sm md:text-base max-w-sm leading-relaxed mb-8">
              Beğendiğiniz ürünlerin veya özel kombinlerin kalbine dokunun, burada saklayın. İstediğiniz zaman kolayca sipariş verin.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/stil-kesfet"
                className="flex items-center gap-2 bg-stone-900 hover:bg-black text-white font-bold px-8 py-3.5 rounded-xl transition-colors text-xs tracking-widest shadow-md uppercase"
              >
                KOMBİNLERİ KEŞFET <Sparkles size={14} className="text-amber-400" />
              </Link>
              <Link
                href="/koleksiyon/erkek-giyim"
                className="flex items-center gap-2 bg-[#4A5D3E] hover:bg-[#3A4B30] text-white font-bold px-8 py-3.5 rounded-xl transition-colors text-xs tracking-widest shadow-md uppercase"
              >
                ÜRÜNLERİ KEŞFET <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Güven Rozetleri */}
      <section className="border-t border-gray-100 bg-white mt-12">
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

      {/* ─── KOMBİN DETAY & BEDEN SEÇİM MODALI (MOBİLDE BOTTOM SHEET / MASAÜSTÜNDE DRAWER) ─── */}
      <OutfitDetailModal
        outfit={selectedInspectOutfit}
        onClose={() => setSelectedInspectOutfit(null)}
      />
    </>
  );
}
