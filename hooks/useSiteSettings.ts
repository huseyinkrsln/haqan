import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";

export interface SiteSettingsDictionary {
  [key: string]: string | undefined;
}

export function useSiteSettings() {
  return useQuery<SiteSettingsDictionary>({
    queryKey: ["public-site-settings"],
    queryFn: async () => {
      try {
        const res = await axiosInstance.get("/api/SiteSettings/getpublicdictionary");
        const raw = res.data;
        const dict = (raw as any)?.data || raw || {};
        
        // Normalize keys to lowercase for flexible lookup
        const normalized: Record<string, string> = {};
        if (dict && typeof dict === "object") {
          Object.entries(dict).forEach(([k, v]) => {
            if (typeof v === "string") {
              normalized[k] = v;
              normalized[k.toLowerCase()] = v;
            }
          });
        }
        return normalized;
      } catch (err) {
        console.warn("Failed to fetch public site settings:", err);
        return {};
      }
    },
    staleTime: 1000 * 60 * 5, // 5 minutes cache
  });
}

/**
 * Helper hook to get a specific setting value with a fallback
 */
export function useSiteSettingValue(key: string, defaultValue = ""): string {
  const { data: settings } = useSiteSettings();
  if (!settings) return defaultValue;
  return settings[key] || settings[key.toLowerCase()] || defaultValue;
}
