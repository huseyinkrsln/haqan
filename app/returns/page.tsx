import type { Metadata } from "next";
import Link from "next/link";
import { RotateCcw, ShieldCheck, Truck, Clock, RefreshCw, AlertCircle, HelpCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "İptal, İade ve Değişim Politikası",
  description: "HAQAN Wear 14 Günlük Koşulsuz Cayma, İptal, İade ve Değişim Koşulları ve Yasal Haklar.",
};

export default function ReturnsPage() {
  return (
    <main className="bg-[#FAF9F6] min-h-screen py-10 md:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8">
        
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-gray-500 mb-6">
          <Link href="/" className="hover:text-gray-900 transition-colors">Ana Sayfa</Link>
          <span>/</span>
          <span className="text-gray-900 font-semibold">İptal, İade ve Değişim Politikası</span>
        </nav>

        {/* Header */}
        <div className="bg-white rounded-3xl border border-gray-200/80 p-6 sm:p-10 shadow-xs mb-8">
          <div className="flex items-center gap-3 text-[#4A5D3E] mb-3">
            <RotateCcw size={24} className="shrink-0" />
            <span className="text-xs uppercase tracking-widest font-bold">Müşteri Hakları & Güvence</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
            HAQAN WEAR İPTAL, İADE VE DEĞİŞİM POLİTİKASI
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-2">
            Son Güncelleme Tarihi: 3 Eylül 2026 — 6502 Sayılı Kanun ve Mesafeli Sözleşmeler Yönetmeliği Uyarınca
          </p>
        </div>

        {/* Hızlı Özet Kartları */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-2xs text-center">
            <Clock className="w-7 h-7 text-[#4A5D3E] mx-auto mb-2" />
            <p className="font-bold text-gray-900 text-sm">14 Gün Cayma Hakkı</p>
            <p className="text-xs text-gray-500 mt-1">Gerekçe göstermeksizin ve cezasız iade hakkı.</p>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-2xs text-center">
            <Truck className="w-7 h-7 text-[#4A5D3E] mx-auto mb-2" />
            <p className="font-bold text-gray-900 text-sm">Ücretsiz İade Kargo</p>
            <p className="text-xs text-gray-500 mt-1">Anlaşmalı kargomuzla iade kargo ücreti HAQAN Wear'a aittir.</p>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-2xs text-center">
            <RefreshCw className="w-7 h-7 text-[#4A5D3E] mx-auto mb-2" />
            <p className="font-bold text-gray-900 text-sm">Kolay Beden/Renk Değişimi</p>
            <p className="text-xs text-gray-500 mt-1">Stoktaki beden veya renk alternatifleriyle hızlı değişim.</p>
          </div>
        </div>

        {/* Tam Yasal Metin (20 Madde) */}
        <div className="bg-white rounded-3xl border border-gray-200/80 p-6 sm:p-10 shadow-xs space-y-8 text-sm text-gray-700 leading-relaxed">
          
          <p className="text-xs sm:text-sm text-gray-600 italic bg-gray-50 p-4 rounded-2xl border border-gray-200/60">
            İşbu İptal, İade ve Değişim Politikası, HAQAN Wear markası altında faaliyet gösteren Hakan Yeşildağ tarafından işletilen www.haqanwear.com üzerinden gerçekleştirilen alışverişlerde uygulanacak iptal, cayma, iade ve değişim koşullarını düzenler. Bu Politika, 6502 sayılı Tüketicinin Korunması Hakkında Kanun, Mesafeli Sözleşmeler Yönetmeliği ve ilgili mevzuata uygun olarak uygulanır.
          </p>

          {/* 1. SATICI BİLGİLERİ */}
          <section className="space-y-3">
            <h2 className="font-serif text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#4A5D3E]/10 text-[#4A5D3E] text-xs flex items-center justify-center font-sans font-bold">1</span>
              Satıcı Bilgileri
            </h2>
            <div className="bg-gray-50 border border-gray-200/70 rounded-2xl p-4 sm:p-5 text-xs sm:text-sm space-y-1.5 text-gray-800">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <p><strong>Satıcı / Veri Sorumlusu:</strong> Hakan Yeşildağ</p>
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

          {/* 2. SİPARİŞ İPTALİ */}
          <section className="space-y-3">
            <h2 className="font-serif text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#4A5D3E]/10 text-[#4A5D3E] text-xs flex items-center justify-center font-sans font-bold">2</span>
              Sipariş İptali
            </h2>
            <p>Müşteri, siparişi kargoya teslim edilmeden önce siparişinin iptalini talep edebilir.</p>
            <p>İptal talebi;</p>
            <ul className="list-disc pl-5 space-y-1 text-gray-600">
              <li><strong>E-posta:</strong> <a href="mailto:hakanyesildag91@gmail.com" className="text-[#4A5D3E] underline">hakanyesildag91@gmail.com</a></li>
              <li><strong>Telefon:</strong> 0531 714 66 27</li>
            </ul>
            <p>üzerinden HAQAN Wear’a iletilir. İptal talebinde sipariş numarası ile siparişi veren kişinin ad ve soyadı belirtilir.</p>
            <p>Sipariş bedeli tahsil edilmiş ve sipariş kargoya verilmeden iptal edilmişse tahsil edilen bedel, müşterinin ödeme yaptığı ödeme aracına uygun şekilde iade edilir.</p>
            <p className="text-xs text-gray-500">Siparişin kargoya teslim edilmiş olması, tüketicinin kanundan kaynaklanan cayma hakkını ortadan kaldırmaz.</p>
          </section>

          {/* 3. 14 GÜNLÜK CAYMA VE İADE HAKKI */}
          <section className="space-y-3">
            <h2 className="font-serif text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#4A5D3E]/10 text-[#4A5D3E] text-xs flex items-center justify-center font-sans font-bold">3</span>
              14 Günlük Cayma ve İade Hakkı
            </h2>
            <p>
              Tüketici, cayma hakkının kanuni istisnaları dışında, www.haqanwear.com üzerinden satın aldığı ürünü teslim aldığı tarihten itibaren <strong>14 gün içerisinde herhangi bir gerekçe göstermeksizin ve cezai şart ödemeksizin</strong> sözleşmeden cayabilir.
            </p>
            <p>Tüketicinin iade nedeni belirtmesi zorunlu değildir. Ürünün;</p>
            <ul className="list-disc pl-5 space-y-1 text-gray-600">
              <li>bedeninin uygun olmaması,</li>
              <li>renginin beğenilmemesi,</li>
              <li>kalıbının uygun bulunmaması,</li>
              <li>tüketicinin ürünü beğenmemesi,</li>
              <li>tüketicinin satın alma kararından vazgeçmesi</li>
            </ul>
            <p>veya herhangi başka bir neden belirtilmesi gerekmez. Tüketici hiçbir neden göstermeden de cayma hakkını kullanabilir.</p>
            <p className="text-xs text-gray-500">
              Tüketici, ürün henüz kendisine teslim edilmemiş olsa dahi sözleşmenin kurulması ile ürünün teslimi arasındaki dönemde cayma hakkını kullanabilir. Cayma hakkının kullanılması için tüketicinin 14 günlük süre içerisinde HAQAN Wear’a cayma bildirimini göndermesi yeterlidir.
            </p>
          </section>

          {/* 4. CAYMA VE İADE BİLDİRİMİ */}
          <section className="space-y-3">
            <h2 className="font-serif text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#4A5D3E]/10 text-[#4A5D3E] text-xs flex items-center justify-center font-sans font-bold">4</span>
              Cayma ve İade Bildirimi
            </h2>
            <p>Tüketici cayma veya iade talebini aşağıdaki e-posta adresine gönderir:</p>
            <p className="font-semibold text-gray-900">E-posta: hakanyesildag91@gmail.com</p>
            <p>Yazılı bildirim aşağıdaki adrese de gönderilebilir:</p>
            <div className="bg-gray-50 p-3 rounded-xl border border-gray-200 text-xs sm:text-sm">
              <strong>Hakan Yeşildağ – HAQAN Wear</strong><br />
              Zülüflühan Mah. Eski İskenderun Yolu Cad. No: 55 B, Antakya / Hatay
            </div>
            <p className="text-xs text-gray-500">
              Cayma bildiriminin işleme alınabilmesi için müşterinin kimliğinin ve ilgili siparişin belirlenebilmesini sağlayacak bilgilerin bildirimde bulunması gerekir. Müşteriden cayma hakkını kullanmasının gerekçesini açıklaması istenmez.
            </p>
          </section>

          {/* 5. İADE EDİLECEK ÜRÜNÜN GÖNDERİLMESİ */}
          <section className="space-y-3">
            <h2 className="font-serif text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#4A5D3E]/10 text-[#4A5D3E] text-xs flex items-center justify-center font-sans font-bold">5</span>
              İade Edilecek Ürünün Gönderilmesi
            </h2>
            <p>
              Tüketici, cayma bildirimini HAQAN Wear’a gönderdiği tarihten itibaren <strong>14 gün içerisinde</strong> ürünü geri gönderir.
            </p>
            <p>
              HAQAN Wear, müşteriye anlaşmalı iade kargo şirketini ve gerekli gönderim bilgilerini bildirir. Tüketici, HAQAN Wear tarafından belirtilen anlaşmalı kargo şirketi üzerinden iade gönderimini gerçekleştirir. Anlaşmalı kargo şirketinin değişmesi halinde HAQAN Wear müşteriye güncel kargo şirketini ve gönderim bilgilerini bildirir.
            </p>
          </section>

          {/* 6. İADE KARGO ÜCRETİ */}
          <section className="space-y-3">
            <h2 className="font-serif text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#4A5D3E]/10 text-[#4A5D3E] text-xs flex items-center justify-center font-sans font-bold">6</span>
              İade Kargo Ücreti
            </h2>
            <p>
              Tüketici, HAQAN Wear tarafından bildirilen anlaşmalı kargo şirketini kullanarak yaptığı cayma hakkı kapsamındaki iadelerde <strong>iade kargo ücreti ödemez</strong>. İade kargo ücreti HAQAN Wear tarafından karşılanır.
            </p>
            <p>
              HAQAN Wear tarafından iade için bir kargo şirketinin belirtilmemiş olması halinde tüketiciden iade kargo ücreti talep edilmez.
            </p>
            <p>
              Ürünün ayıplı olması, kusurlu olması, yanlış ürün gönderilmesi, yanlış beden/renk gönderilmesi, eksik ürün gönderilmesi durumlarında iade, değişim ve doğru ürünün yeniden gönderilmesinden kaynaklanan standart kargo ücretleri HAQAN Wear tarafından karşılanır.
            </p>
          </section>

          {/* 7 & 8. ÜRÜNÜN DENENMESİ VE KULLANILMIŞ ÜRÜNLER */}
          <section className="space-y-3">
            <h2 className="font-serif text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#4A5D3E]/10 text-[#4A5D3E] text-xs flex items-center justify-center font-sans font-bold">7</span>
              Ürünün Denenmesi ve Değer Kaybı
            </h2>
            <p>
              Tüketici, satın aldığı giyim ürününü niteliğini, bedenini, kalıbını, rengini ve kendisine uygunluğunu tespit etmek amacıyla <strong>makul ölçüde deneyebilir. Ürünün yalnızca denenmiş olması cayma hakkını ortadan kaldırmaz.</strong>
            </p>
            <p>
              Ancak ürünün günlük kullanım amacıyla giyilmiş olması, yıkanmış olması, kirletilmiş olması, üzerinde kalıcı leke/koku oluşması veya fiziksel deformasyon meydana gelmesi halinde ürünün durumundan kaynaklanan değer azalması mevzuat hükümleri doğrultusunda tüketicinin sorumluluğunda olabilir.
            </p>
          </section>

          {/* 9. ETİKET VE AMBALAJ */}
          <section className="space-y-3">
            <h2 className="font-serif text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#4A5D3E]/10 text-[#4A5D3E] text-xs flex items-center justify-center font-sans font-bold">8</span>
              Etiket ve Ambalaj
            </h2>
            <p>
              Müşterinin ürünü etiketi, varsa aksesuarları ve orijinal ambalajıyla birlikte göndermesi iade işleminin sağlıklı yürütülmesini sağlar. Ancak yalnızca ürün etiketinin çıkarılmış veya ambalajının açılmış olması, ürün kanuni bir cayma hakkı istisnasına girmediği sürece tüketicinin cayma hakkını otomatik olarak ortadan kaldırmaz.
            </p>
          </section>

          {/* 10. CAYMA HAKKININ KULLANILAMAYACAĞI ÜRÜNLER */}
          <section className="space-y-3">
            <h2 className="font-serif text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#4A5D3E]/10 text-[#4A5D3E] text-xs flex items-center justify-center font-sans font-bold">9</span>
              Cayma Hakkının Kullanılamayacağı Ürünler
            </h2>
            <p>Mesafeli Sözleşmeler Yönetmeliği’nde cayma hakkının istisnası olarak düzenlenen ürünlerde cayma hakkı kullanılamaz:</p>
            <ul className="list-disc pl-5 space-y-1 text-gray-600">
              <li>Tüketicinin isteği veya kişisel ihtiyaçları doğrultusunda özel olarak hazırlanan veya kişiselleştirilen ürünler.</li>
              <li>Tesliminden sonra ambalaj, bant, mühür veya paket gibi koruyucu unsurları açılmış ve iadesi sağlık veya hijyen açısından uygun olmayan ürünler.</li>
            </ul>
            <p className="text-xs text-gray-500">
              HAQAN Wear tarafından cayma hakkının bulunmadığı bir ürün satışa sunulursa, ürünün bu niteliği tüketiciye sipariş tamamlanmadan önce açıkça bildirilir. Bir ürünün yalnızca tekstil veya giyim ürünü olması cayma hakkını ortadan kaldırmaz.
            </p>
          </section>

          {/* 11. İNDİRİMLİ VE KAMPANYALI ÜRÜNLER */}
          <section className="space-y-3">
            <h2 className="font-serif text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#4A5D3E]/10 text-[#4A5D3E] text-xs flex items-center justify-center font-sans font-bold">10</span>
              İndirimli ve Kampanyalı Ürünler
            </h2>
            <p>
              İndirimli veya kampanyalı ürünlerde de tüketicinin kanuni cayma hakkı geçerlidir. Bir ürünün indirime girmiş olması, kampanya kapsamında satılması veya kupon kullanılarak satın alınması tek başına iade veya cayma hakkını ortadan kaldırmaz.
            </p>
          </section>

          {/* 12. BEDEN VE RENK DEĞİŞİMİ */}
          <section className="space-y-3">
            <h2 className="font-serif text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#4A5D3E]/10 text-[#4A5D3E] text-xs flex items-center justify-center font-sans font-bold">11</span>
              Beden ve Renk Değişimi
            </h2>
            <p>
              HAQAN Wear müşterilerine beden ve renk değişimi hizmeti sunar. Müşterinin talep ettiği beden veya renk stokta bulunuyorsa ürün değişimi yapılır. Talep edilen ürün stokta yoksa para iadesi yapılır.
            </p>
            <p className="text-xs text-gray-600">
              HAQAN Wear tarafından bildirilen anlaşmalı kargo şirketi kullanıldığında beden veya renk değişimine ilişkin standart kargo ücretleri HAQAN Wear tarafından karşılanır.
            </p>
          </section>

          {/* 13 & 14. YANLIŞ, EKSİK, AYIPLI ÜRÜNLER */}
          <section className="space-y-3">
            <h2 className="font-serif text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#4A5D3E]/10 text-[#4A5D3E] text-xs flex items-center justify-center font-sans font-bold">12</span>
              Yanlış, Eksik veya Ayıplı Ürünler
            </h2>
            <p>
              Müşteriye siparişinden farklı ürün, model, beden, renk veya adet gönderilmesi ya da ayıplı/kusurlu ürün teslim edilmesi halinde hata HAQAN Wear tarafından derhal giderilir. 14 günlük cayma süresinin sona ermesi tüketicinin ayıplı mala ilişkin kanuni haklarını ortadan kaldırmaz. Kargo masrafları HAQAN Wear'a aittir.
            </p>
          </section>

          {/* 15. ÜCRET İADESİ & İYZİCO */}
          <section className="space-y-3">
            <h2 className="font-serif text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#4A5D3E]/10 text-[#4A5D3E] text-xs flex items-center justify-center font-sans font-bold">13</span>
              Ücret İadesi ve iyzico Altyapısı
            </h2>
            <p>
              Tüketici cayma hakkını mevzuata uygun olarak kullandığında HAQAN Wear, tüketiciye iade edilmesi gereken ödemeleri yasal süre içerisinde geri öder.
            </p>
            <div className="bg-emerald-50/70 border border-emerald-200/60 rounded-2xl p-4 text-xs sm:text-sm text-emerald-950 space-y-1.5">
              <p className="font-bold text-emerald-900 flex items-center gap-2">
                <ShieldCheck size={16} /> iyzico Güvenli İade Süreci
              </p>
              <p>
                www.haqanwear.com üzerindeki elektronik ödeme işlemlerinde <strong>iyzico (iyzi Ödeme ve Elektronik Para Hizmetleri A.Ş.)</strong> ödeme altyapısı kullanılmaktadır. Kredi veya banka kartıyla gerçekleştirilen alışverişlerin iadeleri iyzico üzerinden ilgili ödeme aracına doğrudan yapılır. Tutarın müşterinin kartına yansıma süresi bankaların işlem prosedürüne bağlıdır.
              </p>
            </div>
          </section>

          {/* 16, 17, 18, 19, 20. DİĞER HÜKÜMLER VE İLETİŞİM */}
          <section className="space-y-4 pt-4 border-t border-gray-100">
            <h2 className="font-serif text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#4A5D3E]/10 text-[#4A5D3E] text-xs flex items-center justify-center font-sans font-bold">14</span>
              Yasal Haklar ve İletişim
            </h2>
            <p className="text-xs text-gray-600">
              İşbu Politika tüketicinin 6502 sayılı Tüketicinin Korunması Hakkında Kanun ve Mesafeli Sözleşmeler Yönetmeliği'nden kaynaklanan haklarını sınırlandırmaz.
            </p>
            
            <div className="bg-gray-50 rounded-2xl p-5 border border-gray-200">
              <h3 className="font-bold text-gray-900 mb-2">İptal, İade ve Değişim Talepleri İletişim Bilgileri:</h3>
              <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                <strong>Satıcı:</strong> Hakan Yeşildağ (HAQAN Wear)<br />
                <strong>Vergi Kimlik No:</strong> 9510670940 (23 Temmuz Vergi Dairesi)<br />
                <strong>Adres:</strong> Zülüflühan Mah. Eski İskenderun Yolu Cad. No: 55 B, Antakya / Hatay<br />
                <strong>Telefon:</strong> 0531 714 66 27<br />
                <strong>E-posta:</strong> <a href="mailto:hakanyesildag91@gmail.com" className="text-[#4A5D3E] underline font-medium">hakanyesildag91@gmail.com</a><br />
                <strong>Web Sitesi:</strong> www.haqanwear.com
              </p>
            </div>
          </section>

        </div>
      </div>
    </main>
  );
}
