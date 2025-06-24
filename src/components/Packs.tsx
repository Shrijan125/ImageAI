'use client';
import type { Packs, TrainModel } from '@/generated/prisma';
import React, { useEffect, useState } from 'react';
import ModelCard from './ModelCard';
import { getModels } from '@/actions/models';
import { getPacks } from '@/actions/packs';
import { toast } from 'sonner';
import PackCard from './PackCard';

const Packs = () => {
  const [models, setModels] = useState<TrainModel[]>([]);
  const [packs, setPacks] = useState<Packs[]>([]);
  const [selectedModel, setSelectedModel] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const modelsResponse = await getModels();
        const packsResponse = await getPacks();
        setModels(modelsResponse);
        setPacks(packsResponse);
      } catch (error) {
        toast.error('Failed to fetch data. Please try again later.');
      }
    };
    fetchData();
  }, []);

  return (
    <div className="mt-8 flex flex-col gap-4">
      <div className="flex flex-col gap-1 ">
        <h1 className="text-2xl font-bold">Select Model</h1>
        <p className="text-secondary-text">
          Choose an AI model to generate your images
        </p>
      </div>
      <div className="grid grid-cols-3 place-items-center">
        {models.map((model, index) => (
          <ModelCard
            id={model.id}
            setSelected={setSelectedModel}
            selected={selectedModel === model.id}
            key={index}
            imgUrl={model.thumbNailUrl}
            name={model.name}
          ></ModelCard>
        ))}
      </div>
      <div className="flex flex-col gap-1 ">
        <h1 className="text-2xl font-bold">Select Pack</h1>
        <p className="text-secondary-text">
          Choose a pack to generate images with
        </p>
      </div>
      <div className="grid grid-cols-3 place-items-center">
        {packs.map((pack, index) => (
          <PackCard
            id={pack.id}
            setSelected={setSelectedModel}
            selected={selectedModel === pack.id}
            key={index}
            imgUrl={pack.thumbnailUrl}
            name={pack.name}
            description={pack.description}
          ></PackCard>
        ))}
      </div>
    </div>
  );
};

export default Packs;
