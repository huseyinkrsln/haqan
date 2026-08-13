import type { Metadata } from "next";
import { RotateCcw, CheckCircle, XCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "İade ve Değişim",
  description: "Haqan Wear iade ve değişim politikası. 14 gün içinde kolay iade.",
};

const steps = [
  { step: "01", title: "İade Talebi Oluşturun", desc: "Hesabım > Siparişlerim bölümünden iade etmek istediğiniz ürünü seçin ve talebi başlatın." },
  { step: "02", title: "Onay Bekleyin", desc: "Talebiniz 1 iş günü içinde değerlendirilir ve size ücretsiz kargo kodu e-posta ile iletilir." },
  { step: "03", title: "Ürünü Gönderin", desc: "Ürünü orijinal ambalajında ve etiketiyle birlikte belirtilen adrese kargolayın." },
  { step: "04", title: "Para İadesini Alın", desc: "Ürün tarafımıza ulaştıktan sonra 3-7 iş günü içinde ödemeniz iade edilir." },
];

const acceptable = [
  "Kullanılmamış, etiketli ürünler",
  "Teslimattan itibaren 14 gün içinde talepler",
  "Orijinal ambalajında ürünler",
  "Ürün veya beden hatası nedeniyle iadeler",
];

const notAcceptable = [
  "Kullanılmış veya yıkanmış ürünler",
  "Etiketi kesilmiş ürünler",
  "14 gün süre geçmiş talepler",
  "Özel indirimli koleksiyon ürünleri (son ürünler)",
  "İç giyim ve çorap kategorileri",
];

export default function ReturnsPage() {
  return (
    <main className="bg-[#F9F9FB]">
      {/* Header */}
      <section className="bg-zinc-950 py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <span className="text-[#a3b899] text-xs tracking-[0.4em] uppercase mb-3 block">14 Gün İçinde</span>
          <h1 className="font-playfair text-4xl md:text-5xl font-bold text-white">İade ve Değişim</h1>
          <p className="text-zinc-400 mt-4 max-w-xl">
            Haqan Wear'da müşteri memnuniyeti her şeyin önündedir. Beğenmediğiniz ürünü zahmetsizce iade edebilir veya değiştirebilirsiniz.
          </p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-6 md:px-8 py-16 space-y-16">

        {/* Steps */}
        <div>
          <h2 className="font-playfair text-2xl font-bold text-zinc-900 mb-8">İade Adımları</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((s) => (
              <div key={s.step} className="bg-white border border-zinc-200 p-6">
                <span className="font-playfair text-3xl font-bold text-[#a3b899] block mb-3">{s.step}</span>
                <h3 className="font-semibold text-zinc-900 mb-2 text-sm">{s.title}</h3>
                <p className="text-zinc-500 text-xs leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Policy */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white border border-zinc-200 p-8">
            <div className="flex items-center gap-3 mb-5">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <h3 className="font-semibold text-zinc-900">İade Kabul Koşulları</h3>
            </div>
            <ul className="space-y-3">
              {acceptable.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-zinc-600">
                  <span className="text-green-600 mt-0.5">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-white border border-zinc-200 p-8">
            <div className="flex items-center gap-3 mb-5">
              <XCircle className="h-5 w-5 text-red-500" />
              <h3 className="font-semibold text-zinc-900">İade Kabul Edilmeyen Durumlar</h3>
            </div>
            <ul className="space-y-3">
              {notAcceptable.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-zinc-600">
                  <span className="text-red-500 mt-0.5">✗</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Exchange */}
        <div className="bg-zinc-950 p-8">
          <div className="flex items-start gap-4">
            <RotateCcw className="h-8 w-8 text-[#a3b899] shrink-0 mt-1" />
            <div>
              <h2 className="font-playfair text-xl font-bold text-white mb-3">Değişim Politikası</h2>
              <p className="text-zinc-400 text-sm leading-relaxed mb-4">
                Satın aldığınız ürünü farklı bir beden veya renk ile değiştirmek isteyebilirsiniz. İade sürecini başlatırken "Değişim İstiyorum" seçeneğini işaretleyin ve istediğiniz bedeni/rengi belirtin.
              </p>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Değişim işlemleri stok durumuna göre gerçekleştirilir. Talep ettiğiniz ürün stokta yoksa para iadesi yapılır.
              </p>
            </div>
          </div>
        </div>

        {/* Contact CTA */}
        <div className="border border-zinc-300 p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-semibold text-zinc-900">Yardıma mı ihtiyacınız var?</h3>
            <p className="text-zinc-500 text-sm">İade sürecinde herhangi bir sorun yaşarsanız müşteri hizmetlerimize ulaşın.</p>
          </div>
          <a href="/contact" className="shrink-0 bg-zinc-900 text-white px-6 py-3 text-sm uppercase tracking-wider hover:bg-zinc-700 transition-colors">
            Bize Ulaşın
          </a>
        </div>
      </section>
    </main>
  );
}
