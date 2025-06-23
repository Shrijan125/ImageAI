import { Check } from 'lucide-react';
import React from 'react';
import { Button } from '../ui/button';

interface PricingCardProps {
  title: string;
  price: string;
  features: string[];
  recommended?: boolean;
}

const PricingCard: React.FC<PricingCardProps> = ({
  title,
  price,
  features,
  recommended = false,
}) => {
  return (
    <div
      className={`w-full lg:w-[80%] p-[1px] rounded-lg h-full ${recommended ? 'bg-gradient-to-b from-indigo-500 to-purple-500' : 'bg-transparent'}`}
    >
      <div
        className={`h-full p-6 flex flex-col justify-between rounded-lg ${recommended ? 'bg-black/90' : 'bg-white/5'}`}
      >
        <div className="flex flex-col gap-2 mb-5">
          <h2 className="text-2xl font-bold">{title}</h2>
          <h3 className="text-4xl font-black tracking-wide">
            {' '}
            {price === 'Custom' ? 'Custom' : '₹ ' + price}
          </h3>
        </div>
        <div className="flex flex-col gap-2">
          {features.map((feature, index) => (
            <div key={index} className="flex gap-2">
              <Check className="text-green-600"></Check>
              <div className="text-secondary-text">{feature}</div>
            </div>
          ))}
        </div>
        <Button
          className={`mt-2 hover:cursor-pointer w-full ${recommended ? 'bg-gradient-to-r from-indigo-500 to-purple-500' : 'bg-white/20'}`}
        >
          Get Started
        </Button>
      </div>
    </div>
  );
};

export default PricingCard;
