import { useSubscriptionModal } from "@/features/subscription/store/use-subscription-modal";
import { useGetSubscription } from "@/features/subscription/query/use-get-subscription";

export const usePaywall = () => {
  const { data : subscription, isLoading: isLoadingSubscription } =
    useGetSubscription();

  const subscriptionModal = useSubscriptionModal();

  const shouldBlock = isLoadingSubscription || !subscription?.data.isActive;

  return {
    isLoading: isLoadingSubscription,
    shouldBlock,
    triggerPaywall: () => subscriptionModal.onOpen(),
  };
};
