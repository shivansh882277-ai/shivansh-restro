/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { ShoppingBag, Calendar, Sparkles, MapPin, ChefHat } from 'lucide-react';

interface HeroProps {
  onOrderNowClick: () => void;
  onBookTableClick: () => void;
}

export default function Hero({ onOrderNowClick, onBookTableClick }: HeroProps) {
  // Floating spice details
  const particles = [
    { id: 1, text: '🌶️', top: '15%', left: '10%', delay: 0, size: '2xl' },
    { id: 2, text: '🌿', top: '75%', left: '15%', delay: 1.5, size: 'xl' },
    { id: 3, text: '🌟', top: '25%', left: '80%', delay: 0.5, size: 'lg' },
    { id: 4, text: '🧄', top: '65%', left: '85%', delay: 2, size: '2xl' },
    { id: 5, text: '✨', top: '50%', left: '4%', delay: 3, size: 'md' },
    { id: 6, text: '🍂', top: '10%', left: '72%', delay: 1, size: 'xl' },
  ];

  return (
    <div 
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-16 royal-maroon-gradient mandala-pattern"
    >
      {/* Parallax Background Visuals */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=1920&q=50"
          alt="Luxury Indian Spices"
          className="w-full h-full object-cover opacity-[0.14] filter scale-105 pointer-events-none"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0204] via-[#0A0204]/75 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#0A0204] to-transparent z-10" />
        {/* Golden Light Spotlights */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold/15 rounded-full filter blur-[120px] mix-blend-screen animate-pulse pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-maroon/50 rounded-full filter blur-[150px] mix-blend-screen pointer-events-none" />
      </div>

      {/* Floating Spices & Stars Particles */}
      <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden hidden md:block">
        {particles.map((p) => (
          <motion.div
            key={p.id}
            initial={{ y: 20, opacity: 0 }}
            animate={{ 
              y: [0, -25, 0],
              x: [0, p.id % 2 === 0 ? 15 : -15, 0],
              opacity: [0.6, 0.9, 0.6],
              rotate: [0, p.id % 2 === 0 ? 25 : -25, 0]
            }}
            transition={{
              duration: 6 + p.id * 1.5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: p.delay
            }}
            style={{ 
              position: 'absolute', 
              top: p.top, 
              left: p.left,
            }}
            className={`text-${p.size} opacity-70 filter drop-shadow-[0_4px_12px_rgba(212,175,55,0.4)] select-none`}
          >
            {p.text}
          </motion.div>
        ))}
      </div>

      {/* Hero Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left column: Text content */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
          className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left gap-6"
        >
          {/* Royal Saffron Tagline Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-saffron/12 border border-saffron/30 text-saffron font-sans text-xs font-semibold tracking-wider uppercase mb-2 animate-bounce-short">
            <Sparkles size={14} className="text-gold animate-pulse" />
            <span>Award-winning Royal Gastronomy</span>
          </div>

          {/* Heading */}
          <h1 className="font-display font-bold text-4xl sm:text-5xl md:text-6xl text-ivory tracking-wide leading-[1.1] font-serif">
            Experience The <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold via-amber to-saffron font-serif font-black drop-shadow-md">Royal Taste</span> Of India
          </h1>

          {/* Subheading */}
          <p className="font-sans text-base sm:text-lg text-beige/85 max-w-xl leading-relaxed font-light">
            Authentic Indian Flavors, Premium Ambience, Unforgettable Memories. Enter a legacy of hand-ground spices and exquisite culinary secrets.
          </p>

          {/* Luxury Highlights Row */}
          <div className="grid grid-cols-3 gap-6 py-4 w-full max-w-md border-y border-gold/15 mt-2">
            <div className="flex flex-col items-center lg:items-start">
              <span className="text-gold font-display font-semibold text-lg flex items-center gap-1">
                <ChefHat size={15} /> 5-Star
              </span>
              <span className="text-beige/60 text-xs font-sans tracking-wide">Elite Chefs</span>
            </div>
            <div className="flex flex-col items-center lg:items-start border-x border-gold/15 px-4">
              <span className="text-gold font-display font-semibold text-lg">100%</span>
              <span className="text-beige/60 text-xs font-sans tracking-wide">Authentic Spices</span>
            </div>
            <div className="flex flex-col items-center lg:items-start">
              <span className="text-gold font-display font-semibold text-lg flex items-center gap-1">
                <MapPin size={14} /> Royal
              </span>
              <span className="text-beige/60 text-xs font-sans tracking-wide">Palace Ambience</span>
            </div>
          </div>

          {/* Action Call-to-Actions */}
          <div className="flex flex-col sm:flex-row items-center gap-4 mt-4 w-full sm:w-auto">
            <button
              onClick={onOrderNowClick}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-saffron via-amber to-gold text-maroon text-sm font-bold uppercase tracking-wider hover:opacity-95 shadow-lg shadow-gold/20 hover:shadow-gold/30 hover:scale-[1.02] active:scale-95 transition-all duration-300 flex items-center justify-center gap-2.5 cursor-pointer"
            >
              <ShoppingBag size={16} />
              <span>Order Food Now</span>
            </button>

            <button
              onClick={onBookTableClick}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-maroon/30 hover:bg-maroon/60 border border-gold/40 text-gold text-sm font-bold uppercase tracking-wider hover:scale-[1.02] active:scale-95 transition-all duration-300 flex items-center justify-center gap-2.5 cursor-pointer shadow-md"
            >
              <Calendar size={16} />
              <span>Book A Table</span>
            </button>
          </div>
        </motion.div>

        {/* Right column: Interactive Visual composition & floating cards */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="lg:col-span-5 relative flex items-center justify-center min-h-[380px] sm:min-h-[450px]"
        >
          {/* Main Hero Circle Visual */}
          <div className="relative w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-gradient-to-tr from-gold/10 via-saffron/10 to-maroon/20 p-2 sm:p-3 border-2 border-dashed border-gold/35 animate-spin-extremely-slow shadow-2xl flex items-center justify-center">
            {/* Embedded mandala pattern ornament */}
            <div className="absolute inset-5 rounded-full bg-gradient-to-r from-maroon to-black flex items-center justify-center overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=800&q=80"
                alt="Shahi Butter Chicken Dish Plate"
                className="w-full h-full object-cover filter brightness-[0.87] translate-y-3"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

          {/* Floating Luxury card 1: Butter Chicken */}
          <motion.div
            initial={{ x: 60, y: -45, opacity: 0 }}
            animate={{ 
              x: 0, 
              opacity: 1,
              y: [0, -12, 0] 
            }}
            transition={{
              type: 'spring',
              stiffness: 70,
              damping: 15,
              delay: 0.6,
              y: {
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut'
              }
            }}
            className="absolute top-1/10 right-0 sm:-right-8 p-3 rounded-2xl glassmorphism max-w-[210px] shadow-2xl flex items-center gap-3 backdrop-blur-lg border border-gold/30 hover:scale-105 transition-all duration-300 cursor-pointer"
            onClick={onOrderNowClick}
          >
            <img 
              src="https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=150&q=80"
              alt="Shahi Butter Chicken"
              className="w-12 h-12 rounded-full object-cover border border-gold/50"
              referrerPolicy="no-referrer"
            />
            <div className="flex flex-col text-left">
              <h4 className="font-display font-bold text-xs text-gold tracking-wide truncate max-w-[120px]">Shahi Butter Chicken</h4>
              <p className="text-[10px] text-beige/80 truncate max-w-[120px]">Creamy tomato gravy</p>
              <div className="flex items-center justify-between mt-1">
                <span className="text-saffron font-bold text-xs">$32</span>
                <span className="text-[10px] text-amber flex items-center gap-0.5">★ 4.9</span>
              </div>
            </div>
          </motion.div>

          {/* Floating Luxury card 2: Hyderabadi Dum Biryani */}
          <motion.div
            initial={{ x: -60, y: 70, opacity: 0 }}
            animate={{ 
              x: 0, 
              opacity: 1,
              y: [0, 10, 0] 
            }}
            transition={{
              type: 'spring',
              stiffness: 70,
              damping: 15,
              delay: 0.8,
              y: {
                duration: 5,
                repeat: Infinity,
                ease: 'easeInOut'
              }
            }}
            className="absolute bottom-1/10 left-0 sm:-left-8 p-3 rounded-2xl glassmorphism max-w-[210px] shadow-2xl flex items-center gap-3 backdrop-blur-lg border border-gold/30 hover:scale-105 transition-all duration-300 cursor-pointer"
            onClick={onOrderNowClick}
          >
            <img 
              src="https://images.unsplash.com/photo-1633945274405-b6c8069047b0?auto=format&fit=crop&w=150&q=80"
              alt="Royal Dum Biryani"
              className="w-12 h-12 rounded-full object-cover border border-gold/50"
              referrerPolicy="no-referrer"
            />
            <div className="flex flex-col text-left">
              <h4 className="font-display font-bold text-xs text-gold tracking-wide truncate max-w-[120px]">Dum Lamb Biryani</h4>
              <p className="text-[10px] text-beige/80 truncate max-w-[120px]">Slow woodfire dum</p>
              <div className="flex items-center justify-between mt-1">
                <span className="text-saffron font-bold text-xs">$36</span>
                <span className="text-[10px] text-amber flex items-center gap-0.5">★ 4.95</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Embedded Extra CSS style for circular slow rotation */}
      <style>{`
        @keyframes spinSlow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-extremely-slow {
          animation: spinSlow 35s linear infinite;
        }
      `}</style>
    </div>
  );
}
