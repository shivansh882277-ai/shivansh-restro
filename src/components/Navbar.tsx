/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu as MenuIcon, X, ShoppingBag, Calendar, AlertCircle } from 'lucide-react';

interface NavbarProps {
  cartCount: number;
  onCartClick: () => void;
  onMakeReservationClick: () => void;
  onTrackOrderClick: () => void;
  hasActiveOrder: boolean;
}

export default function Navbar({
  cartCount,
  onCartClick,
  onMakeReservationClick,
  onTrackOrderClick,
  hasActiveOrder
}: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      // Is scrolled state
      setIsScrolled(window.scrollY > 50);

      // Scroll progress
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress((window.scrollY / totalHeight) * 100);
      }

      // Active section detection
      const sections = [
        'home', 'about', 'signature', 'menu', 'delivery', 
        'booking', 'events', 'owner', 'reviews', 'gallery', 'contact'
      ];
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 120 && rect.bottom >= 120) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'signature', label: 'Signature' },
    { id: 'menu', label: 'Menu' },
    { id: 'delivery', label: 'Home Delivery' },
    { id: 'booking', label: 'Table Booking' },
    { id: 'events', label: 'Events' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'contact', label: 'Contact' }
  ];

  const handleNavClick = (id: string) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      {/* Scroll Progress Indicator */}
      <div 
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-saffron via-gold to-amber z-50 transition-all duration-100"
        style={{ width: `${scrollProgress}%` }}
      />

      <nav 
        id="navbar-container"
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-500 ${
          isScrolled 
            ? 'bg-maroon/85 backdrop-blur-md py-3 border-b border-gold/15 shadow-xl shadow-black/30' 
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Brand Logo */}
            <div 
              className="flex flex-col cursor-pointer" 
              onClick={() => handleNavClick('home')}
            >
              <h1 className="font-display font-black text-2xl tracking-wider text-gold flex items-center gap-1.5 hover:opacity-95 transition-opacity">
                SHIVANSH
                <span className="text-saffron text-sm font-sans tracking-widest font-semibold bg-saffron/10 px-2 py-0.5 rounded-sm border border-saffron/20">RESTRO</span>
              </h1>
              <span className="text-[9px] font-sans text-beige uppercase tracking-[0.25em] -mt-0.5 opacity-80 pl-0.5">
                The Royal Taste of India
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-7">
              <ul className="flex items-center gap-7">
                {menuItems.map((item) => (
                  <li key={item.id} className="relative">
                    <button
                      onClick={() => handleNavClick(item.id)}
                      className={`text-sm font-sans uppercase tracking-wider transition-colors duration-300 cursor-pointer ${
                        activeSection === item.id 
                          ? 'text-gold font-medium' 
                          : 'text-ivory/80 hover:text-gold'
                      }`}
                    >
                      {item.label}
                    </button>
                    {activeSection === item.id && (
                      <motion.div 
                        layoutId="activeUnderline" 
                        className="absolute -bottom-1.5 left-0 right-0 h-0.5 bg-gradient-to-r from-saffron to-gold"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </li>
                ))}
              </ul>

              {/* Actions Divider */}
              <div className="h-6 w-px bg-gold/20" />

              {/* Utility Interactive Icons (Cart, Booking and Live Order Tracker) */}
              <div className="flex items-center gap-4">
                {/* Active order badge */}
                {hasActiveOrder && (
                  <motion.button
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: [1, 1.1, 1], opacity: 1 }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    onClick={onTrackOrderClick}
                    title="Track active order"
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald/15 hover:bg-emerald/25 border border-emerald/40 text-emerald rounded-full text-xs font-semibold cursor-pointer"
                  >
                    <AlertCircle size={14} className="animate-spin" />
                    <span>Live Order</span>
                  </motion.button>
                )}

                {/* Cart Shopping Bag Button */}
                <button
                  onClick={onCartClick}
                  className="relative p-2.5 rounded-full bg-gold/10 hover:bg-gold/20 border border-gold/30 text-gold hover:text-amber transition-all cursor-pointer group"
                >
                  <ShoppingBag size={18} className="group-hover:scale-110 transition-transform" />
                  <AnimatePresence>
                    {cartCount > 0 && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        className="absolute -top-1 -right-1.5 h-5 w-5 rounded-full bg-saffron text-white text-[10px] font-bold flex items-center justify-center border-2 border-maroon"
                      >
                        {cartCount}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </button>

                {/* Fast Reservation Button */}
                <button
                  onClick={onMakeReservationClick}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-gold via-amber to-saffron text-maroon text-xs uppercase font-bold tracking-wider hover:opacity-95 shadow-md shadow-gold/20 hover:shadow-gold/35 active:scale-95 transition-all cursor-pointer group"
                >
                  <Calendar size={13} className="group-hover:rotate-12 transition-transform" />
                  <span>Book Table</span>
                </button>
              </div>
            </div>

            {/* Mobile Actions Overlay (Cart & Menu triggers) */}
            <div className="flex lg:hidden items-center gap-3">
              {hasActiveOrder && (
                <button
                  onClick={onTrackOrderClick}
                  className="p-2 rounded-full bg-emerald/10 border border-emerald/30 text-emerald"
                  title="Track Active Order"
                >
                  <AlertCircle size={18} className="animate-spin" />
                </button>
              )}

              <button
                onClick={onCartClick}
                className="relative p-2 rounded-full bg-gold/10 border border-gold/30 text-gold"
              >
                <ShoppingBag size={18} />
                {cartCount > 0 && (
                  <span className="absolute -top-0.5 -right-1 h-4.5 w-4.5 rounded-full bg-saffron text-white text-[9px] font-bold flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>

              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-full bg-gold/10 border border-gold/30 text-gold cursor-pointer"
              >
                {isOpen ? <X size={20} /> : <MenuIcon size={20} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden w-full bg-maroon/95 backdrop-blur-lg border-t border-gold/10 overflow-hidden"
            >
              <div className="px-4 pt-3 pb-6 space-y-2">
                {menuItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`block w-full text-left px-4 py-2.5 rounded-lg text-sm font-sans uppercase tracking-wider transition-colors cursor-pointer ${
                      activeSection === item.id 
                        ? 'bg-gold/15 text-gold border-l-2 border-gold font-medium' 
                        : 'text-ivory/80 hover:bg-gold/5'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
                
                <div className="pt-4 border-t border-gold/10 flex flex-col gap-3">
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      onMakeReservationClick();
                    }}
                    className="w-full py-3 rounded-lg bg-gradient-to-r from-gold to-saffron text-maroon text-center text-xs uppercase font-bold tracking-widest cursor-pointer"
                  >
                    Book A Table Now
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
}
