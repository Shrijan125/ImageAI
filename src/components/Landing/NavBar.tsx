import Image from 'next/image';
import React from 'react';
import { Button } from '../ui/button';
import { Sparkles } from 'lucide-react';
import { easeOut, motion } from 'framer-motion';

const NavBar = () => {
  return (
    <header className="w-full fixed top-3 z-50 px-4">
        <div className='flex rounded-2xl border-[1px] border-white/20 backdrop-blur-xl w-full justify-between py-2 px-6 items-center max-w-7xl mx-auto'>
      <Image
        src={'/logo.svg'}
        width={30}
        height={30}
        alt="logo"
        className=""
      ></Image>
      <div>
        <Button className="bg-transparent  ] px-8 py-6 rounded-lg relative font-light">
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
    </header>
  );
};

export default NavBar;
