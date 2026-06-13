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
import { Button } from '../ui/button';
import {
  CreditCardIcon,
  LogOutIcon,
  SettingsIcon,
  UserIcon,
  LayoutDashboardIcon,
} from 'lucide-react';

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
  const { data: session } = useSession();
  console.log('checking session', session);
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
  console.log('chack', matchPath);

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
          {session ? (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar size="lg" className={'cursor-pointer'}>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>
                  <UserIcon />
                  Profile
                </DropdownMenuItem>
                {session.user?.role === 'admin' && (
                  <Link href={'/dashboard/admin'}>
                    <DropdownMenuItem>
                      <LayoutDashboardIcon />
                      Dashboard
                    </DropdownMenuItem>
                  </Link>
                )}
                {session.user?.role === 'provider' && (
                  <Link href={'/dashboard/provider'}>
                    <DropdownMenuItem>
                      <LayoutDashboardIcon />
                      Dashboard
                    </DropdownMenuItem>
                  </Link>
                )}
                {session.user?.role === 'user' && (
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
              {/* Buttons */}
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
          {/* Avatar Dropdown */}

          {/* Mobile Taggle Icon */}
          <button onClick={toggleMenu} className="lg:hidden text-[19px]">
            {isOpen ? <IoClose className="hidden" /> : <FaBars />}
          </button>
        </div>

        {/* -------- Mobile Menu --------- */}
        <ul
          className={`z-50 absolute left-0 p-5 lg:hidden  bg-primary text-white w-[80%] h-full flex flex-col  gap-5 text-[19px] font-light translate-y-0 duration-300  ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
        >
          {/* Close Button */}
          <div className="flex justify-end items-end text-4xl cursor-pointer">
            <IoClose onClick={toggleMenu} />
          </div>

          {/* MObile Links */}
          {NAV_ITEMS.map((item) => (
            <li key={item.id}>
              <Link
                href={item.path}
                className={`block hover:text-[#307bc4] 
                  ${pathname == item.path && 'text-white border-b-2 border-black'}`}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
