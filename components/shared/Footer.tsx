'use client';

import { motion } from 'motion/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaTools } from 'react-icons/fa';
import {
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
  FaArrowRightLong,
} from 'react-icons/fa6';
import { IoMail } from 'react-icons/io5';

const footerLinks = [
  {
    title: 'Services',
    links: [
      { label: 'Post a Request', href: '#' },
      { label: 'Browse Providers', href: '#' },
      { label: 'Emergency Service', href: '#' },
      { label: 'Pricing', href: '#' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About Fixly', href: '#' },
      { label: 'Blog', href: '#' },
      { label: 'Careers', href: '#' },
      { label: 'Press', href: '#' },
    ],
  },
  {
    title: 'Support',
    links: [
      { label: 'Help Center', href: '#' },
      { label: 'Safety', href: '#' },
      { label: 'Terms of Service', href: '#' },
      { label: 'Privacy Policy', href: '#' },
    ],
  },
];

const socials = [
  { icon: FaLinkedinIn, label: 'LinkedIn', href: '#' },
  { icon: FaTwitter, label: 'Twitter', href: '#' },
  { icon: FaInstagram, label: 'Instagram', href: '#' },
];

const Footer = () => {
  const pathname = usePathname();

  const matchPath =
    pathname.startsWith('/signup') ||
    pathname.startsWith('/signin') ||
    pathname.startsWith('/dashboard');

  return (
    <footer
      className={`bg-linear-to-br from-gray-900 via-gray-800 to-gray-900 ${matchPath && 'hidden'}`}
    >
      {/* Top section */}
      <div className="mx-auto max-w-7xl px-5 pb-10 pt-16 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          {/* Brand column */}
          <div className="lg:col-span-4">
            <Link className="flex items-center gap-2" href="/">
              <div className="w-10 h-10 shrink-0 flex justify-center items-center bg-primary text-white text-2xl rounded-xl">
                <FaTools className="" />
              </div>
              <span className="text-3xl font-bold tracking-tight text-primary">
                Fixly
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-gray-400">
              Bangladesh&apos;s trusted home services marketplace. Connecting
              skilled professionals with homeowners since 2023.
            </p>

            {/* Social icons */}
            <div className="mt-6 flex items-center gap-3">
              {socials.map((social) => (
                <Link key={social.label} href={social.href}>
                  <motion.div
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex size-10 cursor-pointer items-center justify-center rounded-xl border border-gray-700/50 bg-white/5 text-gray-400 backdrop-blur-sm transition-colors hover:border-primary/30 hover:bg-primary hover:text-white"
                  >
                    <social.icon className="size-4" />
                  </motion.div>
                </Link>
              ))}
            </div>

            {/* Newsletter */}
            <div className="mt-8">
              <p className="text-sm font-semibold text-gray-300">
                Stay in touch
              </p>
              <div className="mt-3 flex items-center gap-2 rounded-xl border border-gray-700/50 bg-white/5 p-1.5 backdrop-blur-sm transition-all focus-within:border-primary/50">
                <div className="flex flex-1 items-center gap-2 pl-2.5">
                  <IoMail className="size-4 shrink-0 text-gray-500" />
                  <input
                    type="email"
                    placeholder="Your email"
                    className="w-full bg-transparent py-1.5 text-sm text-white placeholder-gray-500 outline-none"
                  />
                </div>
                <button className="group flex shrink-0 cursor-pointer items-center justify-center rounded-lg bg-primary p-2 text-white transition-all hover:bg-primary-hover">
                  <FaArrowRightLong className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Links columns */}
          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:col-span-8">
            {footerLinks.map((group) => (
              <div key={group.title}>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-300">
                  {group.title}
                </h3>
                <ul className="mt-4 space-y-3">
                  {group.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-sm text-gray-400 transition-colors hover:text-primary"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-800">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-5 py-6 lg:flex-row lg:px-8">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Fixly Bangladesh. All rights
            reserved.
          </p>
          <p className="text-sm text-gray-500">
            Made with care for homeowners everywhere BD
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
