import Link from "next/link";
import { ArrowRight, Mail, Lock } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Giriş Yap",
};

export default function LoginPage() {
  const inputCls =
    "w-full border border-gray-200 rounded-xl pl-10 pr-4 py-3.5 text-sm outline-none focus:border-[#4A5D3E] transition-colors bg-white placeholder:text-gray-400";
  const labelCls = "block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide";

  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="font-serif text-3xl font-bold text-gray-900 mb-2">
            Giriş Yap
          </h1>
          <p className="text-sm text-gray-500">
            HAQAN WEAR dünyasına hoş geldiniz.
          </p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-card p-6 md:p-8 space-y-6">
          <div className="space-y-4">
            <div>
              <label className={labelCls}>E-posta Adresi</label>
              <div className="relative">
                <input
                  type="email"
                  placeholder="ornek@email.com"
                  className={inputCls}
                />
                <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-0">
                  Şifre
                </label>
                <Link href="#" className="text-xs text-[#4A5D3E] font-medium hover:underline">
                  Şifremi unuttum
                </Link>
              </div>
              <div className="relative">
                <input
                  type="password"
                  placeholder="••••••••"
                  className={inputCls}
                />
                <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>
            </div>
          </div>

          <Link
            href="/profilim"
            className="w-full flex items-center justify-center gap-2 bg-[#4A5D3E] hover:bg-[#3A4B30] text-white font-semibold py-3.5 rounded-xl transition-colors text-sm tracking-wider mt-2"
          >
            GİRİŞ YAP <ArrowRight size={16} />
          </Link>

          <div className="text-center text-sm text-gray-500 pt-4 border-t border-gray-100">
            Hesabınız yok mu?{" "}
            <Link href="/kayit" className="text-[#4A5D3E] font-semibold hover:underline">
              Hemen kayıt olun
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
