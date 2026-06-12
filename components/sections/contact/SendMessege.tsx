'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { FiSend, FiCheck, FiAlertCircle, FiX } from 'react-icons/fi';

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  [key: string]: string;
}

const SendMessege = () => {
  const [formData, setFormData] = useState<FormState>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [touched, setTouched] = useState<Set<string>>(new Set());

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (touched.has(name)) {
      const newErrors = { ...errors };
      delete newErrors[name];
      setErrors(newErrors);
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name } = e.target;
    setTouched((prev) => new Set([...prev, name]));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setStatus('sending');

    // Simulate API call
    setTimeout(() => {
      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setErrors({});
      setTouched(new Set());

      // Reset success message after 4 seconds
      setTimeout(() => {
        setStatus('idle');
      }, 4000);
    }, 2000);
  };

  return (
    <section className="relative overflow-hidden py-16 lg:py-24">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(247,37,133,0.05),transparent_60%)]" />
      <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-primary/4 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <div className="flex flex-col items-center gap-12 lg:flex-row lg:gap-16">
          {/* Left — Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative w-full lg:w-[45%]"
          >
            <div className="absolute -inset-6 rounded-[2.5rem] bg-gradient-to-br from-primary/15 to-primary-light/40 blur-3xl" />
            <div className="relative overflow-hidden rounded-2xl shadow-2xl">
              <Image
                className="h-[420px] w-full object-cover lg:h-[520px]"
                src="/contact/img1.jpeg"
                width={520}
                height={620}
                alt="Contact us"
                priority
              />
              {/* Overlay gradient */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-primary/30 via-transparent to-transparent" />
            </div>

            {/* Floating badge with enhanced design */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="absolute -bottom-6 -right-4 rounded-2xl border border-white/80 bg-white/95 px-5 py-4 shadow-2xl backdrop-blur-md"
            >
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="mb-2 flex items-center gap-2"
              >
                <span className="text-lg">✨</span>
                <p className="text-sm font-bold text-gray-900">Fast Response</p>
              </motion.div>
              <p className="text-xs text-text-body/70">Typically within 2 hours</p>
            </motion.div>
          </motion.div>

          {/* Right — Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="w-full lg:w-[55%]"
          >
            <div className="space-y-8">
              {/* Header */}
              <div className="space-y-3">
                <motion.span
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4 }}
                  className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary-light/60 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-primary"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                  Get in touch
                </motion.span>
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl"
                >
                  We&apos;d Love to Hear From You
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.15 }}
                  className="text-base leading-relaxed text-text-body/70"
                >
                  Have questions or feedback? Send us a message and we&apos;ll respond as quickly as possible. We value your input!
                </motion.p>
              </div>

              {/* Form */}
              <motion.form
                onSubmit={handleSubmit}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="space-y-5"
              >
                {/* Name and Email Row */}
                <div className="grid gap-5 sm:grid-cols-2">
                  {/* Name Field */}
                  <motion.div
                    className="space-y-2"
                    whileHover={{ y: -2 }}
                    transition={{ duration: 0.2 }}
                  >
                    <label
                      htmlFor="name"
                      className="flex items-center gap-1 text-sm font-semibold text-gray-800"
                    >
                      Full Name
                      <span className="text-primary">*</span>
                    </label>
                    <div className="relative">
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="John Doe"
                        className={`h-12 rounded-xl border-2 px-4 bg-white/80 backdrop-blur-sm transition-all duration-300 focus:outline-none ${
                          errors.name && touched.has('name')
                            ? 'border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100'
                            : 'border-primary/20 focus:border-primary focus:ring-2 focus:ring-primary/10'
                        }`}
                      />
                      {errors.name && touched.has('name') && (
                        <motion.div
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-red-500"
                        >
                          <FiAlertCircle />
                        </motion.div>
                      )}
                    </div>
                    {errors.name && touched.has('name') && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-sm text-red-500 flex items-center gap-1"
                      >
                        <FiAlertCircle className="text-xs" />
                        {errors.name}
                      </motion.p>
                    )}
                  </motion.div>

                  {/* Email Field */}
                  <motion.div
                    className="space-y-2"
                    whileHover={{ y: -2 }}
                    transition={{ duration: 0.2 }}
                  >
                    <label
                      htmlFor="email"
                      className="flex items-center gap-1 text-sm font-semibold text-gray-800"
                    >
                      Email Address
                      <span className="text-primary">*</span>
                    </label>
                    <div className="relative">
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="john@example.com"
                        className={`h-12 rounded-xl border-2 px-4 bg-white/80 backdrop-blur-sm transition-all duration-300 focus:outline-none ${
                          errors.email && touched.has('email')
                            ? 'border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100'
                            : 'border-primary/20 focus:border-primary focus:ring-2 focus:ring-primary/10'
                        }`}
                      />
                      {errors.email && touched.has('email') && (
                        <motion.div
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-red-500"
                        >
                          <FiAlertCircle />
                        </motion.div>
                      )}
                    </div>
                    {errors.email && touched.has('email') && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-sm text-red-500 flex items-center gap-1"
                      >
                        <FiAlertCircle className="text-xs" />
                        {errors.email}
                      </motion.p>
                    )}
                  </motion.div>
                </div>

                {/* Subject Field */}
                <motion.div
                  className="space-y-2"
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.2 }}
                >
                  <label
                    htmlFor="subject"
                    className="text-sm font-semibold text-gray-800"
                  >
                    Subject (Optional)
                  </label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="How can we help?"
                    className="h-12 rounded-xl border-2 border-primary/20 px-4 bg-white/80 backdrop-blur-sm transition-all duration-300 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/10"
                  />
                </motion.div>

                {/* Message Field */}
                <motion.div
                  className="space-y-2"
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.2 }}
                >
                  <label
                    htmlFor="message"
                    className="flex items-center gap-1 text-sm font-semibold text-gray-800"
                  >
                    Message
                    <span className="text-primary">*</span>
                  </label>
                  <div className="relative">
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Tell us more about your inquiry..."
                      className={`min-h-[140px] resize-none rounded-xl border-2 p-4 bg-white/80 backdrop-blur-sm transition-all duration-300 focus:outline-none ${
                        errors.message && touched.has('message')
                          ? 'border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100'
                          : 'border-primary/20 focus:border-primary focus:ring-2 focus:ring-primary/10'
                      }`}
                    />
                    <div className="absolute bottom-3 right-3 text-xs text-text-body/40">
                      {formData.message.length}/500
                    </div>
                  </div>
                  {errors.message && touched.has('message') && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-sm text-red-500 flex items-center gap-1"
                    >
                      <FiAlertCircle className="text-xs" />
                      {errors.message}
                    </motion.p>
                  )}
                </motion.div>

                {/* Submit Button */}
                <motion.div
                  whileHover={status === 'idle' ? { scale: 1.01 } : {}}
                  whileTap={status === 'idle' ? { scale: 0.99 } : {}}
                  className="pt-2"
                >
                  <Button
                    type="submit"
                    disabled={status !== 'idle'}
                    className={`relative h-13 w-full overflow-hidden rounded-xl font-semibold text-base text-white shadow-lg transition-all duration-300 sm:w-auto sm:px-8 ${
                      status === 'idle'
                        ? 'bg-gradient-to-r from-primary to-pink/80 hover:shadow-xl hover:shadow-primary/30 cursor-pointer'
                        : status === 'success'
                          ? 'bg-green-500 hover:shadow-lg'
                          : 'bg-primary/50 cursor-not-allowed'
                    }`}
                  >
                    {status === 'idle' && (
                      <span className="flex items-center gap-2">
                        Send Message
                        <FiSend className="text-lg" />
                      </span>
                    )}
                    {status === 'sending' && (
                      <span className="flex items-center gap-2">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        >
                          <FiSend />
                        </motion.div>
                        Sending...
                      </span>
                    )}
                    {status === 'success' && (
                      <span className="flex items-center gap-2">
                        <FiCheck className="text-lg" />
                        Message Sent!
                      </span>
                    )}
                  </Button>
                </motion.div>

                {/* Success Message */}
                {status === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="rounded-xl border border-green-200 bg-green-50 p-4"
                  >
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-green-100">
                        <FiCheck className="text-green-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-green-900">
                          Message sent successfully!
                        </p>
                        <p className="text-sm text-green-700">
                          We&apos;ll get back to you soon. Check your email for updates.
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </motion.form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SendMessege;
