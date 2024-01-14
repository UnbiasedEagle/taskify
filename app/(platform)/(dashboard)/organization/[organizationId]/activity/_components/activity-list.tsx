import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/db';
import ActivityItem from '@/components/activity-item';
import { Skeleton } from '@/components/ui/skeleton';

const ActivityList = async () => {
  const { orgId } = auth();

  if (!orgId) {
    return redirect('/select-org');
  }

  const auditLogs = await prisma.auditLog.findMany({
    where: {
      orgId,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return (
    <ol className='space-y-4 mt-4'>
      {auditLogs.length === 0 && (
        <p className='text-xs text-center text-muted-foreground'>
          No activity found inside this organization
        </p>
      )}
      {auditLogs.map((log) => {
        return <ActivityItem key={log.id} data={log} />;
      })}
    </ol>
  );
};

ActivityList.Skeleton = function ActivityListSkeleton() {
  return (
    <ol className='space-y-4 mt-2'>
      <Skeleton className='w-[80%] h-14' />
      <Skeleton className='w-[50%] h-14' />
      <Skeleton className='w-[70%] h-14' />
      <Skeleton className='w-[80%] h-14' />
      <Skeleton className='w-[75%] h-14' />
    </ol>
  );
};

export default ActivityList;
