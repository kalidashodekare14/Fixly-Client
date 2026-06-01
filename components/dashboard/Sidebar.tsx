'use client';

import { sidebarConfig, Role } from '@/lib/sidebar';
import { HomeIcon } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaTools } from 'react-icons/fa';
import { IoMdClose } from 'react-icons/io';
import { Card, CardContent } from '../ui/card';

type SessionStatus = 'loading' | 'authenticated' | 'unauthenticated';

interface ISidebar {
  toggle: boolean;
  sidebarSort: boolean;
  role: Role;
  authStatus: SessionStatus;
  handleToggle: () => void;
  handleSidebarSort: () => void;
}

const Sidebar = ({ sidebarProps }: { sidebarProps: ISidebar }) => {
  const menus = sidebarConfig[sidebarProps.role];
  const pathname = usePathname();

  return (
    <div
      className={`flex flex-col justify-between border h-screen p-3 transition-all duration-300 bg-white absolute lg:static 
      ${sidebarProps.sidebarSort ? 'w-64' : 'w-16'}
      ${sidebarProps.toggle ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}
    >
      <div>
        {/* Responsive toggle */}
        <div
          onClick={sidebarProps.handleToggle}
          className="lg:hidden flex justify-end items-end cursor-pointer text-xl"
        >
          <IoMdClose />
        </div>
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 shrink-0 flex justify-center items-center bg-[#E91E63] text-white text-2xl rounded-xl">
            <FaTools className="" />
          </div>

          {sidebarProps.sidebarSort && (
            <div>
              <h2 className="font-semibold text-xl">Fixly</h2>
              <p className="text-xs text-gray-500 whitespace-nowrap">
                Service Marketplace
              </p>
            </div>
          )}
        </div>

        {/* Menu */}
        <div className="mt-10 space-y-2">
          {sidebarProps.authStatus === 'loading' ? (
            <div className="space-y-2">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="space-y-3 flex  gap-2">
                    <div className="h-6 w-6 bg-gray-200 rounded"></div>
                    <div className="h-6 w-3/4 bg-gray-200 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            menus?.map((menu: any) => {
              const isActive = pathname === menu.href;

              return (
                <Link key={menu.href} href={menu.href}>
                  <div
                    className={`flex items-center gap-3 p-2 cursor-pointer rounded-xl transition
                ${
                  isActive
                    ? 'bg-[#E91E63] text-white'
                    : 'text-gray-600 hover:bg-[#FCE4EC]'
                }`}
                  >
                    {/* Icon always visible */}
                    <span className="text-lg">{menu.icon}</span>

                    {/* Label only when expanded */}
                    {sidebarProps.sidebarSort && (
                      <p className="text-sm whitespace-nowrap">{menu.label}</p>
                    )}
                  </div>
                </Link>
              );
            })
          )}
        </div>
      </div>
      <Link href={'/'}>
        <div
          className={`flex items-center gap-3 p-2 cursor-pointer rounded-xl transition text-gray-600 hover:bg-[#FCE4EC] border border-[#f8cada]`}
        >
          <HomeIcon />
          <p className="text-sm whitespace-nowrap">Home</p>
        </div>
      </Link>
    </div>
  );
};

export default Sidebar;
