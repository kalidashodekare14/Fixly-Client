'use client';
import { motion } from 'motion/react';
import Link from 'next/link';
import { FaArrowRightLong } from 'react-icons/fa6';

const ReadyToGet = () => {
  return (
    <section className="bg-primary py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Ready to get your home services done?
          </h2>
          <p className="mt-4 text-base leading-relaxed text-white/80">
            Join thousands of happy homeowners who trust Fixly for their
            repairs, cleaning, and maintenance. Post your first task today —
            it's free and takes just 2 minutes.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/post-task"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-8 py-3.5 text-sm font-semibold text-primary shadow-lg transition-all hover:bg-white/90 hover:shadow-xl"
            >
              Post a Task
              <FaArrowRightLong />
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 rounded-xl border border-white/30 px-8 py-3.5 text-sm font-semibold text-white transition-all hover:bg-white/10"
            >
              Browse Services
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ReadyToGet;
