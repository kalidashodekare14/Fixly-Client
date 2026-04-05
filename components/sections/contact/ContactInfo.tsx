"use client";

import { FaLocationDot } from "react-icons/fa6";
import { IoCall } from "react-icons/io5";
import { MdEmail } from "react-icons/md";

const ContactInfo = () => {
  return (
    <div className="2xl:w-350 xl:w-310 lg:w-260 w-full m-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 my-10">
        {/* Email Info */}
        <div className="flex flex-col justify-center items-center gap-2 rounded-2xl border border-[#bbbb] p-5">
          <div className="w-16 h-16 rounded-full text-2xl font-bold text-pink bg-pastel_pink flex justify-center items-center">
            <IoCall />
          </div>
          <h1 className="text-xl font-bold">Contact Us</h1>
          <p>+8801758475895</p>
        </div>
        {/* Phone Info */}
        <div className="flex flex-col justify-center items-center gap-2 rounded-2xl border border-[#bbbb] p-5">
          <div className="w-16 h-16 rounded-full text-2xl font-bold text-pink bg-pastel_pink flex justify-center items-center">
            <MdEmail />
          </div>
          <h1 className="text-xl font-bold">Chat to support</h1>
          <p>fixly@gmail.com</p>
        </div>
        {/* Address Info */}
        <div className="flex flex-col justify-center items-center gap-2 rounded-2xl border border-[#bbbb] p-5">
          <div className="w-16 h-16 rounded-full text-2xl font-bold text-pink bg-pastel_pink flex justify-center items-center">
            <FaLocationDot />
          </div>
          <h1 className="text-xl font-bold">Location</h1>
          <p>Dhaka, Bangladesh</p>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
