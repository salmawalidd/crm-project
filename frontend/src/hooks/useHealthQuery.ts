import { useQuery } from "@tanstack/react-query";

import { getHealth } from "../services/healthApi";

export function useHealthQuery() {
  return useQuery({
    queryKey: ["health"],
    queryFn: getHealth,
  });
}