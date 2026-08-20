"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import {
  ShoppingBag,
  Heart,
  User,
  Search,
  Menu,
  X,
  ChevronDown,
  Sparkles,
  Flame,
  ArrowRight,
  Star,
  Check,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useCategories } from "@/hooks/useCategories";
import { useProducts } from "@/hooks/useProducts";
import { getMinioUrl, formatPrice } from "@/lib/utils";

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();
  const { totalItems } = useCart();
  const { totalItems: wishlistCount } = useWishlist();

  // Kategoriler
  const { data: rootCategories } = useCategories(true);
  const { data: allCategories } = useCategories(false);

  const [activeHoverDeptId, setActiveHoverDeptId] = useState<number | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const searchInputRef = useRef<HTMLInputElement>(null);

  // Canlı ürün arama
  const { data: searchResults, isLoading: isSearching } = useProducts({
    search: searchQuery.trim(),
    take: 6,
  });

  const searchProducts = searchQuery.trim().length >= 2 ? searchResults?.data || [] : [];

  useEffect(() => {
    if (searchOpen) {
      setTimeout(() => searchInputRef.current?.focus(), 50);
    }
  }, [searchOpen]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setSearchOpen(false);
      router.push(`/koleksiyon/erkek-giyim?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const user = session?.user;

  // Kök Departmanlar (ERKEK, KADIN, AKSESUAR, AYAKKABI)
  const departments = (rootCategories && rootCategories.length > 0)
    ? rootCategories
    : (allCategories || []).filter((c) => !c.parentCategoryId || Number(c.parentCategoryId) === 0);

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Desktop Header */}
        <div className="hidden md:flex items-center h-16 gap-8">
          {/* Logo */}
          <Link href="/" className="shrink-0">
            <div className="flex flex-col leading-none">
              <span className="font-serif text-2xl font-bold tracking-[0.15em] text-gray-900">
                HAQAN
              </span>
              <span className="text-[9px] tracking-[0.4em] text-[#4A5D3E] font-medium uppercase ml-0.5">
                WEAR
              </span>
            </div>
          </Link>

          {/* ─── MODA DEPARTMAN MENÜSÜ (ERKEK | KADIN) ─── */}
          <nav className="flex-1 flex items-center justify-center gap-8">
            <Link
              href="/"
              className={`text-xs tracking-widest font-semibold transition-colors relative pb-0.5 ${
                pathname === "/" ? "text-[#4A5D3E]" : "text-gray-600 hover:text-gray-900"
              }`}
            >
              ANA SAYFA
              {pathname === "/" && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#4A5D3E] rounded-full" />
              )}
            </Link>

            {departments.map((dept) => {
              const deptSubCats = (allCategories || []).filter(
                (sub) => Number(sub.parentCategoryId) === Number(dept.id)
              );
              const isDeptActive =
                pathname.includes(dept.slug) ||
                deptSubCats.some((s) => pathname.includes(s.slug));
              const isHovered = activeHoverDeptId === Number(dept.id);

              return (
                <div
                  key={dept.id}
                  className="relative py-5"
                  onMouseEnter={() => setActiveHoverDeptId(Number(dept.id))}
                  onMouseLeave={() => setActiveHoverDeptId(null)}
                >
                  <Link
                    href={`/koleksiyon/${dept.slug}`}
                    className={`text-xs tracking-widest font-bold uppercase transition-colors flex items-center gap-1.5 pb-0.5 ${
                      isDeptActive
                        ? "text-[#4A5D3E]"
                        : "text-gray-700 hover:text-gray-900"
                    }`}
                  >
                    {dept.name}
                    {deptSubCats.length > 0 && (
                      <ChevronDown
                        size={12}
                        className={`transition-transform duration-200 ${
                          isHovered ? "rotate-180 text-[#4A5D3E]" : "text-gray-400"
                        }`}
                      />
                    )}
                    {isDeptActive && (
                      <span className="absolute bottom-2 left-0 right-0 h-0.5 bg-[#4A5D3E] rounded-full" />
                    )}
                  </Link>

                  {/* 🌟 LÜKS & GENİŞ MEGA DROPDOWN PANELİ 🌟 */}
                  {isHovered && deptSubCats.length > 0 && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 w-[680px] bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-100 p-6 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                      <div className="grid grid-cols-12 gap-6">
                        {/* 1. Kolon: Özel Seçimler */}
                        <div className="col-span-4 space-y-4 border-r border-gray-100 pr-5">
                          <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
                            Öne Çıkanlar
                          </p>
                          <div className="space-y-2">
                            <Link
                              href={`/koleksiyon/${dept.slug}`}
                              onClick={() => setActiveHoverDeptId(null)}
                              className="group flex items-center justify-between text-xs font-bold text-gray-900 hover:text-[#4A5D3E] transition-colors py-1"
                            >
                              <span>Tüm {dept.name} Koleksiyonu</span>
                              <ArrowRight size={13} className="text-gray-400 group-hover:translate-x-1 group-hover:text-[#4A5D3E] transition-all" />
                            </Link>
                            <Link
                              href={`/koleksiyon/${dept.slug}?isNewArrival=true`}
                              onClick={() => setActiveHoverDeptId(null)}
                              className="flex items-center gap-2 text-xs text-gray-600 hover:text-[#4A5D3E] transition-colors py-1 font-medium"
                            >
                              <Sparkles size={13} className="text-emerald-600" />
                              <span>Yeni Sezon</span>
                            </Link>
                            <Link
                              href={`/koleksiyon/${dept.slug}?isBestSeller=true`}
                              onClick={() => setActiveHoverDeptId(null)}
                              className="flex items-center gap-2 text-xs text-gray-600 hover:text-[#4A5D3E] transition-colors py-1 font-medium"
                            >
                              <Flame size={13} className="text-amber-500 fill-amber-500" />
                              <span>Çok Satanlar</span>
                            </Link>
                            <Link
                              href={`/koleksiyon/${dept.slug}?isFeatured=true`}
                              onClick={() => setActiveHoverDeptId(null)}
                              className="flex items-center gap-2 text-xs text-gray-600 hover:text-[#4A5D3E] transition-colors py-1 font-medium"
                            >
                              <Star size={13} className="text-[#4A5D3E]" />
                              <span>Özel Seçimler</span>
                            </Link>
                          </div>
                        </div>

                        {/* 2. Kolon: Alt Kategoriler */}
                        <div className="col-span-4 space-y-4">
                          <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
                            Kategoriler
                          </p>
                          <div className="space-y-1.5 max-h-56 overflow-y-auto pr-1">
                            {deptSubCats.map((sub) => (
                              <Link
                                key={sub.id}
                                href={`/koleksiyon/${sub.slug}`}
                                onClick={() => setActiveHoverDeptId(null)}
                                className="block text-xs text-gray-700 hover:text-[#4A5D3E] hover:bg-gray-50/80 px-2.5 py-1.5 rounded-lg transition-colors font-medium"
                              >
                                {sub.name}
                              </Link>
                            ))}
                          </div>
                        </div>

                        {/* 3. Kolon: Lüks Atelier Vitrin Kartı */}
                        <div className="col-span-4 flex flex-col justify-between rounded-xl bg-[#FAF9F6] border border-[#4A5D3E]/15 p-4 transition-all hover:border-[#4A5D3E]/35">
                          <div>
                            <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#4A5D3E] block mb-1.5">
                              HAQAN ATELIER
                            </span>
                            <h4 className="font-serif text-sm font-bold text-gray-900 leading-snug">
                              Zamansız {dept.name} Tasarımları
                            </h4>
                            <p className="text-[11px] text-gray-500 mt-1.5 leading-relaxed">
                              İtalyan dokular ve üstün işçilikle hazırlanan seçkin parçalar.
                            </p>
                          </div>

                          <Link
                            href={`/koleksiyon/${dept.slug}`}
                            onClick={() => setActiveHoverDeptId(null)}
                            className="inline-flex items-center justify-between text-[11px] font-bold text-[#4A5D3E] hover:text-[#38472f] transition-colors pt-3 border-t border-gray-200/60 mt-3 group"
                          >
                            <span>Koleksiyonu İncele</span>
                            <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

            <Link
              href="/favoriler"
              className={`text-xs tracking-widest font-semibold transition-colors relative pb-0.5 ${
                pathname === "/favoriler" ? "text-[#4A5D3E]" : "text-gray-600 hover:text-gray-900"
              }`}
            >
              FAVORİLER
              {pathname === "/favoriler" && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#4A5D3E] rounded-full" />
              )}
            </Link>
          </nav>

          {/* Aksiyonlar (Arama, Profil, Favori, Sepet) */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Arama Butonu */}
            <button
              onClick={() => setSearchOpen(true)}
              aria-label="Arama"
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-full transition-colors"
            >
              <Search size={19} />
            </button>

            {/* Profil */}
            <Link
              href={user ? "/profilim" : "/giris"}
              aria-label={user ? "Profilim" : "Giriş Yap"}
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-full transition-colors flex items-center gap-1.5"
            >
              <User size={19} />
              {user && (
                <span className="text-xs font-semibold text-gray-800 max-w-[80px] truncate">
                  {user.name?.split(" ")[0]}
                </span>
              )}
            </Link>

            {/* Favoriler */}
            <Link
              href="/favoriler"
              aria-label="Favorilerim"
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-full transition-colors relative"
            >
              <Heart size={19} />
              {wishlistCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-[#4A5D3E] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Sepet */}
            <Link
              href="/sepet"
              aria-label="Sepetim"
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-full transition-colors relative"
            >
              <ShoppingBag size={19} />
              {totalItems > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-[#4A5D3E] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* ─── MOBİL HEADER ─── */}
        <div className="flex md:hidden items-center justify-between h-14">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Menü"
            className="p-1.5 text-gray-700 hover:text-gray-900"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          <Link href="/" className="flex flex-col items-center leading-none">
            <span className="font-serif text-xl font-bold tracking-[0.15em] text-gray-900">
              HAQAN
            </span>
            <span className="text-[8px] tracking-[0.35em] text-[#4A5D3E] font-medium uppercase">
              WEAR
            </span>
          </Link>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setSearchOpen(true)}
              aria-label="Arama"
              className="p-1.5 text-gray-700"
            >
              <Search size={19} />
            </button>
            <Link href="/sepet" className="p-1.5 text-gray-700 relative">
              <ShoppingBag size={19} />
              {totalItems > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-[#4A5D3E] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Mobil Açılır Menü */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-100 py-4 space-y-2 animate-in fade-in slide-in-from-top-2 duration-150">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-sm font-semibold tracking-wider text-gray-800"
            >
              ANA SAYFA
            </Link>

            {departments.map((dept) => {
              const deptSubCats = (allCategories || []).filter(
                (sub) => Number(sub.parentCategoryId) === Number(dept.id)
              );

              return (
                <div key={dept.id} className="px-3 py-1">
                  <Link
                    href={`/koleksiyon/${dept.slug}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block text-sm font-bold uppercase tracking-wider text-gray-900 py-1"
                  >
                    {dept.name}
                  </Link>
                  {deptSubCats.length > 0 && (
                    <div className="pl-3 py-1 space-y-1 border-l-2 border-gray-100 my-1">
                      {deptSubCats.map((sub) => (
                        <Link
                          key={sub.id}
                          href={`/koleksiyon/${sub.slug}`}
                          onClick={() => setMobileMenuOpen(false)}
                          className="block text-xs text-gray-600 py-1"
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}

            <Link
              href="/favoriler"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-sm font-semibold tracking-wider text-gray-800"
            >
              FAVORİLER
            </Link>
            <Link
              href={user ? "/profilim" : "/giris"}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-sm font-semibold tracking-wider text-gray-800 border-t border-gray-100 pt-3"
            >
              {user ? "Hesabım" : "Giriş Yap / Kayıt Ol"}
            </Link>
          </div>
        )}
      </div>

      {/* Canlı Arama Modal / Popup */}
      {searchOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-start justify-center pt-20 px-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-xl w-full shadow-2xl border border-gray-100 overflow-hidden">
            <form onSubmit={handleSearchSubmit} className="flex items-center border-b px-4 py-3 gap-3">
              <Search size={20} className="text-gray-400 shrink-0" />
              <input
                ref={searchInputRef}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Ürün adı, model veya kategori ara..."
                className="flex-1 text-sm outline-none text-gray-900 placeholder:text-gray-400"
              />
              <button
                type="button"
                onClick={() => {
                  setSearchOpen(false);
                  setSearchQuery("");
                }}
                className="p-1 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-50"
              >
                <X size={18} />
              </button>
            </form>

            {/* Arama Sonuçları */}
            <div className="max-h-96 overflow-y-auto p-4">
              {searchQuery.trim().length < 2 ? (
                <div className="text-center py-8 text-xs text-gray-400">
                  Aramak için en az 2 karakter giriniz...
                </div>
              ) : isSearching ? (
                <div className="text-center py-8 text-xs text-gray-400">
                  Aranıyor...
                </div>
              ) : searchProducts.length === 0 ? (
                <div className="text-center py-8 text-xs text-gray-500">
                  &quot;{searchQuery}&quot; ile eşleşen ürün bulunamadı.
                </div>
              ) : (
                <div className="space-y-2">
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 mb-2">
                    Bulunan Ürünler ({searchProducts.length})
                  </p>
                  {searchProducts.map((p) => {
                    const imgUrl = getMinioUrl(p.images?.[0]?.imageUrl || p.mainImageUrl);
                    const price = p.discountPrice && p.discountPrice > 0 ? p.discountPrice : p.basePrice;

                    return (
                      <Link
                        key={p.id}
                        href={`/urun/${p.slug}`}
                        onClick={() => setSearchOpen(false)}
                        className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-50 transition-colors"
                      >
                        <div className="w-12 h-14 bg-gray-100 rounded-lg overflow-hidden shrink-0 flex items-center justify-center">
                          {imgUrl ? (
                            <img
                              src={imgUrl}
                              alt={p.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <span className="text-[10px] text-gray-400">HQ</span>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-semibold text-gray-900 truncate">
                            {p.name}
                          </p>
                          <p className="text-[11px] text-gray-400 truncate">
                            {p.categoryName}
                          </p>
                        </div>
                        <span className="text-xs font-bold text-gray-900 shrink-0">
                          {formatPrice(price)}
                        </span>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
