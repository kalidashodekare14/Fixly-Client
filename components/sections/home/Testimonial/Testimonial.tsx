'use client';

import { motion } from 'motion/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import { Rating } from '@smastrom/react-rating';
import '@smastrom/react-rating/style.css';
import Image from 'next/image';
import { HiOutlineStar } from 'react-icons/hi2';
import type { Review } from '../../../../types/Review';

// custom css
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
];

const Testimonial = () => {
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
            className="mb-4 inline-block rounded-full border border-pink/20 bg-pastel_pink/50 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-pink"
          >
            Reviews
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
          >
            What our users say
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-4 text-base leading-relaxed text-charcoal"
          >
            Thousands of satisfied customers across Bangladesh trust Fixly for
            their home service needs.
          </motion.p>
        </div>

        {/* Carousel */}

        <Swiper
          modules={[Pagination]}
          slidesPerView={1}
          spaceBetween={16}
          pagination={{ clickable: true }}
          breakpoints={{
            640: { slidesPerView: 2, spaceBetween: 20 },
            1024: { slidesPerView: 2, spaceBetween: 24 },
          }}
          className="testimonial-pagination"
        >
          {testimonialData.map((review, index) => (
            <SwiperSlide key={index} className="h-auto py-2">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-20px' }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="relative flex h-full flex-col rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
              >
                {/* Quote icon */}
                <div className="mb-4 text-pink/20">
                  <HiOutlineStar className="h-8 w-8" />
                </div>

                {/* Review text */}
                <p className="flex-1 text-sm leading-relaxed text-charcoal">
                  &ldquo;{review.review.slice(0, 400)}&rdquo;
                </p>

                {/* Rating */}
                <div className="mt-5">
                  <Rating
                    style={{ maxWidth: 100 }}
                    value={review.rating}
                    readOnly
                  />
                </div>

                {/* Author */}
                <div className="mt-5 flex items-center gap-3 border-t border-gray-100 pt-4">
                  <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full">
                    <Image
                      className="object-cover"
                      src={review.image}
                      fill
                      sizes="44px"
                      alt={review.name}
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-bold text-gray-900">
                      {review.name}
                    </p>
                    <p className="truncate text-xs text-charcoal">
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
