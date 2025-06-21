import React from 'react'
import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useRef, useEffect } from 'react'

type AnimatedCounterProps = {
  value: number;
  duration?: number;
};

const AnimatedCounter = ({ value, duration = 2 }: AnimatedCounterProps) => {
  const ref = useRef<HTMLSpanElement>(null)
  const motionValue = useMotionValue(0)
  const springValue = useSpring(motionValue, { duration: duration * 1000 })
  const isInView = useInView(ref, { once: true, margin: '0px 0px -100px 0px' })

  useEffect(() => {
    if (isInView) {
      motionValue.set(value)
    }
  }, [motionValue, isInView, value])

  useEffect(() => {
    springValue.on('change', (latest) => {
      if (ref.current) {
        ref.current.textContent = Math.floor(latest).toLocaleString()
      }
    })
  }, [springValue])

  return (
    <span ref={ref} className="text-4xl text-transparent tracking-wide font-extrabold">
      0
    </span>
  )
}

const HeroCard = () => {
  const containerRef = useRef(null)
  const isInView = useInView(containerRef, { once: true, margin: '0px 0px -100px 0px' })

  const stats = [
    { value: 100, suffix: 'K+', label: 'AI Portraits Generated' },
    { value: 50, suffix: 'K+', label: 'Happy Users' },
    { value: 98, suffix: '%', label: 'Satisfaction Rate' },
    { value: 24, suffix: '/7', label: 'AI Support' }
  ]

  return (
    <div 
      ref={containerRef}
      className='w-full mt-20 grid grid-cols-2 sm:grid-rows-1 items-center p-8 gap-x-10 gap-y-14'
    >
      {stats.map((stat, index) => (
        <motion.div 
          key={index}
          className='flex flex-col items-center'
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ 
            duration: 0.6, 
            delay: index * 0.1,
            ease: "easeOut"
          }}
        >
          <div className='bg-gradient-to-b from-white via-zinc-300 to-zinc-500 bg-clip-text'>
            <AnimatedCounter value={stat.value} duration={2} />
            <span className='text-4xl text-transparent tracking-wide font-extrabold'>
              {stat.suffix}
            </span>
          </div>
          <p className='text-center text-[#948787] mt-2'>{stat.label}</p>
        </motion.div>
      ))}
    </div>
  )
}

export default HeroCard