'use client';

import { createBoard } from '@/actions/create-board';
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useAction } from '@/hooks/use-action';
import FormInput from './form-input';
import FormSubmit from './form-submit';
import { PropsWithChildren } from 'react';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { toast } from 'sonner';

interface Props {
  side?: 'left' | 'right' | 'top' | 'bottom';
  align?: 'start' | 'center' | 'end';
  sideOffset?: number;
}

const FormPopover = ({
  children,
  side = 'bottom',
  align,
  sideOffset = 0,
}: PropsWithChildren<Props>) => {
  const { execute, fieldErrors } = useAction(createBoard, {
    onSuccess(data) {
      toast.success('Board created!');
    },
    onError(error) {
      toast.error(error);
    },
  });

  const onSubmit = (formData: FormData) => {
    const title = formData.get('title') as string;

    execute({ title });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent
        align={align}
        className='w-80 pt-3'
        side={side}
        sideOffset={sideOffset}
      >
        <div className='text-sm font-medium text-center text-neutral-600 pb-4'>
          Create Board
        </div>
        <PopoverClose asChild>
          <Button
            className='h-auto w-auto p-2 absolute top-2 right-2 text-neutral-600'
            variant='ghost'
          >
            <X className='h-4 w-4' />
          </Button>
        </PopoverClose>
        <form action={onSubmit} className='space-y-4'>
          <div className='space-y-4'>
            <FormInput
              errors={fieldErrors}
              id='title'
              label='Board Title'
              type='text'
            />
          </div>
          <FormSubmit className='w-full'>Create</FormSubmit>
        </form>
      </PopoverContent>
    </Popover>
  );
};

export default FormPopover;
