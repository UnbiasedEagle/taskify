'use client';

import { ListWithCards } from '@/types';
import ListHeader from './list-header';
import { ElementRef, useRef, useState } from 'react';
import CardForm from './card-form';
import { cn } from '@/lib/utils';
import CardItem from './card-item';
import { Draggable, Droppable } from '@hello-pangea/dnd';

interface Props {
  index: number;
  data: ListWithCards;
}

const ListItem = ({ index, data }: Props) => {
  const textAreaRef = useRef<ElementRef<'textarea'>>(null);

  const [isEditing, setIsEditing] = useState(false);

  const disableEditing = () => {
    setIsEditing(false);
  };

  const enableEditing = () => {
    setIsEditing(true);

    setTimeout(() => {
      textAreaRef.current?.focus();
    });
  };

  return (
    <Draggable draggableId={data.id} index={index}>
      {(provided) => {
        return (
          <li
            {...provided.draggableProps}
            ref={provided.innerRef}
            className='shrink-0 h-full w-[272px] select-none'
          >
            <div
              {...provided.dragHandleProps}
              className='w-full rounded-md bg-[#f1f2f4] shadow-md pb-2'
            >
              <ListHeader onAddCard={enableEditing} data={data} />
              <Droppable droppableId={data.id} type='card'>
                {(provided) => {
                  return (
                    <ol
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className={cn(
                        'mx-1 px-1 py-0.5 flex flex-col gap-y-2',
                        data.cards.length > 0 && 'mt-2'
                      )}
                    >
                      {data.cards.map((card, index) => {
                        return (
                          <CardItem data={card} key={card.id} index={index} />
                        );
                      })}
                      {provided.placeholder}
                    </ol>
                  );
                }}
              </Droppable>

              <CardForm
                ref={textAreaRef}
                isEditing={isEditing}
                enableEditing={enableEditing}
                disableEditing={disableEditing}
                listId={data.id}
              />
            </div>
          </li>
        );
      }}
    </Draggable>
  );
};

export default ListItem;
