"use client";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
// import required modules
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import Image from "next/image";
import { Pagination } from "swiper/modules";
import type { Review } from "../../../types/Review";

const testimonialData: Review[] = [
  {
    name: "Rahim Ahmed",
    location: "Dhaka, Bangladesh",
    review:
      "I had a really great experience using this platform. It is very easy to navigate and I was able to find the right service provider within a short time. The communication system works smoothly and everything felt very professional. I will definitely use this again in the future.",
    rating: 5,
    image: "https://i.pravatar.cc/150?img=1",
  },
  {
    name: "Nusrat Jahan",
    location: "Chittagong, Bangladesh",
    review:
      "Overall, this is a very reliable and user-friendly platform. I liked how easily I could compare different service providers and choose the best one. The payment system also felt secure and transparent. A little improvement in notification speed would make it perfect.",
    rating: 4,
    image: "https://i.pravatar.cc/150?img=2",
  },
  {
    name: "Tanvir Hasan",
    location: "Sylhet, Bangladesh",
    review:
      "The platform is quite good and helpful for finding local services. I managed to complete my task without any major issues. However, sometimes the response time from providers was a bit slow. If that improves, this platform can become one of the best in its category.",
    rating: 4,
    image: "https://i.pravatar.cc/150?img=3",
  },
  {
    name: "Sadia Islam",
    location: "Khulna, Bangladesh",
    review:
      "I really loved the overall design and user experience of this platform. Everything feels clean, modern, and easy to understand. I quickly found a trusted person for my work and the process was very smooth. Highly recommended for anyone looking for reliable services.",
    rating: 5,
    image: "https://i.pravatar.cc/150?img=4",
  },
  {
    name: "Imran Hossain",
    location: "Rajshahi, Bangladesh",
    review:
      "The service is decent and works as expected. I was able to find someone for my task, but there is still room for improvement in terms of speed and feature richness. With a few updates, this platform can become much more powerful and user-friendly.",
    rating: 3,
    image: "https://i.pravatar.cc/150?img=5",
  },
];

const Testimonial = () => {
  return (
    <div className="2xl:w-350 xl:w-310 lg:w-260 w-full m-auto px-5 lg:px-0 py-10">
      <div className="space-y-3 lg:w-150">
        <p className="text-[#F72585] font-semibold">Reviews</p>
        <h1 className="text-3xl font-bold">What our users say</h1>
        <p className="text-charcoal">
          Thousands of satisfied customers across Bangladesh trust Fixly for
          their home service needs.
        </p>
      </div>
      <div>
        <Swiper
          slidesPerView={1}
          spaceBetween={10}
          pagination={{
            clickable: true,
          }}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 30,
            },
            1024: {
              slidesPerView: 2,
              spaceBetween: 30,
            },
          }}
          modules={[Pagination]}
          className="mySwiper"
        >
          {testimonialData.map((review, index) => (
            <SwiperSlide key={index}>
              <div className=" border border-[#e7e7e7bb] shadow p-5 rounded-2xl space-y-4 mt-10">
                <div className="flex items-center gap-3">
                  <Image
                    className="w-14 rounded-full"
                    src={review.image}
                    width={500}
                    height={300}
                    alt="image"
                  />
                  <div>
                    <h1 className="text-xl font-bold">{review.name}</h1>
                    <p className="text-charcoal">{review.location}</p>
                  </div>
                </div>
                <Rating style={{ maxWidth: 140 }} value={3} readOnly />
                <p className=" text-charcoal leading-8">
                  {review.review.slice(0, 400)}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Testimonial;
