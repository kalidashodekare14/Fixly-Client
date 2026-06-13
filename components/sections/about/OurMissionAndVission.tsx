'use client';

import { motion } from 'motion/react';
import { MdOutlineRocketLaunch, MdOutlineVisibility } from 'react-icons/md';
import { TbTargetArrow } from 'react-icons/tb';

const missionVision = [
  {
    icon: MdOutlineVisibility,
    title: 'Our Vision',
    desc: 'A world where every home service need is met with a tap — creating stress-free living for every household.',
  },
  {
    icon: TbTargetArrow,
    title: 'Our Mission',
    desc: 'Empower local service professionals with tools to grow their business while providing homeowners with trusted, on-demand solutions.',
  },
  {
    icon: MdOutlineRocketLaunch,
    title: 'Our Promise',
    desc: 'Quality work, transparent pricing, and a satisfaction guarantee on every single job booked through our platform.',
  },
];

const OurMissionAndVission = () => {
  return (
    <section className="bg-primary/5 py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-block rounded-full border border-primary/20 bg-primary-light/50 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary"
          >
            What Drives Us
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
          >
            Our mission, vision & promise
          </motion.h2>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {missionVision.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="rounded-2xl border border-gray-100 bg-white p-8 text-center shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-primary-light/50 text-primary">
                <item.icon className="text-2xl" />
              </div>
              <h3 className="mt-5 text-xl font-semibold text-gray-900">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-text-body">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurMissionAndVission;
