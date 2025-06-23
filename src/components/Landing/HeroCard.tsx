import React from 'react';
import {
  easeInOut,
  motion,
  useInView,
  useMotionValue,
  useSpring,
} from 'framer-motion';
import { useRef, useEffect } from 'react';
import { CircleArrowUp } from 'lucide-react';

type AnimatedCounterProps = {
  value: number;
  duration?: number;
};

const AnimatedCounter = ({ value, duration = 2 }: AnimatedCounterProps) => {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { duration: duration * 1000 });
  const isInView = useInView(ref, { once: true, margin: '0px 0px -100px 0px' });

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [motionValue, isInView, value]);

  useEffect(() => {
    springValue.on('change', latest => {
      if (ref.current) {
        ref.current.textContent = Math.floor(latest).toLocaleString();
      }
    });
  }, [springValue]);

  return (
    <span
      ref={ref}
      className="text-4xl text-transparent tracking-wide font-extrabold"
    >
      0
    </span>
  );
};

const HeroCard = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, {
    once: true,
    margin: '0px 0px -100px 0px',
  });

  const stats = [
    { value: 100, suffix: 'K+', label: 'AI Portraits Generated' },
    { value: 50, suffix: 'K+', label: 'Happy Users' },
    { value: 98, suffix: '%', label: 'Satisfaction Rate' },
    { value: 24, suffix: '/7', label: 'AI Support' },
  ];

  return (
    <>
      <div className="text-white flex items-center flex-col gap-10 mt-36 relative">
        <div className="absolute -right-14 top-0 bg-purple-500 h-40 w-40 rounded-full blur-[160px]"></div>
        <div className="absolute -left-14 top-80 bg-indigo-500 h-40 w-40 rounded-full blur-[160px]"></div>
        <div className="flex flex-col items-center">
          <h2 className="text-3xl font-bold">THIS IS</h2>
          <div className="overflow-hidden">
            <motion.div
              initial={{ y: 52 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.5, ease: easeInOut }}
              className="bg-gradient-to-b from-white via-zinc-300 bg-clip-text to-zinc-500"
            >
              <h1 className="text-6xl font-extrabold text-transparent">
                PHOTO AI
              </h1>
            </motion.div>
          </div>
        </div>
        <p className="text-secondary-text w-[75%] text-center text-lg">
          Transform your photos into captivating artwork with the power of
          AI—effortless creative, and uniquely styled.
        </p>

        <button className=" px-8 py-4 relative rounded-lg overflow-x-hidden"
        >
          <motion.span
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="from-indigo-500 bg-gradient-to-r rounded-lg to-purple-500 w-full h-full absolute inset-0"
          />
          <div className="flex items-center gap-6">
            <span className="text-2xl uppercase font-extrabold z-10">
              Generate
            </span>
            <CircleArrowUp className="rotate-90 size-8"></CircleArrowUp>
          </div>
        </button>
      </div>

      <div
        ref={containerRef}
        className="w-full sm:w-[60%] mx-auto mt-20 grid grid-cols-2 sm:grid-cols-4 items-center p-8 gap-x-10 gap-y-14"
      >
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            className="flex flex-col items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{
              duration: 0.6,
              delay: index * 0.1,
              ease: 'easeOut',
            }}
          >
            <div className="bg-gradient-to-b  from-white via-zinc-300 to-zinc-500 bg-clip-text">
              <AnimatedCounter value={stat.value} duration={2} />
              <span className="text-4xl text-transparent tracking-wide font-extrabold">
                {stat.suffix}
              </span>
            </div>
            <p className="text-center text-s mt-2">{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </>
  );
};

export default HeroCard;
