import type { Metadata } from "next";
import Link from "next/link";
import { Cookie, ShieldCheck, Sliders, Info } from "lucide-react";

export const metadata: Metadata = {
  title: "Çerez Politikası",
  description: "HAQAN Wear internet sitesinde kullanılan çerez türleri ve çerez yönetimi hakkında bilgilendirme.",
};

export default function CookiesPage() {
  return (
    <main className="bg-[#FAF9F6] min-h-screen py-10 md:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8">
        
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-gray-500 mb-6">
          <Link href="/" className="hover:text-gray-900 transition-colors">Ana Sayfa</Link>
          <span>/</span>
          <span className="text-gray-900 font-semibold">Çerez Politikası</span>
        </nav>

        {/* Header */}
        <div className="bg-white rounded-3xl border border-gray-200/80 p-6 sm:p-10 shadow-xs mb-8">
          <div className="flex items-center gap-3 text-[#4A5D3E] mb-3">
            <Cookie size={24} className="shrink-0" />
            <span className="text-xs uppercase tracking-widest font-bold">Çerezler ve Teknolojiler</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
            HAQAN Wear Çerez Politikası
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-2">
            İnternet sitemizde kullanılan çerezler ve tercihlerinizi nasıl yönetebileceğiniz hakkında detaylı bilgilendirme
          </p>
        </div>

        {/* Content */}
        <div className="bg-white rounded-3xl border border-gray-200/80 p-6 sm:p-10 shadow-xs space-y-8 text-sm text-gray-700 leading-relaxed">
          
          <section className="space-y-3">
            <h2 className="font-serif text-lg sm:text-xl font-bold text-gray-900">
              1. Çerez (Cookie) Nedir?
            </h2>
            <p>
              Çerezler, bir internet sitesini ziyaret ettiğinizde tarayıcınız aracılığıyla cihazınıza (bilgisayar, tablet veya akıllı telefon) kaydedilen küçük metin dosyalarıdır. Çerezler, web sitesinin verimli çalışmasını sağlamak, kullanıcı deneyimini iyileştirmek ve tercihlerinizi hatırlamak amacıyla kullanılır.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-serif text-lg sm:text-xl font-bold text-gray-900">
              2. Sitemizde Kullanılan Çerez Türleri
            </h2>
            
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200/80">
                <h3 className="font-bold text-gray-900 flex items-center gap-2 mb-1">
                  <ShieldCheck size={16} className="text-[#4A5D3E]" />
                  a. Zorunlu Çerezler
                </h3>
                <p className="text-xs sm:text-sm text-gray-600">
                  Sitenin temel işlevlerini yerine getirebilmesi için kesinlikle gereklidir. Sepete ürün ekleme, güvenli oturum açma, form doldurma ve ödeme adımlarının tamamlanması bu çerezler sayesinde gerçekleşir. Devre dışı bırakılamazlar.
                </p>
              </div>

              <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200/80">
                <h3 className="font-bold text-gray-900 flex items-center gap-2 mb-1">
                  <Sliders size={16} className="text-[#4A5D3E]" />
                  b. Tercih ve İşlevsellik Çerezleri
                </h3>
                <p className="text-xs sm:text-sm text-gray-600">
                  Ziyaretçilerin dil seçimi, tema tercihleri, beden filtreleri veya daha önce incelediği ürünlerin hatırlanmasını sağlayarak kişiselleştirilmiş bir alışveriş deneyimi sunar.
                </p>
              </div>

              <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200/80">
                <h3 className="font-bold text-gray-900 flex items-center gap-2 mb-1">
                  <Info size={16} className="text-[#4A5D3E]" />
                  c. Performans ve Analitik Çerezleri
                </h3>
                <p className="text-xs sm:text-sm text-gray-600">
                  Sitemizin hangi sayfalarının daha çok ziyaret edildiğini, ziyaretçi sayısını ve olası teknik hataları tespit etmek amacıyla anonim olarak istatistiksel veri toplar.
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-lg sm:text-xl font-bold text-gray-900">
              3. Çerezleri Nasıl Yönetebilir veya Kapatabilirsiniz?
            </h2>
            <p>
              Kullandığınız internet tarayıcısının ayarlarından çerez tercihlerinizi dilediğiniz zaman değiştirebilir, mevcut çerezleri silebilir veya çerez kullanımını tamamen engelleyebilirsiniz.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs text-center">
              <div className="p-3 bg-gray-50 rounded-xl border border-gray-200">Google Chrome</div>
              <div className="p-3 bg-gray-50 rounded-xl border border-gray-200">Apple Safari</div>
              <div className="p-3 bg-gray-50 rounded-xl border border-gray-200">Mozilla Firefox</div>
              <div className="p-3 bg-gray-50 rounded-xl border border-gray-200">Microsoft Edge</div>
            </div>
            <p className="text-xs text-gray-500">
              * Zorunlu çerezlerin kapatılması durumunda sepet ve ödeme işlemleri gibi bazı temel özellikler düzgün çalışmayabilir.
            </p>
          </section>

          <section className="space-y-3 pt-4 border-t border-gray-100">
            <h2 className="font-serif text-lg sm:text-xl font-bold text-gray-900">
              4. İletişim
            </h2>
            <p>
              Çerez politikamız veya kişisel verilerinizle ilgili her türlü soru için <a href="mailto:hakanyesildag91@gmail.com" className="text-[#4A5D3E] font-semibold hover:underline">hakanyesildag91@gmail.com</a> adresinden veya <Link href="/contact" className="text-[#4A5D3E] font-semibold hover:underline">İletişim sayfamızdan</Link> bize ulaşabilirsiniz.
            </p>
          </section>

        </div>
      </div>
    </main>
  );
}
