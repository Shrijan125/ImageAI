'use client';
import type { TrainModel } from '@/generated/prisma';
import React, { useEffect, useState } from 'react';
import ModelCard from './ModelCard';
import { getModels } from '@/actions/models';
import { GetPackResponse, getPacks } from '@/actions/packs';
import { toast } from 'sonner';
import PackCard from './PackCard';
import { saveImage } from '@/actions/gallery';
import { fal } from '@fal-ai/client';
import { useCredits } from '@/context/CreditsProvider';
import { useRouter } from 'next/navigation';

const populatePrompt = (template: string, model: TrainModel): string => {
  return template
    .replace(/<model_name>/g, model.name)
    .replace(/<age>/g, String(model.age))
    .replace(/<gender>/g, model.type)
    .replace(/<ethnicity>/g, model.ethinicity)
    .replace(/<eye_color>/g, model.eyeColor).
    replace(/<bald>/g, '');;
};

const Packs = () => {
  const [models, setModels] = useState<TrainModel[]>([]);
  const [packs, setPacks] = useState<GetPackResponse[]>([]);
  const [selectedModel, setSelectedModel] = useState<string>('');
  const [loadingPackId, setLoadingPackId] = useState<string>('');
  const { setCredits, credits } = useCredits();
  const router = useRouter();

  const handleGenerate = async (packId: string) => {
    setLoadingPackId(packId); // Set the specific pack as loading

    if (!selectedModel) {
      toast.error('Please select a model.');
      setLoadingPackId(''); // Reset loading state
      return;
    }

    const modelDetails = models.find(model => model.id === selectedModel);
    if (!modelDetails?.tensorPath) {
      toast.error('Selected model is not trained yet.');
      setLoadingPackId(''); // Reset loading state
      return;
    }

    const prompts = packs.find(pack => pack.id === packId)?.PackPrompts;
    if (!prompts || prompts.length === 0) {
      toast.error('Selected pack has no prompts.');
      setLoadingPackId(''); // Reset loading state
      return;
    }

    const cost = prompts.length * 5;
    if (credits < cost) {
      toast.error('You do not have enough credits to generate images.');
      setLoadingPackId(''); // Reset loading state
      router.push('/home/pricing');
      return;
    }

    try {
      const results = await Promise.all(
        prompts.map(p => 
          fal.subscribe('fal-ai/flux-lora', {
            input: {
              prompt: populatePrompt(p.prompt, modelDetails),
              loras: [
                {
                  path: modelDetails.tensorPath!,
                  scale: 1.0,
                },
              ],
            },
            pollInterval: 5000,
            logs: false,
          })
        )
      );

      for (let i = 0; i < results.length; i++) {
        const result = results[i];
        const imageUrl = result?.data?.images?.[0]?.url;
        if (!imageUrl) continue;

        await saveImage(
          imageUrl,
          selectedModel,
          prompts[i].prompt,
          result.requestId,
          5
        );
      }
      setCredits(prev => prev - (cost));
      toast.success('Images generated successfully!');
    } catch (error) {
      toast.error('Image generation failed.');
    }

    setLoadingPackId(''); // Reset loading state
  };


  useEffect(() => {
    const fetchData = async () => {
      try {
        const modelsResponse = await getModels();
        const packsResponse : GetPackResponse[] = await getPacks();
        setModels(modelsResponse);
        setPacks(packsResponse);
      } catch (error) {
        toast.error('Failed to fetch data. Please try again later.');
      }
    };
    fetchData();
  }, []);

  return (
    <div className="mt-8 flex flex-col gap-4 px-4">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold">Select Model</h1>
        <p className="text-secondary-text">
          Choose an AI model to generate your images
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 place-items-center">
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
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4  place-items-center">
        {packs.map((pack, index) => (
          <PackCard
            id={pack.id}
            key={index}
            imgUrl={pack.thumbnailUrl}
            name={pack.name}
            description={pack.description}
            handleGenerate={handleGenerate}
            loading={pack.id === loadingPackId}
          ></PackCard>
        ))}
      </div>
    </div>
  );
};

export default Packs;
