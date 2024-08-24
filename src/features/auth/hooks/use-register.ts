import { toast } from "sonner";
import { client } from "@/lib/hono";
import { useMutation } from "@tanstack/react-query";

import { InferRequestType, InferResponseType } from "hono";
import { redirect } from "next/navigation";

type ResponseType = InferResponseType<(typeof client.api.users)["$post"]>;
type RequestType = InferRequestType<(typeof client.api.users)["$post"]>["json"];

export const useRegister = () => {
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.users.$post({ json });

      if (!response.ok) {
        throw new Error("Something went wrong");
      }
      return await response.json();
    },
    onSuccess: () => {
      toast.success("Registered successfully");
    },
  });

  return mutation;
};
