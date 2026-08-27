"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { X, Sparkles, ArrowRight } from "lucide-react";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { getMinioUrl } from "@/lib/utils";

export default function PromoPopupModal() {
  const { data: settings } = useSiteSettings();
  const [isOpen, setIsOpen] = useState(false);

  const isActive = (settings?.popupisactive || settings?.popupIsActive) === "true";
  const title = settings?.popuptitle || settings?.popupTitle;
  const description = settings?.popupdescription || settings?.popupDescription;
  const imageUrl = settings?.popupimageurl || settings?.popupImageUrl;
  const buttonText = settings?.popupbuttontext || settings?.popupButtonText;
  const buttonUrl = settings?.popupbuttonurl || settings?.popupButtonUrl || "/";

  useEffect(() => {
    if (!isActive) return;

    // Pop-up içeriği yoksa açma
    if (!title && !description && !imageUrl) return;

    // Kullanıcı bu oturumda daha önce kapattıysa tekrar açma
    const hasSeen = sessionStorage.getItem("haqan_promo_popup_seen");
    if (!hasSeen) {
      // Sayfa yüklendikten 800ms sonra yumuşak bir açılış yap
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [isActive, title, description, imageUrl]);

  const handleClose = () => {
    setIsOpen(false);
    sessionStorage.setItem("haqan_promo_popup_seen", "true");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-300">
      {/* Koyu Arka Plan (Backdrop) */}
      <div
        onClick={handleClose}
        className="fixed inset-0 bg-black/65 backdrop-blur-xs transition-opacity"
      />

      {/* Pop-up Kartı */}
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden z-10 animate-in zoom-in-95 duration-300 border border-gray-100 flex flex-col">
        {/* Kapat Butonu */}
        <button
          onClick={handleClose}
          aria-label="Kapat"
          className="absolute top-3.5 right-3.5 z-20 h-8 w-8 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center backdrop-blur-sm transition-all hover:scale-105 active:scale-95 shadow-md"
        >
          <X size={16} />
        </button>

        {/* Görsel Alanı (MinIO) */}
        {imageUrl && (
          <div className="w-full max-h-[320px] bg-zinc-950 overflow-hidden relative">
            <img
              src={getMinioUrl(imageUrl)}
              alt={title || "Duyuru"}
              className="w-full h-full object-cover max-h-[320px]"
            />
          </div>
        )}

        {/* Metin & Buton Alanı */}
        {(title || description || buttonText) && (
          <div className="p-6 sm:p-8 text-center space-y-3.5 bg-white">
            {title && (
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-zinc-900 leading-tight">
                {title}
              </h3>
            )}

            {description && (
              <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed max-w-md mx-auto">
                {description}
              </p>
            )}

            {buttonText && (
              <div className="pt-2">
                <Link
                  href={buttonUrl}
                  onClick={handleClose}
                  className="inline-flex items-center justify-center gap-2 bg-[#4A5D3E] hover:bg-[#3D4D33] text-white text-xs sm:text-sm font-semibold px-7 py-3 rounded-xl transition-all shadow-md hover:shadow-lg hover:scale-102 active:scale-98 group"
                >
                  <span>{buttonText}</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
