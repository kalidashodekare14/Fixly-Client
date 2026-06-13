'use client';

import { motion } from 'motion/react';
import Link from 'next/link';
import { FaArrowRightLong, FaUser } from 'react-icons/fa6';
import { GoDotFill } from 'react-icons/go';

const GetStarted = () => {
  return (
    <section className="relative overflow-hidden py-16 lg:py-24">
      {/* Background decorative elements */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -right-40 -top-40 size-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 size-80 rounded-full bg-primary-light/30 blur-3xl" />
        <div className="absolute left-1/4 top-1/3 hidden lg:block">
          <GoDotFill className="size-2 text-primary/20" />
        </div>
        <div className="absolute right-1/3 bottom-1/4 hidden lg:block">
          <GoDotFill className="size-3 text-primary/15" />
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-primary-light px-8 py-16 shadow-inner sm:px-14 lg:flex lg:items-center lg:justify-between lg:px-20 lg:py-20">
          {/* Decorative inner glow */}
          <div className="pointer-events-none absolute -right-20 -top-20 size-72 rounded-full bg-primary/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -left-20 size-72 rounded-full bg-primary/15 blur-3xl" />

          {/* Content */}
          <div className="relative z-10 max-w-xl text-center lg:text-left">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-block rounded-full border border-primary/20 bg-white/60 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary"
            >
              Get Started
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
            >
              Ready to get started?
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="mt-3 text-base leading-relaxed text-text-body"
            >
              Join 50,000+ users who already simplified how they hire home
              services.
            </motion.p>
          </div>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="relative z-10 mt-8 flex flex-col items-center gap-3 sm:flex-row lg:mt-0 lg:shrink-0"
          >
            <Link href="/signin">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="group inline-flex w-44 cursor-pointer items-center justify-center gap-2 rounded-xl border border-primary/30 bg-white px-6 py-3 text-sm font-semibold text-gray-900 shadow-xs transition-all hover:shadow-md"
              >
                <FaUser className="size-3.5" />
                Login
              </motion.button>
            </Link>
            <Link href="/signin">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="group inline-flex w-44 cursor-pointer items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:shadow-md"
              >
                Get Started
                <FaArrowRightLong className="size-3.5 transition-transform group-hover:translate-x-1" />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default GetStarted;
