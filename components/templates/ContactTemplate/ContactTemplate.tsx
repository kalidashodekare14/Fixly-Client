'use client';

import { motion } from 'motion/react';
import ContactInfo from '@/components/sections/contact/ContactInfo';
import SendMessege from '@/components/sections/contact/SendMessege';
import HeaderSection from '@/components/shared/HeaderSection/HeaderSection';

const ContactTemplate = () => {
  return (
    <main className="relative overflow-hidden bg-gradient-to-b from-white to-white/95">
      {/* Decorative background elements */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-pink/5 blur-3xl" />
        <div className="absolute bottom-1/3 right-0 w-72 h-72 rounded-full bg-pastel_pink/3 blur-3xl" />
      </div>

      <HeaderSection title="Contact" />

      {/* Contact Info Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <ContactInfo />
      </motion.div>

      {/* Divider */}
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="h-px bg-gradient-to-r from-transparent via-pink/20 to-transparent" />
      </div>

      {/* Send Message Section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <SendMessege />
      </motion.div>
    </main>
  );
};

export default ContactTemplate;
