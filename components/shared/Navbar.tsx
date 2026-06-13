'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FaBars, FaTools } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Skeleton } from '@/components/ui/skeleton';
import {
  CreditCardIcon,
  LogOutIcon,
  SettingsIcon,
  UserIcon,
  LayoutDashboardIcon,
} from 'lucide-react';
import { useGetNavbarProfileQuery } from '@/state/services/public/publicService';

//---------------Navigation Data-----------------
const NAV_ITEMS = [
  { id: 1, name: 'Home', path: '/' },
  { id: 3, name: 'About Us', path: '/about' },
  { id: 5, name: 'Providers', path: '/providers' },
  { id: 6, name: 'Contact', path: '/contact' },
];

// ----------------- Navbar Component------------------
const Navbar = () => {
  // hooks
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isSticky, setIsSticky] = useState<boolean>(false);
  const pathname = usePathname();
  //
  const { data: session, status } = useSession();
  const { data: meInfo, isLoading: meInfoLoading } = useGetNavbarProfileQuery(
    undefined,
    {
      skip: status !== 'authenticated',
    }
  );

  // Taggle menu
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Sticky on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY >= 150);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const matchPath =
    pathname.startsWith('/signup') ||
    pathname.startsWith('/signin') ||
    pathname.startsWith('/dashboard');

  const getInitials = (name: string) =>
    name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();

  return (
    <header
      className={`${isSticky ? 'sticky top-0 z-50 bg-[#ffffffb9] shadow-xl backdrop-blur-lg transition-all duration-300 opacity-100' : 'bg-white'}`}
    >
      <nav
        className={`${matchPath && 'hidden'} z-50 2xl:w-350 xl:w-310 lg:w-260 w-full  m-auto px-3 lg:px-0 flex justify-between py-3 font-roboto font-200`}
      >
        {/* ---------- Left: Logo + Desktop Nav ------------ */}
        <div className="flex items-center gap-20">
          {/* Logo */}
          <Link href={'/'} className="flex items-center gap-2">
            <div className="w-10 h-10 shrink-0 flex justify-center items-center bg-primary text-white text-2xl rounded-xl">
              <FaTools className="" />
            </div>
            <h2 className="font-semibold text-xl">Fixly</h2>
          </Link>
          {/* Desktop Menu */}
          <ul className="hidden lg:flex items-center gap-5 text-[16px] font-normal">
            {NAV_ITEMS.map((navi) => (
              <Link
                className={`${pathname == navi.path && 'text-primary border-b-2 border-primary'} hover:text-primary font-normal`}
                key={navi.id}
                href={navi.path}
              >
                <li className="font-rubik">{navi.name}</li>
              </Link>
            ))}
          </ul>
        </div>

        {/* --------- Right: Buttons + Mobile Icon ------------- */}
        <div className="flex items-center gap-5">
          {meInfoLoading ? (
            <Skeleton className="h-12 w-12 rounded-full" />
          ) : session && meInfo ? (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar
                  size="lg"
                  className={
                    'cursor-pointer flex justify-center items-center bg-primary-light'
                  }
                >
                  {meInfo?.image ? (
                    <AvatarImage src={meInfo?.image} />
                  ) : (
                    getInitials(meInfo?.name || 'N/A')
                  )}
                  {/* <AvatarFallback>CN</AvatarFallback> */}
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>
                  <UserIcon />
                  Profile
                </DropdownMenuItem>
                {meInfo?.role && meInfo?.role === 'admin' && (
                  <Link href={'/dashboard/admin'}>
                    <DropdownMenuItem>
                      <LayoutDashboardIcon />
                      Dashboard
                    </DropdownMenuItem>
                  </Link>
                )}
                {meInfo?.role && meInfo?.role === 'provider' && (
                  <Link href={'/dashboard/provider'}>
                    <DropdownMenuItem>
                      <LayoutDashboardIcon />
                      Dashboard
                    </DropdownMenuItem>
                  </Link>
                )}
                {meInfo?.role && meInfo?.role === 'user' && (
                  <Link href={'/dashboard/user'}>
                    <DropdownMenuItem>
                      <LayoutDashboardIcon />
                      Dashboard
                    </DropdownMenuItem>
                  </Link>
                )}
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
          ) : (
            <div className="space-x-3">
              <Link href={'/signin'}>
                <button className="btn lg:w-40 lg:h-10  w-20 h-10 border border-primary text-black lg:rounded-xl rounded-[5px] cursor-pointer">
                  Login
                </button>
              </Link>
              <Link href={'/signup'}>
                <button className="btn lg:w-40 lg:h-10  w-30 h-10 bg-primary border-0 text-white lg:rounded-xl rounded-[5px] cursor-pointer">
                  Join
                </button>
              </Link>
            </div>
          )}

          {/* Mobile Toggle Icon */}
          <button
            onClick={toggleMenu}
            className="relative z-70 lg:hidden text-[19px]"
          >
            {isOpen ? <IoClose /> : <FaBars />}
          </button>
        </div>

        {/* -------- Mobile Menu Overlay + Panel --------- */}
        {/* Backdrop */}
        {isOpen && (
          <div
            onClick={toggleMenu}
            className="fixed inset-0 z-55 bg-black/20 backdrop-blur-sm lg:hidden"
          />
        )}

        {/* Slide Panel */}
        <ul
          className={`fixed left-0 top-0 z-60 flex h-dvh w-70 flex-col gap-5 overflow-y-auto border-r border-gray-100 bg-white/95 p-6 text-base font-light text-gray-900 shadow-xl backdrop-blur-xl transition-all duration-300 lg:hidden ${
            isOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          {/* Close Button */}
          <div className="flex justify-end">
            <button
              onClick={toggleMenu}
              className="flex size-9 items-center justify-center rounded-lg bg-gray-100 text-xl text-gray-500 transition-colors hover:bg-gray-200"
            >
              <IoClose />
            </button>
          </div>

          {/* Mobile Links */}
          <div className="flex flex-col gap-1.5">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.id}
                href={item.path}
                onClick={toggleMenu}
                className={`rounded-xl px-4 py-3 text-base transition-all ${
                  pathname === item.path
                    ? 'bg-primary-light/60 font-semibold text-primary'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
