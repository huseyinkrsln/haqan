"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, User, Heart, ShoppingBag, Menu, X } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";

const navLinks = [
  { href: "/", label: "ANA SAYFA" },
  { href: "/kategoriler", label: "KATEGORİLER" },
  { href: "/favoriler", label: "FAVORİLER" },
  { href: "/profilim", label: "PROFİLİM" },
];

export default function Header() {
  const pathname = usePathname();
  const { totalItems } = useCart();
  const { totalItems: wishlistCount } = useWishlist();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4">
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

          {/* Nav */}
          <nav className="flex-1 flex items-center justify-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-xs tracking-widest font-medium transition-colors relative pb-0.5 ${
                  pathname === link.href
                    ? "text-[#4A5D3E]"
                    : "text-gray-500 hover:text-gray-900"
                }`}
              >
                {link.label}
                {pathname === link.href && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#4A5D3E] rounded-full" />
                )}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              aria-label="Ara"
              className="p-2 text-gray-500 hover:text-gray-900 transition-colors rounded-lg hover:bg-gray-50"
            >
              <Search size={18} />
            </button>
            <Link
              href="/giris"
              aria-label="Profil"
              className="p-2 text-gray-500 hover:text-gray-900 transition-colors rounded-lg hover:bg-gray-50"
            >
              <User size={18} />
            </Link>
            <Link
              href="/favoriler"
              aria-label="Favoriler"
              className="p-2 text-gray-500 hover:text-gray-900 transition-colors rounded-lg hover:bg-gray-50 relative"
            >
              <Heart size={18} />
              {wishlistCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                  {wishlistCount > 9 ? "9+" : wishlistCount}
                </span>
              )}
            </Link>
            <Link
              href="/sepet"
              aria-label="Sepet"
              className="p-2 text-gray-500 hover:text-gray-900 transition-colors rounded-lg hover:bg-gray-50 relative"
            >
              <ShoppingBag size={18} />
              {totalItems > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-[#4A5D3E] text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                  {totalItems > 9 ? "9+" : totalItems}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Mobile Header */}
        <div className="md:hidden flex items-center h-14 justify-between">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-gray-500"
            aria-label="Menü"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          <Link href="/" className="absolute left-1/2 -translate-x-1/2">
            <div className="flex flex-col leading-none items-center">
              <span className="font-serif text-xl font-bold tracking-[0.15em] text-gray-900">
                HAQAN
              </span>
              <span className="text-[8px] tracking-[0.4em] text-[#4A5D3E] font-medium">
                WEAR
              </span>
            </div>
          </Link>

          <div className="flex items-center gap-1">
            <button aria-label="Ara" className="p-2 text-gray-500">
              <Search size={18} />
            </button>
            <Link href="/sepet" aria-label="Sepet" className="p-2 text-gray-500 relative">
              <ShoppingBag size={18} />
              {totalItems > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-[#4A5D3E] text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                  {totalItems > 9 ? "9+" : totalItems}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Mobile dropdown menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-100 py-2 pb-4 animate-fade-in">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-2 py-3 text-sm font-medium tracking-wider border-b border-gray-50 ${
                  pathname === link.href
                    ? "text-[#4A5D3E]"
                    : "text-gray-700"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}
