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
    <div className="bg-[#B50061] py-16 text-center text-white">
      <div className="mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl items-center justify-between px-5 lg:px-8">
        <div>
          <h1 className="text-4xl font-bold">
            <Counter target={10} suffix="K+" />
          </h1>
          <p className="text-lg">Happy Customers</p>
        </div>
        <div>
          <h1 className="text-4xl font-bold">
            <Counter target={50} suffix="K+" />
          </h1>
          <p className="text-lg">Services Completed</p>
        </div>
        <div>
          <h1 className="text-4xl font-bold">
            <Counter target={80} suffix="K+" />
          </h1>
          <p className="text-lg">Satisfied Users</p>
        </div>
        <div>
          <h1 className="text-4xl font-bold">
            <Counter target={4.9} suffix="/5" decimals={1} />
          </h1>
          <p className="text-lg">AVG. Rating</p>
        </div>
      </div>
    </div>
  );
};

export default SuccessInfo;
