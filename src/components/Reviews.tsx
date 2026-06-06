/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Quote, Star, Sparkles, Play, X, UserCheck, ShieldCheck } from 'lucide-react';
import { TESTIMONIALS } from '../data';

export default function Reviews() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [videoOpen, setVideoOpen] = useState(false);
  const [videoSpeaker, setVideoSpeaker] = useState('');

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 7000); // Shift page every 7s
    return () => clearInterval(timer);
  }, []);

  const handleSpeakerPlay = (speaker: string) => {
    setVideoSpeaker(speaker);
    setVideoOpen(true);
  };

  return (
    <section 
      id="reviews"
      className="py-24 relative overflow-hidden bg-[#140408]"
    >
      {/* Background blur visual */}
      <div className="absolute top-1/2 left-1/4 w-80 h-80 bg-saffron/5 rounded-full filter blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-gold/5 rounded-full filter blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section title */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-maroon/80 border border-gold/15 text-gold font-sans text-xs font-semibold uppercase tracking-wider rounded-md mb-3">
            <Quote size={11} className="text-gold" />
            <span>Stately Endorsements</span>
          </div>
          <h2 className="font-display font-medium text-3xl sm:text-4xl text-ivory tracking-wide font-serif mb-4">
            Voices of Our <span className="text-gold">Sovereign</span> Guests
          </h2>
          <p className="text-beige/70 text-sm font-light">
            Heed what professional food critics, Michelin culinary consultants, and loving family patrons declare regarding our royal dining standards.
          </p>
        </div>

        {/* Testimonials Composition Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Glass sliding quotes reviews */}
          <div className="lg:col-span-7 relative min-h-[340px] flex flex-col justify-between">
            <Quote className="text-gold/10 absolute -top-12 -left-6" size={130} />

            <div className="relative z-10">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, x: 15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -15 }}
                  transition={{ duration: 0.5 }}
                  className="p-8 sm:p-10 rounded-3xl bg-[#1c060b]/60 border border-gold/20 shadow-2xl space-y-6 text-left relative overflow-hidden"
                >
                  {/* Saffron background glow inside card */}
                  <div className="absolute top-0 right-0 w-36 h-36 radial-gold-glow pointer-events-none opacity-20" />

                  {/* Stars indicators */}
                  <div className="flex gap-1">
                    {[...Array(TESTIMONIALS[activeIndex].rating)].map((_, i) => (
                      <Star key={i} size={15} className="fill-gold text-gold" />
                    ))}
                  </div>

                  {/* Quote Description Text */}
                  <p className="font-serif italic text-base sm:text-lg text-beige leading-relaxed">
                    "{TESTIMONIALS[activeIndex].text}"
                  </p>

                  {/* Profile info footer */}
                  <div className="flex items-center gap-4 pt-4 border-t border-gold/10">
                    <img 
                      src={TESTIMONIALS[activeIndex].image}
                      alt={TESTIMONIALS[activeIndex].name}
                      className="w-12 h-12 rounded-full object-cover border-2 border-gold"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <h4 className="font-display font-bold text-sm text-gold tracking-wide">
                        {TESTIMONIALS[activeIndex].name}
                      </h4>
                      <p className="text-[10px] sm:text-xs text-beige/50 font-light mt-0.5">
                        {TESTIMONIALS[activeIndex].role}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Testimonials Slide paginations dots */}
            <div className="flex justify-center lg:justify-start gap-2.5 mt-6 z-10 pl-6">
              {TESTIMONIALS.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveIndex(idx)}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    activeIndex === idx ? 'w-8 bg-gold' : 'w-2.5 bg-gold/20'
                  }`}
                  title={`Testimonial card ${idx + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Right Column: Premium Interactive Video Review Poster card */}
          <div className="lg:col-span-5 flex justify-center">
            <motion.div 
              initial={{ rotate: -2, scale: 0.95 }}
              whileInView={{ rotate: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative rounded-3xl overflow-hidden shadow-2xl p-1 bg-gradient-to-tr from-gold via-saffron to-maroon w-full max-w-[340px] md:max-w-amber hover:rotate-0 transition-transform duration-500"
            >
              <div className="relative aspect-[4/5] rounded-[20px] overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80"
                  alt="Video feedback guest poster"
                  className="w-full h-full object-cover filter brightness-[0.7] transform hover:scale-103 duration-700"
                  referrerPolicy="no-referrer"
                />
                
                {/* Visual Glass overlays details */}
                <div className="absolute inset-0 bg-gradient-to-t from-maroon/90 via-transparent to-black/30 flex flex-col justify-between p-6">
                  <div className="flex items-center gap-1.5 bg-black/50 border border-gold/30 px-3 py-1 rounded-full text-[10px] text-gold uppercase tracking-widest font-extrabold w-fit backdrop-blur-sm shadow">
                    <UserCheck size={11} />
                    <span>Watch Guest Video</span>
                  </div>

                  <div className="space-y-4 text-left">
                    {/* Play core trigger button overlay */}
                    <button
                      onClick={() => handleSpeakerPlay('Lady Victoria Sterling')}
                      className="h-16 w-16 mx-auto rounded-full bg-gold hover:bg-saffron text-maroon hover:shadow-lg hover:shadow-gold/30 flex items-center justify-center cursor-pointer active:scale-95 transition-all shadow-xl block"
                      title="Play testimony review video"
                    >
                      <Play className="fill-maroon text-maroon translate-x-0.5" size={26} />
                    </button>
                    
                    <div className="text-center pb-2">
                      <h4 className="font-display font-medium text-sm text-gold">Lady Victoria Sterling</h4>
                      <p className="text-[10px] text-beige/80 mt-0.5">Stately Gastronomic Review</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

        </div>

      </div>

      {/* Simulated Premium Video Testimonial Popover overlay modal */}
      <AnimatePresence>
        {videoOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4"
          >
            <div className="max-w-xl w-full p-6 bg-maroon/95 border border-gold/40 rounded-3xl shadow-2xl relative overflow-hidden text-left space-y-6">
              
              {/* Star aura */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 radial-gold-glow pointer-events-none w-72 h-72 opacity-25" />

              <div className="flex justify-between items-center border-b border-gold/20 pb-4 relative z-10">
                <div className="flex items-center gap-2">
                  <Sparkles size={16} className="text-gold animate-bounce" />
                  <h4 className="font-display font-bold text-sm text-gold uppercase tracking-wider">Cinematic Testimony Feed</h4>
                </div>
                <button
                  onClick={() => setVideoOpen(false)}
                  className="p-1.5 rounded-full bg-gold/10 hover:bg-gold/25 border border-gold/20 text-gold cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Simulated cinematic television console feed display */}
              <div className="relative aspect-video bg-black/90 rounded-2xl overflow-hidden border border-gold/15 flex items-center justify-center relative z-10 shadow-2xl group">
                <img 
                  src="https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&w=800&q=80"
                  alt="Fine dining table candle lit review"
                  className="w-full h-full object-cover filter brightness-[0.5] scale-102"
                  referrerPolicy="no-referrer"
                />

                {/* Subtitles text crawl simulator */}
                <div className="absolute inset-x-4 bottom-6 text-center space-y-2">
                  <span className="text-[10px] text-saffron uppercase font-bold tracking-widest block bg-[#0A0204]/75 px-3 py-0.5 rounded-full w-fit mx-auto border border-gold/15">
                     Live Feed: {videoSpeaker}
                  </span>
                  <p className="text-white text-xs leading-relaxed max-w-sm mx-auto font-serif italic text-shadow shadow-black/80 px-4 bg-black/50 py-2 rounded-lg">
                    "...the saffron layers in the Dum Biryani exhaled genuine sandalwood charcoal smoke. The golden naan was exceptionally crisp..."
                  </p>
                </div>

                <div className="absolute top-4 right-4 h-2 w-2 rounded-full bg-red-500 animate-ping" />
              </div>

              <div className="pt-2 flex justify-between items-center text-[10px] text-beige/50 relative z-10 font-sans">
                <p className="flex items-center gap-1.5"><ShieldCheck size={12} className="text-emerald" /> Verified VIP Dinner Patron</p>
                <p>Broadcast feed duration: 0:45</p>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}
