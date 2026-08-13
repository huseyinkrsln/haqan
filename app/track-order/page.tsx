"use client";

import { useState } from "react";
import { Package, Search } from "lucide-react";

export default function TrackOrderPage() {
  const [orderNo, setOrderNo] = useState("");
  const [email, setEmail] = useState("");
  const [result, setResult] = useState<null | "found" | "not_found">(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate: order numbers starting with "HQ" are "found"
    setResult(orderNo.toUpperCase().startsWith("HQ") ? "found" : "not_found");
  };

  const mockOrder = {
    no: orderNo.toUpperCase(),
    date: "10 Ağustos 2026",
    status: "Kargoda",
    cargo: "Yurtiçi Kargo",
    cargoNo: "7412369854123",
    steps: [
      { label: "Sipariş Alındı", date: "10 Ağu 10:22", done: true },
      { label: "Hazırlanıyor", date: "10 Ağu 14:05", done: true },
      { label: "Kargoya Verildi", date: "11 Ağu 09:30", done: true },
      { label: "Dağıtımda", date: "13 Ağu 08:15", done: true },
      { label: "Teslim Edildi", date: "", done: false },
    ],
  };

  return (
    <main className="bg-[#F9F9FB]">
      {/* Header */}
      <section className="bg-zinc-950 py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <span className="text-[#a3b899] text-xs tracking-[0.4em] uppercase mb-3 block">Siparişim Nerede?</span>
          <h1 className="font-playfair text-4xl md:text-5xl font-bold text-white">Sipariş Takibi</h1>
        </div>
      </section>

      <section className="max-w-2xl mx-auto px-6 md:px-8 py-16">
        {/* Form */}
        <div className="bg-white border border-zinc-200 p-8 mb-8">
          <h2 className="font-playfair text-xl font-bold text-zinc-900 mb-6">Sipariş Sorgula</h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs tracking-wider text-zinc-500 uppercase mb-2">
                Sipariş Numarası
              </label>
              <div className="relative">
                <Package className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                <input
                  type="text"
                  required
                  placeholder="Örn: HQ-2026-00123"
                  value={orderNo}
                  onChange={(e) => { setOrderNo(e.target.value); setResult(null); }}
                  className="w-full border border-zinc-300 bg-white pl-10 pr-4 py-3 text-zinc-900 focus:outline-none focus:border-zinc-800 transition-colors"
                />
              </div>
              <p className="text-xs text-zinc-400 mt-1">Sipariş onay e-postanızda yer alır.</p>
            </div>
            <div>
              <label className="block text-xs tracking-wider text-zinc-500 uppercase mb-2">
                E-posta Adresi
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                <input
                  type="email"
                  required
                  placeholder="siparis@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-zinc-300 bg-white pl-10 pr-4 py-3 text-zinc-900 focus:outline-none focus:border-zinc-800 transition-colors"
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-zinc-900 text-white py-3 uppercase tracking-wider text-sm hover:bg-zinc-700 transition-colors"
            >
              Sorgula
            </button>
          </form>
        </div>

        {/* Result */}
        {result === "not_found" && (
          <div className="bg-red-50 border border-red-200 p-6 text-center">
            <p className="font-semibold text-red-700 mb-1">Sipariş Bulunamadı</p>
            <p className="text-red-500 text-sm">Sipariş numarası veya e-posta adresi hatalı. Lütfen kontrol ediniz.</p>
          </div>
        )}

        {result === "found" && (
          <div className="bg-white border border-zinc-200 p-8">
            <div className="flex items-start justify-between mb-8">
              <div>
                <p className="text-xs text-zinc-400 uppercase tracking-wider mb-1">Sipariş No</p>
                <p className="font-bold text-zinc-900">{mockOrder.no}</p>
                <p className="text-xs text-zinc-400 mt-1">{mockOrder.date}</p>
              </div>
              <span className="bg-[#a3b899]/20 text-[#5a7a54] text-xs font-medium px-3 py-1.5 uppercase tracking-wider">
                {mockOrder.status}
              </span>
            </div>

            {/* Timeline */}
            <div className="relative">
              {mockOrder.steps.map((step, i) => (
                <div key={step.label} className="flex gap-4 mb-6 last:mb-0">
                  <div className="flex flex-col items-center">
                    <div className={`w-4 h-4 rounded-full border-2 mt-0.5 ${step.done ? "bg-zinc-900 border-zinc-900" : "bg-white border-zinc-300"}`} />
                    {i < mockOrder.steps.length - 1 && (
                      <div className={`w-0.5 flex-1 mt-1 ${step.done ? "bg-zinc-900" : "bg-zinc-200"}`} style={{ minHeight: 24 }} />
                    )}
                  </div>
                  <div className="pb-6 last:pb-0">
                    <p className={`font-medium text-sm ${step.done ? "text-zinc-900" : "text-zinc-400"}`}>{step.label}</p>
                    {step.date && <p className="text-xs text-zinc-400 mt-0.5">{step.date}</p>}
                  </div>
                </div>
              ))}
            </div>

            {/* Cargo Info */}
            <div className="mt-8 pt-6 border-t border-zinc-100">
              <p className="text-xs text-zinc-400 uppercase tracking-wider mb-3">Kargo Bilgisi</p>
              <div className="flex items-center justify-between text-sm">
                <div>
                  <p className="font-medium text-zinc-800">{mockOrder.cargo}</p>
                  <p className="text-zinc-500 text-xs mt-0.5">Takip No: {mockOrder.cargoNo}</p>
                </div>
                <a
                  href={`https://www.yurticikargo.com/tr/online-islemler/gonderi-sorgula?code=${mockOrder.cargoNo}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs uppercase tracking-wider text-zinc-900 border-b border-zinc-900 pb-0.5 hover:text-[#a3b899] hover:border-[#a3b899] transition-colors"
                >
                  Kargo Takip →
                </a>
              </div>
            </div>
          </div>
        )}

        <p className="text-center text-zinc-400 text-xs mt-8">
          Sorun mu yaşıyorsunuz?{" "}
          <a href="/contact" className="underline hover:text-zinc-700 transition-colors">
            Müşteri hizmetleriyle iletişime geçin
          </a>
        </p>
      </section>
    </main>
  );
}
