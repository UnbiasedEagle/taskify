'use server';

import { prisma } from '@/lib/db';
import { revalidatePath } from 'next/cache';

export const deleteBoard = async (boardId: string) => {
  await prisma.board.delete({
    where: {
      id: boardId,
    },
  });

  revalidatePath('/organization/org_2aZtEM7iZxvhh02NCJ74z8Sxh9Y');
};
