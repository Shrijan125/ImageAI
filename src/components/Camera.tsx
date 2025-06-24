'use client';
import { getImages } from '@/actions/gallery';
import React, { useEffect, useState } from 'react';

const Camera = () => {
  const [images, setImages] = useState<string[]>([]);
  useEffect(() => {
    const fetchImages = async () => {
      const result = await getImages();
      console.log(result);
      setImages(result);
    };
    fetchImages();
  }, []);
  return (
    <div className="mt-8 px-4">
      <div className="flex justify-between w-full mb-4">
        <h1 className="text-2xl font-bold">Your Gallery</h1>
        <div className="border-white/10 border-[1px] p-2 rounded-2xl text-xs bg-white/20">
          {`${images.length} ${images.length === 1 ? 'image' : 'images'}`}
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {images.map((image, index) => (
          <div
            key={index}
            className="relative w-full h-[300px] overflow-hidden rounded-md"
          >
            <img
              alt="gallery_img"
              className="object-cover w-full h-full"
              src={image}
            ></img>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Camera;
