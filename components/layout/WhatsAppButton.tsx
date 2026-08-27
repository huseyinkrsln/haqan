"use client";

import { MessageCircle } from "lucide-react";
import { useSiteSettings } from "@/hooks/useSiteSettings";

export default function WhatsAppButton() {
  const { data: settings } = useSiteSettings();

  const rawPhone = settings?.whatsappnumber || settings?.whatsAppNumber || "";
  if (!rawPhone) return null;

  // Clean phone number for wa.me link (e.g. +90 555 111 22 33 -> 905551112233)
  const cleanPhone = rawPhone.replace(/\D/g, "");
  if (!cleanPhone) return null;

  const siteTitle = settings?.sitetitle || settings?.siteTitle || "Hakan Wear";
  const customMessage = settings?.whatsappdefaultmessage || settings?.whatsAppDefaultMessage;
  const messageText = customMessage || `Merhaba ${siteTitle}, web sitenizden ürünler hakkında bilgi almak istiyorum.`;
  const defaultMessage = encodeURIComponent(messageText);
  const whatsappUrl = `https://wa.me/${cleanPhone}?text=${defaultMessage}`;

  return (
    <div className="fixed bottom-20 md:bottom-6 right-5 z-40 group flex items-center gap-2">
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-white px-3.5 py-2.5 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
        aria-label="WhatsApp Destek Hattı"
      >
        <MessageCircle className="h-5 w-5 fill-white text-[#25D366]" />
        <span className="hidden sm:inline text-xs font-semibold tracking-wide pr-1">
          WhatsApp Destek
        </span>
      </a>
    </div>
  );
}
