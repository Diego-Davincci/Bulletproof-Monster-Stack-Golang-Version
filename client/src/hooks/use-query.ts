import { getHttpRequest } from "@/lib/api/client";
import { useQuery } from "@tanstack/react-query";

export const useGetQueryHook = ({
  queryKey,
  url,
}: {
  queryKey: string[];
  url: string;
}) => {
  return useQuery({
    queryKey,
    queryFn: () => getHttpRequest(url),
  });
};
