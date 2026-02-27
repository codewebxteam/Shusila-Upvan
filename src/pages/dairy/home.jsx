import React from 'react';
import Hero from '../../components/dairy/hero';
import ProductList from '../../components/dairy/ProductList';

const Home = () => {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <Hero />
      
      {/* Product Showcase Section */}
      <div className="relative z-10 -mt-6 sm:-mt-8 lg:-mt-10">
        <ProductList />
      </div>

      {/* Spacer for Floating Navigation */}
      <div className="h-20 sm:h-24 lg:h-0" />
    </main>
  );
};

export default Home;