'use client';

import { motion } from 'motion/react';
import Image from 'next/image';
import { useState } from 'react';

const steps = {
  customer: [
    {
      num: '01',
      title: 'Send Post Request',
      desc: 'Post a service request with job details, your location, and estimated budget. Takes under 2 minutes.',
    },
    {
      num: '02',
      title: 'Receive offers',
      desc: 'Nearby verified providers review your request and submit competitive offers with pricing and availability.',
    },
    {
      num: '03',
      title: 'Compare & choose',
      desc: 'Compare offers side by side — price, ratings, past work. Pick the provider who best fits your needs.',
    },
    {
      num: '04',
      title: 'Job done, review',
      desc: 'Your provider completes the job. Pay securely through the platform and leave an honest review.',
    },
  ],
  provider: [
    {
      num: '01',
      title: 'Create your profile',
      desc: 'Sign up, add your services, set your service area, and upload your certifications and past work.',
    },
    {
      num: '02',
      title: 'Get notified',
      desc: 'Receive real-time alerts for new job requests in your area matching your service categories.',
    },
    {
      num: '03',
      title: 'Submit your offer',
      desc: 'Respond with your price, timeline, and a short message about your approach to win the job.',
    },
    {
      num: '04',
      title: 'Complete & get paid',
      desc: 'Do great work, collect payment, and build your reputation with verified customer reviews.',
    },
  ],
} as const;

const GetServices = () => {
  const [toggle, setToggle] = useState<'customer' | 'provider'>('customer');

  const currentSteps = steps[toggle];

  return (
    <section className="relative overflow-hidden py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        {/* Section header */}
        <div className="mx-auto mb-12 max-w-2xl text-center lg:mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-4 inline-block rounded-full border border-pink/20 bg-pastel_pink/50 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-pink"
          >
            How it works
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
          >
            Two ways to get help
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-4 text-base leading-relaxed text-charcoal"
          >
            Whether you want to receive competing offers or hire directly, Fixly
            makes it easy.
          </motion.p>
        </div>

        {/* Toggle buttons */}
        <div className="mb-10 flex justify-center">
          <div className="inline-flex rounded-xl border border-gray-200 bg-white p-1 shadow-xs">
            {(['customer', 'provider'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setToggle(tab)}
                className={`relative rounded-lg px-5 py-2.5 text-sm font-medium transition-colors duration-200 ${
                  toggle === tab
                    ? 'text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {toggle === tab && (
                  <motion.span
                    layoutId="activeTab"
                    className="absolute inset-0 rounded-lg bg-pink"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">
                  {tab === 'customer'
                    ? 'For Customers'
                    : 'For Service Providers'}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-center gap-16 lg:flex-row">
          {/* Steps list */}
          <div className="w-full space-y-6 lg:w-[55%]">
            {currentSteps.map((step, index) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="group cursor-default rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="flex items-start gap-4">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-pastel_pink text-lg font-bold text-pink">
                    {step.num}
                  </span>
                  <div className="space-y-1.5">
                    <h3 className="text-lg font-bold text-gray-900">
                      {step.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-charcoal">
                      {step.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hidden w-full lg:flex lg:w-[40%]"
          >
            <div className="relative">
              <div className="absolute -inset-4 rounded-3xl bg-linear-to-br from-pink/10 to-pastel_pink/50 blur-2xl" />
              <Image
                className="relative rounded-2xl object-cover shadow-lg"
                src="/works/img1.jpg"
                width={500}
                height={600}
                alt="Fixly platform preview"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default GetServices;
