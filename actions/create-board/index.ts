'use server';

import { createSafeAction } from '@/lib/create-safe-action';
import { prisma } from '@/lib/db';
import { auth } from '@clerk/nextjs';
import { revalidatePath } from 'next/cache';
import { CreateBoardSchema } from './schema';
import { InputType, ReturnType } from './types';

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    return {
      error: 'Unauthorized',
    };
  }

  const { title, image } = data;

  const [imageId, imageThumbUrl, imageFullUrl, imageLinkHTML, imageUserName] =
    image.split('|');

  if (
    !imageId ||
    !imageThumbUrl ||
    !imageFullUrl ||
    !imageLinkHTML ||
    !imageUserName
  ) {
    return {
      error: 'Missing fields. Failed to create board',
    };
  }

  let board;

  try {
    board = await prisma.board.create({
      data: {
        title,
        orgId,
        imageThumbUrl,
        imageFullUrl,
        imageId,
        imageLinkHTML,
        imageUserName,
      },
    });
  } catch (error) {
    return {
      error: 'Failed to create.',
    };
  }

  revalidatePath(`/board/${board.id}`);

  return {
    data: board,
  };
};

export const createBoard = createSafeAction(CreateBoardSchema, handler);
