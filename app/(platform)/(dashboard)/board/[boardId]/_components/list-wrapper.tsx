import { PropsWithChildren } from 'react';

const ListWrapper = ({ children }: PropsWithChildren) => {
  return (
    <li className='flex-shrink-0 w-[272px] h-full select-none'>{children}</li>
  );
};

export default ListWrapper;
