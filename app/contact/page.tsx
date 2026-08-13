"use client";

import { useState } from "react";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

const stores = [
  { city: "İstanbul", district: "Nişantaşı", address: "Teşvikiye Cad. No:45", phone: "+90 212 555 0101", hours: "10:00 - 22:00" },
  { city: "İstanbul", district: "Kadıköy", address: "Moda Cad. No:12", phone: "+90 216 555 0202", hours: "10:00 - 22:00" },
  { city: "Ankara", district: "Çankaya", address: "Tunalı Hilmi Cad. No:78", phone: "+90 312 555 0303", hours: "10:00 - 21:00" },
  { city: "İzmir", district: "Alsancak", address: "Kıbrıs Şehitleri Cad. No:22", phone: "+90 232 555 0404", hours: "10:00 - 21:00" },
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <main className="bg-[#F9F9FB]">
      {/* Header */}
      <section className="bg-zinc-950 py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <span className="text-[#a3b899] text-xs tracking-[0.4em] uppercase mb-3 block">Bize Ulaşın</span>
          <h1 className="font-playfair text-4xl md:text-5xl font-bold text-white">İletişim</h1>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 md:px-8 py-16">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <div>
            <h2 className="font-playfair text-2xl font-bold text-zinc-900 mb-8">Mesaj Gönderin</h2>
            {sent ? (
              <div className="bg-[#a3b899]/10 border border-[#a3b899] p-8 text-center">
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
                      className="w-full border border-zinc-300 bg-white px-4 py-3 text-zinc-900 focus:outline-none focus:border-zinc-800 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs tracking-wider text-zinc-500 uppercase mb-2">E-posta</label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full border border-zinc-300 bg-white px-4 py-3 text-zinc-900 focus:outline-none focus:border-zinc-800 transition-colors"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs tracking-wider text-zinc-500 uppercase mb-2">Konu</label>
                  <select
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    className="w-full border border-zinc-300 bg-white px-4 py-3 text-zinc-900 focus:outline-none focus:border-zinc-800 transition-colors"
                  >
                    <option value="">Konu seçin</option>
                    <option>Sipariş & Teslimat</option>
                    <option>İade & Değişim</option>
                    <option>Ürün Bilgisi</option>
                    <option>Diğer</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs tracking-wider text-zinc-500 uppercase mb-2">Mesajınız</label>
                  <textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full border border-zinc-300 bg-white px-4 py-3 text-zinc-900 focus:outline-none focus:border-zinc-800 transition-colors resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-zinc-900 text-white px-8 py-3 uppercase tracking-wider text-sm hover:bg-zinc-700 transition-colors"
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
                  <MapPin className="h-5 w-5 text-[#a3b899] mt-0.5 shrink-0" />
                  <div>
                    <p className="font-medium text-zinc-800">Genel Merkez</p>
                    <p className="text-zinc-500 text-sm">Teşvikiye Cad. No:45, Nişantaşı, Şişli / İstanbul</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Phone className="h-5 w-5 text-[#a3b899] mt-0.5 shrink-0" />
                  <div>
                    <p className="font-medium text-zinc-800">Telefon</p>
                    <p className="text-zinc-500 text-sm">+90 (850) 123 45 67</p>
                    <p className="text-zinc-400 text-xs">Hafta içi 09:00 – 18:00</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Mail className="h-5 w-5 text-[#a3b899] mt-0.5 shrink-0" />
                  <div>
                    <p className="font-medium text-zinc-800">E-posta</p>
                    <p className="text-zinc-500 text-sm">destek@haqanwear.com</p>
                    <p className="text-zinc-400 text-xs">24 saat içinde yanıt veririz</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Clock className="h-5 w-5 text-[#a3b899] mt-0.5 shrink-0" />
                  <div>
                    <p className="font-medium text-zinc-800">Çalışma Saatleri</p>
                    <p className="text-zinc-500 text-sm">Hafta içi: 09:00 – 18:00</p>
                    <p className="text-zinc-500 text-sm">Cumartesi: 10:00 – 16:00</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
