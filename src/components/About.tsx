/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Trophy, Flame, Heart } from 'lucide-react';

export default function About() {
  const stats = [
    { value: '50,000+', label: 'Happy Guests Served', icon: <Heart className="text-saffron" size={20} /> },
    { value: '100+', label: 'Signature Dishes', icon: <Flame className="text-gold" size={20} /> },
    { value: '10+', label: 'Years of Royal Heritage', icon: <Trophy className="text-amber" size={20} /> },
    { value: '500+', label: 'Stately Events Hosted', icon: <Sparkles className="text-saffron" size={20} /> },
  ];

  return (
    <section 
      id="about"
      className="py-24 relative overflow-hidden bg-gradient-to-b from-[#0A0204] to-[#120306] mandala-pattern"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Split Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Column: Visual Collage */}
          <div className="lg:col-span-6 relative">
            {/* Primary Story Image with Gold frame */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative rounded-3xl p-2 bg-gradient-to-r from-gold via-saffron to-maroon shadow-2xl filter brightness-[0.95]"
            >
              <img 
                src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80"
                alt="Luxury Dining Experience"
                className="w-full h-[320px] sm:h-[420px] object-cover rounded-[20px]"
                referrerPolicy="no-referrer"
              />
            </motion.div>

            {/* Floating Chef Overlay Image */}
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="absolute -bottom-8 -right-4 sm:right-8 bg-maroon/90 backdrop-blur-md p-2.5 rounded-2xl max-w-[200px] sm:max-w-[240px] border border-gold/40 shadow-2xl flex items-center gap-3"
            >
              <img 
                src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=300&q=80"
                alt="Executive Chef"
                className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl object-cover border border-gold/30"
                referrerPolicy="no-referrer"
              />
              <div className="flex flex-col text-left">
                <h4 className="font-display font-bold text-xs sm:text-sm text-gold">Chef Vineet Rawat</h4>
                <p className="text-[10px] sm:text-xs text-beige/80 mt-0.5">3-Time Hotel culinary gold-medalist, custodian of heirloom traditional recipes.</p>
              </div>
            </motion.div>

            {/* Decorative Gold Mandala Halo in background */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full border border-gold/10 -z-10 animate-pulse pointer-events-none" />
          </div>

          {/* Right Column: Narrative Story & Heritage Description */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6 flex flex-col gap-6 text-center lg:text-left"
          >
            {/* Saffron Section Title Tag */}
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-maroon/60 border border-gold/20 text-gold font-sans text-xs font-semibold tracking-wider uppercase mx-auto lg:mx-0 w-fit rounded-md">
              <Sparkles size={12} className="text-gold" />
              <span>Our Stately Story</span>
            </div>

            {/* Story Heading */}
            <h2 className="font-display font-medium text-3xl sm:text-4xl text-ivory tracking-wide leading-tight font-serif">
              An Inheritance of Royal <span className="text-gold">Grandeur</span> & Spices
            </h2>

            {/* Narrative Context */}
            <div className="space-y-4 text-beige/85 text-sm leading-relaxed font-light">
              <p>
                Founded on the majestic principles of traditional Indian royal banquets, <span className="text-gold font-medium">Shivansh Restro</span> serves as a portal to a bypass era of golden palaces, marble pavilions, and feasts curated for dynastic kings. 
              </p>
              <p>
                Our signature spices represent a thorough sensory map of ancient spice caravans—hand-picked under dry summer suns, cured in local clay vats, and hand-ground by traditional mortar techniques to retain their pure essential fragrance. 
              </p>
              <p>
                From rich Kashmiri cardamoms to pristine fresh ghee simmered in old tanneries, every meal honors the rich density of cultural Indian culinary traditions. We welcome your family to write their own stories of laughter, bonds, and luxury tonight.
              </p>
            </div>

            {/* Stately Highlights List */}
            <div className="grid grid-cols-2 gap-4 pt-4 text-left">
              <div className="flex items-start gap-2.5">
                <span className="p-1 rounded bg-gold/15 text-gold text-xs font-bold mt-0.5">✓</span>
                <div>
                  <h5 className="font-display text-xs font-bold text-ivory">Ancestral Hand-Grinding</h5>
                  <p className="text-[10px] text-beige/60">Using volcanic stone mud mortars.</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="p-1 rounded bg-gold/15 text-gold text-xs font-bold mt-0.5">✓</span>
                <div>
                  <h5 className="font-display text-xs font-bold text-ivory">Royal Ambience Comfort</h5>
                  <p className="text-[10px] text-beige/60">Air-conditioned luxury seating.</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Counters & Statistics section */}
        <div className="mt-24 pt-12 border-t border-gold/15">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="p-6 rounded-2xl glassmorphism text-center flex flex-col items-center justify-center gap-3 hover:scale-[1.03] transition-all duration-300 group"
              >
                <div className="p-3 rounded-full bg-gold/5 border border-gold/15 group-hover:bg-gold/15 transition-colors">
                  {stat.icon}
                </div>
                <h3 className="font-display font-black text-2xl sm:text-3xl text-gradient bg-clip-text bg-gradient-to-r from-gold to-saffron">
                  {stat.value}
                </h3>
                <p className="text-xs text-beige/70 uppercase tracking-widest font-sans font-medium">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
