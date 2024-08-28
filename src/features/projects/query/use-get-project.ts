import { client } from "@/lib/hono";
import { useQuery } from "@tanstack/react-query";
import { InferResponseType } from "hono";

export type ProjectResponseType = InferResponseType<typeof client.api.projects[":projectId"]["$get"], 200>;
export const useGetProject = (projectId: string) => {
  const query = useQuery({
    enabled: !!projectId,
    queryKey: ["project", { projectId }],
    queryFn: async () => {
      const response = await client.api.projects[":projectId"].$get({
        param: { projectId },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch project");
      }
      const { data } = await response.json();
      return data;
    },
  });

  return query;
};
