import type { Metadata } from "next";
import Link from "next/link";
import { FileText, ShieldCheck, Truck, RotateCcw, AlertCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Mesafeli Satış Sözleşmesi ve Ön Bilgilendirme Formu",
  description: "HAQAN Wear 6502 Sayılı Tüketicinin Korunması Hakkında Kanun Kapsamında Mesafeli Satış Sözleşmesi ve Ön Bilgilendirme Koşulları.",
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
            <span className="text-xs uppercase tracking-widest font-bold">Tüketici Hakları & Yasal Koşullar</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
            Mesafeli Satış Sözleşmesi ve Ön Bilgilendirme Koşulları
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-2">
            6502 Sayılı Tüketicinin Korunması Hakkında Kanun ve Mesafeli Sözleşmeler Yönetmeliği Uyarınca Düzenlenmiştir
          </p>
        </div>

        {/* Content */}
        <div className="bg-white rounded-3xl border border-gray-200/80 p-6 sm:p-10 shadow-xs space-y-8 text-sm text-gray-700 leading-relaxed">
          
          {/* Madde 1 */}
          <section className="space-y-3">
            <h2 className="font-serif text-lg sm:text-xl font-bold text-gray-900">
              1. Taraflar
            </h2>
            
            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-5 space-y-3 text-xs sm:text-sm">
              <h3 className="font-bold text-gray-900 text-sm">SATICI BİLGİLERİ:</h3>
              <p><strong>Unvan / Ad Soyad:</strong> Hakan Yeşildağ (HAQAN Wear)</p>
              <p><strong>Vergi Dairesi & No:</strong> 23 Temmuz Vergi Dairesi — 9510670940</p>
              <p><strong>Adres:</strong> Zülüflühan Mah. Eski İskenderun Yolu Cad. No: 55 B, Antakya / Hatay</p>
              <p><strong>Telefon:</strong> 0531 714 66 27</p>
              <p><strong>E-posta:</strong> hakanyesildag91@gmail.com</p>
              <p><strong>İnternet Sitesi:</strong> www.haqanwear.com</p>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-5 space-y-2 text-xs sm:text-sm mt-3">
              <h3 className="font-bold text-gray-900 text-sm">ALICI (TÜKETİCİ) BİLGİLERİ:</h3>
              <p>www.haqanwear.com internet sitesinden sipariş oluşturan, ödeme yapan ve teslimat bilgisi veren gerçek kişi.</p>
            </div>
          </section>

          {/* Madde 2 */}
          <section className="space-y-3">
            <h2 className="font-serif text-lg sm:text-xl font-bold text-gray-900">
              2. Sözleşmenin Konusu
            </h2>
            <p>
              İşbu sözleşmenin konusu, ALICI'nın SATICI'ya ait www.haqanwear.com internet sitesinden elektronik ortamda siparişini verdiği, sitede nitelikleri ve satış fiyatı belirtilen ürünün satışı ve teslimi ile ilgili olarak 6502 Sayılı Tüketicinin Korunması Hakkında Kanun ve Mesafeli Sözleşmelere Dair Yönetmelik hükümleri gereğince tarafların hak ve yükümlülüklerinin saptanmasıdır.
            </p>
          </section>

          {/* Madde 3 */}
          <section className="space-y-3">
            <h2 className="font-serif text-lg sm:text-xl font-bold text-gray-900">
              3. Ödeme ve Güvenlik Koşulları (iyzico Sanal POS)
            </h2>
            <p>
              Ödemeler, kredi kartı veya banka kartı ile güvenli ödeme altyapısı sağlayıcısı <strong>iyzico (iyzi Ödeme ve Elektronik Para Hizmetleri A.Ş.)</strong> üzerinden 256-Bit SSL şifreleme ve 3D Secure onay mekanizmasıyla gerçekleştirilir.
            </p>
            <p className="text-xs text-gray-600">
              Alıcı, sipariş ödemesini tamamladığında ürün bedelinin tahsil edildiğini ve sipariş sürecinin başladığını kabul eder.
            </p>
          </section>

          {/* Madde 4 */}
          <section className="space-y-3">
            <h2 className="font-serif text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2">
              <Truck size={18} className="text-[#4A5D3E]" />
              4. Teslimat Koşulları
            </h2>
            <p>
              Sipariş edilen ürünler, sipariş onayından itibaren yasal 30 günlük süreyi aşmamak koşuluyla anlaşmalı kargo firmaları aracılığıyla ALICI'nın belirttiği teslimat adresine güvenle ulaştırılır.
            </p>
            <p className="text-xs text-gray-600">
              Kargo teslimatı sırasında paketin hasarlı olması durumunda kargo görevlisine "Hasar Tespit Tutanağı" tutturulmalıdır.
            </p>
          </section>

          {/* Madde 5 */}
          <section className="space-y-3">
            <h2 className="font-serif text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2">
              <RotateCcw size={18} className="text-[#4A5D3E]" />
              5. Cayma Hakkı (İade ve Değişim Koşulları)
            </h2>
            <p>
              ALICI, hiçbir hukuki ve cezai sorumluluk üstlenmeksizin ve hiçbir gerekçe göstermeksizin, satın aldığı ürünü teslim aldığı tarihten itibaren <strong>14 (on dört) gün içerisinde</strong> cayma hakkını kullanarak iade etme hakkına sahiptir.
            </p>
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-xs sm:text-sm text-amber-900 space-y-1">
              <p className="font-bold flex items-center gap-1.5">
                <AlertCircle size={15} /> İade Koşulları:
              </p>
              <p>
                İade edilecek ürünlerin orijinal ambalajında, etiketleri sökülmemiş, kullanılmamış, yıkanmamış ve yeniden satılabilir özelliğini kaybetmemiş olması gerekmektedir.
              </p>
            </div>
            <p className="text-xs text-gray-600">
              İade onaylandıktan sonra ürün bedeli, ödemenin yapıldığı karta en geç 14 gün içerisinde iyzico aracılığıyla eksiksiz olarak iade edilir.
            </p>
          </section>

          {/* Madde 6 */}
          <section className="space-y-3 pt-4 border-t border-gray-100">
            <h2 className="font-serif text-lg sm:text-xl font-bold text-gray-900">
              6. Uyuşmazlıkların Çözümü
            </h2>
            <p>
              İşbu sözleşmeden doğabilecek uyuşmazlıklarda, Ticaret Bakanlığı'nca ilan edilen değere kadar Tüketici Hakem Heyetleri ile ALICI'nın veya SATICI'nın yerleşim yerindeki Tüketici Mahkemeleri yetkilidir.
            </p>
          </section>

        </div>
      </div>
    </main>
  );
}
