import { useSubscriptionModal } from "@/features/subscription/store/use-subscription-modal";

export const usePaywall = () => {
  const subscriptionModal = useSubscriptionModal();

  // TODO: change based on user subscription
  const shouldBlock = true;
  // TODO: change loading based on fetching from API
  return {
    isLoading: false,
    shouldBlock,
    triggerPaywall: () => subscriptionModal.onOpen(),
  };
};
