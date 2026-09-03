"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Cookie, X, ShieldCheck } from "lucide-react";

export default function CookieConsentBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Kullanıcı daha önce onay verdiyse gösterme
    const consent = localStorage.getItem("haqan_cookie_consent");
    if (!consent) {
      const timer = setTimeout(() => setShow(true), 800);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("haqan_cookie_consent", "necessary_acknowledged");
    setShow(false);
  };

  const handleDismiss = () => {
    setShow(false);
  };

  if (!show) return null;

  return (
    <div
      role="dialog"
      aria-label="Çerez Bilgilendirmesi"
      className="fixed bottom-[76px] sm:bottom-6 left-4 right-4 sm:left-6 sm:right-auto sm:max-w-md z-50 bg-white/95 backdrop-blur-md border border-gray-200/90 rounded-2xl sm:rounded-3xl shadow-[0_12px_36px_rgba(0,0,0,0.15)] p-4 sm:p-5 animate-in fade-in slide-in-from-bottom-5 duration-300"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2 text-[#4A5D3E]">
          <div className="w-8 h-8 rounded-xl bg-[#4A5D3E]/10 flex items-center justify-center shrink-0">
            <Cookie size={18} />
          </div>
          <span className="text-xs font-bold uppercase tracking-wider text-gray-900">
            Zorunlu Çerez Bilgilendirmesi
          </span>
        </div>
        <button
          onClick={handleDismiss}
          aria-label="Şimdilik Kapat"
          title="Şimdilik Kapat"
          className="text-gray-400 hover:text-gray-700 p-1 rounded-full transition-colors cursor-pointer"
        >
          <X size={15} />
        </button>
      </div>

      <p className="text-xs text-gray-600 mt-2.5 leading-relaxed">
        Sitemizde yalnızca alışveriş sepetinizin korunması, kullanıcı oturumunuz ve ödeme güvenliğinin sağlanması amacıyla <strong>zorunlu teknik çerezler</strong> kullanılmaktadır. Sitemizde reklam, profil çıkarma veya pazarlama amaçlı izleme çerezi <strong>kullanılmamaktadır</strong>. Detaylı bilgi için{" "}
        <Link
          href="/cookies"
          className="text-gray-900 font-semibold underline hover:text-[#4A5D3E] transition-colors"
        >
          Çerez Politikası
        </Link>
        {" ve "}
        <Link
          href="/kvkk"
          className="text-gray-900 font-semibold underline hover:text-[#4A5D3E] transition-colors"
        >
          KVKK Aydınlatma Metni
        </Link>
        'ni inceleyebilirsiniz.
      </p>

      <div className="flex items-center gap-2 mt-4 pt-1">
        <button
          onClick={handleAccept}
          className="flex-1 bg-gray-900 hover:bg-black text-white text-xs font-semibold py-2.5 px-3 rounded-xl transition-all shadow-xs cursor-pointer text-center"
        >
          Anladım / Kabul Et
        </button>
        <Link
          href="/cookies"
          className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold py-2.5 px-3 rounded-xl transition-all border border-gray-200 cursor-pointer text-center"
        >
          Çerezleri İncele
        </Link>
      </div>
    </div>
  );
}
