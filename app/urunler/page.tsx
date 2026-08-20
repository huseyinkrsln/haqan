"use client";

import { useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function UrunlerRedirectContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const paramsString = searchParams.toString();
    if (paramsString) {
      router.replace(`/koleksiyon/erkek-giyim?${paramsString}`);
    } else {
      router.replace("/koleksiyon/erkek-giyim");
    }
  }, [router, searchParams]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-20 text-center">
      <div className="w-8 h-8 border-2 border-[#4A5D3E] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
      <p className="text-xs text-gray-400">Koleksiyona yönlendiriliyorsunuz...</p>
    </div>
  );
}

export default function UrunlerRedirectPage() {
  return (
    <Suspense fallback={null}>
      <UrunlerRedirectContent />
    </Suspense>
  );
}
