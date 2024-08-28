"use client";

import { Button } from "@/components/ui/button";
import { useCreateProject } from "@/features/projects/query/use-create-project";
import { ArrowRight, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export const Banner = () => {
  const router = useRouter();
  const mutation = useCreateProject();

  const onClickHandler = () => {
    mutation.mutate(
      {
        name: "Untitled",
        json: "",
        width: 900,
        height: 1200,
      },
      {
        onSuccess: ({ data }) => {
          router.push(`/editor/${data.id}`);
        },
      }
    );
  };
  return (
    <div className="text-white aspect-[5/1] min-h-[250px] flex gap-x-6 p-6 items-center rounded-xl bg-gradient-to-r from-[#fb923c] via-[#a78bfa] to-[#6d28d9]">
      <div className="rounded-full size-28 hidden md:flex items-center justify-center bg-white/50">
        <div className="rounded-full size-20 flex items-center justify-center bg-white">
          <Sparkles className="h-20 text-[#a78bfa] fill-[#a78bfa]" />
        </div>
      </div>
      <div className="flex flex-col gap-y-2">
        <h1 className="text-xl md:text-3xl font-semibold">
          Unleash your creativity with DesignArt
        </h1>
        <p className="text-xs md:text-sm mb-2">
          Start your inspired design journey right now.
        </p>
        <Button
          onClick={onClickHandler}
          disabled={mutation.isPending}
          variant="secondary"
          className="w-[160px] flex justify-center items-center"
        >
            {mutation.isPending ? (
              <AiOutlineLoading3Quarters className="size-4 animate-spin" />
            ) : (
              <div className="flex items-center justify-center gap-x-2">
                <span>Start Designing</span>
                <ArrowRight className="size-4" />
              </div>
            )}
      
        </Button>
      </div>
    </div>
  );
};
