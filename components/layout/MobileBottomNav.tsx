"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Grid3X3, Heart, User } from "lucide-react";

const navItems = [
  { href: "/", label: "ANA SAYFA", icon: Home },
  { href: "/kategoriler", label: "KATEGORİLER", icon: Grid3X3 },
  { href: "/favoriler", label: "FAVORİLER", icon: Heart },
  { href: "/profilim", label: "PROFİLİM", icon: User },
];

export default function MobileBottomNav() {
  const pathname = usePathname();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-100 safe-area-pb">
      <div className="grid grid-cols-4 h-16">
        {navItems.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href || (href !== "/" && pathname.startsWith(href));
          return (
            <Link
              key={href}
              href={href}
              className={`flex flex-col items-center justify-center gap-1 transition-colors ${
                isActive ? "text-[#4A5D3E]" : "text-gray-400"
              }`}
            >
              <Icon size={20} strokeWidth={isActive ? 2.5 : 1.8} />
              <span className="text-[9px] tracking-wider font-medium">{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
