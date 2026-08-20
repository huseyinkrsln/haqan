"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { ArrowRight, Mail, Lock, User, Phone, Loader2, AlertCircle } from "lucide-react";
import { axiosInstance } from "@/lib/axios";

export default function SignupPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/profilim";

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
  });
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!termsAccepted) {
      setError("Lütfen üyelik sözleşmesini kabul ediniz.");
      return;
    }

    if (!formData.firstName.trim() || !formData.lastName.trim() || !formData.email.trim() || !formData.password.trim()) {
      setError("Lütfen zorunlu alanları doldurunuz.");
      return;
    }

    setError("");
    setIsLoading(true);

    try {
      // Backend kayıt çağrısı
      const registerRes = await axiosInstance.post("/api/v1/auth/register", {
        fullName: `${formData.firstName.trim()} ${formData.lastName.trim()}`,
        email: formData.email.trim(),
        mobilePhones: formData.phone.trim() || undefined,
        password: formData.password.trim(),
      });

      if (registerRes.data?.success || registerRes.status === 200) {
        // Otomatik giriş yap
        const loginRes = await signIn("credentials", {
          redirect: false,
          email: formData.email.trim(),
          password: formData.password.trim(),
        });

        if (loginRes?.ok) {
          router.push(callbackUrl);
          router.refresh();
        } else {
          router.push(`/giris?callbackUrl=${encodeURIComponent(callbackUrl)}`);
        }
      } else {
        setError(registerRes.data?.message || "Kayıt işlemi gerçekleştirilemedi.");
      }
    } catch (err: any) {
      const msg =
        err.response?.data?.message ||
        err.response?.data?.Message ||
        (typeof err.response?.data === "string" ? err.response?.data : null) ||
        "Kayıt olurken bir hata oluştu. Bu e-posta adresi zaten kullanımda olabilir.";
      setError(msg);
    } finally {
      setIsLoading(false);
    }
  };

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
            HAQAN WEAR ayrıcalıklarından ve yeniliklerden ilk siz haberdar olun.
          </p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-card p-6 md:p-8 space-y-6">
          {error && (
            <div className="flex items-center gap-2 p-3 rounded-xl bg-red-50 text-red-600 text-xs font-medium border border-red-100">
              <AlertCircle size={15} className="shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={labelCls}>Ad *</label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    placeholder="Adınız"
                    className={inputCls}
                  />
                  <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                </div>
              </div>
              <div>
                <label className={labelCls}>Soyad *</label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    placeholder="Soyadınız"
                    className={inputCls}
                  />
                  <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className={labelCls}>E-posta Adresi *</label>
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
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
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="05XX XXX XX XX"
                    className={inputCls}
                  />
                  <Phone size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                </div>
              </div>

              <div>
                <label className={labelCls}>Şifre *</label>
                <div className="relative">
                  <input
                    type="password"
                    required
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    placeholder="En az 6 karakter"
                    className={inputCls}
                  />
                  <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3 pt-2">
              <input
                type="checkbox"
                id="terms"
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
                className="mt-1 w-4 h-4 text-[#4A5D3E] border-gray-300 rounded focus:ring-[#4A5D3E]"
              />
              <label htmlFor="terms" className="text-xs text-gray-500 leading-relaxed cursor-pointer">
                <span className="text-[#4A5D3E] font-medium">Üyelik Sözleşmesi</span>&apos;ni ve{" "}
                <span className="text-[#4A5D3E] font-medium">Kişisel Verilerin Korunması Metni</span>&apos;ni
                okudum ve kabul ediyorum.
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 bg-[#4A5D3E] hover:bg-[#3A4B30] text-white font-semibold py-3.5 rounded-xl transition-colors text-sm tracking-wider shadow-md mt-4 disabled:opacity-60"
            >
              {isLoading ? (
                <>
                  <Loader2 size={16} className="animate-spin" /> Kayıt Yapılıyor...
                </>
              ) : (
                <>
                  KAYIT OL <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>

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
