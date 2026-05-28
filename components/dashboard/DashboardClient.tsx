'use client';

import { useState } from 'react';
import Sidebar from './Sidebar';
import DashboardHeader from './Header';
import { Role } from '@/lib/sidebar';

const DashboardClient = ({
  role,
  children,
}: {
  role: Role;
  children: React.ReactNode;
}) => {
  const [toggle, setToggle] = useState<boolean>(false);

  const handleToggle = () => {
    setToggle((prev) => !prev);
  };

  return (
    <div className="flex relative">
      <Sidebar handleToggle={handleToggle} toggle={toggle} role={role} />

      <div className="flex-1">
        <DashboardHeader handleToggle={handleToggle} />
        {children}
      </div>
    </div>
  );
};

export default DashboardClient;
