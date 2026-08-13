import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Header from "@/components/layout/Header";
import MobileBottomNav from "@/components/layout/MobileBottomNav";

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

export const metadata: Metadata = {
  title: {
    default: "HAQAN WEAR — Premium Erkek Giyim",
    template: "%s | HAQAN WEAR",
  },
  description:
    "Zamansız tasarımlar ve premium kumaşlarla erkek giyiminde yeni standartlar. Gömlek, tişört, pantolon, ayakkabı ve aksesuar.",
  keywords: ["erkek giyim", "premium giyim", "haqan wear", "gömlek", "aksesuar"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr" className={`${inter.variable} ${playfair.variable}`}>
      <body className="min-h-screen bg-[#F9F9FB] font-sans antialiased">
        <CartProvider>
          <WishlistProvider>
            <AnnouncementBar />
            <Header />
            <main className="pb-20 md:pb-0">{children}</main>
            <MobileBottomNav />
          </WishlistProvider>
        </CartProvider>
      </body>
    </html>
  );
}
