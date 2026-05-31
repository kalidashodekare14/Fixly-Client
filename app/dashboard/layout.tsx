import { cookies } from 'next/headers';
import DashboardClient from '@/components/dashboard/DashboardClient';

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const cookieStore = await cookies();
  // const role = cookieStore.get('role')?.value as 'user' | 'provider' | 'admin';
  const role = 'user';
  console.log('checking role', role);

  return <DashboardClient role={role}>{children}</DashboardClient>;
};

export default DashboardLayout;
