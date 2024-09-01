"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  CreditCard,
  Crown,
  Home,
  Loader,
  MessageCircleQuestion,
} from "lucide-react";
import { SidebarItem } from "./sidebar-item";
import { usePathname } from "next/navigation";
import { usePaywall } from "@/features/subscription/hooks/use-paywall";
import { useCheckout } from "@/features/subscription/query/use-checkout";
import { useBilling } from "@/features/subscription/query/use-billing";

export const SidebarRoutes = () => {
  const pathname = usePathname();
  
  const mutation = useCheckout();
  const billingMutation = useBilling();
  
  const { shouldBlock, isLoading  , triggerPaywall} = usePaywall();
  
   const onClick = () => {
     if (shouldBlock) {
       triggerPaywall();
       return;
     }

     billingMutation.mutate();
   };

  return (
    <div className="flex flex-col gap-y-4 flex-1">
      {shouldBlock && !isLoading && (
        <>
          <div className="px-3">
            <Button
              size="lg"
              variant="outline"
              onClick={() => mutation.mutate()}
              disabled={mutation.isPending}
              className="w-full rounded-lg border-none bg-violet-800 text-white hover:bg-white hover:text-black hover:opacity-75 transition"
            >
              {mutation.isPending ? (
                <Loader className="size-4 animate-spin text-white" />
              ) : (
                <>
                  <Crown className="mr-2 size-4 fill-yellow-400 text-yellow-400" />
                  <span>Upgrade to Pro</span>
                </>
              )}
            </Button>
          </div>
          <div className="px-3">
            <Separator />
          </div>
        </>
      )}
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
          onClick={onClick}
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
