/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Image, Sparkles, X, ZoomIn, Eye } from 'lucide-react';
import { GALLERY_ITEMS } from '../data';
import { GalleryItem } from '../types';

type GalleryFilter = 'all' | 'food' | 'interior' | 'events' | 'customers';

export default function Gallery() {
  const [activeFilter, setActiveFilter] = useState<GalleryFilter>('all');
  const [lightboxItem, setLightboxItem] = useState<GalleryItem | null>(null);

  const filters: { id: GalleryFilter; label: string }[] = [
    { id: 'all', label: 'All Treasures' },
    { id: 'food', label: 'Culinary Masterpieces' },
    { id: 'interior', label: 'Palace Ambience' },
    { id: 'events', label: 'Banquets & Celebrations' },
    { id: 'customers', label: 'Guest Moments' }
  ];

  const filteredItems = useMemo(() => {
    if (activeFilter === 'all') return GALLERY_ITEMS;
    return GALLERY_ITEMS.filter((item) => item.category === activeFilter);
  }, [activeFilter]);

  return (
    <section 
      id="gallery"
      className="py-24 relative overflow-hidden bg-gradient-to-b from-[#140408] to-[#0A0204]"
    >
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gold/5 rounded-full filter blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-maroon/80 border border-gold/15 text-gold font-sans text-xs font-semibold uppercase tracking-wider rounded-md mb-3">
            <Image size={11} className="text-gold" />
            <span>Imperial Showcase</span>
          </div>
          <h2 className="font-display font-medium text-3xl sm:text-4xl text-ivory tracking-wide font-serif mb-4">
            A Vista of Palatial <span className="text-gold">Moments</span>
          </h2>
          <p className="text-beige/70 text-sm font-light">
            Sunder your eyes upon visual vignettes of gold chandeliers, seasoned tandoori embers, joyous toasts, and signature copper cookwares.
          </p>
        </div>

        {/* Filter Navigation Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {filters.map((fil) => (
            <button
              key={fil.id}
              onClick={() => setActiveFilter(fil.id)}
              className={`relative px-5 py-3 rounded-full text-xs uppercase tracking-wider font-semibold cursor-pointer transition-all duration-300 ${
                activeFilter === fil.id 
                  ? 'text-maroon font-bold' 
                  : 'text-beige/70 hover:text-gold border border-gold/10 hover:border-gold/30'
              }`}
            >
              {activeFilter === fil.id && (
                <motion.div 
                  layoutId="galleryFilterBg"
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-gold via-amber to-saffron -z-10 shadow-lg"
                  transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                />
              )}
              {fil.label}
            </button>
          ))}
        </div>

        {/* Responsive Grid Panel with dynamic animations */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, idx) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="relative rounded-3xl overflow-hidden aspect-[4/3] group border border-gold/10 hover:border-gold/45 shadow-xl shadow-black/30 hover:-translate-y-1.5 duration-500 transition-all cursor-pointer bg-[#180509]"
                onClick={() => setLightboxItem(item)}
              >
                {/* Photo render */}
                <img 
                  src={item.image}
                  alt={item.caption}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-750 brightness-95"
                  referrerPolicy="no-referrer"
                />

                {/* Dark color overlay on hover with eye check visual */}
                <div className="absolute inset-0 bg-gradient-to-t from-maroon/90 via-[#0A0204]/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-6">
                  <div className="absolute top-4 right-4 p-2 rounded-full bg-gold/20 backdrop-blur-md text-gold border border-gold/30 scale-75 group-hover:scale-100 transition-transform duration-300">
                    <Eye size={16} />
                  </div>

                  <div className="text-left space-y-1 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <span className="text-[9px] uppercase tracking-widest text-saffron font-bold font-sans">
                      {item.category === 'food' && 'Artisanal Dish'}
                      {item.category === 'interior' && 'Palace Hall'}
                      {item.category === 'events' && 'Grand Gala'}
                      {item.category === 'customers' && 'Noble Moment'}
                    </span>
                    <h4 className="font-display font-bold text-xs sm:text-sm text-gold capitalize font-serif truncate">
                      {item.caption}
                    </h4>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

      </div>

      {/* FULL GLASSMORPHIC LIGHTBOX POPUP DIALOG */}
      <AnimatePresence>
        {lightboxItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 backdrop-blur-md z-50 flex items-center justify-center p-4 sm:p-6 cursor-pointer"
            onClick={() => setLightboxItem(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className="max-w-4xl w-full bg-[#180509]/80 border border-gold/40 rounded-3xl overflow-hidden shadow-2xl relative space-y-4 p-3 cursor-default"
              onClick={(e) => e.stopPropagation()} // Stop bubbling up
            >
              {/* Box Header controls */}
              <div className="flex justify-between items-center px-4 pt-4 pb-1 border-b border-gold/15">
                <div className="flex items-center gap-2">
                  <Sparkles size={14} className="text-gold animate-bounce" />
                  <span className="text-[10px] text-gold font-bold uppercase tracking-widest">Sovereign Vista Vault</span>
                </div>
                
                <button
                  onClick={() => setLightboxItem(null)}
                  className="p-1.5 rounded-full bg-gold/10 hover:bg-gold/25 border border-gold/30 text-gold transition-all cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Large Image Showcase panel */}
              <div className="relative aspect-[16/9] w-full max-h-[70vh] rounded-2xl overflow-hidden border border-gold/15">
                <img 
                  src={lightboxItem.image}
                  alt={lightboxItem.caption}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                
                {/* Subtle caption bottom panel */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-maroon/90 to-transparent p-6 text-left">
                  <span className="text-[10px] uppercase text-gold font-sans font-bold tracking-widest block mb-1">
                    Category: {lightboxItem.category}
                  </span>
                  <p className="text-white text-sm font-serif italic max-w-2xl leading-relaxed">
                    "{lightboxItem.caption}"
                  </p>
                </div>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}
