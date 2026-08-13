"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";
import { useState } from "react";
import { CompatibleProduct, formatPrice } from "@/lib/data";

interface CompatibleProductsProps {
  products: CompatibleProduct[];
}

function WishlistButton() {
  const [wished, setWished] = useState(false);
  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        setWished((w) => !w);
      }}
      className="absolute top-1.5 right-1.5 bg-white/80 rounded-full p-1"
      aria-label="Favorilere ekle"
    >
      <Heart
        size={10}
        className={wished ? "fill-red-500 text-red-500" : "text-gray-400"}
      />
    </button>
  );
}

export default function CompatibleProducts({ products }: CompatibleProductsProps) {
  if (!products.length) return null;

  return (
    <div className="bg-white rounded-xl border border-gray-100 p-4 h-full flex flex-col">
      <h3 className="text-xs font-bold tracking-widest text-gray-700 uppercase mb-3">
        Bu Ürünle Uyumlu Parçalar
      </h3>
      <div className="flex gap-3 overflow-x-auto scrollbar-hide flex-1 pb-1">
        {products.map((product) => (
          <Link
            key={product.id}
            href={`/urun/${product.slug}`}
            className="group shrink-0 w-28"
          >
            <div className="relative aspect-square rounded-xl overflow-hidden bg-gray-50 border border-gray-100">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                sizes="112px"
              />
              <WishlistButton />
            </div>
            <p className="text-[11px] font-medium text-gray-800 mt-1.5 truncate">
              {product.name}
            </p>
            <p className="text-[11px] text-gray-500">{formatPrice(product.price)}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
