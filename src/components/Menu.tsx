/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Sparkles, Star, Plus, CheckCircle, Leaf, Flame } from 'lucide-react';
import { MENU_ITEMS } from '../data';
import { MenuItem } from '../types';

interface MenuProps {
  onAddToCart: (item: MenuItem) => void;
}

type MenuCategory = 'all' | 'starters' | 'main_course' | 'tandoori' | 'biryani' | 'south_indian' | 'chinese' | 'desserts' | 'beverages';

export default function Menu({ onAddToCart }: MenuProps) {
  const [selectedCategory, setSelectedCategory] = useState<MenuCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterVegOnly, setFilterVegOnly] = useState(false);
  const [filterSpicyOnly, setFilterSpicyOnly] = useState(false);
  const [addedItemIds, setAddedItemIds] = useState<Record<string, boolean>>({});

  const categories: { id: MenuCategory; label: string }[] = [
    { id: 'all', label: 'All Delicacies' },
    { id: 'starters', label: 'Starters' },
    { id: 'main_course', label: 'Main Course' },
    { id: 'tandoori', label: 'Tandoori' },
    { id: 'biryani', label: 'Biryani Specials' },
    { id: 'south_indian', label: 'South Indian' },
    { id: 'chinese', label: 'Indo-Chinese' },
    { id: 'desserts', label: 'Desserts' },
    { id: 'beverages', label: 'Nectar Beverages' }
  ];

  const filteredMenuItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      // Category filter
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }
      // Veg toggle filter
      if (filterVegOnly && !item.isVeg) {
        return false;
      }
      // Spicy filter
      if (filterSpicyOnly && !item.isSpicy) {
        return false;
      }
      // Text search
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        return (
          item.name.toLowerCase().includes(query) ||
          item.description.toLowerCase().includes(query)
        );
      }
      return true;
    });
  }, [selectedCategory, searchQuery, filterVegOnly, filterSpicyOnly]);

  const handleAddClick = (item: MenuItem) => {
    onAddToCart(item);
    
    // Add success animation state
    setAddedItemIds(prev => ({ ...prev, [item.id]: true }));
    setTimeout(() => {
      setAddedItemIds(prev => ({ ...prev, [item.id]: false }));
    }, 1500);
  };

  return (
    <section 
      id="menu"
      className="py-24 relative bg-gradient-to-b from-[#0A0204] to-[#140408]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-maroon/80 border border-gold/15 text-gold font-sans text-xs font-semibold uppercase tracking-wider rounded-md mb-3">
            <Sparkles size={11} className="text-gold" />
            <span>Stately Food Menu</span>
          </div>
          <h2 className="font-display font-medium text-3xl sm:text-4xl text-ivory tracking-wide font-serif mb-4">
            The Golden <span className="text-gold font-serif">Royal Culinary-Card</span>
          </h2>
          <p className="text-beige/70 text-sm font-light leading-relaxed">
            From the clay furnaces of Punjab to the rich mustard spices of Bengal, explore our carefully categorized authentic gourmet catalog.
          </p>
        </div>

        {/* Searching & Filter Controls Bar */}
        <div className="p-4 rounded-3xl glassmorphism mb-12 flex flex-col md:flex-row items-center gap-6 justify-between shadow-xl">
          {/* Search Input bar */}
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gold/60" size={16} />
            <input
              type="text"
              placeholder="Search dishes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-full bg-maroon/20 hover:bg-maroon/40 focus:bg-maroon/40 text-ivory text-sm border border-gold/15 focus:border-gold/45 focus:outline-none transition-colors"
            />
          </div>

          {/* Filtering switches */}
          <div className="flex flex-wrap gap-4 items-center justify-end w-full md:w-auto">
            {/* Vegetarian Toggle Switch */}
            <button
              onClick={() => setFilterVegOnly(!filterVegOnly)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                filterVegOnly 
                  ? 'bg-emerald/15 border-emerald text-emerald hover:bg-emerald/25 shadow-md shadow-emerald/5' 
                  : 'bg-transparent border-gold/15 text-beige/80 hover:border-gold/40'
              }`}
            >
              <Leaf size={14} className={filterVegOnly ? 'text-emerald animate-pulse' : 'text-beige/40'} />
              <span>Veg Only</span>
            </button>

            {/* Spicy Toggle Switch */}
            <button
              onClick={() => setFilterSpicyOnly(!filterSpicyOnly)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                filterSpicyOnly 
                  ? 'bg-saffron/15 border-saffron text-saffron hover:bg-saffron/25 shadow-md shadow-saffron/5' 
                  : 'bg-transparent border-gold/15 text-beige/80 hover:border-gold/40'
              }`}
            >
              <Flame size={14} className={filterSpicyOnly ? 'text-saffron animate-pulse' : 'text-beige/40'} />
              <span>Spicy Dishes</span>
            </button>
          </div>
        </div>

        {/* Categories Tab Selector with animated sliders */}
        <div className="flex overflow-x-auto gap-3 pb-8 mb-10 scrollbar-none scroll-smooth">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`relative px-5 py-3 rounded-full text-xs uppercase tracking-wider font-semibold transition-all duration-300 flex-nowrap shrink-0 whitespace-nowrap cursor-pointer ${
                selectedCategory === cat.id 
                  ? 'text-maroon font-bold' 
                  : 'text-beige/70 hover:text-gold border border-gold/10 hover:border-gold/30'
              }`}
            >
              {selectedCategory === cat.id && (
                <motion.div 
                  layoutId="menuCatBg"
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-gold via-amber to-saffron -z-10 shadow-lg"
                  transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                />
              )}
              {cat.label}
            </button>
          ))}
        </div>

        {/* Menu Cards Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredMenuItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="rounded-3xl bg-[#1c060b]/70 overflow-hidden border border-gold/15 hover:border-gold/40 shadow-xl shadow-black/20 flex flex-col justify-between hover:-translate-y-2.5 transition-all duration-500 hover:shadow-2xl hover:shadow-gold/5 group"
              >
                <div>
                  {/* Image and Badges */}
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-95"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#1c060b] to-transparent" />
                    
                    {/* Badge panel */}
                    <div className="absolute top-4 left-4 flex gap-2">
                      {item.isVeg ? (
                        <span className="flex items-center gap-1 px-2.5 py-1 text-[9px] font-bold uppercase rounded bg-emerald/90 text-white backdrop-blur-md shadow">
                          <Leaf size={10} /> Veg
                        </span>
                      ) : (
                        <span className="px-2.5 py-1 text-[9px] font-bold uppercase rounded bg-maroon/90 text-gold border border-gold/30 backdrop-blur-md shadow">
                          Meat
                        </span>
                      )}
                      
                      {item.isSpicy && (
                        <span className="flex items-center gap-1 px-2.5 py-1 text-[9px] font-bold uppercase rounded bg-saffron/90 text-white backdrop-blur-md shadow">
                          <Flame size={10} /> Spicy
                        </span>
                      )}
                    </div>

                    <div className="absolute bottom-3 right-4 flex items-center gap-1 px-2.5 py-0.5 rounded bg-black/80 border border-gold/20 text-[10px] text-amber font-semibold backdrop-blur-sm shadow">
                      <Star size={10} className="fill-amber text-amber" />
                      <span>{item.rating}</span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6">
                    <h4 className="font-display font-medium text-base text-gold tracking-wide group-hover:text-amber transition-colors">
                      {item.name}
                    </h4>
                    <p className="text-xs text-beige/70 mt-2 line-clamp-2 leading-relaxed font-light">
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* Bottom interactive action bar */}
                <div className="px-6 pb-6 pt-3 border-t border-gold/10 flex items-center justify-between">
                  <span className="font-display font-black text-lg text-gradient bg-clip-text bg-gradient-to-r from-gold to-saffron">
                    ${item.price}.00
                  </span>

                  <button
                    onClick={() => handleAddClick(item)}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer active:scale-95 shadow ${
                      addedItemIds[item.id] 
                        ? 'bg-emerald hover:bg-emerald text-maroon border border-emerald' 
                        : 'bg-gold hover:bg-saffron text-maroon hover:shadow-md'
                    }`}
                  >
                    {addedItemIds[item.id] ? (
                      <>
                        <CheckCircle size={13} className="animate-bounce" />
                        <span>Added</span>
                      </>
                    ) : (
                      <>
                        <Plus size={13} />
                        <span>Add to Cart</span>
                      </>
                    )}
                  </button>
                </div>

              </motion.div>
            ))}
          </AnimatePresence>

          {/* Empty Search Fallback */}
          {filteredMenuItems.length === 0 && (
            <div className="col-span-full text-center py-12 p-8 rounded-3xl glassmorphism border border-gold/15.">
              <h4 className="font-display font-bold text-lg text-gold mb-2">No Imperial Delicacies Found</h4>
              <p className="text-sm text-beige/60">Try clearing active search queries or toggling diet sliders.</p>
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
