import { LucideIcon } from 'lucide-react';
import React from 'react';

interface CardProps {
  heading: string;
  description1: string;
  description2: string;
  icon: LucideIcon;
}

const Card: React.FC<CardProps> = ({
  heading,
  description1,
  description2,
  icon: Icon,
}) => {
  return (
    <div className="relative group w-full sm:w-[80%] mt-10">
      <div className="absolute bg-gradient-to-r from-indigo-500/20 -inset-2 group-hover:opacity-100 opacity-0 rounded-3xl blur-xl to-purple-500/20"></div>
      <div className="w-full flex flex-col items-center bg-white/5 z-10 border border-white/10 relative rounded-lg p-8 gap-10">
        <div className="flex flex-col items-center gap-4">
          <div className="bg-indigo-500 w-12 h-12 rounded-full flex items-center justify-center to-purple-500 bg-gradient-to-r">
            <Icon />
          </div>
          <h1 className="text-2xl">{heading}</h1>
        </div>
        <p className="text-center text-secondary-text]">
          {description1} <br></br>
          {description2}
        </p>
      </div>
    </div>
  );
};

export default Card;
