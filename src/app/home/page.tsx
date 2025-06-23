'use client';
import NavBar from '@/components/Landing/NavBar';
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { fal } from '@fal-ai/client';
import Image from 'next/image';
import { Skeleton } from '@/components/ui/skeleton';
const page = () => {
  const [prompt, setPrompt] = React.useState<string>('');
  const [imageUrl, setImageUrl] = React.useState<string>('');
  const [loading, setLoading] = React.useState<boolean>(false);
  const handleClick = async () => {
    fal.config({
      proxyUrl: '/api/fal/proxy',
    });
    setLoading(true);
    const result = await fal.subscribe('fal-ai/flux/dev', {
      input: {
        prompt: 'a cat',
        image_size: 'square_hd',
      },
      pollInterval: 5000,
      logs: true,
      onQueueUpdate(update) {
        console.log('queue update', update);
      },
    });
    setLoading(false);
    setImageUrl(result.data.images[0].url);
  };
  return (
    <div className="">
      <NavBar></NavBar>
      <div className="mt-24 max-w-7xl mx-auto">
        <Tabs defaultValue="generate" className="max-w-7xl">
          <TabsList className="w-[400px]">
            <TabsTrigger value="camera">Camera</TabsTrigger>
            <TabsTrigger value="generate">Generate Image</TabsTrigger>
            <TabsTrigger value="packs">Packs</TabsTrigger>
            <TabsTrigger value="train">Train Model</TabsTrigger>
          </TabsList>
          <TabsContent value="camera" className="max-w-7xl">
            <div className="mt-8">
              <div className="flex justify-between w-full">
                <h1 className="text-2xl font-bold">Your Gallery</h1>
                <div className="border-white/10 border-[1px] p-2 rounded-2xl text-xs bg-white/20">
                  0 images
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="generate" className="max-w-7xl">
            <div className="mt-8 flex flex-col gap-4">
              <div className="flex flex-col gap-1 ">
                <h1 className="text-2xl font-bold">Select Model</h1>
                <p className="text-secondary-text">
                  Choose an AI model to generate your images
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <Label>Enter your prompt</Label>
                <Textarea
                  onChange={e => {
                    setPrompt(e.target.value);
                  }}
                  placeholder="Generate my image enjoying at the Maldives..."
                ></Textarea>
              </div>
              <Button
                onClick={handleClick}
                variant={'outline'}
                className="w-[20%]"
              >
                Generate Image
              </Button>
              <div className="">
                <div className="relative h-[400px] w-[300px]">
                  {loading ? (
                    <Skeleton className="h-full w-full"></Skeleton>
                  ) : (
                    imageUrl && (
                      <img
                        alt="generated_img"
                        className="object-cover"
                        src={`${imageUrl}`}
                      ></img>
                    )
                  )}
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="packs">Change your password here.</TabsContent>
          <TabsContent value="train">Change your password here.</TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default page;
