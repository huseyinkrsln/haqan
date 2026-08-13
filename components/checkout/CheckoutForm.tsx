"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Truck, Zap, CreditCard, Lock, ChevronRight } from "lucide-react";
import { useCart } from "@/context/CartContext";

interface CheckoutFormProps {
  onStepChange: (step: 1 | 2 | 3) => void;
  currentStep: 1 | 2 | 3;
}

export default function CheckoutForm({
  onStepChange,
  currentStep,
}: CheckoutFormProps) {
  const router = useRouter();
  const { clearCart } = useCart();

  // Step 1: Address
  const [address, setAddress] = useState({
    name: "",
    surname: "",
    phone: "",
    city: "",
    district: "",
    fullAddress: "",
  });

  // Step 2: Delivery
  const [delivery, setDelivery] = useState<"standard" | "express">("standard");

  // Step 3: Payment
  const [payment, setPayment] = useState({
    cardNumber: "",
    expiry: "",
    cvv: "",
    cardName: "",
  });

  const formatCardNumber = (val: string) =>
    val
      .replace(/\D/g, "")
      .slice(0, 16)
      .replace(/(.{4})/g, "$1 ")
      .trim();

  const formatExpiry = (val: string) => {
    const cleaned = val.replace(/\D/g, "").slice(0, 4);
    if (cleaned.length >= 3) return `${cleaned.slice(0, 2)}/${cleaned.slice(2)}`;
    return cleaned;
  };

  const handleSubmit = async () => {
    clearCart();
    router.push("/odeme/basarili");
  };

  const inputCls =
    "w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#4A5D3E] transition-colors bg-white placeholder:text-gray-400";
  const labelCls = "block text-xs font-semibold text-gray-600 mb-1.5 tracking-wide uppercase";

  if (currentStep === 1) {
    return (
      <div className="space-y-4">
        <h2 className="font-serif text-xl font-bold text-gray-900">Teslimat Adresi</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelCls}>Ad</label>
            <input
              className={inputCls}
              value={address.name}
              onChange={(e) => setAddress({ ...address, name: e.target.value })}
              placeholder="Adınız"
            />
          </div>
          <div>
            <label className={labelCls}>Soyad</label>
            <input
              className={inputCls}
              value={address.surname}
              onChange={(e) => setAddress({ ...address, surname: e.target.value })}
              placeholder="Soyadınız"
            />
          </div>
        </div>
        <div>
          <label className={labelCls}>Telefon</label>
          <input
            className={inputCls}
            value={address.phone}
            onChange={(e) => setAddress({ ...address, phone: e.target.value })}
            placeholder="05XX XXX XX XX"
            type="tel"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelCls}>İl</label>
            <select
              className={inputCls}
              value={address.city}
              onChange={(e) => setAddress({ ...address, city: e.target.value })}
            >
              <option value="">İl seçin</option>
              {["İstanbul", "Ankara", "İzmir", "Bursa", "Antalya"].map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelCls}>İlçe</label>
            <input
              className={inputCls}
              value={address.district}
              onChange={(e) => setAddress({ ...address, district: e.target.value })}
              placeholder="İlçe"
            />
          </div>
        </div>
        <div>
          <label className={labelCls}>Açık Adres</label>
          <textarea
            className={`${inputCls} h-24 resize-none`}
            value={address.fullAddress}
            onChange={(e) => setAddress({ ...address, fullAddress: e.target.value })}
            placeholder="Mahalle, sokak, bina no, daire no"
          />
        </div>
        <button
          onClick={() => onStepChange(2)}
          className="w-full flex items-center justify-center gap-2 bg-[#4A5D3E] hover:bg-[#3A4B30] text-white font-semibold py-3.5 rounded-xl transition-colors"
        >
          Devam Et <ChevronRight size={16} />
        </button>
      </div>
    );
  }

  if (currentStep === 2) {
    return (
      <div className="space-y-4">
        <h2 className="font-serif text-xl font-bold text-gray-900">Teslimat Seçeneği</h2>
        <div className="space-y-3">
          {[
            {
              id: "standard",
              label: "Standart Teslimat",
              sub: "2-4 iş günü",
              price: "Ücretsiz",
              icon: Truck,
            },
            {
              id: "express",
              label: "Hızlı Teslimat",
              sub: "1-2 iş günü",
              price: "49,00 TL",
              icon: Zap,
            },
          ].map(({ id, label, sub, price, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setDelivery(id as "standard" | "express")}
              className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all text-left ${
                delivery === id
                  ? "border-[#4A5D3E] bg-[#4A5D3E]/5"
                  : "border-gray-200 bg-white hover:border-gray-300"
              }`}
            >
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  delivery === id ? "bg-[#4A5D3E] text-white" : "bg-gray-100 text-gray-500"
                }`}
              >
                <Icon size={18} />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-sm text-gray-900">{label}</p>
                <p className="text-xs text-gray-500">{sub}</p>
              </div>
              <span
                className={`font-semibold text-sm ${
                  delivery === id ? "text-[#4A5D3E]" : "text-gray-600"
                }`}
              >
                {price}
              </span>
            </button>
          ))}
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => onStepChange(1)}
            className="flex-1 py-3.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
          >
            Geri
          </button>
          <button
            onClick={() => onStepChange(3)}
            className="flex-1 flex items-center justify-center gap-2 bg-[#4A5D3E] hover:bg-[#3A4B30] text-white font-semibold py-3.5 rounded-xl transition-colors"
          >
            Devam Et <ChevronRight size={16} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="font-serif text-xl font-bold text-gray-900">Ödeme Bilgileri</h2>
      <div className="bg-green-50 border border-green-200 rounded-xl px-4 py-3 flex items-center gap-2">
        <Lock size={14} className="text-green-600 shrink-0" />
        <span className="text-xs text-green-700 font-medium">
          256-bit SSL şifreleme ile güvenli ödeme
        </span>
      </div>
      <div>
        <label className={labelCls}>Kart Numarası</label>
        <div className="relative">
          <input
            className={`${inputCls} pr-12`}
            value={payment.cardNumber}
            onChange={(e) =>
              setPayment({ ...payment, cardNumber: formatCardNumber(e.target.value) })
            }
            placeholder="0000 0000 0000 0000"
            maxLength={19}
          />
          <CreditCard
            size={16}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
          />
        </div>
      </div>
      <div>
        <label className={labelCls}>Kart Üzerindeki İsim</label>
        <input
          className={inputCls}
          value={payment.cardName}
          onChange={(e) => setPayment({ ...payment, cardName: e.target.value })}
          placeholder="Ad Soyad"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelCls}>Son Kullanma</label>
          <input
            className={inputCls}
            value={payment.expiry}
            onChange={(e) =>
              setPayment({ ...payment, expiry: formatExpiry(e.target.value) })
            }
            placeholder="AA/YY"
            maxLength={5}
          />
        </div>
        <div>
          <label className={labelCls}>CVV</label>
          <input
            className={inputCls}
            value={payment.cvv}
            onChange={(e) =>
              setPayment({
                ...payment,
                cvv: e.target.value.replace(/\D/g, "").slice(0, 3),
              })
            }
            placeholder="000"
            maxLength={3}
            type="password"
          />
        </div>
      </div>
      <div className="flex gap-3">
        <button
          onClick={() => onStepChange(2)}
          className="flex-1 py-3.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
        >
          Geri
        </button>
        <button
          onClick={handleSubmit}
          className="flex-1 flex items-center justify-center gap-2 bg-[#4A5D3E] hover:bg-[#3A4B30] text-white font-semibold py-3.5 rounded-xl transition-colors"
        >
          <Lock size={14} /> GÜVENLİ ÖDE
        </button>
      </div>
    </div>
  );
}
