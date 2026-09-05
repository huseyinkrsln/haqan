"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { Trash2, X, AlertTriangle, Sparkles } from "lucide-react";
import { formatPrice, getMinioUrl } from "@/lib/utils";

export interface DeleteConfirmTarget {
  type: "outfit" | "item";
  id: number | string;
  title: string;
  image?: string;
  price?: number;
  quantity?: number;
  itemCount?: number;
  size?: string;
  color?: string;
  itemRef?: any;
}

interface CartDeleteConfirmModalProps {
  isOpen: boolean;
  target: DeleteConfirmTarget | null;
  onClose: () => void;
  onConfirm: () => void;
}

export default function CartDeleteConfirmModal({
  isOpen,
  target,
  onClose,
  onConfirm,
}: CartDeleteConfirmModalProps) {
  // ESC tuşu ile kapatma & body scroll kilitleme
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !target) return null;

  const imageUrl = getMinioUrl(target.image);
  const isOutfit = target.type === "outfit";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl border border-gray-100 shadow-2xl max-w-md w-full p-6 sm:p-7 relative animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Kapat Butonu */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
          aria-label="Kapat"
        >
          <X size={18} />
        </button>

        {/* İkon */}
        <div className="w-13 h-13 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center mx-auto mb-4 border border-red-100/80 shadow-2xs">
          <Trash2 size={24} className="stroke-[2.2]" />
        </div>

        {/* Başlık ve Açıklama */}
        <div className="text-center mb-5">
          <h3 className="font-serif font-bold text-xl text-gray-900">
            {isOutfit ? "Kombin Paketini Sepetten Çıkar" : "Ürünü Sepetten Çıkar"}
          </h3>
          <p className="text-xs sm:text-sm text-gray-500 mt-1.5 leading-relaxed">
            {isOutfit
              ? `"${target.title}" kombin paketini sepetinizden kaldırmak istediğinize emin misiniz?`
              : `"${target.title}" ürününü sepetinizden kaldırmak istediğinize emin misiniz?`}
          </p>
        </div>

        {/* Ürün / Kombin Önizleme Kutusu */}
        <div className="bg-[#FAF9F6] rounded-2xl p-3.5 border border-gray-200/80 flex items-center gap-3.5 mb-6">
          <div className="relative w-14 h-16 shrink-0 rounded-xl overflow-hidden bg-white border border-gray-200/80 flex items-center justify-center">
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt={target.title}
                fill
                className="object-cover"
                sizes="64px"
              />
            ) : (
              <span className="font-serif text-xs font-bold text-gray-400">HQ</span>
            )}
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5 mb-0.5">
              {isOutfit ? (
                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#4A5D3E] bg-[#4A5D3E]/10 border border-[#4A5D3E]/20 px-2 py-0.2 rounded-full">
                  <Sparkles size={10} className="text-amber-500" />
                  Kombin Seti
                </span>
              ) : null}
              {target.itemCount ? (
                <span className="text-[10px] text-gray-400 font-medium">
                  {target.itemCount} Parça
                </span>
              ) : null}
            </div>

            <h4 className="font-semibold text-sm text-gray-900 truncate">
              {target.title}
            </h4>

            <div className="flex items-center gap-2 mt-0.5 text-xs text-gray-500">
              {target.size && <span>Beden: {target.size}</span>}
              {target.size && target.color && <span>•</span>}
              {target.color && <span>Renk: {target.color}</span>}
            </div>

            {target.price !== undefined && (
              <p className="font-bold text-gray-900 text-sm mt-1">
                {formatPrice(target.price * (target.quantity || 1))}
              </p>
            )}
          </div>
        </div>

        {/* Aksiyon Butonları */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-3 px-4 rounded-xl border border-gray-200 text-gray-700 font-semibold text-sm hover:bg-gray-50 transition-colors cursor-pointer"
          >
            Vazgeç
          </button>
          <button
            type="button"
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="flex-1 py-3 px-4 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold text-sm transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer active:scale-98"
          >
            <Trash2 size={16} />
            Sepetten Kaldır
          </button>
        </div>
      </div>
    </div>
  );
}
