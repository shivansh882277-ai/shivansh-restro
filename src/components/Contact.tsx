/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Phone, Mail, Clock, Compass, Navigation, Sparkles, Send, ShieldCheck, Instagram, Facebook, Twitter } from 'lucide-react';

export default function Contact() {
  const [guestFeedbackName, setGuestFeedbackName] = useState('');
  const [guestFeedbackMsg, setGuestFeedbackMsg] = useState('');
  const [isSent, setIsSent] = useState(false);
  const [mapSimulated, setMapSimulated] = useState(false);

  const contactDetails = [
    {
      title: 'Our Manor Address',
      desc: '742 Maharaja Path, Sovereign Heritage District, New Delhi, 110001, India',
      icon: <MapPin className="text-gold" size={18} />
    },
    {
      title: 'Patron Booking Hotline',
      desc: '+91 988-227-700 / +91 911-332-110',
      icon: <Phone className="text-saffron" size={18} />
    },
    {
      title: 'Embassy E-Mail Link',
      desc: 'shivansh882277@gmail.com / hospitality@shivanshrestro.com',
      icon: <Mail className="text-gold" size={18} />
    }
  ];

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestFeedbackName || !guestFeedbackMsg) {
      alert('Kindly configure your name and feedback particulars.');
      return;
    }
    
    setIsSent(true);
    setTimeout(() => {
      setGuestFeedbackName('');
      setGuestFeedbackMsg('');
      setIsSent(false);
    }, 3000);
  };

  return (
    <section 
      id="contact"
      className="py-24 relative overflow-hidden bg-gradient-to-b from-[#120306] to-[#0A0204] mandala-pattern"
    >
      <div className="absolute top-1/2 right-0 w-80 h-80 bg-saffron/5 rounded-full filter blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section title */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-maroon/80 border border-gold/15 text-gold font-sans text-xs font-semibold uppercase tracking-wider rounded-md mb-3">
            <Compass size={11} className="text-gold" />
            <span>Palatial Coordinates</span>
          </div>
          <h2 className="font-display font-medium text-3xl sm:text-4xl text-ivory tracking-wide font-serif mb-4">
            Connect With Our <span className="text-gold">Hospitality</span> Embassy
          </h2>
          <p className="text-beige/70 text-sm font-light">
            Need custom party menus, live caterings, or have a noble culinary suggestion? Reach out to our hospitality desk or trace your pathing.
          </p>
        </div>

        {/* Contact Composition Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mt-12">
          
          {/* Left Column: Coordinates Info List & Business Hours */}
          <div className="lg:col-span-4 space-y-8 text-left">
            {/* Info Cards */}
            <div className="space-y-4">
              {contactDetails.map((det, idx) => (
                <div 
                  key={idx}
                  className="p-5 bg-gold/5 rounded-2xl border border-gold/10 flex items-start gap-4 transition-all hover:bg-[#180509]/80 hover:border-gold/30 group"
                >
                  <div className="p-3 bg-gold/10 rounded-xl shrink-0 group-hover:bg-gold/20 transition-colors">
                    {det.icon}
                  </div>
                  <div>
                    <h5 className="font-display font-bold text-xs text-gold uppercase tracking-wider">{det.title}</h5>
                    <p className="text-xs sm:text-sm text-beige/85 leading-relaxed mt-1 font-light break-all">{det.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Noble Opening Schedule card */}
            <div className="p-6 bg-[#180509]/60 border border-gold/20 rounded-2xl relative overflow-hidden shadow-xl text-xs space-y-3.5">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 radial-gold-glow pointer-events-none w-52 h-52 opacity-25" />
              
              <div className="flex items-center gap-2 text-gold font-bold">
                <Clock size={15} />
                <span className="uppercase tracking-widest text-[10px]">Sovereign Dining Schedule</span>
              </div>

              <div className="space-y-2 border-t border-gold/10 pt-3 relative z-10 text-beige/85 leading-relaxed">
                <div className="flex justify-between">
                  <span>Mondays - Fridays:</span>
                  <span className="font-bold text-white">Lunch: 12 PM - 3 PM | Dinner: 7 PM - 11 PM</span>
                </div>
                <div className="flex justify-between pt-1 border-t border-gold/5">
                  <span>Saturdays - Sundays:</span>
                  <span className="font-bold text-saffron">Non-stop: 12:00 PM - 11:30 PM (Feast Mode)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Center Column: Dynamic Feedback Form */}
          <div className="lg:col-span-4 text-left">
            <div className="p-6 sm:p-8 rounded-3xl bg-[#1c060b]/40 border border-gold/20 shadow-2xl space-y-6">
              <div>
                <h4 className="font-display text-sm font-bold text-gold uppercase tracking-wider font-serif">Noble Message Cylinder</h4>
                <p className="text-[10px] text-beige/50 mt-1 uppercase">Direct line to guest services</p>
              </div>

              <form onSubmit={handleFeedbackSubmit} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold text-gold">Noble Name</label>
                  <input
                    type="text"
                    required
                    value={guestFeedbackName}
                    onChange={(e) => setGuestFeedbackName(e.target.value)}
                    placeholder="Grand Duke Charles"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#0A0204] border border-gold/15 text-xs focus:border-gold focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold text-gold">Dearest Message / Suggestion</label>
                  <textarea
                    required
                    value={guestFeedbackMsg}
                    onChange={(e) => setGuestFeedbackMsg(e.target.value)}
                    placeholder="We thoroughly appreciated the shahi butter chicken on our wedding anniversary feast last April..."
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl bg-[#0A0204] border border-gold/15 text-xs focus:border-gold focus:outline-none resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSent}
                  className="w-full py-3 rounded-xl bg-gold hover:bg-saffron text-maroon text-xs font-bold uppercase tracking-widest cursor-pointer hover:scale-102 flex items-center justify-center gap-2 transform active:scale-95 transition-all shadow"
                >
                  <Send size={12} />
                  <span>{isSent ? 'Dispatched' : 'Courier Message'}</span>
                </button>
              </form>

              <AnimatePresence>
                {isSent && (
                  <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.95, opacity: 0 }}
                    className="p-3 text-[10px] text-emerald bg-emerald/10 border border-emerald/30 rounded-xl text-center flex items-center justify-center gap-1.5"
                  >
                    <ShieldCheck size={12} /> <span>Message Dispatched into Patron Mailbox.</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Right Column: Embedded Custom Animated Coordinate Interactive Map Map */}
          <div className="lg:col-span-4 text-left">
            <div className="p-6 sm:p-8 rounded-3xl bg-[#1c060b]/40 border border-gold/20 shadow-2xl space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-display text-sm font-bold text-gold uppercase tracking-wider font-serif">Sovereign 2D Pathmaker</h4>
                  <p className="text-[10px] text-beige/50 mt-1 uppercase">Simulate Golden Cartography</p>
                </div>
                <Navigation size={18} className="text-gold" />
              </div>

              {/* Simulated Interactive Map Display Container */}
              <div className="relative aspect-square w-full rounded-2xl bg-[#0A0103] border border-gold/15 overflow-hidden flex items-center justify-center shadow-inner group">
                
                {/* Simulated Grid matrix coordinate lines */}
                <div className="absolute inset-0 mandala-pattern scale-110 opacity-40" />
                <div className="absolute h-px inset-x-0 top-1/2 bg-gold/10" />
                <div className="absolute w-px inset-y-0 left-1/2 bg-gold/10" />

                {/* Simulated Nodes map labels */}
                {/* Node 1: Guest default Manor */}
                <div className="absolute top-1/5 left-1/4 flex flex-col items-center gap-1 relative z-10">
                  <span className="text-[10px] bg-maroon/90 border border-gold/35 px-2 py-0.5 rounded text-white font-bold backdrop-blur">
                    Guest Manor
                  </span>
                  <div className="h-2 w-2 rounded-full bg-gold animate-ping" />
                  <div className="h-2.5 w-2.5 rounded-full bg-gold relative -mt-2" />
                </div>

                {/* Node 2: SHIVANSH RESTRO */}
                <div className="absolute bottom-1/5 right-1/4 flex flex-col items-center gap-1 relative z-10">
                  <span className="text-[10px] bg-gold text-maroon border border-gold/50 px-2 py-0.5 rounded font-black animate-pulse font-serif shadow-xl">
                    SHIVANSH RESTRO
                  </span>
                  <div className="h-2 w-2 rounded-full bg-saffron animate-ping" />
                  <div className="h-3 w-3 rounded-full bg-saffron relative -mt-2" />
                </div>

                {/* Simulated routing animation dotted path */}
                <AnimatePresence>
                  {mapSimulated && (
                    <svg className="absolute inset-0 w-full h-full z-0">
                      <motion.path
                        d="M 96,72 Q 150,150 216,216"
                        fill="none"
                        stroke="#FFBF00"
                        strokeWidth="3"
                        strokeDasharray="6,6"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        exit={{ pathLength: 0 }}
                        transition={{ duration: 2.5, ease: 'easeOut' }}
                      />
                    </svg>
                  )}
                </AnimatePresence>

                {/* Trigger mapping button */}
                <div className="absolute inset-x-6 bottom-6 text-center z-10">
                  <button
                    onClick={() => setMapSimulated(!mapSimulated)}
                    className="w-full py-2.5 px-4 rounded-xl bg-maroon/90 border border-gold/45 text-gold text-xs uppercase font-extrabold tracking-widest hover:bg-maroon transition-colors cursor-pointer"
                  >
                    {mapSimulated ? 'Clear Golden Tracer' : 'Route My Chariot'}
                  </button>
                </div>
              </div>

              {/* Status details line */}
              <div className="text-[10px] text-beige/50 italic flex items-center gap-1.5 pt-1.5 border-t border-gold/10">
                <Sparkles size={11} className="text-gold animate-pulse" />
                <span>Simulated transit coordinates calculated safely.</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
