import { prisma } from '@/lib/db';
import { auth } from '@clerk/nextjs';
import { ENTITY_TYPE } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  req: NextRequest,
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
