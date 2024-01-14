import { auth } from '@clerk/nextjs';
import { NextApiRequest } from 'next';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET(
  req: NextApiRequest,
  { params: { cardId } }: { params: { cardId: string } }
) {
  try {
    const { orgId, userId } = auth();

    if (!userId || !orgId) {
      return NextResponse.json(
        {
          message: 'Unauthorized',
        },
        { status: 401 }
      );
    }

    const card = await prisma.card.findUnique({
      where: {
        id: cardId,
        list: {
          board: {
            orgId,
          },
        },
      },
      include: {
        list: {
          select: {
            title: true,
          },
        },
      },
    });

    return NextResponse.json(card);
  } catch (error) {
    return NextResponse.json(
      {
        message: 'Internal Error',
      },
      { status: 500 }
    );
  }
}
