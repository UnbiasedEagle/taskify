'use client';

import ActivityItem from '@/components/activity-item';
import { Skeleton } from '@/components/ui/skeleton';
import { AuditLog } from '@prisma/client';
import { ActivityIcon } from 'lucide-react';

interface Props {
  items: AuditLog[];
}

const Activity = ({ items }: Props) => {
  return (
    <div className='flex items-start gap-x-3 w-full'>
      <ActivityIcon className='h-5 w-5 mt-0.5 text-neutral-700' />
      <div className='w-full'>
        <p className='font-semibold text-neutral-700 mb-2'>Activity</p>
        <ol className='mt-2 space-y-4'>
          {items.map((item) => {
            return <ActivityItem data={item} key={item.id} />;
          })}
        </ol>
      </div>
    </div>
  );
};

Activity.Skeleton = function ActivitySkeleton() {
  return (
    <div className='flex items-start gap-x-3 w-full'>
      <Skeleton className='h-6 w-6 bg-neutral-200' />
      <div className='w-full'>
        <Skeleton className='h-6 w-24 mb-2 bg-neutral-200' />
        <Skeleton className='h-10 w-full bg-neutral-200' />
      </div>
    </div>
  );
};

export default Activity;
