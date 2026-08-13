import Link from "next/link";
import { ArrowRight, Package } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sipariş Başarılı",
};

export default function BasariliPage() {
  const orderNumber = `HQ${Math.floor(Math.random() * 900000 + 100000)}`;

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full text-center">
        {/* Animated checkmark */}
        <div className="w-24 h-24 rounded-full bg-[#4A5D3E]/10 flex items-center justify-center mx-auto mb-8">
          <svg
            viewBox="0 0 52 52"
            className="w-12 h-12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="26"
              cy="26"
              r="24"
              stroke="#4A5D3E"
              strokeWidth="2"
              className="opacity-30"
            />
            <path
              d="M14.5 26.5L22 34L37.5 18"
              stroke="#4A5D3E"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="animate-check"
            />
          </svg>
        </div>

        <h1 className="font-serif text-3xl font-bold text-gray-900 mb-3">
          Sipariş Başarılı! 🎉
        </h1>
        <p className="text-gray-500 mb-6 text-sm leading-relaxed">
          Siparişiniz alındı ve hazırlanmaya başlandı. Takip bilgileriniz
          kayıtlı e-posta adresinize gönderilecektir.
        </p>

        {/* Order info card */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-card p-6 mb-8 text-left space-y-3">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-[#4A5D3E]/10 flex items-center justify-center">
              <Package size={18} className="text-[#4A5D3E]" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Sipariş Numarası</p>
              <p className="font-bold text-gray-900 tracking-wider">{orderNumber}</p>
            </div>
          </div>
          <div className="flex justify-between text-sm border-t border-gray-50 pt-3">
            <span className="text-gray-500">Tahmini Teslimat</span>
            <span className="font-semibold text-gray-900">2-4 İş Günü</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Sipariş Durumu</span>
            <span className="font-semibold text-[#4A5D3E]">Hazırlanıyor</span>
          </div>
        </div>

        {/* CTAs */}
        <div className="flex flex-col gap-3">
          <Link
            href="/"
            className="flex items-center justify-center gap-2 bg-[#4A5D3E] hover:bg-[#3A4B30] text-white font-semibold py-3.5 rounded-xl transition-colors text-sm"
          >
            Alışverişe Devam Et <ArrowRight size={16} />
          </Link>
          <Link
            href="/profilim"
            className="flex items-center justify-center gap-2 border border-gray-200 hover:border-[#4A5D3E] hover:text-[#4A5D3E] text-gray-700 font-medium py-3.5 rounded-xl transition-colors text-sm"
          >
            Siparişlerimi Görüntüle
          </Link>
        </div>
      </div>
    </div>
  );
}
