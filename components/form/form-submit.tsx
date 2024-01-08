'use client';

import { useFormStatus } from 'react-dom';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';
import { PropsWithChildren } from 'react';

interface Props {
  disabled?: boolean;
  className?: string;
  variant?:
    | 'default'
    | 'destructive'
    | 'outline'
    | 'secondary'
    | 'ghost'
    | 'link'
    | 'primary';
}

const FormSubmit = ({
  children,
  disabled,
  className,
  variant = 'primary',
}: PropsWithChildren<Props>) => {
  const { pending } = useFormStatus();
  return (
    <Button
      type='submit'
      variant={variant}
      size='sm'
      className={cn(className)}
      disabled={pending || disabled}
    >
      {children}
    </Button>
  );
};

export default FormSubmit;
