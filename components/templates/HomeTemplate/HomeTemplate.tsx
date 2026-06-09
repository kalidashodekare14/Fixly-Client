'use client';

import BannerSection from '@/components/sections/home/BannerSection';
import CategorySection from '@/components/sections/home/CategorySection';
import FaqSection from '@/components/sections/home/FaqSection';
import GetServices from '@/components/sections/home/GetServices';
import GetStarted from '@/components/sections/home/GetStarted';
import OurAchievements from '@/components/sections/home/OurAchievements';
import SmartGuard from '@/components/sections/home/SmartGuard';
import SubscribeSection from '@/components/sections/home/SubscribeSection';
import SuccessInfo from '@/components/sections/home/SuccessInfo';
import Testimonial from '@/components/sections/home/Testimonial/Testimonial';
import TopProviders from '@/components/sections/home/TopProviders/TopProviders';

const HomeTemplate = () => {
  return (
    <div>
      <BannerSection />
      <SuccessInfo />
      <GetServices />
      <CategorySection />
      <SmartGuard />
      <TopProviders />
      <OurAchievements />
      <FaqSection />
      <Testimonial />
      <SubscribeSection />
      <GetStarted />
    </div>
  );
};

export default HomeTemplate;
