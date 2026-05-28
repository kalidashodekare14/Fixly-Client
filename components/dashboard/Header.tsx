'use client';

import { useSession } from 'next-auth/react';
import { FaBars } from 'react-icons/fa';
import { FiSearch, FiBell } from 'react-icons/fi';

interface IParams {
  handleToggle: () => void;
}

export default function DashboardHeader({ handleToggle }: IParams) {
  const { data: session } = useSession();

  return (
    <div className="w-full flex items-center justify-between px-6 py-4 bg-white border-b">
      {/* Left: Greeting */}
      <div className="flex items-center gap-10">
        <div onClick={handleToggle} className="text-xl cursor-pointer">
          <FaBars />
        </div>
        <div>
          <h1 className="text-lg font-semibold text-gray-800">
            Welcome back 👋
          </h1>
          <p className="text-sm text-gray-500">
            {session?.user?.name || 'User'}
          </p>
        </div>
      </div>

      {/* Center: Search */}
      <div className="hidden md:flex items-center bg-gray-100 px-3 py-2 rounded-lg w-1/3">
        <FiSearch className="text-gray-500" />
        <input
          type="text"
          placeholder="Search..."
          className="bg-transparent outline-none px-2 w-full text-sm"
        />
      </div>

      {/* Right: Icons */}
      <div className="flex items-center gap-4">
        {/* Notification */}
        <div className="relative cursor-pointer">
          <FiBell className="text-xl text-gray-600" />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-pink-500 rounded-full"></span>
        </div>

        {/* Profile */}
        <div className="flex items-center gap-2 cursor-pointer">
          <img
            src={session?.user?.image || '/avatar.png'}
            className="w-8 h-8 rounded-full"
            alt="profile"
          />
          <div className="hidden md:block">
            <p className="text-sm font-medium text-gray-700">
              {session?.user?.name}
            </p>
            <p className="text-xs text-pink-500 capitalize">
              {session?.user?.role}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
