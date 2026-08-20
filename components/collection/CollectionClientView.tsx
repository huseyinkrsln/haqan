"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ArrowUpDown,
  ChevronDown,
  Sparkles,
  Check,
  RotateCcw,
  Shirt,
  Search,
  X,
  Tag,
} from "lucide-react";
import { useCategories } from "@/hooks/useCategories";
import { useProductGroups } from "@/hooks/useProductGroups";
import { useProducts } from "@/hooks/useProducts";
import { useBrands } from "@/hooks/useFilters";
import ProductCard from "@/components/product/ProductCard";
import { Category, Product } from "@/types/api.types";

interface CollectionClientViewProps {
  slug: string;
  initialCategories?: Category[];
  initialProducts?: Product[];
  specialConfig?: {
    title: string;
    isBestSeller?: boolean;
    isFeatured?: boolean;
    isNewArrival?: boolean;
  };
}

const sortOptions = [
  { label: "Önerilen Sıralama", id: "default", orderBy: "DisplayOrder", isAscending: true },
  { label: "En Yeniler", id: "newest", orderBy: "Id", isAscending: false },
  { label: "Fiyat: Düşükten Yükseğe", id: "price_asc", orderBy: "BasePrice", isAscending: true },
  { label: "Fiyat: Yüksekten Düşüğe", id: "price_desc", orderBy: "BasePrice", isAscending: false },
  { label: "İsim: A - Z", id: "name_asc", orderBy: "Name", isAscending: true },
];

function normalizeSlug(str?: string) {
  if (!str) return "";
  return decodeURIComponent(str)
    .toLowerCase()
    .trim()
    .replace(/ğ/g, "g")
    .replace(/ü/g, "u")
    .replace(/ş/g, "s")
    .replace(/ı/g, "i")
    .replace(/ö/g, "o")
    .replace(/ç/g, "c")
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "");
}

export default function CollectionClientView({
  slug,
  initialCategories,
  initialProducts,
  specialConfig,
}: CollectionClientViewProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const normalizedSlug = normalizeSlug(slug);

  // URL Query Parametreleri
  const qBestSeller = searchParams.get("isBestSeller") === "true";
  const qFeatured = searchParams.get("isFeatured") === "true";
  const qNewArrival = searchParams.get("isNewArrival") === "true";

  const effectiveIsBestSeller = specialConfig?.isBestSeller || qBestSeller || undefined;
  const effectiveIsFeatured = specialConfig?.isFeatured || qFeatured || undefined;
  const effectiveIsNewArrival = specialConfig?.isNewArrival || qNewArrival || undefined;

  // Tüm kategorileri çek
  const { data: allCategories } = useCategories(false);
  const categoriesList = allCategories || initialCategories || [];

  // Kök departmanlar (Erkek, Kadın)
  const rootCategories = useMemo(() => {
    return categoriesList.filter(
      (c) => !c.parentCategoryId || Number(c.parentCategoryId) === 0
    );
  }, [categoriesList]);

  // URL'deki slug ile eşleşen kategori (Özel koleksiyon değilse)
  const currentCategory = useMemo(() => {
    if (specialConfig || categoriesList.length === 0) return undefined;

    return categoriesList.find((c) => {
      const cSlug = normalizeSlug(c.slug);
      const cName = normalizeSlug(c.name);
      return cSlug === normalizedSlug || cName === normalizedSlug || String(c.id) === slug;
    });
  }, [categoriesList, normalizedSlug, specialConfig, slug]);

  // Eğer seçili kategori bir alt kategori ise üst departmanı bul
  const parentDepartment = useMemo(() => {
    if (!currentCategory?.parentCategoryId) return null;
    return categoriesList.find(
      (c) => Number(c.id) === Number(currentCategory.parentCategoryId)
    );
  }, [categoriesList, currentCategory]);

  // Özel koleksiyonlarda (Çok Satanlar, Öne Çıkanlar vb.) kullanıcı ERKEK / KADIN / TÜMÜ seçebilir
  const [selectedSpecialDepartmentId, setSelectedSpecialDepartmentId] = useState<number | undefined>(undefined);
  const [selectedSpecialSubCategoryId, setSelectedSpecialSubCategoryId] = useState<number | undefined>(undefined);

  // Aktif Departman
  const activeDepartment = specialConfig
    ? categoriesList.find((c) => Number(c.id) === Number(selectedSpecialDepartmentId))
    : parentDepartment || currentCategory || rootCategories[0];

  // Aktif Alt Kategoriler
  const subCategories = useMemo(() => {
    if (specialConfig) {
      if (!selectedSpecialDepartmentId) return [];
      return categoriesList.filter(
        (c) => Number(c.parentCategoryId) === Number(selectedSpecialDepartmentId)
      );
    }
    if (!activeDepartment) return [];
    return categoriesList.filter(
      (c) => Number(c.parentCategoryId) === Number(activeDepartment.id)
    );
  }, [categoriesList, specialConfig, selectedSpecialDepartmentId, activeDepartment]);

  // Aktif filtrelenecek Kategori ID'si
  const activeCategoryId = specialConfig
    ? selectedSpecialSubCategoryId || selectedSpecialDepartmentId || undefined
    : currentCategory ? Number(currentCategory.id) : undefined;

  // Bu kategoriye ait Ürün Grupları / Modeller
  const { data: productGroups } = useProductGroups(activeCategoryId);

  // Filtre State'leri
  const [selectedProductGroupId, setSelectedProductGroupId] = useState<number | undefined>(undefined);
  const [selectedBrandId, setSelectedBrandId] = useState<number | undefined>(undefined);
  const [selectedSort, setSelectedSort] = useState(sortOptions[0]);
  const [sortOpen, setSortOpen] = useState(false);

  // Marka Arama State'leri
  const [brandDropdownOpen, setBrandDropdownOpen] = useState(false);
  const [brandSearchQuery, setBrandSearchQuery] = useState("");
  const brandDropdownRef = useRef<HTMLDivElement>(null);
  const sortDropdownRef = useRef<HTMLDivElement>(null);

  // Departman veya Kategori değiştikçe model seçimini sıfırla
  useEffect(() => {
    setSelectedProductGroupId(undefined);
  }, [slug, selectedSpecialDepartmentId, selectedSpecialSubCategoryId]);

  // Dışarı tıklandığında dropdownları kapat
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        brandDropdownRef.current &&
        !brandDropdownRef.current.contains(event.target as Node)
      ) {
        setBrandDropdownOpen(false);
      }
      if (
        sortDropdownRef.current &&
        !sortDropdownRef.current.contains(event.target as Node)
      ) {
        setSortOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Markalar
  const { data: brandsData } = useBrands();

  const filteredBrands = useMemo(() => {
    if (!brandsData) return [];
    if (!brandSearchQuery.trim()) return brandsData;
    const q = brandSearchQuery.trim().toLowerCase();
    return brandsData.filter((b) => b.name.toLowerCase().includes(q));
  }, [brandsData, brandSearchQuery]);

  const selectedBrand = brandsData?.find((b) => b.id === selectedBrandId);

  // Ürünleri Çek
  const { data: productsData, isLoading: isProductsLoading } = useProducts({
    categoryId: activeCategoryId,
    productGroupId: selectedProductGroupId,
    brandId: selectedBrandId,
    isBestSeller: effectiveIsBestSeller,
    isFeatured: effectiveIsFeatured,
    isNewArrival: effectiveIsNewArrival,
    orderBy: selectedSort.orderBy,
    isAscending: selectedSort.isAscending,
    take: 50,
  });

  const rawProducts = productsData?.data || initialProducts || [];

  // 🌟 İSTEMCİDE ANLIK VE KESİN SIRALAMA GARANTİSİ 🌟
  const sortedProducts = useMemo(() => {
    if (!rawProducts || rawProducts.length === 0) return [];
    const list = [...rawProducts];

    switch (selectedSort.id) {
      case "price_asc":
        return list.sort((a, b) => {
          const priceA = a.discountPrice && a.discountPrice > 0 ? a.discountPrice : a.basePrice;
          const priceB = b.discountPrice && b.discountPrice > 0 ? b.discountPrice : b.basePrice;
          return priceA - priceB;
        });
      case "price_desc":
        return list.sort((a, b) => {
          const priceA = a.discountPrice && a.discountPrice > 0 ? a.discountPrice : a.basePrice;
          const priceB = b.discountPrice && b.discountPrice > 0 ? b.discountPrice : b.basePrice;
          return priceB - priceA;
        });
      case "newest":
        return list.sort((a, b) => b.id - a.id);
      case "name_asc":
        return list.sort((a, b) => (a.name || "").localeCompare(b.name || "", "tr"));
      default:
        return list;
    }
  }, [rawProducts, selectedSort.id]);

  // Geçersiz Kategori / Koleksiyon
  if (!specialConfig && !currentCategory && categoriesList.length > 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-20 text-center">
        <div className="w-14 h-14 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 mx-auto mb-4">
          <Shirt size={24} />
        </div>
        <h1 className="font-serif text-2xl font-bold text-gray-900 mb-2">Koleksiyon Bulunamadı</h1>
        <p className="text-gray-500 text-sm mb-6">
          Aradığınız koleksiyon veya kategori henüz yayında değil.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gray-900 text-white text-xs font-semibold shadow-2xs hover:bg-black transition-colors"
        >
          Ana Sayfaya Dön
        </Link>
      </div>
    );
  }

  // Başlık Belirleme
  const pageTitle = specialConfig
    ? specialConfig.title
    : parentDepartment
    ? `${parentDepartment.name} ${currentCategory?.name}`
    : qBestSeller
    ? `${activeDepartment?.name} - Çok Satanlar`
    : qFeatured
    ? `${activeDepartment?.name} - Öne Çıkanlar`
    : qNewArrival
    ? `${activeDepartment?.name} - Yeni Gelenler`
    : `${activeDepartment?.name || "Koleksiyon"}`;

  return (
    <div className="bg-[#FAF9F6]/40 min-h-screen pb-20 md:pb-10">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 sm:py-6 md:py-8">
        {/* ─── 1. BREADCRUMB ─── */}
        <nav className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-gray-400 mb-2 sm:mb-3">
          <Link href="/" className="hover:text-gray-900 transition-colors">Ana Sayfa</Link>
          <span>/</span>
          {specialConfig ? (
            <span className="text-gray-900 font-semibold">{specialConfig.title}</span>
          ) : parentDepartment ? (
            <>
              <Link
                href={`/koleksiyon/${parentDepartment.slug}`}
                className="hover:text-gray-900 transition-colors"
              >
                {parentDepartment.name}
              </Link>
              <span>/</span>
              <span className="text-gray-900 font-semibold">{currentCategory?.name}</span>
            </>
          ) : (
            <span className="text-gray-900 font-semibold">{activeDepartment?.name}</span>
          )}
        </nav>

        {/* ─── 2. BAŞLIK VE FİLTRELEME ARAÇLARI ─── */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 mb-3 border-b border-gray-200/70">
          <div className="flex items-baseline gap-2.5">
            <h1 className="font-serif text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">
              {pageTitle}
            </h1>
            <span className="text-xs font-semibold text-gray-400">
              ({sortedProducts.length} Parça)
            </span>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto w-full sm:w-auto">
            {/* Marka Filtresi */}
            <div className="relative flex-1 sm:flex-initial" ref={brandDropdownRef}>
              <button
                onClick={() => setBrandDropdownOpen(!brandDropdownOpen)}
                className={`w-full sm:w-auto flex items-center justify-between sm:justify-start gap-1.5 text-xs font-medium px-3 py-2 rounded-xl transition-all border shadow-2xs cursor-pointer ${
                  selectedBrandId
                    ? "bg-[#4A5D3E] text-white border-[#4A5D3E]"
                    : "bg-white text-gray-700 border-gray-200 hover:border-gray-400"
                }`}
              >
                <div className="flex items-center gap-1.5 truncate">
                  <Tag size={13} className={selectedBrandId ? "text-white" : "text-gray-400"} />
                  <span className="truncate max-w-[110px] sm:max-w-none">
                    {selectedBrand ? selectedBrand.name : "Markalar"}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  {selectedBrandId && (
                    <span
                      role="button"
                      tabIndex={0}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedBrandId(undefined);
                      }}
                      className="hover:bg-white/20 p-0.5 rounded-full cursor-pointer inline-flex items-center justify-center"
                      title="Kaldır"
                    >
                      <X size={12} />
                    </span>
                  )}
                  <ChevronDown size={13} className={selectedBrandId ? "text-white" : "text-gray-400"} />
                </div>
              </button>

              {brandDropdownOpen && (
                <div className="absolute left-0 sm:left-auto sm:right-0 top-full mt-1.5 bg-white border border-gray-100 rounded-2xl shadow-xl p-3 z-50 w-[calc(100vw-32px)] max-w-xs sm:w-64 animate-in fade-in slide-in-from-top-1 duration-150">
                  <div className="relative mb-2">
                    <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      value={brandSearchQuery}
                      onChange={(e) => setBrandSearchQuery(e.target.value)}
                      placeholder="Marka ara..."
                      className="w-full pl-8 pr-3 py-1.5 text-xs bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-gray-400 text-gray-800"
                      autoFocus
                    />
                  </div>

                  <div className="max-h-48 overflow-y-auto space-y-1 pr-1">
                    <button
                      onClick={() => {
                        setSelectedBrandId(undefined);
                        setBrandDropdownOpen(false);
                      }}
                      className={`w-full text-left px-2.5 py-1.5 text-xs rounded-lg transition-colors flex items-center justify-between cursor-pointer ${
                        !selectedBrandId
                          ? "bg-gray-100 font-bold text-gray-900"
                          : "text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      <span>Tüm Markalar</span>
                      {!selectedBrandId && <Check size={13} className="text-[#4A5D3E]" />}
                    </button>

                    {filteredBrands.map((b) => {
                      const isSelected = selectedBrandId === b.id;
                      return (
                        <button
                          key={b.id}
                          onClick={() => {
                            setSelectedBrandId(b.id);
                            setBrandDropdownOpen(false);
                          }}
                          className={`w-full text-left px-2.5 py-1.5 text-xs rounded-lg transition-colors flex items-center justify-between cursor-pointer ${
                            isSelected
                              ? "bg-gray-100 font-bold text-gray-900"
                              : "text-gray-600 hover:bg-gray-50"
                          }`}
                        >
                          <span>{b.name}</span>
                          {isSelected && <Check size={13} className="text-[#4A5D3E]" />}
                        </button>
                      );
                    })}

                    {filteredBrands.length === 0 && (
                      <p className="text-center py-3 text-[11px] text-gray-400">
                        Marka bulunamadı.
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Sıralama Dropdown (Anlık Tetikleyici) */}
            <div className="relative flex-1 sm:flex-initial" ref={sortDropdownRef}>
              <button
                onClick={() => setSortOpen(!sortOpen)}
                className="w-full sm:w-auto flex items-center justify-between sm:justify-start gap-1.5 text-xs font-medium text-gray-700 bg-white border border-gray-200 px-3 py-2 rounded-xl hover:border-gray-400 transition-colors shadow-2xs cursor-pointer"
              >
                <div className="flex items-center gap-1.5 truncate">
                  <ArrowUpDown size={13} className="text-gray-400 shrink-0" />
                  <span className="truncate max-w-[110px] sm:max-w-none">{selectedSort.label}</span>
                </div>
                <ChevronDown size={13} className="text-gray-400 shrink-0" />
              </button>

              {sortOpen && (
                <div className="absolute right-0 top-full mt-1.5 bg-white border border-gray-100 rounded-2xl shadow-xl p-1.5 z-50 w-52 animate-in fade-in slide-in-from-top-1 duration-150">
                  {sortOptions.map((opt) => {
                    const isSelected = selectedSort.id === opt.id;
                    return (
                      <button
                        key={opt.id}
                        onClick={() => {
                          setSelectedSort(opt);
                          setSortOpen(false);
                        }}
                        className={`w-full text-left px-3 py-2 text-xs rounded-xl transition-colors flex items-center justify-between cursor-pointer ${
                          isSelected
                            ? "bg-gray-100 font-bold text-gray-900"
                            : "text-gray-600 hover:bg-gray-50"
                        }`}
                      >
                        <span>{opt.label}</span>
                        {isSelected && <Check size={13} className="text-[#4A5D3E]" />}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ─── 3. 🌟 HİYERARŞİK KATEGORİ & DEPARTMAN SEÇİMİ 🌟 ─── */}
        {/* Özel Koleksiyonlarda Departman (Erkek / Kadın / Tümü) Sekmeleri */}
        {specialConfig && rootCategories.length > 0 && (
          <div className="mb-4 -mx-4 px-4 sm:mx-0 sm:px-0">
            <div className="flex items-center gap-5 sm:gap-7 border-b border-gray-200/80 overflow-x-auto scrollbar-hide py-1">
              <button
                onClick={() => {
                  setSelectedSpecialDepartmentId(undefined);
                  setSelectedSpecialSubCategoryId(undefined);
                }}
                className={`text-xs uppercase font-bold tracking-widest pb-2.5 transition-all relative shrink-0 cursor-pointer ${
                  selectedSpecialDepartmentId === undefined
                    ? "text-gray-900 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-gray-900"
                    : "text-gray-400 hover:text-gray-700"
                }`}
              >
                TÜMÜ
              </button>
              {rootCategories.map((rc) => {
                const isSelected = selectedSpecialDepartmentId === rc.id;
                return (
                  <button
                    key={rc.id}
                    onClick={() => {
                      setSelectedSpecialDepartmentId(rc.id);
                      setSelectedSpecialSubCategoryId(undefined);
                    }}
                    className={`text-xs uppercase font-bold tracking-widest pb-2.5 transition-all relative shrink-0 cursor-pointer ${
                      isSelected
                        ? "text-gray-900 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-gray-900"
                        : "text-gray-400 hover:text-gray-700"
                    }`}
                  >
                    {rc.name}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Standart Kategorilerde Alt Kategori Sekmeleri */}
        {!specialConfig && subCategories.length > 0 && (
          <div className="mb-4 -mx-4 px-4 sm:mx-0 sm:px-0">
            <div className="flex items-center gap-5 sm:gap-7 border-b border-gray-200/80 overflow-x-auto scrollbar-hide py-1">
              <Link
                href={`/koleksiyon/${activeDepartment?.slug}`}
                className={`text-xs uppercase font-bold tracking-widest pb-2.5 transition-all relative shrink-0 ${
                  !parentDepartment && currentCategory?.id === activeDepartment?.id
                    ? "text-gray-900 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-gray-900"
                    : "text-gray-400 hover:text-gray-700"
                }`}
              >
                TÜMÜ
              </Link>
              {subCategories.map((subCat) => {
                const isCurrent = currentCategory?.id === subCat.id;
                return (
                  <Link
                    key={subCat.id}
                    href={`/koleksiyon/${subCat.slug}`}
                    className={`text-xs uppercase font-bold tracking-widest pb-2.5 transition-all relative shrink-0 ${
                      isCurrent
                        ? "text-gray-900 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-gray-900"
                        : "text-gray-400 hover:text-gray-700"
                    }`}
                  >
                    {subCat.name}
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        {/* Özel Koleksiyonda Bir Departman (Örn: Kadın) Seçildiğinde Çıkan Alt Kategoriler */}
        {specialConfig && selectedSpecialDepartmentId && subCategories.length > 0 && (
          <div className="mb-4 -mx-4 px-4 sm:mx-0 sm:px-0">
            <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide py-1">
              <button
                onClick={() => setSelectedSpecialSubCategoryId(undefined)}
                className={`text-xs font-semibold px-3 py-1.5 rounded-full transition-all shrink-0 border cursor-pointer ${
                  selectedSpecialSubCategoryId === undefined
                    ? "bg-[#4A5D3E] text-white border-[#4A5D3E] shadow-2xs"
                    : "bg-white text-gray-600 border-gray-200 hover:border-gray-400"
                }`}
              >
                Tüm {activeDepartment?.name}
              </button>
              {subCategories.map((subCat) => {
                const isSelected = selectedSpecialSubCategoryId === subCat.id;
                return (
                  <button
                    key={subCat.id}
                    onClick={() => setSelectedSpecialSubCategoryId(isSelected ? undefined : subCat.id)}
                    className={`text-xs font-semibold px-3 py-1.5 rounded-full transition-all shrink-0 border cursor-pointer ${
                      isSelected
                        ? "bg-[#4A5D3E] text-white border-[#4A5D3E] shadow-2xs"
                        : "bg-white text-gray-600 border-gray-200 hover:border-gray-400"
                    }`}
                  >
                    {subCat.name}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* ─── 4. MODEL / ÜRÜN GRUBU PİLLERİ (Yalnızca Seçili Kategoriye Ait Olanlar) ─── */}
        {activeCategoryId && productGroups && productGroups.length > 0 && (
          <div className="mb-6 -mx-4 px-4 sm:mx-0 sm:px-0">
            <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide py-1">
              <button
                onClick={() => setSelectedProductGroupId(undefined)}
                className={`text-xs font-semibold px-3 py-1.5 rounded-full transition-all shrink-0 border cursor-pointer ${
                  selectedProductGroupId === undefined
                    ? "bg-gray-900 text-white border-gray-900 shadow-2xs"
                    : "bg-white text-gray-600 border-gray-200 hover:border-gray-400"
                }`}
              >
                Tüm Modeller
              </button>
              {productGroups.map((pg) => {
                const isSelected = selectedProductGroupId === pg.id;
                return (
                  <button
                    key={pg.id}
                    onClick={() => setSelectedProductGroupId(isSelected ? undefined : pg.id)}
                    className={`text-xs font-semibold px-3 py-1.5 rounded-full transition-all shrink-0 border cursor-pointer ${
                      isSelected
                        ? "bg-gray-900 text-white border-gray-900 shadow-2xs"
                        : "bg-white text-gray-600 border-gray-200 hover:border-gray-400"
                    }`}
                  >
                    {pg.name}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* ─── 5. ÜRÜN LİSTELEME GRID'İ ─── */}
        {isProductsLoading && sortedProducts.length === 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
              <div key={n} className="aspect-[3/4] bg-gray-200 animate-pulse rounded-2xl" />
            ))}
          </div>
        ) : sortedProducts.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200 shadow-2xs">
            <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 mx-auto mb-3">
              <Shirt size={20} />
            </div>
            <h3 className="text-sm font-bold text-gray-800 mb-1">
              Bu Kriterlerde Ürün Bulunamadı
            </h3>
            <p className="text-xs text-gray-500 max-w-xs mx-auto mb-4">
              Seçilen filtreleri temizleyerek daha fazla ürüne ulaşabilirsiniz.
            </p>
            <button
              onClick={() => {
                setSelectedSpecialDepartmentId(undefined);
                setSelectedSpecialSubCategoryId(undefined);
                setSelectedProductGroupId(undefined);
                setSelectedBrandId(undefined);
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gray-900 text-white text-xs font-semibold hover:bg-black transition-colors cursor-pointer"
            >
              <RotateCcw size={12} /> Filtreleri Temizle
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
            {sortedProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                badge={
                  effectiveIsBestSeller
                    ? "Çok Satan"
                    : effectiveIsNewArrival
                    ? "Yeni"
                    : undefined
                }
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
