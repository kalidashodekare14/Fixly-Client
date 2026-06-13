'use client';

import { useSession, signOut } from 'next-auth/react';
import { FaBars } from 'react-icons/fa';
import { FiSearch, FiBell } from 'react-icons/fi';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';
import { LogOutIcon, SettingsIcon } from 'lucide-react';
import { useGetNavbarProfileQuery } from '@/state/services/public/publicService';

interface IParams {
  handleToggle: () => void;
  handleSidebarSort: () => void;
}

const getInitials = (name: string) =>
  name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();

export default function DashboardHeader({
  headerProps,
}: {
  headerProps: IParams;
}) {
  const { data: session, status } = useSession();
  const { data: meInfo, isLoading: meInfoLoading } = useGetNavbarProfileQuery(
    undefined,
    {
      skip: status !== 'authenticated',
    }
  );

  return (
    <div className="w-full flex items-center justify-between px-6 py-4 bg-white border-b">
      {/* Left: Greeting */}
      <div className="flex items-center gap-10">
        <div
          onClick={headerProps.handleSidebarSort}
          className="hidden lg:flex text-xl cursor-pointer"
        >
          <FaBars />
        </div>

        <div
          onClick={headerProps.handleToggle}
          className="lg:hidden text-xl cursor-pointer"
        >
          <FaBars />
        </div>
        <div>
          <h1 className="text-lg font-semibold text-gray-800">
            Welcome back &#x1F44B;
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
        <DropdownMenu>
          <DropdownMenuTrigger>
            {meInfoLoading ? (
              <Skeleton className="size-8 rounded-full" />
            ) : (
              <Avatar className="cursor-pointer flex justify-center items-center bg-primary-light">
                {meInfo?.image ? (
                  <AvatarImage src={meInfo.image} />
                ) : (
                  <AvatarFallback>
                    {getInitials(meInfo?.name || session?.user?.name || 'N/A')}
                  </AvatarFallback>
                )}
              </Avatar>
            )}
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <SettingsIcon />
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => signOut()}
              variant="destructive"
            >
              <LogOutIcon />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
