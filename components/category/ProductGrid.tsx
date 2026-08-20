import ProductCard from "@/components/product/ProductCard";
import { Product } from "@/types/api.types";

interface ProductGridProps {
  products: Product[];
  isLoading?: boolean;
}

export default function ProductGrid({ products, isLoading }: ProductGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
          <div key={n} className="rounded-xl aspect-[3/4] bg-gray-100 animate-pulse" />
        ))}
      </div>
    );
  }

  if (!products || !products.length) {
    return (
      <div className="text-center py-20 bg-white border border-gray-100 rounded-2xl p-8">
        <p className="text-base font-semibold text-gray-800">Bu kriterlere uygun ürün bulunamadı.</p>
        <p className="text-xs text-gray-400 mt-1">Filtreleri temizleyerek tekrar deneyebilirsiniz.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
        />
      ))}
    </div>
  );
}
