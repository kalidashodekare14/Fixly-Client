import DashboardClient from '@/components/dashboard/DashboardClient';

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  return <DashboardClient>{children}</DashboardClient>;
};

export default DashboardLayout;
