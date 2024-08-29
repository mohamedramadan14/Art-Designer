import { client } from "@/lib/hono";
import { useMutation , useQueryClient } from "@tanstack/react-query";

import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";

type ResponseType = InferResponseType<
  (typeof client.api.projects)[":projectId"]["$patch"],
  200
>;
type RequestType = InferRequestType<
  (typeof client.api.projects)[":projectId"]["$patch"]
>["json"];

export const useUpdateProject = (projectId: string) => {
  const queryClient = useQueryClient();


  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.projects[":projectId"].$patch({
        json,
        param: { projectId },
      });
      if (!response.ok) {
        throw new Error("Failed to update project");
      }
      return await response.json();
    },
    onSuccess: () => {
      // invalidate the "projects" query ---> Done
      queryClient.invalidateQueries({queryKey: ["projects" , { projectId }]});
      /* toast.success("Project updated successfully"); */
    },
    onError: () => {
      toast.error("Failed to update project");
    },
  });

  return mutation;
};
