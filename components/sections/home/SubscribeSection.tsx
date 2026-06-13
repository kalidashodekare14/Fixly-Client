'use client';

import { IoMail } from 'react-icons/io5';
import { FaArrowRightLong } from 'react-icons/fa6';

const SubscribeSection = () => {
  return (
    <section className="relative flex min-h-105 items-center overflow-hidden py-16 lg:py-24">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/home/repairTool.jpg')" }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-linear-to-r from-primary/85 via-primary/75 to-primary/80" />

      <div className="relative z-10 mx-auto w-full max-w-2xl px-5 text-center lg:px-8">
        <div className="mx-auto mb-6 flex size-16 items-center justify-center rounded-2xl bg-white/15 shadow-lg backdrop-blur-sm">
          <IoMail className="size-7 text-white" />
        </div>

        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Stay Updated with Fixly
        </h2>
        <p className="mt-4 text-base leading-relaxed text-white/85">
          Get service updates, exclusive offers, and helpful tips to keep your
          home running smoothly.
        </p>

        <div className="mx-auto mt-8 flex max-w-lg items-center gap-3 rounded-2xl border border-white/20 bg-white/10 p-2 shadow-lg backdrop-blur-sm transition-all duration-300 focus-within:border-white/40 focus-within:bg-white/15">
          <div className="flex flex-1 items-center gap-2 pl-3">
            <IoMail className="size-4 shrink-0 text-white/60" />
            <input
              type="email"
              placeholder="Enter your email address"
              className="w-full bg-transparent py-2 text-sm text-white placeholder-white/50 outline-none"
            />
          </div>
          <button className="group flex shrink-0 cursor-pointer items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-primary shadow-sm transition-all hover:shadow-md active:scale-95">
            Subscribe
            <FaArrowRightLong className="size-3.5 transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>

        <p className="mt-4 text-xs text-white/60">
          By subscribing, you agree to our{' '}
          <a
            href="#"
            className="font-medium text-white underline underline-offset-2 hover:text-white/80"
          >
            Terms of Service
          </a>{' '}
          and{' '}
          <a
            href="#"
            className="font-medium text-white underline underline-offset-2 hover:text-white/80"
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
