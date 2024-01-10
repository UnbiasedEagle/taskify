import { prisma } from '@/lib/db';
import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import ListContainer from './_components/list-container';

interface Props {
  params: {
    boardId: string;
  };
}

const BoardIdPage = async ({ params: { boardId } }: Props) => {
  const { orgId } = auth();

  if (!orgId) return redirect('/select-org');

  const lists = await prisma.list.findMany({
    where: {
      boardId,
      board: {
        orgId,
      },
    },
    include: {
      cards: {
        orderBy: {
          order: 'asc',
        },
      },
    },
    orderBy: {
      order: 'asc',
    },
  });

  return (
    <div className='p-4 h-full overflow-x-auto'>
      <ListContainer boardId={boardId} data={lists} />
    </div>
  );
};

export default BoardIdPage;
