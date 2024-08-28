import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

export const Banner = () => {
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
          variant="secondary"
          className="w-[160px] flex justify-center items-center space-x-2"
        >
          <span className="flex items-center">Start Designing</span>
          <ArrowRight className="size-4" />
        </Button>
      </div>
    </div>
  );
};
