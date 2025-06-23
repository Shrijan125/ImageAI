import React from 'react';
import PricingCard from './PricingCard';
import { motion } from 'framer-motion';

const Pricing = () => {
  const features = [
    [
      'Upto 30 AI portraits',
      '1 Custom Model Training',
      '24h Support',
      'Basic Export',
    ],
    [
      'Upto 100 AI portraits',
      '2 Custom Model Training',
      '24h Support',
      'HD Export',
      'Advanced Editing',
    ],
    [
      'Unlimited AI portraits',
      '5 Custom Model Training',
      '24h Support',
      'HD Export',
      'Advanced Editing',
      'Custom Integration',
    ],
  ];
  return (
    <div className="text-white mt-40 px-4 max-w-7xl mx-auto">
      <div className="flex flex-col items-center gap-2">
        <h1 className="text-center sm:text-4xl text-3xl  font-bold tracking-wide">
          Simple,{' '}
          <span className="bg-gradient-to-r from to-indigo-500 to bg-purple-500 bg-clip-text">
            {' '}
            <span className="text-transparent">Transparent</span>{' '}
          </span>
          Pricing
        </h1>
        <p className="text-center text-secondary-text">
          Choose the perfect plan for your needs. No hidden fees.
        </p>
      </div>
      <div className="grid sm:grid-cols-3  grid-cols-1 place-items-center mt-20 gap-4 relative">
        <motion.div
          className= "bg-gradient-to-r from-indigo-500/30 to-purple-500/30 absolute blur-2xl w-[300px] h-[300px] sm:-top-50 -top-20 left-1/3 rounded-full"
          initial={{ scale: 1, x: 0, y: 0 }}
          animate={{ scale: 1.03, x: '50px', y: '50px' }}
          transition={{
            duration: 5,
            ease: 'linear',
            repeat: Infinity,
            repeatType: 'reverse',
          }}
        ></motion.div>
        <PricingCard
          title="Starter"
          price="300"
          features={features[0]!}
        ></PricingCard>
        <PricingCard
          title="Pro"
          price="700"
          features={features[1]!}
          recommended={true}
        ></PricingCard>
        <PricingCard
          title="Custom"
          price="Custom"
          features={features[2]!}
        ></PricingCard>
      </div>
    </div>
  );
};

export default Pricing;
