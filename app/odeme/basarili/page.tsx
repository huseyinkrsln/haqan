import Link from "next/link";
import { ArrowRight, Package, Check } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sipariş Başarılı",
};

export default function BasariliPage() {
  const orderNumber = `HQ${Math.floor(Math.random() * 900000 + 100000)}`;

  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-16 bg-[#FAF9F6]">
      <div className="max-w-md w-full text-center">
        
        {/* Lüks Onay Müjdesi */}
        <div className="w-20 h-20 rounded-full bg-[#4A5D3E] text-white flex items-center justify-center mx-auto mb-6 shadow-xl ring-8 ring-[#4A5D3E]/15">
          <Check size={36} className="stroke-[3] animate-in zoom-in-75 duration-300" />
        </div>

        <span className="text-[10px] uppercase tracking-[0.3em] text-[#4A5D3E] font-bold block mb-1">
          HAQAN WEAR
        </span>
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
          Siparişiniz Alındı! 🎉
        </h1>
        <p className="text-gray-500 mb-8 text-xs sm:text-sm leading-relaxed max-w-sm mx-auto">
          HAQAN Wear'ı tercih ettiğiniz için teşekkür ederiz. Siparişiniz hazırlanmaya başlandı ve takip bilgileriniz e-posta adresinize iletilecektir.
        </p>

        {/* Order info card */}
        <div className="bg-white rounded-3xl border border-gray-200/80 shadow-xs p-6 mb-8 text-left space-y-3.5">
          <div className="flex items-center gap-3 pb-3 border-b border-gray-100">
            <div className="w-10 h-10 rounded-xl bg-[#4A5D3E]/10 flex items-center justify-center text-[#4A5D3E]">
              <Package size={20} />
            </div>
            <div>
              <p className="text-xs text-gray-400 font-medium">Sipariş Numarası</p>
              <p className="font-bold text-gray-900 tracking-wider text-sm">{orderNumber}</p>
            </div>
          </div>
          <div className="flex justify-between text-xs sm:text-sm">
            <span className="text-gray-500">Tahmini Teslimat</span>
            <span className="font-semibold text-gray-900">2-4 İş Günü</span>
          </div>
          <div className="flex justify-between text-xs sm:text-sm">
            <span className="text-gray-500">Sipariş Durumu</span>
            <span className="font-bold text-[#4A5D3E] flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#4A5D3E] animate-pulse" /> Hazırlanıyor
            </span>
          </div>
        </div>

        {/* CTAs */}
        <div className="flex flex-col gap-3">
          <Link
            href="/"
            className="flex items-center justify-center gap-2 bg-gray-900 hover:bg-black text-white font-semibold py-3.5 rounded-2xl transition-all text-xs uppercase tracking-wider shadow-sm"
          >
            Alışverişe Devam Et <ArrowRight size={15} />
          </Link>
          <Link
            href="/profilim"
            className="flex items-center justify-center gap-2 border border-gray-200 hover:border-gray-900 text-gray-700 font-semibold py-3.5 rounded-2xl transition-all text-xs uppercase tracking-wider bg-white"
          >
            Siparişlerimi Görüntüle
          </Link>
        </div>
      </div>
    </div>
  );
}
