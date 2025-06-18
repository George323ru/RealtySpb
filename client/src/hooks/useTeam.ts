import { useQuery } from "@tanstack/react-query";
import type { TeamMember } from "@shared/schema";

export function useTeamMembers() {
  return useQuery<TeamMember[]>({
    queryKey: ["/api/team"],
  });
}

export function useTeamMember(id: number) {
  return useQuery<TeamMember>({
    queryKey: [`/api/team/${id}`],
    enabled: !!id,
  });
}
