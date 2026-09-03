import type { Metadata } from "next";
import Link from "next/link";
import { Lock, ShieldCheck, CreditCard, EyeOff } from "lucide-react";

export const metadata: Metadata = {
  title: "Gizlilik Sözleşmesi ve Güvenlik İlkeleri",
  description: "HAQAN Wear Gizlilik Politikası, veri güvenliği ve ödeme güvenliği ilkeleri.",
};

export default function PrivacyPage() {
  return (
    <main className="bg-[#FAF9F6] min-h-screen py-10 md:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8">
        
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-gray-500 mb-6">
          <Link href="/" className="hover:text-gray-900 transition-colors">Ana Sayfa</Link>
          <span>/</span>
          <span className="text-gray-900 font-semibold">Gizlilik Sözleşmesi</span>
        </nav>

        {/* Header */}
        <div className="bg-white rounded-3xl border border-gray-200/80 p-6 sm:p-10 shadow-xs mb-8">
          <div className="flex items-center gap-3 text-[#4A5D3E] mb-3">
            <Lock size={24} className="shrink-0" />
            <span className="text-xs uppercase tracking-widest font-bold">Güvenlik ve Gizlilik</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
            Gizlilik Sözleşmesi ve Güvenlik Politikası
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-2">
            www.haqanwear.com kullanıcılarının gizlilik, veri güvenliği ve ödeme güvencesi şartları
          </p>
        </div>

        {/* Content */}
        <div className="bg-white rounded-3xl border border-gray-200/80 p-6 sm:p-10 shadow-xs space-y-8 text-sm text-gray-700 leading-relaxed">
          
          <section className="space-y-3">
            <h2 className="font-serif text-lg sm:text-xl font-bold text-gray-900">
              1. Genel Gizlilik Esasları
            </h2>
            <p>
              <strong>HAQAN Wear (Veri Sorumlusu: Hakan Yeşildağ)</strong> olarak, internet sitemizi ziyaret eden tüm müşterilerimizin ve kullanıcılarımızın kişisel bilgilerinin gizliliğine ve güvenliğine en üst düzeyde önem vermekteyiz.
            </p>
            <p>
              Sitemize iletmiş olduğunuz ad, soyad, e-posta, telefon numarası ve adres gibi kişisel bilgiler, yalnızca siparişlerinizin hazırlanması, faturalandırılması ve teslimat süreçlerinin yürütülmesi amacıyla işlenir.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2">
              <CreditCard size={18} className="text-[#4A5D3E]" />
              2. Kredi Kartı ve Ödeme Güvenliği (iyzico Altyapısı)
            </h2>
            <p>
              HAQAN Wear internet sitesinde kredi kartı ve banka kartı ile yapılan tüm ödeme işlemleri, uluslararası güvenlik standartlarına (PCI-DSS Level 1) sahip lisanslı ödeme kuruluşu <strong>iyzi Ödeme ve Elektronik Para Hizmetleri A.Ş. (iyzico)</strong> altyapısı üzerinden gerçekleştirilmektedir.
            </p>
            <div className="bg-emerald-50/70 border border-emerald-200/60 rounded-2xl p-4 sm:p-5 space-y-2 text-xs sm:text-sm text-emerald-950">
              <p className="font-bold flex items-center gap-2 text-emerald-900">
                <ShieldCheck size={16} /> 256-Bit SSL Şifreleme ve 3D Secure
              </p>
              <p>
                Ödeme sayfamızda girilen kart bilgileri 256-bit SSL (Secure Sockets Layer) sertifikası ile şifrelenerek doğrudan bankaya ve iyzico sistemlerine iletilir. <strong>Kart numaranız, son kullanma tarihiniz ve CVV güvenlik kodunuz hiçbir şekilde HAQAN Wear veri tabanında saklanmaz ve şirket personeli tarafından görülemez.</strong>
              </p>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-lg sm:text-xl font-bold text-gray-900">
              3. Bilgilerin Üçüncü Şahıslarla Paylaşımı
            </h2>
            <p>
              Kullanıcılara ait kişisel veriler, yasal zorunluluklar ve siparişin teslimi (anlaşmalı kargo firmaları) haricinde hiçbir üçüncü şahıs veya kurumla ticari amaçla paylaşılmaz, satılmaz veya kiralanmaz.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-lg sm:text-xl font-bold text-gray-900">
              4. E-Posta ve SMS Bildirimleri
            </h2>
            <p>
              Sipariş onayları, kargo takip numaraları ve faturalar müşterinin kayıtlı e-posta adresine ve telefonuna otomatik olarak gönderilir. Kampanya ve duyuru bültenleri ise yalnızca müşterinin açık izni olması durumunda gönderilir. Müşteri dilediği an bülten üyeliğinden ayrılma hakkına sahiptir.
            </p>
          </section>

          <section className="space-y-3 pt-4 border-t border-gray-100">
            <h2 className="font-serif text-lg sm:text-xl font-bold text-gray-900">
              5. İletişim ve Şirket Bilgileri
            </h2>
            <div className="bg-gray-50 rounded-2xl p-5 border border-gray-200 text-xs sm:text-sm text-gray-800 space-y-1">
              <p><strong>Firma / Şahıs:</strong> Hakan Yeşildağ (HAQAN Wear)</p>
              <p><strong>Vergi Kimlik No:</strong> 9510670940 (23 Temmuz Vergi Dairesi)</p>
              <p><strong>Adres:</strong> Zülüflühan Mah. Eski İskenderun Yolu Cad. No: 55 B, Antakya / Hatay</p>
              <p><strong>E-posta:</strong> hakanyesildag91@gmail.com</p>
              <p><strong>Telefon:</strong> 0531 714 66 27</p>
            </div>
          </section>

        </div>
      </div>
    </main>
  );
}
