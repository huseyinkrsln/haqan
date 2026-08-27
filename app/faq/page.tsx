"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useSiteSettings } from "@/hooks/useSiteSettings";

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-zinc-200 last:border-0">
      <button
        className="w-full flex items-center justify-between py-5 text-left gap-4"
        onClick={() => setOpen(!open)}
      >
        <span className="font-medium text-zinc-800">{q}</span>
        <ChevronDown className={`h-4 w-4 text-zinc-400 shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <p className="pb-5 text-zinc-500 text-sm leading-relaxed">{a}</p>
      )}
    </div>
  );
}

export default function FaqPage() {
  const { data: settings } = useSiteSettings();
  const threshold = settings?.freeshippingthreshold || settings?.freeShippingThreshold || "1500";

  const faqs = [
    {
      category: "Sipariş & Ödeme",
      items: [
        {
          q: "Hangi ödeme yöntemlerini kabul ediyorsunuz?",
          a: "Kredi kartı (Visa, Mastercard, Troy), banka kartı ve anlaşmalı bankalarla taksitli ödeme seçeneklerini kullanabilirsiniz. Tüm ödemeler 256-bit SSL güvenlik protokolüyle korunmaktadır.",
        },
        {
          q: "Taksit seçenekleri nelerdir?",
          a: "Anlaşmalı bankaların kredi kartlarına 2'den 12'ye kadar taksit imkanı sunulmaktadır. Taksit seçenekleri ve vade farkı oranları ödeme sayfasında kart numaranızı girdikten sonra görüntülenir.",
        },
        {
          q: "Fatura bilgilerimi nasıl değiştirebilirim?",
          a: "Hesabım > Adres Bilgilerim bölümünden fatura adresinizi güncelleyebilirsiniz. Daha önce verilmiş siparişlerin fatura bilgileri değiştirilemez.",
        },
      ],
    },
    {
      category: "Kargo & Teslimat",
      items: [
        {
          q: "Kargom ne zaman ulaşır?",
          a: "Onaylanan siparişler 1-3 iş günü içinde teslimat yapılır. Hafta sonu verilen siparişler pazartesi işleme alınır. Özel dönemlerde (yılbaşı, bayram vb.) süre 5 iş gününe çıkabilir.",
        },
        {
          q: "Ücretsiz kargo için alt limit nedir?",
          a: `${threshold} TL ve üzeri tüm siparişlerde kargo ücretsizdir. Bu tutarın altındaki siparişlerde standart kargo ücreti alınır.`,
        },
        {
          q: "Kargo takibini nasıl yapabilirim?",
          a: "Siparişiniz kargoya verildiğinde e-posta ile takip kodu gönderilir. Ayrıca Sipariş Takibi sayfamızı kullanarak siparişinizin anlık durumunu görebilirsiniz.",
        },
      ],
    },
    {
      category: "İade & Değişim",
      items: [
        {
          q: "İade süresi ne kadar?",
          a: "Teslim tarihinden itibaren 14 gün içinde iade talebinde bulunabilirsiniz. Ürünlerin kullanılmamış, etiketli ve orijinal ambalajında olması gerekmektedir.",
        },
        {
          q: "İade nasıl yapılır?",
          a: "Hesabım > Siparişlerim bölümünden iade talebini başlatın. Onay sonrası kargo kodu e-posta ile gönderilir. Ürünü kargo ile gönderin, tutar 3-7 iş günü içinde iade edilir.",
        },
        {
          q: "Değişim yapabilir miyim?",
          a: "Evet! İade ettiğiniz ürün yerine farklı beden veya renk talep edebilirsiniz. Stok durumuna göre değişim yapılır.",
        },
      ],
    },
    {
      category: "Ürün & Beden",
      items: [
        {
          q: "Beden seçimi için ne yapmalıyım?",
          a: "Her ürün sayfasında detaylı beden tablosu mevcuttur. Göğüs, bel ve kalça ölçülerinizi alarak en uygun bedeni belirleyebilirsiniz. Şüphe durumunda müşteri hizmetlerimizle iletişime geçin.",
        },
        {
          q: "Ürünler nasıl bakım gerektiriyor?",
          a: "Ürün etiketindeki bakım talimatlarını takip etmenizi öneririz. Genel olarak düşük sıcaklıkta ters çevrilerek yıkama ve gölgede kurutma tavsiye edilir.",
        },
      ],
    },
  ];

  return (
    <main className="bg-[#F9F9FB]">
      {/* Header */}
      <section className="bg-zinc-950 py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <span className="text-[#a3b899] text-xs tracking-[0.4em] uppercase mb-3 block">Yardım Merkezi</span>
          <h1 className="font-playfair text-4xl md:text-5xl font-bold text-white">Sıkça Sorulan Sorular</h1>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 md:px-8 py-16">
        <div className="space-y-10">
          {faqs.map((section) => (
            <div key={section.category}>
              <h2 className="font-playfair text-xl font-bold text-zinc-900 mb-4 pb-3 border-b-2 border-zinc-900">
                {section.category}
              </h2>
              <div className="bg-white border border-zinc-200 px-6 rounded-xl">
                {section.items.map((item) => (
                  <FaqItem key={item.q} q={item.q} a={item.a} />
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-zinc-950 p-8 text-center rounded-2xl">
          <p className="text-zinc-400 text-sm mb-4">Aradığınız cevabı bulamadınız mı?</p>
          <h3 className="font-playfair text-2xl text-white mb-6">Bize yazın</h3>
          <a
            href="/contact"
            className="inline-block bg-white text-zinc-900 px-8 py-3 uppercase tracking-wider text-sm hover:bg-zinc-100 transition-colors rounded-xl font-semibold"
          >
            İletişim Formu
          </a>
        </div>
      </section>
    </main>
  );
}
