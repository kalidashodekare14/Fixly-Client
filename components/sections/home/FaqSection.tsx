'use client';

import { motion } from 'motion/react';
import Image from 'next/image';
import { FaHandshake, FaHeadset } from 'react-icons/fa6';
import { MdOutlineStarPurple500 } from 'react-icons/md';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { cn } from '@/lib/utils';
import { FaCheckCircle, FaShieldAlt } from 'react-icons/fa';

const faqs = [
  {
    value: 'offers',
    icon: FaHandshake,
    q: 'How do offers work?',
    a: 'When you post a task, nearby verified providers will review your request and submit competitive offers with their pricing and availability. You can compare offers side by side — including price, ratings, and past work — then choose the provider that best fits your needs. Payment is released only after the job is completed to your satisfaction.',
  },
  {
    value: 'free',
    icon: FaCheckCircle,
    q: 'Is Fixly free?',
    a: 'Yes, creating an account and posting a task is completely free for customers. You only pay when you accept an offer and the work is completed. Providers may have service fees or subscription options to access premium features and receive more job opportunities.',
  },
  {
    value: 'verified',
    icon: FaShieldAlt,
    q: 'How are providers verified?',
    a: 'Every provider on Fixly goes through a thorough verification process. This includes identity verification, background checks, license and certification validation, and review of their work history. We also monitor ratings and feedback to maintain quality standards across our platform.',
  },
  {
    value: 'satisfied',
    icon: FaHeadset,
    q: "What happens if I'm not satisfied?",
    a: "Your satisfaction is our priority. If the work doesn't meet the agreed-upon standards, you can raise a dispute through our resolution center. Our support team will review the case and work with both parties to find a fair solution. We also offer protection policies to ensure you're covered.",
  },
];

const FaqSection = () => {
  return (
    <section className="relative overflow-hidden py-16 lg:py-24">
      {/* Background decoration */}
      <div className="absolute -left-48 top-1/4 h-96 w-96 -translate-y-1/2 rounded-full bg-primary-light/30 blur-3xl" />
      <div className="absolute -right-48 bottom-0 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />

      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="flex flex-col items-center gap-14 lg:flex-row lg:gap-16">
          {/* ─── Left: FAQ Content ─── */}
          <div className="w-full lg:w-[55%]">
            {/* Section header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-block rounded-full border border-primary/20 bg-primary-light/50 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
                FAQ
              </span>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Frequently asked questions
              </h2>
              <p className="mt-3 text-base leading-relaxed text-text-body">
                Everything you need to know about how Fixly works.
              </p>
            </motion.div>

            {/* Accordion */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="mt-8"
            >
              <Accordion
                defaultValue={['offers']}
                className="rounded-2xl border border-gray-100 bg-white shadow-sm"
              >
                {faqs.map((faq, index) => {
                  const Icon = faq.icon;
                  return (
                    <AccordionItem
                      key={faq.value}
                      value={faq.value}
                      className={cn(
                        'not-last:border-b border-gray-100',
                        index === 0 && 'rounded-t-2xl overflow-hidden',
                        index === faqs.length - 1 &&
                          'rounded-b-2xl overflow-hidden'
                      )}
                    >
                      <AccordionTrigger className="group flex items-center gap-3 px-6 py-5 text-base font-semibold text-gray-900 hover:no-underline hover:bg-primary-light/30 transition-colors data-open:bg-primary-light/30">
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary-light text-sm text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                          <Icon />
                        </span>
                        {faq.q}
                      </AccordionTrigger>
                      <AccordionContent className="px-6 pb-5 pl-18 text-text-body leading-relaxed">
                        {faq.a}
                      </AccordionContent>
                    </AccordionItem>
                  );
                })}
              </Accordion>
            </motion.div>

            {/* Bottom CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-8 text-left"
            >
              <p className="text-sm text-text-body">
                Still have questions?{' '}
                <span className="cursor-pointer font-semibold text-primary hover:underline">
                  Contact support
                </span>
              </p>
            </motion.div>
          </div>

          {/* ─── Right: Dual Images + Floating Card ─── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative w-full lg:w-[40%]"
          >
            {/* Glow behind */}
            <div className="absolute -inset-4 rounded-[2rem] bg-linear-to-br from-primary/10 to-primary-light/50 blur-3xl" />

            {/* Main image */}
            <div className="relative">
              <Image
                className="w-full rounded-2xl object-cover shadow-lg"
                src="/home/img1.jpg"
                width={500}
                height={600}
                alt="Fixly support"
              />

              {/* Polaroid-style floating image */}
              <motion.div
                initial={{ opacity: 0, y: -20, rotate: -6, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, rotate: -6, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.25 }}
                className="absolute -top-4 -right-4 z-20 rounded-lg border-4 border-white shadow-xl"
              >
                <Image
                  className="block h-28 w-28 object-cover md:h-32 md:w-32"
                  src="/home/img2.jpg"
                  width={128}
                  height={128}
                  alt="Fixly team"
                />
              </motion.div>
            </div>

            {/* Floating support card */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.4 }}
              className="absolute -bottom-6 -left-4 z-10 rounded-xl border border-white/60 bg-white/90 px-5 py-3.5 shadow-xl backdrop-blur-sm"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary text-white shadow-sm">
                  <FaHeadset className="text-lg" />
                </span>
                <div>
                  <p className="text-sm font-bold text-gray-900">
                    24/7 Support
                  </p>
                  <p className="flex items-center gap-1 text-xs text-text-body">
                    <MdOutlineStarPurple500 className="text-amber-400" />
                    Avg. response: 2 min
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
