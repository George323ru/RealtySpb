import { useQuery } from "@tanstack/react-query";
import type { Property, PropertySearch } from "@shared/schema";

export function useProperties(searchParams?: PropertySearch) {
  return useQuery<Property[]>({
    queryKey: ["/api/properties", searchParams],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (searchParams) {
        Object.entries(searchParams).forEach(([key, value]) => {
          if (value !== undefined && value !== '') {
            params.append(key, String(value));
          }
        });
      }
      const response = await fetch(`/api/properties?${params.toString()}`);
      if (!response.ok) throw new Error('Failed to fetch properties');
      return response.json();
    },
  });
}

export function useProperty(id: number) {
  return useQuery<Property>({
    queryKey: [`/api/properties/${id}`],
    enabled: !!id,
  });
}

export function useFeaturedProperties() {
  return useQuery<Property[]>({
    queryKey: ["/api/properties/featured"],
  });
}
