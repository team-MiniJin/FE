'use client';

import { PlanEditor } from '@/widgets';
import { Loading, useAuth } from '@/shared';
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
      <PlanEditor mode="create" />
    </div>
  );
}
