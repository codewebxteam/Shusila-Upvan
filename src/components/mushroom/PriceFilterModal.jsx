import React from 'react';
import { motion } from 'framer-motion';
import { X, Check } from 'lucide-react';

const priceRanges = [
  { label: 'All Prices', value: [0, Infinity] },
  { label: 'Under ₹200', value: [0, 200] },
  { label: '₹200 - ₹500', value: [200, 500] },
  { label: '₹500 - ₹1000', value: [500, 1000] },
  { label: 'Above ₹1000', value: [1000, Infinity] }
];

const PriceFilterModal = ({ onClose, priceRange, setPriceRange, sortOrder, setSortOrder }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: '100%', opacity: 0.5 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: '100%', opacity: 0.5 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="bg-white w-full sm:max-w-md rounded-t-3xl sm:rounded-3xl p-6 sm:p-8 flex flex-col gap-6 max-h-[80vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-4">
          <h3 className="text-xl font-black uppercase tracking-tight text-slate-900">Sort & Filter</h3>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full text-slate-400 hover:text-slate-900 transition-all">
            <X size={20} />
          </button>
        </div>

        {/* Content Section */}
        <div className="space-y-6">
          {/* Sort By Section */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-400 mb-3">Sort by Price</h4>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setSortOrder(sortOrder === 'asc' ? null : 'asc')}
                className={`py-3 px-4 rounded-xl text-xs font-bold border-2 transition-all ${sortOrder === 'asc' ? 'border-emerald-600 bg-emerald-50 text-emerald-700' : 'border-slate-100 bg-slate-50 text-slate-600'}`}
              >
                Low to High
              </button>
              <button
                onClick={() => setSortOrder(sortOrder === 'desc' ? null : 'desc')}
                className={`py-3 px-4 rounded-xl text-xs font-bold border-2 transition-all ${sortOrder === 'desc' ? 'border-emerald-600 bg-emerald-50 text-emerald-700' : 'border-slate-100 bg-slate-50 text-slate-600'}`}
              >
                High to Low
              </button>
            </div>
          </div>

          {/* Price Range Section */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-400 mb-3">Price Range</h4>
            <div className="flex flex-col gap-2">
              {priceRanges.map((range) => {
                const isSelected = priceRange[0] === range.value[0] && priceRange[1] === range.value[1];
                return (
                  <button
                    key={range.label}
                    onClick={() => setPriceRange(range.value)}
                    className={`flex justify-between items-center py-3.5 px-4 rounded-xl text-sm font-bold border-2 transition-all ${isSelected ? 'border-emerald-600 bg-emerald-50 text-emerald-700' : 'border-slate-100 bg-slate-50 text-slate-600 hover:border-slate-200'}`}
                  >
                    <span>{range.label}</span>
                    {isSelected && <Check size={18} className="text-emerald-600" />}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex gap-3 pt-2">
          <button
            onClick={() => {
              setPriceRange([0, Infinity]);
              setSortOrder(null);
            }}
            className="flex-1 py-3.5 rounded-xl border border-slate-200 text-sm font-black uppercase text-slate-600 hover:bg-slate-50 transition-all"
          >
            Reset
          </button>
          <button
            onClick={onClose}
            className="flex-1 py-3.5 rounded-xl bg-emerald-600 text-white text-sm font-black uppercase shadow-lg shadow-emerald-100 hover:bg-emerald-700 transition-all"
          >
            Apply
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default PriceFilterModal;
