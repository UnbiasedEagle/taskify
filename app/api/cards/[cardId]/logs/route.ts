import { auth } from '@clerk/nextjs';
import { NextApiRequest } from 'next';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { ENTITY_TYPE } from '@prisma/client';

export async function GET(
  req: NextApiRequest,
  { params }: { params: { cardId: string } }
) {
  try {
    const { userId, orgId } = auth();

    if (!userId || !orgId) {
      return NextResponse.json(
        {
          message: 'Unauthorized',
        },
        { status: 401 }
      );
    }

    const auditLogs = await prisma.auditLog.findMany({
      where: {
        entityId: params.cardId,
        entityType: ENTITY_TYPE.CARD,
        orgId,
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 3,
    });

    return NextResponse.json(auditLogs);
  } catch (error) {
    return NextResponse.json(
      {
        message: 'Internal Error',
      },
      { status: 500 }
    );
  }
}
