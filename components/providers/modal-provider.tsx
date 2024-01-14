'use client';

import CardModal from '@/components/modals/card-modal';
import { useEffect, useState } from 'react';
import ProModal from '@/components/modals/pro-modal';

const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <CardModal />
      <ProModal />
    </>
  );
};

export default ModalProvider;
