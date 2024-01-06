import { PropsWithChildren } from 'react';

const ClerkLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className='flex h-full justify-center items-center'>{children}</div>
  );
};

export default ClerkLayout;
