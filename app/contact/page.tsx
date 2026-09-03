"use client";

import { useState } from "react";
import Link from "next/link";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageCircle,
  ExternalLink,
  Building2,
  ShieldCheck,
  FileText,
  BadgeCheck,
} from "lucide-react";
import { useSiteSettings } from "@/hooks/useSiteSettings";

export default function ContactPage() {
  const { data: settings } = useSiteSettings();

  const phone = settings?.phonenumber || settings?.phoneNumber || "0531 714 66 27";
  const email = settings?.emailaddress || settings?.emailAddress || "hakanyesildag91@gmail.com";
  const address =
    settings?.storeaddress ||
    settings?.storeAddress ||
    "Zülüflühan Mah. Eski İskenderun Yolu Cad. No: 55 B, Antakya / Hatay";
  const workingHours =
    settings?.workinghours ||
    settings?.workingHours ||
    "Hafta içi: 09:00 – 18:00 | Cumartesi: 10:00 – 16:00";
  const whatsApp = settings?.whatsappnumber || settings?.whatsAppNumber || "0531 714 66 27";
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
    <main className="bg-[#FAF9F6]">
      {/* Header */}
      <section className="bg-zinc-950 py-16 sm:py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <span className="text-[#a3b899] text-xs tracking-[0.4em] uppercase mb-3 block">Bize Ulaşın</span>
          <h1 className="font-playfair text-3xl sm:text-4xl md:text-5xl font-bold text-white">İletişim & Konum</h1>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-12 md:py-16 space-y-12">
        {/* ─── 1. İLETİŞİM FORMU VE HIZLI KANALLAR ─── */}
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Contact Form */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200/80 shadow-2xs">
            <h2 className="font-playfair text-2xl font-bold text-zinc-900 mb-6">Mesaj Gönderin</h2>
            {sent ? (
              <div className="bg-[#a3b899]/10 border border-[#a3b899] p-8 text-center rounded-2xl">
                <p className="text-3xl mb-2 text-[#4A5D3E]">✓</p>
                <p className="font-semibold text-zinc-800 text-lg">Mesajınız Alındı!</p>
                <p className="text-zinc-500 text-sm mt-1">En kısa sürede size geri dönüş yapacağız.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-600 mb-1.5">Ad Soyad</label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full border border-zinc-200 bg-zinc-50/50 px-4 py-3 text-sm text-zinc-900 focus:outline-none focus:border-zinc-800 focus:bg-white transition-colors rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-zinc-600 mb-1.5">E-posta</label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full border border-zinc-200 bg-zinc-50/50 px-4 py-3 text-sm text-zinc-900 focus:outline-none focus:border-zinc-800 focus:bg-white transition-colors rounded-xl"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-zinc-600 mb-1.5">Konu</label>
                  <input
                    type="text"
                    required
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    className="w-full border border-zinc-200 bg-zinc-50/50 px-4 py-3 text-sm text-zinc-900 focus:outline-none focus:border-zinc-800 focus:bg-white transition-colors rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-zinc-600 mb-1.5">Mesajınız</label>
                  <textarea
                    required
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full border border-zinc-200 bg-zinc-50/50 px-4 py-3 text-sm text-zinc-900 focus:outline-none focus:border-zinc-800 focus:bg-white transition-colors resize-none rounded-xl"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full sm:w-auto bg-zinc-900 text-white px-8 py-3.5 text-xs font-bold uppercase tracking-wider hover:bg-zinc-800 transition-colors rounded-xl cursor-pointer shadow-xs"
                >
                  Mesajı Gönder
                </button>
              </form>
            )}
          </div>

          {/* Info Cards */}
          <div className="flex flex-col justify-between space-y-6">
            <div>
              <h2 className="font-playfair text-2xl font-bold text-zinc-900 mb-6">Müşteri İletişim Kanalları</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 bg-white rounded-2xl border border-gray-200/70 shadow-2xs">
                  <div className="w-10 h-10 rounded-xl bg-[#4A5D3E]/10 flex items-center justify-center shrink-0">
                    <MapPin className="h-5 w-5 text-[#4A5D3E]" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-zinc-900 text-sm">Genel Merkez & Mağaza</p>
                    <p className="text-zinc-600 text-xs mt-0.5">{address}</p>
                    {directMapsUrl && (
                      <a
                        href={directMapsUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-xs text-[#4A5D3E] font-medium hover:underline mt-1.5"
                      >
                        <span>Yol Tarifi Al / Haritada Aç</span>
                        <ExternalLink size={12} />
                      </a>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3.5 p-4 bg-white rounded-2xl border border-gray-200/70 shadow-2xs">
                    <div className="w-10 h-10 rounded-xl bg-[#4A5D3E]/10 flex items-center justify-center shrink-0">
                      <Phone className="h-5 w-5 text-[#4A5D3E]" />
                    </div>
                    <div>
                      <p className="font-semibold text-zinc-900 text-sm">Müşteri Hizmetleri</p>
                      <a href={`tel:${phone.replace(/\D/g, "")}`} className="text-zinc-600 text-xs hover:text-zinc-900 transition-colors mt-0.5 block font-medium">
                        {phone}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5 p-4 bg-white rounded-2xl border border-gray-200/70 shadow-2xs">
                    <div className="w-10 h-10 rounded-xl bg-[#4A5D3E]/10 flex items-center justify-center shrink-0">
                      <Mail className="h-5 w-5 text-[#4A5D3E]" />
                    </div>
                    <div>
                      <p className="font-semibold text-zinc-900 text-sm">E-posta Destek</p>
                      <a href={`mailto:${email}`} className="text-zinc-600 text-xs hover:text-zinc-900 transition-colors mt-0.5 block font-medium truncate max-w-[170px]">
                        {email}
                      </a>
                    </div>
                  </div>
                </div>

                {whatsApp && cleanPhone && (
                  <div className="flex items-start gap-4 p-4 bg-white rounded-2xl border border-gray-200/70 shadow-2xs">
                    <div className="w-10 h-10 rounded-xl bg-[#25D366]/10 flex items-center justify-center shrink-0">
                      <MessageCircle className="h-5 w-5 text-[#25D366]" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-zinc-900 text-sm">WhatsApp Canlı Destek</p>
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
                        className="text-zinc-600 text-xs hover:text-[#25D366] transition-colors inline-flex items-center gap-1 font-medium mt-0.5"
                      >
                        <span>{whatsApp} (Hızlı Yanıt)</span>
                        <ExternalLink size={12} />
                      </a>
                    </div>
                  </div>
                )}

                <div className="flex items-start gap-4 p-4 bg-white rounded-2xl border border-gray-200/70 shadow-2xs">
                  <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center shrink-0">
                    <Clock className="h-5 w-5 text-gray-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-zinc-900 text-sm">Çalışma Saatleri</p>
                    <p className="text-zinc-600 text-xs mt-0.5">{workingHours}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ─── 2. DÜZENLİ VE ŞIK RESMİ ŞİRKET KÜNYESİ (iyzico / ETBİS / YASAL BİLGİLER) ─── */}
        <div className="bg-white rounded-3xl border border-gray-200/80 p-6 sm:p-8 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 border-b border-gray-100">
            <div>
              <div className="flex items-center gap-2 text-[#4A5D3E] mb-1">
                <BadgeCheck size={18} />
                <span className="text-[11px] uppercase tracking-widest font-bold">Resmi & Yasal Bilgiler</span>
              </div>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-zinc-900">
                HAQAN Wear Şirket Künyesi
              </h3>
            </div>
            
            {/* Yasal Sözleşme Linkleri */}
            <div className="flex items-center gap-2 flex-wrap text-xs font-semibold">
              <Link href="/kvkk" className="text-gray-600 hover:text-[#4A5D3E] px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-xl transition-colors">
                KVKK Aydınlatma
              </Link>
              <Link href="/privacy" className="text-gray-600 hover:text-[#4A5D3E] px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-xl transition-colors">
                Gizlilik Sözleşmesi
              </Link>
              <Link href="/terms" className="text-gray-600 hover:text-[#4A5D3E] px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-xl transition-colors">
                Mesafeli Satış
              </Link>
              <Link href="/cookies" className="text-gray-600 hover:text-[#4A5D3E] px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-xl transition-colors">
                Çerezler
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-6">
            <div className="p-4 bg-gray-50/70 rounded-2xl border border-gray-200/60">
              <div className="flex items-center gap-2 text-gray-500 mb-1 text-xs font-medium">
                <Building2 size={14} className="text-[#4A5D3E]" />
                <span>Ticari Unvan & Marka</span>
              </div>
              <p className="font-bold text-zinc-900 text-sm">Hakan Yeşildağ</p>
              <p className="text-xs text-zinc-500 mt-0.5">HAQAN Wear</p>
            </div>

            <div className="p-4 bg-gray-50/70 rounded-2xl border border-gray-200/60">
              <div className="flex items-center gap-2 text-gray-500 mb-1 text-xs font-medium">
                <FileText size={14} className="text-[#4A5D3E]" />
                <span>Vergi Dairesi & No</span>
              </div>
              <p className="font-bold text-zinc-900 text-sm">9510670940</p>
              <p className="text-xs text-zinc-500 mt-0.5">23 Temmuz Vergi Dairesi</p>
            </div>

            <div className="p-4 bg-gray-50/70 rounded-2xl border border-gray-200/60">
              <div className="flex items-center gap-2 text-gray-500 mb-1 text-xs font-medium">
                <MapPin size={14} className="text-[#4A5D3E]" />
                <span>Kayıtlı Merkez Adresi</span>
              </div>
              <p className="font-bold text-zinc-900 text-xs leading-snug">
                Zülüflühan Mah. Eski İskenderun Yolu Cad. No: 55 B
              </p>
              <p className="text-xs text-zinc-500 mt-0.5">Antakya / Hatay</p>
            </div>

            <div className="p-4 bg-gray-50/70 rounded-2xl border border-gray-200/60">
              <div className="flex items-center gap-2 text-gray-500 mb-1 text-xs font-medium">
                <ShieldCheck size={14} className="text-[#4A5D3E]" />
                <span>Ödeme & Altyapı</span>
              </div>
              <p className="font-bold text-zinc-900 text-sm">iyzico Sanal POS</p>
              <p className="text-xs text-zinc-500 mt-0.5">PCI-DSS & 256-Bit SSL</p>
            </div>
          </div>
        </div>

        {/* ─── 3. GOOGLE MAPS HARİTA ALANI ─── */}
        {embedMapUrl && (
          <div className="bg-white border border-zinc-200 rounded-3xl overflow-hidden shadow-2xs">
            <div className="p-5 sm:p-6 border-b border-zinc-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-playfair text-xl font-bold text-zinc-900">Mağaza Konumu</h3>
                <p className="text-xs text-zinc-500 mt-1">{address}</p>
              </div>
              <a
                href={directMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-zinc-900 text-white hover:bg-zinc-800 text-xs font-semibold px-4 py-2.5 rounded-xl transition-colors"
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
