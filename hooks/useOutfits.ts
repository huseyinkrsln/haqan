import { useQuery } from "@tanstack/react-query";
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
