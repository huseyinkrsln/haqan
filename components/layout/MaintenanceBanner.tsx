"use client";

import { Wrench } from "lucide-react";
import { useSiteSettings } from "@/hooks/useSiteSettings";

export default function MaintenanceBanner() {
  const { data: settings } = useSiteSettings();

  const isMaintenance =
    settings?.maintenancemode === "true" || settings?.maintenanceMode === "true";

  if (!isMaintenance) return null;

  return (
    <div className="bg-amber-500 text-zinc-950 px-4 py-2 text-xs font-semibold flex items-center justify-center gap-2 shadow-sm border-b border-amber-600 z-50 sticky top-0">
      <Wrench className="h-4 w-4 animate-bounce" />
      <span>
        ⚠️ Sistem Bakım Modu Aktif: Sitemiz şu anda planlı güncelleme çalışmasındadır. Bazı işlemler geçici olarak kısıtlanmış olabilir.
      </span>
    </div>
  );
}
