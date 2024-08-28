import Image from "next/image";
import Link from "next/link";

import { Space_Grotesk } from "next/font/google";
import { cn } from "@/lib/utils";

const font = Space_Grotesk({ subsets: ["latin"], weight: "700" });

export const Logo = () => {
  return (
    <Link href="/">
      <div className="flex items-center gap-x-2 transition hover:opacity-75 h-[68px] px-4">
        <div className="size-8 relative">
          <Image src={"/logo.svg"} alt="DesignArt" fill />
        </div>
        <h1 className={cn(font.className, "text-xl font-bold")}>Design Art</h1>
      </div>
    </Link>
  );
};
