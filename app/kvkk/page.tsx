import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck, Lock, Server, CreditCard, Mail, Phone, FileText, CheckCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "KVKK Aydınlatma Metni",
  description: "HAQAN Wear 6698 sayılı Kişisel Verilerin Korunması Kanunu (KVKK) 10. Maddesi Kapsamında Aydınlatma Metni.",
};

export default function KvkkPage() {
  return (
    <main className="bg-[#FAF9F6] min-h-screen py-10 md:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8">
        
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-gray-500 mb-6">
          <Link href="/" className="hover:text-gray-900 transition-colors">Ana Sayfa</Link>
          <span>/</span>
          <span className="text-gray-900 font-semibold">KVKK Aydınlatma Metni</span>
        </nav>

        {/* Header */}
        <div className="bg-white rounded-3xl border border-gray-200/80 p-6 sm:p-10 shadow-xs mb-8">
          <div className="flex items-center gap-3 text-[#4A5D3E] mb-3">
            <ShieldCheck size={24} className="shrink-0" />
            <span className="text-xs uppercase tracking-widest font-bold">KVKK Md. 10 Bilgilendirmesi</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
            HAQAN WEAR KİŞİSEL VERİLERİN İŞLENMESİNE İLİŞKİN AYDINLATMA METNİ
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-2">
            Son Güncelleme Tarihi: 3 Eylül 2026 — 6698 Sayılı Kişisel Verilerin Korunması Kanunu Kapsamında
          </p>
        </div>

        {/* Content */}
        <div className="bg-white rounded-3xl border border-gray-200/80 p-6 sm:p-10 shadow-xs space-y-8 text-sm text-gray-700 leading-relaxed">
          
          <p className="text-xs sm:text-sm text-gray-600 bg-gray-50 p-4 rounded-2xl border border-gray-200/60">
            İşbu Kişisel Verilerin İşlenmesine İlişkin Aydınlatma Metni (“Aydınlatma Metni”), 6698 sayılı Kişisel Verilerin Korunması Kanunu’nun (“KVKK”) 10. maddesi kapsamında, HAQAN Wear markası altında faaliyet gösteren Hakan Yeşildağ tarafından www.haqanwear.com internet sitesini ziyaret eden, kullanıcı hesabı oluşturan, alışveriş yapan veya HAQAN Wear ile iletişim kuran kişilerin kişisel verilerinin işlenmesine ilişkin olarak hazırlanmıştır.
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

          {/* 2. İŞLENEN KİŞİSEL VERİLER */}
          <section className="space-y-3">
            <h2 className="font-serif text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#4A5D3E]/10 text-[#4A5D3E] text-xs flex items-center justify-center font-sans font-bold">2</span>
              İşlenen Kişisel Veriler
            </h2>
            <ul className="list-disc pl-5 space-y-1.5 text-gray-600">
              <li><strong>Kimlik Bilgileri:</strong> Ad, soyad, faturalandırma için gerekli T.C. Kimlik No veya vergi kimlik bilgileri.</li>
              <li><strong>İletişim Bilgileri:</strong> Telefon numarası, e-posta adresi, teslimat ve fatura adresi.</li>
              <li><strong>Müşteri ve Sipariş İşlem Bilgileri:</strong> Sipariş numarası, tarihi, satın alınan ürünler, beden, renk, adet, tutar, indirim, kargo, iptal, iade ve değişim bilgileri, talep/şikâyet kayıtları.</li>
              <li><strong>Finansal ve Ödeme Bilgileri:</strong> Ödeme yöntemi, ödeme durumu, iade işlem bilgileri, mali bilgiler (Elektronik kart ödemeleri iyzico altyapısı üzerinden gerçekleştirilir).</li>
              <li><strong>İşlem Güvenliği ve Teknik Veriler:</strong> IP adresi, oturum bilgileri, giriş, işlem, sistem ve güvenlik kayıtları.</li>
              <li><strong>Müşteri İletişim Bilgileri:</strong> İletilen mesajlar, destek talepleri, iade/değişim yazışmaları.</li>
              <li><strong>Ticari Elektronik İleti Bilgileri:</strong> SMS/E-posta tercih, onay ve ret kayıtları.</li>
            </ul>
          </section>

          {/* 3. İŞLENME AMAÇLARI VE HUKUKİ SEBEPLERİ */}
          <section className="space-y-3">
            <h2 className="font-serif text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#4A5D3E]/10 text-[#4A5D3E] text-xs flex items-center justify-center font-sans font-bold">3</span>
              Kişisel Verilerin İşlenme Amaçları ve Hukuki Sebepleri (KVKK Md. 5)
            </h2>
            <div className="space-y-2 text-xs sm:text-sm text-gray-600">
              <p>• <strong>Üyelik ve Kullanıcı Hesabı:</strong> Hesabın oluşturulması ve güvenliğinin sağlanması (Sözleşmenin kurulması/ifası ve meşru menfaat).</p>
              <p>• <strong>Sipariş ve Satış İşlemleri:</strong> Mesafeli satış sözleşmesinin kurulması, siparişin hazırlanması ve teslimi (Sözleşmenin ifası).</p>
              <p>• <strong>Faturalandırma ve Muhasebe:</strong> Yasal faturanın düzenlenmesi ve vergi mevzuatı kayıtlarının tutulması (Hukuki yükümlülük).</p>
              <p>• <strong>Ödeme İşlemleri:</strong> Ödemenin iyzico ile güvenle tamamlanması ve iade süreçleri (Sözleşmenin ifası ve hukuki yükümlülük).</p>
              <p>• <strong>Kargo ve Teslimat:</strong> Ürünün adresinize ulaştırılması ve iade gönderileri (Sözleşmenin ifası).</p>
              <p>• <strong>İptal, Cayma, İade ve Değişim:</strong> Tüketici haklarının kullandırılması ve ücret iadeleri (Sözleşmenin ifası ve kanuni yükümlülük).</p>
              <p>• <strong>Sistem ve İşlem Güvenliği:</strong> Yetkisiz erişimlerin, kötüye kullanım ve dolandırıcılığın önlenmesi (Meşru menfaat).</p>
              <p>• <strong>Müşteri Hizmetleri ve Talepler:</strong> Destek taleplerinin cevaplandırılması ve uyuşmazlık yönetimi (Hukuki yükümlülük ve bir hakkın korunması).</p>
            </div>
          </section>

          {/* 4. T.C. KİMLİK NUMARASININ İŞLENMESİ */}
          <section className="space-y-3">
            <h2 className="font-serif text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#4A5D3E]/10 text-[#4A5D3E] text-xs flex items-center justify-center font-sans font-bold">4</span>
              T.C. Kimlik Numarasının İşlenmesi Güvencesi
            </h2>
            <p>
              T.C. Kimlik Numarası yalnızca yasal faturalandırma ve vergi mevzuatı yükümlülüklerinin gerektirdiği işlemlerde işlenir.
            </p>
            <div className="bg-amber-50/80 border border-amber-200/70 rounded-2xl p-4 text-xs sm:text-sm text-amber-950 space-y-1">
              <p className="font-bold text-amber-900">Güvence Taahhüdü:</p>
              <p>
                T.C. Kimlik Numarası reklam, pazarlama, kampanya, kullanıcı profilleme, SMS/E-posta gönderimi veya kargo teslimatı amacıyla <strong>kesinlikle kullanılmaz ve kargo şirketlerine aktarılmaz</strong>.
              </p>
            </div>
          </section>

          {/* 5. KİŞİSEL VERİLERİN AKTARILMASI */}
          <section className="space-y-3">
            <h2 className="font-serif text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#4A5D3E]/10 text-[#4A5D3E] text-xs flex items-center justify-center font-sans font-bold">5</span>
              Kişisel Verilerin Aktarılması ve Hizmet Sağlayıcılar
            </h2>
            <p>Kişisel verileriniz yalnızca mevzuata uygun olarak aşağıdaki taraflara aktarılır:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm text-gray-600">
              <li><strong>Anlaşmalı Kargo ve Lojistik Sağlayıcıları:</strong> Siparişin teslim edilmesi ve iade işlemleri amacıyla (Ad, soyad, telefon, adres). Reklam izni anlamına gelmez.</li>
              <li><strong>iyzico ve Lisanslı Ödeme Kuruluşları:</strong> 256-bit SSL şifrelemeyle ödeme ve iade işlemlerinin güvenle gerçekleştirilmesi amacıyla.</li>
              <li><strong>Mali Müşavirlik & Muhasebe Sağlayıcıları:</strong> Yasal fatura ve vergi beyannamelerinin düzenlenmesi amacıyla.</li>
              <li><strong>Odeaweb (Hosting & Sunucu):</strong> Web sitesinin çalıştırılması ve verilerin <strong>Türkiye’de bulunan sunucu altyapısında</strong> barındırılması amacıyla (Müşteri verileri yurt dışı sunucularında barındırılmaz).</li>
              <li><strong>Hostinger (Alan Adı):</strong> www.haqanwear.com alan adının DNS kaydı ve yönetimi amacıyla (Müşteri veritabanı Hostinger üzerinde tutulmaz).</li>
              <li><strong>Yetkili Kamu Kurum ve Kuruluşları:</strong> Yasal zorunluluklar ve resmi talepler kapsamında.</li>
            </ul>
          </section>

          {/* 6 & 7. TİCARİ İLETİLER VE ÇEREZLER */}
          <section className="space-y-3">
            <h2 className="font-serif text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#4A5D3E]/10 text-[#4A5D3E] text-xs flex items-center justify-center font-sans font-bold">6</span>
              Ticari Elektronik İletiler ve Zorunlu Çerezler
            </h2>
            <p>
              Pazarlama ve kampanya amaçlı iletiler <Link href="/electronic-consent" className="text-[#4A5D3E] underline font-medium">Ticari Elektronik İleti Onay Metni</Link> kapsamında tamamen isteğe bağlıdır; alışveriş şartı değildir.
            </p>
            <p>
              Web sitemizde yalnızca sitenin çalışması için <Link href="/cookies" className="text-[#4A5D3E] underline font-medium">zorunlu teknik çerezler</Link> kullanılır; kullanıcı davranışlarını izleyen reklam veya pazarlama çerezleri kullanılmaz.
            </p>
          </section>

          {/* 8, 9, 10, 11. TOPLANMA YÖNTEMLERİ, SAKLAMA, GÜVENLİK VE SATILMAMA GARANTİSİ */}
          <section className="space-y-3">
            <h2 className="font-serif text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#4A5D3E]/10 text-[#4A5D3E] text-xs flex items-center justify-center font-sans font-bold">7</span>
              Toplanma Yöntemleri, Saklama, Güvenlik ve Verilerin Satılmaması
            </h2>
            <p>
              Veriler web sitesi formları, sipariş adımları ve teknik entegrasyonlar aracılığıyla elektronik ortamda toplanır. KVKK Md. 12 uyarınca gerekli tüm idari ve teknik tedbirler alınır.
            </p>
            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-4 text-xs sm:text-sm text-gray-800">
              <strong>Kişisel Verilerin Satılmaması Güvencesi:</strong> HAQAN Wear müşteri ve kullanıcı kişisel verilerini üçüncü kişilere hiçbir şekilde <strong>satmaz, kiralamaz ve üçüncü tarafların bağımsız reklam faaliyetleri için devretmez</strong>.
            </div>
          </section>

          {/* 12 & 13. İLGİLİ KİŞİNİN HAKLARI (KVKK MD. 11) VE BAŞVURU */}
          <section className="space-y-3">
            <h2 className="font-serif text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#4A5D3E]/10 text-[#4A5D3E] text-xs flex items-center justify-center font-sans font-bold">8</span>
              İlgili Kişinin Hakları (KVKK Md. 11) ve Başvuru Usulü
            </h2>
            <p>
              KVKK’nın 11. maddesi kapsamında; verilerinizin işlenip işlenmediğini öğrenme, bilgi talep etme, işlenme amacına uygunluğu kontrol etme, yurt içi aktarılan üçüncü kişileri bilme, düzeltme, silinmesini isteme ve zararın giderilmesini talep etme haklarına sahipsiniz.
            </p>
            <p className="text-xs text-gray-500">
              Talepleriniz Veri Sorumlusuna Başvuru Usul ve Esasları Hakkında Tebliğ kapsamında değerlendirilir ve en geç 30 gün içinde sonuçlandırılır.
            </p>
          </section>

          {/* 14 & 15. AYDINLATMA METNİNİN NİTELİĞİ VE İLETİŞİM */}
          <section className="space-y-4 pt-4 border-t border-gray-100">
            <h2 className="font-serif text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#4A5D3E]/10 text-[#4A5D3E] text-xs flex items-center justify-center font-sans font-bold">9</span>
              Aydınlatma Metninin Niteliği ve İletişim
            </h2>
            <p className="text-xs sm:text-sm text-gray-600">
              İşbu Aydınlatma Metni bir sözleşme veya açık rıza metni değildir; KVKK’nın 10. maddesi uyarınca bilgilendirme amacıyla hazırlanmıştır.
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
