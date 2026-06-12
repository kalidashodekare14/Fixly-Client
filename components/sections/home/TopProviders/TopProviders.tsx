'use client';

import { useRef } from 'react';
import { motion } from 'motion/react';
import Image from 'next/image';
import { FaStar, FaArrowRightLong } from 'react-icons/fa6';
import { IoChevronBack, IoChevronForward } from 'react-icons/io5';

import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';

import providerData from '../../../../data/providers.json';

// custom css
import './TopProviders.css';
import { Provider } from '@/types/Providers';

// -------------------- Provider Card Component -------------------
const ProviderCard = ({ provider }: { provider: Provider }) => {
  return (
    <div className="group relative rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-shadow hover:shadow-lg">
      {/* Online / Offline badge */}
      <div className="absolute right-4 top-4 z-10">
        {provider.available ? (
          <span className="flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Online
          </span>
        ) : (
          <span className="flex items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-500">
            <span className="h-1.5 w-1.5 rounded-full bg-gray-400" />
            Offline
          </span>
        )}
      </div>

      {/* Header */}
      <div className="flex items-center gap-4 border-b border-gray-100 pb-4">
        <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full">
          <Image
            className="object-cover"
            src={provider.image}
            fill
            sizes="64px"
            alt={provider.name}
          />
        </div>
        <div className="min-w-0">
          <h3 className="truncate text-base font-bold text-gray-900">
            {provider.name}
          </h3>
          <p className="truncate text-sm text-text-body">{provider.location}</p>
        </div>
      </div>

      {/* Body */}
      <div className="space-y-4 py-4">
        {/* Service tags */}
        <div className="flex flex-wrap gap-2">
          {provider.services.map((service, i) => (
            <span
              key={i}
              className="rounded-full bg-primary-light/70 px-3 py-1 text-xs font-medium text-text-body"
            >
              {service}
            </span>
          ))}
        </div>

        {/* Rating + Jobs */}
        <div className="flex items-center gap-6 text-sm">
          <div>
            <p className="text-xs text-gray-500">Rating</p>
            <div className="mt-0.5 flex items-center gap-1 font-semibold text-gray-900">
              <FaStar className="text-amber-400" />
              {provider.rating}
            </div>
          </div>
          <div>
            <p className="text-xs text-gray-500">Jobs done</p>
            <p className="mt-0.5 font-semibold text-gray-900">
              {provider.job_done}
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between border-t border-gray-100 pt-4">
        <div>
          <p className="text-xs text-gray-500">Starting from</p>
          <p className="text-lg font-bold text-primary">${provider.price}</p>
        </div>
        <button className="flex cursor-pointer items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-xs transition-shadow hover:shadow-md">
          Hire me
          <FaArrowRightLong className="text-xs" />
        </button>
      </div>
    </div>
  );
};

// -------------------- Section -------------------
const TopProviders = () => {
  const providers: Provider[] = providerData;
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  return (
    <section className="relative overflow-hidden py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        {/* Section header */}
        <div className="mx-auto mb-10 max-w-2xl text-center lg:mb-12">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-4 inline-block rounded-full border border-primary/20 bg-primary-light/50 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary"
          >
            Top Providers
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
          >
            Highly rated professionals
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-4 text-base leading-relaxed text-text-body"
          >
            Browse verified service providers, check their ratings and reviews,
            and hire directly.
          </motion.p>
        </div>

        {/* Carousel */}
        <div className="relative">
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={20}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 2, spaceBetween: 20 },
              1024: { slidesPerView: 3, spaceBetween: 24 },
            }}
            pagination={{
              clickable: true,
            }}
            navigation={{
              prevEl: prevRef.current,
              nextEl: nextRef.current,
            }}
            onInit={(swiper) => {
              if (
                swiper.params.navigation &&
                typeof swiper.params.navigation === 'object'
              ) {
                swiper.params.navigation.prevEl = prevRef.current;
                swiper.params.navigation.nextEl = nextRef.current;
              }
              swiper.navigation.init();
              swiper.navigation.update();
            }}
            className="custom-pagination"
          >
            {providers.map((provider) => (
              <SwiperSlide key={provider.id} className="h-auto py-2">
                <ProviderCard provider={provider} />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Navigation arrows */}
          <button
            ref={prevRef}
            className="absolute -left-3.5 top-1/2 z-20 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-gray-200 bg-white shadow-md transition-colors hover:bg-primary hover:text-white lg:flex"
          >
            <IoChevronBack />
          </button>
          <button
            ref={nextRef}
            className="absolute -right-3.5 top-1/2 z-20 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-gray-200 bg-white shadow-md transition-colors hover:bg-primary hover:text-white lg:flex"
          >
            <IoChevronForward />
          </button>
        </div>
      </div>
    </section>
  );
};

export default TopProviders;
