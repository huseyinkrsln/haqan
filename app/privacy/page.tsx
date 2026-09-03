import type { Metadata } from "next";
import Link from "next/link";
import { Lock, ShieldCheck, CreditCard, Server, Globe, UserCheck, EyeOff, FileText } from "lucide-react";

export const metadata: Metadata = {
  title: "Gizlilik Politikası",
  description: "HAQAN Wear Gizlilik Politikası, kişisel verilerin korunması, ödeme güvenliği ve teknik altyapı ilkeleri.",
};

export default function PrivacyPage() {
  return (
    <main className="bg-[#FAF9F6] min-h-screen py-10 md:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8">
        
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-gray-500 mb-6">
          <Link href="/" className="hover:text-gray-900 transition-colors">Ana Sayfa</Link>
          <span>/</span>
          <span className="text-gray-900 font-semibold">Gizlilik Politikası</span>
        </nav>

        {/* Header */}
        <div className="bg-white rounded-3xl border border-gray-200/80 p-6 sm:p-10 shadow-xs mb-8">
          <div className="flex items-center gap-3 text-[#4A5D3E] mb-3">
            <Lock size={24} className="shrink-0" />
            <span className="text-xs uppercase tracking-widest font-bold">Veri Güvenliği & Gizlilik</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
            HAQAN WEAR GİZLİLİK POLİTİKASI
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-2">
            Son Güncelleme Tarihi: 3 Eylül 2026 — 6698 Sayılı KVKK Kapsamında
          </p>
        </div>

        {/* Content */}
        <div className="bg-white rounded-3xl border border-gray-200/80 p-6 sm:p-10 shadow-xs space-y-8 text-sm text-gray-700 leading-relaxed">
          
          <p className="text-xs sm:text-sm text-gray-600 bg-gray-50 p-4 rounded-2xl border border-gray-200/60">
            İşbu Gizlilik Politikası, Hakan Yeşildağ tarafından HAQAN Wear markası altında işletilen www.haqanwear.com internet sitesini ziyaret eden, kullanıcı hesabı oluşturan veya site üzerinden alışveriş yapan kişilerin bilgilerinin hangi amaçlarla işlendiğini, hangi durumlarda üçüncü taraf hizmet sağlayıcılarla paylaşıldığını ve kişisel verilerin korunmasına ilişkin esasları açıklar. Ayrıntılı hukuki bilgilendirme için <Link href="/kvkk" className="text-[#4A5D3E] underline font-medium">KVKK Aydınlatma Metni</Link> geçerlidir.
          </p>

          {/* 1. VERİ SORUMLUSU */}
          <section className="space-y-3">
            <h2 className="font-serif text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#4A5D3E]/10 text-[#4A5D3E] text-xs flex items-center justify-center font-sans font-bold">1</span>
              Veri Sorumlusu
            </h2>
            <div className="bg-gray-50 border border-gray-200/70 rounded-2xl p-4 sm:p-5 text-xs sm:text-sm space-y-1.5 text-gray-800">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <p><strong>Veri Sorumlusu:</strong> Hakan Yeşildağ</p>
                <p><strong>Marka:</strong> HAQAN Wear</p>
                <p><strong>Vergi Kimlik No:</strong> 9510670940</p>
                <p><strong>Vergi Dairesi:</strong> 23 Temmuz Vergi Dairesi</p>
                <p className="sm:col-span-2"><strong>Adres:</strong> Zülüflühan Mah. Eski İskenderun Yolu Cad. No: 55 B, Antakya / Hatay</p>
                <p><strong>Telefon:</strong> 0531 714 66 27</p>
                <p><strong>E-posta:</strong> hakanyesildag91@gmail.com</p>
                <p className="sm:col-span-2"><strong>İnternet Sitesi:</strong> www.haqanwear.com</p>
              </div>
            </div>
          </section>

          {/* 2. POLİTİKANIN KAPSAMI */}
          <section className="space-y-3">
            <h2 className="font-serif text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#4A5D3E]/10 text-[#4A5D3E] text-xs flex items-center justify-center font-sans font-bold">2</span>
              Politikanın Kapsamı
            </h2>
            <p>
              İşbu Gizlilik Politikası; web sitesinin kullanılması, üyelik, sipariş oluşturma, iyzico ödeme süreçleri, faturalandırma, kargo/teslimat, iptal/iade/değişim süreçleri, müşteri hizmetleri ve sistem güvenliğinin sağlanması kapsamında gerçekleştirilen veri işleme faaliyetlerine uygulanır.
            </p>
          </section>

          {/* 3. İŞLENEN KİŞİSEL VERİLER */}
          <section className="space-y-3">
            <h2 className="font-serif text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#4A5D3E]/10 text-[#4A5D3E] text-xs flex items-center justify-center font-sans font-bold">3</span>
              İşlenen Kişisel Veriler
            </h2>
            <ul className="list-disc pl-5 space-y-1.5 text-gray-600">
              <li><strong>Kimlik Bilgileri:</strong> Ad, soyad ve yasal faturalandırma için gerekli vergi/kimlik bilgileri.</li>
              <li><strong>İletişim Bilgileri:</strong> Telefon numarası, e-posta adresi, teslimat ve fatura adresi.</li>
              <li><strong>Sipariş ve İşlem Bilgileri:</strong> Sipariş no, tarih, ürün, beden, renk, adet, tutar, kargo ve iade kayıtları.</li>
              <li><strong>Ödeme Bilgileri:</strong> Ödeme yöntemi, durumu ve iade bilgileri (Elektronik kart ödemeleri iyzico altyapısı üzerinden işlenir).</li>
              <li><strong>İşlem Güvenliği ve Teknik Bilgiler:</strong> IP adresi, oturum bilgileri, sistem ve güvenlik logları.</li>
              <li><strong>Müşteri İletişim Bilgileri:</strong> Destek mesajları, talep, iptal, iade ve şikâyet kayıtları.</li>
              <li><strong>Ticari Elektronik İleti Bilgileri:</strong> SMS ve e-posta onay/ret tercih kayıtları.</li>
            </ul>
          </section>

          {/* 4. KİŞİSEL VERİLERİN İŞLENME AMAÇLARI */}
          <section className="space-y-3">
            <h2 className="font-serif text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#4A5D3E]/10 text-[#4A5D3E] text-xs flex items-center justify-center font-sans font-bold">4</span>
              Kişisel Verilerin İşlenme Amaçları
            </h2>
            <p>
              Kişisel veriler; siparişlerin hazırlanması, sözleşmenin kurulması, ödemelerin tahsili, faturalandırma, kargo teslimatı, iade/değişim süreçleri, müşteri desteği ve güvenlik yükümlülüklerinin yerine getirilmesi amacıyla işlenir. HAQAN Wear, verileri toplanma amaçları dışında kullanmaz.
            </p>
          </section>

          {/* 5. T.C. KİMLİK NUMARASININ İŞLENMESİ GÜVENCESİ */}
          <section className="space-y-3">
            <h2 className="font-serif text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#4A5D3E]/10 text-[#4A5D3E] text-xs flex items-center justify-center font-sans font-bold">5</span>
              T.C. Kimlik Numarasının İşlenmesi Güvencesi
            </h2>
            <p>
              T.C. Kimlik Numarası yalnızca yasal faturalandırma ve mali mevzuat yükümlülüklerinin gerektirdiği durumlarda işlenir.
            </p>
            <div className="bg-amber-50/80 border border-amber-200/70 rounded-2xl p-4 text-xs sm:text-sm text-amber-950 space-y-1">
              <p className="font-bold text-amber-900">Özel Gizlilik Taahhüdü:</p>
              <p>
                T.C. Kimlik Numarası; reklam, pazarlama, kullanıcı profilleme, SMS/E-posta gönderimi veya kargo teslimatı amacıyla <strong>kesinlikle kullanılmaz ve kargo şirketlerine aktarılmaz</strong>.
              </p>
            </div>
          </section>

          {/* 6 & 7. KARGO VE İYZİCO ÖDEME GÜVENLİĞİ */}
          <section className="space-y-3">
            <h2 className="font-serif text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#4A5D3E]/10 text-[#4A5D3E] text-xs flex items-center justify-center font-sans font-bold">6</span>
              Kargo Teslimatı ve iyzico Ödeme Güvenliği
            </h2>
            <p>
              Siparişin teslimi için ad, soyad, telefon ve adres bilgileri anlaşmalı kargo sağlayıcısına yalnızca teslimat ve iade amacıyla aktarılır.
            </p>
            <div className="bg-emerald-50/70 border border-emerald-200/60 rounded-2xl p-4 text-xs sm:text-sm text-emerald-950 space-y-1">
              <p className="font-bold text-emerald-900 flex items-center gap-2">
                <CreditCard size={16} /> iyzico Ödeme Altyapısı
              </p>
              <p>
                www.haqanwear.com üzerindeki elektronik ödeme işlemlerinde <strong>iyzi Ödeme ve Elektronik Para Hizmetleri A.Ş. (iyzico)</strong> altyapısı kullanılmaktadır. Kart bilgileri HAQAN Wear sunucularında tutulmaz, doğrudan lisanslı ödeme kuruluşu ve bankalar tarafından işlenir.
              </p>
            </div>
          </section>

          {/* 8, 9, 10. FATURALANDIRMA, ODEAWEB VE HOSTINGER */}
          <section className="space-y-3">
            <h2 className="font-serif text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#4A5D3E]/10 text-[#4A5D3E] text-xs flex items-center justify-center font-sans font-bold">7</span>
              Teknik Altyapı ve Hizmet Sağlayıcılar (Odeaweb & Hostinger)
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200">
                <div className="flex items-center gap-2 font-bold text-gray-900 text-xs sm:text-sm mb-1">
                  <Server size={16} className="text-[#4A5D3E]" /> Barındırma: Odeaweb
                </div>
                <p className="text-xs text-gray-600">
                  İnternet sitesinin hosting ve sunucu barındırma hizmeti Odeaweb üzerinden sağlanır. Müşteri verileri reklam amacıyla kullanılmaz.
                </p>
              </div>

              <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200">
                <div className="flex items-center gap-2 font-bold text-gray-900 text-xs sm:text-sm mb-1">
                  <Globe size={16} className="text-[#4A5D3E]" /> Alan Adı: Hostinger
                </div>
                <p className="text-xs text-gray-600">
                  www.haqanwear.com alan adının kaydı ve DNS yönetimi Hostinger üzerinden sağlanmaktadır.
                </p>
              </div>
            </div>
          </section>

          {/* 11 & 17. VERİLERİN SATILMAMASI GARANTİSİ */}
          <section className="space-y-3">
            <h2 className="font-serif text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#4A5D3E]/10 text-[#4A5D3E] text-xs flex items-center justify-center font-sans font-bold">8</span>
              Kişisel Verilerin Satılmaması Garantisi
            </h2>
            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-4 text-xs sm:text-sm text-gray-800">
              <p className="font-bold text-gray-900 mb-1">HAQAN Wear Verilerinizi Asla Satmaz:</p>
              <p>
                Müşteri ve kullanıcı kişisel verileri hiçbir üçüncü şahsa veya şirkete <strong>satılmaz, kiralanmaz ve üçüncü tarafların bağımsız pazarlama faaliyetleri için devredilmez</strong>.
              </p>
            </div>
          </section>

          {/* 12 & 13. TİCARİ İLETİLER VE ÇEREZLER */}
          <section className="space-y-3">
            <h2 className="font-serif text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#4A5D3E]/10 text-[#4A5D3E] text-xs flex items-center justify-center font-sans font-bold">9</span>
              Ticari İletiler ve Zorunlu Çerezler
            </h2>
            <p>
              Pazarlama SMS ve e-postaları izne bağlıdır ve alışverişin zorunlu şartı değildir. Sitemizde yalnızca temel alışveriş ve güvenlik işlevleri için <Link href="/cookies" className="text-[#4A5D3E] underline font-medium">zorunlu teknik çerezler</Link> kullanılır; kullanıcı davranışlarını takip eden reklam/profilleme çerezleri kullanılmaz.
            </p>
          </section>

          {/* 14, 15, 16. GÜVENLİK, SAKLAMA VE İMHA */}
          <section className="space-y-3">
            <h2 className="font-serif text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#4A5D3E]/10 text-[#4A5D3E] text-xs flex items-center justify-center font-sans font-bold">10</span>
              Veri Güvenliği, Saklama ve İmha
            </h2>
            <p>
              Kişisel verilerin yetkisiz erişimini, kaybını ve sızdırılmasını önlemek için 256-Bit SSL şifreleme dahil gerekli teknik ve idari güvenlik tedbirleri uygulanır. Yasal saklama süreleri dolduğunda veriler mevzuata uygun olarak silinir, yok edilir veya anonim hale getirilir.
            </p>
          </section>

          {/* 18, 19, 20. İLGİLİ KİŞİ HAKLARI VE İLETİŞİM */}
          <section className="space-y-4 pt-4 border-t border-gray-100">
            <h2 className="font-serif text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#4A5D3E]/10 text-[#4A5D3E] text-xs flex items-center justify-center font-sans font-bold">11</span>
              İlgili Kişinin Hakları ve İletişim
            </h2>
            <p className="text-xs sm:text-sm text-gray-600">
              Kullanıcılar 6698 sayılı KVKK’nın 11. maddesi kapsamındaki haklarını veri sorumlusu Hakan Yeşildağ’a başvurarak kullanabilir.
            </p>

            <div className="bg-gray-50 rounded-2xl p-5 border border-gray-200 text-xs sm:text-sm text-gray-800 space-y-1">
              <p><strong>Veri Sorumlusu:</strong> Hakan Yeşildağ (HAQAN Wear)</p>
              <p><strong>Vergi Kimlik No:</strong> 9510670940 (23 Temmuz Vergi Dairesi)</p>
              <p><strong>Adres:</strong> Zülüflühan Mah. Eski İskenderun Yolu Cad. No: 55 B, Antakya / Hatay</p>
              <p><strong>E-posta:</strong> <a href="mailto:hakanyesildag91@gmail.com" className="text-[#4A5D3E] underline font-medium">hakanyesildag91@gmail.com</a></p>
              <p><strong>Telefon:</strong> 0531 714 66 27</p>
              <p><strong>Web Sitesi:</strong> www.haqanwear.com</p>
            </div>
          </section>

        </div>
      </div>
    </main>
  );
}
