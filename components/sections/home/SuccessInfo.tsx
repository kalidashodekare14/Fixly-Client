'use client';

import { useRef, useEffect } from 'react';
import { motion, useInView, useSpring, useTransform } from 'motion/react';

const Counter = ({
  target,
  suffix = '',
  decimals = 0,
}: {
  target: number;
  suffix?: string;
  decimals?: number;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const spring = useSpring(0, {
    stiffness: 60,
    damping: 20,
    restDelta: 0.001,
  });

  const display = useTransform(
    spring,
    (v) => `${v.toFixed(decimals)}${suffix}`
  );

  useEffect(() => {
    if (isInView) {
      spring.set(target);
    }
  }, [isInView, target, spring]);

  return <motion.span ref={ref}>{display}</motion.span>;
};

const SuccessInfo = () => {
  return (
    <div className="bg-[#FDF3F8]  py-16 text-center text-white">
      <div className="mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl items-center justify-between px-5 lg:px-8">
        <div>
          <h1 className="text-4xl font-bold text-primary">
            <Counter target={10} suffix="K+" />
          </h1>
          <p className="text-lg text-black">Happy Customers</p>
        </div>
        <div>
          <h1 className="text-4xl font-bold text-primary">
            <Counter target={50} suffix="K+" />
          </h1>
          <p className="text-lg text-black">Services Completed</p>
        </div>
        <div>
          <h1 className="text-4xl font-bold text-primary">
            <Counter target={80} suffix="K+" />
          </h1>
          <p className="text-lg text-black">Satisfied Users</p>
        </div>
        <div>
          <h1 className="text-4xl font-bold text-primary">
            <Counter target={4.9} suffix="/5" decimals={1} />
          </h1>
          <p className="text-lg text-black">AVG. Rating</p>
        </div>
      </div>
    </div>
  );
};

export default SuccessInfo;
