'use client';

import { motion } from 'motion/react';
import Image from 'next/image';
import { FaArrowRightLong, FaEye } from 'react-icons/fa6';
import { IoShieldCheckmark } from 'react-icons/io5';
import { MdOutlineStarPurple500 } from 'react-icons/md';
import { TbCurrencyDollar } from 'react-icons/tb';
import { BsShieldCheck } from 'react-icons/bs';
import { GoDotFill } from 'react-icons/go';

const features = [
  {
    icon: TbCurrencyDollar,
    title: 'Secure Payment Protection',
    desc: 'Your funds are held safely and only released when the job is completed to your satisfaction.',
  },
  {
    icon: IoShieldCheckmark,
    title: 'Verified & Background-Checked Providers',
    desc: 'Every provider undergoes thorough identity and background verification before joining.',
  },
  {
    icon: FaEye,
    title: 'Real-Time Booking Monitoring',
    desc: 'Track your booking status in real time with live updates from start to finish.',
  },
] as const;

const SmartGuard = () => {
  return (
    <section className="relative overflow-hidden py-16 lg:py-24">
      {/* Background decorative elements */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -right-40 -top-40 size-96 rounded-full bg-pink/5 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 size-80 rounded-full bg-pastel_pink/30 blur-3xl" />
        <div className="absolute left-1/3 top-1/4 hidden lg:block">
          <GoDotFill className="size-2 text-pink/20" />
        </div>
        <div className="absolute right-1/4 bottom-1/3 hidden lg:block">
          <GoDotFill className="size-3 text-pink/15" />
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="flex flex-col items-center gap-14 lg:flex-row lg:gap-20">
          {/* Left — Image Showcase */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative w-full lg:w-[45%]"
          >
            {/* Main image */}
            <div className="relative">
              <div className="absolute -inset-3 rounded-[2.5rem] bg-linear-to-br from-pink/20 to-pastel_pink/40 blur-2xl" />
              <div className="relative overflow-hidden rounded-2xl shadow-lg">
                <Image
                  className="w-full object-cover"
                  src="/smart_guard/guard1.jpg"
                  width={540}
                  height={620}
                  alt="Smart Guard protection"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-black/10 to-transparent" />
              </div>
            </div>

            {/* Floating guarantee card with guard2 */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.4 }}
              className="absolute -bottom-6 -right-4 z-10 w-52 rounded-xl border border-white/60 bg-white/95 p-4 shadow-xl backdrop-blur-sm lg:-right-8"
            >
              <div className="flex items-center gap-3">
                <div className="size-14 shrink-0 overflow-hidden rounded-lg border-2 border-pink/20 shadow-xs">
                  <Image
                    className="h-full w-full object-cover"
                    src="/smart_guard/guard2.jpg"
                    width={56}
                    height={56}
                    alt="Verified"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-0.5 text-amber-400">
                    <MdOutlineStarPurple500 className="size-4" />
                    <MdOutlineStarPurple500 className="size-4" />
                    <MdOutlineStarPurple500 className="size-4" />
                    <MdOutlineStarPurple500 className="size-4" />
                    <MdOutlineStarPurple500 className="size-4" />
                  </div>
                  <p className="mt-0.5 text-xs font-semibold text-gray-900">
                    4.9 <span className="font-normal text-gray-500">(2.4k reviews)</span>
                  </p>
                </div>
              </div>
              <div className="mt-2.5 flex items-center gap-1.5 rounded-lg bg-emerald-50 px-2.5 py-1.5 text-xs font-medium text-emerald-700">
                <BsShieldCheck className="size-3.5" />
                <span>100% Protection Guaranteed</span>
              </div>
            </motion.div>

            {/* Decorative dot pattern */}
            <div className="absolute -left-8 top-12 hidden flex-col gap-1.5 lg:flex">
              {[0, 1, 2].map((i) => (
                <div key={i} className="flex gap-1.5">
                  {[0, 1, 2].map((j) => (
                    <div
                      key={j}
                      className="size-1.5 rounded-full bg-pink/20"
                    />
                  ))}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right — Info */}
          <div className="w-full space-y-8 lg:w-1/2">
            <div className="space-y-4">
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 rounded-full border border-pink/20 bg-pastel_pink/50 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-pink"
              >
                <IoShieldCheckmark className="size-3.5" />
                Smart Guard
              </motion.span>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
              >
                Reliable security for your <span className="text-pink">peace of mind</span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.15 }}
                className="text-base leading-relaxed text-charcoal"
              >
                Every booking on Fixly is protected end-to-end so you can hire with confidence, knowing you&apos;re covered every step of the way.
              </motion.p>
            </div>

            {/* Feature cards */}
            <div className="space-y-4">
              {features.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-30px' }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    whileHover={{ x: 4 }}
                    className="group cursor-default rounded-xl border border-gray-100 bg-white p-4 shadow-xs transition-all duration-300 hover:border-pink/20 hover:shadow-md"
                  >
                    <div className="flex items-start gap-4">
                      <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-pastel_pink text-base text-pink transition-all duration-300 group-hover:bg-pink group-hover:text-white group-hover:shadow-sm">
                        <Icon />
                      </span>
                      <div>
                        <h3 className="text-base font-bold text-gray-900">
                          {item.title}
                        </h3>
                        <p className="mt-0.5 text-sm leading-relaxed text-charcoal">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <motion.button
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.4 }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="btn flex w-fit cursor-pointer items-center gap-2.5 rounded-2xl bg-pink px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:shadow-md"
            >
              Post your task for free
              <FaArrowRightLong className="text-xs transition-transform duration-200 group-hover:translate-x-0.5" />
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SmartGuard;
