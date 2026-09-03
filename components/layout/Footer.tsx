"use client";

import { useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { useCategories } from "@/hooks/useCategories";

const footerLinks = {
  company: [
    { name: "Hakkımızda", href: "/about" },
    { name: "İletişim & Konum", href: "/contact" },
  ],
  support: [
    { name: "Sıkça Sorulan Sorular", href: "/faq" },
    { name: "Kargo ve Teslimat", href: "/shipping" },
    { name: "İptal, İade ve Değişim", href: "/returns" },
    { name: "Sipariş Takibi", href: "/track-order" },
  ],
  legal: [
    { name: "Gizlilik Sözleşmesi", href: "/privacy" },
    { name: "Mesafeli Satış Sözleşmesi", href: "/terms" },
    { name: "İptal, İade ve Değişim Politikası", href: "/returns" },
    { name: "KVKK Aydınlatma Metni", href: "/kvkk" },
    { name: "Çerez Politikası", href: "/cookies" },
    { name: "Ticari Elektronik İleti Onayı", href: "/electronic-consent" },
  ],
};

export default function Footer() {
  const { data: settings } = useSiteSettings();
  const { data: allCategories } = useCategories(false);

  // Koleksiyon linklerini veritabanındaki gerçek kategorilerden oluştur
  const collectionLinks = useMemo(() => {
    if (allCategories && allCategories.length > 0) {
      return allCategories
        .filter((c) => c.name && c.slug)
        .slice(0, 6)
        .map((c) => ({
          name: c.name,
          href: `/koleksiyon/${c.slug}`,
        }));
    }
    return [
      { name: "Erkek Giyim", href: "/koleksiyon/erkek-giyim" },
      { name: "Kadın Giyim", href: "/koleksiyon/kadin-giyim" },
      { name: "Aksesuar", href: "/koleksiyon/aksesuar" },
      { name: "Takım Elbise", href: "/koleksiyon/takim-elbise" },
      { name: "Gömlek", href: "/koleksiyon/gomlek" },
    ];
  }, [allCategories]);

  const siteTitle = settings?.sitetitle || settings?.siteTitle || "HAQAN WEAR";
  const metaDescription =
    settings?.metadescription ||
    settings?.metaDescription ||
    "Premium erkek giyiminde zamansız tasarımlar, üstün kalite kumaşlar ve usta işçilik. Stilinizi Haqan Wear ile yeniden tanımlayın.";

  const phone = settings?.phonenumber || settings?.phoneNumber || "0531 714 66 27";
  const email = settings?.emailaddress || settings?.emailAddress || "hakanyesildag91@gmail.com";
  const address = settings?.storeaddress || settings?.storeAddress || "Zülüflühan Mah. Eski İskenderun Yolu Cad. No: 55 B, Antakya / Hatay";
  const workingHours = settings?.workinghours || settings?.workingHours;

  const instagram = settings?.instagramurl || settings?.instagramUrl;
  const xUrl = settings?.xurl || settings?.xUrl || settings?.twitterurl || settings?.twitterUrl;
  const facebook = settings?.facebookurl || settings?.facebookUrl;
  const tiktok = settings?.tiktokurl || settings?.tiktokUrl;
  const youtube = settings?.youtubeurl || settings?.youtubeUrl;

  return (
    <footer className="bg-zinc-950 text-zinc-300 pt-16 pb-8 border-t border-zinc-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Links Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block mb-6 group">
              <span className="font-playfair text-2xl sm:text-3xl font-bold tracking-[0.18em] text-white uppercase block group-hover:text-[#a3b899] transition-colors">
                {siteTitle}
              </span>
              <span className="text-[10px] uppercase tracking-[0.35em] text-[#a3b899] font-medium block mt-1">
                Sessiz Özgüven
              </span>
            </Link>
            <p className="text-sm text-zinc-400 mb-6 leading-relaxed max-w-xs">
              {metaDescription}
            </p>
            <div className="flex items-center space-x-4">
              {instagram && (
                <a href={instagram} target="_blank" rel="noreferrer" className="text-zinc-400 hover:text-white transition-colors" title="Instagram">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                  </svg>
                  <span className="sr-only">Instagram</span>
                </a>
              )}
              {xUrl && (
                <a href={xUrl} target="_blank" rel="noreferrer" className="text-zinc-400 hover:text-white transition-colors" title="X">
                  <svg className="h-4.5 w-4.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                  <span className="sr-only">X</span>
                </a>
              )}
              {facebook && (
                <a href={facebook} target="_blank" rel="noreferrer" className="text-zinc-400 hover:text-white transition-colors" title="Facebook">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                  <span className="sr-only">Facebook</span>
                </a>
              )}
              {tiktok && (
                <a href={tiktok} target="_blank" rel="noreferrer" className="text-zinc-400 hover:text-white transition-colors" title="TikTok">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.64 1.82 2.89 3.5 2.77 1.81-.02 3.29-1.5 3.36-3.31.04-3.62.01-7.24.02-10.86.01-2.48.01-4.96.01-7.44h4.03z" />
                  </svg>
                  <span className="sr-only">TikTok</span>
                </a>
              )}
              {youtube && (
                <a href={youtube} target="_blank" rel="noreferrer" className="text-zinc-400 hover:text-white transition-colors" title="YouTube">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z" clipRule="evenodd" />
                  </svg>
                  <span className="sr-only">YouTube</span>
                </a>
              )}
            </div>
            
            <div className="mt-8 space-y-3 text-sm text-zinc-400">
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-3 text-zinc-500 shrink-0" />
                <span>{address}</span>
              </div>
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-3 text-zinc-500 shrink-0" />
                <a href={`tel:${phone.replace(/\s+/g, "")}`} className="hover:text-white transition-colors">
                  {phone}
                </a>
              </div>
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-3 text-zinc-500 shrink-0" />
                <a href={`mailto:${email}`} className="hover:text-white transition-colors">
                  {email}
                </a>
              </div>
              {workingHours && (
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-3 text-zinc-500 shrink-0" />
                  <span>{workingHours}</span>
                </div>
              )}
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-5 tracking-wide">Koleksiyon</h4>
            <ul className="space-y-3">
              {collectionLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-zinc-400 hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-5 tracking-wide">Haqan Wear</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-zinc-400 hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-5 tracking-wide">Müşteri Hizmetleri</h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-zinc-400 hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ─── 🌟 GÜVENLİ ÖDEME VE İYZİCO LOGO BANTI 🌟 ─── */}
        <div className="pt-8 pb-6 border-t border-zinc-900 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-xs text-zinc-400 font-medium">Güvenli Ödeme Altyapısı:</span>
            <div className="bg-zinc-900/80 border border-zinc-800/80 px-3 py-1.5 rounded-lg flex items-center gap-2">
              <span className="text-[11px] font-semibold text-zinc-300">256-Bit SSL</span>
              <span className="text-zinc-600">|</span>
              <span className="text-[11px] font-semibold text-zinc-300">3D Secure</span>
            </div>
          </div>

          {/* iyzico Resmi Logo Bandı (iyzico + Visa + Mastercard + Troy) */}
          <div className="flex items-center justify-center">
            <img
              src="/images/payment/iyzico_logo_band_white.svg"
              alt="iyzico, Visa, MasterCard, Troy ile Güvenli Ödeme"
              className="h-6 sm:h-7 w-auto max-w-[320px] sm:max-w-none opacity-90 hover:opacity-100 transition-opacity"
            />
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-6 border-t border-zinc-900 text-xs text-zinc-500 gap-4">
          <p>© {new Date().getFullYear()} Haqan Wear. Tüm hakları saklıdır.</p>
          <ul className="flex flex-wrap items-center justify-center gap-4">
            {footerLinks.legal.map((link) => (
              <li key={link.name}>
                <Link href={link.href} className="hover:text-white transition-colors">
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        
      </div>
    </footer>
  );
}
