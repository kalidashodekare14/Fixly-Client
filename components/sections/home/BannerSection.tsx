"use client";

import Image from "next/image";
import { FaArrowRight, FaPlus } from "react-icons/fa";
import { IoMdStar } from "react-icons/io";
import { IoCheckmarkCircle, IoStar } from "react-icons/io5";
import { MdVerifiedUser } from "react-icons/md";

const BannerSection = () => {
  return (
    <div className="lg:w-300 m-auto flex lg:flex-row flex-col justify-between items-center lg:h-160">
      {/* Left side info */}
      <div className="lg:w-[50%] lg:mx-0 mx-5 flex flex-col justify-center gap-4 lg:h-0 h-190 ">
        <h1 className="lg:text-[65px] md:text-[50px] text-5xl leading-none font-bold">
          Smart Way to Hire Local Service Experts
        </h1>
        <p className="">
          Skip the hassle of searching. Let providers come to you, compare
          options instantly, and get your job done efficiently and
          transparently.
        </p>
        {/* Buttons */}
        <div className="flex lg:flex-row md:flex-row flex-col gap-4">
          <button className="px-5 py-3 flex items-center gap-2 rounded-xl cursor-pointer bg-[#F72585] text-white">
            <FaPlus />
            <span>Post Request</span>
          </button>
          <button className="px-5 py-3 flex items-center gap-2 rounded-xl cursor-pointer border border-[#F72585] text-black">
            <span> Browse providers</span>
            <FaArrowRight />
          </button>
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
      <div className="relative  lg:w-180 h-150 hidden lg:flex justify-center items-center">
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
        <Image
          className="lg:w-50 md:w-40 rounded-3xl absolute lg:top-12 md:top-25"
          src={"/banner/img1.jpg"}
          width={500}
          height={300}
          alt="image1"
          loading="lazy"
        />
        <Image
          className="lg:w-50 md:w-28 rounded-3xl absolute top-58 lg:left-4 md:left-40"
          src={"/banner/img2.png"}
          width={500}
          height={300}
          alt="image1"
          loading="lazy"
        />
        <Image
          className="lg:w-50 md:w-32 rounded-3xl absolute top-58 lg:right-4 md:right-35"
          src={"/banner/img3.png"}
          width={500}
          height={300}
          alt="image2"
          loading="lazy"
        />
        <Image
          className="lg:w-50 lg:flex md:hidden rounded-3xl absolute bottom-55 lg:bottom-23"
          src={"/banner/img5.jpg"}
          width={500}
          height={300}
          alt="image6"
          loading="lazy"
        />
        <Image
          className="lg:w-35 md:w-32 rounded-3xl absolute lg:left-18 md:left-35 top-28"
          src={"/banner/img4.jpg"}
          width={500}
          height={300}
          alt="image6"
          loading="lazy"
        />
        <Image
          className="lg:w-35 md:w-32 rounded-3xl absolute right-18 top-28"
          src={"/banner/img7.jpg"}
          width={500}
          height={300}
          alt="image6"
          loading="lazy"
        />
      </div>
    </div>
  );
};

export default BannerSection;
