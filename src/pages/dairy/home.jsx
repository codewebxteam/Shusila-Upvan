import React from 'react';
import Hero from '../../components/dairy/hero';
import ProductList from '../../components/dairy/ProductList';

const Home = () => {
  return (
    <main className="min-h-screen bg-white">
      {/* 1. Impactful Intro with Video */}
      <Hero />
      
      {/* 2. Direct Sales & Inventory */}
      <div className="relative z-10 -mt-4 lg:-mt-10"> 
        <ProductList />
      </div>

      {/* 3. Bottom Padding for Floating Navigation */}
      <div className="h-20 lg:h-0" />
    </main>
  );
};

export default Home;