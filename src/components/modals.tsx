"use client";

import { SubscriptionModal } from "@/features/subscription/components/subscription-modal";
import { useEffect, useState } from "react";

export const Modals = () => {
  const [isMounted, setIsMounted] = useState(false);
    /**
     *  We do that to make sure that the component is mounted and avoid server-side rendering errors
     * so that these modal will not be rendered on the server only on the client
     */
  useEffect(() => {
    setIsMounted(true);
  } , [])

  if (!isMounted) return null;
  return (
    <>
      <SubscriptionModal />
    </>
  );
};
