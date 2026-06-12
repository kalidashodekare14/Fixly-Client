'use client';

import { motion, type Variants } from 'motion/react';
import { FiPhone, FiMail, FiMapPin, FiArrowRight } from 'react-icons/fi';

const contactMethods = [
  {
    icon: FiPhone,
    title: 'Phone',
    value: '+8801758475895',
    desc: 'Mon–Fri, 9am–6pm',
    href: 'tel:+8801758475895',
  },
  {
    icon: FiMail,
    title: 'Email',
    value: 'fixly@gmail.com',
    desc: 'We reply within 24 hours',
    href: 'mailto:fixly@gmail.com',
  },
  {
    icon: FiMapPin,
    title: 'Office',
    value: 'Dhaka, Bangladesh',
    desc: 'Visit us anytime',
    href: 'https://maps.google.com',
  },
] as const;

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.05 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const ContactInfo = () => {
  return (
    <section className="relative py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center lg:mb-16"
        >
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
            Multiple Ways to Reach Us
          </h2>
          <p className="mt-4 text-lg text-text-body/70">
            Choose your preferred method to get in touch with our team
          </p>
        </motion.div>

        {/* Contact Cards Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={containerVariants}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {contactMethods.map((item) => {
            const Icon = item.icon;
            return (
              <motion.a
                key={item.title}
                href={item.href}
                target={item.title === 'Office' ? '_blank' : undefined}
                rel={
                  item.title === 'Office' ? 'noopener noreferrer' : undefined
                }
                variants={cardVariants}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="group relative"
              >
                {/* Animated gradient background */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-primary-light/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                {/* Card border with gradient */}
                <div className="absolute inset-0 rounded-2xl border border-transparent bg-gradient-to-br from-primary/20 to-primary-light/10 opacity-0 p-0.5 transition-opacity duration-300 group-hover:opacity-100">
                  <div className="absolute inset-0 rounded-2xl bg-white" />
                </div>

                {/* Card Content */}
                <div className="relative overflow-hidden rounded-2xl border border-primary/10 bg-white p-6 shadow-sm transition-all duration-300 group-hover:shadow-xl sm:p-8">
                  {/* Top gradient accent - animated on hover */}
                  <motion.div
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-x-0 top-0 h-1.5 origin-left bg-gradient-to-r from-primary to-primary/40"
                  />

                  <div className="flex flex-col items-center gap-4 text-center">
                    {/* Icon Container with animation */}
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                      className="flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-primary-light to-primary/5 text-2xl text-primary transition-all duration-300 group-hover:from-primary group-hover:to-primary/80 group-hover:text-white group-hover:shadow-lg"
                    >
                      <Icon />
                    </motion.div>

                    {/* Text Content */}
                    <div className="space-y-2">
                      <h3 className="text-lg font-bold text-gray-900">
                        {item.title}
                      </h3>
                      <p className="font-semibold text-primary transition-colors duration-300 group-hover:text-primary/80">
                        {item.value}
                      </p>
                      <p className="text-sm text-text-body/60 transition-colors duration-300 group-hover:text-text-body/80">
                        {item.desc}
                      </p>
                    </div>

                    {/* Arrow indicator - appears on hover */}
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      whileHover={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.2 }}
                      className="mt-2 flex items-center gap-1 text-sm font-medium text-primary"
                    >
                      Contact now <FiArrowRight className="text-base" />
                    </motion.div>
                  </div>
                </div>
              </motion.a>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default ContactInfo;
