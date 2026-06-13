'use client';

import { motion } from 'motion/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import Image from 'next/image';
import { HiOutlineStar } from 'react-icons/hi2';
import { GoDotFill } from 'react-icons/go';
import type { Review } from '../../../../types/Review';

import './Testimonial.css';

const testimonialData: Review[] = [
  {
    name: 'Rahim Ahmed',
    location: 'Dhaka, Bangladesh',
    review:
      'I had a really great experience using this platform. It is very easy to navigate and I was able to find the right service provider within a short time. The communication system works smoothly and everything felt very professional. I will definitely use this again in the future.',
    rating: 5,
    image: 'https://i.pravatar.cc/150?img=1',
  },
  {
    name: 'Nusrat Jahan',
    location: 'Chittagong, Bangladesh',
    review:
      'Overall, this is a very reliable and user-friendly platform. I liked how easily I could compare different service providers and choose the best one. The payment system also felt secure and transparent. A little improvement in notification speed would make it perfect.',
    rating: 4,
    image: 'https://i.pravatar.cc/150?img=2',
  },
  {
    name: 'Tanvir Hasan',
    location: 'Sylhet, Bangladesh',
    review:
      'The platform is quite good and helpful for finding local services. I managed to complete my task without any major issues. However, sometimes the response time from providers was a bit slow. If that improves, this platform can become one of the best in its category.',
    rating: 4,
    image: 'https://i.pravatar.cc/150?img=3',
  },
  {
    name: 'Sadia Islam',
    location: 'Khulna, Bangladesh',
    review:
      'I really loved the overall design and user experience of this platform. Everything feels clean, modern, and easy to understand. I quickly found a trusted person for my work and the process was very smooth. Highly recommended for anyone looking for reliable services.',
    rating: 5,
    image: 'https://i.pravatar.cc/150?img=4',
  },
  {
    name: 'Imran Hossain',
    location: 'Rajshahi, Bangladesh',
    review:
      'The service is decent and works as expected. I was able to find someone for my task, but there is still room for improvement in terms of speed and feature richness. With a few updates, this platform can become much more powerful and user-friendly.',
    rating: 3,
    image: 'https://i.pravatar.cc/150?img=5',
  },
  {
    name: 'Fatima Begum',
    location: 'Barisal, Bangladesh',
    review:
      'I was hesitant at first, but the experience exceeded my expectations. The plumber I hired was punctual, skilled, and reasonably priced. The platform made the entire process from booking to payment completely hassle-free. Highly recommended!',
    rating: 5,
    image: 'https://i.pravatar.cc/150?img=6',
  },
];

const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex items-center gap-0.5">
    {Array.from({ length: 5 }).map((_, i) => (
      <HiOutlineStar
        key={i}
        className={`size-4 ${
          i < rating ? 'fill-amber-400 text-amber-400' : 'text-gray-200'
        }`}
      />
    ))}
  </div>
);

const Testimonial = () => {
  return (
    <section className="relative overflow-hidden py-16 lg:py-24">
      {/* Background decorative elements */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -right-40 -top-40 size-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 size-80 rounded-full bg-primary-light/30 blur-3xl" />
        <div className="absolute right-1/4 top-1/3 hidden lg:block">
          <GoDotFill className="size-2 text-primary/20" />
        </div>
        <div className="absolute left-1/3 bottom-1/4 hidden lg:block">
          <GoDotFill className="size-3 text-primary/15" />
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        {/* Section header */}
        <div className="mx-auto mb-12 max-w-2xl text-center lg:mb-14">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-block rounded-full border border-primary/20 bg-primary-light/50 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary"
          >
            Testimonials
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
          >
            What our users say
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="mt-3 text-base leading-relaxed text-text-body"
          >
            Thousands of satisfied customers across Bangladesh trust Fixly for
            their home service needs.
          </motion.p>
        </div>

        {/* Carousel */}
        <Swiper
          modules={[Autoplay, Pagination]}
          slidesPerView={1}
          spaceBetween={16}
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          loop
          breakpoints={{
            640: { slidesPerView: 2, spaceBetween: 20 },
            1024: { slidesPerView: 3, spaceBetween: 24 },
          }}
          className="testimonial-pagination"
        >
          {testimonialData.map((review, index) => (
            <SwiperSlide key={index} className="h-auto py-2">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-20px' }}
                transition={{ duration: 0.4, delay: index * 0.06 }}
                className="group relative flex h-full flex-col rounded-2xl border border-gray-100 bg-white p-6 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-primary/20 hover:shadow-lg"
              >
                {/* Review text */}
                <p className="flex-1 text-sm leading-relaxed text-text-body">
                  &ldquo;{review.review.slice(0, 400)}&rdquo;
                </p>

                {/* Rating */}
                <div className="mt-5">
                  <StarRating rating={review.rating} />
                </div>

                {/* Author */}
                <div className="mt-4 flex items-center gap-3">
                  <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full">
                    <Image
                      className="object-cover"
                      src={review.image}
                      fill
                      sizes="40px"
                      alt={review.name}
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-gray-900">
                      {review.name}
                    </p>
                    <p className="truncate text-xs text-text-body">
                      {review.location}
                    </p>
                  </div>
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Testimonial;
