'use client';

import { Card } from '@prisma/client';
import { Draggable } from '@hello-pangea/dnd';
import { useCardModalStore } from '@/hooks/use-card-modal';

interface Props {
  data: Card;
  index: number;
}

const CardItem = ({ data, index }: Props) => {
  const { onOpen } = useCardModalStore();

  return (
    <Draggable draggableId={data.id} index={index}>
      {(provided) => {
        return (
          <div
            onClick={() => onOpen(data.id)}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            role='button'
            className='truncate border-2 border-transparent hover:border-black px-2 py-3 text-sm bg-white shadow-sm rounded-md'
          >
            {data.title}
          </div>
        );
      }}
    </Draggable>
  );
};

export default CardItem;
