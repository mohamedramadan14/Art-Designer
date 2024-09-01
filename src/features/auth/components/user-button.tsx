"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { usePaywall } from "@/features/subscription/hooks/use-paywall";
import { useBilling } from "@/features/subscription/query/use-billing";
import { CreditCard, Crown, Loader, LogOut } from "lucide-react";
import { useSession, signOut } from "next-auth/react";

export const UserButton = () => {
  const {triggerPaywall , shouldBlock , isLoading} = usePaywall();
  const session = useSession();
  const mutation = useBilling();

  if (session.status === "loading") {
    return <Loader className="size-4 animate-spin text-muted-foreground" />;
  }

  if (session.status === "unauthenticated" || !session.data) {
    return null;
  }

  const name = session.data.user?.name;
  const imageUrl = session.data.user?.image;

  const onClick = () =>{
    if(shouldBlock){
      triggerPaywall();
      return;
    }

    mutation.mutate();
  }
  // to avoid overflow lock and freezing entire body element add ---> modal={false}
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger className="relative outline-none">
        {!shouldBlock && !isLoading && (
          <div className="absolute -top-2 -left-2 z-10 flex items-center justify-center">
            <div className="rounded-full bg-white flex items-center justify-center p-1 drop-shadow-sm">
              <Crown className="size-3 text-yellow-500 fill-yellow-500"/>
            </div>
          </div>
        )}
        <Avatar className="size-10 hover:backdrop-opacity-75 transition cursor-pointer">
          <AvatarImage alt={name || "WA"} src={imageUrl || ""} />
          <AvatarFallback className="bg-violet-500 font-medium text-white flex items-center justify-center">
            {`${name?.charAt(0).toUpperCase()}${name
              ?.charAt(1)
              .toUpperCase()}` || "WA"}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuItem
          onClick={onClick}
          disabled={mutation.isPending}
          className="h-10"
        >
          <CreditCard className="mr-2 size-4 text-yellow-500" />
          Billing
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() =>
            signOut({
              callbackUrl: "/login",
            })
          }
          disabled={false}
          className="h-10"
        >
          <LogOut className="mr-2 size-4 text-destructive" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
