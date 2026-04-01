"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { FaDollarSign, FaStar } from "react-icons/fa";
import { FaArrowRightLong } from "react-icons/fa6";
import { IoShieldCheckmark } from "react-icons/io5";
import { MdOutlineStarPurple500 } from "react-icons/md";

const SmartGuard = () => {
  return (
    <div className="lg:w-300 m-auto px-5 lg:px-0 lg:h-160 my-5">
      <div className="flex lg:flex-row flex-col-reverse justify-baseline items-center lg:gap-30 gap-10 pt-20 lg:pt-0">
        {/* Left side info */}
        <div className="space-y-5 lg:w-[50%]">
          <div className="mb-10">
            <p className="text-[#EF2481] font-bold mb-3">Smart Guard</p>
            <p className="text-4xl">Reliable security for your peace of mind</p>
          </div>
          <div className="flex gap-2">
            <div className="bg-[#E9237E] text-white lg:w-16 lg:h-14 w-20 h-10 rounded-full flex justify-center items-center text-2xl">
              <FaDollarSign />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-semibold">Secure Payment</h3>
              <p className="text-[#4e4e4e]">
                Only release payment when the work is completed and meets your
                full
              </p>
              <p className="text-[#E9237E] font-semibold">See more</p>
            </div>
          </div>
          <div className="flex gap-2">
            <div className="bg-[#E9237E] text-white lg:w-19 lg:h-14 w-20 h-10 rounded-full flex justify-center items-center text-2xl">
              <FaStar />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-semibold">
                Trusted ratings and reviews
              </h3>
              <p className="text-[#4e4e4e]">
                Choose the right person for your task based on real ratings and
                user reviews
              </p>
              <p className="text-[#E9237E] font-semibold">See more</p>
            </div>
          </div>
          <div className="flex gap-2">
            <div className="bg-[#E9237E] text-white lg:w-19 lg:h-14 w-20 h-10 rounded-full flex justify-center items-center text-2xl">
              <IoShieldCheckmark />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-semibold">
                Insurance for peace of mind
              </h3>
              <p className="text-[#4e4e4e]">
                Release payment only once the task has been completed to your
                full satisfaction
              </p>
              <p className="text-[#E9237E] font-semibold">See more</p>
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-5 py-3 flex items-center gap-2 rounded-xl cursor-pointer bg-[#F72585] text-white"
          >
            <span>Post your task for free</span>
            <FaArrowRightLong />
          </motion.button>
        </div>
        {/* Right side image and design */}
        <div className="lg:w-[50%] relative">
          <div className="absolute -top-10 right-0 flex items-center gap-3 bg-[#ffdcec] w-64 p-3 rounded-2xl">
            <Image
              className="w-20 h-20 border border-[#EF2481] rounded-full"
              src={"/smart_guard/img2.jpg"}
              width={500}
              height={300}
              alt="Image"
            />
            <div>
              <div className="flex items-center gap-2 text-2xl font-bold">
                <p>4.5</p>
                <MdOutlineStarPurple500 className="text-[#FB9C00]" />
              </div>
              <p>Over all rating</p>
            </div>
          </div>
          <Image
            className="w-full lg:h-160 rounded-2xl lg:pr-10"
            src={"/smart_guard/img1.jpeg"}
            width={500}
            height={300}
            alt="image"
          />
        </div>
      </div>
    </div>
  );
};

export default SmartGuard;
