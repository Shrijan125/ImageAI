'use client';
import React from 'react';
import HeroCard from './HeroCard';
import Footer from './Footer';
import NavBar from './NavBar';
import ImageShowCase from './ImageShowCase';
import Steps from './Steps';
import Pricing from './Pricing';

const Landing = () => {
  return (
    <main className="min-h-screen overflow-x-hidden">
      <div className="flex-1">
        <NavBar />
        <HeroCard />
        <ImageShowCase />
        <Steps />
        <Pricing></Pricing>
      </div>
      <Footer />
    </main>
  );
};
export default Landing;
