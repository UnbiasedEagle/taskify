import FormPopover from '@/components/form/form-popover';
import Hint from '@/components/hint';
import { HelpCircle, User2 } from 'lucide-react';
import { prisma } from '@/lib/db';
import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { Skeleton } from '@/components/ui/skeleton';

const BoardList = async () => {
  const { orgId } = auth();

  if (!orgId) return redirect('/select-org');

  const boards = await prisma.board.findMany({
    where: {
      orgId,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return (
    <div className='space-y-4'>
      <div className='flex items-center font-semibold text-lg text-neutral-700'>
        <User2 className='h-6 w-6 mr-2' />
        <span>Your Boards</span>
      </div>
      <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4'>
        {boards.map((board) => {
          return (
            <Link
              style={{ backgroundImage: `url(${board.imageThumbUrl})` }}
              className='group relative aspect-video bg-no-repeat bg-center bg-cover bg-sky-700 rounded-sm w-full h-full p-2 overflow-hidden'
              href={`/board/${board.id}`}
              key={board.id}
            >
              <div className='absolute inset-0 bg-black/30 group-hover:bg-black/40 transition'></div>
              <p className='text-white relative font-semibold'>{board.title}</p>
            </Link>
          );
        })}
        <FormPopover sideOffset={10} side='right'>
          <div
            role='button'
            className='aspect-video relative h-full w-full bg-muted rounded-sm flex flex-col gap-y-1 justify-center transition items-center hover:opacity-75'
          >
            <p className='text-sm'>Create new board</p>
            <span className='text-xs'>5 remaining</span>
            <Hint
              sideOffset={40}
              description={`
                Free Workspaces can have up to 5 open boards. For unlimited boards upgrade this workspace.
              `}
            >
              <HelpCircle className='absolute bottom-2 right-2 h-[14px] w-[14px]' />
            </Hint>
          </div>
        </FormPopover>
      </div>
    </div>
  );
};

BoardList.Skeleton = function BoardListSkeleton() {
  return (
    <div className='grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 gap-4'>
      {Array.from({ length: 8 }).map((_, idx) => {
        return (
          <Skeleton key={idx} className='aspect-video h-full w-full p-2' />
        );
      })}
    </div>
  );
};

export default BoardList;
