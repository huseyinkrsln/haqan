import { notFound } from "next/navigation";
import Link from "next/link";
import { getProductBySlug } from "@/lib/data";
import ProductImageGallery from "@/components/product/ProductImageGallery";
import ProductInfo from "@/components/product/ProductInfo";
import CompatibleProducts from "@/components/product/CompatibleProducts";
import ProductDetailBadges from "@/components/product/ProductDetailBadges";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: "Ürün Bulunamadı" };
  return {
    title: product.name,
    description: product.description,
  };
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) notFound();

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-6 md:py-10">
      {/* Breadcrumb */}
      <nav className="hidden md:flex items-center gap-2 text-xs text-gray-400 mb-8">
        <Link href="/" className="hover:text-gray-700">Ana Sayfa</Link>
        <span>›</span>
        <Link href="/kategoriler" className="hover:text-gray-700">Kategoriler</Link>
        <span>›</span>
        <Link href={`/kategoriler/${product.category}`} className="hover:text-gray-700 capitalize">
          {product.category}
        </Link>
        <span>›</span>
        <span className="text-gray-700 font-medium">{product.name}</span>
      </nav>

      {/* Desktop: side-by-side */}
      <div className="hidden md:grid md:grid-cols-[1fr_1fr] lg:grid-cols-[3fr_2fr] gap-10">
        <ProductImageGallery images={product.images} productName={product.name} />
        <div className="space-y-6">
          <ProductInfo product={product} />

          {/* Desktop: split section below product info */}
          {product.compatibleProducts.length > 0 && (
            <div className="grid grid-cols-2 gap-4 items-stretch mt-6">
              <CompatibleProducts products={product.compatibleProducts} />
              <ProductDetailBadges
                description={product.description}
                badges={product.badges}
              />
            </div>
          )}
          {product.compatibleProducts.length === 0 && (
            <div className="mt-6">
              <ProductDetailBadges
                description={product.description}
                badges={product.badges}
              />
            </div>
          )}
        </div>
      </div>

      {/* Mobile: stacked */}
      <div className="md:hidden space-y-5">
        <ProductImageGallery images={product.images} productName={product.name} />
        <ProductInfo product={product} />

        {/* Mobile 50/50 split */}
        <div className="grid grid-cols-2 gap-3 items-stretch">
          <CompatibleProducts products={product.compatibleProducts} />
          <ProductDetailBadges
            description={product.description}
            badges={product.badges}
          />
        </div>
      </div>
    </div>
  );
}
