'use client';

import { Button } from '@/components/ui/button';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { useMobileSidebarStore } from '@/hooks/use-mobile-sidebar';
import { Menu } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import Sidebar from './sidebar';

const MobileSidebar = () => {
  const pathname = usePathname();
  const [isMounted, setIsMounted] = useState(false);
  const { isOpen, onClose, onOpen } = useMobileSidebarStore();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    onClose();
  }, [pathname, onClose]);

  if (!isMounted) return null;

  return (
    <>
      <Button
        variant='ghost'
        size='sm'
        onClick={onOpen}
        className='block md:hidden mr-2'
      >
        <Menu className='h-4 w-4' />
      </Button>
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent side='left' className='p-2 pt-10'>
          <Sidebar storageKey='t-sidebar-mobile-state' />
        </SheetContent>
      </Sheet>
    </>
  );
};

export default MobileSidebar;
