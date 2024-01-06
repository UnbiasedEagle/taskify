'use client';

import { Accordion } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useOrganization, useOrganizationList } from '@clerk/nextjs';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import { useLocalStorage } from 'usehooks-ts';
import NavItem, { Organization } from './nav-item';

interface Props {
  storageKey?: string;
}

const Sidebar = ({ storageKey = 't-sidebar-state' }: Props) => {
  const [expanded, setExpanded] = useLocalStorage<Record<string, any>>(
    storageKey,
    {}
  );

  const { organization: activeOrganization, isLoaded: isOrgLoaded } =
    useOrganization();

  const { userMemberships, isLoaded: isOrgListLoaded } = useOrganizationList({
    userMemberships: {
      infinite: true,
    },
  });

  const defaultAccordionValue: string[] = Object.keys(expanded).reduce(
    (acc: string[], key: string) => {
      if (expanded[key]) {
        acc.push(key);
      }

      return acc;
    },
    []
  );

  const onExpand = (id: string) => {
    setExpanded((curr) => ({
      ...curr,
      [id]: !expanded[id],
    }));
  };

  if (!isOrgLoaded || !isOrgListLoaded || userMemberships.isLoading) {
    return (
      <>
        <Skeleton />
      </>
    );
  }

  return (
    <>
      <div className='font-medium text-xs flex items-center mb-1'>
        <span className='pl-4'>Workspaces</span>
        <Button
          asChild
          type='button'
          size='icon'
          className='ml-auto'
          variant='ghost'
        >
          <Link href='/select-org'>
            <Plus className='h-4 w-4' />
          </Link>
        </Button>
      </div>
      <Accordion
        type='multiple'
        defaultValue={defaultAccordionValue}
        className='space-y-2'
      >
        {userMemberships.data.map(({ organization }) => {
          return (
            <NavItem
              key={organization.id}
              isActive={organization.id === activeOrganization?.id}
              isExpanded={expanded[organization.id]}
              organization={organization as Organization}
              onExpand={onExpand}
            />
          );
        })}
      </Accordion>
    </>
  );
};

export default Sidebar;
