"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  User,
  Package,
  MapPin,
  Settings,
  Shield,
  ChevronRight,
  Heart,
  ShoppingBag,
  Check,
  LogOut,
  Truck,
  RotateCcw,
  ExternalLink,
  Copy,
  Plus,
  Trash2,
  Edit2,
  X,
  Building,
  Home,
  AlertCircle,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import { useSession, signOut } from "next-auth/react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { formatPrice, getMinioUrl } from "@/lib/utils";
import { axiosInstance } from "@/lib/axios";
import { useToast } from "@/context/ToastContext";
import AuthRequiredView from "@/components/auth/AuthRequiredView";

type Tab = "siparisler" | "adresler" | "hesap" | "guvenlik";

const tabs: { id: Tab; label: string; icon: React.ComponentType<{ size?: number; className?: string }> }[] = [
  { id: "siparisler", label: "Siparişlerim", icon: Package },
  { id: "adresler", label: "Adreslerim", icon: MapPin },
  { id: "hesap", label: "Hesap Bilgileri", icon: Settings },
  { id: "guvenlik", label: "Güvenlik", icon: Shield },
];

interface OrderItemData {
  id: number;
  orderId: number;
  productVariantId: number;
  quantity: number;
  unitPrice: number;
  returnStatus?: string;
  productId?: number;
  productName?: string;
  productCode?: string;
  colorName?: string;
  colorHexCode?: string;
  sizeName?: string;
  sku?: string;
  imageUrl?: string;
}

interface OrderData {
  id: number;
  orderNumber: string;
  userId: number;
  shippingCarrierId?: number;
  shippingCarrierName?: string;
  shippingCarrierTrackingUrl?: string;
  orderDate: string;
  estimatedDeliveryDate?: string;
  totalAmount: number;
  orderStatus: string;
  trackingNumber?: string;
  shippingFullName: string;
  shippingPhoneNumber: string;
  shippingAddressLine1: string;
  shippingAddressLine2?: string;
  shippingCity?: string;
  shippingDistrict?: string;
  orderItems: OrderItemData[];
}

function getStatusBadge(status: string) {
  const s = (status || "").toLowerCase();
  if (s.includes("teslim") || s.includes("delivered")) {
    return { text: "Teslim Edildi", cls: "text-emerald-700 bg-emerald-50 border-emerald-200" };
  }
  if (s.includes("kargo") || s.includes("shipped")) {
    return { text: "Kargoya Verildi", cls: "text-purple-700 bg-purple-50 border-purple-200" };
  }
  if (s.includes("hazır") || s.includes("processing") || s.includes("approved")) {
    return { text: "Hazırlanıyor", cls: "text-blue-700 bg-blue-50 border-blue-200" };
  }
  if (s.includes("iptal") || s.includes("cancel")) {
    return { text: "İptal Edildi", cls: "text-rose-700 bg-rose-50 border-rose-200" };
  }
  return { text: "Sipariş Alındı", cls: "text-amber-700 bg-amber-50 border-amber-200" };
}

function OrdersTab({ userId, onOrdersLoaded }: { userId?: number; onOrdersLoaded?: (count: number) => void }) {
  const [orders, setOrders] = useState<OrderData[]>([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<number | null>(null);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  useEffect(() => {
    async function fetchOrders() {
      if (!userId) {
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        const res = await axiosInstance.get(`/api/Orders/getuserorders?userId=${userId}`);
        const raw = res.data;
        const list: OrderData[] = Array.isArray(raw)
          ? raw
          : raw?.data || raw?.items || [];
        setOrders(list);
        if (list.length > 0) {
          setExpanded(list[0].id);
        }
        if (onOrdersLoaded) {
          onOrdersLoaded(list.length);
        }
      } catch (err) {
        console.warn("Siparişler yüklenemedi:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchOrders();
  }, [userId]);

  const handleCopyTracking = (code: string, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard?.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-16 bg-white rounded-3xl border border-gray-100 shadow-2xs">
        <Loader2 className="w-8 h-8 text-[#4A5D3E] animate-spin mb-3" />
        <p className="text-xs sm:text-sm text-gray-500 font-medium">Siparişleriniz yükleniyor...</p>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="bg-white rounded-3xl border border-gray-100 shadow-2xs p-8 sm:p-12 text-center flex flex-col items-center">
        <div className="w-16 h-16 rounded-2xl bg-[#4A5D3E]/10 text-[#4A5D3E] flex items-center justify-center mb-4">
          <Package size={28} />
        </div>
        <h3 className="font-serif text-base sm:text-lg font-bold text-gray-900">
          Henüz Bir Siparişiniz Bulunmuyor
        </h3>
        <p className="text-xs sm:text-sm text-gray-500 mt-1 max-w-sm leading-relaxed">
          Zarif ve zamansız HAQAN koleksiyonlarını keşfederek hemen ilk siparişinizi verebilirsiniz.
        </p>
        <Link
          href="/"
          className="mt-6 inline-flex items-center gap-2 bg-[#4A5D3E] hover:bg-[#38472F] text-white text-xs sm:text-sm font-semibold px-6 py-3 rounded-xl transition-all shadow-xs cursor-pointer"
        >
          <ShoppingBag size={16} /> Alışverişe Başla
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {orders.map((order) => {
        const isExp = expanded === order.id;
        const badge = getStatusBadge(order.orderStatus);
        const orderDateStr = order.orderDate
          ? new Date(order.orderDate).toLocaleDateString("tr-TR", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })
          : "Tarih Belirtilmemiş";

        const itemsCount = order.orderItems?.length || 0;
        const carrierName = order.shippingCarrierName || "Kargo";
        const trackingCode = order.trackingNumber;
        const trackingUrl = order.shippingCarrierTrackingUrl
          ? order.shippingCarrierTrackingUrl.replace("{code}", trackingCode || "")
          : null;

        return (
          <div
            key={order.id}
            className="bg-white rounded-2xl border border-gray-200/80 shadow-2xs overflow-hidden transition-all"
          >
            {/* ─── PARENT SİPARİŞ BAŞLIK KARTI ─── */}
            <button
              onClick={() => setExpanded(isExp ? null : order.id)}
              className={`w-full flex items-center justify-between p-4 sm:p-5 transition-colors text-left cursor-pointer ${
                isExp
                  ? "bg-[#F3F4F1] border-b border-gray-200/80 hover:bg-[#ECEEE9]"
                  : "bg-[#F8F9F6] hover:bg-[#F0F2ED]"
              }`}
            >
              <div className="flex flex-col gap-1 min-w-0">
                <div className="flex items-center gap-2.5 flex-wrap">
                  <span
                    className={`text-xs font-bold px-3 py-1 rounded-full border shadow-2xs ${badge.cls}`}
                  >
                    {badge.text}
                  </span>
                  <span className="text-xs font-semibold text-gray-700">
                    {orderDateStr}
                  </span>
                  <span className="text-[11px] font-mono text-gray-400">
                    #{order.orderNumber || order.id}
                  </span>
                </div>
                <p className="text-[11px] text-gray-500 mt-0.5">
                  {itemsCount} Parça Ürün · <span className="text-gray-700 font-medium">{carrierName}</span>
                </p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <div className="text-right">
                  <span className="text-[10px] text-gray-400 block font-medium uppercase tracking-wider">Toplam Tutar</span>
                  <span className="font-bold text-gray-900 text-sm sm:text-base">{formatPrice(order.totalAmount)}</span>
                </div>
                <div className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-500 shadow-2xs">
                  <ChevronRight
                    size={16}
                    className={`transition-transform duration-200 ${isExp ? "rotate-90 text-gray-900" : ""}`}
                  />
                </div>
              </div>
            </button>

            {/* Sipariş Detayı ve Ürün Görselleri */}
            {isExp && (
              <div className="p-4 sm:p-6 space-y-4 bg-white animate-in fade-in duration-200">
                <div className="divide-y divide-gray-100">
                  {order.orderItems?.map((item, i) => {
                    const imgUrl = getMinioUrl(item.imageUrl);
                    return (
                      <div key={i} className="py-3 first:pt-0 last:pb-0 flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3.5 group flex-1 min-w-0">
                          <div className="relative w-14 h-18 sm:w-16 sm:h-20 rounded-xl overflow-hidden bg-gray-100 shrink-0 border border-gray-200/80 shadow-2xs">
                            {imgUrl ? (
                              <Image
                                src={imgUrl}
                                alt={item.productName || "Ürün"}
                                fill
                                className="object-cover"
                                sizes="80px"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-gray-300 font-serif font-bold text-xs">
                                HQ
                              </div>
                            )}
                          </div>
                          <div className="min-w-0">
                            <h4 className="font-medium text-xs sm:text-sm text-gray-900 truncate">
                              {item.productName || "Ürün"}
                            </h4>
                            <div className="flex items-center gap-2 mt-1 text-[11px] text-gray-500 flex-wrap">
                              {item.sizeName && (
                                <span className="bg-gray-100 px-2 py-0.5 rounded-md font-medium text-gray-700">
                                  Beden: {item.sizeName}
                                </span>
                              )}
                              {item.colorName && (
                                <span className="bg-gray-100 px-2 py-0.5 rounded-md font-medium text-gray-700">
                                  Renk: {item.colorName}
                                </span>
                              )}
                              <span>Adet: {item.quantity}</span>
                            </div>
                          </div>
                        </div>

                        {/* Ürün Fiyatı */}
                        <div className="text-right shrink-0">
                          <span className="font-bold text-xs sm:text-sm text-gray-900">
                            {formatPrice(item.unitPrice * item.quantity)}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* 🌟 KARGO TAKİP & İADE ÇUBUĞU 🌟 */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pt-4 border-t border-gray-200/70 gap-3">
                  <div className="flex items-center gap-2 text-xs text-gray-600 flex-wrap">
                    <div className="flex items-center gap-1.5 font-medium text-gray-700">
                      <Truck size={14} className="text-[#4A5D3E] shrink-0" />
                      <span>{carrierName}:</span>
                    </div>

                    {trackingCode ? (
                      <>
                        <button
                          onClick={(e) => handleCopyTracking(trackingCode, e)}
                          className="inline-flex items-center gap-1.5 font-mono font-bold text-gray-800 bg-white border border-gray-200 px-2.5 py-1 rounded-lg hover:border-gray-400 transition-all cursor-pointer text-xs shadow-2xs group"
                          title="Kodu kopyala"
                        >
                          <span>{trackingCode}</span>
                          {copiedCode === trackingCode ? (
                            <Check size={12} className="text-emerald-500 shrink-0" />
                          ) : (
                            <Copy size={11} className="text-gray-400 group-hover:text-gray-700 shrink-0" />
                          )}
                        </button>

                        {trackingUrl && (
                          <a
                            href={trackingUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#4A5D3E] hover:text-[#38472F] bg-[#4A5D3E]/8 hover:bg-[#4A5D3E]/15 px-2.5 py-1 rounded-lg transition-colors border border-[#4A5D3E]/20"
                            title={`${carrierName} sitesinde sorgula`}
                          >
                            <span>Kargom Nerede?</span>
                            <ExternalLink size={11} />
                          </a>
                        )}
                      </>
                    ) : (
                      <span className="text-xs text-gray-400">Takip numarası henüz girilmedi</span>
                    )}
                  </div>

                  {/* İade Butonu */}
                  <div className="flex gap-2 self-end sm:self-auto">
                    <button className="flex items-center gap-1.5 text-xs font-semibold text-gray-700 bg-white border border-gray-200 px-3.5 py-2 rounded-xl hover:border-gray-400 hover:text-gray-900 transition-colors shadow-2xs cursor-pointer">
                      <RotateCcw size={13} /> Kolay İade Talebi
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

interface AddressItem {
  id: number;
  userId: number;
  title: string;
  fullName: string;
  phoneNumber: string;
  addressLine1: string;
  addressLine2?: string;
  countryId: number;
  countryName?: string;
  cityId: number;
  cityName?: string;
  districtId: number;
  districtName?: string;
  isDefault?: boolean;
}

interface CityOption {
  id: number;
  name: string;
}

interface DistrictOption {
  id: number;
  name: string;
  cityId: number;
}

function AddressesTab({ userId }: { userId?: number }) {
  const { toast } = useToast();
  const [addresses, setAddresses] = useState<AddressItem[]>([]);
  const [cities, setCities] = useState<CityOption[]>([]);
  const [districts, setDistricts] = useState<DistrictOption[]>([]);
  const [loading, setLoading] = useState(true);
  const [defaultId, setDefaultId] = useState<number | null>(null);
  const [settingDefaultId, setSettingDefaultId] = useState<number | null>(null);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<AddressItem | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<number | null>(null);

  // Form State
  const [formTitle, setFormTitle] = useState("Evim");
  const [formFullName, setFormFullName] = useState("");
  const [formPhone, setFormPhone] = useState("");
  const [formCityId, setFormCityId] = useState<number>(34);
  const [formDistrictId, setFormDistrictId] = useState<number>(0);
  const [formAddressLine1, setFormAddressLine1] = useState("");
  const [formAddressLine2, setFormAddressLine2] = useState("");
  const [formIsDefault, setFormIsDefault] = useState(false);
  const [formError, setFormError] = useState("");

  // 1. İlleri ve İlçeleri Çek
  useEffect(() => {
    async function loadLocations() {
      try {
        const [citiesRes, districtsRes] = await Promise.all([
          axiosInstance.get("/api/Cities/getall").catch(() => ({ data: [] })),
          axiosInstance.get("/api/Districts/getall").catch(() => ({ data: [] })),
        ]);

        const rawCities = Array.isArray(citiesRes.data)
          ? citiesRes.data
          : citiesRes.data?.data || citiesRes.data?.items || [];
        const rawDistricts = Array.isArray(districtsRes.data)
          ? districtsRes.data
          : districtsRes.data?.data || districtsRes.data?.items || [];

        setCities(rawCities);
        setDistricts(rawDistricts);
      } catch {
        // Sessiz hata yakalama
      }
    }
    loadLocations();
  }, []);

  // 2. Kullanıcının Adreslerini Çek
  const fetchAddresses = async (showLoading = true) => {
    if (!userId) {
      setLoading(false);
      return;
    }
    try {
      if (showLoading) setLoading(true);
      const res = await axiosInstance.get(`/api/Addresses/getall?userId=${userId}`);
      const rawData: AddressItem[] = Array.isArray(res.data)
        ? res.data
        : res.data?.data || res.data?.items || [];

      // Backend'deki IsDefault veya ilk adres varsayılan seçilir
      const defaultAddr = rawData.find((a) => a.isDefault);
      const defId = defaultAddr ? defaultAddr.id : rawData.length > 0 ? rawData[0].id : null;

      setDefaultId(defId);
      setAddresses(rawData);
    } catch {
      toast.error("Adresleriniz yüklenirken bir sorun oluştu.");
    } finally {
      if (showLoading) setLoading(false);
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, [userId]);

  // Varsayılan Yap (Backend API)
  const handleSetDefault = async (id: number) => {
    try {
      setSettingDefaultId(id);
      await axiosInstance.put("/api/Addresses/setdefault", {
        id,
        userId: Number(userId || 1),
      });
      setDefaultId(id);
      setAddresses((prev) =>
        prev.map((a) => ({
          ...a,
          isDefault: a.id === id,
        }))
      );
      toast.success("Varsayılan teslimat adresiniz güncellendi.");
      await fetchAddresses(false);
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Varsayılan adres güncellenemedi.");
      await fetchAddresses(false);
    } finally {
      setSettingDefaultId(null);
    }
  };

  // Silme İşlemi
  const handleDeleteAddress = async (id: number) => {
    try {
      await axiosInstance.delete("/api/Addresses", {
        data: { id },
      });
      toast.success("Teslimat adresi başarıyla silindi.");
      await fetchAddresses();
      setDeleteConfirmId(null);
    } catch {
      toast.error("Adres silinirken bir hata oluştu.");
    }
  };

  // Modalı Aç (Yeni veya Düzenle)
  const openModal = (addr?: AddressItem) => {
    setFormError("");
    if (addr) {
      setEditingAddress(addr);
      setFormTitle(addr.title || "Evim");
      setFormFullName(addr.fullName || "");
      setFormPhone(addr.phoneNumber || "");
      setFormCityId(addr.cityId || 34);
      setFormDistrictId(addr.districtId || 0);
      setFormAddressLine1(addr.addressLine1 || "");
      setFormAddressLine2(addr.addressLine2 || "");
      setFormIsDefault(addr.isDefault || defaultId === addr.id);
    } else {
      setEditingAddress(null);
      setFormTitle("Evim");
      setFormFullName("");
      setFormPhone("");
      setFormCityId(cities[0]?.id || 34);
      setFormDistrictId(0);
      setFormAddressLine1("");
      setFormAddressLine2("");
      setFormIsDefault(addresses.length === 0);
    }
    setIsModalOpen(true);
  };

  // Form Gönderimi (Ekle veya Güncelle)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formFullName.trim() || !formPhone.trim() || !formAddressLine1.trim()) {
      setFormError("Lütfen zorunlu alanları (Ad Soyad, Telefon, Açık Adres) doldurunuz.");
      return;
    }

    try {
      setSubmitting(true);
      setFormError("");

      const payload = {
        userId: Number(userId || 1),
        title: formTitle.trim() || "Adresim",
        fullName: formFullName.trim(),
        phoneNumber: formPhone.trim(),
        addressLine1: formAddressLine1.trim(),
        addressLine2: formAddressLine2.trim() || null,
        countryId: 1, // Türkiye
        cityId: Number(formCityId),
        districtId: Number(formDistrictId) || 1,
        isDefault: formIsDefault,
      };

      if (editingAddress) {
        // GÜNCELLE
        await axiosInstance.put("/api/Addresses", {
          ...payload,
          id: editingAddress.id,
        });
        toast.success("Adres bilgileriniz güncellendi.");
      } else {
        // YENİ EKLE
        await axiosInstance.post("/api/Addresses", payload);
        toast.success("Yeni teslimat adresi başarıyla eklendi.");
      }

      await fetchAddresses();
      setIsModalOpen(false);
    } catch (err: any) {
      const errMsg =
        err.response?.data?.message || err.response?.data || "Adres kaydedilirken bir hata oluştu.";
      setFormError(errMsg);
      toast.error(errMsg);
    } finally {
      setSubmitting(false);
    }
  };

  // Seçilen şehre göre filtrelenmiş ilçeler
  const availableDistricts = districts.filter((d) => Number(d.cityId) === Number(formCityId));

  return (
    <div className="space-y-4">
      {/* ─── Başlık & Yeni Ekle Butonu ─── */}
      <div className="flex items-center justify-between gap-4 pb-1">
        <div>
          <h2 className="font-serif text-lg sm:text-xl font-bold text-gray-900">Kayıtlı Adreslerim</h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
            Siparişlerinizin teslim edileceği adresleri yönetebilirsiniz.
          </p>
        </div>
        <button
          onClick={() => openModal()}
          className="inline-flex items-center gap-2 bg-[#4A5D3E] hover:bg-[#38472F] text-white text-xs sm:text-sm font-semibold px-4 py-2.5 rounded-xl transition-all shadow-xs cursor-pointer shrink-0"
        >
          <Plus size={16} />
          <span className="hidden sm:inline">Yeni Adres Ekle</span>
          <span className="sm:hidden">Ekle</span>
        </button>
      </div>

      {/* ─── Yükleniyor Durumu ─── */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-16 bg-white rounded-3xl border border-gray-100 shadow-2xs">
          <Loader2 className="w-8 h-8 text-[#4A5D3E] animate-spin mb-3" />
          <p className="text-xs sm:text-sm text-gray-500 font-medium">Adresleriniz yükleniyor...</p>
        </div>
      ) : addresses.length === 0 ? (
        /* ─── Boş Durum (Empty State) ─── */
        <div className="bg-white rounded-3xl border border-gray-100 shadow-2xs p-8 sm:p-12 text-center flex flex-col items-center">
          <div className="w-16 h-16 rounded-2xl bg-[#4A5D3E]/10 text-[#4A5D3E] flex items-center justify-center mb-4">
            <MapPin size={28} />
          </div>
          <h3 className="font-serif text-base sm:text-lg font-bold text-gray-900">
            Henüz Kayıtlı Bir Adresiniz Yok
          </h3>
          <p className="text-xs sm:text-sm text-gray-500 mt-1 max-w-sm leading-relaxed">
            Siparişlerinizi daha hızlı ve kolay tamamlamak için teslimat adresinizi hemen kaydedebilirsiniz.
          </p>
          <button
            onClick={() => openModal()}
            className="mt-6 inline-flex items-center gap-2 bg-[#4A5D3E] hover:bg-[#38472F] text-white text-xs sm:text-sm font-semibold px-5 py-3 rounded-xl transition-all shadow-xs cursor-pointer"
          >
            <Plus size={16} /> İlk Adresimi Ekle
          </button>
        </div>
      ) : (
        /* ─── Adres Kartları Listesi ─── */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {addresses.map((addr) => {
            const isDefault = defaultId === addr.id;
            return (
              <div
                key={addr.id}
                className={`bg-white rounded-3xl border shadow-2xs p-5 relative transition-all flex flex-col justify-between ${
                  isDefault
                    ? "border-[#4A5D3E] ring-1 ring-[#4A5D3E]/30 bg-gradient-to-br from-white to-[#4A5D3E]/3"
                    : "border-gray-100 hover:border-gray-200"
                }`}
              >
                {/* Rozet */}
                {isDefault && (
                  <span className="absolute top-4 right-4 text-[10px] font-black text-[#4A5D3E] bg-[#4A5D3E]/10 border border-[#4A5D3E]/20 px-2.5 py-0.5 rounded-full tracking-wider uppercase">
                    VARSAYILAN
                  </span>
                )}

                <div>
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 ${
                        isDefault ? "bg-[#4A5D3E] text-white" : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {addr.title?.toLowerCase().includes("iş") ||
                      addr.title?.toLowerCase().includes("ofis") ? (
                        <Building size={18} />
                      ) : (
                        <Home size={18} />
                      )}
                    </div>
                    <div className="flex-1 min-w-0 pr-14">
                      <p className="font-bold text-sm text-gray-900">{addr.title}</p>
                      <p className="text-xs font-semibold text-gray-800 mt-1">{addr.fullName}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{addr.phoneNumber}</p>
                    </div>
                  </div>

                  <div className="mt-3 pt-3 border-t border-gray-100 text-xs text-gray-600 space-y-1">
                    <p className="leading-relaxed font-normal">{addr.addressLine1}</p>
                    {addr.addressLine2 && (
                      <p className="text-gray-400 font-normal">{addr.addressLine2}</p>
                    )}
                    <p className="font-semibold text-gray-800 pt-0.5">
                      {addr.districtName ? `${addr.districtName} / ` : ""}
                      {addr.cityName || "İstanbul"}
                      {addr.countryName ? `, ${addr.countryName}` : ""}
                    </p>
                  </div>
                </div>

                {/* Butonlar */}
                <div className="flex items-center justify-between gap-2 mt-4 pt-3 border-t border-gray-100">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => openModal(addr)}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-700 hover:text-[#4A5D3E] border border-gray-200 hover:border-[#4A5D3E]/40 px-3 py-1.5 rounded-xl transition-colors cursor-pointer"
                    >
                      <Edit2 size={12} /> Düzenle
                    </button>
                    <button
                      onClick={() => setDeleteConfirmId(addr.id)}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-rose-600 hover:text-rose-700 hover:bg-rose-50 border border-transparent hover:border-rose-200 px-2.5 py-1.5 rounded-xl transition-colors cursor-pointer"
                      title="Adresi Sil"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>

                  {!isDefault && (
                    <button
                      onClick={() => handleSetDefault(addr.id)}
                      disabled={settingDefaultId === addr.id}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-600 hover:text-[#4A5D3E] hover:underline cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed"
                    >
                      {settingDefaultId === addr.id ? (
                        <>
                          <Loader2 className="w-3.5 h-3.5 animate-spin text-[#4A5D3E]" />
                          <span>Kaydediliyor...</span>
                        </>
                      ) : (
                        "Varsayılan Yap"
                      )}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ─── SİLME ONAY MODALI ─── */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center mx-auto mb-4">
              <AlertCircle size={24} />
            </div>
            <h3 className="font-serif text-base font-bold text-center text-gray-900">
              Adresi Silmek İstiyor Musunuz?
            </h3>
            <p className="text-xs text-gray-500 text-center mt-1.5 leading-relaxed">
              Bu teslimat adresini sildiğinizde işlem geri alınamaz.
            </p>
            <div className="grid grid-cols-2 gap-3 mt-6">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="w-full text-xs font-semibold text-gray-700 border border-gray-200 hover:bg-gray-50 py-2.5 rounded-xl transition-colors cursor-pointer"
              >
                Vazgeç
              </button>
              <button
                onClick={() => handleDeleteAddress(deleteConfirmId)}
                className="w-full text-xs font-semibold text-white bg-rose-600 hover:bg-rose-700 py-2.5 rounded-xl transition-colors cursor-pointer"
              >
                Evet, Sil
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ─── YENİ / DÜZENLEME ADRES MODALI (Mobil Uyumlu Bottom Sheet / Desktop Modal) ─── */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center sm:p-4">
          <div className="bg-white rounded-t-3xl sm:rounded-3xl max-w-lg w-full max-h-[92vh] sm:max-h-[88vh] flex flex-col shadow-2xl relative overflow-hidden animate-in slide-in-from-bottom sm:zoom-in-95 duration-200">
            {/* Modal Başlığı (Sabit Üst Bar) */}
            <div className="flex items-center justify-between p-5 sm:p-6 pb-4 border-b border-gray-100 shrink-0 bg-white">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-2xl bg-[#4A5D3E]/10 text-[#4A5D3E] flex items-center justify-center shrink-0">
                  <MapPin size={20} />
                </div>
                <div className="min-w-0">
                  <h3 className="font-serif text-base sm:text-lg font-bold text-gray-900 leading-snug truncate">
                    {editingAddress ? "Adresi Düzenle" : "Yeni Teslimat Adresi Ekle"}
                  </h3>
                  <p className="text-[11px] sm:text-xs text-gray-500 line-clamp-1">
                    Siparişlerinizin doğru adrese ulaşması için bilgileri doldurunuz.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-700 w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors cursor-pointer shrink-0 ml-2"
                aria-label="Kapat"
              >
                <X size={18} />
              </button>
            </div>

            {/* Form Alanı (Kaydırılabilir Gövde) */}
            <form onSubmit={handleSubmit} className="flex flex-col flex-1 min-h-0">
              <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-4">
                {formError && (
                  <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                    <AlertCircle size={15} className="shrink-0" />
                    <span>{formError}</span>
                  </div>
                )}

                {/* Adres Başlığı */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5 uppercase tracking-wide">
                    Adres Başlığı <span className="text-rose-500">*</span>
                  </label>
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {["Evim", "İş Yeri", "Yazlık"].map((preset) => (
                      <button
                        key={preset}
                        type="button"
                        onClick={() => setFormTitle(preset)}
                        className={`text-xs px-3.5 py-1.5 rounded-xl border font-semibold transition-all cursor-pointer ${
                          formTitle === preset
                            ? "bg-[#4A5D3E] text-white border-[#4A5D3E] shadow-2xs"
                            : "bg-gray-50 hover:bg-gray-100 text-gray-700 border-gray-200"
                        }`}
                      >
                        {preset}
                      </button>
                    ))}
                  </div>
                  <input
                    type="text"
                    placeholder="Veya Özel Başlık (Örn: Annemin Evi)"
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs outline-none focus:border-[#4A5D3E] transition-colors bg-white"
                  />
                </div>

                {/* Ad Soyad & Telefon */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5 uppercase tracking-wide">
                      Teslim Alacak Kişi <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ad Soyad"
                      value={formFullName}
                      onChange={(e) => setFormFullName(e.target.value)}
                      className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs outline-none focus:border-[#4A5D3E] transition-colors bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5 uppercase tracking-wide">
                      Telefon Numarası <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="05XX XXX XX XX"
                      value={formPhone}
                      onChange={(e) => setFormPhone(e.target.value)}
                      className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs outline-none focus:border-[#4A5D3E] transition-colors bg-white"
                    />
                  </div>
                </div>

                {/* İl & İlçe Seçimi (Kademeli Dropdown) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5 uppercase tracking-wide">
                      İl <span className="text-rose-500">*</span>
                    </label>
                    <select
                      value={formCityId}
                      onChange={(e) => {
                        const cid = Number(e.target.value);
                        setFormCityId(cid);
                        setFormDistrictId(0);
                      }}
                      className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs outline-none focus:border-[#4A5D3E] transition-colors bg-white cursor-pointer"
                    >
                      {cities.map((city) => (
                        <option key={city.id} value={city.id}>
                          {city.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5 uppercase tracking-wide">
                      İlçe <span className="text-rose-500">*</span>
                    </label>
                    <select
                      value={formDistrictId}
                      onChange={(e) => setFormDistrictId(Number(e.target.value))}
                      className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs outline-none focus:border-[#4A5D3E] transition-colors bg-white cursor-pointer"
                    >
                      <option value={0}>İlçe Seçiniz</option>
                      {availableDistricts.map((district) => (
                        <option key={district.id} value={district.id}>
                          {district.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Açık Adres (AddressLine1) */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5 uppercase tracking-wide">
                    Açık Adres (Mahalle, Cadde, Sokak, No) <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    rows={2}
                    required
                    placeholder="Örn: Caferağa Mah. Moda Cad. No: 12"
                    value={formAddressLine1}
                    onChange={(e) => setFormAddressLine1(e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs outline-none focus:border-[#4A5D3E] transition-colors resize-none bg-white"
                  />
                </div>

                {/* Daire / Not (AddressLine2) */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5 uppercase tracking-wide">
                    Bina / Daire / Adres Notu (Opsiyonel)
                  </label>
                  <input
                    type="text"
                    placeholder="Örn: Kat: 3 Daire: 7 (Zil: Yılmaz)"
                    value={formAddressLine2}
                    onChange={(e) => setFormAddressLine2(e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs outline-none focus:border-[#4A5D3E] transition-colors bg-white"
                  />
                </div>

                {/* Varsayılan Yap Checkbox */}
                <label className="flex items-center gap-2.5 pt-1 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={formIsDefault}
                    onChange={(e) => setFormIsDefault(e.target.checked)}
                    className="w-4 h-4 rounded text-[#4A5D3E] focus:ring-[#4A5D3E] accent-[#4A5D3E]"
                  />
                  <span className="text-xs font-medium text-gray-700">
                    Bu adresi varsayılan teslimat adresim yap
                  </span>
                </label>
              </div>

              {/* Sabit Alt Buton Alanı (Sticky Footer) */}
              <div className="p-4 sm:p-5 pt-3 border-t border-gray-100 bg-gray-50/90 shrink-0 grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="w-full text-xs font-semibold text-gray-700 border border-gray-200 bg-white hover:bg-gray-100 py-3 rounded-xl transition-colors cursor-pointer"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full text-xs font-semibold text-white bg-[#4A5D3E] hover:bg-[#38472F] py-3 rounded-xl transition-all shadow-xs disabled:opacity-60 cursor-pointer flex items-center justify-center gap-2"
                >
                  {submitting ? (
                    <>
                      <Loader2 size={14} className="animate-spin" />
                      <span>Kaydediliyor...</span>
                    </>
                  ) : (
                    <span>{editingAddress ? "Değişiklikleri Kaydet" : "Adresi Kaydet"}</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function AccountTab({
  initialUser,
}: {
  initialUser: any;
  onUserUpdated?: () => void;
}) {
  const { toast } = useToast();
  const inputCls =
    "w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#4A5D3E] transition-colors bg-white";
  const labelCls = "block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide";

  const fullName = initialUser?.name || "";
  const parts = fullName.split(" ");
  const [firstName, setFirstName] = useState(parts[0] || "");
  const [lastName, setLastName] = useState(parts.slice(1).join(" ") || "");
  const [email, setEmail] = useState(initialUser?.email || "");
  const [phone, setPhone] = useState(initialUser?.mobilePhones || initialUser?.phone || "");
  const [loading, setLoading] = useState(false);

  const userId = Number(initialUser?.id || initialUser?.userId || 1);

  // Veritabanından en güncel kullanıcı bilgilerini çek
  useEffect(() => {
    async function loadUserDetails() {
      if (!userId) return;
      try {
        const res = await axiosInstance.get(`/api/v1/Users/${userId}`);
        const data = res.data?.data || res.data;
        if (data) {
          if (data.fullName) {
            const splitted = data.fullName.trim().split(" ");
            setFirstName(splitted[0] || "");
            setLastName(splitted.slice(1).join(" ") || "");
          }
          if (data.email) setEmail(data.email);
          if (data.mobilePhones) setPhone(data.mobilePhones);
        }
      } catch {
        // Sessiz yakala
      }
    }
    loadUserDetails();
  }, [userId]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName.trim() || !email.trim()) {
      toast.error("Ad ve E-posta alanları zorunludur.");
      return;
    }

    try {
      setLoading(true);

      const payload = {
        userId,
        fullName: `${firstName.trim()} ${lastName.trim()}`.trim(),
        email: email.trim(),
        mobilePhones: phone.trim(),
      };

      await axiosInstance.put("/api/v1/Users", payload);
      toast.success("Kişisel bilgileriniz başarıyla güncellendi.");
    } catch (err: any) {
      const errMsg =
        err.response?.data?.message ||
        err.response?.data ||
        "Bilgiler güncellenirken bir hata oluştu.";
      toast.error(errMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <form
        onSubmit={handleSave}
        className="bg-white rounded-2xl border border-gray-100 shadow-2xs p-5 sm:p-6 space-y-5"
      >
        <h3 className="font-serif text-lg font-bold text-gray-900">Kişisel Bilgiler</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={labelCls}>Ad</label>
            <input
              className={inputCls}
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Adınız"
              required
            />
          </div>
          <div>
            <label className={labelCls}>Soyad</label>
            <input
              className={inputCls}
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Soyadınız"
            />
          </div>
          <div>
            <label className={labelCls}>E-posta Adresi</label>
            <input
              className={inputCls}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ornek@email.com"
              required
            />
          </div>
          <div>
            <label className={labelCls}>Telefon Numarası</label>
            <input
              className={inputCls}
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="05XX XXX XX XX"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all shadow-sm cursor-pointer w-full sm:w-auto bg-[#4A5D3E] hover:bg-[#3A4B30] text-white disabled:opacity-75 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <Loader2 size={15} className="animate-spin" />
              <span>Kaydediliyor...</span>
            </>
          ) : (
            <span>Değişiklikleri Kaydet</span>
          )}
        </button>
      </form>
    </div>
  );
}

function SecurityTab({ userId }: { userId?: number }) {
  const { toast } = useToast();
  const inputCls =
    "w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#4A5D3E] transition-colors bg-white";
  const labelCls = "block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide";

  const [currentPassword, setCurrentPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPassword) {
      toast.error("Lütfen mevcut şifrenizi giriniz.");
      return;
    }
    if (!password) {
      toast.error("Lütfen yeni şifrenizi giriniz.");
      return;
    }
    if (password.length < 6) {
      toast.error("Yeni şifre en az 6 karakter uzunluğunda olmalıdır.");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Yeni şifreler birbiriyle eşleşmiyor.");
      return;
    }

    try {
      setLoading(true);

      await axiosInstance.put("/api/v1/auth/user-password", {
        userId: Number(userId || 1),
        currentPassword,
        password,
      });

      toast.success("Şifreniz başarıyla güncellendi.");
      setCurrentPassword("");
      setPassword("");
      setConfirmPassword("");
    } catch (err: any) {
      const errMsg =
        err.response?.data?.message ||
        err.response?.data ||
        "Şifre güncellenirken bir hata oluştu.";
      toast.error(errMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <form
        onSubmit={handlePasswordChange}
        className="bg-white rounded-2xl border border-gray-100 shadow-2xs p-5 sm:p-6 space-y-4"
      >
        <h3 className="font-serif text-lg font-bold text-gray-900">Şifre Güncelle</h3>

        <div>
          <label className={labelCls}>Mevcut Şifre</label>
          <input
            className={inputCls}
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            placeholder="••••••••"
            required
          />
        </div>
        <div>
          <label className={labelCls}>Yeni Şifre</label>
          <input
            className={inputCls}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="En az 6 karakter"
            required
          />
        </div>
        <div>
          <label className={labelCls}>Yeni Şifre (Tekrar)</label>
          <input
            className={inputCls}
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="••••••••"
            required
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all shadow-sm cursor-pointer w-full sm:w-auto bg-[#4A5D3E] hover:bg-[#3A4B30] text-white disabled:opacity-75 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <Loader2 size={15} className="animate-spin" />
              <span>Güncelleniyor...</span>
            </>
          ) : (
            <span>Şifreyi Güncelle</span>
          )}
        </button>
      </form>
    </div>
  );
}

export default function ProfilimPage() {
  const { data: session, status } = useSession();
  const [activeTab, setActiveTab] = useState<Tab>("siparisler");
  const [ordersCount, setOrdersCount] = useState<number>(0);
  const { totalItems: cartCount } = useCart();
  const { totalItems: wishlistCount } = useWishlist();

  // Yükleme Durumu (Sadece ilk açılışta ve session henüz yokken)
  if (status === "loading" && !session) {
    return (
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-12 animate-pulse space-y-6">
        <div className="h-6 w-32 bg-gray-200 rounded" />
        <div className="h-36 w-full bg-gray-200 rounded-2xl" />
        <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-6">
          <div className="h-64 bg-gray-200 rounded-2xl" />
          <div className="h-96 bg-gray-200 rounded-2xl" />
        </div>
      </div>
    );
  }

  // 🌟 GİRİŞ YAPILMAMIŞSA KORUMA EKRANI 🌟
  if (status === "unauthenticated" || !session?.user) {
    return (
      <AuthRequiredView
        title="Profilinize Erişmek İçin Giriş Yapın"
        description="Siparişlerinizi takip etmek, teslimat adreslerinizi yönetmek, kuponlarınızı görmek ve kişisel bilgilerinizi düzenlemek için lütfen giriş yapınız."
        callbackUrl="/profilim"
        iconType="user"
      />
    );
  }

  const user = session.user;
  const displayName = user.name || user.email?.split("@")[0] || "Değerli Müşterimiz";
  const userInitials = displayName
    .split(" ")
    .map((w) => w.charAt(0).toUpperCase())
    .slice(0, 2)
    .join("");

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-8 py-4 sm:py-6 md:py-10">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-gray-400 mb-4 sm:mb-6">
        <Link href="/" className="hover:text-gray-700">Ana Sayfa</Link>
        <span>/</span>
        <span className="text-gray-700 font-medium">Hesabım</span>
      </nav>

      {/* ─── 1. PROFİL KARTI VE ETKİLEŞİMLİ İSTATİSTİK BUTONLARI ─── */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-2xs p-5 sm:p-7 mb-6 sm:mb-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
          {/* Avatar & İsim */}
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-2xl bg-[#4A5D3E] flex items-center justify-center text-white font-bold text-xl sm:text-2xl font-serif shadow-md shrink-0">
              {userInitials || "HQ"}
            </div>
            <div className="min-w-0">
              <h1 className="font-serif text-xl sm:text-2xl font-bold text-gray-900 truncate">
                {displayName}
              </h1>
              <p className="text-xs sm:text-sm text-gray-500 truncate mt-0.5">{user.email}</p>
            </div>
          </div>

          {/* 🌟 TIKLANABİLİR İSTATİSTİK BUTONLARI (Sipariş, Favori, Sepet) 🌟 */}
          <div className="flex items-center gap-2 sm:gap-3 w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 pt-4 md:pt-0 border-gray-100">
            {/* Sipariş Butonu */}
            <button
              onClick={() => setActiveTab("siparisler")}
              className={`flex flex-col items-center justify-center py-2.5 px-3 sm:py-3 sm:px-4 rounded-2xl border transition-all cursor-pointer flex-1 md:flex-initial min-w-[68px] sm:min-w-[80px] ${
                activeTab === "siparisler"
                  ? "bg-[#4A5D3E]/10 border-[#4A5D3E] text-[#4A5D3E]"
                  : "bg-gray-50/70 hover:bg-gray-100/80 border-gray-200/70 text-gray-700"
              }`}
              title="Siparişlerime git"
            >
              <span className="font-bold text-base sm:text-lg leading-none text-gray-900">
                {ordersCount}
              </span>
              <span className="text-[11px] text-gray-500 font-medium mt-1">Sipariş</span>
            </button>

            {/* Favoriler Butonu */}
            <Link
              href="/favoriler"
              className="flex flex-col items-center justify-center py-2.5 px-3 sm:py-3 sm:px-4 rounded-2xl border border-gray-200/70 bg-gray-50/70 hover:bg-rose-50 hover:border-rose-200 transition-all cursor-pointer flex-1 md:flex-initial min-w-[68px] sm:min-w-[80px] group"
              title="Favorilerime git"
            >
              <span className="font-bold text-base sm:text-lg leading-none text-gray-900 group-hover:text-rose-600 transition-colors">
                {wishlistCount}
              </span>
              <span className="text-[11px] text-gray-500 font-medium mt-1">Favoriler</span>
            </Link>

            {/* Sepet Butonu */}
            <Link
              href="/sepet"
              className="flex flex-col items-center justify-center py-2.5 px-3 sm:py-3 sm:px-4 rounded-2xl border border-gray-200/70 bg-gray-50/70 hover:bg-emerald-50 hover:border-emerald-200 transition-all cursor-pointer flex-1 md:flex-initial min-w-[68px] sm:min-w-[80px] group"
              title="Sepetime git"
            >
              <span className="font-bold text-base sm:text-lg leading-none text-gray-900 group-hover:text-[#4A5D3E] transition-colors">
                {cartCount}
              </span>
              <span className="text-[11px] text-gray-500 font-medium mt-1">Sepetim</span>
            </Link>

            {/* Güvenli Çıkış (Yalnızca Çıkışta İkon Var) */}
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-1.5 py-2.5 px-3 sm:px-3.5 sm:py-3 rounded-2xl border border-gray-200/70 bg-white hover:bg-red-50 hover:border-red-200 hover:text-red-600 text-gray-600 transition-all cursor-pointer text-xs font-semibold shrink-0"
              title="Güvenli Çıkış Yap"
            >
              <LogOut size={16} className="text-gray-500 group-hover:text-red-600" />
              <span className="text-[11px] sm:text-xs">Çıkış</span>
            </button>
          </div>
        </div>
      </div>

      {/* ─── 2. MOBİL UYUMLU SEKME VE İÇERİK YERLEŞİMİ ─── */}
      {/* Mobil Sekme Çubuğu */}
      <div className="flex md:hidden items-center gap-2 overflow-x-auto scrollbar-hide mb-5 pb-1 -mx-4 px-4">
        {tabs.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-bold shrink-0 transition-all cursor-pointer border ${
              activeTab === id
                ? "bg-[#4A5D3E] text-white border-[#4A5D3E] shadow-xs"
                : "bg-white text-gray-600 border-gray-200 hover:border-gray-400"
            }`}
          >
            <Icon size={14} />
            <span>{label}</span>
          </button>
        ))}
      </div>

      {/* Masaüstü Sidebar + İçerik Düzeni */}
      <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-6">
        {/* Masaüstü Sekme Menüsü */}
        <aside className="hidden md:block">
          <nav className="bg-white rounded-2xl border border-gray-100 shadow-2xs overflow-hidden p-1.5 space-y-1 sticky top-24">
            {tabs.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                  activeTab === id
                    ? "text-[#4A5D3E] bg-[#4A5D3E]/10"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                <Icon size={16} className={activeTab === id ? "text-[#4A5D3E]" : "text-gray-400"} />
                {label}
              </button>
            ))}
          </nav>
        </aside>

        {/* Sekme İçerikleri */}
        <div className="min-w-0">
          {activeTab === "siparisler" && (
            <OrdersTab
              userId={Number((user as any).id || (user as any).userId || 1)}
              onOrdersLoaded={setOrdersCount}
            />
          )}
          {activeTab === "adresler" && (
            <AddressesTab userId={Number((user as any).id || (user as any).userId || 1)} />
          )}
          {activeTab === "hesap" && <AccountTab initialUser={user} />}
          {activeTab === "guvenlik" && (
            <SecurityTab userId={Number((user as any).id || (user as any).userId || 1)} />
          )}
        </div>
      </div>
    </div>
  );
}
