"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { ShoppingBag, ArrowRight } from "lucide-react";
import { useCart, CartItem as CartItemType } from "@/context/CartContext";
import { useToast } from "@/context/ToastContext";
import CartItem from "@/components/cart/CartItem";
import OutfitCartCard from "@/components/cart/OutfitCartCard";
import CartSummary from "@/components/cart/CartSummary";
import AuthRequiredView from "@/components/auth/AuthRequiredView";
import CartDeleteConfirmModal, { DeleteConfirmTarget } from "@/components/cart/CartDeleteConfirmModal";

export default function SepetPage() {
  const { data: session, status } = useSession();
  const { items, totalPrice, removeItem, removeOutfit } = useCart();
  const { toast } = useToast();

  const [deleteTarget, setDeleteTarget] = useState<DeleteConfirmTarget | null>(null);

  const handleConfirmDelete = () => {
    if (!deleteTarget) return;

    if (deleteTarget.type === "outfit") {
      removeOutfit(Number(deleteTarget.id));
      toast.success(`"${deleteTarget.title}" kombin paketi sepetten kaldırıldı.`);
    } else {
      const it = deleteTarget.itemRef;
      if (it) {
        removeItem(it.id, it.size, it.color);
      } else {
        removeItem(deleteTarget.id, deleteTarget.size || "", deleteTarget.color || "");
      }
      toast.success(`"${deleteTarget.title}" sepetten kaldırıldı.`);
    }
  };

  // 🌟 KOMBİNLERİ VE TEKİL ÜRÜNLERİ AYIRIP GRUPLAMA 🌟
  const { outfitBundles, regularItems } = useMemo(() => {
    const outfitMap = new Map<number, CartItemType[]>();
    const regular: CartItemType[] = [];

    items.forEach((item) => {
      if (item.outfitId && item.outfitId > 0) {
        const list = outfitMap.get(item.outfitId) || [];
        list.push(item);
        outfitMap.set(item.outfitId, list);
      } else {
        regular.push(item);
      }
    });

    const bundles = Array.from(outfitMap.entries()).map(([outfitId, groupItems]) => {
      const first = groupItems[0];
      const bundlePrice = first.outfitPrice ?? groupItems.reduce((acc, i) => acc + i.price, 0);

      return {
        outfitId,
        title: first.outfitTitle || "Özel Kombin Paketi",
        coverImageUrl: first.outfitCoverImageUrl || first.image,
        price: bundlePrice,
        quantity: first.quantity,
        items: groupItems,
      };
    });

    return { outfitBundles: bundles, regularItems: regular };
  }, [items]);

  // Yükleme Durumu
  if (status === "loading") {
    return (
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 animate-pulse space-y-6">
        <div className="h-6 w-32 bg-gray-200 rounded" />
        <div className="h-10 w-48 bg-gray-200 rounded" />
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8 pt-6">
          <div className="space-y-4">
            {[1, 2, 3].map((n) => (
              <div key={n} className="h-28 bg-gray-100 rounded-2xl" />
            ))}
          </div>
          <div className="h-64 bg-gray-100 rounded-2xl" />
        </div>
      </div>
    );
  }

  // 🌟 GİRİŞ YAPILMAMIŞSA KORUMA EKRANI 🌟
  if (status === "unauthenticated" || !session?.user) {
    return (
      <AuthRequiredView
        title="Sepetinizi Görüntülemek İçin Giriş Yapın"
        description="Sepetinizdeki seçkin parçaları güvenle incelemek, saklamak ve siparişinizi tamamlamak için lütfen giriş yapınız."
        callbackUrl="/sepet"
        iconType="cart"
      />
    );
  }

  const totalPackageCount = outfitBundles.length + regularItems.length;

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-6 md:py-10">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-gray-400 mb-6">
        <Link href="/" className="hover:text-gray-700">Ana Sayfa</Link>
        <span>›</span>
        <span className="text-gray-700 font-medium">Sepetim</span>
      </nav>

      <h1 className="font-serif text-2xl md:text-3xl font-bold text-gray-900 mb-8">
        Sepetim{" "}
        {totalPackageCount > 0 && (
          <span className="text-[#4A5D3E] text-lg ml-2">
            ({totalPackageCount} {outfitBundles.length > 0 ? "ürün / paket" : "ürün"})
          </span>
        )}
      </h1>

      {items.length === 0 ? (
        /* Empty cart state */
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-6">
            <ShoppingBag size={32} className="text-gray-300" />
          </div>
          <h2 className="font-serif text-xl font-semibold text-gray-700 mb-2">
            Sepetiniz boş
          </h2>
          <p className="text-gray-500 text-sm mb-8 max-w-xs">
            Beğendiğiniz ürün ve kombinleri sepete ekleyerek alışverişe başlayabilirsiniz.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/kategoriler"
              className="flex items-center gap-2 bg-[#4A5D3E] hover:bg-[#3A4B30] text-white font-semibold px-6 py-3 rounded-xl transition-colors text-sm shadow-sm"
            >
              Alışverişe Başla <ArrowRight size={16} />
            </Link>
            <Link
              href="/stil-kesfet"
              className="flex items-center gap-2 bg-stone-900 hover:bg-black text-white font-semibold px-6 py-3 rounded-xl transition-colors text-sm shadow-sm"
            >
              Kombinleri Keşfet <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      ) : (
        /* Cart with items */
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8">
          {/* Cart items list */}
          <div className="space-y-4">
            {/* 🌟 KOMBİN PAKETLERİ (TEK PARÇA, SENKRON ADET & SADECE BEDEN DEĞİŞİMİ) 🌟 */}
            {outfitBundles.map((bundle) => (
              <OutfitCartCard
                key={`outfit-bundle-${bundle.outfitId}`}
                outfitId={bundle.outfitId}
                title={bundle.title}
                coverImageUrl={bundle.coverImageUrl}
                price={bundle.price}
                quantity={bundle.quantity}
                items={bundle.items}
                onRequestRemove={() =>
                  setDeleteTarget({
                    type: "outfit",
                    id: bundle.outfitId,
                    title: bundle.title,
                    image: bundle.coverImageUrl,
                    price: bundle.price,
                    quantity: bundle.quantity,
                    itemCount: bundle.items.length,
                  })
                }
              />
            ))}

            {/* 🌟 TEKİL STANDART ÜRÜNLER 🌟 */}
            {regularItems.map((item) => (
              <CartItem
                key={`${item.id}-${item.size}-${item.color}`}
                item={item}
                onRequestRemove={(it) =>
                  setDeleteTarget({
                    type: "item",
                    id: it.id,
                    title: it.name,
                    image: it.image,
                    price: it.price,
                    quantity: it.quantity,
                    size: it.size,
                    color: it.color,
                    itemRef: it,
                  })
                }
              />
            ))}
          </div>

          {/* Order summary */}
          <div>
            <CartSummary subtotal={totalPrice} />
          </div>
        </div>
      )}

      {/* 🌟 SİLME ONAY MODALI 🌟 */}
      <CartDeleteConfirmModal
        isOpen={Boolean(deleteTarget)}
        target={deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}
