'use client';

import { Loading, useAuth } from '@/shared';
import { MyPlans, UpcomingPlans, CreatingPlanButton } from '@/widgets';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Page() {
  const router = useRouter();
  const { isLoading: isAuthLoading, jwt } = useAuth();

  useEffect(() => {
    if (!isAuthLoading && !jwt) {
      router.push('/login');
    }
  }, [isAuthLoading, jwt, router]);

  if (isAuthLoading) {
    return <Loading />;
  }

  if (!jwt) {
    return null;
  }
  return (
    <div>
      <div>
        <UpcomingPlans />
      </div>
      <div className="my-10 h-[1px] w-full border-t" />
      <div className="relative">
        <div className="absolute -top-2 right-0 ">
          <CreatingPlanButton />
        </div>
        <MyPlans />
      </div>
    </div>
  );
}
