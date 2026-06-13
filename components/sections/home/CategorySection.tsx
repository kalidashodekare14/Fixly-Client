'use client';

import { motion } from 'motion/react';
import Image from 'next/image';
import { FaArrowRightLong } from 'react-icons/fa6';

const categories = [
  { name: 'Electrician', image: '/category/electrician.jpg' },
  { name: 'Plumber', image: '/category/plumber.jpg' },
  { name: 'Painter', image: '/category/painter.jpg' },
  { name: 'Cleaner', image: '/category/cleaner.jpg' },
  { name: 'Security', image: '/category/security.jpg' },
  { name: 'Carpenter', image: '/category/carpenter.jpg' },
] as const;

const CategorySection = () => {
  return (
    <section className="relative overflow-hidden py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        {/* Header */}
        <div className="mb-12 flex flex-col items-end justify-between gap-6 lg:flex-row lg:mb-16">
          <div className="max-w-lg space-y-4">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-block rounded-full border border-primary/20 bg-primary-light/50 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary"
            >
              Top categories
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
            >
              Browse by service type
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-base leading-relaxed text-text-body"
            >
              From quick fixes to major renovations — find specialists in every
              home service category.
            </motion.p>
          </div>
          <motion.a
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            href="#"
            className="group flex shrink-0 items-center gap-2 text-sm font-medium text-primary transition-colors hover:text-primary/80"
          >
            See more
            <FaArrowRightLong className="transition-transform duration-200 group-hover:translate-x-1" />
          </motion.a>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6 lg:gap-5">
          {categories.map((cat, index) => (
            <motion.a
              key={cat.name}
              href="#"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              whileHover={{ y: -6 }}
              className="group flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-shadow hover:shadow-lg"
            >
              <div className="relative h-40 w-full overflow-hidden">
                <Image
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                  src={cat.image}
                  width={500}
                  height={300}
                  alt={cat.name}
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent" />
              </div>
              <div className="flex items-center justify-between px-4 py-3.5">
                <span className="text-sm font-semibold text-gray-900">
                  {cat.name}
                </span>
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary-light text-xs text-primary transition-transform duration-200 group-hover:translate-x-0.5">
                  <FaArrowRightLong />
                </span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
