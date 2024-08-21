import { client } from "@/lib/hono";
import { useMutation } from "@tanstack/react-query";

import { InferRequestType, InferResponseType } from "hono";

type ResponseType = InferResponseType<(typeof client.api.ai)["rm-bg"]["$post"]>;
type RequestType = InferRequestType<
  (typeof client.api.ai)["rm-bg"]["$post"]
>["json"];

export const useRemoveBackground = () => {
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.ai["rm-bg"].$post({ json });
      return await response.json();
    },
  });

  return mutation;
};
