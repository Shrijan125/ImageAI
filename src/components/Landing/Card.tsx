import { LucideIcon } from 'lucide-react'
import React from 'react'

interface CardProps {
    heading: string;
    description1: string;
    description2: string;
    icon: LucideIcon
}

const Card : React.FC<CardProps> = ({heading, description1, description2, icon: Icon }) => {
  return (
    <div className='w-full mt-10 flex flex-col items-center bg-white/5 border-white/10 rounded-lg p-8 gap-10'>
        <div className='flex flex-col items-center gap-4'>
        <div className='bg-indigo-500 w-12 h-12 rounded-full flex items-center justify-center to-purple-500 bg-gradient-to-r'>
        <Icon />
        </div>
        <h1 className='text-2xl'>{heading}</h1>
        </div>
        <p className='text-center text-[#948787]'>{description1} <br></br>{description2}</p>
    </div>
  )
}

export default Card