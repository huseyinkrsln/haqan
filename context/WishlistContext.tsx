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
import { Outfit } from "@/hooks/useOutfits";
import { axiosInstance } from "@/lib/axios";
import AuthPromptModal from "@/components/auth/AuthPromptModal";

const STORAGE_KEY = "haqan_user_wishlist";
const STORAGE_KEY_OUTFITS = "haqan_user_wishlist_outfits";

interface WishlistContextValue {
  items: Product[];
  outfits: Outfit[];
  addItem: (product: Product) => boolean;
  removeItem: (id: string | number) => void;
  isWishlisted: (id: string | number) => boolean;
  toggleItem: (product: Product) => boolean;
  addOutfit: (outfit: Outfit) => boolean;
  removeOutfit: (outfitId: number) => void;
  isOutfitWishlisted: (outfitId: number) => boolean;
  toggleOutfit: (outfit: Outfit) => boolean;
  totalItems: number;
  totalProducts: number;
  totalOutfits: number;
  openAuthModal: () => void;
}

const WishlistContext = createContext<WishlistContextValue | null>(null);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const { data: session, status } = useSession();
  const [items, setItems] = useState<Product[]>([]);
  const [outfits, setOutfits] = useState<Outfit[]>([]);
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
      const savedProducts = localStorage.getItem(STORAGE_KEY);
      if (savedProducts) {
        const parsed = JSON.parse(savedProducts);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setItems(parsed);
        }
      }

      const savedOutfits = localStorage.getItem(STORAGE_KEY_OUTFITS);
      if (savedOutfits) {
        const parsed = JSON.parse(savedOutfits);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setOutfits(parsed);
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
      setOutfits([]);
      try {
        localStorage.removeItem(STORAGE_KEY);
        localStorage.removeItem(STORAGE_KEY_OUTFITS);
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

  useEffect(() => {
    if (!isLoaded || !isAuthenticated) return;
    try {
      localStorage.setItem(STORAGE_KEY_OUTFITS, JSON.stringify(outfits));
    } catch (e) {
      console.warn("LocalStorage kaydedilemedi:", e);
    }
  }, [outfits, isLoaded, isAuthenticated]);

  // 🌟 4. KULLANICI GİRİŞ YAPTIĞINDA BACKEND'DEN (PostgreSQL) ÇEK & SENKRONİZE ET 🌟
  useEffect(() => {
    if (!isAuthenticated) return;

    let isMounted = true;

    async function syncFromBackend() {
      // 4.1. Ürün Favorilerini Çek
      try {
        const res = await axiosInstance.get(`/api/ProductFavorites/my-favorites`);
        const serverData = res.data;
        const serverFavorites = Array.isArray(serverData)
          ? serverData
          : serverData?.data || serverData?.items || [];

        if (isMounted) {
          const map = new Map<string, Product>();

          serverFavorites.forEach((fav: any) => {
            const pid = String(fav.id || fav.productId);
            map.set(pid, {
              id: fav.id,
              name: fav.name || "Favori Ürün",
              slug: fav.slug || String(fav.id),
              basePrice: fav.basePrice || 0,
              discountPrice: fav.discountPrice,
              mainImageUrl: fav.mainImageUrl || "",
              categoryName: fav.categoryName,
              brandName: fav.brandName,
              inStock: fav.inStock ?? true,
              totalStock: fav.totalStock,
              images: fav.mainImageUrl
                ? [{ id: 1, imageUrl: fav.mainImageUrl, isProductMain: true, isMain: true }]
                : [],
              variants: (fav.variants || []).map((v: any) => ({
                id: v.variantId,
                variantId: v.variantId,
                sizeName: v.sizeName,
                colorName: v.colorName,
                stockQuantity: v.stockQuantity,
              })),
            });
          });

          setItems(Array.from(map.values()));
        }
      } catch (err) {
        console.warn("Ürün favorileri backend'den çekilemedi:", err);
      }

      // 4.2. Kombin Favorilerini Çek
      try {
        const outfitRes = await axiosInstance.get(`/api/OutfitFavorites/my-favorites`);
        const outfitData = outfitRes.data;
        const serverOutfits: Outfit[] = Array.isArray(outfitData)
          ? outfitData
          : outfitData?.data || [];

        if (isMounted && Array.isArray(serverOutfits)) {
          setOutfits(serverOutfits);
        }
      } catch (err) {
        console.warn("Kombin favorileri backend'den çekilemedi:", err);
      }
    }

    syncFromBackend();

    return () => {
      isMounted = false;
    };
  }, [isAuthenticated]);

  // 🌟 5. ÜRÜN FAVORİLERİNE EKLEME & ÇIKARMA 🌟
  const addItem = useCallback(
    (product: Product): boolean => {
      if (!isAuthenticated) {
        setAuthModalOpen(true);
        return false;
      }

      const prodId = String(product.id);

      setItems((prev) => {
        if (prev.some((i) => String(i.id) === prodId)) return prev;
        return [product, ...prev];
      });

      const uid = getNumericUserId();
      const numProdId = Number(product.id);

      if (uid && numProdId) {
        axiosInstance
          .post("/api/ProductFavorites", {
            userId: uid,
            productId: numProdId,
          })
          .catch((err) => {
            console.error("❌ Favori DB kayıt hatası:", err.response?.data || err.message);
          });
      }

      return true;
    },
    [isAuthenticated, getNumericUserId]
  );

  const removeItem = useCallback(
    (id: string | number) => {
      const prodId = String(id);
      setItems((prev) => prev.filter((i) => String(i.id) !== prodId));

      const uid = getNumericUserId();
      const numProdId = Number(id);

      if (uid && numProdId) {
        axiosInstance
          .delete("/api/ProductFavorites", {
            data: {
              userId: uid,
              productId: numProdId,
            },
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

  // 🌟 6. KOMBİN FAVORİLERİNE EKLEME & ÇIKARMA 🌟
  const addOutfit = useCallback(
    (outfit: Outfit): boolean => {
      if (!isAuthenticated) {
        setAuthModalOpen(true);
        return false;
      }

      setOutfits((prev) => {
        if (prev.some((o) => o.id === outfit.id)) return prev;
        return [outfit, ...prev];
      });

      const uid = getNumericUserId();
      if (uid && outfit.id) {
        axiosInstance
          .post("/api/OutfitFavorites", {
            userId: uid,
            outfitId: outfit.id,
          })
          .then(() => {
            console.log("✅ Kombin favorilere kaydedildi:", outfit.id);
          })
          .catch((err) => {
            console.error("❌ Kombin favori kayıt hatası:", err.response?.data || err.message);
          });
      }

      return true;
    },
    [isAuthenticated, getNumericUserId]
  );

  const removeOutfit = useCallback(
    (outfitId: number) => {
      setOutfits((prev) => prev.filter((o) => o.id !== outfitId));

      const uid = getNumericUserId();
      if (uid && outfitId) {
        axiosInstance
          .delete("/api/OutfitFavorites", {
            data: {
              userId: uid,
              outfitId: outfitId,
            },
          })
          .then(() => {
            console.log("✅ Kombin favorilerden silindi:", outfitId);
          })
          .catch((err) => {
            console.error("❌ Kombin favori silme hatası:", err.response?.data || err.message);
          });
      }
    },
    [getNumericUserId]
  );

  const isOutfitWishlisted = useCallback(
    (outfitId: number) => outfits.some((o) => o.id === outfitId),
    [outfits]
  );

  const toggleOutfit = useCallback(
    (outfit: Outfit): boolean => {
      if (!isAuthenticated) {
        setAuthModalOpen(true);
        return false;
      }

      if (isOutfitWishlisted(outfit.id)) {
        removeOutfit(outfit.id);
      } else {
        addOutfit(outfit);
      }
      return true;
    },
    [isAuthenticated, isOutfitWishlisted, removeOutfit, addOutfit]
  );

  const totalProducts = items.length;
  const totalOutfits = outfits.length;
  const totalItems = totalProducts + totalOutfits;

  return (
    <WishlistContext.Provider
      value={{
        items,
        outfits,
        addItem,
        removeItem,
        isWishlisted,
        toggleItem,
        addOutfit,
        removeOutfit,
        isOutfitWishlisted,
        toggleOutfit,
        totalItems,
        totalProducts,
        totalOutfits,
        openAuthModal: () => setAuthModalOpen(true),
      }}
    >
      {children}
      {/* Giriş Yapılmamışsa Koruma Modalı */}
      <AuthPromptModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        title="Favorilere Eklemek İçin Giriş Yapın"
        description="Beğendiğiniz ürün ve kombinleri favorilerinize eklemek ve size özel listeler oluşturmak için lütfen üye girişi yapınız."
      />
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used within WishlistProvider");
  return ctx;
}
