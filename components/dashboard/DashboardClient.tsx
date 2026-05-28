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
  const [sidebarSort, setSidebarSort] = useState<boolean>(true);
  const [toggle, setToggle] = useState<boolean>(false);

  const handleSidebarSort = () => {
    setSidebarSort((prev) => !prev);
  };

  const handleToggle = () => {
    setToggle((prev) => !prev);
  };

  return (
    <div className="flex relative">
      <Sidebar
        sidebarProps={{
          role,
          sidebarSort,
          toggle,
          handleToggle,
          handleSidebarSort,
        }}
      />

      <div className="flex-1">
        <DashboardHeader
          headerProps={{
            handleToggle,
            handleSidebarSort,
          }}
        />
        {children}
      </div>
    </div>
  );
};

export default DashboardClient;
