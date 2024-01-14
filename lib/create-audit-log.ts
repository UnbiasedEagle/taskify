import { auth, currentUser } from '@clerk/nextjs';
import { ACTION, ENTITY_TYPE } from '@prisma/client';
import { prisma } from './db';

interface Props {
  entityId: string;
  entityType: ENTITY_TYPE;
  entityTitle: string;
  action: ACTION;
}

export const createAuditLog = async (props: Props) => {
  try {
    const { orgId } = auth();
    const user = await currentUser();

    if (!user || !orgId) {
      throw new Error('User not found!');
    }

    const { entityId, entityTitle, entityType, action } = props;

    await prisma.auditLog.create({
      data: {
        entityId,
        entityType,
        orgId,
        userName: `${user?.firstName} ${user?.lastName}`,
        userImage: user?.imageUrl,
        entityTitle,
        action,
        userId: user.id,
      },
    });
  } catch (error) {
    console.log('[AUDIT_LOG_ERROR]', error);
  }
};
