'use client';
import Image from 'next/image'
import React from 'react'
import { Button } from '../ui/button'
import { CircleArrowUp, Download, Sparkles, Upload, WandSparkles } from 'lucide-react'
import { easeInOut, easeOut, motion } from "motion/react"
import HeroCard from './HeroCard';
import Card from './Card';
import Footer from './Footer';


const Landing = () => {
  const images = [['/PhotoAI/img1.png','/PhotoAI/img3.png','/PhotoAI/img5.png'], ['/PhotoAI/img2.png', '/PhotoAI/img4.jpeg', '/PhotoAI/img6.png'], ['/PhotoAI/img7.png','/PhotoAI/img8.png', '/PhotoAI/img9.png']];
  return (
    <div className='h-screen w-full overflow-x-hidden'>
      <div className='flex w-full justify-between py-4 px-6 items-center'>
          <Image src={'/logo.svg'} width={45} height={45} alt='logo' className='w-auto h-auto'></Image>
          <div>
            <Button onClick={() => window.open('https://forms.gle/JjdLZGvenhyyLHAj8', '_blank')} className='bg-transparent border-[1px] border-[#676767] px-8 py-6 rounded-lg relative font-light'>
              <div className='flex items-center gap-2'>
                <span
  className='text-lg cursor-pointer'
>
  Try Now
</span>
                <Sparkles></Sparkles>
              </div>
              <motion.span initial={{opacity:0}} animate={{opacity:1}} transition={{duration:0.5, ease: easeOut}} className="absolute inset-x-0 w-full mx-auto -bottom-px bg-gradient-to-r from-transparent via-purple-100 to-transparent h-[3px]"></motion.span>
            </Button>
          </div>
      </div>
      <div className='text-white flex items-center flex-col gap-10 mt-36 relative'>
        <div className='absolute -right-14 top-0 bg-purple-500 h-40 w-40 rounded-full blur-[160px]'></div>
        <div className='absolute -left-14 top-80 bg-indigo-500 h-40 w-40 rounded-full blur-[160px]'></div>
        <div className='flex flex-col items-center'>
        <h2 className='text-3xl font-bold'>THIS IS</h2>
        <div className='overflow-hidden'>
        <motion.div initial={{ y: 52 }} animate={{ y:0 }} transition={{ duration:0.5, ease:easeInOut}} className='bg-gradient-to-b from-white via-zinc-300 bg-clip-text to-zinc-500'>
        <h1  className='text-6xl font-extrabold text-transparent'>PHOTO AI</h1>
        </motion.div>
        </div>
        </div>
        <p className='text-[#948787] w-[75%] text-center text-lg'>Transform your photos into captivating
        artwork with the power of AI—effortless
        creative, and uniquely styled.</p>
        
        <button onClick={() => window.open('https://forms.gle/JjdLZGvenhyyLHAj8', '_blank')} className=" px-8 py-4 relative rounded-lg overflow-x-hidden">
          <motion.span 
              initial={{ x: '-100%' }} 
              animate={{ x: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="from-indigo-500 bg-gradient-to-r rounded-lg to-purple-500 w-full h-full absolute inset-0"
            />        
      <div className='flex items-center gap-6'>
          <span  className='text-2xl uppercase font-extrabold z-10'>Generate</span>
          <CircleArrowUp className='rotate-90 size-8'></CircleArrowUp>
        </div>
      </button>
      </div>
      <HeroCard></HeroCard>
      <div className='flex flex-col mt-20 gap-8'>
          <div className='flex items-center justify-center h-full gap-4 w-[60%] border-[1px] border-purple-200/40 rounded-3xl mx-auto py-3 bg-purple-400/40'>
            <div className='items-center flex justify-center'>
            <Sparkles className='text-purple-300'></Sparkles>
            </div>
          <div className='flex flex-col items-center text-purple-300'>
          <h1>Next-Gen AI Portrait</h1>
          </div>
        </div>
      <div className='grid grid-cols-3 px-4 w-full gap-2'>
        <div className='grid grid-rows-3 gap-4'>
          {
            images[0]?.map((image, index) => (
              <div key={index} className='h-[200px] relative rounded-lg overflow-hidden'>
                  <Image src={image} fill alt={`image${index}`} className='h-full w-full object-cover'></Image>
              </div>
            ))
          }
        </div>
        <div className='grid grid-rows-3 gap-4'>
          {
            images[1]?.map((image, index) => (
              <div key={index} className='h-[200px] relative rounded-lg overflow-hidden'>
                  <Image src={image} fill alt={`image${index}`} className='h-full w-full object-cover'></Image>
              </div>
            ))
          }
        </div>
        <div className='grid grid-rows-3 gap-4'>
          {
            images[2]?.map((image, index) => (
              <div key={index} className='h-[200px] relative rounded-lg overflow-hidden'>
                  <Image src={image} fill alt={`image${index}`} className='h-full w-full object-cover'></Image>
              </div>
            ))
          }
        </div>
      </div>
      </div>
      <div className='mt-20 text-white'>
        <div className='text-4xl items-center justify-center font-extrabold flex gap-2 bg-gradient-to-b  bg-clip-text from-white via-slate-300 to-slate-500'>
            <h1 className='text-transparent'>How it Works</h1>
        </div>
        <p className=' text-[#948787] mt-2 w-[75%] mx-auto text-center'>Transform your photos into stunning AI-powered portraits in three simple steps</p>
        <div className='grid grid-cols-1 sm:grid-cols-3 px-4 relative'>
          <div className='absolute h-60 w-60 right-0 top-[300px] blur-[200px] bg-purple-500 rounded-full'></div>
          <Card heading='Upload Your Photo' description1='Start by uploading any portrait photo you' description2='like to enhance' icon={Upload}></Card>
          <Card heading='AI Magic' description1='Our advanced AI transforms your photo' description2='into stunning portraits' icon={WandSparkles}></Card>
          <Card heading='Download & Share' description1='Get your enhanced portraits in multiple' description2='styles instantly' icon={Download}></Card>
        </div>
        </div>
        <Footer></Footer>
    </div>
  )
}

export default Landing