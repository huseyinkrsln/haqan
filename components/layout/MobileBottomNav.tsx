"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Shirt, Heart, User } from "lucide-react";
import { useWishlist } from "@/context/WishlistContext";

// Şık ve Modern Etek / Elbise İkonu (Kadın Kategorisi İçin)
function SkirtIcon({ size = 19, className }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M8 4h8l1 2.5H7L8 4z" />
      <path d="M7 6.5L3.5 19.5c0 .5.5 1 1 1h15c.5 0 1-.5 1-1L17 6.5" />
      <path d="M9.5 6.5v14" />
      <path d="M14.5 6.5v14" />
    </svg>
  );
}

const navItems = [
  { href: "/", label: "ANA SAYFA", icon: Home },
  { href: "/koleksiyon/erkek-giyim", label: "ERKEK", icon: Shirt },
  { href: "/koleksiyon/kadin-giyim", label: "KADIN", icon: SkirtIcon },
  { href: "/favoriler", label: "FAVORİLER", icon: Heart },
  { href: "/profilim", label: "PROFİLİM", icon: User },
];

export default function MobileBottomNav() {
  const pathname = usePathname();
  const { totalItems: wishlistCount } = useWishlist();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-gray-100/90 safe-area-pb shadow-lg">
      <div className="grid grid-cols-5 h-15">
        {navItems.map(({ href, label, icon: Icon }) => {
          const isActive =
            href === "/"
              ? pathname === "/"
              : pathname.startsWith(href) || (href.includes("erkek") && pathname.includes("erkek")) || (href.includes("kadin") && pathname.includes("kadin"));

          return (
            <Link
              key={href}
              href={href}
              className={`flex flex-col items-center justify-center gap-1 transition-colors relative ${
                isActive ? "text-[#4A5D3E] font-bold" : "text-gray-400 hover:text-gray-600 font-medium"
              }`}
            >
              <div className="relative">
                <Icon size={19} className={isActive ? "stroke-[2.3]" : "stroke-[1.8]"} />
                {label === "FAVORİLER" && wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-2 bg-[#4A5D3E] text-white text-[8px] font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </div>
              <span className="text-[9px] tracking-wider uppercase">{label}</span>
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
