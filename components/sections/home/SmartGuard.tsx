'use client';

import { motion } from 'motion/react';
import Image from 'next/image';
import { FaArrowRightLong } from 'react-icons/fa6';
import { IoShieldCheckmark } from 'react-icons/io5';
import { MdOutlineStarPurple500 } from 'react-icons/md';
import { TbCurrencyDollar } from 'react-icons/tb';
import { HiOutlineStar } from 'react-icons/hi2';

const features = [
  {
    icon: TbCurrencyDollar,
    title: 'Secure Payment',
    desc: 'Only release payment when the work is completed and meets your full satisfaction.',
  },
  {
    icon: HiOutlineStar,
    title: 'Trusted ratings & reviews',
    desc: 'Choose the right person for your task based on real ratings and honest user reviews.',
  },
  {
    icon: IoShieldCheckmark,
    title: 'Insurance for peace of mind',
    desc: "Every task is covered — so you're protected from start to finish, no matter what.",
  },
] as const;

const SmartGuard = () => {
  return (
    <section className="relative overflow-hidden py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="flex flex-col-reverse items-center gap-14 lg:flex-row lg:gap-20">
          {/* Left — Info */}
          <div className="w-full space-y-8 lg:w-1/2">
            <div className="space-y-4">
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="inline-block rounded-full border border-pink/20 bg-pastel_pink/50 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-pink"
              >
                Smart Guard
              </motion.span>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
              >
                Reliable security for your peace of mind
              </motion.h2>
            </div>

            <div className="space-y-6">
              {features.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-30px' }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="group flex items-start gap-4"
                  >
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-pastel_pink text-lg text-pink transition-colors group-hover:bg-pink group-hover:text-white">
                      <Icon />
                    </span>
                    <div className="space-y-1">
                      <h3 className="text-base font-bold text-gray-900">
                        {item.title}
                      </h3>
                      <p className="text-sm leading-relaxed text-charcoal">
                        {item.desc}
                      </p>
                      <button className="mt-1 flex items-center gap-1.5 text-xs font-semibold text-pink transition-colors hover:text-pink/70">
                        See more
                        <FaArrowRightLong className="text-[10px] transition-transform duration-200 group-hover:translate-x-0.5" />
                      </button>
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
              className="btn rounded-2xl flex w-fit cursor-pointer items-center gap-2.5 bg-pink px-6 py-3 text-sm font-semibold text-white shadow-sm transition-shadow hover:shadow-md"
            >
              Post your task for free
              <FaArrowRightLong className="text-xs transition-transform duration-200 group-hover:translate-x-0.5" />
            </motion.button>
          </div>

          {/* Right — Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative w-full lg:w-[45%] lg:pl-6"
          >
            {/* Glow behind image */}
            <div className="absolute -inset-4 rounded-[2rem] bg-linear-to-br from-pink/10 to-pastel_pink/50 blur-3xl" />

            {/* Rating floating card */}
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="absolute -top-2 right-4 z-10 flex items-center gap-3 rounded-xl border border-white/60 bg-white/90 px-4 py-2.5 shadow-xl backdrop-blur-sm"
            >
              <Image
                className="h-12 w-12 rounded-full border-2 border-pink object-cover"
                src="/smart_guard/img2.jpg"
                width={48}
                height={48}
                alt="User avatar"
              />
              <div>
                <div className="flex items-center gap-1.5 text-lg font-bold text-gray-900">
                  4.5
                  <MdOutlineStarPurple500 className="text-amber-400" />
                </div>
                <p className="whitespace-nowrap text-xs text-charcoal">
                  Overall rating
                </p>
              </div>
            </motion.div>

            <Image
              className="relative w-full rounded-2xl object-cover shadow-lg"
              src="/smart_guard/img1.jpeg"
              width={540}
              height={620}
              alt="Smart Guard - secure home services"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SmartGuard;
