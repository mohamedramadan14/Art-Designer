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
import { CheckCircle2, Loader } from "lucide-react";
import Image from "next/image";
import { useCheckout } from "@/features/subscription/query/use-checkout";
import { useFailModal } from "@/features/subscription/store/use-fail-modal";
import { useRouter } from "next/navigation";

export const FailModal = () => {
  const { isOpen, onOpen, onClose } = useFailModal();
  const mutation = useCheckout();
  const router = useRouter();
  const handleClose = () => {
    router.replace("/")
    onClose();
  }
  return (  
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader className="flex items-center space-y-4">
          <Image src="/logo.svg" width={36} height={36} alt="logo" />
        </DialogHeader>
        <DialogTitle className="text-center">Something went wrong</DialogTitle>
        <DialogDescription className="text-center">
          We were unable to process your payment.
        </DialogDescription>
        <DialogFooter className="pt-2 mt-2 gap-y-2">
          <Button
            className="w-full bg-orange-500 hover:bg-orange-600 text-white focus-visible:ring-orange-500"
            onClick={handleClose}
          >
            Continue
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
