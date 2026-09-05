"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
  ReactNode,
} from "react";
import { useSession } from "next-auth/react";
import { axiosInstance } from "@/lib/axios";
import { getMinioUrl } from "@/lib/utils";
import AuthPromptModal from "@/components/auth/AuthPromptModal";

const STORAGE_KEY = "haqan_user_cart";

export interface CartItem {
  id: string | number;
  productId?: number;
  cartItemId?: number;
  variantId?: number;
  outfitId?: number;
  outfitTitle?: string;
  outfitCoverImageUrl?: string;
  outfitPrice?: number;
  originalPrice?: number;
  name: string;
  price: number;
  image: string;
  size: string;
  color: string;
  quantity: number;
  slug: string;
  availableVariants?: { id: number; sizeName: string; stockQuantity: number }[];
}

interface CartContextValue {
  items: CartItem[];
  addItem: (item: CartItem) => boolean;
  addMultipleItems: (items: CartItem[]) => boolean;
  removeItem: (id: string | number, size: string, color: string) => void;
  updateQuantity: (
    id: string | number,
    size: string,
    color: string,
    quantity: number
  ) => void;
  increaseQuantity: (id: string | number, size: string, color: string) => void;
  decreaseQuantity: (id: string | number, size: string, color: string) => void;
  updateOutfitQuantity: (outfitId: number, quantity: number) => void;
  removeOutfit: (outfitId: number) => void;
  updateItemVariant: (
    cartItemIdOrId: number | string,
    variantId: number,
    sizeName: string
  ) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  openAuthModal: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const { data: session, status } = useSession();
  const [items, setItems] = useState<CartItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const cartIdRef = useRef<number | null>(null);
  const itemsRef = useRef<CartItem[]>([]);
  const debounceTimers = useRef<Map<string, NodeJS.Timeout>>(new Map());

  useEffect(() => {
    itemsRef.current = items;
  }, [items]);

  const isAuthenticated = status === "authenticated" && Boolean(session?.user);

  // 🌟 1. GÜVENLİ USER ID ÇÖZÜMLEME 🌟
  const getNumericUserId = useCallback((): number | null => {
    const rawDirect = (session?.user as any)?.userId || (session?.user as any)?.id;
    const directParsed = Number(rawDirect);
    if (!isNaN(directParsed) && directParsed > 0) return directParsed;

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
          if (!isNaN(parsed) && parsed > 0) return parsed;
        }
      } catch (e) {
        console.warn("Cart JWT decode error:", e);
      }
    }
    return null;
  }, [session]);

  const currentUserId = getNumericUserId();

  // 🌟 2. YEREL HAFIZADAN ANINDA YÜKLE (0ms) 🌟
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) || localStorage.getItem("haqan-cart");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setItems(parsed);
        }
      }
    } catch (e) {
      console.warn("Sepet okunamadı:", e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // 🌟 3. KULLANICI ÇIKIŞ YAPTIĞINDA SEPETİ VE LOCALSTORAGE'I TEMİZLE 🌟
  useEffect(() => {
    if (status === "unauthenticated") {
      setItems([]);
      cartIdRef.current = null;
      try {
        localStorage.removeItem(STORAGE_KEY);
        localStorage.removeItem("haqan-cart");
      } catch {}
    }
  }, [status]);

  // 🌟 4. HER DEĞİŞİKLİKTE LOCALSTORAGE'A YAZ 🌟
  useEffect(() => {
    if (!isLoaded || !isAuthenticated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.warn("Sepet kaydedilemedi:", e);
    }
  }, [items, isLoaded, isAuthenticated]);

  // 🌟 4. BACKEND'DEN KULLANICININ AKTİF SEPETİNİ AL / OLUŞTUR 🌟
  const ensureBackendCart = useCallback(async (userId: number): Promise<number | null> => {
    if (cartIdRef.current) return cartIdRef.current;
    try {
      const res = await axiosInstance.get(`/api/Carts/getall?userId=${userId}`);
      const raw = res.data;
      const list: any[] = Array.isArray(raw)
        ? raw
        : raw?.data || raw?.items || [];

      const now = new Date();
      const existingCart = list.find((c) => !c.expiresAt || new Date(c.expiresAt) > now);

      if (existingCart) {
        cartIdRef.current = existingCart.id;
        return existingCart.id;
      }

      // Yeni sepet oluştur
      const createRes = await axiosInstance.post("/api/Carts", {
        userId,
      });

      const newId = createRes.data?.data?.id || createRes.data?.id;
      if (newId) {
        cartIdRef.current = newId;
        return newId;
      }
    } catch (err) {
      console.warn("Kullanıcı sepeti oluşturulamadı/alınamadı:", err);
    }
    return null;
  }, []);

  // 🌟 5. KULLANICI GİRİŞ YAPTIĞINDA BACKEND SEPETİNİ ÇEK VE SENKRONİZE ET 🌟
  useEffect(() => {
    if (!isAuthenticated || !currentUserId) return;

    let isMounted = true;

    async function syncCartFromBackend() {
      const cartId = await ensureBackendCart(currentUserId!);
      if (!cartId || !isMounted) return;

      try {
        const res = await axiosInstance.get(`/api/CartItems/getall?cartId=${cartId}`);
        const raw = res.data;
        const dbItems: any[] = Array.isArray(raw) ? raw : raw?.data || [];

        if (isMounted) {
          if (dbItems.length > 0) {
            const mappedItems: CartItem[] = dbItems.map((di) => ({
              id: String(di.productId || di.productVariantId),
              productId: di.productId,
              cartItemId: di.id,
              variantId: di.productVariantId,
              name: di.productName || "Ürün",
              price: Number(di.price) || 0,
              image: getMinioUrl(di.imageUrl),
              size: di.sizeName || "Standart",
              color: di.colorName || "Standart",
              quantity: Number(di.quantity) || 1,
              slug: di.productSlug || (di.productId ? String(di.productId) : (di.productCode || di.sku || String(di.productVariantId))),
              outfitId: di.outfitId || undefined,
              outfitTitle: di.outfitTitle || undefined,
              outfitCoverImageUrl: di.outfitCoverImageUrl ? getMinioUrl(di.outfitCoverImageUrl) : undefined,
              outfitPrice: di.outfitPrice ? Number(di.outfitPrice) : undefined,
            }));

            setItems(mappedItems);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(mappedItems));
          } else {
            setItems([]);
            localStorage.removeItem(STORAGE_KEY);
          }
        }
      } catch (err) {
        console.warn("Backend sepet kalemleri yüklenemedi:", err);
      }
    }

    syncCartFromBackend();

    return () => {
      isMounted = false;
    };
  }, [isAuthenticated, currentUserId, ensureBackendCart]);

  // 🌟 6. BEKLEYEN SEPET ÖĞESİNİ OTOMATİK EKLE (Giriş Sonrası) 🌟
  useEffect(() => {
    if (isAuthenticated) {
      try {
        const pending = sessionStorage.getItem("haqan-pending-cart-item");
        if (pending) {
          const item: CartItem = JSON.parse(pending);
          addItem(item);
          sessionStorage.removeItem("haqan-pending-cart-item");
        }
      } catch {}
    }
  }, [isAuthenticated]);

  // 🌟 7. SEPETE EKLE (0ms Optimistic UI + Arka Plan DB Kaydı) 🌟
  const addItem = useCallback(
    (item: CartItem): boolean => {
      if (!isAuthenticated) {
        try {
          sessionStorage.setItem("haqan-pending-cart-item", JSON.stringify(item));
        } catch {}
        setAuthModalOpen(true);
        return false;
      }

      const key = `${item.id}-${item.size}-${item.color}`;

      // 0 ms Anlık Arayüz Güncellemesi
      setItems((prev) => {
        const existingIndex = prev.findIndex(
          (i) => `${i.id}-${i.size}-${i.color}` === key
        );
        if (existingIndex >= 0) {
          const updated = [...prev];
          updated[existingIndex] = {
            ...updated[existingIndex],
            quantity: updated[existingIndex].quantity + item.quantity,
          };
          return updated;
        }
        return [...prev, item];
      });

      // Arka Planda Veritabanına Yazma (Non-blocking)
      if (currentUserId) {
        ensureBackendCart(currentUserId).then(async (cartId) => {
          if (!cartId) return;
          try {
            const variantId = Number(item.variantId || item.id);
            const res = await axiosInstance.post("/api/CartItems", {
              cartId,
              productVariantId: variantId,
              quantity: item.quantity,
              outfitId: item.outfitId || null,
            });
            const createdCartItemId = res.data?.data?.id || res.data?.id;
            if (createdCartItemId) {
              setItems((prev) =>
                prev.map((i) =>
                  `${i.id}-${i.size}-${i.color}` === key
                    ? { ...i, cartItemId: createdCartItemId }
                    : i
                )
              );
            }
            console.log("🛒 [DB Sync] Sepet ürünü PostgreSQL'e kaydedildi:", res.data);
          } catch (e) {
            console.warn("Sepet DB sync hatası:", e);
          }
        });
      }

      return true;
    },
    [isAuthenticated, currentUserId, ensureBackendCart]
  );

  // 🌟 7.2. TOPLU ÜRÜN EKLEME (KOMBİN / LOOKBOOK İÇİN) 🌟
  const addMultipleItems = useCallback(
    (newItems: CartItem[]) => {
      if (!isAuthenticated) {
        setAuthModalOpen(true);
        return false;
      }

      if (!newItems || newItems.length === 0) return false;

      setItems((prev) => {
        let current = [...prev];
        for (const item of newItems) {
          const key = `${item.id}-${item.size}-${item.color}`;
          const existingIndex = current.findIndex(
            (i) => `${i.id}-${i.size}-${i.color}` === key
          );
          if (existingIndex > -1) {
            current[existingIndex] = {
              ...current[existingIndex],
              quantity: current[existingIndex].quantity + item.quantity,
            };
          } else {
            current.push(item);
          }
        }
        return current;
      });

      if (currentUserId) {
        ensureBackendCart(currentUserId).then(async (cartId) => {
          if (!cartId) return;
          for (const item of newItems) {
            try {
              const variantId = Number(item.variantId || item.id);
              const res = await axiosInstance.post("/api/CartItems", {
                cartId,
                productVariantId: variantId,
                quantity: item.quantity,
                outfitId: item.outfitId || null,
              });
              const createdCartItemId = res.data?.data?.id || res.data?.id;
              if (createdCartItemId) {
                setItems((prev) =>
                  prev.map((i) =>
                    `${i.id}-${i.size}-${i.color}` === `${item.id}-${item.size}-${item.color}`
                      ? { ...i, cartItemId: createdCartItemId }
                      : i
                  )
                );
              }
            } catch (e) {
              console.warn("Kombin ürünü DB sync hatası:", e);
            }
          }
        });
      }

      return true;
    },
    [isAuthenticated, currentUserId, ensureBackendCart]
  );

  // 🌟 8. SEPETTEN SİL 🌟
  const removeItem = useCallback(
    (id: string | number, size: string, color: string) => {
      const key = `${id}-${size}-${color}`;
      const targetItem = itemsRef.current.find((i) => `${i.id}-${i.size}-${i.color}` === key);

      // Debounce timer varsa iptal et
      if (debounceTimers.current.has(key)) {
        clearTimeout(debounceTimers.current.get(key)!);
        debounceTimers.current.delete(key);
      }

      setItems((prev) => prev.filter((i) => `${i.id}-${i.size}-${i.color}` !== key));

      if (currentUserId) {
        ensureBackendCart(currentUserId).then(async (cartId) => {
          if (!cartId) return;
          try {
            let cartItemId = targetItem?.cartItemId;
            const variantId = Number(targetItem?.variantId || targetItem?.id);

            if (!cartItemId) {
              const res = await axiosInstance.get(`/api/CartItems/getall?cartId=${cartId}`);
              const dbList: any[] = Array.isArray(res.data) ? res.data : res.data?.data || [];
              const match = dbList.find((d) => d.productVariantId === variantId);
              if (match) cartItemId = match.id;
            }

            if (cartItemId) {
              await axiosInstance.delete("/api/CartItems", { data: { id: cartItemId } });
              console.log("🛒 [DB Sync] Ürün sepetten silindi:", cartItemId);
            }
          } catch (e) {
            console.warn("CartItem silinemedi:", e);
          }
        });
      }
    },
    [currentUserId, ensureBackendCart]
  );

  // 🌟 9. PERFORMANSLI & DEBOUNCED ADET GÜNCELLEME (BEST PRACTICE) 🌟
  const updateQuantity = useCallback(
    (id: string | number, size: string, color: string, quantity: number) => {
      const key = `${id}-${size}-${color}`;
      if (quantity <= 0) {
        removeItem(id, size, color);
        return;
      }

      const targetItem = itemsRef.current.find((i) => `${i.id}-${i.size}-${i.color}` === key);

      // 0ms Anlık Optimistic UI Güncellemesi
      setItems((prev) =>
        prev.map((i) =>
          `${i.id}-${i.size}-${i.color}` === key ? { ...i, quantity } : i
        )
      );

      // Debounce: Hızlı ardışık tıklamalarda backend'i boğmamak için 250ms bekle
      if (debounceTimers.current.has(key)) {
        clearTimeout(debounceTimers.current.get(key)!);
      }

      const timer = setTimeout(() => {
        debounceTimers.current.delete(key);

        if (currentUserId) {
          ensureBackendCart(currentUserId).then(async (cartId) => {
            if (!cartId) return;
            try {
              let cartItemId = targetItem?.cartItemId;
              const variantId = Number(targetItem?.variantId || targetItem?.id);

              if (!cartItemId) {
                const res = await axiosInstance.get(`/api/CartItems/getall?cartId=${cartId}`);
                const dbList: any[] = Array.isArray(res.data) ? res.data : res.data?.data || [];
                const match = dbList.find((d) => d.productVariantId === variantId);
                if (match) cartItemId = match.id;
              }

              if (cartItemId) {
                // Hafif ve dedicated update-quantity endpoint'i
                await axiosInstance.put("/api/CartItems/update-quantity", {
                  id: cartItemId,
                  quantity,
                });
                console.log("⚡ [Fast DB Sync] Adet güncellendi:", { cartItemId, quantity });
              }
            } catch (e) {
              console.warn("CartItem adet güncellenemedi:", e);
            }
          });
        }
      }, 250);

      debounceTimers.current.set(key, timer);
    },
    [removeItem, currentUserId, ensureBackendCart]
  );

  // 🌟 10. ADET ARTIR / AZALT HELPER'LARI 🌟
  const increaseQuantity = useCallback(
    (id: string | number, size: string, color: string) => {
      const key = `${id}-${size}-${color}`;
      const item = itemsRef.current.find((i) => `${i.id}-${i.size}-${i.color}` === key);
      const currentQty = item?.quantity || 1;
      updateQuantity(id, size, color, currentQty + 1);
    },
    [updateQuantity]
  );

  const decreaseQuantity = useCallback(
    (id: string | number, size: string, color: string) => {
      const key = `${id}-${size}-${color}`;
      const item = itemsRef.current.find((i) => `${i.id}-${i.size}-${i.color}` === key);
      const currentQty = item?.quantity || 1;
      updateQuantity(id, size, color, currentQty - 1);
    },
    [updateQuantity]
  );

  // 🌟 10.2. KOMBİN ADET VE SİLME YÖNETİMİ 🌟
  const removeOutfit = useCallback(
    (outfitId: number) => {
      setItems((prev) => prev.filter((i) => i.outfitId !== outfitId));

      if (currentUserId) {
        ensureBackendCart(currentUserId).then(async (cartId) => {
          if (!cartId) return;
          try {
            await axiosInstance.delete("/api/CartItems/delete-outfit", {
              data: { cartId, outfitId },
            });
            console.log("🛒 [DB Sync] Kombin sepetten silindi:", outfitId);
          } catch (e) {
            console.warn("Kombin sepetten silinemedi:", e);
          }
        });
      }
    },
    [currentUserId, ensureBackendCart]
  );

  const updateOutfitQuantity = useCallback(
    (outfitId: number, quantity: number) => {
      if (quantity <= 0) {
        removeOutfit(outfitId);
        return;
      }

      setItems((prev) =>
        prev.map((i) => (i.outfitId === outfitId ? { ...i, quantity } : i))
      );

      if (currentUserId) {
        ensureBackendCart(currentUserId).then(async (cartId) => {
          if (!cartId) return;
          try {
            await axiosInstance.put("/api/CartItems/update-outfit-quantity", {
              cartId,
              outfitId,
              quantity,
            });
            console.log("🛒 [DB Sync] Kombin adedi güncellendi:", { outfitId, quantity });
          } catch (e) {
            console.warn("Kombin adedi güncellenemedi:", e);
          }
        });
      }
    },
    [currentUserId, ensureBackendCart, removeOutfit]
  );

  const updateItemVariant = useCallback(
    (cartItemIdOrId: number | string, variantId: number, sizeName: string) => {
      let targetCartItemId: number | undefined;

      setItems((prev) =>
        prev.map((i) => {
          if (
            i.cartItemId === cartItemIdOrId ||
            i.id === cartItemIdOrId ||
            i.variantId === cartItemIdOrId
          ) {
            targetCartItemId = i.cartItemId;
            return { ...i, variantId, size: sizeName };
          }
          return i;
        })
      );

      if (currentUserId) {
        ensureBackendCart(currentUserId).then(async (cartId) => {
          if (!cartId) return;
          try {
            if (targetCartItemId) {
              const target = itemsRef.current.find(
                (i) => i.cartItemId === targetCartItemId
              );
              await axiosInstance.put("/api/CartItems", {
                id: targetCartItemId,
                cartId,
                productVariantId: variantId,
                quantity: target?.quantity || 1,
              });
              console.log("⚡ [DB Sync] Ürün bedeni güncellendi:", {
                cartItemId: targetCartItemId,
                variantId,
                sizeName,
              });
            }
          } catch (e) {
            console.warn("Beden güncellenemedi:", e);
          }
        });
      }
    },
    [currentUserId, ensureBackendCart]
  );

  // 🌟 11. SEPETİ TEMİZLE 🌟
  const clearCart = useCallback(() => {
    setItems([]);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {}

    if (currentUserId) {
      ensureBackendCart(currentUserId).then(async (cartId) => {
        if (!cartId) return;
        try {
          const res = await axiosInstance.get(`/api/CartItems/getall?cartId=${cartId}`);
          const dbList: any[] = Array.isArray(res.data) ? res.data : res.data?.data || [];
          for (const item of dbList) {
            await axiosInstance.delete("/api/CartItems", { data: { id: item.id } });
          }
        } catch (e) {
          console.warn("Sepet temizlenemedi:", e);
        }
      });
    }
  }, [currentUserId, ensureBackendCart]);

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        addMultipleItems,
        removeItem,
        updateQuantity,
        increaseQuantity,
        decreaseQuantity,
        updateOutfitQuantity,
        removeOutfit,
        updateItemVariant,
        clearCart,
        totalItems,
        totalPrice,
        openAuthModal: () => setAuthModalOpen(true),
      }}
    >
      {children}
      {/* Otomatik Giriş Modalı */}
      <AuthPromptModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        type="cart"
        title="Sepete Eklemek İçin Giriş Yapın"
        description="Seçtiğiniz parçayı sepetinize eklemek, siparişinizi güvenle oluşturmak ve size özel indirim fırsatlarından yararlanmak için lütfen üye girişi yapınız."
      />
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
