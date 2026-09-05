"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Package, Search, Truck, AlertCircle, CheckCircle2, Clock, MapPin, ExternalLink, ArrowRight } from "lucide-react";
import { getMinioUrl } from "@/lib/utils";

interface OrderItem {
  id: number;
  productName?: string;
  colorName?: string;
  sizeName?: string;
  quantity: number;
  unitPrice: number;
  imageUrl?: string;
  sku?: string;
}

interface OrderData {
  id: number;
  orderNumber: string;
  orderDate: string;
  estimatedDeliveryDate?: string;
  totalAmount: number;
  orderStatus: string;
  trackingNumber?: string;
  shippingCarrierName?: string;
  shippingCarrierTrackingUrl?: string;
  shippingFullName?: string;
  shippingCity?: string;
  shippingDistrict?: string;
  orderItems?: OrderItem[];
}

export default function TrackOrderPage() {
  const [orderNo, setOrderNo] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [order, setOrder] = useState<OrderData | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderNo.trim()) return;

    setIsLoading(true);
    setErrorMessage(null);
    setOrder(null);

    try {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";
      const queryParams = new URLSearchParams({
        orderNumber: orderNo.trim(),
        ...(email.trim() ? { email: email.trim() } : {}),
      });

      const res = await fetch(`${backendUrl}/api/Orders/track?${queryParams.toString()}`);
      const data = await res.json();

      if (!res.ok || !data) {
        setErrorMessage(typeof data === "string" ? data : data?.message || "Sipariş bulunamadı. Lütfen bilgilerinizi kontrol ediniz.");
      } else {
        const raw = data?.data || data;
        const normalized: OrderData = {
          id: raw?.id ?? raw?.Id ?? 0,
          orderNumber: raw?.orderNumber ?? raw?.OrderNumber ?? "",
          orderDate: raw?.orderDate ?? raw?.OrderDate ?? new Date().toISOString(),
          estimatedDeliveryDate: raw?.estimatedDeliveryDate ?? raw?.EstimatedDeliveryDate,
          totalAmount: raw?.totalAmount ?? raw?.TotalAmount ?? 0,
          orderStatus: raw?.orderStatus ?? raw?.OrderStatus ?? "Sipariş Alındı",
          trackingNumber: raw?.trackingNumber ?? raw?.TrackingNumber,
          shippingCarrierName: raw?.shippingCarrierName ?? raw?.ShippingCarrierName,
          shippingCarrierTrackingUrl: raw?.shippingCarrierTrackingUrl ?? raw?.ShippingCarrierTrackingUrl,
          shippingFullName: raw?.shippingFullName ?? raw?.ShippingFullName,
          shippingCity: raw?.shippingCity ?? raw?.ShippingCity,
          shippingDistrict: raw?.shippingDistrict ?? raw?.ShippingDistrict,
          orderItems: (raw?.orderItems ?? raw?.OrderItems ?? []).map((oi: any) => ({
            id: oi?.id ?? oi?.Id ?? 0,
            productName: oi?.productName ?? oi?.ProductName,
            colorName: oi?.colorName ?? oi?.ColorName,
            sizeName: oi?.sizeName ?? oi?.SizeName,
            quantity: oi?.quantity ?? oi?.Quantity ?? 1,
            unitPrice: oi?.unitPrice ?? oi?.UnitPrice ?? 0,
            imageUrl: oi?.imageUrl ?? oi?.ImageUrl,
            sku: oi?.sku ?? oi?.Sku,
          })),
        };
        setOrder(normalized);
      }
    } catch (err) {
      setErrorMessage("Sipariş sorgulanırken bir bağlantı hatası oluştu. Lütfen tekrar deneyiniz.");
    } finally {
      setIsLoading(false);
    }
  };

  // Status Helpers
  const getStatusBadge = (status?: string | null) => {
    const s = (status || "").toLowerCase();
    if (s.includes("teslim") || s.includes("delivered")) {
      return { label: "Teslim Edildi", color: "bg-emerald-500/10 text-emerald-700 border-emerald-200" };
    }
    if (s.includes("kargo") || s.includes("shipped")) {
      return { label: "Kargoya Verildi", color: "bg-blue-500/10 text-blue-700 border-blue-200" };
    }
    if (s.includes("hazır") || s.includes("preparing") || s.includes("processing")) {
      return { label: "Hazırlanıyor", color: "bg-amber-500/10 text-amber-700 border-amber-200" };
    }
    if (s.includes("iptal") || s.includes("cancel")) {
      return { label: "İptal Edildi", color: "bg-rose-500/10 text-rose-700 border-rose-200" };
    }
    return { label: status || "Sipariş Alındı", color: "bg-zinc-100 text-zinc-800 border-zinc-200" };
  };

  const getTimelineSteps = (status?: string | null) => {
    const s = (status || "").toLowerCase();
    const isCancelled = s.includes("iptal") || s.includes("cancel");

    if (isCancelled) {
      return [
        { label: "Sipariş Alındı", done: true },
        { label: "Sipariş İptal Edildi", done: true, isAlert: true },
      ];
    }

    const isDelivered = s.includes("teslim") || s.includes("delivered");
    const isShipped = isDelivered || s.includes("kargo") || s.includes("shipped");
    const isPreparing = isShipped || s.includes("hazır") || s.includes("preparing") || s.includes("processing");

    return [
      { label: "Sipariş Alındı", done: true },
      { label: "Hazırlanıyor", done: isPreparing },
      { label: "Kargoya Verildi", done: isShipped },
      { label: "Teslim Edildi", done: isDelivered },
    ];
  };

  return (
    <main className="bg-[#FAF9F6] min-h-screen pb-20">
      {/* ─── Hero Header ─── */}
      <section className="bg-zinc-950 py-16 sm:py-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#4A5D3E_1px,transparent_1px)] [background-size:24px_24px] opacity-15 pointer-events-none" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <span className="text-[#a3b899] text-xs tracking-[0.35em] uppercase mb-2.5 block font-semibold">
            SİPARİŞİM NEREDE?
          </span>
          <h1 className="font-playfair text-3xl sm:text-5xl font-bold text-white tracking-wide">
            Sipariş Takibi
          </h1>
          <p className="text-zinc-400 text-xs sm:text-sm mt-3 max-w-md mx-auto">
            Sipariş numaranız ve e-posta adresinizle siparişinizin anlık kargo ve hazırlık durumunu sorgulayın.
          </p>
        </div>
      </section>

      <section className="max-w-2xl mx-auto px-4 sm:px-6 -mt-8 relative z-20">
        {/* ─── Arama Formu ─── */}
        <div className="bg-white rounded-3xl border border-gray-200/80 p-6 sm:p-8 shadow-sm mb-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[11px] font-bold tracking-wider text-zinc-600 uppercase mb-1.5">
                Sipariş Numarası *
              </label>
              <div className="relative">
                <Package className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                <input
                  type="text"
                  required
                  placeholder="Örn: HQ-2026-00123"
                  value={orderNo}
                  onChange={(e) => setOrderNo(e.target.value)}
                  className="w-full border border-zinc-200 rounded-xl bg-zinc-50/50 pl-10 pr-4 py-3 text-sm text-zinc-900 focus:outline-none focus:border-zinc-900 focus:bg-white transition-all"
                />
              </div>
              <p className="text-[11px] text-zinc-400 mt-1">Sipariş onay e-postanızda veya profilinizde yer alır.</p>
            </div>

            <div>
              <label className="block text-[11px] font-bold tracking-wider text-zinc-600 uppercase mb-1.5">
                E-posta Adresi (İsteğe Bağlı)
              </label>
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                <input
                  type="email"
                  placeholder="siparis@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-zinc-200 rounded-xl bg-zinc-50/50 pl-10 pr-4 py-3 text-sm text-zinc-900 focus:outline-none focus:border-zinc-900 focus:bg-white transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-zinc-900 hover:bg-black text-white py-3.5 rounded-xl uppercase tracking-wider text-xs font-bold transition-all shadow-sm cursor-pointer disabled:opacity-50"
            >
              {isLoading ? "Sorgulanıyor..." : "Siparişi Sorgula"}
            </button>
          </form>
        </div>

        {/* ─── Hata Mesajı ─── */}
        {errorMessage && (
          <div className="bg-rose-50 border border-rose-200/80 rounded-2xl p-5 mb-8 text-center animate-in fade-in">
            <div className="flex items-center justify-center gap-2 text-rose-700 font-semibold text-sm mb-1">
              <AlertCircle size={18} />
              <span>Sipariş Bulunamadı</span>
            </div>
            <p className="text-rose-600 text-xs">{errorMessage}</p>
          </div>
        )}

        {/* ─── Canlı Sipariş Sonuç Kartı ─── */}
        {order && (
          <div className="bg-white rounded-3xl border border-gray-200/80 p-6 sm:p-8 shadow-sm space-y-8 animate-in fade-in zoom-in-95 duration-200">
            
            {/* Üst Özet */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-100">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#4A5D3E] block mb-1">
                  HAQAN WEAR
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-zinc-900 font-serif">
                  {order.orderNumber}
                </h2>
                <p className="text-xs text-zinc-400 mt-0.5">
                  Sipariş Tarihi: {new Date(order.orderDate).toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" })}
                </p>
              </div>

              <div>
                <span className={`inline-flex items-center px-3.5 py-1.5 rounded-full text-xs font-semibold border ${getStatusBadge(order.orderStatus).color}`}>
                  {getStatusBadge(order.orderStatus).label}
                </span>
              </div>
            </div>

            {/* Durum Aşamaları (Timeline) */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-4">
                Sipariş Süreci
              </h3>
              <div className="relative pl-6 space-y-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-zinc-200">
                {getTimelineSteps(order.orderStatus).map((step, idx) => (
                  <div key={idx} className="relative flex items-center gap-3">
                    <div className={`absolute -left-6 w-4 h-4 rounded-full border-2 bg-white flex items-center justify-center ${step.done ? "border-zinc-900 bg-zinc-900" : "border-zinc-300"}`}>
                      {step.done && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                    </div>
                    <span className={`text-xs sm:text-sm font-medium ${step.done ? "text-zinc-900 font-bold" : "text-zinc-400"}`}>
                      {step.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Kargo ve Takip Bilgisi */}
            <div className="bg-zinc-50 rounded-2xl p-5 border border-zinc-200/60 space-y-3">
              <div className="flex items-center gap-2.5 text-zinc-900 font-semibold text-sm">
                <Truck className="h-4 w-4 text-[#4A5D3E]" />
                <span>Kargo ve Teslimat</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-2 border-t border-zinc-200/40">
                <div>
                  <span className="text-zinc-400 block">Kargo Firması:</span>
                  <span className="font-semibold text-zinc-800">{order.shippingCarrierName || "Anlaşmalı Kargo"}</span>
                </div>
                <div>
                  <span className="text-zinc-400 block">Kargo Takip No:</span>
                  <span className="font-mono font-semibold text-zinc-800">{order.trackingNumber || "Henüz atanmadı"}</span>
                </div>
              </div>

              {order.trackingNumber && (
                <div className="pt-2">
                  <a
                    href={
                      order.shippingCarrierTrackingUrl
                        ? order.shippingCarrierTrackingUrl.replace("{trackingNumber}", order.trackingNumber)
                        : `https://www.google.com/search?q=${encodeURIComponent(`${order.shippingCarrierName || "Kargo"} takip ${order.trackingNumber}`)}`
                    }
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#4A5D3E] hover:underline"
                  >
                    <span>Kargo Takip Sayfasına Git</span>
                    <ExternalLink size={12} />
                  </a>
                </div>
              )}
            </div>

            {/* Sipariş Edilen Ürünler */}
            {order.orderItems && order.orderItems.length > 0 && (
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-3">
                  Sipariş Edilen Ürünler ({order.orderItems.length})
                </h3>
                <div className="divide-y divide-zinc-100 border border-zinc-100 rounded-2xl overflow-hidden">
                  {order.orderItems.map((item) => (
                    <div key={item.id} className="p-3.5 flex items-center gap-3.5 hover:bg-zinc-50/50 transition-colors">
                      {item.imageUrl ? (
                        <img
                          src={getMinioUrl(item.imageUrl)}
                          alt={item.productName || "Ürün"}
                          className="w-12 h-14 object-cover rounded-lg border border-zinc-200 shrink-0"
                        />
                      ) : (
                        <div className="w-12 h-14 bg-zinc-100 rounded-lg flex items-center justify-center shrink-0">
                          <Package size={16} className="text-zinc-400" />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-zinc-900 truncate">
                          {item.productName || "Ürün"}
                        </p>
                        <p className="text-[11px] text-zinc-500 mt-0.5">
                          {item.colorName && `Renk: ${item.colorName}`} {item.sizeName && `• Beden: ${item.sizeName}`}
                        </p>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="text-xs font-bold text-zinc-900">{item.unitPrice.toLocaleString("tr-TR")} ₺</p>
                        <p className="text-[10px] text-zinc-400">Adet: {item.quantity}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Toplam Tutar & Teslimat Adresi */}
            <div className="flex items-center justify-between pt-4 border-t border-zinc-100 text-xs sm:text-sm">
              <div className="text-zinc-500">
                <span>Teslimat: </span>
                <span className="font-medium text-zinc-900">{order.shippingDistrict ? `${order.shippingDistrict}, ` : ""}{order.shippingCity || "Türkiye"}</span>
              </div>
              <div className="text-right">
                <span className="text-zinc-400 block text-[11px]">Toplam Tutar</span>
                <span className="font-serif font-bold text-base sm:text-lg text-zinc-900">
                  {order.totalAmount.toLocaleString("tr-TR")} ₺
                </span>
              </div>
            </div>

          </div>
        )}

        <p className="text-center text-zinc-400 text-xs mt-8">
          Siparişinizle ilgili yardıma mı ihtiyacınız var?{" "}
          <Link href="/contact" className="underline hover:text-zinc-700 transition-colors font-medium">
            Müşteri Hizmetleri İle İletişime Geçin
          </Link>
        </p>
      </section>
    </main>
  );
}
