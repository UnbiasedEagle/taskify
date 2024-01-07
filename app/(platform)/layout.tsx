import { Toaster } from '@/components/ui/sonner';
import { ClerkProvider } from '@clerk/nextjs';
import { PropsWithChildren } from 'react';

const PlatformLayout = ({ children }: PropsWithChildren) => {
  return (
    <ClerkProvider>
      {children}
      <Toaster />
    </ClerkProvider>
  );
};

export default PlatformLayout;
