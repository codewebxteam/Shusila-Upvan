import React from 'react';
import Hero from '../../components/mushroom/hero';
import ProductList from '../../components/mushroom/ProductList';

const Home = () => {
  return (
    <main className="min-h-screen bg-white">
      {/* 1. Mushroom Intro */}
      <Hero />
      
      {/* 2. Product Showcase */}
      <div className="relative z-10 -mt-6 lg:-mt-10">
        <ProductList />
      </div>

      {/* Spacer for Floating Nav */}
      <div className="h-24 md:h-0" />
    </main>
  );
};

export default Home;