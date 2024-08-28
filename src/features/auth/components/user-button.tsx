"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CreditCard, Loader, LogOut } from "lucide-react";
import { useSession, signOut } from "next-auth/react";

export const UserButton = () => {
  const session = useSession();

  if (session.status === "loading") {
    return <Loader className="size-4 animate-spin text-muted-foreground" />;
  }

  if (session.status === "unauthenticated" || !session.data) {
    return null;
  }

  const name = session.data.user?.name;
  const imageUrl = session.data.user?.image;

  // to avoid overflow lock and freezing entire body element add ---> modal={false}
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
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
          onClick={() => {
            // TODO: implement billing and add crown if user is premium
          }}
          disabled={false}
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
