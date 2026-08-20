import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";
import { Slider } from "@/types/api.types";

export function useSliders() {
  return useQuery<Slider[]>({
    queryKey: ["sliders"],
    queryFn: async () => {
      const res = await axiosInstance.get("/api/sliders/getall");
      const data = Array.isArray(res.data) ? res.data : (res.data as any)?.data || [];
      return data.sort(
        (a: Slider, b: Slider) => (a.displayOrder || 0) - (b.displayOrder || 0)
      );
    },
  });
}
