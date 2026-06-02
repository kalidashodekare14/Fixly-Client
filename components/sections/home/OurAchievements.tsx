"use client";

import { motion } from "motion/react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const achievements = [
  { value: "5000+", label: "Service Providers" },
  { value: "10000+", label: "Order Served" },
  { value: "3000+", label: "5 Star Received" },
  { value: "5000+", label: "Friendly Shop" },
] as const;

const faqs = [
  {
    value: "ratings",
    question: "Can I trust the 5-star ratings?",
    answer:
      "Yes! Ratings are based on real customer feedback from completed orders.",
  },
  {
    value: "friendly-shop",
    question: "What is “Friendly Shop”?",
    answer:
      "Friendly Shop represents providers who offer reliable, approachable, and customer-focused services.",
  },
  {
    value: "questions",
    question: "How can I ask a question before ordering?",
    answer:
      "You can use the Question & Answer section to directly message the provider before placing an order.",
  },
] as const;

const OurAchievements = () => {
  return (
    <section className="relative overflow-hidden py-16 lg:py-24">
      <div className="mx-auto flex max-w-7xl flex-col-reverse items-center gap-12 px-5 lg:flex-row lg:px-8">
        {/* Left — FAQ */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="w-full space-y-6 lg:w-1/2"
        >
          <div className="space-y-4">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-block rounded-full border border-pink/20 bg-pastel_pink/50 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-pink"
            >
              Our Achievements
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
            >
              How do I know the service provider is verified?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-base leading-relaxed text-charcoal"
            >
              All service providers are verified through our quality checks and
              community reviews.
            </motion.p>
          </div>

          <Accordion
            defaultValue={["ratings"]}
            className="w-full space-y-2"
          >
            {faqs.map((faq) => (
              <AccordionItem
                key={faq.value}
                value={faq.value}
                className="rounded-xl border border-gray-100 bg-white px-5 shadow-xs transition-shadow"
              >
                <AccordionTrigger className="py-4 text-sm font-semibold text-gray-900 hover:no-underline focus:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="pb-4 text-sm leading-relaxed text-charcoal">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>

        {/* Right — Stats grid */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="w-full lg:w-1/2"
        >
          <div className="grid grid-cols-2 overflow-hidden rounded-2xl bg-pastel_pink shadow-sm">
            {achievements.map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className={`flex flex-col items-center justify-center gap-1.5 p-6 text-center ${
                  index % 2 === 0 ? "border-r border-gray-200" : ""
                } ${index < 2 ? "border-b border-gray-200" : ""}`}
              >
                <span className="text-3xl font-bold tracking-tight text-pink sm:text-4xl">
                  {item.value}
                </span>
                <span className="text-sm font-medium text-charcoal">
                  {item.label}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default OurAchievements;
