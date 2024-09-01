"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogDescription,
  DialogTitle,
  DialogHeader,
  DialogFooter,
  DialogContent,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { useSubscriptionModal } from "@/features/subscription/store/use-subscription-modal";
import { CheckCircle2, Loader } from "lucide-react";
import Image from "next/image";
import { useCheckout } from "@/features/subscription/query/use-checkout";

export const SubscriptionModal = () => {
  const { isOpen, onOpen, onClose } = useSubscriptionModal();
  const mutation = useCheckout();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader className="flex items-center space-y-4">
          <Image src="/logo.svg" width={36} height={36} alt="logo" />
        </DialogHeader>
        <DialogTitle className="text-center">Upgrade to Pro</DialogTitle>
        <DialogDescription className="text-center">
          Unlock AI features and access exclusive content.
        </DialogDescription>
        <Separator />
        <ul className="space-y-3">
          <li className="flex items-center">
            <CheckCircle2 className="size-6 mr-2 fill-violet-500 text-white" />
            <p className="text-sm text-muted-foreground">
              Unlimited access to all Pro templates
            </p>
          </li>
          <li className="flex items-center">
            <CheckCircle2 className="size-6 mr-2 fill-violet-500 text-white" />
            <p className="text-sm text-muted-foreground">
              Unlimited queries for AI image generation
            </p>
          </li>
          <li className="flex items-center">
            <CheckCircle2 className="size-6 mr-2 fill-violet-500 text-white" />
            <p className="text-sm text-muted-foreground">
              Unlimited queries for AI image background removal
            </p>
          </li>
          <li className="flex items-center">
            <CheckCircle2 className="size-6 mr-2 fill-violet-500 text-white" />
            <p className="text-sm text-muted-foreground">
              Early access to all new features and updates
            </p>
          </li>
        </ul>
        <DialogFooter className="pt-2 mt-2 gap-y-2">
          <Button
            className="w-full bg-orange-500 hover:bg-orange-600 text-white focus-visible:ring-orange-500"
            onClick={() => mutation.mutate()}
            disabled={mutation.isPending}
          >
            {mutation.isPending ? (
              <Loader className="size-4 animate-spin text-muted-foreground" />
            ) : (
              "Upgrade"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
