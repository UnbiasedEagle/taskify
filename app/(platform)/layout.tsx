import ModalProvider from '@/components/providers/modal-provider';
import QueryProvider from '@/components/providers/query-provider';
import { Toaster } from '@/components/ui/sonner';
import { ClerkProvider } from '@clerk/nextjs';
import { PropsWithChildren } from 'react';

const PlatformLayout = ({ children }: PropsWithChildren) => {
  return (
    <ClerkProvider>
      <QueryProvider>
        {children}
        <Toaster />
        <ModalProvider />
      </QueryProvider>
    </ClerkProvider>
  );
};

export default PlatformLayout;
