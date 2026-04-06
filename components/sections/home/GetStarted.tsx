"use client";

import { motion } from "motion/react";
import Link from "next/link";

const GetStarted = () => {
  return (
    <div className="2xl:w-350 xl:w-310 lg:w-260 w-full m-auto px-5 lg:px-0 bg-pastel_pink lg:rounded-2xl py-20 flex lg:flex-row flex-col justify-around items-center my-10">
      <div className="space-y-3">
        <h1 className="text-3xl font-bold">Ready to get started?</h1>
        <p className="text-charcoal">
          Join 50,000+ users who already simplified how they hire home services.
        </p>
      </div>
      <div className="space-x-3">
        <Link href={"/signin"}>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn w-40 h-10 border border-pink text-black rounded-xl cursor-pointer"
          >
            Login
          </motion.button>
        </Link>
        <Link href={"/signin"}>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn w-40 h-10 bg-pink border-0 text-white rounded-xl cursor-pointer"
          >
            Get Started
          </motion.button>
        </Link>
      </div>
    </div>
  );
};

export default GetStarted;
