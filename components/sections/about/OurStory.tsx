'use client';
import { motion } from 'motion/react';

const OurStory = () => {
  return (
    <section className="py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-block rounded-full border border-primary/20 bg-primary-light/50 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary"
          >
            Our Story
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
          >
            How Fixly was born
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-4 text-base leading-relaxed text-text-body"
          >
            Fixly started with a simple frustration — finding a reliable
            plumber, electrician, or cleaner was always a hassle. Word-of-mouth
            recommendations were unreliable, online directories were outdated,
            and every booking came with uncertainty about quality and pricing.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="mt-4 text-base leading-relaxed text-text-body"
          >
            So we built Fixly — a platform where every provider is
            background-checked, every price is transparent, and every job is
            backed by a satisfaction guarantee. Today, thousands of homeowners
            and service professionals trust Fixly to connect, communicate, and
            get the job done right.
          </motion.p>
        </div>
      </div>
    </section>
  );
};

export default OurStory;
