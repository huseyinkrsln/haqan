import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";
import {
  Product,
  ProductVariant,
  ProductImage,
  PaginatedResult,
} from "@/types/api.types";

export interface ProductQueryParams {
  page?: number;
  take?: number;
  search?: string;
  categoryId?: number;
  productGroupId?: number;
  brandId?: number;
  colorId?: number;
  sizeId?: number;
  minPrice?: number;
  maxPrice?: number;
  isFeatured?: boolean;
  isBestSeller?: boolean;
  isNewArrival?: boolean;
  orderBy?: string;
  isAscending?: boolean;
}

function normalizeSlug(str?: string): string {
  if (!str) return "";
  return decodeURIComponent(str)
    .toLowerCase()
    .trim()
    .replace(/ğ/g, "g")
    .replace(/ü/g, "u")
    .replace(/ş/g, "s")
    .replace(/ı/g, "i")
    .replace(/ö/g, "o")
    .replace(/ç/g, "c")
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "");
}

export function useProducts(params?: ProductQueryParams) {
  return useQuery<PaginatedResult<Product[]>>({
    queryKey: ["products-showcase", params],
    queryFn: async () => {
      const res = await axiosInstance.get("/api/products/showcase", {
        params: {
          page: params?.page || 1,
          take: params?.take || 20,
          search: params?.search || undefined,
          categoryId: params?.categoryId || undefined,
          productGroupId: params?.productGroupId || undefined,
          brandId: params?.brandId || undefined,
          colorId: params?.colorId || undefined,
          sizeId: params?.sizeId || undefined,
          minPrice: params?.minPrice || undefined,
          maxPrice: params?.maxPrice || undefined,
          isFeatured: params?.isFeatured || undefined,
          isBestSeller: params?.isBestSeller || undefined,
          isNewArrival: params?.isNewArrival || undefined,
          orderBy: params?.orderBy || undefined,
          isAscending: params?.isAscending,
        },
      });

      const raw = res.data;
      const list: Product[] = Array.isArray(raw)
        ? raw
        : Array.isArray(raw?.Data)
        ? raw.Data
        : Array.isArray(raw?.data)
        ? raw.data
        : Array.isArray(raw?.data?.data)
        ? raw.data.data
        : [];

      const inStockList = list.filter((p: any) => {
        if (p.inStock === false || p.InStock === false) return false;
        const variants = p.variants || p.Variants;
        if (Array.isArray(variants) && variants.length > 0) {
          return variants.some((v: any) => Number(v.stockQuantity ?? v.StockQuantity ?? 0) > 0);
        }
        return true;
      });

      return {
        data: inStockList,
        success: true,
        message: "",
        pageNumber: raw?.pageNumber || raw?.PageNumber || 1,
        pageSize: raw?.pageSize || raw?.PageSize || inStockList.length,
        totalRecords: inStockList.length,
        totalPages: raw?.totalPages || raw?.TotalPages || 1,
      };
    },
  });
}

export function useProductById(id: number) {
  return useQuery<Product>({
    queryKey: ["product", id],
    queryFn: async () => {
      const res = await axiosInstance.get(`/api/products/getbyid?id=${id}`);
      const raw = res.data;
      return raw?.data || raw;
    },
    enabled: Boolean(id && id > 0),
  });
}

export function useProductBySlug(slug: string) {
  return useQuery<Product | null>({
    queryKey: ["product-by-slug", slug],
    queryFn: async () => {
      if (!slug) return null;
      const targetSlug = normalizeSlug(slug);

      // 1. Vitrin listesinden ürünleri çek
      const res = await axiosInstance.get("/api/products/showcase", {
        params: { take: 100 },
      });

      const raw = res.data;
      const list: Product[] = Array.isArray(raw)
        ? raw
        : Array.isArray(raw?.data)
        ? raw.data
        : Array.isArray(raw?.data?.data)
        ? raw.data.data
        : [];

      // 2. Slug veya İsim veya ID üzerinden eşleşeni bul
      const found = list.find((p) => {
        const pSlug = normalizeSlug(p.slug);
        const pName = normalizeSlug(p.name);
        return pSlug === targetSlug || pName === targetSlug || String(p.id) === slug;
      });

      if (found) {
        try {
          // 3. Detay endpoint'inden tüm zenginleştirilmiş verileri çek
          const detailRes = await axiosInstance.get(
            `/api/products/getbyid?id=${found.id}`
          );
          const detailRaw = detailRes.data;
          const detailedProduct = detailRaw?.data || detailRaw;
          return detailedProduct && detailedProduct.id ? detailedProduct : found;
        } catch {
          return found;
        }
      }
      return null;
    },
    enabled: Boolean(slug),
  });
}

export function useFeaturedProducts(take = 8) {
  return useProducts({ isFeatured: true, take });
}

export function useBestSellerProducts(take = 8) {
  return useProducts({ isBestSeller: true, take });
}

export function useNewArrivalProducts(take = 8) {
  return useProducts({ isNewArrival: true, take });
}

export function useProductVariants(productId: number) {
  return useQuery<ProductVariant[]>({
    queryKey: ["product-variants", productId],
    queryFn: async () => {
      const res = await axiosInstance.get(
        `/api/productvariants/getbyproductid?productId=${productId}`
      );
      const raw = res.data;
      return Array.isArray(raw) ? raw : raw?.data || [];
    },
    enabled: Boolean(productId && productId > 0),
  });
}

export function useProductImages(productId: number) {
  return useQuery<ProductImage[]>({
    queryKey: ["product-images", productId],
    queryFn: async () => {
      const res = await axiosInstance.get(
        `/api/productimages/getbyproductid?productId=${productId}`
      );
      const raw = res.data;
      return Array.isArray(raw) ? raw : raw?.data || [];
    },
    enabled: Boolean(productId && productId > 0),
  });
}
