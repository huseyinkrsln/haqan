"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Heart, ShoppingBag, X, LogIn, UserPlus, ShieldCheck } from "lucide-react";

export type AuthPromptType = "wishlist" | "cart" | "general";

interface AuthPromptModalProps {
  isOpen: boolean;
  onClose: () => void;
  type?: AuthPromptType;
  title?: string;
  description?: string;
}

export default function AuthPromptModal({
  isOpen,
  onClose,
  type = "wishlist",
  title,
  description,
}: AuthPromptModalProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [currentUrl, setCurrentUrl] = useState("/");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const full = window.location.pathname + window.location.search;
      setCurrentUrl(full || "/");
    } else {
      const qs = searchParams?.toString();
      setCurrentUrl(pathname + (qs ? `?${qs}` : ""));
    }
  }, [pathname, searchParams, isOpen]);

  if (!isOpen) return null;

  const defaultTitle =
    type === "cart"
      ? "Sepete Eklemek İçin Giriş Yapın"
      : "Favorilere Eklemek İçin Giriş Yapın";

  const defaultDesc =
    type === "cart"
      ? "Siparişinizi tamamlamak, sepete eklediğiniz ürünleri hesabınızda saklamak ve özel indirimlerden faydalanmak için lütfen üye girişi yapınız."
      : "Beğendiğiniz tasarımları favori listenize kaydedip istediğiniz zaman kolayca ulaşabilmek için lütfen üye girişi yapınız.";

  const finalTitle = title || defaultTitle;
  const finalDesc = description || defaultDesc;

  const loginUrl = `/giris?callbackUrl=${encodeURIComponent(currentUrl)}`;
  const registerUrl = `/kayit?callbackUrl=${encodeURIComponent(currentUrl)}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="bg-white rounded-3xl border border-gray-100 shadow-2xl max-w-md w-full p-6 sm:p-8 relative animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Kapat Butonu */}
        <button
          onClick={onClose}
          aria-label="Kapat"
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 p-1.5 rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
        >
          <X size={18} />
        </button>

        {/* İkon */}
        <div
          className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-2xs ${
            type === "cart"
              ? "bg-[#4A5D3E]/10 border border-[#4A5D3E]/20 text-[#4A5D3E]"
              : "bg-rose-50 border border-rose-100 text-rose-600"
          }`}
        >
          {type === "cart" ? (
            <ShoppingBag size={30} />
          ) : (
            <Heart size={30} className="fill-rose-500/20" />
          )}
        </div>

        {/* Başlık ve Açıklama */}
        <div className="text-center mb-6">
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-gray-900 mb-2">
            {finalTitle}
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
            {finalDesc}
          </p>
        </div>

        {/* Butonlar (Kullanıcının Bulunduğu Sayfayı Aklında Tutar) */}
        <div className="flex flex-col gap-2.5">
          <Link
            href={loginUrl}
            onClick={onClose}
            className="w-full flex items-center justify-center gap-2 py-3.5 px-5 rounded-xl bg-[#4A5D3E] hover:bg-[#3D4D33] text-white font-semibold text-sm transition-all shadow-md active:scale-98 cursor-pointer"
          >
            <LogIn size={16} />
            <span>Giriş Yap</span>
          </Link>
          <Link
            href={registerUrl}
            onClick={onClose}
            className="w-full flex items-center justify-center gap-2 py-3.5 px-5 rounded-xl bg-gray-50 hover:bg-gray-100 text-gray-800 border border-gray-200 font-semibold text-sm transition-all active:scale-98 cursor-pointer"
          >
            <UserPlus size={16} />
            <span>Hesap Oluştur</span>
          </Link>
        </div>

        {/* Alt Bilgilendirme */}
        <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-center gap-1.5 text-[11px] text-gray-400">
          <ShieldCheck size={13} className="text-[#4A5D3E]" />
          <span>Giriş yaptıktan sonra kaldığınız sayfaya döneceksiniz.</span>
        </div>
      </div>
    </div>
  );
}
