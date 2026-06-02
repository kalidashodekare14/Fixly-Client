'use client';

import { Mail, ArrowRight } from 'lucide-react';

const SubscribeSection = () => {
  return (
    <section className="relative overflow-hidden bg-linear-to-br from-gray-900 via-gray-800 to-gray-900 py-20">
      {/* Decorative elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 size-96 rounded-full bg-pink-500/10 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 size-96 rounded-full bg-purple-500/10 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 size-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-pink-500/5 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-2xl px-5 text-center lg:px-8">
        {/* Icon */}
        <div className="mx-auto mb-6 flex size-16 items-center justify-center rounded-2xl bg-linear-to-br from-pink-500 to-purple-600 shadow-lg shadow-pink-500/25">
          <Mail className="size-7 text-white" />
        </div>

        {/* Heading */}
        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Get Expert Tips & Special Offers
        </h2>
        <p className="mt-4 text-base leading-relaxed text-gray-400">
          Join over{' '}
          <span className="font-semibold text-white">50,000 homeowners</span>{' '}
          receiving weekly advice on home maintenance, decoration trends, and
          exclusive LocalExpert discounts.
        </p>

        {/* Form */}
        <div className="mx-auto mt-8 flex max-w-lg items-center gap-3 rounded-2xl border border-gray-700/50 bg-gray-800/50 p-2 backdrop-blur-sm">
          <div className="flex flex-1 items-center gap-2 pl-3">
            <Mail className="size-4 shrink-0 text-gray-500" />
            <input
              type="email"
              placeholder="Enter your email address"
              className="w-full bg-transparent py-2 text-sm text-white placeholder-gray-500 outline-none"
            />
          </div>
          <button className="group flex shrink-0 cursor-pointer items-center gap-2 rounded-xl bg-linear-to-r from-pink-500 to-purple-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-pink-500/25 transition-all hover:shadow-pink-500/40 active:scale-95">
            Subscribe
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>

        {/* Footer text */}
        <p className="mt-4 text-xs text-gray-500">
          By subscribing, you agree to our{' '}
          <a
            href="#"
            className="underline underline-offset-2 hover:text-gray-300"
          >
            Terms of Service
          </a>{' '}
          and{' '}
          <a
            href="#"
            className="underline underline-offset-2 hover:text-gray-300"
          >
            Privacy Policy
          </a>
          . Unsubscribe at any time.
        </p>
      </div>
    </section>
  );
};

export default SubscribeSection;
