"use client";

import OurAbout from "@/components/sections/about/OurAbout";
import GetServices from "@/components/sections/home/GetServices";
import SmartGuard from "@/components/sections/home/SmartGuard";
import Testimonial from "@/components/sections/home/Testimonial";
import HeaderSection from "@/components/shared/HeaderSection";

const AboutTemplate = () => {
  return (
    <div>
      <HeaderSection title="About Us" />
      <OurAbout />
      <GetServices />
      <SmartGuard />
      <Testimonial />
    </div>
  );
};

export default AboutTemplate;
