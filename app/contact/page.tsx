"use client";

import { useState } from "react";
import { MapPin, Phone, Mail, Clock, MessageCircle, ExternalLink } from "lucide-react";
import { useSiteSettings } from "@/hooks/useSiteSettings";

export default function ContactPage() {
  const { data: settings } = useSiteSettings();

  const phone = settings?.phonenumber || settings?.phoneNumber || "+90 (850) 123 45 67";
  const email = settings?.emailaddress || settings?.emailAddress || "destek@haqanwear.com";
  const address = settings?.storeaddress || settings?.storeAddress || "Teşvikiye Cad. No:45, Nişantaşı, Şişli / İstanbul";
  const workingHours = settings?.workinghours || settings?.workingHours || "Hafta içi: 09:00 – 18:00 | Cumartesi: 10:00 – 16:00";
  const whatsApp = settings?.whatsappnumber || settings?.whatsAppNumber;
  const googleMapsUrl = settings?.googlemapsurl || settings?.googleMapsUrl;

  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  const cleanPhone = whatsApp ? whatsApp.replace(/\D/g, "") : "";

  const getEmbedMapUrl = () => {
    if (googleMapsUrl && googleMapsUrl.trim()) {
      const iframeSrcMatch = googleMapsUrl.match(/src=["']([^"']+)["']/i);
      if (iframeSrcMatch && iframeSrcMatch[1]) {
        return iframeSrcMatch[1];
      }
      if (googleMapsUrl.includes("google.com/maps/embed") || googleMapsUrl.includes("output=embed")) {
        return googleMapsUrl;
      }
      return `https://maps.google.com/maps?q=${encodeURIComponent(googleMapsUrl)}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
    }
    return null;
  };

  const embedMapUrl = getEmbedMapUrl();
  const directMapsUrl =
    googleMapsUrl && !googleMapsUrl.includes("<iframe")
      ? googleMapsUrl
      : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;

  return (
    <main className="bg-[#F9F9FB]">
      {/* Header */}
      <section className="bg-zinc-950 py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <span className="text-[#a3b899] text-xs tracking-[0.4em] uppercase mb-3 block">Bize Ulaşın</span>
          <h1 className="font-playfair text-4xl md:text-5xl font-bold text-white">İletişim</h1>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 md:px-8 py-16 space-y-16">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <div>
            <h2 className="font-playfair text-2xl font-bold text-zinc-900 mb-8">Mesaj Gönderin</h2>
            {sent ? (
              <div className="bg-[#a3b899]/10 border border-[#a3b899] p-8 text-center rounded-xl">
                <p className="text-2xl mb-2">✓</p>
                <p className="font-semibold text-zinc-800">Mesajınız alındı!</p>
                <p className="text-zinc-500 text-sm mt-1">En kısa sürede size geri dönüş yapacağız.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs tracking-wider text-zinc-500 uppercase mb-2">Ad Soyad</label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full border border-zinc-300 bg-white px-4 py-3 text-zinc-900 focus:outline-none focus:border-zinc-800 transition-colors rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-xs tracking-wider text-zinc-500 uppercase mb-2">E-posta</label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full border border-zinc-300 bg-white px-4 py-3 text-zinc-900 focus:outline-none focus:border-zinc-800 transition-colors rounded-lg"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs tracking-wider text-zinc-500 uppercase mb-2">Konu</label>
                  <input
                    type="text"
                    required
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    className="w-full border border-zinc-300 bg-white px-4 py-3 text-zinc-900 focus:outline-none focus:border-zinc-800 transition-colors rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-xs tracking-wider text-zinc-500 uppercase mb-2">Mesajınız</label>
                  <textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full border border-zinc-300 bg-white px-4 py-3 text-zinc-900 focus:outline-none focus:border-zinc-800 transition-colors resize-none rounded-lg"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-zinc-900 text-white px-8 py-3 uppercase tracking-wider text-sm hover:bg-zinc-700 transition-colors rounded-lg font-medium"
                >
                  Gönder
                </button>
              </form>
            )}
          </div>

          {/* Info */}
          <div className="space-y-8">
            <div>
              <h2 className="font-playfair text-2xl font-bold text-zinc-900 mb-6">İletişim Bilgileri</h2>
              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <MapPin className="h-5 w-5 text-[#4A5D3E] mt-0.5 shrink-0" />
                  <div>
                    <p className="font-medium text-zinc-800">Genel Merkez & Mağaza</p>
                    <p className="text-zinc-600 text-sm">{address}</p>
                    {directMapsUrl && (
                      <a
                        href={directMapsUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-xs text-[#4A5D3E] hover:underline mt-1 font-medium"
                      >
                        <span>Yol Tarifi Al / Haritada Aç</span>
                        <ExternalLink size={12} />
                      </a>
                    )}
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Phone className="h-5 w-5 text-[#4A5D3E] mt-0.5 shrink-0" />
                  <div>
                    <p className="font-medium text-zinc-800">Müşteri Hizmetleri</p>
                    <a href={`tel:${phone.replace(/\D/g, "")}`} className="text-zinc-600 text-sm hover:text-zinc-900 transition-colors">
                      {phone}
                    </a>
                  </div>
                </div>

                {whatsApp && cleanPhone && (
                  <div className="flex items-start gap-4">
                    <MessageCircle className="h-5 w-5 text-[#25D366] mt-0.5 shrink-0" />
                    <div>
                      <p className="font-medium text-zinc-800">WhatsApp Destek & Sipariş</p>
                      <a
                        href={`https://wa.me/${cleanPhone}${
                          settings?.whatsappdefaultmessage || settings?.whatsAppDefaultMessage
                            ? `?text=${encodeURIComponent(
                                settings?.whatsappdefaultmessage || settings?.whatsAppDefaultMessage || ""
                              )}`
                            : ""
                        }`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-zinc-600 text-sm hover:text-[#25D366] transition-colors inline-flex items-center gap-1"
                      >
                        <span>{whatsApp}</span>
                        <ExternalLink size={12} />
                      </a>
                    </div>
                  </div>
                )}

                <div className="flex items-start gap-4">
                  <Mail className="h-5 w-5 text-[#4A5D3E] mt-0.5 shrink-0" />
                  <div>
                    <p className="font-medium text-zinc-800">E-posta</p>
                    <a href={`mailto:${email}`} className="text-zinc-600 text-sm hover:text-zinc-900 transition-colors">
                      {email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Clock className="h-5 w-5 text-[#4A5D3E] mt-0.5 shrink-0" />
                  <div>
                    <p className="font-medium text-zinc-800">Çalışma Saatleri</p>
                    <p className="text-zinc-600 text-sm">{workingHours}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ─── GOOGLE MAPS EMBED HARİTA ALANI ─── */}
        {embedMapUrl && (
          <div className="bg-white border border-zinc-200 rounded-2xl overflow-hidden shadow-sm">
            <div className="p-5 sm:p-6 border-b border-zinc-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-playfair text-xl font-bold text-zinc-900">Mağaza Konumu</h3>
                <p className="text-xs text-zinc-500 mt-1">{address}</p>
              </div>
              <a
                href={directMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-zinc-900 text-white hover:bg-zinc-800 text-xs font-semibold px-4 py-2.5 rounded-lg transition-colors"
              >
                <MapPin size={14} />
                <span>Google Haritalar'da Aç</span>
                <ExternalLink size={12} />
              </a>
            </div>
            <div className="w-full h-[360px] sm:h-[450px] bg-zinc-100 relative">
              <iframe
                title="Mağaza Konumu Haritası"
                src={embedMapUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              />
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
