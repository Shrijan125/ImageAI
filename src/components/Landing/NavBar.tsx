import Image from 'next/image';
import React from 'react';
import { Button } from '../ui/button';
import { Sparkles } from 'lucide-react';
import { easeOut, motion } from 'framer-motion';

const NavBar = () => {
  return (
    <div className="flex w-full justify-between py-4 px-6 items-center">
      <Image
        src={'/logo.svg'}
        width={45}
        height={45}
        alt="logo"
        className="w-auto h-auto"
      ></Image>
      <div>
        <Button className="bg-transparent border-[1px] border-[#676767] px-8 py-6 rounded-lg relative font-light">
          <div className="flex items-center gap-2">
            <span className="text-lg cursor-pointer">Try Now</span>
            <Sparkles></Sparkles>
          </div>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, ease: easeOut }}
            className="absolute inset-x-0 w-full mx-auto -bottom-px bg-gradient-to-r from-transparent via-purple-100 to-transparent h-[3px]"
          ></motion.span>
        </Button>
      </div>
    </div>
  );
};

export default NavBar;
