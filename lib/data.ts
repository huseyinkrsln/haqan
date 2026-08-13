export interface Product {
  id: string;
  slug: string;
  name: string;
  sku: string;
  price: number;
  oldPrice?: number;
  rating: number;
  reviewCount: number;
  images: string[];
  colors: { name: string; hex: string }[];
  sizes: string[];
  description: string;
  category: string;
  subcategory: string;
  badges: { icon: string; label: string }[];
  compatibleProducts: CompatibleProduct[];
}

export interface CompatibleProduct {
  id: string;
  slug: string;
  name: string;
  price: number;
  image: string;
}

export interface Category {
  slug: string;
  name: string;
  description: string;
  image: string;
  icon: string;
  subcategories: Subcategory[];
}

export interface Subcategory {
  slug: string;
  name: string;
  count: number;
}

export const categories: Category[] = [
  {
    slug: "giyim",
    name: "Giyim",
    description: "Zamansız parçalar, kendinden emin sadelik.",
    image:
      "https://images.unsplash.com/photo-1617137968427-85924c800a22?w=800&q=80",
    icon: "Shirt",
    subcategories: [
      { slug: "gomlek", name: "Gömlek", count: 24 },
      { slug: "tisort", name: "Tişört", count: 18 },
      { slug: "polo", name: "Polo Yaka", count: 16 },
      { slug: "pantolon", name: "Pantolon", count: 20 },
      { slug: "ceket", name: "Ceket", count: 12 },
    ],
  },
  {
    slug: "saat",
    name: "Saat",
    description: "Modern tasarımlar, kusursuz detaylar.",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80",
    icon: "Watch",
    subcategories: [
      { slug: "klasik", name: "Klasik", count: 12 },
      { slug: "spor", name: "Spor", count: 8 },
    ],
  },
  {
    slug: "kemer",
    name: "Kemer",
    description: "Kaliteli malzeme, şık dokunuşlar.",
    image:
      "https://images.unsplash.com/photo-1624222247344-550fb60583dc?w=800&q=80",
    icon: "Scissors",
    subcategories: [
      { slug: "deri", name: "Deri", count: 10 },
      { slug: "kumaş", name: "Kumaş", count: 6 },
    ],
  },
  {
    slug: "ayakkabi",
    name: "Ayakkabı",
    description: "Gün boyu konfor, modern tasarımlar.",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80",
    icon: "Footprints",
    subcategories: [
      { slug: "sneaker", name: "Sneaker", count: 14 },
      { slug: "klasik", name: "Klasik", count: 10 },
      { slug: "boot", name: "Bot", count: 8 },
    ],
  },
  {
    slug: "aksesuar",
    name: "Aksesuar",
    description: "Tarzınızı tamamlayan ince detaylar.",
    image:
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&q=80",
    icon: "Glasses",
    subcategories: [
      { slug: "gunes-gozlugu", name: "Güneş Gözlüğü", count: 8 },
      { slug: "cuzdan", name: "Cüzdan", count: 12 },
      { slug: "sapka", name: "Şapka", count: 6 },
    ],
  },
];

export const products: Product[] = [
  {
    id: "p1",
    slug: "keten-gomlek",
    name: "Keten Gömlek",
    sku: "HGK-2307",
    price: 1299,
    rating: 4.8,
    reviewCount: 124,
    images: [
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800&q=80",
      "https://images.unsplash.com/photo-1598032895397-b9472444bf93?w=800&q=80",
      "https://images.unsplash.com/photo-1607345366928-199ea26cfe3e?w=800&q=80",
      "https://images.unsplash.com/photo-1620012253295-c15cc3e65df4?w=800&q=80",
    ],
    colors: [
      { name: "Siyah", hex: "#1a1a1a" },
      { name: "Beyaz", hex: "#f5f5f5" },
      { name: "Bej", hex: "#d4b896" },
      { name: "Haki", hex: "#4A5D3E" },
      { name: "Lacivert", hex: "#1e3a5f" },
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    description:
      "%100 pamuklu kumaşı ve rahat kesimi sayesinde gün boyu konfor sunar. Hafif yapısı ve sade görünümü günlük kullanıma uygundur.",
    category: "giyim",
    subcategory: "gomlek",
    badges: [
      { icon: "Leaf", label: "%100 Pamuk" },
      { icon: "Shirt", label: "Rahat Kesim" },
      { icon: "Wind", label: "Klasik Yaka" },
      { icon: "Sun", label: "4 Mevsim" },
    ],
    compatibleProducts: [
      {
        id: "cp1",
        slug: "minimal-saat",
        name: "Minimal Saat",
        price: 1099,
        image:
          "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80",
      },
      {
        id: "cp2",
        slug: "deri-kemer",
        name: "Deri Kemer",
        price: 899,
        image:
          "https://images.unsplash.com/photo-1624222247344-550fb60583dc?w=400&q=80",
      },
      {
        id: "cp3",
        slug: "siyah-sneaker",
        name: "Siyah Sneaker",
        price: 1499,
        image:
          "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80",
      },
      {
        id: "cp4",
        slug: "gunes-gozlugu",
        name: "Güneş Gözlüğü",
        price: 799,
        image:
          "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400&q=80",
      },
    ],
  },
  {
    id: "p2",
    slug: "poplin-gomlek",
    name: "Poplin Gömlek",
    sku: "HGK-2308",
    price: 1199,
    rating: 4.6,
    reviewCount: 89,
    images: [
      "https://images.unsplash.com/photo-1598032895397-b9472444bf93?w=800&q=80",
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800&q=80",
    ],
    colors: [
      { name: "Beyaz", hex: "#f5f5f5" },
      { name: "Açık Mavi", hex: "#93c5fd" },
      { name: "Bej", hex: "#d4b896" },
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    description: "İnce poplin kumaştan üretilmiş, zarif görünümlü gömlek.",
    category: "giyim",
    subcategory: "gomlek",
    badges: [
      { icon: "Leaf", label: "%100 Pamuk" },
      { icon: "Shirt", label: "Slim Fit" },
      { icon: "Wind", label: "İnce Yaka" },
      { icon: "Sun", label: "Yaz" },
    ],
    compatibleProducts: [],
  },
  {
    id: "p3",
    slug: "oxford-gomlek",
    name: "Oxford Gömlek",
    sku: "HGK-2309",
    price: 1299,
    rating: 4.7,
    reviewCount: 67,
    images: [
      "https://images.unsplash.com/photo-1607345366928-199ea26cfe3e?w=800&q=80",
    ],
    colors: [
      { name: "Lacivert", hex: "#1e3a5f" },
      { name: "Gri", hex: "#6b7280" },
      { name: "Beyaz", hex: "#f5f5f5" },
    ],
    sizes: ["S", "M", "L", "XL"],
    description: "Klasik Oxford dokusunda, her ortama uygun gömlek.",
    category: "giyim",
    subcategory: "gomlek",
    badges: [
      { icon: "Leaf", label: "%100 Pamuk" },
      { icon: "Shirt", label: "Regular Fit" },
      { icon: "Wind", label: "Button Down" },
      { icon: "Sun", label: "4 Mevsim" },
    ],
    compatibleProducts: [],
  },
  {
    id: "p4",
    slug: "flannel-gomlek",
    name: "Flanel Gömlek",
    sku: "HGK-2310",
    price: 1399,
    rating: 4.9,
    reviewCount: 43,
    images: [
      "https://images.unsplash.com/photo-1620012253295-c15cc3e65df4?w=800&q=80",
    ],
    colors: [
      { name: "Haki", hex: "#4A5D3E" },
      { name: "Bordo", hex: "#7f1d1d" },
    ],
    sizes: ["M", "L", "XL", "XXL"],
    description: "Yumuşak flanel kumaşı ile sonbahar/kış için ideal seçim.",
    category: "giyim",
    subcategory: "gomlek",
    badges: [
      { icon: "Leaf", label: "%100 Pamuk" },
      { icon: "Shirt", label: "Oversize Fit" },
      { icon: "Wind", label: "Klasik Yaka" },
      { icon: "Sun", label: "Kış" },
    ],
    compatibleProducts: [],
  },
  {
    id: "p5",
    slug: "basic-tisort",
    name: "Basic Tişört",
    sku: "HGT-1201",
    price: 549,
    rating: 4.5,
    reviewCount: 210,
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80",
    ],
    colors: [
      { name: "Siyah", hex: "#1a1a1a" },
      { name: "Beyaz", hex: "#f5f5f5" },
      { name: "Haki", hex: "#4A5D3E" },
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    description: "Organik pamuktan üretilmiş, günlük kullanım için ideal.",
    category: "giyim",
    subcategory: "tisort",
    badges: [
      { icon: "Leaf", label: "Organik" },
      { icon: "Shirt", label: "Regular Fit" },
      { icon: "Wind", label: "Bisiklet Yaka" },
      { icon: "Sun", label: "4 Mevsim" },
    ],
    compatibleProducts: [],
  },
  {
    id: "p6",
    slug: "polo-yaka-tisort",
    name: "Polo Yaka Tişört",
    sku: "HGP-1301",
    price: 799,
    rating: 4.7,
    reviewCount: 95,
    images: [
      "https://images.unsplash.com/photo-1588702547919-26089e690ecc?w=800&q=80",
    ],
    colors: [
      { name: "Lacivert", hex: "#1e3a5f" },
      { name: "Beyaz", hex: "#f5f5f5" },
      { name: "Haki", hex: "#4A5D3E" },
    ],
    sizes: ["S", "M", "L", "XL"],
    description: "Şık polo yaka tasarımı, pima pamuk kumaş.",
    category: "giyim",
    subcategory: "polo",
    badges: [
      { icon: "Leaf", label: "Pima Pamuk" },
      { icon: "Shirt", label: "Slim Fit" },
      { icon: "Wind", label: "Polo Yaka" },
      { icon: "Sun", label: "Yaz" },
    ],
    compatibleProducts: [],
  },
  {
    id: "p7",
    slug: "slim-pantolon",
    name: "Slim Fit Pantolon",
    sku: "HGN-2101",
    price: 1499,
    rating: 4.6,
    reviewCount: 78,
    images: [
      "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800&q=80",
    ],
    colors: [
      { name: "Siyah", hex: "#1a1a1a" },
      { name: "Lacivert", hex: "#1e3a5f" },
      { name: "Bej", hex: "#d4b896" },
    ],
    sizes: ["30", "32", "34", "36"],
    description: "Modern slim fit kesim, esnek kumaş yapısı.",
    category: "giyim",
    subcategory: "pantolon",
    badges: [
      { icon: "Leaf", label: "%95 Pamuk" },
      { icon: "Shirt", label: "Slim Fit" },
      { icon: "Wind", label: "Esnek" },
      { icon: "Sun", label: "4 Mevsim" },
    ],
    compatibleProducts: [],
  },
  {
    id: "p8",
    slug: "blazer-ceket",
    name: "Blazer Ceket",
    sku: "HGC-3101",
    price: 2999,
    rating: 4.9,
    reviewCount: 34,
    images: [
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&q=80",
    ],
    colors: [
      { name: "Lacivert", hex: "#1e3a5f" },
      { name: "Antrasit", hex: "#374151" },
    ],
    sizes: ["S", "M", "L", "XL"],
    description: "İtalyan yünü kumaştan üretilmiş, premium blazer.",
    category: "giyim",
    subcategory: "ceket",
    badges: [
      { icon: "Leaf", label: "%70 Yün" },
      { icon: "Shirt", label: "Slim Fit" },
      { icon: "Wind", label: "Notch Yaka" },
      { icon: "Sun", label: "Sonbahar/Kış" },
    ],
    compatibleProducts: [],
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(
  categorySlug: string,
  subcategorySlug?: string
): Product[] {
  return products.filter(
    (p) =>
      p.category === categorySlug &&
      (subcategorySlug ? p.subcategory === subcategorySlug : true)
  );
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

export function formatPrice(price: number): string {
  return price.toLocaleString("tr-TR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }) + " TL";
}
