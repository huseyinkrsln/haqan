import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";
import { Category } from "@/types/api.types";

export function useCategories(onlyRoot?: boolean) {
  return useQuery<Category[]>({
    queryKey: ["categories", { onlyRoot }],
    queryFn: async () => {
      const url = onlyRoot
        ? "/api/categories/getall?onlyRoot=true"
        : "/api/categories/getall";
      const res = await axiosInstance.get(url);
      const raw = res.data;
      if (Array.isArray(raw)) return raw;
      if (Array.isArray(raw?.data)) return raw.data;
      if (Array.isArray(raw?.data?.data)) return raw.data.data;
      return [];
    },
  });
}

export function useCategoryBySlug(slug: string) {
  const { data: categories, isLoading } = useCategories();
  const category = categories?.find(
    (c) => c.slug?.toLowerCase() === slug?.toLowerCase()
  );
  return { data: category, isLoading };
}
