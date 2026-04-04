"use client";

import { motion } from "motion/react";
import { FaInstagram, FaLinkedinIn, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-pastel_pink">
      <div className="2xl:w-350 xl:w-310 lg:w-260 w-full m-auto  pt-10">
        {/* First Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 lg:grid-cols-4 gap-10">
          {/* Left: Name + Description + Socials */}
          <div className="space-y-3">
            <h1 className="text-3xl text-pink font-bold">Fixly</h1>
            <p className="text-charcoal">
              Bangladeshs trusted home services marketplace. Connecting skilled
              professionals with homeowners since 2023.
            </p>
            {/* Social icons */}
            <div className="flex items-center gap-3">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-10 h-10 rounded-full text-white bg-pink flex justify-center items-center cursor-pointer"
              >
                <FaLinkedinIn />
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-10 h-10 rounded-full text-white bg-pink flex justify-center items-center cursor-pointer"
              >
                <FaTwitter />
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-10 h-10 rounded-full text-white bg-pink flex justify-center items-center cursor-pointer"
              >
                <FaInstagram />
              </motion.div>
            </div>
          </div>
          {/* Services */}
          <div className="space-y-2">
            <h3 className="text-xl text-charcoal">Services</h3>
            <p className="text-[15px] cursor-pointer">Post a Request</p>
            <p className="text-[15px] cursor-pointer">Browse Providers</p>
            <p className="text-[15px] cursor-pointer">Emergency Service</p>
            <p className="text-[15px] cursor-pointer">Pricing</p>
          </div>
          {/* Company info */}
          <div>
            <div className="space-y-2">
              <h3 className="text-xl text-charcoal">Company</h3>
              <p className="text-[15px] cursor-pointer">About Fixly</p>
              <p className="text-[15px] cursor-pointer">Blog</p>
              <p className="text-[15px] cursor-pointer">Careers</p>
              <p className="text-[15px] cursor-pointer">Press</p>
            </div>
          </div>
          {/* Support info */}
          <div>
            <div className="space-y-2">
              <h3 className="text-xl text-charcoal">Support</h3>
              <p className="text-[15px] cursor-pointer">Help Center</p>
              <p className="text-[15px] cursor-pointer">Safety</p>
              <p className="text-[15px] cursor-pointer">Terms</p>
              <p className="text-[15px] cursor-pointer">Privacy</p>
            </div>
          </div>
        </div>
        {/* Last Content */}
        <div className="flex justify-between items-center my-5 pt-5 border-t border-[#c5c5c5bb]">
          <p className="text-charcoal">
            © 2026 Fixly Bangladesh. All rights reserved.
          </p>
          <p className="text-charcoal">
            Made with care for homeowners everywhere 🇧🇩
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
