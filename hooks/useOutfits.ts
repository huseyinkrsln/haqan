import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";

export interface OutfitItemVariant {
  id: number;
  sizeId: number;
  sizeName: string;
  stockQuantity: number;
}

export interface OutfitItem {
  id: number;
  outfitId: number;
  productId: number;
  productName: string;
  productSlug: string;
  productBasePrice: number;
  productDiscountPrice?: number;
  productColorId: number;
  colorName: string;
  colorHexCode: string;
  imageUrl?: string;
  displayOrder: number;
  isRequired: boolean;
  variants: OutfitItemVariant[];
}

export interface Outfit {
  id: number;
  title: string;
  slug: string;
  description?: string;
  coverImageUrl: string;
  gender?: string;
  price: number;
  totalOriginalPrice: number;
  discountType?: string;
  discountValue?: number;
  showDiscountBadge: boolean;
  displayOrder: number;
  isActive: boolean;
  itemCount: number;
  items: OutfitItem[];
}

export function useOutfits(gender?: string, onlyActive: boolean = true) {
  return useQuery<Outfit[]>({
    queryKey: ["outfits", gender, onlyActive],
    queryFn: async () => {
      const params: Record<string, any> = { onlyActive };
      if (gender) params.gender = gender;
      const res = await axiosInstance.get("/api/Outfits/getall", { params });
      return res.data?.data || res.data || [];
    },
  });
}

export function useInfiniteOutfits(params?: { take?: number; search?: string }) {
  const take = params?.take || 8;
  return useInfiniteQuery({
    queryKey: ["outfits-showcase-infinite", params],
    queryFn: async ({ pageParam = 1 }) => {
      const res = await axiosInstance.get("/api/Outfits/showcase", {
        params: {
          page: pageParam,
          take,
          search: params?.search || undefined,
        },
      });
      return res.data?.data || res.data;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage: any) => {
      if (!lastPage) return undefined;
      const currentPage = lastPage.pageNumber || lastPage.PageNumber || 1;
      const totalPages = lastPage.totalPages || lastPage.TotalPages || 1;
      return currentPage < totalPages ? currentPage + 1 : undefined;
    },
  });
}

export function useOutfitBySlug(slug: string) {
  return useQuery<Outfit | null>({
    queryKey: ["outfit", slug],
    queryFn: async () => {
      if (!slug) return null;
      const res = await axiosInstance.get(`/api/Outfits/getbyslug?slug=${encodeURIComponent(slug)}`);
      return res.data?.data || res.data || null;
    },
    enabled: !!slug,
  });
}

