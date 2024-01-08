import { auth } from '@clerk/nextjs';
import { notFound, redirect } from 'next/navigation';
import { PropsWithChildren } from 'react';
import { prisma } from '@/lib/db';
import BoardNavbar from './_components/board-navbar';

interface Props {
  params: {
    boardId: string;
  };
}

export async function generateMetadata({ params: { boardId } }: Props) {
  const { orgId } = auth();

  if (!orgId) {
    return {
      title: 'Board',
    };
  }

  const board = await prisma.board.findUnique({
    where: {
      id: boardId,
      orgId,
    },
  });

  return {
    title: board?.title || 'Board',
  };
}

const BoardIdLayout = async ({
  children,
  params: { boardId },
}: PropsWithChildren<Props>) => {
  const { orgId } = auth();

  if (!orgId) return redirect('/select-org');

  const board = await prisma.board.findUnique({
    where: {
      id: boardId,
      orgId,
    },
  });

  if (!board) return notFound();

  return (
    <div
      className='relative h-full bg-no-repeat bg-cover bg-center'
      style={{ backgroundImage: `url(${board.imageFullUrl})` }}
    >
      <BoardNavbar data={board} />
      <div className='absolute inset-0 bg-black/10'></div>
      <main className='relative pt-28 h-full'>{children}</main>
    </div>
  );
};

export default BoardIdLayout;
