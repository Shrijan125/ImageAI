import Footer from '@/components/Landing/Footer';
import NavBar from '@/components/Landing/NavBar';
import Pricing from '@/components/Landing/Pricing';
import React from 'react';

const page = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1">
        <NavBar></NavBar>
        <div className="mt-24 max-w-7xl mx-auto">
          <Pricing></Pricing>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default page;
