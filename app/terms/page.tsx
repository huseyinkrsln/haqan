import type { Metadata } from "next";
import Link from "next/link";
import { FileText, ShieldCheck, Truck, RotateCcw, CreditCard, Scale, Building2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Mesafeli Satış Sözleşmesi",
  description: "HAQAN Wear 6502 Sayılı Tüketicinin Korunması Hakkında Kanun ve Mesafeli Sözleşmeler Yönetmeliği Uyarınca Mesafeli Satış Sözleşmesi.",
};

export default function TermsPage() {
  return (
    <main className="bg-[#FAF9F6] min-h-screen py-10 md:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8">
        
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-gray-500 mb-6">
          <Link href="/" className="hover:text-gray-900 transition-colors">Ana Sayfa</Link>
          <span>/</span>
          <span className="text-gray-900 font-semibold">Mesafeli Satış Sözleşmesi</span>
        </nav>

        {/* Header */}
        <div className="bg-white rounded-3xl border border-gray-200/80 p-6 sm:p-10 shadow-xs mb-8">
          <div className="flex items-center gap-3 text-[#4A5D3E] mb-3">
            <FileText size={24} className="shrink-0" />
            <span className="text-xs uppercase tracking-widest font-bold">Yasal Sözleşme & Koşullar</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
            HAQAN WEAR MESAFELİ SATIŞ SÖZLEŞMESİ
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-2">
            Son Güncelleme Tarihi: 3 Eylül 2026 — 6502 Sayılı Tüketicinin Korunması Hakkında Kanun Kapsamında
          </p>
        </div>

        {/* Content */}
        <div className="bg-white rounded-3xl border border-gray-200/80 p-6 sm:p-10 shadow-xs space-y-8 text-sm text-gray-700 leading-relaxed">
          
          {/* MADDE 1 – TARAFLAR */}
          <section className="space-y-3">
            <h2 className="font-serif text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#4A5D3E]/10 text-[#4A5D3E] text-xs flex items-center justify-center font-sans font-bold">1</span>
              MADDE 1 – Taraflar
            </h2>
            <p>
              İşbu Mesafeli Satış Sözleşmesi (“Sözleşme”), aşağıda bilgileri bulunan Satıcı ile www.haqanwear.com internet sitesi üzerinden sipariş veren Alıcı/Tüketici arasında elektronik ortamda kurulmuştur.
            </p>
            
            <div className="bg-gray-50 border border-gray-200/80 rounded-2xl p-4 sm:p-5 space-y-2 text-xs sm:text-sm text-gray-800">
              <h3 className="font-bold text-gray-900 text-sm">1.1. SATICI</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <p><strong>Satıcı:</strong> Hakan Yeşildağ</p>
                <p><strong>Marka:</strong> HAQAN Wear</p>
                <p><strong>Vergi Kimlik No:</strong> 9510670940</p>
                <p><strong>Vergi Dairesi:</strong> 23 Temmuz Vergi Dairesi</p>
                <p className="sm:col-span-2"><strong>Adres:</strong> Zülüflühan Mah. Eski İskenderun Yolu Cad. No: 55 B, Antakya / Hatay</p>
                <p><strong>Telefon:</strong> 0531 714 66 27</p>
                <p><strong>E-posta:</strong> hakanyesildag91@gmail.com</p>
                <p className="sm:col-span-2"><strong>İnternet Sitesi:</strong> www.haqanwear.com</p>
              </div>
            </div>

            <div className="bg-gray-50 border border-gray-200/80 rounded-2xl p-4 sm:p-5 space-y-1.5 text-xs sm:text-sm text-gray-800">
              <h3 className="font-bold text-gray-900 text-sm">1.2. ALICI / TÜKETİCİ</h3>
              <p><strong>Ad Soyad:</strong> [Sipariş sırasında otomatik oluşturulur]</p>
              <p><strong>Telefon:</strong> [Sipariş sırasında otomatik oluşturulur]</p>
              <p><strong>E-posta:</strong> [Sipariş sırasında otomatik oluşturulur]</p>
              <p><strong>Teslimat Adresi:</strong> [Sipariş sırasında otomatik oluşturulur]</p>
              <p><strong>Fatura Adresi:</strong> [Sipariş sırasında otomatik oluşturulur]</p>
              <p className="text-xs text-gray-500 mt-2">
                İşbu Sözleşme’de Hakan Yeşildağ “Satıcı”; www.haqanwear.com üzerinden tüketici işlemi kapsamında ürün satın alan kişi “Alıcı” veya “Tüketici” olarak anılır.
              </p>
            </div>
          </section>

          {/* MADDE 2 – SÖZLEŞMENİN KONUSU */}
          <section className="space-y-3">
            <h2 className="font-serif text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#4A5D3E]/10 text-[#4A5D3E] text-xs flex items-center justify-center font-sans font-bold">2</span>
              MADDE 2 – Sözleşmenin Konusu
            </h2>
            <p>
              İşbu Sözleşme’nin konusu, Alıcı’nın Satıcı’ya ait www.haqanwear.com internet sitesi üzerinden elektronik ortamda sipariş verdiği ürün veya ürünlerin satışı ve teslimine ilişkin olarak tarafların hak ve yükümlülüklerinin belirlenmesidir.
            </p>
            <p>
              İşbu Sözleşme’ye 6502 sayılı Tüketicinin Korunması Hakkında Kanun, Mesafeli Sözleşmeler Yönetmeliği ve yürürlükteki ilgili mevzuat hükümleri uygulanır.
            </p>
            <p className="text-xs text-gray-600">
              Alıcı, siparişi tamamlamadan önce ürünün temel nitelikleri, vergiler dahil satış fiyatı, indirim tutarı, ödeme yöntemi, teslimat şekli ve masrafları, cayma hakkı ve Satıcı iletişim bilgileri hakkında Ön Bilgilendirme Formu aracılığıyla bilgilendirilir.
            </p>
          </section>

          {/* MADDE 3 – SÖZLEŞME KONUSU ÜRÜNLER VE SİPARİŞ BİLGİLERİ */}
          <section className="space-y-3">
            <h2 className="font-serif text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#4A5D3E]/10 text-[#4A5D3E] text-xs flex items-center justify-center font-sans font-bold">3</span>
              MADDE 3 – Sözleşme Konusu Ürünler ve Sipariş Bilgileri
            </h2>
            <p>
              Sözleşme konusu ürünlere ilişkin bilgiler, Alıcı’nın sipariş sırasında yaptığı seçimlere göre elektronik ortamda oluşturulur ve işbu Sözleşme’nin ayrılmaz parçasıdır.
            </p>
            <div className="bg-gray-50 border border-gray-200/80 rounded-2xl p-4 text-xs sm:text-sm space-y-1 text-gray-700">
              <p><strong>Sipariş No & Tarihi:</strong> [Otomatik oluşturulur]</p>
              <p><strong>Ürün, Beden, Renk ve Adet:</strong> [Seçilen ürün detayları]</p>
              <p><strong>Birim Fiyat ve İndirim:</strong> [Fiyat detayları]</p>
              <p><strong>Kargo Bedeli & Toplam Tutar:</strong> [Toplam ödeme tutarı]</p>
            </div>
            <p className="text-xs text-gray-500">
              Alıcı’nın açık onayı olmaksızın sipariş bedeline ilave ücret eklenmez.
            </p>
          </section>

          {/* MADDE 4 – SÖZLEŞMENİN KURULMASI */}
          <section className="space-y-3">
            <h2 className="font-serif text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#4A5D3E]/10 text-[#4A5D3E] text-xs flex items-center justify-center font-sans font-bold">4</span>
              MADDE 4 – Sözleşmenin Kurulması
            </h2>
            <p>
              Alıcı, siparişini tamamlamadan önce Ön Bilgilendirme Formu’na ve işbu Mesafeli Satış Sözleşmesi’ne elektronik ortamda erişir. Alıcı’nın siparişi onaylayan işlemi gerçekleştirmesiyle siparişin ödeme yükümlülüğü doğurduğu açıkça belirtilir.
            </p>
            <p>
              İşbu Sözleşme, Alıcı’nın siparişi elektronik ortamda onaylaması ve siparişin Satıcı sistemine ulaşmasıyla kurulur. Sözleşmenin bir örneği elektronik ortamda Alıcı’ya iletilir veya erişimine sunulur.
            </p>
          </section>

          {/* MADDE 5 – ÖDEME (iyzico) */}
          <section className="space-y-3">
            <h2 className="font-serif text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#4A5D3E]/10 text-[#4A5D3E] text-xs flex items-center justify-center font-sans font-bold">5</span>
              MADDE 5 – Ödeme ve Güvenlik Altyapısı
            </h2>
            <p>
              Sipariş bedeli, www.haqanwear.com üzerinde sipariş sırasında Alıcı’ya sunulan ödeme yöntemlerinden biri kullanılarak ödenir.
            </p>
            <div className="bg-emerald-50/70 border border-emerald-200/60 rounded-2xl p-4 text-xs sm:text-sm text-emerald-950 space-y-1.5">
              <p className="font-bold text-emerald-900 flex items-center gap-2">
                <CreditCard size={16} /> iyzico Güvenli Ödeme Altyapısı
              </p>
              <p>
                www.haqanwear.com üzerindeki elektronik ödeme işlemlerinde <strong>iyzi Ödeme ve Elektronik Para Hizmetleri A.Ş. (iyzico)</strong> ödeme altyapısı kullanılmaktadır. Kredi kartı veya banka kartıyla gerçekleştirilen ödemeler 256-Bit SSL şifreleme ve 3D Secure güvencesiyle iyzico altyapısı üzerinden işlenir.
              </p>
            </div>
          </section>

          {/* MADDE 6 & 7 & 8 – TESLİMAT VE KARGO */}
          <section className="space-y-3">
            <h2 className="font-serif text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#4A5D3E]/10 text-[#4A5D3E] text-xs flex items-center justify-center font-sans font-bold">6</span>
              MADDE 6, 7, 8 – Teslimat, Kargo Masrafları ve Kontrol
            </h2>
            <p>
              Sipariş konusu ürün, Alıcı’nın sipariş sırasında bildirdiği teslimat adresine HAQAN Wear’ın anlaşmalı kargo hizmet sağlayıcısı aracılığıyla, yasal 30 günlük süreyi aşmamak üzere gönderilir.
            </p>
            <p>
              HAQAN Wear tarafından belirlenen taşıyıcı kullanıldığı sürece ürünün Alıcı’ya teslimine kadar meydana gelen kayıp ve hasardan Satıcı sorumludur. Pakette açık ve gözle görülür bir hasar bulunması halinde hasar tutanağı düzenletilmesi ispat kolaylığı sağlar.
            </p>
          </section>

          {/* MADDE 9 & 10 – CAYMA HAKKI VE BİLDİRİMİ */}
          <section className="space-y-3">
            <h2 className="font-serif text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#4A5D3E]/10 text-[#4A5D3E] text-xs flex items-center justify-center font-sans font-bold">7</span>
              MADDE 9, 10 – 14 Günlük Koşulsuz Cayma Hakkı
            </h2>
            <p>
              Alıcı, cayma hakkının kanuni istisnaları dışında kalan ürünlerde, ürünü teslim aldığı tarihten itibaren <strong>14 (on dört) gün içerisinde herhangi bir gerekçe göstermeksizin ve cezai şart ödemeksizin</strong> sözleşmeden cayabilir.
            </p>
            <p>
              Alıcı'nın herhangi bir iade sebebi belirtmesi zorunlu değildir. Bedenin uymaması, rengin beğenilmemesi veya sadece karardan vazgeçilmesi cayma hakkının kullanılması için yeterlidir.
            </p>
            <div className="bg-gray-50 border border-gray-200 p-3.5 rounded-xl text-xs sm:text-sm">
              <strong>Cayma Bildirimi Kanalı:</strong> <a href="mailto:hakanyesildag91@gmail.com" className="text-[#4A5D3E] underline font-medium">hakanyesildag91@gmail.com</a> veya Zülüflühan Mah. Eski İskenderun Yolu Cad. No: 55 B, Antakya/Hatay adresine yazılı bildirim.
            </div>
          </section>

          {/* MADDE 11, 12, 13 – ÜRÜNÜN İADESİ, KARGO ÜCRETİ VE BEDEL İADESİ */}
          <section className="space-y-3">
            <h2 className="font-serif text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#4A5D3E]/10 text-[#4A5D3E] text-xs flex items-center justify-center font-sans font-bold">8</span>
              MADDE 11, 12, 13 – Ürün İadesi, Kargo Ücreti ve Bedel İadesi
            </h2>
            <p>
              Alıcı, cayma bildirimini ilettiği tarihten itibaren <strong>14 gün içerisinde</strong> ürünü anlaşmalı kargo ile geri gönderir. Anlaşmalı kargo şirketiyle yapılan cayma hakkı kapsamındaki iadelerde <strong>iade kargo ücretini HAQAN Wear karşılar</strong>.
            </p>
            <p>
              Satıcı, iade edilmesi gereken bedelleri en geç 14 gün içerisinde, Alıcı’nın satın alma sırasında kullandığı ödeme aracına uygun şekilde (iyzico üzerinden) tek seferde ve ek masraf yüklemeden geri öder.
            </p>
          </section>

          {/* MADDE 14, 15, 16 – DENEME, İSTİSNALAR VE İNDİRİMLİ ÜRÜNLER */}
          <section className="space-y-3">
            <h2 className="font-serif text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#4A5D3E]/10 text-[#4A5D3E] text-xs flex items-center justify-center font-sans font-bold">9</span>
              MADDE 14, 15, 16 – Ürünün Denenmesi, İstisnalar ve İndirimli Ürünler
            </h2>
            <p>
              Bir giyim ürününün yalnızca denenmiş olması cayma hakkını ortadan kaldırmaz. Ancak ürünün günlük kullanımda giyilmesi, yıkanması veya kalıcı deformasyona uğraması halinde değer kaybı mevzuata göre belirlenir.
            </p>
            <p>
              Kişiye özel üretilen/kişiselleştirilen ürünler ile hijyen bandı açılmış iç giyim/sağlık ürünleri haricindeki tüm tekstil ürünlerinde ve indirimli/kampanyalı ürünlerde 14 günlük kanuni cayma hakkı eksiksiz geçerlidir.
            </p>
          </section>

          {/* MADDE 17 & 18 – DEĞİŞİM VE AYIPLI ÜRÜN */}
          <section className="space-y-3">
            <h2 className="font-serif text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#4A5D3E]/10 text-[#4A5D3E] text-xs flex items-center justify-center font-sans font-bold">10</span>
              MADDE 17, 18 – Beden/Renk Değişimi ve Ayıplı Ürün Hakları
            </h2>
            <p>
              HAQAN Wear, müşterilerine stok dahilinde ücretsiz anlaşmalı kargo ile beden ve renk değişimi imkanı sunar.
            </p>
            <p>
              Teslim edilen ürünün ayıplı veya kusurlu olması durumunda 6502 sayılı Kanun kapsamındaki kanuni haklar geçerlidir ve ayıplı mala ilişkin haklar 14 günlük cayma süresiyle sınırlı değildir.
            </p>
          </section>

          {/* MADDE 19, 20, 21, 22 – İFA İMKÂNSIZLIĞI, MÜCBİR SEBEP, KVKK */}
          <section className="space-y-3">
            <h2 className="font-serif text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#4A5D3E]/10 text-[#4A5D3E] text-xs flex items-center justify-center font-sans font-bold">11</span>
              MADDE 19, 20, 21, 22 – İfa Şartları, Mücbir Sebepler ve Kişisel Veriler
            </h2>
            <p>
              Sipariş konusu ürünün ifasının imkânsızlaşması durumunda 3 gün içinde Alıcı'ya bildirilerek 14 gün içinde bedel iadesi yapılır. Kişisel veriler 6698 sayılı KVKK ve <Link href="/kvkk" className="text-[#4A5D3E] underline font-medium">KVKK Aydınlatma Metni</Link> uyarınca işlenir.
            </p>
          </section>

          {/* MADDE 23, 24, 25, 26 – UYUŞMAZLIKLAR VE YÜRÜRLÜK */}
          <section className="space-y-4 pt-4 border-t border-gray-100">
            <h2 className="font-serif text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#4A5D3E]/10 text-[#4A5D3E] text-xs flex items-center justify-center font-sans font-bold">12</span>
              MADDE 23, 24, 25, 26 – Uyuşmazlıkların Çözümü ve Yürürlük
            </h2>
            <p>
              İşbu Sözleşme’den doğan uyuşmazlıklarda Ticaret Bakanlığı’nca ilan edilen parasal sınırlar dahilinde Alıcı’nın veya Satıcı’nın yerleşim yerindeki <strong>Tüketici Hakem Heyetleri</strong> ve <strong>Tüketici Mahkemeleri</strong> yetkilidir.
            </p>
            <p>
              İşbu Sözleşme, Alıcı’nın siparişi elektronik ortamda onaylaması ve siparişin Satıcı sistemine ulaşmasıyla yürürlüğe girer.
            </p>

            <div className="bg-gray-50 rounded-2xl p-5 border border-gray-200 mt-4">
              <h3 className="font-bold text-gray-900 mb-2">SÖZLEŞME TARAFLARI:</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm text-gray-700">
                <div>
                  <p className="font-bold text-gray-900">SATICI:</p>
                  <p>Hakan Yeşildağ (HAQAN Wear)</p>
                  <p>VKN: 9510670940 (23 Temmuz VD)</p>
                  <p>Zülüflühan Mah. Eski İskenderun Yolu Cad. No: 55 B, Antakya/Hatay</p>
                  <p>Tel: 0531 714 66 27 | hakanyesildag91@gmail.com</p>
                </div>
                <div>
                  <p className="font-bold text-gray-900">ALICI:</p>
                  <p>Ad Soyad: [Sipariş sırasında oluşturulur]</p>
                  <p>Sipariş No & Tarihi: [Otomatik oluşturulur]</p>
                  <p>Teslimat Adresi: [Sipariş sırasında oluşturulur]</p>
                  <p>Ödeme Altyapısı: iyzico (PCI-DSS Güvenli)</p>
                </div>
              </div>
            </div>
          </section>

        </div>
      </div>
    </main>
  );
}
