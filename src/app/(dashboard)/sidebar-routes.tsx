"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CreditCard, Crown, Home, MessageCircleQuestion } from "lucide-react";
import { SidebarItem } from "./sidebar-item";
import { usePathname } from "next/navigation";

export const SidebarRoutes = () => {
  const pathname = usePathname();
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
          isActive={pathname === "/"}
        />
      </ul>
      <div className="px-3">
        <Separator />
      </div>
      <ul className="flex flex-col gap-y-2 px-3">
        <SidebarItem
          href={pathname}
          icon={CreditCard}
          label="Billing"
          onClick={() => console.log("Upgrade to Pro")}
        />
        <SidebarItem
          href="mailto:moramadan99297@gmail.com"
          icon={MessageCircleQuestion}
          label="Support"
        />
      </ul>
    </div>
  );
};
