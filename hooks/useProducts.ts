import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
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
      const paginatedData = raw?.data || raw;

      const list: Product[] = Array.isArray(paginatedData)
        ? paginatedData
        : Array.isArray(paginatedData?.data)
        ? paginatedData.data
        : Array.isArray(raw?.data?.data)
        ? raw.data.data
        : [];

      return {
        data: list,
        success: true,
        message: raw?.message || "",
        pageNumber: paginatedData?.pageNumber || 1,
        pageSize: paginatedData?.pageSize || list.length,
        totalRecords: paginatedData?.totalRecords ?? list.length,
        totalPages: paginatedData?.totalPages || 1,
      };
    },
  });
}

export function useInfiniteProducts(params?: ProductQueryParams) {
  const take = params?.take || 16;
  return useInfiniteQuery({
    queryKey: ["products-showcase-infinite", params],
    queryFn: async ({ pageParam = 1 }) => {
      const res = await axiosInstance.get("/api/products/showcase", {
        params: {
          page: pageParam,
          take,
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
      const paginatedData = raw?.data || raw;

      const list: Product[] = Array.isArray(paginatedData)
        ? paginatedData
        : Array.isArray(paginatedData?.data)
        ? paginatedData.data
        : Array.isArray(raw?.data?.data)
        ? raw.data.data
        : [];

      return {
        data: list,
        pageNumber: paginatedData?.pageNumber || pageParam,
        pageSize: paginatedData?.pageSize || take,
        totalRecords: paginatedData?.totalRecords ?? list.length,
        totalPages: paginatedData?.totalPages || 1,
      };
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage: any) => {
      if (!lastPage) return undefined;
      const currentPage = lastPage.pageNumber || 1;
      const totalPages = lastPage.totalPages || 1;
      return currentPage < totalPages ? currentPage + 1 : undefined;
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

      // 1. Önce doğrudan slug ile backend'den çekmeyi dene
      try {
        const res = await axiosInstance.get(`/api/products/getbyid?slug=${encodeURIComponent(slug)}`);
        const raw = res.data;
        const product = raw?.data || raw;
        if (product && product.id) {
          return product;
        }
      } catch {
        // Devam et (sayısal ID veya vitrin araması fallback'i)
      }

      // 2. Eğer slug sayısal ise ID ile dene
      if (!isNaN(Number(slug))) {
        try {
          const res = await axiosInstance.get(`/api/products/getbyid?id=${Number(slug)}`);
          const raw = res.data;
          const product = raw?.data || raw;
          if (product && product.id) {
            return product;
          }
        } catch {
          // Devam et
        }
      }

      // 3. Barkod veya kod araması ile vitrinden ürünü yakala (Örn: Barkod ile girildiyse)
      try {
        const searchRes = await axiosInstance.get(`/api/products/showcase?search=${encodeURIComponent(slug)}&take=1`);
        const searchRaw = searchRes.data;
        const searchList = Array.isArray(searchRaw?.data)
          ? searchRaw.data
          : Array.isArray(searchRaw?.data?.data)
          ? searchRaw.data.data
          : Array.isArray(searchRaw)
          ? searchRaw
          : [];
        if (searchList.length > 0 && searchList[0]?.id) {
          const fullRes = await axiosInstance.get(`/api/products/getbyid?id=${searchList[0].id}`);
          const fullRaw = fullRes.data;
          const fullProduct = fullRaw?.data || fullRaw;
          if (fullProduct && fullProduct.id) {
            return fullProduct;
          }
        }
      } catch {
        // Fallback da bulamadıysa null dön
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
