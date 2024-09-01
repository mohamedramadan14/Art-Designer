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
import Image from "next/image";
import { useCheckout } from "@/features/subscription/query/use-checkout";
import { useRouter } from "next/navigation";
import { useSuccessModal } from "@/features/subscription/store/use-success-modal";
import { RxCheckCircled } from "react-icons/rx";


export const SuccessModal = () => {
  const { isOpen, onOpen, onClose } = useSuccessModal();
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
        <DialogTitle className="text-center">Subscription Success</DialogTitle>
        <DialogDescription className="text-center">
          <div className="flex items-center justify-center gap-x-2">
            <RxCheckCircled className="size-6 mr-2 fill-green-600 text-green-600" />
            You have successfully subscribed to Pro Plan.
          </div>
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
