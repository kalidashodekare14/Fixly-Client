'use client';

import { motion } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';
import { FaShieldAlt } from 'react-icons/fa';
import {
  FaArrowRightLong,
  FaHandshake,
  FaBolt,
  FaCircleCheck,
  FaRegClock,
  FaRegCreditCard,
  FaUserGear,
} from 'react-icons/fa6';
import { IoCheckmarkCircle } from 'react-icons/io5';
import {
  MdOutlineStarPurple500,
  MdOutlineVisibility,
  MdOutlineRocketLaunch,
  MdTrendingUp,
  MdGroups,
} from 'react-icons/md';
import { TbTargetArrow } from 'react-icons/tb';
import { GiToolbox } from 'react-icons/gi';

const features = [
  {
    icon: FaCircleCheck,
    title: 'Verified Professionals',
    desc: 'Every service provider is background-checked, reviewed, and rated by real customers before they can offer services.',
  },
  {
    icon: FaRegCreditCard,
    title: 'Transparent Pricing',
    desc: 'No hidden fees, no surprise charges. You see the full cost upfront before you confirm any booking.',
  },
  {
    icon: FaRegClock,
    title: 'Flexible Scheduling',
    desc: 'Book same-day, next-day, or plan ahead. Choose a time slot that fits your busy schedule seamlessly.',
  },
  {
    icon: FaUserGear,
    title: 'Dedicated Support',
    desc: 'Our support team is available 7 days a week to help with bookings, disputes, or any questions you have.',
  },
];

const OurAbout = () => {
  return (
    <>
      {/* ─── Hero Section ─── */}
      <section className="relative overflow-hidden pb-16 pt-20 lg:pb-24 lg:pt-28">
        <div className="absolute -left-48 top-1/4 h-96 w-96 -translate-y-1/2 rounded-full bg-primary-light/30 blur-3xl" />
        <div className="absolute -right-48 top-3/4 h-80 w-80 -translate-y-1/2 rounded-full bg-primary/5 blur-3xl" />

        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="flex flex-col items-center gap-14 lg:flex-row lg:gap-20">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative w-full lg:w-[48%]"
            >
              <div className="absolute -inset-4 rounded-[2rem] bg-linear-to-br from-primary/10 to-primary-light/50 blur-3xl" />

              <Image
                className="relative w-full rounded-2xl object-cover shadow-lg"
                src="/about/img1.jpg"
                width={540}
                height={620}
                alt="About Fixly"
              />

              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.3 }}
                className="absolute -bottom-6 -right-4 z-10 rounded-xl border border-white/60 bg-white/90 px-5 py-3 shadow-xl backdrop-blur-sm"
              >
                <div className="flex items-center gap-2.5">
                  <Image
                    className="h-12 w-12 rounded-full border-2 border-primary object-cover"
                    src="/about/img2.jpg"
                    width={48}
                    height={48}
                    alt="Team"
                  />
                  <div>
                    <div className="flex items-center gap-1 text-lg font-bold text-gray-900">
                      4.8
                      <MdOutlineStarPurple500 className="text-amber-400" />
                    </div>
                    <p className="whitespace-nowrap text-xs text-text-body">
                      Customer rating
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            <div className="w-full space-y-6 lg:w-[48%]">
              <div className="space-y-4">
                <motion.span
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="inline-block rounded-full border border-primary/20 bg-primary-light/50 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary"
                >
                  About Our Company
                </motion.span>
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
                >
                  We make home services simple & reliable
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="text-base leading-relaxed text-text-body"
                >
                  Fixly is a trusted marketplace connecting homeowners with
                  verified local service professionals. Founded with a mission
                  to simplify home services, we've grown into a community of
                  thousands of happy customers and skilled providers across the
                  country.
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.25 }}
                  className="text-base leading-relaxed text-text-body"
                >
                  Whether it's plumbing, electrical work, cleaning, or repairs —
                  we ensure every job is done right, on time, and with complete
                  peace of mind.
                </motion.p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Stats Counter ─── */}
      {/* <section className="bg-primary/5 py-14 lg:py-18">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="grid grid-cols-2 gap-8 text-center md:grid-cols-4">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="space-y-1"
              >
                <p className="text-3xl font-extrabold text-primary md:text-4xl">
                  {stat.value}
                </p>
                <p className="text-sm font-medium text-text-body">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section> */}

      {/* ─── Why Choose Fixly ─── */}
      {/* <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="flex flex-col items-center gap-14 lg:flex-row lg:gap-20">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="w-full lg:w-[48%]"
            >
              <span className="inline-block rounded-full border border-primary/20 bg-primary-light/50 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
                Why Fixly?
              </span>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                The smartest way to care for your home
              </h2>
              <p className="mt-4 text-base leading-relaxed text-text-body">
                We've designed every part of the Fixly experience with one goal
                in mind: making home service booking effortless, safe, and
                transparent. Here's what sets us apart from the rest.
              </p>

              <div className="mt-8 space-y-5">
                {features.map((feat, i) => (
                  <motion.div
                    key={feat.title}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.08 }}
                    className="flex gap-4"
                  >
                    <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <feat.icon className="text-sm" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        {feat.title}
                      </h4>
                      <p className="mt-0.5 text-sm leading-relaxed text-text-body">
                        {feat.desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative w-full lg:w-[48%]"
            >
              <div className="absolute -inset-4 rounded-[2rem] bg-linear-to-br from-primary/5 to-primary-light/30 blur-3xl" />
              <Image
                className="relative w-full rounded-2xl object-cover shadow-lg"
                src="/about/img1.jpg"
                width={540}
                height={600}
                alt="Why choose Fixly"
              />
            </motion.div>
          </div>
        </div>
      </section> */}
    </>
  );
};

export default OurAbout;
