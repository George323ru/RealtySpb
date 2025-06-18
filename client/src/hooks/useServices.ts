import { useQuery } from "@tanstack/react-query";
import type { Service } from "@shared/schema";

export function useServices() {
  return useQuery<Service[]>({
    queryKey: ["/api/services"],
  });
}

export function useService(id: number) {
  return useQuery<Service>({
    queryKey: [`/api/services/${id}`],
    enabled: !!id,
  });
}

export function useServiceBySlug(slug: string) {
  return useQuery<Service>({
    queryKey: [`/api/services/${slug}`],
    enabled: !!slug,
  });
}
