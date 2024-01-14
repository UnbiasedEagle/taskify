import { auth } from '@clerk/nextjs';
import { prisma } from '@/lib/db';
import { MAX_FREE_BOARDS } from '@/constants/boards';

export const incrementAvailableCount = async () => {
  const { orgId } = auth();

  if (!orgId) throw new Error('Unauthorized');

  const orgLimit = await prisma.orgLimit.findUnique({
    where: {
      orgId,
    },
  });

  if (orgLimit) {
    await prisma.orgLimit.update({
      where: {
        orgId,
      },
      data: {
        count: orgLimit.count + 1,
      },
    });
  } else {
    await prisma.orgLimit.create({
      data: {
        orgId,
        count: 1,
      },
    });
  }
};

export const decrementAvailableCount = async () => {
  const { orgId } = auth();

  if (!orgId) throw new Error('Unauthorized');

  const orgLimit = await prisma.orgLimit.findUnique({
    where: {
      orgId,
    },
  });

  if (orgLimit) {
    await prisma.orgLimit.update({
      where: {
        orgId,
      },
      data: {
        count: orgLimit.count > 0 ? orgLimit.count - 1 : 0,
      },
    });
  } else {
    await prisma.orgLimit.create({
      data: {
        orgId,
        count: 1,
      },
    });
  }
};

export const hasAvailableCount = async () => {
  const { orgId } = auth();

  if (!orgId) throw new Error('Unauthorized');

  const orglimit = await prisma.orgLimit.findUnique({
    where: { orgId },
  });

  if (!orglimit || orglimit.count < MAX_FREE_BOARDS) return true;

  return false;
};

export const getAvailableCount = async () => {
  const { orgId } = auth();

  if (!orgId) return 0;

  const orglimit = await prisma.orgLimit.findUnique({
    where: { orgId },
  });

  if (!orglimit) return 0;

  return orglimit.count;
};
