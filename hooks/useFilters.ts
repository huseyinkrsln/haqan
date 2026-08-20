import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";
import { ProductGroup, Brand, Color, Size } from "@/types/api.types";

export function useProductGroups(categoryId?: number) {
  return useQuery<ProductGroup[]>({
    queryKey: ["product-groups", categoryId],
    queryFn: async () => {
      const url = categoryId
        ? `/api/productgroups/getall?categoryId=${categoryId}`
        : "/api/productgroups/getall";
      const res = await axiosInstance.get(url);
      return Array.isArray(res.data) ? res.data : (res.data as any)?.data || [];
    },
  });
}

export function useBrands() {
  return useQuery<Brand[]>({
    queryKey: ["brands"],
    queryFn: async () => {
      const res = await axiosInstance.get("/api/brands/getall");
      return Array.isArray(res.data) ? res.data : (res.data as any)?.data || [];
    },
  });
}

export function useColors() {
  return useQuery<Color[]>({
    queryKey: ["colors"],
    queryFn: async () => {
      const res = await axiosInstance.get("/api/colors/getall");
      return Array.isArray(res.data) ? res.data : (res.data as any)?.data || [];
    },
  });
}

export function useSizes() {
  return useQuery<Size[]>({
    queryKey: ["sizes"],
    queryFn: async () => {
      const res = await axiosInstance.get("/api/sizes/getall");
      return Array.isArray(res.data) ? res.data : (res.data as any)?.data || [];
    },
  });
}
