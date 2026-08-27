"use client";

import { useEffect } from "react";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { getMinioUrl } from "@/lib/utils";

export default function DynamicFavicon() {
  const { data: settings } = useSiteSettings();
  const faviconUrl = settings?.faviconurl || settings?.faviconUrl;

  useEffect(() => {
    if (faviconUrl) {
      const fullUrl = getMinioUrl(faviconUrl);
      let link: HTMLLinkElement | null = document.querySelector("link[rel~='icon']");
      if (!link) {
        link = document.createElement("link");
        link.rel = "icon";
        document.head.appendChild(link);
      }
      link.href = fullUrl;
    }
  }, [faviconUrl]);

  return null;
}
