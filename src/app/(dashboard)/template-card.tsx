import { cn } from "@/lib/utils";
import { Crown } from "lucide-react";
import Image from "next/image";

interface TemplateCardProps {
  imgSrc: string;
  title: string;
  onClick: () => void;
  disabled?: boolean;
  description: string;
  width: number;
  height: number;
  isPro: boolean | null;
}
export const TemplateCard = ({
  description,
  height,
  imgSrc,
  isPro,
  onClick,
  title,
  width,
  disabled
}: TemplateCardProps) => {
    return (
        <button onClick={onClick} disabled={disabled} className={cn(
            "space-y-2 group text-left transition flex flex-col",
            disabled ? "cursor-not-allowed opacity-75" : "cursor-pointer"
        )}>
            <div 
            style={{
                aspectRatio: `${width}/${height}`,
            }}
            className="relative rounded-xl  h-full w-full overflow-hidden border">
                <Image src={imgSrc} fill className="object-cover transition transform group-hover:scale-110" alt={title}/>
                {isPro && (
                    <div className="absolute top-3 right-3 size-10 flex items-center justify-center bg-black/50 rounded-full -z[10]">
                        <Crown className="size-6 fill-yellow-500 text-yellow-500"/>
                    </div>
                )}
                <div className="opacity-0  group-hover:opacity-100 absolute inset-0 transition bg-black/50 flex items-center justify-center rounded-xl backdrop-blur-sm backdrop-filter">
                    <p className="text-white font-medium">Open in new project</p>
                </div>
            </div>
            <div className="space-y-1">
                <p className="text-sm font-medium">
                    {title}
                </p>
                <p className="text-sm text-muted-foreground opacity-0 group-hover:opacity-75 transition">{description}</p>
            </div>
        </button>
    )
};
