"use client";

import { useMemo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Shirt,
  User,
  Sparkles,
  Tag,
  Layers,
  ShoppingBag,
  Footprints,
  Flame,
  Crown,
  Watch,
  Glasses,
  Compass,
  Heart,
} from "lucide-react";
import { useCategories } from "@/hooks/useCategories";

const ICON_MAP: Record<string, any> = {
  Layers,
  Shirt,
  Footprints,
  ShoppingBag,
  Sparkles,
  Flame,
  Tag,
  Crown,
  Watch,
  Glasses,
  Compass,
  Heart,
};

function getCategoryIcon(name: string, slug: string) {
  const lower = (name + " " + slug).toLowerCase();
  if (lower.includes("koleksiyon") || lower.includes("collection") || lower.includes("all")) {
    return Layers;
  }
  if (lower.includes("ayakkabi") || lower.includes("shoe") || lower.includes("sneaker") || lower.includes("bot")) {
    return Footprints;
  }
  if (lower.includes("aksesuar") || lower.includes("canta") || lower.includes("bag") || lower.includes("cuzdan") || lower.includes("taki")) {
    return ShoppingBag;
  }
  if (lower.includes("yeni") || lower.includes("trend") || lower.includes("sezon") || lower.includes("stil")) {
    return Sparkles;
  }
  if (lower.includes("giyim") || lower.includes("shirt") || lower.includes("tekstil") || lower.includes("elbise") || lower.includes("pantolon") || lower.includes("ceket") || lower.includes("takim")) {
    return Shirt;
  }
  return Tag;
}

export default function MobileBottomNav() {
  const pathname = usePathname();
  
  // Ana kategorileri veritabanından dinamik olarak çek
  const { data: rootCategories } = useCategories(true);

  // Dinamik ana kategoriler (Sadece veritabanından gelenler)
  const dynamicCategoryItems = useMemo(() => {
    if (!rootCategories || rootCategories.length === 0) {
      return [];
    }

    // Mobilde sığması için en fazla 2 ana kategori göster
    return rootCategories.slice(0, 2).map((cat) => {
      // Panelden seçilen ikon varsa onu al, yoksa akıllı varsayılana düş
      const ChosenIcon =
        cat.icon && ICON_MAP[cat.icon]
          ? ICON_MAP[cat.icon]
          : getCategoryIcon(cat.name, cat.slug);

      return {
        href: `/koleksiyon/${cat.slug}`,
        label: cat.name.toUpperCase(),
        icon: ChosenIcon,
      };
    });
  }, [rootCategories]);

  // Statik tek öğeler: ANA SAYFA, STİLLER, PROFİLİM. Aradaki kategoriler %100 dinamiktir.
  const navItems = [
    { href: "/", label: "ANA SAYFA", icon: Home },
    ...dynamicCategoryItems,
    { href: "/stil-kesfet", label: "STİLLER", icon: Sparkles },
    { href: "/profilim", label: "PROFİLİM", icon: User },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-lg border-t border-gray-200/80 safe-area-pb shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
      <div className="flex items-center justify-around h-15 w-full px-1">
        {navItems.map(({ href, label, icon: Icon }) => {
          const isActive =
            href === "/"
              ? pathname === "/"
              : pathname === href || (href !== "/" && pathname.startsWith(href));

          const isStil = href === "/stil-kesfet";

          return (
            <Link
              key={href}
              href={href}
              className={`flex-1 min-w-0 flex flex-col items-center justify-center gap-1 transition-colors relative py-1 ${
                isActive
                  ? "text-[#4A5D3E] font-bold"
                  : isStil
                  ? "text-stone-700 font-medium"
                  : "text-gray-400 hover:text-gray-600 font-medium"
              }`}
            >
              <div className="relative flex items-center justify-center">
                <Icon
                  size={19}
                  className={
                    isActive
                      ? "stroke-[2.3] text-[#4A5D3E]"
                      : isStil
                      ? "stroke-[1.9] text-amber-500"
                      : "stroke-[1.8]"
                  }
                />
              </div>
              <span
                className={`text-[8.5px] sm:text-[9px] tracking-tight uppercase text-center px-0.5 truncate max-w-full ${
                  isActive
                    ? "font-bold text-[#4A5D3E]"
                    : isStil
                    ? "text-stone-800 font-semibold"
                    : "text-gray-500"
                }`}
                title={label}
              >
                {label}
              </span>
              {isActive && (
                <span className="absolute top-0 w-8 h-0.5 bg-[#4A5D3E] rounded-full" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
