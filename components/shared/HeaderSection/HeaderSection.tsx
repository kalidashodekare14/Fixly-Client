'use client';
import { motion } from 'motion/react';
import { MdHome, MdKeyboardArrowRight } from 'react-icons/md';
import './HeaderSection.css';

const HeaderSection = ({ title }: { title: string }) => {
  return (
    <section className="relative flex h-72 items-center justify-center overflow-hidden md:h-80 lg:h-96">
      {/* Background via CSS */}
      <div className="bg absolute inset-0 bg-cover bg-center" />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/60" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/20" />

      {/* Decorative blurred shapes */}
      <div className="absolute -left-32 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-pink/20 blur-3xl" />
      <div className="absolute -right-32 top-1/3 h-96 w-96 -translate-y-1/2 rounded-full bg-white/5 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-sm text-white/80 backdrop-blur-sm"
          >
            <MdHome className="h-4 w-4" />
            <span>Home</span>
            <MdKeyboardArrowRight className="h-4 w-4" />
            <span className="font-medium text-white">{title}</span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
            className="text-4xl font-bold tracking-tight text-white drop-shadow-lg sm:text-4xl md:text-4xl"
          >
            {title}
          </motion.h1>

          {/* Decorative line */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.5, delay: 0.3, ease: 'easeOut' }}
            className="mt-2 h-1 w-24 origin-center rounded-full bg-pink shadow-sm shadow-pink/50"
          />
        </div>
      </div>
    </section>
  );
};

export default HeaderSection;
