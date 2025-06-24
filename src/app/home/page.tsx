import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Generated from '@/components/Generated';
import Camera from '@/components/Camera';
import NavBar from '@/components/landing/NavBar';
import Packs from '@/components/Packs';
// import Train from '@/components/Train';
const page = () => {
  return (
    <div className="">
      <NavBar></NavBar>
      <div className="mt-24 max-w-7xl mx-auto">
        <Tabs defaultValue="camera" className="max-w-7xl">
          <TabsList className="w-[400px]">
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
          <TabsContent value="train">Change your password here.</TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default page;
