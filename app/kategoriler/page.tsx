"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCategories } from "@/hooks/useCategories";

export default function KategorilerRedirectPage() {
  const router = useRouter();
  const { data: rootCategories } = useCategories(true);

  useEffect(() => {
    if (rootCategories && rootCategories.length > 0) {
      router.replace(`/koleksiyon/${rootCategories[0].slug}`);
    } else {
      router.replace("/koleksiyon/erkek-giyim");
    }
  }, [rootCategories, router]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-20 text-center">
      <div className="w-8 h-8 border-2 border-[#4A5D3E] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
      <p className="text-xs text-gray-400">Koleksiyona yönlendiriliyorsunuz...</p>
    </div>
  );
}
