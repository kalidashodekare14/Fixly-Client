'use client';

import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status !== 'authenticated') return;

    switch (session.user.role) {
      case 'user':
        router.replace('/dashboard/user');
        break;

      case 'provider':
        router.replace('/dashboard/provider');
        break;

      case 'admin':
        router.replace('/dashboard/admin');
        break;
    }
  }, [session, status, router]);

  return <p>Loading...</p>;
}
