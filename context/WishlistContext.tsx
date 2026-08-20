"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";
import { useSession } from "next-auth/react";
import { Product } from "@/types/api.types";
import { axiosInstance } from "@/lib/axios";
import AuthPromptModal from "@/components/auth/AuthPromptModal";

const STORAGE_KEY = "haqan_user_wishlist";

interface WishlistContextValue {
  items: Product[];
  addItem: (product: Product) => boolean;
  removeItem: (id: string | number) => void;
  isWishlisted: (id: string | number) => boolean;
  toggleItem: (product: Product) => boolean;
  totalItems: number;
  openAuthModal: () => void;
}

const WishlistContext = createContext<WishlistContextValue | null>(null);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const { data: session, status } = useSession();
  const [items, setItems] = useState<Product[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);

  const isAuthenticated = status === "authenticated" && Boolean(session?.user);

  // 🌟 GÜVENLİ USER ID ÇÖZÜMLEME (Session / Token JWT Payload) 🌟
  const getNumericUserId = useCallback((): number | null => {
    // 1. Session nesnesinden doğrudan oku
    const rawDirect = (session?.user as any)?.userId || (session?.user as any)?.id;
    const directParsed = Number(rawDirect);
    if (!isNaN(directParsed) && directParsed > 0) {
      return directParsed;
    }

    // 2. JWT Access Token'dan decode et
    const token = (session as any)?.accessToken || (session as any)?.token;
    if (token && typeof token === "string" && token.includes(".")) {
      try {
        const payloadBase64 = token.split(".")[1];
        if (payloadBase64) {
          const payloadJson = JSON.parse(
            typeof window !== "undefined"
              ? atob(payloadBase64.replace(/-/g, "+").replace(/_/g, "/"))
              : Buffer.from(payloadBase64, "base64").toString("utf-8")
          );

          const claimId =
            payloadJson["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"] ||
            payloadJson["nameid"] ||
            payloadJson["sub"] ||
            payloadJson["userId"] ||
            payloadJson["UserId"];

          const parsed = Number(claimId);
          if (!isNaN(parsed) && parsed > 0) {
            return parsed;
          }
        }
      } catch (e) {
        console.warn("JWT token decode edilemedi:", e);
      }
    }

    return null;
  }, [session]);

  const currentUserId = getNumericUserId();

  // 🌟 1. İLK AÇILIŞTA LOCALSTORAGE'DAN ANINDA YÜKLE (0ms) 🌟
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setItems(parsed);
        }
      }
    } catch (e) {
      console.warn("LocalStorage okunamadı:", e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // 🌟 2. KULLANICI ÇIKIŞ YAPTIĞINDA STATE VE LOCALSTORAGE'I TEMİZLE 🌟
  useEffect(() => {
    if (status === "unauthenticated") {
      setItems([]);
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch {}
    }
  }, [status]);

  // 🌟 3. HER DEĞİŞİKLİKTE LOCALSTORAGE'A KALICI YAZ 🌟
  useEffect(() => {
    if (!isLoaded || !isAuthenticated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.warn("LocalStorage kaydedilemedi:", e);
    }
  }, [items, isLoaded, isAuthenticated]);

  // 🌟 4. KULLANICI GİRİŞ YAPTIĞINDA BACKEND'DEN (PostgreSQL) ÇEK & BİRLEŞTİR 🌟
  useEffect(() => {
    if (!isAuthenticated || !currentUserId) return;

    let isMounted = true;

    async function syncFromBackend() {
      try {
        const res = await axiosInstance.get(`/api/ProductFavorites/getall?userId=${currentUserId}`);
        const serverData = res.data;
        const serverFavorites = Array.isArray(serverData)
          ? serverData
          : serverData?.data || serverData?.items || [];

        if (serverFavorites.length > 0 && isMounted) {
          setItems((prevItems) => {
            const map = new Map<string, Product>();
            // Önce yereldekileri ekle
            prevItems.forEach((p) => map.set(String(p.id), p));

            // Sunucudan gelenleri ekle
            serverFavorites.forEach((fav: any) => {
              const pid = String(fav.productId || fav.id);
              if (!map.has(pid)) {
                map.set(pid, {
                  id: fav.productId || fav.id,
                  name: fav.productName || "Favori Ürün",
                  slug: fav.slug || String(fav.productId || fav.id),
                  basePrice: fav.price || 0,
                  mainImageUrl: fav.imageUrl || "",
                  images: fav.imageUrl
                    ? [{ id: 1, imageUrl: fav.imageUrl, isProductMain: true, isMain: true }]
                    : [],
                  colors: [],
                  variants: [],
                });
              }
            });

            return Array.from(map.values());
          });
        }
      } catch (err) {
        console.warn("Favoriler backend'den çekilemedi:", err);
      }
    }

    syncFromBackend();

    return () => {
      isMounted = false;
    };
  }, [isAuthenticated, currentUserId]);

  // 🌟 4. FAVORİLERE EKLEME (Optimistic UI + Backend PostgreSQL Kaydı) 🌟
  const addItem = useCallback(
    (product: Product): boolean => {
      if (!isAuthenticated) {
        setAuthModalOpen(true);
        return false;
      }

      const prodId = String(product.id);

      // Anında UI güncellemesi (0ms)
      setItems((prev) => {
        if (prev.some((i) => String(i.id) === prodId)) return prev;
        return [product, ...prev];
      });

      // Arka planda PostgreSQL'e POST /api/ProductFavorites at
      const uid = getNumericUserId();
      const numProdId = Number(product.id);

      if (uid && numProdId) {
        console.log("👉 Favori DB'ye kaydediliyor... UserId:", uid, "ProductId:", numProdId);
        axiosInstance
          .post("/api/ProductFavorites", {
            userId: uid,
            productId: numProdId,
          })
          .then((res) => {
            console.log("✅ Favori PostgreSQL DB'ye kaydedildi:", res.data);
          })
          .catch((err) => {
            console.error("❌ Favori DB kayıt hatası:", err.response?.data || err.message);
          });
      } else {
        console.warn("⚠️ UserId veya ProductId bulunamadı:", { uid, numProdId });
      }

      return true;
    },
    [isAuthenticated, getNumericUserId]
  );

  // 🌟 5. FAVORİLERDEN ÇIKARMA (Optimistic UI + Backend PostgreSQL Silme) 🌟
  const removeItem = useCallback(
    (id: string | number) => {
      const prodId = String(id);

      // Anında UI'dan çıkar (0ms)
      setItems((prev) => prev.filter((i) => String(i.id) !== prodId));

      // Arka planda PostgreSQL'den DELETE /api/ProductFavorites at
      const uid = getNumericUserId();
      const numProdId = Number(id);

      if (uid && numProdId) {
        console.log("👉 Favori DB'den siliniyor... UserId:", uid, "ProductId:", numProdId);
        axiosInstance
          .delete("/api/ProductFavorites", {
            data: {
              userId: uid,
              productId: numProdId,
            },
          })
          .then(() => {
            console.log("✅ Favori PostgreSQL DB'den silindi");
          })
          .catch((err) => {
            console.error("❌ Favori DB silme hatası:", err.response?.data || err.message);
          });
      }
    },
    [getNumericUserId]
  );

  const isWishlisted = useCallback(
    (id: string | number) => items.some((i) => String(i.id) === String(id)),
    [items]
  );

  const toggleItem = useCallback(
    (product: Product): boolean => {
      if (!isAuthenticated) {
        setAuthModalOpen(true);
        return false;
      }

      if (isWishlisted(product.id)) {
        removeItem(product.id);
      } else {
        addItem(product);
      }
      return true;
    },
    [isAuthenticated, isWishlisted, removeItem, addItem]
  );

  return (
    <WishlistContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        isWishlisted,
        toggleItem,
        totalItems: items.length,
        openAuthModal: () => setAuthModalOpen(true),
      }}
    >
      {children}
      {/* Giriş Yapılmamışsa Koruma Modalı */}
      <AuthPromptModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        title="Favorilere Eklemek İçin Giriş Yapın"
        description="Beğendiğiniz tasarımları favorilerinize eklemek ve size özel listeler oluşturmak için lütfen üye girişi yapınız."
      />
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used within WishlistProvider");
  return ctx;
}
