import Link from "next/link";
import { ArrowRight, Mail, Lock, User, Phone } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kayıt Ol",
};

export default function SignupPage() {
  const inputCls =
    "w-full border border-gray-200 rounded-xl pl-10 pr-4 py-3.5 text-sm outline-none focus:border-[#4A5D3E] transition-colors bg-white placeholder:text-gray-400";
  const labelCls = "block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide";

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg">
        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="font-serif text-3xl font-bold text-gray-900 mb-2">
            Hesap Oluştur
          </h1>
          <p className="text-sm text-gray-500">
            Fırsatlardan ve yeniliklerden ilk siz haberdar olun.
          </p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-card p-6 md:p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Ad</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Adınız"
                  className={inputCls}
                />
                <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>
            </div>
            <div>
              <label className={labelCls}>Soyad</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Soyadınız"
                  className={inputCls}
                />
                <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>
            </div>
          </div>

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
              <label className={labelCls}>Telefon</label>
              <div className="relative">
                <input
                  type="tel"
                  placeholder="05XX XXX XX XX"
                  className={inputCls}
                />
                <Phone size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>
            </div>

            <div>
              <label className={labelCls}>Şifre</label>
              <div className="relative">
                <input
                  type="password"
                  placeholder="En az 8 karakter"
                  className={inputCls}
                />
                <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3 mt-4">
            <input
              type="checkbox"
              id="terms"
              className="mt-1 w-4 h-4 text-[#4A5D3E] border-gray-300 rounded focus:ring-[#4A5D3E]"
            />
            <label htmlFor="terms" className="text-xs text-gray-500 leading-relaxed">
              <Link href="#" className="text-[#4A5D3E] hover:underline font-medium">Üyelik Sözleşmesi</Link>'ni ve{" "}
              <Link href="#" className="text-[#4A5D3E] hover:underline font-medium">Kişisel Verilerin Korunması Metni</Link>'ni
              okudum ve kabul ediyorum.
            </label>
          </div>

          <Link
            href="/profilim"
            className="w-full flex items-center justify-center gap-2 bg-[#4A5D3E] hover:bg-[#3A4B30] text-white font-semibold py-3.5 rounded-xl transition-colors text-sm tracking-wider mt-2"
          >
            KAYIT OL <ArrowRight size={16} />
          </Link>

          <div className="text-center text-sm text-gray-500 pt-4 border-t border-gray-100">
            Zaten hesabınız var mı?{" "}
            <Link href="/giris" className="text-[#4A5D3E] font-semibold hover:underline">
              Giriş Yapın
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
