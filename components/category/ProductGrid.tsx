import ProductCard from "@/components/product/ProductCard";
import { Product } from "@/lib/data";

interface ProductGridProps {
  products: Product[];
}

export default function ProductGrid({ products }: ProductGridProps) {
  if (!products.length) {
    return (
      <div className="text-center py-16 text-gray-400">
        <p className="text-lg font-medium">Bu kategoride ürün bulunamadı.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          id={product.id}
          slug={product.slug}
          name={product.name}
          price={product.price}
          oldPrice={product.oldPrice}
          image={product.images[0]}
          product={product}
        />
      ))}
    </div>
  );
}
