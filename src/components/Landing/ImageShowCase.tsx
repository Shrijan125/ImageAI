import { Sparkles } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

const ImageShowCase = () => {
  const images = [
    ['/PhotoAI/img1.png', '/PhotoAI/img3.png', '/PhotoAI/img5.png'],
    ['/PhotoAI/img2.png', '/PhotoAI/img4.jpeg', '/PhotoAI/img6.png'],
    ['/PhotoAI/img7.png', '/PhotoAI/img8.png', '/PhotoAI/img9.png'],
  ];
  return (
    <div className="flex flex-col mt-20 gap-8">
      <div className="flex items-center justify-center h-full gap-4 w-[60%] border-[1px] border-purple-200/40 rounded-3xl mx-auto py-3 bg-purple-400/40">
        <div className="items-center flex justify-center">
          <Sparkles className="text-purple-300"></Sparkles>
        </div>
        <div className="flex flex-col items-center text-purple-300">
          <h1>Next-Gen AI Portrait</h1>
        </div>
      </div>
      <div className="grid grid-cols-3 px-4 w-full gap-2">
        <div className="grid grid-rows-3 gap-4">
          {images[0]?.map((image, index) => (
            <div
              key={index}
              className="h-[200px] relative rounded-lg overflow-hidden"
            >
              <Image
                src={image}
                fill
                alt={`image${index}`}
                className="h-full w-full object-cover"
              ></Image>
            </div>
          ))}
        </div>
        <div className="grid grid-rows-3 gap-4">
          {images[1]?.map((image, index) => (
            <div
              key={index}
              className="h-[200px] relative rounded-lg overflow-hidden"
            >
              <Image
                src={image}
                fill
                alt={`image${index}`}
                className="h-full w-full object-cover"
              ></Image>
            </div>
          ))}
        </div>
        <div className="grid grid-rows-3 gap-4">
          {images[2]?.map((image, index) => (
            <div
              key={index}
              className="h-[200px] relative rounded-lg overflow-hidden"
            >
              <Image
                src={image}
                fill
                alt={`image${index}`}
                className="h-full w-full object-cover"
              ></Image>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageShowCase;
