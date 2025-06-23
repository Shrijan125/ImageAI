import React from 'react';
import Card from './Card';
import { Download, Upload, WandSparkles } from 'lucide-react';

const Steps = () => {
  return (
    <div className="mt-20 text-white">
      <div className="text-4xl items-center justify-center font-extrabold flex gap-2 bg-gradient-to-b  bg-clip-text from-white via-slate-300 to-slate-500">
        <h1 className="text-transparent">How it Works</h1>
      </div>
      <p className=" text-secondary-text mt-2 w-[75%] mx-auto text-center">
        Transform your photos into stunning AI-powered portraits in three simple
        steps
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-3 px-4 relative place-items-center">
        <div className="absolute h-60 w-60 right-0 top-[300px] sm:top-[150px] blur-[200px] bg-purple-500 rounded-full"></div>
        <Card
          heading="Upload Your Photo"
          description1="Start by uploading any portrait photo you"
          description2="like to enhance"
          icon={Upload}
        ></Card>
        <Card
          heading="AI Magic"
          description1="Our advanced AI transforms your photo"
          description2="into stunning portraits"
          icon={WandSparkles}
        ></Card>
        <Card
          heading="Download & Share"
          description1="Get your enhanced portraits in multiple"
          description2="styles instantly"
          icon={Download}
        ></Card>
      </div>
    </div>
  );
};

export default Steps;
