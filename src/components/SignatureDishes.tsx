/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef } from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, ChevronRight, Star, ShoppingCart, Sparkles, Heart } from 'lucide-react';
import { SIGNATURE_DISHES } from '../data';
import { MenuItem } from '../types';

interface SignatureDishesProps {
  onAddToCart: (item: MenuItem) => void;
}

export default function SignatureDishes({ onAddToCart }: SignatureDishesProps) {
  const carouselRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const { scrollLeft, clientWidth } = carouselRef.current;
      const scrollAmount = clientWidth * 0.75;
      const targetScroll = direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount;
      
      carouselRef.current.scrollTo({
        left: targetScroll,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section 
      id="signature"
      className="py-24 relative overflow-hidden bg-gradient-to-b from-[#120306] to-[#0A0204]"
    >
      {/* Background Ambience Decorators */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-saffron/10 rounded-full filter blur-[100px] pointer-events-none" />
      <div className="absolute top-1/3 right-0 w-80 h-80 bg-gold/10 rounded-full filter blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-maroon/80 border border-gold/20 text-gold font-sans text-xs font-semibold uppercase tracking-wider rounded-md mb-3">
              <Sparkles size={12} />
              <span>Imperial Recommendations</span>
            </div>
            <h2 className="font-display font-medium text-3xl sm:text-4xl text-ivory tracking-wide font-serif">
              Our Sovereign <span className="text-gold">Signature</span> Creations
            </h2>
            <p className="text-beige/70 text-sm max-w-xl mt-3 font-light">
              Each masterwork is formulated by our executive chefs, invoking deep royal hospitality traditions and timeless spice ratios.
            </p>
          </div>

          {/* Carousel Navigation Buttons */}
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={() => scroll('left')}
              className="p-3 rounded-full bg-gold/10 hover:bg-gold/20 hover:text-amber text-gold border border-gold/20 transition-all active:scale-95 cursor-pointer hover:shadow-lg hover:shadow-gold/5"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => scroll('right')}
              className="p-3 rounded-full bg-gold/10 hover:bg-gold/20 hover:text-amber text-gold border border-gold/20 transition-all active:scale-95 cursor-pointer hover:shadow-lg hover:shadow-gold/5"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Scrollable Carousel Wrapper */}
        <div 
          ref={carouselRef}
          className="flex overflow-x-auto gap-8 pb-10 scrollbar-none snap-x snap-mandatory flex-nowrap scroll-smooth px-2"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {SIGNATURE_DISHES.map((dish, i) => (
            <motion.div
              key={dish.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="min-w-[280px] sm:min-w-[340px] md:min-w-[380px] w-[380px] bg-[#180509]/80 rounded-3xl overflow-hidden glassmorphism transform-gpu snap-start group relative flex flex-col justify-between border border-gold/20 hover:border-gold/50 shadow-2xl transition-all duration-500 hover:shadow-gold/10 hover:-translate-y-2"
            >
              <div>
                {/* Image Showcase Container with subtle glow */}
                <div className="relative h-[220px] overflow-hidden">
                  <img 
                    src={dish.image}
                    alt={dish.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-[0.9]"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#180509] to-transparent opacity-60" />

                  {/* Badges on overlay */}
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="px-2.5 py-1 text-[10px] uppercase font-bold tracking-wider rounded-lg bg-maroon/90 text-gold border border-gold/30 backdrop-blur-md">
                      Signature
                    </span>
                    {dish.isVeg && (
                      <span className="px-2.5 py-1 text-[10px] uppercase font-bold tracking-wider rounded-lg bg-emerald/90 text-white backdrop-blur-md">
                        Veg
                      </span>
                    )}
                  </div>

                  {/* Rating badge */}
                  <div className="absolute bottom-4 right-4 flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-bold rounded-lg bg-black/75 text-amber backdrop-blur-sm shadow-md">
                    <Star size={11} className="fill-amber text-amber" />
                    <span>{dish.rating}</span>
                  </div>
                </div>

                {/* Card Content details */}
                <div className="p-6">
                  <h3 className="font-display font-bold text-lg text-gold group-hover:text-amber tracking-wide transition-colors duration-300">
                    {dish.name}
                  </h3>
                  <p className="text-xs text-beige/70 mt-2.5 line-clamp-3 leading-relaxed font-light">
                    {dish.description}
                  </p>
                </div>
              </div>

              {/* Bottom Card Strip for Pricing and Ordering */}
              <div className="px-6 pb-6 pt-2 border-t border-gold/10 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-beige/50 font-sans block uppercase tracking-wider">Royal Tier price</span>
                  <span className="text-xl font-bold font-display text-gradient bg-clip-text bg-gradient-to-r from-gold via-amber to-saffron">
                    ${dish.price}
                  </span>
                </div>

                <button
                  onClick={() => onAddToCart(dish)}
                  className="flex items-center gap-2 px-4.5 py-2.5 rounded-full bg-gradient-to-r from-gold/10 to-saffron/10 hover:from-saffron hover:to-gold hover:text-maroon text-gold border border-gold/40 text-xs uppercase font-bold tracking-wider transition-all duration-300 cursor-pointer shadow-md active:scale-95"
                >
                  <ShoppingCart size={13} />
                  <span>Order Now</span>
                </button>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
