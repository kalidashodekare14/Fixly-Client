'use client';

import { motion } from 'motion/react';
import { usePathname } from 'next/navigation';
import { FaInstagram, FaLinkedinIn, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  const pathname = usePathname();

  const matchPath =
    pathname.startsWith('/signup') ||
    pathname.startsWith('/signin') ||
    pathname.startsWith('/dashboard');

  return (
    <footer className={`bg-[#172030] ${matchPath && 'hidden'}`}>
      <div className="2xl:w-350 xl:w-310 lg:w-260 w-full m-auto  p-5 ">
        {/* First Content */}
        <div className="flex flex-col lg:flex-row justify-start lg:justify-between lg:items-center gap-10">
          {/* Left: Name + Description + Socials */}
          <div className="space-y-3 w-80">
            <h1 className="text-3xl text-pink font-bold">Fixly</h1>
            <p className="text-[#9e9c9c]">
              Bangladeshs trusted home services marketplace. Connecting skilled
              professionals with homeowners since 2023.
            </p>
            {/* Social icons */}
            <div className="flex items-center gap-3">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-10 h-10 rounded-full text-white bg-pink flex justify-center items-center cursor-pointer"
              >
                <FaLinkedinIn />
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-10 h-10 rounded-full text-white bg-pink flex justify-center items-center cursor-pointer"
              >
                <FaTwitter />
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-10 h-10 rounded-full text-white bg-pink flex justify-center items-center cursor-pointer"
              >
                <FaInstagram />
              </motion.div>
            </div>
          </div>
          <div
            className={
              'space-y-2 grid grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-30'
            }
          >
            {/* Services */}
            <div className="space-y-2">
              <h3 className="text-xl text-[#c7c7c7]">Services</h3>
              <p className="text-[15px] cursor-pointer text-[#9e9c9c]">
                Post a Request
              </p>
              <p className="text-[15px] cursor-pointer text-[#9e9c9c]">
                Browse Providers
              </p>
              <p className="text-[15px] cursor-pointer text-[#9e9c9c]">
                Emergency Service
              </p>
              <p className="text-[15px] cursor-pointer text-[#9e9c9c]">
                Pricing
              </p>
            </div>
            {/* Company info */}
            <div>
              <div className="space-y-2">
                <h3 className="text-xl text-[#c7c7c7]">Company</h3>
                <p className="text-[15px] cursor-pointer text-[#9e9c9c]">
                  About Fixly
                </p>
                <p className="text-[15px] cursor-pointer text-[#9e9c9c]  ">
                  Blog
                </p>
                <p className="text-[15px] cursor-pointer text-[#9e9c9c]">
                  Careers
                </p>
                <p className="text-[15px] cursor-pointer text-[#9e9c9c]">
                  Press
                </p>
              </div>
            </div>
            {/* Support info */}
            <div className="">
              <div className="space-y-2">
                <h3 className="text-xl text-[#c7c7c7]">Support</h3>
                <p className="text-[15px] cursor-pointer text-[#9e9c9c]">
                  Help Center
                </p>
                <p className="text-[15px] cursor-pointer text-[#9e9c9c]">
                  Safety
                </p>
                <p className="text-[15px] cursor-pointer text-[#9e9c9c]">
                  Terms
                </p>
                <p className="text-[15px] cursor-pointer text-[#9e9c9c]">
                  Privacy
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* Last Content */}
        <div className="flex flex-col lg:flex-row justify-between items-center gap-5 my-5 pt-5 border-t border-[#c5c5c5bb]">
          <p className="text-[#c7c7c7]">
            © {new Date().getFullYear()} Fixly Bangladesh. All rights reserved.
          </p>
          <p className="text-[#c7c7c7]">
            Made with care for homeowners everywhere BD
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
