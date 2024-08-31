import { client } from "@/lib/hono";
import { useMutation } from "@tanstack/react-query";

import { InferResponseType } from "hono";
import { toast } from "sonner";

type ResponseType = InferResponseType<
  (typeof client.api.subscriptions.checkout)["$post"],
  200
>;
//type RequestType = InferRequestType<(typeof client.api.subscriptions.checkout)["$post"]>["json"];

export const useCheckout = () => {
  
  const mutation = useMutation<ResponseType, Error>({
    mutationFn: async () => {
      const response = await client.api.subscriptions.checkout.$post();
      if (!response.ok) {
        throw new Error("Failed to process payment");
      }
      return await response.json();
    },
    onSuccess: ({ data }) => {
      window.location.href = data;
    },
    onError: () => {
      toast.error("Failed to process payment");
    },
  });

  return mutation;
};
