'use client';
import Image from 'next/image';
import React from 'react';
import { signOut, useSession } from 'next-auth/react';
import Loader from '../Loader';
import { useRouter } from 'next/navigation';
import { useCredits } from '@/context/CreditsProvider';
import { LogOut, PlusCircle, PlusIcon } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { Separator } from '../ui/separator';

const NavBar = () => {
  const session = useSession();
  const { credits } = useCredits();
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
            <Popover>
              <PopoverTrigger className="hover:cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className="text-xs flex gap-2 items-center justify-center ">
                    <PlusCircle className="size-4"></PlusCircle>
                    <span className="font-bold">
                      {credits} {credits === 0 ? 'Credit' : 'Credits'}
                    </span>
                  </div>
                  <Avatar>
                    <AvatarFallback>{user?.username[0]}</AvatarFallback>
                  </Avatar>
                </div>
              </PopoverTrigger>
              <PopoverContent className="mr-5">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-center gap-2">
                    <Avatar className='size-10'>
                      <AvatarFallback>{user?.username[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <div className="">{user.username}</div>
                      <p>{user.email}</p>
                    </div>
                  </div>
                  <Separator></Separator>
                  <div className='flex flex-col gap-4 mt-4'>
                  <div className="flex items-center p-y-1 justify-between">
                    <div className="text-sm">Add Credits</div>
                    <PlusIcon className="size-4"></PlusIcon>
                  </div>
                  <Separator></Separator>
                  <div onClick={async ()=>{await signOut()}} className="flex text-red-500 items-center p-y-1 justify-between">
                    <div className="text-sm">Logout</div>
                    <LogOut className='size-4'></LogOut>
                  </div>
                  </div>
                  
                </div>
              </PopoverContent>
            </Popover>
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
