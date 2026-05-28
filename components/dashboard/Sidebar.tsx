'use client';

import { sidebarConfig, Role } from '@/lib/sidebar';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaTools } from 'react-icons/fa';
import { IoMdClose } from 'react-icons/io';

interface ISidebar {
  toggle: boolean;
  role: Role;
  handleToggle: () => void;
}

const Sidebar = ({ handleToggle, toggle, role }: ISidebar) => {
  const menus = sidebarConfig[role];
  const pathname = usePathname();

  return (
    <div
      className={`border h-screen p-3 transition-all duration-300 bg-white absolute lg:relative
      ${toggle ? 'w-64' : 'w-16'}`}
    >
      <div
        onClick={handleToggle}
        className="flex justify-end items-end cursor-pointer text-xl"
      >
        <IoMdClose />
      </div>
      {/* Header */}
      <div className="flex items-center gap-3">
        <FaTools className="bg-[#E91E63] text-4xl p-2 text-white rounded-xl" />

        {toggle && (
          <div>
            <h2 className="font-semibold text-xl">Fixly</h2>
            <p className="text-xs text-gray-500">Service Marketplace</p>
          </div>
        )}
      </div>

      {/* Menu */}
      <div className="mt-10 space-y-2">
        {menus?.map((menu: any) => {
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
                {toggle && <p className="text-sm">{menu.label}</p>}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
