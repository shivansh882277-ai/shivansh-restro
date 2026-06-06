/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Send, ShieldCheck, Mail, ArrowUp, Instagram, Facebook, Twitter, Phone, MessageSquare } from 'lucide-react';

export default function Footer() {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [signedUp, setSignedUp] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setSignedUp(true);
    setTimeout(() => {
      setNewsletterEmail('');
      setSignedUp(false);
    }, 4000);
  };

  const handleBackToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { id: 'home', label: 'Home Entrance' },
    { id: 'about', label: 'Stately Story' },
    { id: 'signature', label: 'Signature Dishes' },
    { id: 'menu', label: 'Imperial Menu' },
    { id: 'delivery', label: 'Home Delivery' },
    { id: 'booking', label: 'Book Seating' },
    { id: 'events', label: 'Private Parties' },
    { id: 'gallery', label: 'Palace Gallery' }
  ];

  const handleNavClick = (id: string) => {
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
    <footer className="bg-gradient-to-b from-[#0A0204] to-[#040102] border-t border-gold/15 text-beige relative overflow-hidden font-sans">
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-maroon/20 to-transparent pointer-events-none" />

      {/* Primary Footer grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 text-left">
          
          {/* Col 1: Brand & Socials (span 4) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="flex flex-col cursor-pointer" onClick={handleBackToTop}>
              <h2 className="font-display font-black text-2xl tracking-wider text-gold flex items-center gap-1.5 hover:opacity-95 transition-opacity">
                SHIVANSH
                <span className="text-saffron text-sm font-sans tracking-widest font-semibold bg-saffron/10 px-2 py-0.5 rounded-sm border border-saffron/20">RESTRO</span>
              </h2>
              <span className="text-[9px] font-sans text-beige uppercase tracking-[0.25em] -mt-0.5 opacity-80 pl-0.5">
                The Royal Taste of India
              </span>
            </div>

            <p className="text-xs sm:text-sm text-beige/70 leading-relaxed font-light">
              Fusing traditional heirloom recipes with 5-star palace hospitality. Explore the genuine visual scents, saffron layers, and coal roasted specialties crafted under sovereign dining care.
            </p>

            {/* Social linkages */}
            <div className="flex gap-4 pt-2">
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noreferrer"
                className="p-2.5 rounded-full bg-gold/5 border border-gold/20 text-gold hover:bg-gold hover:text-maroon transition-all cursor-pointer"
                title="Instagram"
              >
                <Instagram size={16} />
              </a>
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noreferrer"
                className="p-2.5 rounded-full bg-gold/5 border border-gold/20 text-gold hover:bg-gold hover:text-maroon transition-all cursor-pointer"
                title="Facebook"
              >
                <Facebook size={16} />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noreferrer"
                className="p-2.5 rounded-full bg-gold/5 border border-gold/20 text-gold hover:bg-gold hover:text-maroon transition-all cursor-pointer"
                title="Twitter"
              >
                <Twitter size={16} />
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links list (span 2) */}
          <div className="lg:col-span-2 space-y-5">
            <h4 className="font-display font-bold text-xs uppercase tracking-widest text-gold border-b border-gold/15 pb-2">Quick Links</h4>
            <ul className="space-y-2.5 text-xs">
              {quickLinks.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => handleNavClick(link.id)}
                    className="text-beige/75 hover:text-gold transition-colors inline-flex items-center gap-1.5 cursor-pointer text-left"
                  >
                    <span>✦</span> {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Hours details list (span 3) */}
          <div className="lg:col-span-3 space-y-5">
            <h4 className="font-display font-bold text-xs uppercase tracking-widest text-gold border-b border-gold/15 pb-2">Sovereign Hours</h4>
            <div className="space-y-3.5 text-xs text-beige/80">
              <div className="space-y-1">
                <span className="text-white block font-semibold uppercase text-[10px] tracking-wide">Mondays - Fridays:</span>
                <p className="font-light">Lunch hour: 12:00 PM - 03:00 PM</p>
                <p className="font-light">Dinner hour: 07:00 PM - 11:00 PM</p>
              </div>

              <div className="space-y-1 pt-1.5 border-t border-gold/5">
                <span className="text-saffron block font-semibold uppercase text-[10px] tracking-wide">Saturdays - Sundays:</span>
                <p className="font-light">Full-day gala kitchen: 12:00 PM - 11:30 PM</p>
              </div>
            </div>
          </div>

          {/* Col 4: Newsletter signups (span 3) */}
          <div className="lg:col-span-3 space-y-5">
            <h4 className="font-display font-bold text-xs uppercase tracking-widest text-gold border-b border-gold/15 pb-2">Royal Newsletter</h4>
            <p className="text-xs text-beige/70 leading-relaxed font-light">
              Sign up for our sovereign dispatch ledger to enjoy bespoke coupon codes, private tasting session invites, and weekend discounts.
            </p>

            <form onSubmit={handleNewsletterSubmit} className="space-y-2 pt-1.5">
              <div className="relative">
                <input
                  type="email"
                  required
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="alexander@domain.com"
                  className="w-full pl-4 pr-11 py-3 text-xs rounded-xl bg-gold/5 border border-gold/20 focus:border-gold focus:outline-none text-beige"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-lg bg-gold text-maroon hover:bg-saffron transition-colors cursor-pointer"
                  title="Subscribe Now"
                >
                  <Send size={12} />
                </button>
              </div>
            </form>

            <AnimatePresence>
              {signedUp && (
                <motion.div
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.95, opacity: 0 }}
                  className="p-2.5 rounded-xl bg-emerald/15 text-emerald border border-emerald/30 text-[10px] text-center flex items-center justify-center gap-1 font-semibold"
                >
                  <ShieldCheck size={12} /> <span>Patron Code written securely! Check mail.</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>

        {/* Lower Legal disclaimer row */}
        <div className="mt-16 pt-8 border-t border-gold/10 flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-beige/50">
          <p>© {currentYear} SHIVANSH RESTRO. All Stately Rights Reserved.</p>
          <div className="flex gap-6">
            <span>Privateness Charter</span>
            <span>Terms of Sovereignty</span>
            <span>Allergen Notice</span>
          </div>
          
          {/* Smooth back to top link */}
          <button
            onClick={handleBackToTop}
            className="p-2 rounded-full bg-gold/10 hover:bg-gold/25 border border-gold/15 hover:border-gold text-gold transition-all active:scale-90 cursor-pointer flex items-center justify-center"
            title="Return back to entrance"
          >
            <ArrowUp size={14} />
          </button>
        </div>

      </div>
    </footer>
  );
}
