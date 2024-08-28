"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Crown, Home } from "lucide-react";
import { SidebarItem } from "./sidebar-item";

export const SidebarRoutes = () => {
  return (
    <div className="flex flex-col gap-y-4 flex-1">
      <div className="px-4">
        <Button
          size="lg"
          variant="outline"
          onClick={() => console.log("Upgrade to Pro")}
          className="w-full rounded-lg border-none bg-violet-800 text-white hover:bg-white hover:text-black hover:opacity-75 transition"
        >
          <Crown className="mr-2 size-4 fill-yellow-400 text-yellow-400" />
          <span>Upgrade to Pro</span>
        </Button>
      </div>
      <div className="px-3">
        <Separator />
      </div>
      <ul className="flex flex-col gap-y-2 px-3">
        <SidebarItem 
        href="/"
        icon={Home}
        label="Home"
        />
      </ul>
    </div>
  );
};
