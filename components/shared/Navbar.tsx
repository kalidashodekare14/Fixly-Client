"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { FaBars } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

//---------------Navigation Data-----------------
const NAV_ITEMS = [
  { id: 1, name: "Home", path: "/" },
  { id: 3, name: "About Us", path: "/about" },
  { id: 5, name: "Providers", path: "/providers" },
  { id: 6, name: "Contact", path: "/contact" },
];

// ----------------- Navbar Component------------------
const Navbar = () => {
  // hooks
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isSticky, setIsSticky] = useState<boolean>(false);
  const pathname = usePathname();

  // Taggle menu
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Sticky on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY >= 150);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`${isSticky ? "sticky top-0 z-50 bg-[#ffffffb9] shadow-xl backdrop-blur-lg transition-all duration-300 opacity-100" : "bg-white"}`}
    >
      <nav
        className={` z-50 2xl:w-350 xl:w-310 lg:w-260 w-full  m-auto px-3 lg:px-0 flex justify-between py-3 font-roboto font-200`}
      >
        {/* ---------- Left: Logo + Desktop Nav ------------ */}
        <div className="flex items-center gap-20">
          {/* Logo */}
          <h1 className="text-3xl">Fixly</h1>

          {/* Desktop Menu */}
          <ul className="hidden lg:flex items-center gap-5 text-[16px] font-normal">
            {NAV_ITEMS.map((navi) => (
              <Link
                className={`${pathname == navi.path && "text-pink border-b-2 border-pink"} hover:text-pink font-normal`}
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
          <div className="space-x-3">
            {/* Buttons */}
            <Link href={"/signin"}>
              <button className="btn lg:w-40 lg:h-10  w-20 h-10 border border-pink text-black lg:rounded-xl rounded-[5px] cursor-pointer">
                Login
              </button>
            </Link>
            <Link href={"/signin"}>
              <button className="btn lg:w-40 lg:h-10  w-30 h-10 bg-pink border-0 text-white lg:rounded-xl rounded-[5px] cursor-pointer">
                Get Started
              </button>
            </Link>
          </div>

          {/* Mobile Taggle Icon */}
          <button onClick={toggleMenu} className="lg:hidden text-[19px]">
            {isOpen ? <IoClose className="hidden" /> : <FaBars />}
          </button>
        </div>

        {/* -------- Mobile Menu --------- */}
        <ul
          className={`z-50 absolute left-0 p-5 lg:hidden  bg-[#d3588f] text-white w-[80%] h-full flex flex-col  gap-5 text-[19px] font-light translate-y-0 duration-300  ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
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
                  ${pathname == item.path && "text-white border-b-2 border-black"}`}
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
