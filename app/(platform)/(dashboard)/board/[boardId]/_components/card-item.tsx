'use client';

import { Card } from '@prisma/client';

interface Props {
  data: Card;
  index: number;
}

const CardItem = ({ data, index }: Props) => {
  return (
    <div
      role='button'
      className='truncate border-2 border-transparent hover:border-black px-2 py-3 text-sm bg-white shadow-sm rounded-md'
    >
      {data.title}
    </div>
  );
};

export default CardItem;
