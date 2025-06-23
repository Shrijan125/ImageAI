'use client';
import { AuroraBackground } from '@/components/ui/aurora-background';
import React from 'react';
import { motion } from 'motion/react';
import { SignInForm } from '@/components/auth/SignInForm';

const Signin = () => {
  return (
    <div className="grid grid-cols-2">
      <div className="sm:block hidden">
        <AuroraBackground>
          <motion.div
            initial={{ opacity: 0.0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.3,
              duration: 0.8,
              ease: 'easeInOut',
            }}
            className="relative flex flex-col gap-4 items-center justify-center px-4"
          >
            <div className="text-3xl md:text-7xl font-bold dark:text-white text-center">
              Welcome back to your creative space.
            </div>
            <div className="font-extralight text-base md:text-4xl dark:text-neutral-200 py-4">
              Sign in to generate stunning AI photos.
            </div>
          </motion.div>
        </AuroraBackground>
      </div>
      <div className="sm:col-span-1 col-span-2">
        <SignInForm></SignInForm>
      </div>
    </div>
  );
};

export default Signin;
