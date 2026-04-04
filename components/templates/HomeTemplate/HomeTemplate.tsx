"use client";

import BannerSection from "@/components/sections/home/BannerSection";
import CategorySection from "@/components/sections/home/CategorySection";
import GetServices from "@/components/sections/home/GetServices";
import GetStarted from "@/components/sections/home/GetStarted";
import OurAchievements from "@/components/sections/home/OurAchievements";
import SmartGuard from "@/components/sections/home/SmartGuard";
import Testimonial from "@/components/sections/home/Testimonial";
import TopProviders from "@/components/sections/home/TopProviders";

const HomeTemplate = () => {
  return (
    <div>
      <BannerSection />
      <GetServices />
      <CategorySection />
      <SmartGuard />
      <TopProviders />
      <OurAchievements />
      <Testimonial />
      <GetStarted />
    </div>
  );
};

export default HomeTemplate;
