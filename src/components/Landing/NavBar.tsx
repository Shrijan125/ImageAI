import Image from 'next/image';
import React from 'react';
import { useSession } from 'next-auth/react';
import Loader from '../Loader';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';
import { Avatar, AvatarFallback } from '@radix-ui/react-avatar';

const NavBar = () => {
  const session = useSession();
  const user = session.data?.user;
  const loading = session.status === 'loading';
  const router = useRouter();
  return (
    <header className="w-full fixed top-3 z-50 px-4">
      <div className="flex rounded-2xl py-3 border-[1px] border-white/20 backdrop-blur-xl w-full justify-between  px-6 items-center max-w-7xl mx-auto">
        <div className="flex items-center justify-center gap-2 sm:gap-4">
          <div className="relative sm:h-8 sm:w-8 w-6 h-6">
            <Image src={'/logo.svg'} alt="logo" fill className=""></Image>
          </div>
          <div className="bg-gradient-to-b bg-clip-text from-white to-gray-500 via-zinc-300">
            <h1 className="text-transparent sm:text-3xl  text-2xl font-bold">
              IMAGEAI
            </h1>
          </div>
        </div>
        <div>
          {loading ? (
            <Loader></Loader>
          ) : user ? (
            <div>
              <Avatar>
                <AvatarFallback>{user.name}</AvatarFallback>
              </Avatar>
            </div>
          ) : (
            <button
              onClick={() => {
                router.push('/signin');
              }}
              className="relative inline-flex h-10 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
            >
              <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
              <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
                Sign in
              </span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default NavBar;
