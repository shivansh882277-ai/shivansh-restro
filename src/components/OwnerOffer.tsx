/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Phone, MessageCircle, Sparkles, Building, Briefcase, Percent, ShieldCheck } from 'lucide-react';

export default function OwnerOffer() {
  const [negotiatorOpen, setNegotiatorOpen] = useState(false);
  const [groupSize, setGroupSize] = useState('50');
  const [dealGenerated, setDealGenerated] = useState<any>(null);

  const ownerDetails = {
    name: 'Shivansh Agrawal',
    title: 'Founder & Sovereign Patron',
    photo: 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?auto=format&fit=crop&w=500&q=80', // Polished portrait
    phone: '+91 988-227-700',
    whatsapp: 'https://wa.me/91988227700?text=Hello%20Shivansh!%20I%20would%20like%20to%20discuss%20a%20private%20luxury%20banquet%20package%20at%20Shivansh%20Restro.'
  };

  const handleNegotiate = () => {
    const size = parseInt(groupSize);
    let discount = 10;
    let perks = ['Welcome Saffron Lassi', 'Decorated Candlelit Table Setting'];
    
    if (size >= 150) {
      discount = 25;
      perks.push('Free Authentic Gold-Leaf Samosa Platter', 'Live Sitar Duet Ensemble Performance');
    } else if (size >= 80) {
      discount = 20;
      perks.push('Complimentary Kesar Kulfi for all Guests', 'Custom Menu Design');
    } else if (size >= 40) {
      discount = 15;
      perks.push('Free Mango Lassi Nectar Round');
    }

    setDealGenerated({
      discount,
      perks,
      code: 'OWNER-' + Math.floor(1000 + Math.random() * 9000),
      size
    });
  };

  return (
    <section 
      id="owner"
      className="py-24 relative overflow-hidden bg-gradient-to-b from-[#0A0204] to-[#140408]"
    >
      {/* Visual neon golden glows */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-gold/5 rounded-full filter blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-saffron/10 rounded-full filter blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section title */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-maroon/80 border border-gold/15 text-gold font-sans text-xs font-semibold uppercase tracking-wider rounded-md mb-3">
            <Sparkles size={11} className="text-gold" />
            <span>Direct Patron Support</span>
          </div>
          <h2 className="font-display font-medium text-3xl sm:text-4xl text-ivory tracking-wide font-serif mb-4">
            Exclusive Deals, <span className="text-gold">No Intermediaries</span>
          </h2>
          <p className="text-beige/70 text-sm font-light">
            Skip bureaucratic booking queues. Discuss custom anniversary menus or grand corporate budget packages directly with the patron-proprietor himself.
          </p>
        </div>

        {/* Stately Business Card Row */}
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-[#180509]/80 rounded-3xl p-8 sm:p-12 glassmorphism border border-gold/25 shadow-2xl relative">
          
          {/* Owner portrait Column */}
          <div className="md:col-span-5 relative flex justify-center">
            <div className="relative h-64 w-64 rounded-2xl overflow-hidden p-1 bg-gradient-to-tr from-gold via-saffron to-maroon shadow-2xl">
              <img 
                src={ownerDetails.photo}
                alt={ownerDetails.name}
                className="w-full h-full object-cover rounded-xl filter brightness-[0.93]"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-maroon/90 to-transparent p-4 text-center">
                <span className="text-[10px] uppercase font-bold text-gold tracking-widest block font-sans">Patron Since 2016</span>
              </div>
            </div>
            
            {/* Pulsing visual aura */}
            <div className="absolute inset-x-0 top-0 bottom-0 border border-dashed border-gold/15 rounded-3xl -z-10 animate-pulse pointer-events-none" />
          </div>

          {/* Owner Information details & Actions Column */}
          <div className="md:col-span-7 flex flex-col gap-5 text-left">
            <div>
              <span className="text-xs uppercase tracking-widest text-saffron font-bold flex items-center gap-1.5 mb-1 bg-saffron/10 px-3 py-1 rounded w-fit">
                <Percent size={13} className="text-gold animate-bounce" /> Personalized Negotiations
              </span>
              <h3 className="font-display font-bold text-2xl text-ivory tracking-wide font-serif">{ownerDetails.name}</h3>
              <p className="text-xs text-gold/80 italic font-light">{ownerDetails.title}</p>
            </div>

            <p className="text-xs sm:text-sm text-beige/80 leading-relaxed font-light">
              "Namaste. I personally welcome your queries for wedding functions, private celebrations, and elite catering. Click below to talk to me directly—let us plan your memorable feast within your ideal budget range."
            </p>

            {/* Pulsing Hotlines */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <a 
                href={`tel:${ownerDetails.phone}`}
                className="flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-gold text-maroon text-xs uppercase font-extrabold tracking-wider hover:bg-amber transition-all cursor-pointer shadow-md shadow-gold/10 hover:shadow-gold/25 active:scale-95 group animate-gold-pulse"
              >
                <Phone size={14} className="group-hover:rotate-12 transition-transform" />
                <span>Call Directly Now</span>
              </a>

              <a 
                href={ownerDetails.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-emerald hover:bg-emerald/90 text-white text-xs uppercase font-extrabold tracking-wider transition-all cursor-pointer shadow-md active:scale-95 group"
              >
                <MessageCircle size={14} className="group-hover:scale-110 transition-transform" />
                <span>Patron WhatsApp</span>
              </a>
            </div>

            {/* Interactive Package discount Negotiator link */}
            <button
              onClick={() => setNegotiatorOpen(!negotiatorOpen)}
              className="mt-2 text-xs text-gold underline underline-offset-4 hover:text-amber text-left cursor-pointer font-semibold transition-all"
            >
              Want to simulate a budget custom package instantly? Click here &gt;
            </button>
          </div>

        </div>

        {/* Expandable Discount Negotiator Interactive block */}
        <AnimatePresence>
          {negotiatorOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="max-w-4xl mx-auto overflow-hidden mt-6"
            >
              <div className="p-6 sm:p-8 rounded-3xl glassmorphism-light bg-gold/5 border border-gold/15 text-left space-y-6">
                <div className="flex items-center gap-2.5">
                  <Sparkles className="text-gold" size={18} />
                  <h4 className="font-display font-bold text-sm text-gold uppercase tracking-wider">Patron Deal Estimator</h4>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase font-bold text-gold">Proposed Guests Size</label>
                    <select
                      value={groupSize}
                      onChange={(e) => setGroupSize(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-[#0A0204] border border-gold/15 text-xs focus:border-gold focus:outline-none focus:text-white"
                    >
                      <option value="25">Cozy Gathering (20-30 guests)</option>
                      <option value="50">Family Reunion (40-60 guests)</option>
                      <option value="100">Stately Corporate Banquet (80-120 guests)</option>
                      <option value="200">Palatial Wedding Ceremony (150-300 guests)</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase font-bold text-gold">Target Occasion Type</label>
                    <div className="px-4 py-3 rounded-xl bg-[#0A0204] border border-gold/15 text-xs text-beige/80">
                      Private Sovereign Event
                    </div>
                  </div>

                  <button
                    onClick={handleNegotiate}
                    className="py-3 px-6 rounded-xl bg-gradient-to-r from-gold to-saffron text-maroon text-xs uppercase font-extrabold tracking-widest hover:opacity-95 cursor-pointer active:scale-95 transition-transform"
                  >
                    Generate Estimate Package
                  </button>
                </div>

                {/* Deal Generated Output panel */}
                <AnimatePresence>
                  {dealGenerated && (
                    <motion.div
                      initial={{ scale: 0.95, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="p-5 rounded-2xl bg-emerald/10 border border-emerald/30 space-y-4"
                    >
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-emerald/20 pb-3 gap-3">
                        <div>
                          <span className="text-[9px] uppercase text-emerald block font-bold leading-none mb-1">Patron Approved Deal Match</span>
                          <h5 className="font-display font-bold text-sm text-gold">Exclusive {dealGenerated.size}+ Package offer</h5>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-saffron bg-[#0A0204] px-3 py-1 rounded-md border border-gold/15">
                          Code: {dealGenerated.code}
                        </div>
                      </div>

                      <div className="space-y-2 text-xs">
                        <p className="text-beige/85">
                          My system has approved a sovereign <span className="text-emerald font-black text-sm font-serif">{dealGenerated.discount}% Discount</span> on catering rates for your gathering!
                        </p>
                        
                        <div className="space-y-1 pt-1">
                          <span className="text-[9px] uppercase font-bold text-gold">Accompanying Royal Perks:</span>
                          <ul className="space-y-1 pl-4 list-disc text-[11px] text-beige/70">
                            {dealGenerated.perks.map((p: string, i: number) => (
                              <li key={i}>{p}</li>
                            ))}
                          </ul>
                        </div>

                        <p className="text-[10px] italic text-beige/40 pt-1.5 border-t border-emerald/10 flex items-center gap-1.5">
                          <ShieldCheck size={11} className="text-emerald animate-pulse" /> Present this code to our event planner or during your directly calling conversation to apply.
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
