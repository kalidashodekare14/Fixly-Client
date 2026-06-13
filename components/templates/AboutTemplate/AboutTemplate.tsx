'use client';

import OurAbout from '@/components/sections/about/OurAbout';
import OurMissionAndVission from '@/components/sections/about/OurMissionAndVission';
import OurStory from '@/components/sections/about/OurStory';
import ReadyToGet from '@/components/sections/about/ReadyToGet';
import GetServices from '@/components/sections/home/GetServices';
import SmartGuard from '@/components/sections/home/SmartGuard';
import SuccessInfo from '@/components/sections/home/SuccessInfo';
import Testimonial from '@/components/sections/home/Testimonial/Testimonial';
import WhyChoose from '@/components/sections/home/WhyChoose';
import HeaderSection from '@/components/shared/HeaderSection/HeaderSection';

const AboutTemplate = () => {
  return (
    <div>
      <HeaderSection title="About Us" />
      <OurAbout />
      <SuccessInfo />
      <OurStory />
      <OurMissionAndVission />
      <GetServices />
      <WhyChoose />
      <SmartGuard />
      <ReadyToGet />
      <Testimonial />
    </div>
  );
};

export default AboutTemplate;
