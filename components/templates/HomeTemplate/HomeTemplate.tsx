"use client";

import BannerSection from "@/components/sections/home/BannerSection";
import CategorySection from "@/components/sections/home/CategorySection";
import GetServices from "@/components/sections/home/GetServices";
import OurAchievements from "@/components/sections/home/OurAchievements";
import SmartGuard from "@/components/sections/home/SmartGuard";

const HomeTemplate = () => {
  return (
    <div>
      <BannerSection />
      <GetServices />
      <CategorySection />
      <SmartGuard />
      <OurAchievements />
    </div>
  );
};

export default HomeTemplate;
