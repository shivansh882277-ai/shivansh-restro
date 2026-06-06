/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, UserCircle, Phone, Mail, Clock, Users, CheckCircle2, Ticket, Sparkles, MapPin } from 'lucide-react';
import { DATES_AVAILABLE, TIMES_AVAILABLE } from '../data';

interface TableBookingProps {
  onReservationComplete: (res: any) => void;
}

export default function TableBooking({ onReservationComplete }: TableBookingProps) {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [guests, setGuests] = useState(2);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [requests, setRequests] = useState('');
  
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [ticketDetails, setTicketDetails] = useState<any>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDate || !selectedTime || !name || !phone || !email) {
      alert('Kindly configure your reservation particulars completely.');
      return;
    }

    const ticketCode = 'REC-' + Math.floor(1000 + Math.random() * 9000);
    const receipt = {
      code: ticketCode,
      name,
      guests,
      date: selectedDate,
      time: selectedTime,
      email,
      phone
    };

    setTicketDetails(receipt);
    setBookingSuccess(true);
    onReservationComplete(receipt);

    // Reset Form
    setName('');
    setPhone('');
    setEmail('');
    setRequests('');
    setSelectedDate('');
    setSelectedTime('');
    setGuests(2);
  };

  return (
    <section 
      id="booking"
      className="py-24 relative overflow-hidden bg-gradient-to-b from-[#140408] to-[#0A0204] mandala-pattern"
    >
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-maroon/25 rounded-full filter blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-gold/10 rounded-full filter blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-maroon/80 border border-gold/15 text-gold font-sans text-xs font-semibold uppercase tracking-wider rounded-md mb-3">
            <Ticket size={11} className="text-gold animate-bounce" />
            <span>Royal Reservations</span>
          </div>
          <h2 className="font-display font-medium text-3xl sm:text-4xl text-ivory tracking-wide font-serif mb-4">
            Secure A Feast <span className="text-gold">Chamber</span> Seating
          </h2>
          <p className="text-beige/70 text-sm font-light">
            Indulge in absolute royal hospitality. Book premium tables in advance for candle-lit dinners or cozy family celebrations.
          </p>
        </div>

        {/* Outer reservation box */}
        <div className="max-w-4xl mx-auto rounded-3xl glassmorphism bg-[#1c060b]/40 overflow-hidden border border-gold/20 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            
            {/* Left Column: Hospitality Guarantee */}
            <div className="lg:col-span-5 p-8 sm:p-12 bg-gradient-to-b from-maroon/80 to-[#120104]/90 flex flex-col justify-between border-r border-gold/15 text-left relative overflow-hidden">
              <div className="absolute inset-0 radial-gold-glow pointer-events-none opacity-40" />

              <div className="space-y-6 relative z-10">
                <h3 className="font-serif font-display text-2xl text-gold tracking-wide">The Sovereign Hospitality Seal</h3>
                <p className="text-xs text-beige/85 leading-relaxed font-light">
                  When you reserve a table at Shivansh Restro, we safeguard your seating for the entire evening. Enjoy private table servers, custom tailored welcome drinks, and the finest hospitality.
                </p>

                <div className="space-y-4 pt-4">
                  <div className="flex gap-3 text-xs">
                    <CheckCircle2 className="text-gold shrink-0 mt-0.5" size={14} />
                    <div>
                      <h5 className="font-bold text-white">Full Table Host Security</h5>
                      <p className="text-[10px] text-beige/60">No tight slot limits. Dine at ease.</p>
                    </div>
                  </div>
                  <div className="flex gap-3 text-xs">
                    <CheckCircle2 className="text-gold shrink-0 mt-0.5" size={14} />
                    <div>
                      <h5 className="font-bold text-white">Bespoke Custom Requests</h5>
                      <p className="text-[10px] text-beige/60">Allergy-safe or anniversary items managed.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Stately footer */}
              <div className="pt-12 text-left relative z-10">
                <p className="text-[10px] text-gold uppercase tracking-wider font-extrabold flex items-center gap-1.5 mb-1.5">
                  <MapPin size={11} /> Palatial Chambers
                </p>
                <p className="text-[11px] text-beige/70">742 Maharaja Path, New Delhi, India</p>
                <p className="text-[11px] text-beige/50 mt-0.5">Assistance hotline: +91 988-227-700</p>
              </div>
            </div>

            {/* Right Column: Interaction Form */}
            <div className="lg:col-span-7 p-8 sm:p-12 text-left">
              <AnimatePresence mode="wait">
                {!bookingSuccess ? (
                  <motion.form 
                    key="booking-form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit} 
                    className="space-y-6"
                  >
                    {/* Guest Count Card Selectors */}
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase font-bold tracking-widest text-gold flex items-center gap-1.5">
                        <Users size={12} />
                        <span>Assemble Guest Count</span>
                      </label>
                      <div className="grid grid-cols-5 gap-2 sm:gap-3">
                        {[1, 2, 4, 6, 8].map((g) => (
                          <button
                            key={g}
                            type="button"
                            onClick={() => setGuests(g)}
                            className={`py-3.5 rounded-xl border text-xs font-bold transition-all duration-300 flex flex-col items-center justify-center cursor-pointer ${
                              guests === g 
                                ? 'bg-gradient-to-tr from-gold via-amber to-saffron text-maroon border-gold hover:opacity-95 text-sm' 
                                : 'bg-transparent border-gold/15 text-beige hover:border-gold/30 hover:bg-gold/5'
                            }`}
                          >
                            <span>{g}</span>
                            <span className="text-[8px] font-light uppercase opacity-75">{g === 1 ? 'Guest' : 'Guests'}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Date Horizontal Select Cards */}
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase font-bold tracking-widest text-gold flex items-center gap-1.5">
                        <Calendar size={12} />
                        <span>Select Auspicious Date</span>
                      </label>
                      <div className="flex gap-2 overflow-x-auto pb-2.5 scrollbar-none">
                        {DATES_AVAILABLE.map((dateStr) => {
                          const dateObj = new Date(dateStr);
                          const dayNum = dateObj.getDate();
                          const monthStr = dateObj.toLocaleString('en-US', { month: 'short' });
                          const selected = selectedDate === dateStr;

                          return (
                            <button
                              key={dateStr}
                              type="button"
                              onClick={() => setSelectedDate(dateStr)}
                              className={`px-4.5 py-2.5 rounded-xl border text-center shrink-0 flex flex-col justify-center min-w-[70px] cursor-pointer transition-all ${
                                selected 
                                  ? 'bg-gradient-to-r from-gold to-saffron text-maroon border-gold font-bold scale-102 shadow-md' 
                                  : 'bg-transparent border-gold/10 text-beige/80 hover:border-gold/30 hover:bg-gold/5'
                              }`}
                            >
                              <span className="text-xs uppercase tracking-wider font-light opacity-80">{monthStr}</span>
                              <span className="text-lg font-black font-display">{dayNum}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Time Hourly Select Gird */}
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase font-bold tracking-widest text-gold flex items-center gap-1.5">
                        <Clock size={12} />
                        <span>Select Hour Index</span>
                      </label>
                      <div className="flex gap-2 overflow-x-auto pb-2.5 scrollbar-none">
                        {TIMES_AVAILABLE.map((t) => {
                          const selected = selectedTime === t;
                          return (
                            <button
                              key={t}
                              type="button"
                              onClick={() => setSelectedTime(t)}
                              className={`px-4.5 py-2 rounded-full border shrink-0 text-xs font-semibold cursor-pointer transition-all ${
                                selected 
                                  ? 'bg-gradient-to-r from-gold to-saffron text-maroon border-gold' 
                                  : 'bg-transparent border-gold/10 text-beige/80 hover:border-gold/30'
                              }`}
                            >
                              {t}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Form Input fields */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-3 border-t border-gold/10">
                      <div className="space-y-1">
                        <label className="text-[10px] uppercase font-bold tracking-widest text-gold flex items-center gap-1">
                          <UserCircle size={11} /> <span>Your Noble Name</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="e.g., Lord Alexander"
                          className="w-full px-4 py-3 bg-gold/5 border border-gold/15 focus:border-gold rounded-xl focus:outline-none text-xs transition-colors"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] uppercase font-bold tracking-widest text-gold flex items-center gap-1">
                          <Phone size={11} /> <span>Contact Phone</span>
                        </label>
                        <input
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="e.g., +1 (555) 019-2834"
                          className="w-full px-4 py-3 bg-gold/5 border border-gold/15 focus:border-gold rounded-xl focus:outline-none text-xs transition-colors"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] uppercase font-bold tracking-widest text-gold flex items-center gap-1">
                        <Mail size={11} /> <span>E-Mail Address</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="e.g., alexander@royalhall.com"
                        className="w-full px-4 py-3 bg-gold/5 border border-gold/15 focus:border-gold rounded-xl focus:outline-none text-xs transition-colors"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] uppercase font-bold tracking-widest text-gold">Special Requirements (Optional)</label>
                      <textarea
                        value={requests}
                        onChange={(e) => setRequests(e.target.value)}
                        placeholder="Allergy limits, Wheelchair accessibility, Window seat, Champagne bottle request..."
                        rows={2}
                        className="w-full px-4 py-3 bg-gold/5 border border-gold/15 focus:border-gold rounded-xl focus:outline-none text-xs transition-colors resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-4 rounded-full bg-gradient-to-r from-gold via-amber to-saffron text-maroon text-xs uppercase font-extrabold tracking-widest hover:opacity-95 hover:scale-[1.01] active:scale-95 shadow-md shadow-gold/20 transition-all cursor-pointer flex items-center justify-center gap-2"
                    >
                      <Calendar size={14} />
                      <span>Confirm Reservation</span>
                    </button>
                  </motion.form>
                ) : (
                  /* BOOKING SUCCESS SCREEN (GOLDEN TICKET) */
                  <motion.div 
                    key="booking-success"
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-center py-6 space-y-8 flex flex-col items-center"
                  >
                    <div className="h-16 w-16 bg-emerald/15 text-emerald border border-emerald/30 rounded-full flex items-center justify-center">
                      <CheckCircle2 size={32} />
                    </div>

                    <div className="space-y-2">
                      <h3 className="font-display font-medium text-lg text-gold">Seating Verified!</h3>
                      <p className="text-xs text-beige/70 max-w-sm leading-relaxed">
                        Your royal table reservation details are recorded in our ledgers. Present this golden digital ticket upon entry.
                      </p>
                    </div>

                    {/* Royal Golden Ticket Container */}
                    <div className="w-full max-w-md p-6 bg-gradient-to-r from-[#D4AF37]/15 to-[#FFBF00]/15 border-2 border-dashed border-gold/40 rounded-2xl relative overflow-hidden backdrop-blur shadow-2xl flex flex-col gap-4 text-left">
                      {/* Ticket notches on the sides */}
                      <div className="absolute -left-3 top-1/2 -translate-y-1/2 h-6 w-6 rounded-full bg-[#0A0204]" />
                      <div className="absolute -right-3 top-1/2 -translate-y-1/2 h-6 w-6 rounded-full bg-[#0A0204]" />
                      
                      {/* Mandala glow */}
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 radial-gold-glow pointer-events-none w-52 h-52 opacity-30" />

                      <div className="flex items-center justify-between border-b border-gold/20 pb-3 relative z-10">
                        <div>
                          <h4 className="font-display font-bold text-sm text-gold">SHIVANSH RESTRO</h4>
                          <span className="text-[8px] uppercase tracking-widest text-beige/50">Maharaja Dining Entry</span>
                        </div>
                        <Ticket className="text-gold" size={24} />
                      </div>

                      <div className="grid grid-cols-2 gap-4 relative z-10 text-xs text-beige/90">
                        <div>
                          <span className="text-[9px] uppercase text-beige/40 block">Guest Host:</span>
                          <span className="text-white font-semibold">{ticketDetails.name}</span>
                        </div>
                        <div>
                          <span className="text-[9px] uppercase text-beige/40 block">Assemble size:</span>
                          <span className="text-white font-semibold">{ticketDetails.guests} {ticketDetails.guests === 1 ? 'Guest' : 'Guests'}</span>
                        </div>
                        <div>
                          <span className="text-[9px] uppercase text-beige/40 block">Sovereign Date:</span>
                          <span className="text-white font-semibold">{ticketDetails.date}</span>
                        </div>
                        <div>
                          <span className="text-[9px] uppercase text-beige/40 block">Auspicious Time:</span>
                          <span className="text-white font-semibold">{ticketDetails.time}</span>
                        </div>
                      </div>

                      <div className="pt-3 border-t border-gold/20 flex justify-between items-center relative z-10">
                        <div>
                          <span className="text-[8px] uppercase text-beige/40 block">Royal Seat Code:</span>
                          <span className="font-mono text-saffron text-sm font-bold tracking-wider">{ticketDetails.code}</span>
                        </div>
                        <span className="text-[9px] font-mono text-emerald bg-emerald/10 border border-emerald/30 px-2 py-0.5 rounded uppercase font-bold animate-pulse">
                          CONFIRMED
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => setBookingSuccess(false)}
                      className="px-8 py-3 rounded-full border border-gold/30 text-gold text-xs font-bold uppercase tracking-wider hover:bg-gold/5 cursor-pointer transition-colors"
                    >
                      Book Another Seating
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
