import React, { useState, useRef } from 'react';
import { AnimatePresence } from 'framer-motion';
import Hero from '../../components/mushroom/hero';
import ProductList from '../../components/mushroom/ProductList';
import PriceFilterModal from '../../components/mushroom/PriceFilterModal';

const Home = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [priceRange, setPriceRange] = useState([0, Infinity]);
  const [sortOrder, setSortOrder] = useState(null); // 'asc' or 'desc'
  const productListRef = useRef(null);

  const scrollToProducts = () => {
    productListRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <Hero onShopNow={scrollToProducts} onPriceList={() => setIsFilterOpen(true)} />
      
      {/* Product Showcase Section */}
      <div ref={productListRef} className="relative z-10 mt-6 sm:mt-8 lg:mt-10">
        <ProductList priceRange={priceRange} sortOrder={sortOrder} />
      </div>

      {/* Spacer for Floating Navigation */}
      <div className="h-20 sm:h-24 lg:h-0" />

      <AnimatePresence>
        {isFilterOpen && (
          <PriceFilterModal 
            onClose={() => setIsFilterOpen(false)}
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            sortOrder={sortOrder}
            setSortOrder={setSortOrder}
          />
        )}
      </AnimatePresence>
    </main>
  );
};

export default Home;