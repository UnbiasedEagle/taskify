'use server';

import { auth } from '@clerk/nextjs';
import { InputType, ReturnType } from './types';
import { prisma } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { createSafeAction } from '@/lib/create-safe-action';
import { CreateListSchema } from './schema';

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    return {
      error: 'Unauthorized',
    };
  }

  const { title, boardId } = data;

  let list;

  try {
    const board = await prisma.board.findUnique({
      where: {
        id: boardId,
        orgId,
      },
    });

    if (!board) {
      return {
        error: 'Board not found',
      };
    }

    const lastList = await prisma.list.findFirst({
      where: {
        boardId,
      },
      orderBy: {
        order: 'desc',
      },
      select: {
        order: true,
      },
    });

    list = await prisma.list.create({
      data: {
        title,
        boardId,
        order: (lastList?.order || 0) + 1,
      },
    });
  } catch (error) {
    return {
      error: 'Failed to create list.',
    };
  }

  revalidatePath(`/board/${boardId}`);

  return {
    data: list,
  };
};

export const createList = createSafeAction(CreateListSchema, handler);