import type { Metadata } from "next";
import { Inter, Playfair_Display, Geist } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import { QueryProvider } from "@/components/providers/query-provider";
import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MobileBottomNav from "@/components/layout/MobileBottomNav";
import StickyCouponBar from "@/components/layout/StickyCouponBar";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import MaintenanceBanner from "@/components/layout/MaintenanceBanner";
import DynamicFavicon from "@/components/layout/DynamicFavicon";
import PromoPopupModal from "@/components/layout/PromoPopupModal";
import { ToastProvider } from "@/context/ToastContext";
import { cn } from "@/lib/utils";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
});

export async function generateMetadata(): Promise<Metadata> {
  try {
    const backendUrl =
      process.env.NEXT_PUBLIC_BACKEND_URL ||
      process.env.BACKEND_URL ||
      "http://localhost:5000";

    const res = await fetch(`${backendUrl}/api/SiteSettings/getpublicdictionary`, {
      next: { revalidate: 60 },
    });

    if (!res.ok) throw new Error("Ayarlar çekilemedi");
    const json = await res.json();
    const data = json?.data || json || {};

    const settings: Record<string, string> = {};
    if (data && typeof data === "object") {
      Object.entries(data).forEach(([k, v]) => {
        if (typeof v === "string") {
          settings[k.toLowerCase()] = v;
        }
      });
    }

    const siteTitle = settings["sitetitle"] || "HAQAN WEAR";
    const siteSlogan = settings["siteslogan"] || "Premium Erkek & Kadın Giyim";
    const metaDescription =
      settings["metadescription"] ||
      "Zamansız tasarımlar ve premium kumaşlarla giyimde yeni standartlar. Takım elbise, gömlek, elbise, pantolon, ayakkabı ve aksesuar.";
    const metaKeywordsStr =
      settings["metakeywords"] ||
      "erkek giyim, kadın giyim, premium giyim, haqan wear, takım elbise, elbise";
    const keywords = metaKeywordsStr
      .split(",")
      .map((k) => k.trim())
      .filter(Boolean);

    const faviconUrl = settings["faviconurl"];
    const minioBase = process.env.NEXT_PUBLIC_MINIO_URL || "http://127.0.0.1:9000";
    const fullFavicon = faviconUrl
      ? faviconUrl.startsWith("http")
        ? faviconUrl
        : `${minioBase}/${faviconUrl.replace(/^\/+/, "")}`
      : undefined;

    return {
      title: {
        default: `${siteTitle} — ${siteSlogan}`,
        template: `%s | ${siteTitle}`,
      },
      description: metaDescription,
      keywords: keywords,
      icons: fullFavicon
        ? {
            icon: fullFavicon,
            shortcut: fullFavicon,
            apple: fullFavicon,
          }
        : undefined,
      openGraph: {
        title: `${siteTitle} — ${siteSlogan}`,
        description: metaDescription,
        siteName: siteTitle,
        locale: "tr_TR",
        type: "website",
      },
    };
  } catch {
    return {
      title: {
        default: "HAQAN WEAR — Premium Erkek & Kadın Giyim",
        template: "%s | HAQAN WEAR",
      },
      description:
        "Zamansız tasarımlar ve premium kumaşlarla giyimde yeni standartlar. Takım elbise, gömlek, elbise, pantolon, ayakkabı ve aksesuar.",
      keywords: [
        "erkek giyim",
        "kadın giyim",
        "premium giyim",
        "haqan wear",
        "takım elbise",
        "elbise",
      ],
    };
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="tr"
      className={cn(inter.variable, playfair.variable, "font-sans", geist.variable)}
      data-scroll-behavior="smooth"
    >
      <body className="min-h-screen bg-[#F9F9FB] font-sans antialiased">
        <QueryProvider>
          <ToastProvider>
            <DynamicFavicon />
            <PromoPopupModal />
            <CartProvider>
              <WishlistProvider>
                <MaintenanceBanner />
                <AnnouncementBar />
                <Header />
                <main className="pb-20 md:pb-0">{children}</main>
                <Footer />
                <StickyCouponBar />
                <WhatsAppButton />
                <MobileBottomNav />
              </WishlistProvider>
            </CartProvider>
          </ToastProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
