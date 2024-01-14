'use client';

import { stripeRedirect } from '@/actions/stripe-redirect';
import { Button } from '@/components/ui/button';
import { useAction } from '@/hooks/use-action';
import { useProModalStore } from '@/hooks/use-pro-modal';
import { toast } from 'sonner';

interface Props {
  isPro: boolean;
}

const SubscriptionButton = ({ isPro }: Props) => {
  const proModal = useProModalStore();
  const { execute, isLoading } = useAction(stripeRedirect, {
    onSuccess: (data) => {
      window.location.href = data;
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const onClick = () => {
    if (isPro) {
      execute({});
    } else {
      proModal.onOpen();
    }
  };

  return (
    <Button variant='primary' onClick={onClick} disabled={isLoading}>
      {isPro ? 'Manage subscription' : 'Upgrade to pro'}
    </Button>
  );
};

export default SubscriptionButton;
