import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { PropsWithChildren } from 'react';

interface Props {
  description: string;
  side?: 'left' | 'right' | 'top' | 'bottom';
  sideOffset?: number;
}

const Hint = ({
  children,
  description,
  side = 'bottom',
  sideOffset = 0,
}: PropsWithChildren<Props>) => {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={0}>
        <TooltipTrigger>{children}</TooltipTrigger>
        <TooltipContent
          sideOffset={sideOffset}
          side={side}
          className='text-xs max-w-[220px] break-words'
        >
          {description}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default Hint;
