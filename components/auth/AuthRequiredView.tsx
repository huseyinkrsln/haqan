"use client";

import Link from "next/link";
import { User, Heart, Lock, ShoppingBag, ArrowRight, ShieldCheck, UserPlus, LogIn } from "lucide-react";

interface AuthRequiredViewProps {
  title: string;
  description: string;
  callbackUrl?: string;
  iconType?: "user" | "heart" | "order" | "cart";
}

export default function AuthRequiredView({
  title,
  description,
  callbackUrl = "/profilim",
  iconType = "user",
}: AuthRequiredViewProps) {
  const loginUrl = `/giris?callbackUrl=${encodeURIComponent(callbackUrl)}`;
  const registerUrl = `/kayit?callbackUrl=${encodeURIComponent(callbackUrl)}`;

  return (
    <div className="max-w-xl mx-auto px-4 py-16 md:py-24 text-center">
      <div className="bg-white rounded-3xl border border-gray-100/90 shadow-xl p-8 sm:p-12 relative overflow-hidden">
        {/* Üst Dekoratif Işıltı */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-1.5 bg-gradient-to-r from-transparent via-[#4A5D3E] to-transparent rounded-full opacity-80" />

        {/* İkon */}
        <div className="relative mx-auto mb-6">
          <div className="w-20 h-20 rounded-2xl bg-[#4A5D3E]/10 border border-[#4A5D3E]/20 flex items-center justify-center mx-auto text-[#4A5D3E] shadow-xs">
            {iconType === "heart" ? (
              <Heart size={36} className="fill-[#4A5D3E]/20" />
            ) : iconType === "order" ? (
              <Lock size={34} />
            ) : iconType === "cart" ? (
              <ShoppingBag size={34} />
            ) : (
              <User size={36} />
            )}
          </div>
        </div>

        {/* Başlık ve Açıklama */}
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-gray-900 mb-3 tracking-tight">
          {title}
        </h1>
        <p className="text-gray-500 text-sm leading-relaxed max-w-md mx-auto mb-8">
          {description}
        </p>

        {/* Butonlar */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center max-w-sm mx-auto">
          <Link
            href={loginUrl}
            className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-[#4A5D3E] hover:bg-[#3D4D33] text-white font-semibold text-sm transition-all shadow-md active:scale-98"
          >
            <LogIn size={16} />
            <span>Giriş Yap</span>
          </Link>
          <Link
            href={registerUrl}
            className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-gray-50 hover:bg-gray-100 text-gray-800 border border-gray-200 font-semibold text-sm transition-all active:scale-98"
          >
            <UserPlus size={16} />
            <span>Kayıt Ol</span>
          </Link>
        </div>

        {/* Güvenlik Rozeti */}
        <div className="mt-8 pt-6 border-t border-gray-100 flex items-center justify-center gap-2 text-xs text-gray-400">
          <ShieldCheck size={15} className="text-[#4A5D3E]" />
          <span>256-Bit SSL Güvenli Giriş ve Üyelik</span>
        </div>
      </div>
    </div>
  );
}
