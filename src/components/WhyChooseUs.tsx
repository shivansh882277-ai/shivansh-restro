/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Flame, Leaf, Award, Shield, Truck, GlassWater, Sparkles } from 'lucide-react';

export default function WhyChooseUs() {
  const features = [
    {
      title: 'Authentic Indian Taste',
      desc: 'Formulated with heirloom spice blends from regional Indian provinces, hand-ground in mortar, preserving ancient tastes.',
      icon: <Flame className="text-saffron group-hover:scale-110 group-hover:rotate-6 transition-transform" size={28} />
    },
    {
      title: 'Zesty Fresh Ingredients',
      desc: 'Formulated using biological daily greens, milk-fed spring meats, and organic grains sourced directly from local farm collectives.',
      icon: <Leaf className="text-emerald group-hover:scale-110 transition-transform" size={28} />
    },
    {
      title: 'Exquisite Star Chefs',
      desc: 'Directed under Michelin-consulted culinary veterans with multi-year fine-dining training in elite 5-star palace hotels.',
      icon: <Award className="text-gold group-hover:scale-110 transition-transform" size={28} />
    },
    {
      title: 'Stately Palace Service',
      desc: 'Experience pure traditional hospitality with dedicated table servers, customized plates, and warm reception desk welcomes.',
      icon: <Shield className="text-gold group-hover:scale-110 transition-transform" size={28} />
    },
    {
      title: 'Vapor-Insulated Delivery',
      desc: 'Our delivery couriers transport food in customized secure clay-pot chambers, preserving absolute boiling aroma and freshness.',
      icon: <Truck className="text-saffron group-hover:scale-110 transition-transform" size={28} />
    },
    {
      title: 'Palatial Luxury Ambience',
      desc: 'Dine under golden crystal chandeliers, sandalwood oil vapors, warm candlelight settings, and velvet upholstered seating comfort.',
      icon: <GlassWater className="text-saffron group-hover:scale-110 transition-transform" size={28} />
    }
  ];

  return (
    <section 
      className="py-24 relative overflow-hidden bg-gradient-to-b from-[#0A0204] to-[#120306] mandala-pattern"
    >
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-maroon/10 rounded-full filter blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section title */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-maroon/80 border border-gold/15 text-gold font-sans text-xs font-semibold uppercase tracking-wider rounded-md mb-3">
            <Sparkles size={11} className="text-gold animate-pulse" />
            <span>Stately Credentials</span>
          </div>
          <h2 className="font-display font-medium text-3xl sm:text-4xl text-ivory tracking-wide font-serif mb-4">
            The Pillars of Our <span className="text-gold">Grandeur</span> Elite
          </h2>
          <p className="text-beige/70 text-sm font-light">
            Every choice, seasoning, plating, and service step is calibrated to meet the absolute luxury dining standards our discerning hosts expect.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
          {features.map((feat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="p-8 rounded-3xl bg-[#180509]/75 border border-gold/15 hover:border-gold/45 shadow-lg group hover:-translate-y-2.5 transition-all duration-500 relative overflow-hidden flex flex-col justify-between"
            >
              {/* Gold gradient shine overlay */}
              <div className="absolute -top-12 -right-12 w-32 h-32 bg-gold/5 rounded-full filter blur-[30px] group-hover:bg-gold/15 transition-all duration-500 pointer-events-none" />
              
              <div className="space-y-4">
                {/* Icon wrapper */}
                <div className="p-3.5 bg-gold/5 rounded-2xl w-fit border border-gold/15 group-hover:bg-gold/15 transition-colors">
                  {feat.icon}
                </div>

                <h4 className="font-display font-bold text-base text-gold group-hover:text-amber tracking-wide transition-colors">
                  {feat.title}
                </h4>

                <p className="text-xs sm:text-sm text-beige/80 leading-relaxed font-light">
                  {feat.desc}
                </p>
              </div>

              {/* Stately corner design element */}
              <div className="pt-6 text-[9px] font-mono tracking-widest text-[#D4AF37]/25 uppercase select-none">
                // Sovereign-V.700
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
