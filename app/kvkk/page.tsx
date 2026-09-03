import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck, Mail, Phone, MapPin, Building, FileText } from "lucide-react";

export const metadata: Metadata = {
  title: "KVKK Aydınlatma Metni",
  description: "HAQAN Wear Kişisel Verilerin İşlenmesine İlişkin Aydınlatma Metni.",
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
            <span className="text-xs uppercase tracking-widest font-bold">Yasal Bilgilendirme</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
            Kişisel Verilerin İşlenmesine İlişkin Aydınlatma Metni
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-2">
            6698 Sayılı Kişisel Verilerin Korunması Kanunu (“KVKK”) Kapsamında Bilgilendirme
          </p>
        </div>

        {/* Content */}
        <div className="bg-white rounded-3xl border border-gray-200/80 p-6 sm:p-10 shadow-xs space-y-8 text-sm text-gray-700 leading-relaxed">
          
          {/* Madde 1 */}
          <section className="space-y-3">
            <h2 className="font-serif text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#4A5D3E]/10 text-[#4A5D3E] text-xs flex items-center justify-center font-sans font-bold">1</span>
              Veri Sorumlusu
            </h2>
            <p>
              6698 sayılı Kişisel Verilerin Korunması Kanunu (“KVKK”) kapsamında kişisel verileriniz, veri sorumlusu sıfatıyla <strong>HAQAN Wear</strong> markası altında faaliyet gösteren <strong>Hakan Yeşildağ</strong> tarafından aşağıda açıklanan kapsamda işlenmektedir.
            </p>
            <div className="bg-gray-50 border border-gray-200/70 rounded-2xl p-4 sm:p-5 space-y-2 text-xs sm:text-sm text-gray-800">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <p><strong>Veri Sorumlusu:</strong> Hakan Yeşildağ</p>
                <p><strong>Marka:</strong> HAQAN Wear</p>
                <p><strong>Vergi Kimlik No:</strong> 9510670940</p>
                <p><strong>Vergi Dairesi:</strong> 23 Temmuz Vergi Dairesi</p>
                <p className="sm:col-span-2"><strong>İşyeri Adresi:</strong> Zülüflühan Mah. Eski İskenderun Yolu Cad. No: 55 B, Antakya / Hatay</p>
                <p><strong>Telefon:</strong> 0531 714 66 27</p>
                <p><strong>E-posta:</strong> hakanyesildag91@gmail.com</p>
                <p className="sm:col-span-2"><strong>İnternet Sitesi:</strong> www.haqanwear.com</p>
              </div>
            </div>
            <p className="text-xs text-gray-500">
              İşbu Aydınlatma Metni; www.haqanwear.com internet sitesini (“Site”) ziyaret eden, Site üzerinden üyelik oluşturan, alışveriş yapan, sipariş veren veya HAQAN Wear ile iletişime geçen kişilerin kişisel verilerinin hangi kapsamda işlendiği konusunda bilgilendirilmesi amacıyla hazırlanmıştır.
            </p>
          </section>

          {/* Madde 2 */}
          <section className="space-y-3">
            <h2 className="font-serif text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#4A5D3E]/10 text-[#4A5D3E] text-xs flex items-center justify-center font-sans font-bold">2</span>
              İşlenen Kişisel Veriler
            </h2>
            <p>
              HAQAN Wear tarafından sunulan hizmetlerden yararlanmanız ve gerçekleştirdiğiniz işlemlere bağlı olarak aşağıdaki kişisel veri kategorileri işlenebilir:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-gray-600">
              <li><strong>Kimlik Bilgileri:</strong> Ad, soyad ve sipariş, fatura veya ilgili mevzuattan kaynaklanan yükümlülüklerin yerine getirilmesi için gerekli diğer kimlik bilgileri.</li>
              <li><strong>İletişim Bilgileri:</strong> Telefon numarası, e-posta adresi, teslimat adresi ve fatura adresi.</li>
              <li><strong>Müşteri İşlem Bilgileri:</strong> Üyelik ve hesap bilgileri, sipariş bilgileri, satın alınan ürünlere ilişkin bilgiler, sepet bilgileri, sipariş geçmişi, iptal, iade ve değişim kayıtları, müşteri talep ve şikâyetleri ile bunlara ilişkin işlem kayıtları.</li>
              <li>
                <strong>Finans ve Ödeme İşlem Bilgileri:</strong> Ödeme yöntemi, ödeme ve tahsilat işlemlerine ilişkin bilgiler, işlem sonucu ve iade bilgileri gibi ödeme sürecinin yürütülmesi için gerekli bilgiler.
                <div className="mt-2 p-3 bg-emerald-50/70 border border-emerald-200/60 rounded-xl text-xs text-emerald-900">
                  HAQAN Wear internet sitesinde gerçekleştirilen ödeme işlemlerinde <strong>iyzico (iyzi Ödeme ve Elektronik Para Hizmetleri A.Ş.)</strong> ödeme altyapısı kullanılmaktadır. Ödeme işlemleri kapsamında iyzico tarafından doğrudan elde edilen banka veya kredi kartı bilgileri, iyzico’nun kendi sistemleri, güvenlik standartları (PCI-DSS) ve kişisel veri işleme süreçleri kapsamında işlenir. <strong>HAQAN Wear sunucularında kart bilgileri doğrudan saklanmamaktadır.</strong>
                </div>
              </li>
              <li><strong>İşlem Güvenliği Bilgileri:</strong> IP adresi, oturum bilgileri, giriş ve doğrulama kayıtları, cihaz ve bağlantı bilgileri ile Site’nin ve kullanıcı hesaplarının güvenliğinin sağlanması amacıyla oluşturulan teknik kayıtlar.</li>
              <li><strong>Hukuki İşlem Bilgileri:</strong> Yetkili kamu kurumları, adli veya idari merciler tarafından iletilen talepler, tüketici uyuşmazlıkları, başvurular, hukuki süreçler ve bunlara ilişkin kayıtlar.</li>
              <li><strong>Talep, Şikâyet ve İletişim Bilgileri:</strong> HAQAN Wear ile e-posta, telefon, internet sitesi veya diğer iletişim kanalları üzerinden gerçekleştirilen görüşme ve yazışmalar kapsamında kullanıcı tarafından iletilen bilgiler.</li>
              <li><strong>İnternet Kullanım ve Çerez Bilgileri:</strong> Site’nin çalışması, güvenliğinin sağlanması ve kullanıcı tercihlerinin yönetilmesi amacıyla kullanılan çerezler ve benzeri teknolojiler aracılığıyla elde edilen bilgiler. Ayrıntılı bilgiler <Link href="/cookies" className="text-[#4A5D3E] underline font-medium">Çerez Politikası</Link> sayfamızda açıklanmıştır.</li>
            </ul>
          </section>

          {/* Madde 3 */}
          <section className="space-y-3">
            <h2 className="font-serif text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#4A5D3E]/10 text-[#4A5D3E] text-xs flex items-center justify-center font-sans font-bold">3</span>
              Kişisel Verilerin İşlenme Amaçları
            </h2>
            <p>Kişisel verileriniz, gerçekleştirilen işlem ve kullanılan hizmete bağlı olarak;</p>
            <div className="grid sm:grid-cols-2 gap-2 text-xs sm:text-sm text-gray-600">
              <div className="p-2.5 bg-gray-50 rounded-xl">• Üyelik hesabının oluşturulması ve yönetilmesi</div>
              <div className="p-2.5 bg-gray-50 rounded-xl">• Siparişlerin alınması, hazırlanması ve teslimi</div>
              <div className="p-2.5 bg-gray-50 rounded-xl">• Satış sözleşmesinin kurulması ve ifası</div>
              <div className="p-2.5 bg-gray-50 rounded-xl">• Ödeme ve tahsilat işlemlerinin gerçekleştirilmesi</div>
              <div className="p-2.5 bg-gray-50 rounded-xl">• Fatura ve muhasebe işlemlerinin yürütülmesi</div>
              <div className="p-2.5 bg-gray-50 rounded-xl">• İptal, iade ve değişim süreçlerinin yönetilmesi</div>
              <div className="p-2.5 bg-gray-50 rounded-xl">• Müşteri destek ve şikâyet yönetimi</div>
              <div className="p-2.5 bg-gray-50 rounded-xl">• Dolandırıcılık ve sahte işlemlerin önlenmesi</div>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Reklam, kampanya, promosyon ve indirim duyuruları gibi ticari elektronik ileti faaliyetleri, ilgili mevzuat kapsamında gerekli hukuki şartların sağlanması ve ilgili kişinin ayrıca onay vermesi halinde yürütülür.
            </p>
          </section>

          {/* Madde 4 */}
          <section className="space-y-3">
            <h2 className="font-serif text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#4A5D3E]/10 text-[#4A5D3E] text-xs flex items-center justify-center font-sans font-bold">4</span>
              Kişisel Verilerin İşlenmesinin Hukuki Sebepleri
            </h2>
            <ul className="space-y-2 text-gray-600">
              <li><strong>Sözleşmenin Kurulması veya İfası (KVKK m.5/2-c):</strong> Sipariş oluşturulması, ödeme, teslimat, üyelik ve iade süreçlerinin yürütülmesi.</li>
              <li><strong>Hukuki Yükümlülük (KVKK m.5/2-ç):</strong> Fatura düzenleme, yasal kayıt tutma, vergi mevzuatı ve tüketici haklarının korunması.</li>
              <li><strong>Hakkın Tesisi ve Korunması (KVKK m.5/2-e):</strong> Olası uyuşmazlıklarda delil ve yasal hakların korunması.</li>
              <li><strong>Meşru Menfaat (KVKK m.5/2-f):</strong> Temel hak ve özgürlüklere zarar vermemek kaydıyla işlem güvenliğinin ve hizmet kalitesinin sağlanması.</li>
            </ul>
          </section>

          {/* Madde 5 */}
          <section className="space-y-3">
            <h2 className="font-serif text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#4A5D3E]/10 text-[#4A5D3E] text-xs flex items-center justify-center font-sans font-bold">5</span>
              Kişisel Verilerin Toplanma Yöntemleri
            </h2>
            <p>
              Kişisel verileriniz; www.haqanwear.com internet sitesi, üyelik ve giriş ekranları, sipariş ve ödeme işlemleri, teslimat formları, çerezler, e-posta, telefon ve müşteri destek kanalları aracılığıyla elektronik ve fiziki ortamlarda otomatik ya da otomatik olmayan yöntemlerle toplanmaktadır.
            </p>
          </section>

          {/* Madde 6 */}
          <section className="space-y-3">
            <h2 className="font-serif text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#4A5D3E]/10 text-[#4A5D3E] text-xs flex items-center justify-center font-sans font-bold">6</span>
              Kişisel Verilerin Aktarılması
            </h2>
            <p>Kişisel verileriniz, hizmetlerin sunulabilmesi ve yasal yükümlülüklerin yerine getirilebilmesi amacıyla aşağıdaki taraflarla paylaşılabilir:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-gray-600">
              <li><strong>iyzico (iyzi Ödeme ve Elektronik Para Hizmetleri A.Ş.):</strong> Güvenli ödeme, tahsilat, 3D Secure ve iade süreçlerinin gerçekleştirilmesi amacıyla.</li>
              <li><strong>Anlaşmalı Kargo ve Lojistik Sağlayıcıları:</strong> Sipariş edilen ürünlerin alıcıya ulaştırılması ve iade süreçlerinin yürütülmesi amacıyla (Ad, soyad, telefon, teslimat adresi).</li>
              <li><strong>Hostinger ve Teknik Altyapı Sağlayıcıları:</strong> Web sitesi barındırma, veri tabanı ve sistem güvenliğinin sağlanması amacıyla.</li>
              <li><strong>Mali ve Hukuki Danışmanlar / Yetkili Merciler:</strong> Fatura, vergi, muhasebe ve yasal bildirim zorunlulukları kapsamında.</li>
            </ul>
          </section>

          {/* Madde 7 */}
          <section className="space-y-3">
            <h2 className="font-serif text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#4A5D3E]/10 text-[#4A5D3E] text-xs flex items-center justify-center font-sans font-bold">7</span>
              Kişisel Verilerin Yurt Dışına Aktarılması
            </h2>
            <p>
              Kullanılan bazı hosting (Hostinger), bulut veya teknik altyapı hizmetlerinin yurt dışı sunucularda bulunması halinde, aktarım KVKK’nın 9. maddesine ve ilgili ikincil mevzuattaki uygun güvencelere tam uyumlu olarak gerçekleştirilir.
            </p>
          </section>

          {/* Madde 8 & 9 & 10 */}
          <section className="space-y-3">
            <h2 className="font-serif text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#4A5D3E]/10 text-[#4A5D3E] text-xs flex items-center justify-center font-sans font-bold">8</span>
              Saklama, İmha ve Ticari İletiler
            </h2>
            <p>
              Kişisel verileriniz yasal saklama süreleri (Türk Ticaret Kanunu, Vergi Usul Kanunu, Tüketici Kanunu) boyunca muhafaza edilir ve süre sonunda mevzuata uygun şekilde silinir, yok edilir veya anonimleştirilir.
            </p>
            <p className="text-xs text-gray-500">
              Pazarlama iletileri izne bağlıdır ve kullanıcı istediği an onayını geri çekme hakkına sahiptir.
            </p>
          </section>

          {/* Madde 11 & 12 */}
          <section className="space-y-4 pt-4 border-t border-gray-100">
            <h2 className="font-serif text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#4A5D3E]/10 text-[#4A5D3E] text-xs flex items-center justify-center font-sans font-bold">9</span>
              İlgili Kişinin Hakları ve Başvuru Usulü
            </h2>
            <p>
              KVKK’nın 11. maddesi kapsamında; verilerinizin işlenip işlenmediğini öğrenme, düzeltme, silinmesini isteme ve kanuna aykırı işleme sebebiyle zararın giderilmesini talep etme haklarına sahipsiniz.
            </p>
            
            <div className="bg-gray-50 rounded-2xl p-5 border border-gray-200">
              <h3 className="font-bold text-gray-900 mb-2">Başvuru İletişim Bilgileri:</h3>
              <p className="text-xs sm:text-sm text-gray-600">
                <strong>Veri Sorumlusu:</strong> Hakan Yeşildağ (HAQAN Wear)<br />
                <strong>Adres:</strong> Zülüflühan Mah. Eski İskenderun Yolu Cad. No: 55 B, Antakya / Hatay<br />
                <strong>E-posta:</strong> <a href="mailto:hakanyesildag91@gmail.com" className="text-[#4A5D3E] hover:underline font-medium">hakanyesildag91@gmail.com</a><br />
                <strong>Telefon:</strong> 0531 714 66 27
              </p>
            </div>
          </section>

        </div>
      </div>
    </main>
  );
}
