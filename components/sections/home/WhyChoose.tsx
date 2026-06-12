'use client';

import { motion } from 'motion/react';
import { FaShieldHalved, FaStar, FaHandshake, FaBolt, FaCircleCheck, FaHeadset } from 'react-icons/fa6';
import { GoDotFill } from 'react-icons/go';

const benefits = [
  {
    icon: FaShieldHalved,
    title: 'Secure Payments',
    desc: 'Funds are held securely and only released when the job is completed to your satisfaction.',
  },
  {
    icon: FaCircleCheck,
    title: 'Verified Providers',
    desc: 'Every provider undergoes identity verification and quality checks before joining the platform.',
  },
  {
    icon: FaHandshake,
    title: 'Compare & Choose',
    desc: 'Receive multiple competitive offers and pick the provider that best fits your needs and budget.',
  },
  {
    icon: FaStar,
    title: 'Real Reviews',
    desc: 'Make informed decisions with authentic ratings and detailed feedback from real customers.',
  },
  {
    icon: FaBolt,
    title: 'Fast & Easy',
    desc: 'Post a request in under 2 minutes and get matched with available providers in your area.',
  },
  {
    icon: FaHeadset,
    title: '24/7 Support',
    desc: 'Our dedicated support team is always ready to help with any questions or concerns.',
  },
] as const;

const WhyChoose = () => {
  return (
    <section className="relative overflow-hidden py-16 lg:py-24">
      {/* Background decorative elements */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -right-40 -top-40 size-96 rounded-full bg-pink/5 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 size-80 rounded-full bg-pastel_pink/30 blur-3xl" />
        <div className="absolute right-1/4 top-1/3 hidden lg:block">
          <GoDotFill className="size-2 text-pink/20" />
        </div>
        <div className="absolute left-1/3 bottom-1/4 hidden lg:block">
          <GoDotFill className="size-3 text-pink/15" />
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        {/* Section header */}
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-block rounded-full border border-pink/20 bg-pastel_pink/50 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-pink"
          >
            Why Fixly
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
          >
            Built to make hiring simple & safe
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="mt-3 text-base leading-relaxed text-charcoal"
          >
            We handle the trust, safety, and convenience so you can focus on getting the job done.
          </motion.p>
        </div>

        {/* Benefits grid */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {benefits.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                whileHover={{ y: -4 }}
                className="group cursor-default rounded-2xl border border-gray-100 bg-white p-6 shadow-xs transition-all duration-300 hover:border-pink/20 hover:shadow-lg"
              >
                <span className="flex size-12 items-center justify-center rounded-xl bg-pastel_pink text-lg text-pink transition-all duration-300 group-hover:bg-pink group-hover:text-white group-hover:shadow-sm">
                  <Icon />
                </span>
                <h3 className="mt-4 text-lg font-bold text-gray-900">
                  {item.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-charcoal">
                  {item.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyChoose;
