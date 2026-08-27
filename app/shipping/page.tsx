"use client";

import { Truck, Clock, Shield } from "lucide-react";
import { useSiteSettings } from "@/hooks/useSiteSettings";

export default function ShippingPage() {
  const { data: settings } = useSiteSettings();

  const threshold = settings?.freeshippingthreshold || settings?.freeShippingThreshold || "1500";
  const flatRate = settings?.flatshippingrate || settings?.flatShippingRate || "79.90";

  const shippingOptions = [
    {
      name: "Standart Kargo",
      duration: "2-4 İş Günü",
      price: `${flatRate} ₺`,
      info: "Yurt içi tüm illere sabit ücretli teslimat.",
    },
    {
      name: "Ücretsiz Kargo",
      duration: "2-4 İş Günü",
      price: "Ücretsiz",
      info: `${threshold} TL ve üzeri tüm siparişlerde geçerlidir.`,
      highlight: true,
    },
    {
      name: "Ekspres Kargo",
      duration: "Ertesi İş Günü",
      price: "Özel Fiyat",
      info: "Saat 14:00'e kadar verilen siparişler için geçerlidir.",
    },
  ];

  return (
    <main className="bg-[#F9F9FB]">
      {/* Header */}
      <section className="bg-zinc-950 py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <span className="text-[#a3b899] text-xs tracking-[0.4em] uppercase mb-3 block">Teslimat</span>
          <h1 className="font-playfair text-4xl md:text-5xl font-bold text-white">Kargo ve Teslimat</h1>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-6 md:px-8 py-16 space-y-16">

        {/* Highlights */}
        <div className="grid sm:grid-cols-3 gap-6">
          {[
            { icon: Truck, title: "Ücretsiz Kargo", desc: `${threshold} TL ve üzeri siparişlerde` },
            { icon: Clock, title: "Hızlı Teslimat", desc: "1-3 iş günü ortalama süre" },
            { icon: Shield, title: "Güvenli Paket", desc: "Hasara karşı korumalı ambalaj" },
          ].map((item) => (
            <div key={item.title} className="bg-white border border-zinc-200 p-6 text-center rounded-xl">
              <item.icon className="h-8 w-8 text-[#4A5D3E] mx-auto mb-3" />
              <h3 className="font-semibold text-zinc-900 mb-1">{item.title}</h3>
              <p className="text-zinc-500 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Options */}
        <div>
          <h2 className="font-playfair text-2xl font-bold text-zinc-900 mb-6">Kargo Seçenekleri</h2>
          <div className="border border-zinc-200 divide-y divide-zinc-200 overflow-hidden">
            <div className="grid grid-cols-4 bg-zinc-950 text-zinc-300 text-xs uppercase tracking-wider px-6 py-3">
              <span>Kargo Tipi</span>
              <span>Süre</span>
              <span>Ücret</span>
              <span>Bilgi</span>
            </div>
            {shippingOptions.map((opt) => (
              <div
                key={opt.name}
                className={`grid grid-cols-4 px-6 py-5 text-sm items-start gap-4 ${opt.highlight ? "bg-[#a3b899]/5" : "bg-white"}`}
              >
                <span className={`font-medium ${opt.highlight ? "text-[#5a7a54]" : "text-zinc-800"}`}>{opt.name}</span>
                <span className="text-zinc-600">{opt.duration}</span>
                <span className={`font-medium ${opt.highlight ? "text-[#5a7a54]" : "text-zinc-800"}`}>{opt.price}</span>
                <span className="text-zinc-500">{opt.info}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Details */}
        <div>
          <h2 className="font-playfair text-2xl font-bold text-zinc-900 mb-6">Teslimat Detayları</h2>
          <div className="bg-white border border-zinc-200 p-8 space-y-6 text-sm text-zinc-600 leading-relaxed">
            <div>
              <h3 className="font-semibold text-zinc-900 mb-2">Sipariş Kesim Saati</h3>
              <p>Hafta içi saat <strong>14:00</strong>'e kadar verilen siparişler aynı gün kargoya teslim edilir. Bu saatten sonra verilen siparişler bir sonraki iş günü kargoya verilir. Cumartesi ve Pazar günleri kargo işlemi yapılmaz.</p>
            </div>
            <div>
              <h3 className="font-semibold text-zinc-900 mb-2">Teslimat Adresi</h3>
              <p>Siparişinizi yurt içindeki herhangi bir adrese teslim ettirebilirsiniz. Adres değişikliği için siparişiniz kargoya verilmeden önce müşteri hizmetleriyle iletişime geçmeniz gerekmektedir.</p>
            </div>
            <div>
              <h3 className="font-semibold text-zinc-900 mb-2">Kargo Firması</h3>
              <p>Siparişleriniz <strong>Yurtiçi Kargo</strong> aracılığıyla teslim edilmektedir. Kargonuza ait takip numarası, kargoya verilme aşamasında e-posta ile tarafınıza iletilecektir.</p>
            </div>
            <div>
              <h3 className="font-semibold text-zinc-900 mb-2">Hasar ve Kayıp</h3>
              <p>Siparişiniz hasar görmüş veya eksik teslim edilmişse, teslimattan itibaren 24 saat içinde müşteri hizmetlerimize bilgi veriniz. Tutanakla belgelenen hasarlar için yeni ürün gönderimi yapılacaktır.</p>
            </div>
          </div>
        </div>

        {/* Contact CTA */}
        <div className="border border-zinc-300 p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-semibold text-zinc-900">Sorularınız mı var?</h3>
            <p className="text-zinc-500 text-sm">Kargo ile ilgili her konuda size yardımcı olmaktan mutluluk duyarız.</p>
          </div>
          <a href="/contact" className="shrink-0 bg-zinc-900 text-white px-6 py-3 text-sm uppercase tracking-wider hover:bg-zinc-700 transition-colors">
            Bize Ulaşın
          </a>
        </div>
      </section>
    </main>
  );
}
