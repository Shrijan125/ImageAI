'use client';
import { Label } from '@radix-ui/react-label';
import React, { useEffect, useState } from 'react';
import { Textarea } from './ui/textarea';
import { fal } from '@fal-ai/client';
import { Button } from './ui/button';
import { Skeleton } from './ui/skeleton';
import { getModels } from '@/actions/models';
import { TrainModel } from '@/generated/prisma';
import ModelCard from './ModelCard';
import { toast } from 'sonner';
import { saveImage } from '@/actions/gallery';
import { useCredits } from '@/context/CreditsProvider';
import { useRouter } from 'next/navigation';

const Generated = () => {
  const [models, setModels] = useState<TrainModel[]>([]);
  const { setCredits, credits } = useCredits();
  useEffect(() => {
    const fetchModels = async () => {
      const result: TrainModel[] = await getModels();
      setModels(result);
    };
    fetchModels();
  }, []);
  const [prompt, setPrompt] = useState<string>('');
  const router = useRouter();
  const [imageUrl, setImageUrl] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedModel, setSelectedModel] = useState<string>('');
  const handleClick = async () => {
    setLoading(true);
    if (!selectedModel) {
      toast.error('Please select a model.');
      setLoading(false);
      return;
    }
    if (!prompt || prompt.trim() === '') {
      toast.error('Please enter a prompt');
      setLoading(false);
      return;
    }
    if (credits < 5) {
      toast.error('You do not have enough credits to generate an image.');
      setLoading(false);
      router.push('/home/pricing');
      return;
    }
    const modelDetails = models.find(model => model.id === selectedModel);
    if (!modelDetails?.tensorPath) {
      toast.error('Selected model is not trained yet.');
      setLoading(false);
      return;
    }
    const result = await fal.subscribe('fal-ai/flux-lora', {
      input: {
        prompt: prompt,
        loras: [
          {
            path: modelDetails?.tensorPath,
            scale: 1.0,
          },
        ],
      },
      pollInterval: 5000,
      logs: false,
    });
    setLoading(false);
    setImageUrl(result.data.images[0].url);
    if (!result?.data?.images[0]?.url) {
      toast.error('Image generation failed. Please try again.');
      return;
    } else {
      try {
        await saveImage(
          result.data.images[0].url,
          selectedModel,
          prompt,
          result.requestId,
          5
        );
        setCredits(prev => prev - 5);
      } catch (error) {
        throw new Error('Failed to save image');
      }
    }
  };
  return (
    <div className="mt-8 flex flex-col gap-4 px-4">
      <div className="flex flex-col gap-1 ">
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
      <div className="flex flex-col gap-2">
        <Label>Enter your prompt</Label>
        <Textarea
          className="resize-none h-32"
          onChange={e => {
            setPrompt(e.target.value);
          }}
          placeholder="Generate my image enjoying at the Maldives..."
        ></Textarea>
      </div>
      <Button onClick={handleClick} variant={'outline'} className="sm:w-[20%]">
        Generate Image
      </Button>
      <div>
        <div className="relative sm:h-[600px] w-full  h-[400px]  sm:w-[500px] overflow-hidden rounded-md">
          {loading ? (
            <Skeleton className="h-full w-full"></Skeleton>
          ) : (
            imageUrl && (
              <img
                alt="generated_img"
                className="object-cover w-full h-full"
                src={imageUrl || undefined}
              ></img>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Generated;
