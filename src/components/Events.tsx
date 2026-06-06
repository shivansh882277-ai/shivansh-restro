/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Calendar, Users, DollarSign, Gift, Check, ShieldCheck, Mail, Phone, Award } from 'lucide-react';

interface EventsProps {
  onBanquetsReserved: (details: any) => void;
}

export default function Events({ onBanquetsReserved }: EventsProps) {
  const [selectedOccasion, setSelectedOccasion] = useState('Weddings');
  const [guests, setGuests] = useState(50);
  const [budget, setBudget] = useState(5000);
  const [date, setDate] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [requirements, setRequirements] = useState('');
  const [success, setSuccess] = useState(false);
  const [reservationDetails, setReservationDetails] = useState<any>(null);

  const occasions = [
    { title: 'Weddings', icon: '💍', desc: 'Sovereign wedding ceremonies & royal receptions.' },
    { title: 'Birthday Parties', icon: '🎂', desc: 'Bespoke grand anniversaries & lavish dessert sessions.' },
    { title: 'Corporate Events', icon: '💼', desc: 'High-end corporate keynotes & diplomatic dinner panels.' },
    { title: 'Engagement Functions', icon: '🥂', desc: 'Elegant traditional shanaais & cocktail toast gatherings.' },
    { title: 'Anniversary Celebrations', icon: '🌹', desc: 'Immersive candlelit milestones & private custom menus.' },
    { title: 'Family Gatherings', icon: '🏡', desc: 'Multi-generational family feasts with private live hosts.' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!date || !name || !phone || !email) {
      alert('Kindly configure your contact details and desired date correctly.');
      return;
    }

    const reservationCode = 'ROY-' + Math.floor(20000 + Math.random() * 80000);
    const receipt = {
      code: reservationCode,
      occasion: selectedOccasion,
      guests,
      budget,
      date,
      name,
      phone,
      email
    };

    setReservationDetails(receipt);
    setSuccess(true);
    onBanquetsReserved(receipt);

    // Reset Form
    setDate('');
    setName('');
    setPhone('');
    setEmail('');
    setRequirements('');
  };

  return (
    <section 
      id="events"
      className="py-24 relative overflow-hidden bg-[#0A0204]"
    >
      {/* Background radial lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[500px] hero-radial-lighting pointer-events-none -z-10" />
      <div className="absolute top-0 right-0 w-80 h-80 bg-saffron/10 rounded-full filter blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-maroon/80 border border-gold/15 text-gold font-sans text-xs font-semibold uppercase tracking-wider rounded-md mb-3">
            <Gift size={11} className="text-gold" />
            <span>Private Palatial Banquets</span>
          </div>
          <h2 className="font-display font-medium text-3xl sm:text-4xl text-ivory tracking-wide font-serif mb-4">
            Reserve The Entire <span className="text-gold">Shivansh Restro</span> For Your Special Occasion
          </h2>
          <p className="text-beige/70 text-sm font-light max-w-xl mx-auto">
            From majestic high-capacity halls to custom curated family menus, transform your key milestones into stately legacy experiences.
          </p>
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mt-12">
          
          {/* Left: Interactive Occasion Selector Panels & Banquet Showcase */}
          <div className="lg:col-span-7 space-y-8 text-left">
            {/* Banquet HD Photo with overlay */}
            <div className="relative rounded-3xl overflow-hidden border border-gold/25 h-72 sm:h-96 shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=85"
                alt="Banquet wedding layout setup"
                className="w-full h-full object-cover filter brightness-[0.8]"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0204] via-black/30 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <span className="text-xs uppercase text-gold font-sans font-extrabold tracking-widest flex items-center gap-1">
                  <Award size={13} /> Stately private chef banquets catalog
                </span>
                <h3 className="font-display font-bold text-lg text-white mt-1.5 font-serif">Courtyard Grand Ballroom Setup</h3>
                <p className="text-[11px] text-beige/85 mt-1">Accommodating up to 250 noble guests, featuring gold plated dining service and live sitar ensembles.</p>
              </div>
            </div>

            {/* Occasion Selection Cards Grid */}
            <div className="space-y-3">
              <h4 className="text-[10px] uppercase font-bold tracking-widest text-gold">Choose Your Occasion Category</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {occasions.map((occ) => {
                  const selected = selectedOccasion === occ.title;
                  return (
                    <div
                      key={occ.title}
                      onClick={() => setSelectedOccasion(occ.title)}
                      className={`p-4 rounded-2xl border text-left cursor-pointer transition-all duration-300 flex items-start gap-3.5 relative overflow-hidden group ${
                        selected 
                          ? 'bg-maroon/65 border-gold text-white shadow-xl shadow-gold/5' 
                          : 'bg-gold/5 border-gold/10 text-beige/80 hover:border-gold/30 hover:bg-gold/10'
                      }`}
                    >
                      <span className="text-2xl pt-1 select-none">{occ.icon}</span>
                      <div>
                        <h5 className="font-display font-bold text-xs text-gold group-hover:text-amber transition-colors">
                          {occ.title}
                        </h5>
                        <p className="text-[10px] text-beige/65 leading-relaxed font-light mt-1">{occ.desc}</p>
                      </div>
                      
                      {selected && (
                        <div className="absolute top-3 right-3 h-4 w-4 bg-gold text-maroon rounded-full flex items-center justify-center text-[8px] font-bold">
                          ✓
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right: Booking Form Panel */}
          <div className="lg:col-span-5">
            <div className="p-8 sm:p-10 rounded-3xl glassmorphism bg-[#1c060b]/40 border border-gold/20 shadow-2xl relative">
              <AnimatePresence mode="wait">
                {!success ? (
                  <motion.form
                    key="events-form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-6 text-left"
                  >
                    <div className="border-b border-gold/15 pb-4">
                      <h4 className="font-display text-base font-bold text-gold font-serif">Sovereign Inquiry Ledger</h4>
                      <p className="text-[10px] text-beige/60 mt-1 uppercase">Occasion: <span className="text-white font-bold">{selectedOccasion}</span></p>
                    </div>

                    {/* Guest Slider Count */}
                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-xs">
                        <label className="text-[10px] uppercase font-bold tracking-widest text-gold flex items-center gap-1">
                          <Users size={11} /> <span>Guests Count</span>
                        </label>
                        <span className="font-mono text-saffron font-bold">{guests} Noble Guests</span>
                      </div>
                      <input 
                        type="range"
                        min="20"
                        max="300"
                        step="10"
                        value={guests}
                        onChange={(e) => setGuests(parseInt(e.target.value))}
                        className="w-full h-1 bg-gold/15 accent-gold border-none rounded-lg cursor-pointer"
                      />
                      <div className="flex justify-between text-[8px] text-beige/50 uppercase">
                        <span>Min (20)</span>
                        <span>Max (300)</span>
                      </div>
                    </div>

                    {/* Budget Slider */}
                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-xs">
                        <label className="text-[10px] uppercase font-bold tracking-widest text-gold flex items-center gap-1">
                          <DollarSign size={11} /> <span>Budget Limit</span>
                        </label>
                        <span className="font-mono text-saffron font-bold">${budget} Sovereign USD</span>
                      </div>
                      <input 
                        type="range"
                        min="1000"
                        max="30000"
                        step="500"
                        value={budget}
                        onChange={(e) => setBudget(parseInt(e.target.value))}
                        className="w-full h-1 bg-gold/15 accent-gold border-none rounded-lg cursor-pointer"
                      />
                      <div className="flex justify-between text-[8px] text-beige/50 uppercase">
                        <span>$1,000</span>
                        <span>$30,000+</span>
                      </div>
                    </div>

                    {/* Date select */}
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase font-bold tracking-widest text-gold flex items-center gap-1">
                        <Calendar size={11} /> <span>Event Date</span>
                      </label>
                      <input
                        type="date"
                        required
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full px-4 py-3 bg-gold/5 border border-gold/15 focus:border-gold rounded-xl focus:outline-none text-xs text-beige/80 transition-colors"
                      />
                    </div>

                    {/* Contact fields */}
                    <div className="space-y-3 pt-3 border-t border-gold/10">
                      <div className="space-y-1">
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Your Noble Full Name"
                          className="w-full px-4 py-2.5 bg-gold/5 border border-gold/15 focus:border-gold rounded-xl focus:outline-none text-xs transition-colors"
                        />
                      </div>
                      <div className="space-y-1">
                        <input
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="Contact Phone Number"
                          className="w-full px-4 py-2.5 bg-gold/5 border border-gold/15 focus:border-gold rounded-xl focus:outline-none text-xs transition-colors"
                        />
                      </div>
                      <div className="space-y-1">
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="E-Mail Address"
                          className="w-full px-4 py-2.5 bg-gold/5 border border-gold/15 focus:border-gold rounded-xl focus:outline-none text-xs transition-colors"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] uppercase font-bold tracking-widest text-gold">Special Requirements</label>
                      <textarea
                        value={requirements}
                        onChange={(e) => setRequirements(e.target.value)}
                        placeholder="Premium champagne tier, live sitar setup, flower canopy details, customized menu options..."
                        rows={3}
                        className="w-full px-4 py-3 bg-gold/5 border border-gold/15 focus:border-gold rounded-xl focus:outline-none text-xs transition-colors resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-4 rounded-full bg-gradient-to-r from-gold via-amber to-saffron text-maroon text-xs uppercase font-extrabold tracking-widest hover:opacity-95 shadow shadow-gold/20 active:scale-95 transition-transform cursor-pointer"
                    >
                      Summon Banquet Negotiator
                    </button>
                  </motion.form>
                ) : (
                  /* PRIVATE BANQUET SUCCESS CARD */
                  <motion.div
                    key="events-success"
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-center py-6 space-y-6 flex flex-col items-center text-ivory"
                  >
                    <div className="h-14 w-14 bg-emerald/15 text-emerald border border-emerald/30 rounded-full flex items-center justify-center">
                      <ShieldCheck size={30} />
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-display font-medium text-lg text-gold">Sovereign Inquiry Logged</h4>
                      <p className="text-xs text-beige/70 leading-relaxed max-w-sm">
                        Your private palace banquet request code has been written under royal ink. Our premier event planner will contact you via e-mail within 4 hours.
                      </p>
                    </div>

                    {/* Stately Banquet Receipt Receipt */}
                    <div className="w-full p-5 bg-gradient-to-r from-gold/10 to-saffron/10 border border-gold/30 rounded-2xl text-left text-xs space-y-3 relative font-sans">
                      {/* Mandala watermark */}
                      <div className="absolute inset-0 radial-gold-glow pointer-events-none opacity-20" />
                      
                      <div className="flex justify-between items-center pb-2 border-b border-gold/20 relative z-10">
                        <div>
                          <span className="text-[8px] uppercase text-beige/50">Exclusive banquet ticket</span>
                          <h5 className="font-bold text-gold text-xs leading-none mt-1">{reservationDetails.occasion} Gala</h5>
                        </div>
                        <span className="font-mono text-saffron text-xs font-bold">{reservationDetails.code}</span>
                      </div>

                      <div className="space-y-1.5 relative z-10 text-beige/80">
                        <div className="flex justify-between">
                          <span>Sovereign Host:</span>
                          <span className="text-white font-bold">{reservationDetails.name}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Date Desired:</span>
                          <span className="text-white font-medium">{reservationDetails.date}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Assemble size:</span>
                          <span className="text-white font-medium">{reservationDetails.guests} Nobles</span>
                        </div>
                        <div className="flex justify-between">
                          <span>E-Mail Contact:</span>
                          <span className="text-white font-medium truncate max-w-[140px]">{reservationDetails.email}</span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => setSuccess(false)}
                      className="px-8 py-3 rounded-full border border-gold/30 text-gold text-xs font-bold uppercase tracking-wider hover:bg-gold/5 cursor-pointer transition-colors"
                    >
                      Log Another Request
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
