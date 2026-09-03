import type { Metadata } from "next";
import Link from "next/link";
import { Mail, MessageSquare, ShieldCheck, CheckSquare, BellRing } from "lucide-react";

export const metadata: Metadata = {
  title: "Ticari Elektronik İleti Onay Metni",
  description: "HAQAN Wear Ticari Elektronik İleti Onay Metni, SMS ve E-posta İletişim İzinleri.",
};

export default function ElectronicConsentPage() {
  return (
    <main className="bg-[#FAF9F6] min-h-screen py-10 md:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8">
        
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-gray-500 mb-6">
          <Link href="/" className="hover:text-gray-900 transition-colors">Ana Sayfa</Link>
          <span>/</span>
          <span className="text-gray-900 font-semibold">Ticari Elektronik İleti Onay Metni</span>
        </nav>

        {/* Header */}
        <div className="bg-white rounded-3xl border border-gray-200/80 p-6 sm:p-10 shadow-xs mb-8">
          <div className="flex items-center gap-3 text-[#4A5D3E] mb-3">
            <BellRing size={24} className="shrink-0" />
            <span className="text-xs uppercase tracking-widest font-bold">İletişim İzinleri & Tercihler</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
            HAQAN WEAR TİCARİ ELEKTRONİK İLETİ ONAY METNİ
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-2">
            Son Güncelleme Tarihi: 3 Eylül 2026 — 6563 Sayılı Elektronik Ticaretin Düzenlenmesi Hakkında Kanun Kapsamında
          </p>
        </div>

        {/* Content */}
        <div className="bg-white rounded-3xl border border-gray-200/80 p-6 sm:p-10 shadow-xs space-y-8 text-sm text-gray-700 leading-relaxed">
          
          <p className="text-xs sm:text-sm text-gray-600 bg-gray-50 p-4 rounded-2xl border border-gray-200/60">
            İşbu Ticari Elektronik İleti Onay Metni, HAQAN Wear markası altında faaliyet gösteren Hakan Yeşildağ tarafından gönderilecek reklam ve pazarlama amaçlı ticari elektronik iletilere ilişkin kullanıcı onayının kapsamını düzenler.
          </p>

          {/* 1. HİZMET SAĞLAYICI BİLGİLERİ */}
          <section className="space-y-3">
            <h2 className="font-serif text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#4A5D3E]/10 text-[#4A5D3E] text-xs flex items-center justify-center font-sans font-bold">1</span>
              Hizmet Sağlayıcı Bilgileri
            </h2>
            <div className="bg-gray-50 border border-gray-200/70 rounded-2xl p-4 sm:p-5 text-xs sm:text-sm space-y-1.5 text-gray-800">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <p><strong>Hizmet Sağlayıcı:</strong> Hakan Yeşildağ</p>
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

          {/* 2. TİCARİ ELEKTRONİK İLETİLERİN KAPSAMI */}
          <section className="space-y-3">
            <h2 className="font-serif text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#4A5D3E]/10 text-[#4A5D3E] text-xs flex items-center justify-center font-sans font-bold">2</span>
              Ticari Elektronik İletilerin Kapsamı
            </h2>
            <p>
              Kullanıcının ayrıca onay vermesi halinde HAQAN Wear tarafından; kampanyalar, indirimler, yeni ürünler ve koleksiyonlar, promosyonlar, kuponlar, özel teklifler, dönemsel fırsatlar, ürün ve marka tanıtımları, reklam ve diğer pazarlama faaliyetleri hakkında ticari elektronik ileti gönderilir.
            </p>
            <p className="text-xs text-gray-500">
              Ticari elektronik iletiler yalnızca kullanıcının ayrıca onay verdiği iletişim kanalı veya kanalları üzerinden gönderilir.
            </p>
          </section>

          {/* 3 & 4. SMS VE E-POSTA İLETİŞİM İZNİ */}
          <section className="space-y-3">
            <h2 className="font-serif text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#4A5D3E]/10 text-[#4A5D3E] text-xs flex items-center justify-center font-sans font-bold">3</span>
              SMS ve E-Posta İletişim İzni
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200">
                <div className="flex items-center gap-2 text-gray-900 font-bold mb-1.5 text-xs sm:text-sm">
                  <MessageSquare size={16} className="text-[#4A5D3E]" /> SMS İletişim İzni
                </div>
                <p className="text-xs text-gray-600">
                  Kullanıcının onay vermesi halinde telefon numarasına ticari SMS gönderilebilir. İzin verilmemişse reklam amaçlı SMS gönderilmez.
                </p>
              </div>
              <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200">
                <div className="flex items-center gap-2 text-gray-900 font-bold mb-1.5 text-xs sm:text-sm">
                  <Mail size={16} className="text-[#4A5D3E]" /> E-Posta İletişim İzni
                </div>
                <p className="text-xs text-gray-600">
                  Kullanıcının onay vermesi halinde e-posta adresine bülten ve fırsat e-postaları gönderilebilir. SMS ve e-posta izinleri birbirinden tamamen bağımsızdır.
                </p>
              </div>
            </div>
          </section>

          {/* 5. ONAYIN İSTEĞE BAĞLI OLMASI */}
          <section className="space-y-3">
            <h2 className="font-serif text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#4A5D3E]/10 text-[#4A5D3E] text-xs flex items-center justify-center font-sans font-bold">4</span>
              Onayın Tamamen İsteğe Bağlı Olması
            </h2>
            <p>
              Ticari elektronik ileti onayı tamamen isteğe bağlıdır. Kullanıcının SMS veya e-posta reklam izni vermemesi; üye olmasını, sipariş vermesini, ödeme yapmasını veya cayma/iade haklarını kullanmasını kesinlikle engellemez.
            </p>
            <p className="text-xs text-gray-500">
              Ticari elektronik ileti izni alışverişin veya üyeliğin zorunlu bir şartı değildir. Kutular önceden işaretli olarak sunulmaz.
            </p>
          </section>

          {/* 6 & 7. SİPARİŞ BİLDİRİMLERİ VE KARGO İLETİŞİMİ */}
          <section className="space-y-3">
            <h2 className="font-serif text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#4A5D3E]/10 text-[#4A5D3E] text-xs flex items-center justify-center font-sans font-bold">5</span>
              Sipariş / Hizmet Bildirimleri ve Kargo İletişimi
            </h2>
            <p>
              Reklam ve pazarlama amaçlı ticari elektronik ileti onayı ile siparişin veya hizmetin yürütülmesi için gerekli operasyonel bildirimler (sipariş onayı, kargo takip numarası, fatura, iptal/iade durumu) birbirinden tamamen ayrıdır.
            </p>
            <p className="text-xs text-gray-600">
              Kargo teslimatı ve işlem güvenliği amacıyla yapılan zorunlu bilgilendirmeler için pazarlama onayı aranmaz ve bu bildirimlerde reklam içeriği kullanılmaz.
            </p>
          </section>

          {/* 8. ONAYIN GERİ ALINMASI & İYS */}
          <section className="space-y-3">
            <h2 className="font-serif text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#4A5D3E]/10 text-[#4A5D3E] text-xs flex items-center justify-center font-sans font-bold">6</span>
              Onayın Geri Alınması ve İleti Yönetim Sistemi (İYS)
            </h2>
            <p>
              Kullanıcı, verdiği ticari elektronik ileti onayını hiçbir gerekçe göstermeksizin ve ücretsiz olarak dilediği an geri alabilir.
            </p>
            <p>
              Gönderilen iletilerdeki abonelikten çıkma / ret bağlantıları üzerinden veya <strong>İleti Yönetim Sistemi (İYS)</strong> üzerinden tercihler kolayca yönetilebilir.
            </p>
          </section>

          {/* 9, 10, 11, 12, 13. ONAY BEYANLARI VE KAYITLAR */}
          <section className="space-y-4 pt-4 border-t border-gray-100">
            <h2 className="font-serif text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#4A5D3E]/10 text-[#4A5D3E] text-xs flex items-center justify-center font-sans font-bold">7</span>
              Onay Beyanları ve Yürürlük
            </h2>
            
            <div className="space-y-3">
              <div className="p-4 bg-gray-50 border border-gray-200 rounded-2xl text-xs sm:text-sm text-gray-700 space-y-1">
                <p className="font-bold text-gray-900">SMS Onay Beyanı:</p>
                <p className="italic">
                  “HAQAN Wear tarafından telefon numarama kampanya, indirim, yeni ürün, koleksiyon, promosyon, kupon, özel teklif, reklam ve pazarlama amaçlı ticari elektronik SMS gönderilmesine onay veriyorum.”
                </p>
              </div>

              <div className="p-4 bg-gray-50 border border-gray-200 rounded-2xl text-xs sm:text-sm text-gray-700 space-y-1">
                <p className="font-bold text-gray-900">E-Posta Onay Beyanı:</p>
                <p className="italic">
                  “HAQAN Wear tarafından e-posta adresime kampanya, indirim, yeni ürün, koleksiyon, promosyon, kupon, özel teklif, reklam ve pazarlama amaçlı ticari elektronik ileti gönderilmesine onay veriyorum.”
                </p>
              </div>
            </div>

            <p className="text-xs text-gray-500 mt-3">
              Kişisel verileriniz hakkında ayrıntılı bilgi için <Link href="/kvkk" className="text-[#4A5D3E] underline font-medium">KVKK Aydınlatma Metni</Link>’ni inceleyebilirsiniz.
            </p>
          </section>

        </div>
      </div>
    </main>
  );
}
