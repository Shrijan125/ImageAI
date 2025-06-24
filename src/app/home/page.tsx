import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Generated from '@/components/Generated';
import Camera from '@/components/Camera';
import Packs from '@/components/Packs';
import NavBar from '@/components/Landing/NavBar';
import Footer from '@/components/Landing/Footer';
import TrainModelForm from '@/components/TrainModel';

const page = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1">
        <NavBar></NavBar>
        <div className="mt-24 max-w-7xl mx-auto">
          <Tabs defaultValue="train" className="max-w-7xl">
            <TabsList className="w-[400px] mx-auto">
              <TabsTrigger value="camera">Camera</TabsTrigger>
              <TabsTrigger value="generate">Generate Image</TabsTrigger>
              <TabsTrigger value="packs">Packs</TabsTrigger>
              <TabsTrigger value="train">Train Model</TabsTrigger>
            </TabsList>
            <TabsContent value="camera" className="max-w-7xl">
              <Camera></Camera>
            </TabsContent>
            <TabsContent value="generate" className="max-w-7xl">
              <Generated></Generated>
            </TabsContent>
            <TabsContent value="packs">
              <Packs></Packs>
            </TabsContent>
            <TabsContent value="train">
              <TrainModelForm></TrainModelForm>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default page;
