'use client';

import { motion } from 'motion/react';
import Image from 'next/image';
import { FaShieldAlt } from 'react-icons/fa';
import { FaArrowRightLong, FaHandshake, FaBolt } from 'react-icons/fa6';
import { IoCheckmarkCircle } from 'react-icons/io5';
import {
  MdOutlineStarPurple500,
  MdOutlineVisibility,
  MdOutlineRocketLaunch,
} from 'react-icons/md';
import { TbTargetArrow } from 'react-icons/tb';

const stats = [
  { value: '10K+', label: 'Happy Customers' },
  { value: '500+', label: 'Verified Providers' },
  { value: '98%', label: 'Satisfaction Rate' },
  { value: '50K+', label: 'Jobs Completed' },
];

const values = [
  {
    icon: FaShieldAlt,
    title: 'Trust & Safety',
    desc: 'Every provider undergoes background verification. Your security is our top priority — from secure payments to insured services.',
  },
  {
    icon: FaHandshake,
    title: 'Reliability',
    desc: 'We connect you with professionals who show up on time and deliver quality work. No cancellations, no excuses.',
  },
  {
    icon: FaBolt,
    title: 'Speed & Efficiency',
    desc: 'Post a task and receive competitive offers within minutes. Our smart matching system finds the right pro for you fast.',
  },
];

const OurAbout = () => {
  return (
    <section className="relative overflow-hidden py-16 lg:py-24">
      {/* Background decoration */}
      <div className="absolute -left-48 top-1/4 h-96 w-96 -translate-y-1/2 rounded-full bg-pastel_pink/30 blur-3xl" />
      <div className="absolute -right-48 top-3/4 h-80 w-80 -translate-y-1/2 rounded-full bg-pink/5 blur-3xl" />

      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        {/* ─── Hero Section ─── */}
        <div className="flex flex-col items-center gap-14 lg:flex-row lg:gap-20">
          {/* Left: Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative w-full lg:w-[48%]"
          >
            <div className="absolute -inset-4 rounded-[2rem] bg-linear-to-br from-pink/10 to-pastel_pink/50 blur-3xl" />

            <Image
              className="relative w-full rounded-2xl object-cover shadow-lg"
              src="/about/img1.jpg"
              width={540}
              height={620}
              alt="About Fixly"
            />

            {/* Floating rating card */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="absolute -bottom-6 -right-4 z-10 rounded-xl border border-white/60 bg-white/90 px-5 py-3 shadow-xl backdrop-blur-sm"
            >
              <div className="flex items-center gap-2.5">
                <Image
                  className="h-12 w-12 rounded-full border-2 border-pink object-cover"
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
                  <p className="whitespace-nowrap text-xs text-charcoal">
                    Customer rating
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right: Info */}
          <div className="w-full space-y-6 lg:w-[48%]">
            <div className="space-y-4">
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="inline-block rounded-full border border-pink/20 bg-pastel_pink/50 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-pink"
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
                className="text-base leading-relaxed text-charcoal"
              >
                Fixly is a trusted marketplace connecting homeowners with
                verified local service professionals. Founded with a mission to
                simplify home services, we've grown into a community of
                thousands of happy customers and skilled providers across the
                country.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.25 }}
                className="text-base leading-relaxed text-charcoal"
              >
                Whether it's plumbing, electrical work, cleaning, or repairs —
                we ensure every job is done right, on time, and with complete
                peace of mind.
              </motion.p>
            </div>

            {/* Feature checkmarks */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="space-y-3 pt-2"
            >
              {[
                'All providers are background-verified and vetted',
                'Transparent pricing — know the cost upfront',
                'Dedicated support team available 24/7',
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <IoCheckmarkCircle className="mt-0.5 h-5 w-5 shrink-0 text-pink" />
                  <span className="text-sm text-charcoal">{item}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* ─── Mission & Vision ─── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative mx-auto mt-20 grid gap-6 rounded-2xl border border-pink/10 bg-linear-to-br from-pastel_pink/30 to-white p-8 shadow-sm md:grid-cols-2 md:p-10"
        >
          {/* Glow */}
          <div className="absolute -inset-2 rounded-[2.5rem] bg-pink/5 blur-xl" />

          {/* Mission */}
          <div className="relative z-10 flex items-start gap-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-pink text-white shadow-sm">
              <TbTargetArrow className="text-xl" />
            </span>
            <div>
              <h3 className="text-lg font-bold text-gray-900">Our Mission</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-charcoal">
                To empower homeowners and service professionals with a seamless,
                transparent platform that makes home maintenance stress-free and
                creates meaningful work opportunities for skilled providers.
              </p>
            </div>
          </div>

          {/* Vision */}
          <div className="relative z-10 flex items-start gap-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-pink text-white shadow-sm">
              <MdOutlineVisibility className="text-xl" />
            </span>
            <div>
              <h3 className="text-lg font-bold text-gray-900">Our Vision</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-charcoal">
                To become the most trusted home services platform — where every
                homeowner finds the right professional instantly, and every
                provider builds a thriving business.
              </p>
            </div>
          </div>
        </motion.div>

        {/* ─── Core Values ─── */}
        <div className="mt-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-10 text-center"
          >
            <span className="inline-block rounded-full border border-pink/20 bg-pastel_pink/50 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-pink">
              What We Stand For
            </span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Our Core Values
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-base leading-relaxed text-charcoal">
              These principles guide everything we do — from how we vet
              providers to how we support our community.
            </p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-3">
            {values.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-30px' }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileHover={{ y: -4 }}
                  className="group rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-pastel_pink text-lg text-pink transition-colors group-hover:bg-pink group-hover:text-white">
                    <Icon />
                  </span>
                  <h3 className="mt-5 text-lg font-bold text-gray-900">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-charcoal">
                    {item.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* ─── Stats ─── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-20 grid gap-5 rounded-2xl bg-gradient-to-br from-pink to-[#d0146a] p-8 shadow-lg md:grid-cols-4 md:p-10"
        >
          {stats.map((stat) => (
            <div key={stat.label} className="text-center text-white">
              <p className="text-3xl font-bold tracking-tight md:text-4xl">
                {stat.value}
              </p>
              <p className="mt-1 text-sm text-white/80">{stat.label}</p>
            </div>
          ))}
        </motion.div>

        {/* ─── CTA ─── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-16 text-center"
        >
          <h3 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            Ready to get started?
          </h3>
          <p className="mx-auto mt-3 max-w-lg text-base leading-relaxed text-charcoal">
            Join thousands of happy customers. Post your first task today and
            find the perfect professional for your needs.
          </p>
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="mt-6 flex cursor-pointer items-center gap-2.5 rounded-2xl bg-pink px-8 py-3.5 text-sm font-semibold text-white shadow-sm transition-shadow hover:shadow-md"
          >
            Post your task for free
            <FaArrowRightLong className="text-xs transition-transform duration-200 group-hover:translate-x-0.5" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default OurAbout;
