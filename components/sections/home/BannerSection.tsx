"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { FaArrowRight, FaPlus } from "react-icons/fa";
import { IoMdStar } from "react-icons/io";
import { IoCheckmarkCircle, IoStar } from "react-icons/io5";
import { MdVerifiedUser } from "react-icons/md";

const BannerSection = () => {
  return (
    <div className="">
      <div className="2xl:w-350 xl:w-310 lg:w-260 w-full m-auto flex lg:flex-row flex-col justify-between items-center lg:h-150">
        {/* Left side info */}
        <div className="lg:w-[50%] lg:mx-0 mx-5 flex flex-col justify-center gap-4 lg:h-0 h-190 ">
          <h1 className=" xl:text-[65px] lg:text-[55px] md:text-[50px] text-5xl leading-none font-bold">
            Smart Way to Hire Local Service Experts
          </h1>
          <p className="text-[#4e4e4e]">
            Skip the hassle of searching. Let providers come to you, compare
            options instantly, and get your job done efficiently and
            transparently.
          </p>
          {/* Buttons */}
          <div className="flex lg:flex-row md:flex-row flex-col gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-5 py-3 flex items-center gap-2 rounded-xl cursor-pointer bg-[#F72585] text-white"
            >
              <FaPlus />
              <span>Post Request</span>
            </motion.button>
            <motion.button
              whileHover={{
                scale: 1.05,
                backgroundColor: "#F72585",
                color: "white",
              }}
              whileTap={{ scale: 0.95 }}
              className="px-5 py-3 flex items-center gap-2 rounded-xl cursor-pointer border border-[#F72585] text-black"
            >
              <span> Browse providers</span>
              <FaArrowRight />
            </motion.button>
          </div>
          {/* Success Info */}
          <div className="lg:hidden grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-2">
            <div className="flex items-center gap-1 p-2 rounded-2xl bg-[#ffdcec]">
              <MdVerifiedUser className="text-4xl text-[#F72585]" />
              <div>
                <p>530,547 +</p>
                <p>Verified Providers</p>
              </div>
            </div>
            <div className="flex items-center gap-1 p-2 rounded-2xl bg-[#ffdcec]">
              <IoStar className="text-4xl text-[#F72585]" />
              <div>
                <p>80,00 +</p>
                <p>Services Completed</p>
              </div>
            </div>
            <div className="flex items-center gap-1 p-2 rounded-2xl bg-[#ffdcec]">
              <MdVerifiedUser className="text-4xl text-[#F72585]" />
              <div>
                <p>80,00 +</p>
                <p>Reviews Globally</p>
              </div>
            </div>
          </div>
          <div></div>
        </div>
        {/* Right Side Images */}
        <div className="relative z-20 lg:w-180 h-150 hidden lg:flex justify-center items-center">
          {/* reviews */}
          <div className="absolute left-0 top-8 flex items-center gap-2 bg-[#ffdcec] p-2 rounded-xl">
            <IoMdStar className="text-4xl border rounded-full bg-amber-300 text-white p-2" />
            <div>
              <h1>4/5</h1>
              <p>(500+ reviews)</p>
            </div>
          </div>
          <div className="absolute right-0 top-7 flex items-center gap-2 bg-[#ffdcec] p-2 rounded-xl">
            <IoCheckmarkCircle className="text-[#29f022] text-xl" />
            <p className="text-[14px]">500+ Booking Completed</p>
          </div>
          {/* middle image */}
          <Image
            className="xl:w-50 lg:w-40 md:w-40 rounded-3xl absolute lg:top-12 md:top-25"
            src={"/banner/img1.jpg"}
            width={500}
            height={300}
            alt="image1"
            loading="lazy"
          />
          <Image
            className="xl:w-50 lg:w-40 md:w-28 rounded-3xl absolute top-58 xl:left-4 lg:left-12 md:left-40"
            src={"/banner/img2.png"}
            width={500}
            height={300}
            alt="image1"
            loading="lazy"
          />
          {/* first left and right image */}
          <Image
            className="xl:w-40 lg:w-40 rounded-3xl absolute xl:left-12 lg:left-12 md:left-35 top-28"
            src={"/banner/img4.jpg"}
            width={500}
            height={300}
            alt="image6"
            loading="lazy"
          />
          <Image
            className="xl:w-40 lg:w-40 md:w-32 rounded-3xl absolute right-18 xl:right-12 lg:right-12 top-28"
            src={"/banner/img7.jpg"}
            width={500}
            height={300}
            alt="image6"
            loading="lazy"
          />
          {/* second left and right image */}
          <Image
            className="xl:w-50 lg:w-40 md:w-32 rounded-3xl absolute top-58 xl:right-4 lg:right-12 md:right-35"
            src={"/banner/img3.png"}
            width={500}
            height={300}
            alt="image2"
            loading="lazy"
          />
          {/* End image */}
          <Image
            className="xl:w-50 lg:w-40 lg:flex md:hidden rounded-3xl absolute xl:bottom-25 lg:bottom-45"
            src={"/banner/img5.jpg"}
            width={500}
            height={300}
            alt="image6"
            loading="lazy"
          />
        </div>
        {/* Background color */}
        {/* <motion.div
          // initial={{
          //   opacity: 0.2,
          // }}
          className="z-10 absolute bottom-20 right-50 w-100 h-100 rounded-full bg-[#f89dc6] opacity-100 blur-[100px]"
        ></motion.div> */}
      </div>
    </div>
  );
};

export default BannerSection;
