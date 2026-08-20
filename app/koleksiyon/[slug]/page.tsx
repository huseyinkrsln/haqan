import { Metadata } from "next";
import CollectionClientView from "@/components/collection/CollectionClientView";
import { Category, Product } from "@/types/api.types";

interface PageProps {
  params: Promise<{ slug: string }>;
}

const specialCollections: Record<
  string,
  { title: string; isBestSeller?: boolean; isFeatured?: boolean; isNewArrival?: boolean }
> = {
  "cok-satanlar": { title: "Çok Satanlar", isBestSeller: true },
  "cok-satan": { title: "Çok Satanlar", isBestSeller: true },
  "one-cikanlar": { title: "Öne Çıkan Parçalar", isFeatured: true },
  "one-cikan": { title: "Öne Çıkan Parçalar", isFeatured: true },
  "one-cikan-parcalar": { title: "Öne Çıkan Parçalar", isFeatured: true },
  "yeni-gelenler": { title: "Yeni Gelenler", isNewArrival: true },
  "yeni-sezon": { title: "Yeni Sezon", isNewArrival: true },
  "tum-urunler": { title: "Tüm Koleksiyon" },
  "tum-koleksiyon": { title: "Tüm Koleksiyon" },
};

function normalizeSlug(str?: string) {
  if (!str) return "";
  return decodeURIComponent(str)
    .toLowerCase()
    .trim()
    .replace(/ğ/g, "g")
    .replace(/ü/g, "u")
    .replace(/ş/g, "s")
    .replace(/ı/g, "i")
    .replace(/ö/g, "o")
    .replace(/ç/g, "c")
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "");
}

// 🌟 DİNAMİK GOOGLE SEO & SOSYAL MEDYA METADATA (SERVER-SIDE) 🌟
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const targetSlug = normalizeSlug(slug);

  const special = specialCollections[targetSlug];
  if (special) {
    return {
      title: `${special.title} Koleksiyonu | HAQAN WEAR`,
      description: `HAQAN WEAR ${special.title} koleksiyonunu keşfedin. Premium kumaşlar, zamansız kalıplar ve seçkin tasarımlar.`,
      openGraph: {
        title: `${special.title} | HAQAN WEAR`,
        description: `HAQAN WEAR ${special.title} modelleri.`,
      },
    };
  }

  const formattedName = decodeURIComponent(slug)
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  return {
    title: `${formattedName} Koleksiyonu | HAQAN WEAR`,
    description: `HAQAN WEAR ${formattedName} kategorisindeki seçkin tasarımlar ve özel modeller.`,
    openGraph: {
      title: `${formattedName} | HAQAN WEAR`,
      description: `${formattedName} modelleri en uygun fiyatlarla mağazamızda.`,
    },
  };
}

// 🌟 SERVER COMPONENT (SSR / HİBRİT MİMARİ) 🌟
export default async function CollectionPage({ params }: PageProps) {
  const { slug } = await params;
  const targetSlug = normalizeSlug(slug);
  const specialConfig = specialCollections[targetSlug];

  return (
    <CollectionClientView
      slug={slug}
      specialConfig={specialConfig}
    />
  );
}
