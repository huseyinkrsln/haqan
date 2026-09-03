import type { Metadata } from "next";
import Link from "next/link";
import { Cookie, ShieldCheck, ShoppingCart, Lock, CreditCard, Info } from "lucide-react";

export const metadata: Metadata = {
  title: "Çerez Politikası",
  description: "HAQAN Wear internet sitesinde kullanılan zorunlu çerezler ve teknik veri işleme ilkeleri hakkında yasal bilgilendirme.",
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
            <span className="text-xs uppercase tracking-widest font-bold">Zorunlu Çerezler ve Güvenlik</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
            HAQAN WEAR ÇEREZ POLİTİKASI
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-2">
            Son Güncelleme Tarihi: 3 Eylül 2026 — 6698 Sayılı KVKK ve E-Ticaret Mevzuatı Uyarınca
          </p>
        </div>

        {/* Bilgilendirme Vurgu Kutusu */}
        <div className="bg-emerald-50/80 border border-emerald-200/70 rounded-3xl p-5 sm:p-6 mb-8 flex items-start gap-3.5 text-emerald-950 shadow-2xs">
          <ShieldCheck size={24} className="text-emerald-700 shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm leading-relaxed">
            <p className="font-bold text-emerald-900 text-sm sm:text-base mb-1">
              Yalnızca Zorunlu Teknik Çerezler Kullanılmaktadır
            </p>
            <p>
              www.haqanwear.com üzerinde yalnızca web sitesinin çalışması, alışveriş sepetinizin korunması, kullanıcı girişi ve ödeme güvenliğinin sağlanması için zorunlu olan teknik çerezler kullanılmaktadır. <strong>Sitemizde kullanıcı davranışlarını takip eden reklam, hedefleme, profil çıkarma veya analitik izleme çerezleri kullanılmamaktadır.</strong>
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-3xl border border-gray-200/80 p-6 sm:p-10 shadow-xs space-y-8 text-sm text-gray-700 leading-relaxed">
          
          <p className="text-xs sm:text-sm text-gray-600 bg-gray-50 p-4 rounded-2xl border border-gray-200/60">
            İşbu Çerez Politikası, Hakan Yeşildağ tarafından HAQAN Wear markası altında işletilen www.haqanwear.com internet sitesinde kullanılan zorunlu çerezler ve benzeri teknolojiler hakkında kullanıcıları bilgilendirmek amacıyla hazırlanmıştır.
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

          {/* 2. ÇEREZ NEDİR? */}
          <section className="space-y-3">
            <h2 className="font-serif text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#4A5D3E]/10 text-[#4A5D3E] text-xs flex items-center justify-center font-sans font-bold">2</span>
              Çerez Nedir?
            </h2>
            <p>
              Çerezler, bir internet sitesi ziyaret edildiğinde internet tarayıcısı aracılığıyla kullanıcının cihazında saklanan veya mevcut oturum kapsamında kullanılan küçük veri dosyalarıdır. Çerezler internet sitesinin teknik olarak çalışmasını, kullanıcı oturumunun sürdürülmesini, güvenliğin sağlanmasını ve kullanıcının talep ettiği internet sitesi hizmetlerinin yerine getirilmesini sağlar.
            </p>
          </section>

          {/* 3 & 4. HAQAN WEAR TARAFINDAN KULLANILAN ÇEREZLER VE AMAÇLARI */}
          <section className="space-y-3">
            <h2 className="font-serif text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#4A5D3E]/10 text-[#4A5D3E] text-xs flex items-center justify-center font-sans font-bold">3</span>
              HAQAN Wear Tarafından Kullanılan Çerezler ve Kullanım Amaçları
            </h2>
            <p>
              www.haqanwear.com üzerinde yalnızca internet sitesinin çalışması ve kullanıcının talep ettiği e-ticaret hizmetlerinin sunulması için gerekli olan zorunlu çerezler kullanılır.
            </p>
            <p>
              HAQAN Wear tarafından; <strong>analitik, performans ölçümü, kullanıcı profilleme, reklam, hedefleme veya pazarlama amacıyla kullanıcı davranışlarını takip eden çerezler kullanılmaz.</strong>
            </p>
            
            <div className="grid sm:grid-cols-2 gap-2 text-xs sm:text-sm text-gray-700 pt-1">
              <div className="p-2.5 bg-gray-50 rounded-xl">• Sitenin teknik olarak çalışmasını sağlamak</div>
              <div className="p-2.5 bg-gray-50 rounded-xl">• Güvenli oturum açmak ve sürdürmek</div>
              <div className="p-2.5 bg-gray-50 rounded-xl">• Alışveriş sepetindeki ürünleri korumak</div>
              <div className="p-2.5 bg-gray-50 rounded-xl">• Ödeme işlemini güvenle tamamlamak</div>
              <div className="p-2.5 bg-gray-50 rounded-xl">• Yetkisiz erişimleri ve sahteciliği önlemek</div>
              <div className="p-2.5 bg-gray-50 rounded-xl">• Kullanıcının talep ettiği hizmeti sunmak</div>
            </div>
          </section>

          {/* 5. ZORUNLU ÇEREZLER İÇİN AÇIK RIZA */}
          <section className="space-y-3">
            <h2 className="font-serif text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#4A5D3E]/10 text-[#4A5D3E] text-xs flex items-center justify-center font-sans font-bold">4</span>
              Zorunlu Çerezler İçin Açık Rıza Durumu
            </h2>
            <p>
              www.haqanwear.com üzerinde kullanılan ve kullanıcının açıkça talep ettiği e-ticaret hizmetinin sunulması için kesinlikle gerekli olan teknik çerezler, mevzuatta açık rıza gerektirmeyen hukuki işleme şartlarına dayanılarak kullanılır.
            </p>
            <p className="text-xs text-gray-500">
              Zorunlu olmayan bir çerezin ileride kullanılmaya başlanması halinde, söz konusu çerez bakımından mevzuatın gerektirdiği açık rıza şartları ayrıca yerine getirilir.
            </p>
          </section>

          {/* 6, 7, 8, 9. OTURUM, SEPET, GÜVENLİK VE ÖDEME ÇEREZLERİ */}
          <section className="space-y-3">
            <h2 className="font-serif text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#4A5D3E]/10 text-[#4A5D3E] text-xs flex items-center justify-center font-sans font-bold">5</span>
              Kullanılan Teknik Çerez Kategorileri
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200">
                <div className="flex items-center gap-2 font-bold text-gray-900 text-xs sm:text-sm mb-1">
                  <Lock size={15} className="text-[#4A5D3E]" /> Oturum & Kimlik Doğrulama
                </div>
                <p className="text-xs text-gray-600">
                  Hesaba güvenli giriş yapılması ve her sayfada yeniden şifre sorulmaması için kullanılır. Reklam amacıyla kullanılmaz.
                </p>
              </div>

              <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200">
                <div className="flex items-center gap-2 font-bold text-gray-900 text-xs sm:text-sm mb-1">
                  <ShoppingCart size={15} className="text-[#4A5D3E]" /> Alışveriş Sepeti Çerezleri
                </div>
                <p className="text-xs text-gray-600">
                  Sepete eklenen ürünlerin işlem süresince korunması ve siparişin kesintisiz tamamlanması için kullanılır.
                </p>
              </div>

              <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200">
                <div className="flex items-center gap-2 font-bold text-gray-900 text-xs sm:text-sm mb-1">
                  <ShieldCheck size={15} className="text-[#4A5D3E]" /> Güvenlik Amaçlı Çerezler
                </div>
                <p className="text-xs text-gray-600">
                  Yetkisiz erişimlerin, kötüye kullanım ve sahte işlemlerin önlenmesi amacıyla oluşturulan teknik kayıtlardır.
                </p>
              </div>

              <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200">
                <div className="flex items-center gap-2 font-bold text-gray-900 text-xs sm:text-sm mb-1">
                  <CreditCard size={15} className="text-[#4A5D3E]" /> iyzico Ödeme Güvenliği
                </div>
                <p className="text-xs text-gray-600">
                  iyzico altyapısında 256-bit SSL ve 3D Secure ödeme sürecinin teknik güvenliği için gereklidir.
                </p>
              </div>
            </div>
          </section>

          {/* 10 & 11. SAKLAMA SÜRESİ VE TARAYICI YÖNETİMİ */}
          <section className="space-y-3">
            <h2 className="font-serif text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#4A5D3E]/10 text-[#4A5D3E] text-xs flex items-center justify-center font-sans font-bold">6</span>
              Saklama Süreleri ve Tarayıcı Üzerinden Yönetim
            </h2>
            <p>
              Zorunlu oturum çerezleri tarayıcınızı kapattığınızda otomatik olarak silinir. Sepet veya güvenlik çerezleri ise teknik amacın gerektirdiği süre boyunca saklanır.
            </p>
            <p className="text-xs text-gray-600">
              Kullanıcı, tarayıcı ayarlarından çerezleri dilediği an silebilir veya engelleyebilir. Ancak zorunlu çerezlerin engellenmesi durumunda sepet, kullanıcı girişi ve ödeme gibi temel e-ticaret işlevleri çalışmayabilir.
            </p>
          </section>

          {/* 12, 13, 14, 15. KİŞİSEL VERİLER, GÜNCELLEME VE İLETİŞİM */}
          <section className="space-y-4 pt-4 border-t border-gray-100">
            <h2 className="font-serif text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#4A5D3E]/10 text-[#4A5D3E] text-xs flex items-center justify-center font-sans font-bold">7</span>
              Kişisel Verilerin Korunması ve İletişim
            </h2>
            <p className="text-xs sm:text-sm text-gray-600">
              Kişisel verilerinizin işlenmesine ilişkin detaylı bilgilere <Link href="/kvkk" className="text-[#4A5D3E] underline font-medium">KVKK Aydınlatma Metni</Link> sayfamızdan ulaşabilirsiniz.
            </p>

            <div className="bg-gray-50 rounded-2xl p-5 border border-gray-200 text-xs sm:text-sm text-gray-800 space-y-1">
              <p><strong>Veri Sorumlusu:</strong> Hakan Yeşildağ (HAQAN Wear)</p>
              <p><strong>Vergi Kimlik No:</strong> 9510670940 (23 Temmuz Vergi Dairesi)</p>
              <p><strong>Adres:</strong> Zülüflühan Mah. Eski İskenderun Yolu Cad. No: 55 B, Antakya / Hatay</p>
              <p><strong>E-posta:</strong> <a href="mailto:hakanyesildag91@gmail.com" className="text-[#4A5D3E] underline font-medium">hakanyesildag91@gmail.com</a></p>
              <p><strong>Telefon:</strong> 0531 714 66 27</p>
            </div>
          </section>

        </div>
      </div>
    </main>
  );
}
