"use client";

import { useState } from "react";
import Link from "next/link";
import {
  User,
  Package,
  MapPin,
  Settings,
  Shield,
  ChevronRight,
  Heart,
  ShoppingBag,
  Star,
  Edit3,
  Check,
  LogOut,
  Bell,
  CreditCard,
  Truck,
  RotateCcw,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { formatPrice } from "@/lib/data";

// ─── Mock Data ────────────────────────────────────────────
const mockUser = {
  name: "Hasan Yılmaz",
  email: "hasan@example.com",
  phone: "+90 532 123 45 67",
  memberSince: "Ocak 2024",
  avatar: "HY",
};

const mockOrders = [
  {
    id: "HQ-482391",
    date: "10 Ağustos 2026",
    status: "Teslim Edildi",
    statusColor: "text-green-600 bg-green-50",
    total: 2598,
    items: [
      { name: "Keten Gömlek", size: "M", color: "Siyah", qty: 1, price: 1299 },
      { name: "Deri Kemer", size: "L", color: "Siyah/Mat", qty: 1, price: 899 },
    ],
    tracking: "TK123456789TR",
  },
  {
    id: "HQ-371204",
    date: "28 Temmuz 2026",
    status: "Kargoda",
    statusColor: "text-blue-600 bg-blue-50",
    total: 1499,
    items: [
      { name: "Slim Fit Pantolon", size: "32", color: "Lacivert", qty: 1, price: 1499 },
    ],
    tracking: "TK987654321TR",
  },
  {
    id: "HQ-259017",
    date: "5 Temmuz 2026",
    status: "Teslim Edildi",
    statusColor: "text-green-600 bg-green-50",
    total: 3798,
    items: [
      { name: "Blazer Ceket", size: "L", color: "Lacivert", qty: 1, price: 2999 },
      { name: "Basic Tişört", size: "L", color: "Beyaz", qty: 1, price: 549 },
    ],
    tracking: "TK111222333TR",
  },
];

const mockAddresses = [
  {
    id: "a1",
    title: "Ev",
    name: "Hasan Yılmaz",
    phone: "+90 532 123 45 67",
    full: "Bağcılar Mahallesi, Atatürk Cad. No:12 D:5, 34200 Bağcılar / İstanbul",
    isDefault: true,
  },
  {
    id: "a2",
    title: "İş",
    name: "Hasan Yılmaz",
    phone: "+90 532 123 45 67",
    full: "Maslak Mahallesi, Büyükdere Cad. No:255, 34450 Sarıyer / İstanbul",
    isDefault: false,
  },
];

// ─── Tab IDs ──────────────────────────────────────────────
type Tab = "siparisler" | "adresler" | "hesap" | "guvenlik";

const tabs: { id: Tab; label: string; icon: React.ComponentType<{ size?: number; className?: string }> }[] = [
  { id: "siparisler", label: "Siparişlerim", icon: Package },
  { id: "adresler", label: "Adreslerim", icon: MapPin },
  { id: "hesap", label: "Hesap Bilgileri", icon: Settings },
  { id: "guvenlik", label: "Güvenlik", icon: Shield },
];

// ─── Sub-components ────────────────────────────────────────

function OrdersTab() {
  const [expanded, setExpanded] = useState<string | null>(null);
  return (
    <div className="space-y-4">
      {mockOrders.map((order) => (
        <div key={order.id} className="bg-white rounded-xl border border-gray-100 shadow-card overflow-hidden">
          {/* Order header */}
          <button
            onClick={() => setExpanded(expanded === order.id ? null : order.id)}
            className="w-full flex items-center justify-between p-5 hover:bg-gray-50/50 transition-colors text-left"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#4A5D3E]/10 flex items-center justify-center shrink-0">
                <Package size={18} className="text-[#4A5D3E]" />
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-semibold text-gray-900 text-sm">{order.id}</span>
                  <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${order.statusColor}`}>
                    {order.status}
                  </span>
                </div>
                <p className="text-xs text-gray-400 mt-0.5">{order.date} · {order.items.length} ürün</p>
              </div>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <span className="font-bold text-gray-900 text-sm hidden sm:block">{formatPrice(order.total)}</span>
              <ChevronRight
                size={16}
                className={`text-gray-400 transition-transform ${expanded === order.id ? "rotate-90" : ""}`}
              />
            </div>
          </button>

          {/* Expanded details */}
          {expanded === order.id && (
            <div className="border-t border-gray-100 p-5 space-y-4 animate-fade-in">
              <div className="space-y-2">
                {order.items.map((item, i) => (
                  <div key={i} className="flex items-center justify-between text-sm">
                    <div>
                      <span className="font-medium text-gray-800">{item.name}</span>
                      <span className="text-gray-400 ml-2">— {item.size} / {item.color}</span>
                    </div>
                    <span className="font-semibold text-gray-900">{formatPrice(item.price)}</span>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <Truck size={13} />
                  <span>Kargo No: <span className="font-mono font-medium text-gray-700">{order.tracking}</span></span>
                </div>
                <div className="flex gap-2">
                  <button className="flex items-center gap-1.5 text-xs font-medium text-gray-600 border border-gray-200 px-3 py-1.5 rounded-lg hover:border-[#4A5D3E] hover:text-[#4A5D3E] transition-colors">
                    <RotateCcw size={12} /> İade Et
                  </button>
                  <button className="flex items-center gap-1.5 text-xs font-medium text-[#4A5D3E] border border-[#4A5D3E] px-3 py-1.5 rounded-lg hover:bg-[#4A5D3E] hover:text-white transition-colors">
                    <Star size={12} /> Değerlendir
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function AddressesTab() {
  const [addresses, setAddresses] = useState(mockAddresses);
  return (
    <div className="space-y-4">
      {addresses.map((addr) => (
        <div key={addr.id} className={`bg-white rounded-xl border shadow-card p-5 relative ${addr.isDefault ? "border-[#4A5D3E]/40" : "border-gray-100"}`}>
          {addr.isDefault && (
            <span className="absolute top-4 right-4 text-[10px] font-bold text-[#4A5D3E] bg-[#4A5D3E]/10 px-2 py-0.5 rounded-full tracking-wider">
              VARSAYILAN
            </span>
          )}
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center shrink-0">
              <MapPin size={16} className="text-gray-500" />
            </div>
            <div className="flex-1 min-w-0 pr-20">
              <p className="font-semibold text-sm text-gray-900">{addr.title}</p>
              <p className="text-sm text-gray-600 mt-0.5">{addr.name}</p>
              <p className="text-xs text-gray-500 mt-1 leading-relaxed">{addr.full}</p>
              <p className="text-xs text-gray-500 mt-0.5">{addr.phone}</p>
            </div>
          </div>
          <div className="flex gap-2 mt-4">
            <button className="text-xs font-medium text-gray-600 border border-gray-200 px-3 py-1.5 rounded-lg hover:border-[#4A5D3E] hover:text-[#4A5D3E] transition-colors">
              Düzenle
            </button>
            {!addr.isDefault && (
              <>
                <button
                  onClick={() =>
                    setAddresses((a) =>
                      a.map((x) => ({ ...x, isDefault: x.id === addr.id }))
                    )
                  }
                  className="text-xs font-medium text-gray-600 border border-gray-200 px-3 py-1.5 rounded-lg hover:border-[#4A5D3E] hover:text-[#4A5D3E] transition-colors"
                >
                  Varsayılan Yap
                </button>
                <button className="text-xs font-medium text-red-500 border border-red-100 px-3 py-1.5 rounded-lg hover:bg-red-50 transition-colors">
                  Sil
                </button>
              </>
            )}
          </div>
        </div>
      ))}

      <button className="w-full flex items-center justify-center gap-2 border-2 border-dashed border-gray-200 rounded-xl py-4 text-sm font-medium text-gray-500 hover:border-[#4A5D3E] hover:text-[#4A5D3E] transition-colors">
        + Yeni Adres Ekle
      </button>
    </div>
  );
}

function AccountTab() {
  const inputCls =
    "w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#4A5D3E] transition-colors bg-white";
  const labelCls = "block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide";
  const [saved, setSaved] = useState(false);

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl border border-gray-100 shadow-card p-6 space-y-5">
        <h3 className="font-serif text-lg font-bold text-gray-900">Kişisel Bilgiler</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className={labelCls}>Ad</label>
            <input className={inputCls} defaultValue="Hasan" />
          </div>
          <div>
            <label className={labelCls}>Soyad</label>
            <input className={inputCls} defaultValue="Yılmaz" />
          </div>
          <div>
            <label className={labelCls}>E-posta</label>
            <input className={inputCls} type="email" defaultValue="hasan@example.com" />
          </div>
          <div>
            <label className={labelCls}>Telefon</label>
            <input className={inputCls} type="tel" defaultValue="+90 532 123 45 67" />
          </div>
          <div>
            <label className={labelCls}>Doğum Tarihi</label>
            <input className={inputCls} type="date" defaultValue="1995-03-15" />
          </div>
          <div>
            <label className={labelCls}>Cinsiyet</label>
            <select className={inputCls}>
              <option>Erkek</option>
              <option>Kadın</option>
              <option>Belirtmek istemiyorum</option>
            </select>
          </div>
        </div>
        <button
          onClick={() => { setSaved(true); setTimeout(() => setSaved(false), 2500); }}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all ${
            saved ? "bg-green-600 text-white" : "bg-[#4A5D3E] hover:bg-[#3A4B30] text-white"
          }`}
        >
          {saved ? <><Check size={15} /> Kaydedildi</> : "Değişiklikleri Kaydet"}
        </button>
      </div>
    </div>
  );
}



function SecurityTab() {
  const inputCls =
    "w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#4A5D3E] transition-colors bg-white";
  const labelCls = "block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide";
  const [pwSaved, setPwSaved] = useState(false);

  return (
    <div className="space-y-6">
      {/* Change Password */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-card p-6 space-y-4">
        <h3 className="font-serif text-lg font-bold text-gray-900">Şifre Değiştir</h3>
        <div>
          <label className={labelCls}>Mevcut Şifre</label>
          <input className={inputCls} type="password" placeholder="••••••••" />
        </div>
        <div>
          <label className={labelCls}>Yeni Şifre</label>
          <input className={inputCls} type="password" placeholder="En az 8 karakter" />
        </div>
        <div>
          <label className={labelCls}>Yeni Şifre (Tekrar)</label>
          <input className={inputCls} type="password" placeholder="••••••••" />
        </div>
        <button
          onClick={() => { setPwSaved(true); setTimeout(() => setPwSaved(false), 2500); }}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all ${
            pwSaved ? "bg-green-600 text-white" : "bg-[#4A5D3E] hover:bg-[#3A4B30] text-white"
          }`}
        >
          {pwSaved ? <><Check size={15} /> Şifre Güncellendi</> : "Şifreyi Güncelle"}
        </button>
      </div>

      {/* Danger zone */}
      <div className="bg-white rounded-xl border border-red-100 p-6 space-y-3">
        <h3 className="font-serif text-lg font-bold text-red-600">Tehlikeli Bölge</h3>
        <p className="text-xs text-gray-500 leading-relaxed">
          Hesabınızı silmek geri alınamaz. Tüm sipariş geçmişiniz, favorileriniz ve kişisel bilgileriniz kalıcı olarak silinir.
        </p>
        <button className="text-xs font-semibold text-red-500 border border-red-200 px-4 py-2 rounded-lg hover:bg-red-50 transition-colors">
          Hesabımı Sil
        </button>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────
export default function ProfilimPage() {
  const [activeTab, setActiveTab] = useState<Tab>("siparisler");
  const { totalItems: cartCount } = useCart();
  const { totalItems: wishlistCount } = useWishlist();

  const stats = [
    { icon: Package, label: "Sipariş", value: mockOrders.length },
    { icon: Heart, label: "Favori", value: wishlistCount },
    { icon: ShoppingBag, label: "Sepet", value: cartCount },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-8 py-6 md:py-10">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-gray-400 mb-6">
        <Link href="/" className="hover:text-gray-700">Ana Sayfa</Link>
        <span>›</span>
        <span className="text-gray-700 font-medium">Profilim</span>
      </nav>

      {/* Profile hero card */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-card p-6 mb-8">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-5">
          {/* Avatar */}
          <div className="relative">
            <div className="w-20 h-20 rounded-2xl bg-[#4A5D3E] flex items-center justify-center text-white font-bold text-2xl font-serif shadow-md">
              {mockUser.avatar}
            </div>
            <button className="absolute -bottom-1.5 -right-1.5 w-7 h-7 bg-white border border-gray-200 rounded-full flex items-center justify-center shadow-sm hover:border-[#4A5D3E] transition-colors">
              <Edit3 size={12} className="text-gray-500" />
            </button>
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <h1 className="font-serif text-2xl font-bold text-gray-900">{mockUser.name}</h1>
            <p className="text-sm text-gray-500 mt-0.5">{mockUser.email}</p>
            <p className="text-xs text-gray-400 mt-1">
              {mockUser.memberSince}'den beri
            </p>
          </div>

          {/* Stats */}
          <div className="flex gap-4 md:gap-6 flex-wrap">
            {stats.map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex flex-col items-center gap-1 min-w-[56px]">
                <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center">
                  <Icon size={18} className="text-[#4A5D3E]" />
                </div>
                <span className="font-bold text-gray-900 text-lg leading-none">{value}</span>
                <span className="text-xs text-gray-400">{label}</span>
              </div>
            ))}
          </div>

          <button className="flex items-center gap-1.5 text-xs font-medium text-gray-500 hover:text-red-500 transition-colors border border-gray-200 px-3 py-2 rounded-lg hover:border-red-200 md:self-start">
            <LogOut size={13} /> Çıkış
          </button>
        </div>
      </div>

      {/* Tab layout */}
      <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-6">
        {/* Sidebar tabs */}
        <aside>
          <nav className="bg-white rounded-2xl border border-gray-100 shadow-card overflow-hidden">
            {tabs.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`w-full flex items-center gap-3 px-5 py-3.5 text-sm font-medium transition-all border-l-2 ${
                  activeTab === id
                    ? "text-[#4A5D3E] bg-[#4A5D3E]/5 border-[#4A5D3E]"
                    : "text-gray-600 hover:bg-gray-50 border-transparent hover:text-gray-900"
                }`}
              >
                <Icon size={16} />
                {label}
              </button>
            ))}
          </nav>
        </aside>

        {/* Content area */}
        <div className="min-w-0">
          {activeTab === "siparisler" && <OrdersTab />}
          {activeTab === "adresler" && <AddressesTab />}
          {activeTab === "hesap" && <AccountTab />}
          {activeTab === "guvenlik" && <SecurityTab />}
        </div>
      </div>
    </div>
  );
}
