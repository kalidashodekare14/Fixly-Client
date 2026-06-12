'use client';

import { motion } from 'motion/react';
import { FaUsers, FaStar, FaHeart, FaBagShopping } from 'react-icons/fa6';
import { GoDotFill } from 'react-icons/go';

const achievements = [
  {
    value: '5000+',
    label: 'Service Providers',
    icon: FaUsers,
    gradient: 'from-pink-50 to-rose-50',
    iconBg: 'bg-pink-100',
    iconColor: 'text-primary',
  },
  {
    value: '10000+',
    label: 'Order Served',
    icon: FaBagShopping,
    gradient: 'from-blue-50 to-indigo-50',
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-600',
  },
  {
    value: '3000+',
    label: '5 Star Received',
    icon: FaStar,
    gradient: 'from-amber-50 to-orange-50',
    iconBg: 'bg-amber-100',
    iconColor: 'text-amber-500',
  },
  {
    value: '5000+',
    label: 'Friendly Shop',
    icon: FaHeart,
    gradient: 'from-emerald-50 to-teal-50',
    iconBg: 'bg-emerald-100',
    iconColor: 'text-emerald-500',
  },
] as const;

const OurAchievements = () => {
  return (
    <section className="relative overflow-hidden py-16 lg:py-24">
      {/* Background decorative elements */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-40 -top-40 size-96 rounded-full bg-pink/5 blur-3xl" />
        <div className="absolute -bottom-40 -right-40 size-80 rounded-full bg-primary-light/30 blur-3xl" />
        <div className="absolute left-1/4 top-1/3 hidden lg:block">
          <GoDotFill className="size-2 text-primary/20" />
        </div>
        <div className="absolute right-1/3 top-1/2 hidden lg:block">
          <GoDotFill className="size-3 text-primary/15" />
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
            className="inline-block rounded-full border border-primary/20 bg-primary-light/50 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary"
          >
            Our Achievements
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
          >
            Trusted by thousands across the platform
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="mt-3 text-base leading-relaxed text-text-body"
          >
            Our growing community of verified providers and happy customers speaks for itself.
          </motion.p>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {achievements.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ y: -4 }}
                className={`group cursor-default rounded-2xl bg-linear-to-br ${item.gradient} border border-gray-100/50 p-6 text-center shadow-xs transition-all duration-300 hover:shadow-lg`}
              >
                <span
                  className={`mx-auto flex size-14 items-center justify-center rounded-xl ${item.iconBg} ${item.iconColor} text-xl transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}
                >
                  <Icon />
                </span>
                <p className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                  {item.value}
                </p>
                <p className="mt-1.5 text-sm font-medium text-text-body">
                  {item.label}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom decorative separator */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mx-auto mt-14 h-px w-32 origin-center bg-linear-to-r from-transparent via-primary/40 to-transparent"
        />
      </div>
    </section>
  );
};

export default OurAchievements;
