/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight, CheckCircle, Truck, Clock, AlertCircle, Sparkles } from 'lucide-react';
import { CartItem, MenuItem } from '../types';

interface DeliveryProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onIncrementQuantity: (item: MenuItem) => void;
  onDecrementQuantity: (item: MenuItem) => void;
  onRemoveFromCart: (item: MenuItem) => void;
  onClearCart: () => void;
  onOrderPlaced: (order: { id: string; items: CartItem[]; customerName: string; address: string; deliveryTime: string }) => void;
  activeOrder: { id: string; items: CartItem[]; customerName: string; address: string; deliveryTime: string; status: number } | null;
  onCancelOrder: () => void;
  onSetStatus: (status: number) => void;
}

export default function Delivery({
  isOpen,
  onClose,
  cartItems,
  onIncrementQuantity,
  onDecrementQuantity,
  onRemoveFromCart,
  onClearCart,
  onOrderPlaced,
  activeOrder,
  onCancelOrder,
  onSetStatus
}: DeliveryProps) {
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'checkout' | 'success'>('cart');
  
  // Checkout Form Details
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'card'>('cod');
  const [cardNo, setCardNo] = useState('');
  const [orderSummary, setOrderSummary] = useState<any>(null);

  // Auto-progress simulated delivery state
  useEffect(() => {
    if (activeOrder && activeOrder.status < 3) {
      const interval = setInterval(() => {
        onSetStatus(activeOrder.status + 1);
      }, 15000); // Progress every 15s
      return () => clearInterval(interval);
    }
  }, [activeOrder, onSetStatus]);

  const subtotal = cartItems.reduce((acc, item) => acc + (item.menuItem.price * item.quantity), 0);
  const deliveryFee = subtotal > 50 ? 0 : 5;
  const royalTax = Math.round(subtotal * 0.08); // 8% Gst
  const grandTotal = subtotal + deliveryFee + royalTax;

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !address) {
      alert('Kindly supply your full imperial name, contact, and transport address.');
      return;
    }

    const orderId = 'SHV-' + Math.floor(100000 + Math.random() * 900000);
    const mockOrder = {
      id: orderId,
      items: [...cartItems],
      customerName: name,
      address: address,
      deliveryTime: '35 mins'
    };

    setOrderSummary(mockOrder);
    onClearCart();
    onOrderPlaced(mockOrder);
    setCheckoutStep('success');
  };

  const statusSteps = [
    { label: 'Order Registered', desc: 'Received in imperial courtyard' },
    { label: 'In royal hearths', desc: 'Chef cooking with premium charcoal' },
    { label: 'Out with courier', desc: 'Sprinting with secure vapor-insulated boxes' },
    { label: 'Ascended to Throne', desc: 'Arrived at your door. Bon Appétit!' }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Blur overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/65 backdrop-blur-sm z-50 cursor-pointer"
          />

          {/* Sliding Canvas Drawer panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-maroon/95 backdrop-blur-xl border-l border-gold/20 shadow-2xl z-50 flex flex-col h-full overflow-hidden text-ivory"
          >
            {/* Drawer Header */}
            <div className="p-6 border-b border-gold/15 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <ShoppingBag className="text-gold" size={20} />
                <h3 className="font-display font-bold text-lg text-gold uppercase tracking-wider">
                  {checkoutStep === 'cart' && 'Royal Food Cart'}
                  {checkoutStep === 'checkout' && 'Imperial Dispatch'}
                  {checkoutStep === 'success' && 'Ascending Courier'}
                </h3>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded-full bg-gold/15 hover:bg-gold/25 border border-gold/20 text-gold transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Main scrollable body */}
            <div className="flex-1 overflow-y-auto p-6 scrollbar-none">
              
              {/* IF LIVE ORDER TRACKER IN ACTIVE */}
              {activeOrder ? (
                <div className="space-y-6">
                  {/* Stately Success Box */}
                  <div className="p-5 rounded-2xl bg-emerald/10 border border-emerald/30 text-center relative overflow-hidden">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 radial-gold-glow w-48 h-48 pointer-events-none" />
                    <Sparkles className="text-gold mx-auto mb-2.5 animate-pulse" size={24} />
                    <h4 className="font-display font-medium text-gold">Feast In Transit</h4>
                    <p className="text-xs text-beige/85 mt-2">
                      Royal Order <span className="font-mono text-white font-bold">{activeOrder.id}</span> is actively steaming!
                    </p>
                  </div>

                  {/* Tracker visual progression vertical line */}
                  <div className="space-y-6 pl-4 relative before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-gold/10">
                    {statusSteps.map((step, idx) => {
                      const isActive = activeOrder.status === idx;
                      const isCompleted = activeOrder.status > idx;

                      return (
                        <div key={idx} className="flex gap-4 relative">
                          <div className={`h-6 w-6 rounded-full flex items-center justify-center text-[10px] font-bold border relative z-10 ${
                            isCompleted 
                              ? 'bg-emerald border-emerald text-maroon' 
                              : isActive 
                                ? 'bg-gold border-gold text-maroon animate-gold-pulse' 
                                : 'bg-[#180509] border-gold/20 text-gold/40'
                          }`}>
                            {isCompleted ? '✓' : idx + 1}
                          </div>
                          
                          <div className="text-left flex-1">
                            <h5 className={`font-sans text-xs font-bold ${isActive ? 'text-gold' : isCompleted ? 'text-emerald' : 'text-beige/40'}`}>
                              {step.label}
                            </h5>
                            <p className="text-[10px] text-beige/50 font-light mt-0.5">{step.desc}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Dispatch details summary */}
                  <div className="p-4 rounded-xl bg-gold/5 border border-gold/15 space-y-2.5 text-xs">
                    <div className="flex items-center gap-2 text-gold font-bold">
                      <Truck size={14} />
                      <span>Throne Delivery Address</span>
                    </div>
                    <p className="text-beige/80 pl-6 leading-relaxed">{activeOrder.address}</p>
                    <div className="flex items-center gap-2 text-gold font-bold pt-1.5 border-t border-gold/10">
                      <Clock size={14} />
                      <span>Aroma arrival:</span>
                      <span className="text-saffron font-bold text-sm ml-auto animate-pulse">~30 Mins</span>
                    </div>
                  </div>

                  <button
                    onClick={onCancelOrder}
                    className="w-full py-3.5 rounded-xl border border-red-500/20 text-red-400 hover:bg-red-500/10 text-xs font-bold uppercase tracking-widest transition-colors cursor-pointer"
                  >
                    Cancel Royal Courier
                  </button>
                </div>
              ) : (
                /* CART & CHECKOUT DRAWER */
                <>
                  {checkoutStep === 'cart' && (
                    <div className="space-y-6">
                      {cartItems.length === 0 ? (
                        <div className="text-center py-16">
                          <ShoppingBag className="text-gold/20 mx-auto mb-4" size={56} />
                          <h4 className="font-display font-medium text-gold">Your Royal Tray is Empty</h4>
                          <p className="text-xs text-beige/60 max-w-[240px] mx-auto mt-2 leading-relaxed">
                            Ascend to our culinary card menu, and summon some signature delicacies.
                          </p>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          {cartItems.map((item) => (
                            <div 
                              key={item.menuItem.id}
                              className="flex items-center gap-4 p-3 rounded-2xl bg-gold/5 border border-gold/10 hover:border-gold/25 transition-colors duration-300"
                            >
                              <img 
                                src={item.menuItem.image}
                                alt={item.menuItem.name}
                                className="w-16 h-16 rounded-xl object-cover border border-gold/20 shrink-0"
                                referrerPolicy="no-referrer"
                              />

                              <div className="flex-1 text-left min-w-0">
                                <h5 className="font-display font-bold text-xs truncate text-gold">{item.menuItem.name}</h5>
                                <span className="text-[10px] text-beige/65 uppercase tracking-wider block mt-0.5">
                                  ${item.menuItem.price}.00 each
                                </span>
                                
                                <div className="flex items-center gap-2.5 mt-2">
                                  <button
                                    onClick={() => onDecrementQuantity(item.menuItem)}
                                    className="p-1 rounded bg-maroon border border-gold/15 text-gold hover:text-amber transition-colors cursor-pointer"
                                  >
                                    <Minus size={10} />
                                  </button>
                                  <span className="text-xs font-bold font-mono">{item.quantity}</span>
                                  <button
                                    onClick={() => onIncrementQuantity(item.menuItem)}
                                    className="p-1 rounded bg-maroon border border-gold/15 text-gold hover:text-amber transition-colors cursor-pointer"
                                  >
                                    <Plus size={10} />
                                  </button>
                                </div>
                              </div>

                              <div className="flex flex-col items-end gap-3 shrink-0">
                                <span className="font-display font-black text-xs text-saffron">
                                  ${item.menuItem.price * item.quantity}.00
                                </span>
                                <button
                                  onClick={() => onRemoveFromCart(item.menuItem)}
                                  className="p-1 text-beige/40 hover:text-red-400 transition-colors cursor-pointer"
                                  title="Retract Item"
                                >
                                  <Trash2 size={13} />
                                </button>
                              </div>
                            </div>
                          ))}

                          {/* Order Sum Sheet summary */}
                          <div className="pt-6 border-t border-gold/15 space-y-2.5 text-xs text-beige/80">
                            <div className="flex justify-between">
                              <span>Sum total:</span>
                              <span className="font-mono text-ivory">${subtotal}.00</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Palace transport courier:</span>
                              <span className="font-mono text-ivory">
                                {deliveryFee === 0 ? <span className="text-emerald font-bold">FREE over $50</span> : `$${deliveryFee}.00`}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span>Saffron GST taxes (8%):</span>
                              <span className="font-mono text-ivory">${royalTax}.00</span>
                            </div>
                            <div className="flex justify-between text-gold font-bold pt-3.5 border-t border-dashed border-gold/15 text-sm">
                              <span>Grand Sovereign Sum:</span>
                              <span className="font-mono text-saffron text-base font-black">${grandTotal}.00</span>
                            </div>
                          </div>

                          <button
                            onClick={() => setCheckoutStep('checkout')}
                            className="w-full mt-4 py-4 rounded-full bg-gradient-to-r from-gold via-amber to-saffron text-maroon text-xs uppercase font-extrabold tracking-widest hover:opacity-95 shadow-md shadow-gold/2 = hover:scale-[1.01] active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2"
                          >
                            <span>Proceed to sovereign checkout</span>
                            <ArrowRight size={14} />
                          </button>
                        </div>
                      )}
                    </div>
                  )}

                  {checkoutStep === 'checkout' && (
                    <form onSubmit={handleCheckoutSubmit} className="space-y-5 text-left">
                      <div className="space-y-1">
                        <label className="text-[10px] text-gold uppercase tracking-widest font-bold">Your Noble Name</label>
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="e.g., Lord Alexander"
                          className="w-full px-4 py-3 rounded-xl bg-gold/5 border border-gold/25 focus:border-gold focus:outline-none text-sm transition-colors"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] text-gold uppercase tracking-widest font-bold">Contact Courier Phone</label>
                        <input
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="e.g., +1 (555) 019-2834"
                          className="w-full px-4 py-3 rounded-xl bg-gold/5 border border-gold/25 focus:border-gold focus:outline-none text-sm transition-colors"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] text-gold uppercase tracking-widest font-bold">Throne/Destination Address</label>
                        <textarea
                          required
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          placeholder="Pinnacle Manor Penthouse 17, Manhattan, NY"
                          rows={3}
                          className="w-full px-4 py-3 rounded-xl bg-gold/5 border border-gold/25 focus:border-gold focus:outline-none text-sm transition-colors resize-none"
                        />
                      </div>

                      <div className="space-y-2 pt-2">
                        <label className="text-[10px] text-gold uppercase tracking-widest font-bold block">Payment Settlement</label>
                        <div className="grid grid-cols-2 gap-3">
                          <button
                            type="button"
                            onClick={() => setPaymentMethod('cod')}
                            className={`p-3 rounded-xl text-xs font-bold uppercase border cursor-pointer text-center transition-all ${
                              paymentMethod === 'cod' 
                                ? 'bg-gold/15 border-gold text-gold shadow-md' 
                                : 'bg-transparent border-gold/15 text-beige/50'
                            }`}
                          >
                            Cash on Delivery
                          </button>
                          <button
                            type="button"
                            onClick={() => setPaymentMethod('card')}
                            className={`p-3 rounded-xl text-xs font-bold uppercase border cursor-pointer text-center transition-all ${
                              paymentMethod === 'card' 
                                ? 'bg-gold/15 border-gold text-gold shadow-md' 
                                : 'bg-transparent border-gold/15 text-beige/50'
                            }`}
                          >
                            Premium Card
                          </button>
                        </div>
                      </div>

                      {paymentMethod === 'card' && (
                        <div className="space-y-1 animate-fade-in">
                          <label className="text-[10px] text-gold uppercase tracking-widest font-bold">Card Number</label>
                          <input
                            type="text"
                            required
                            placeholder="4111 2222 3333 4444"
                            value={cardNo}
                            onChange={(e) => setCardNo(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl bg-gold/5 border border-gold/25 focus:border-gold focus:outline-none text-sm transition-colors"
                          />
                        </div>
                      )}

                      <div className="pt-4 border-t border-gold/15 flex flex-col gap-3">
                        <button
                          type="submit"
                          className="w-full py-4 rounded-full bg-gradient-to-r from-emerald through-gold to-saffron text-maroon text-xs uppercase font-extrabold tracking-widest hover:opacity-95 shadow shadow-emerald/10 cursor-pointer active:scale-95 transition-transform"
                        >
                          Dispatch Royal Courier (${grandTotal}.00)
                        </button>
                        <button
                          type="button"
                          onClick={() => setCheckoutStep('cart')}
                          className="w-full py-3.5 rounded-full border border-gold/20 text-gold text-xs uppercase font-semibold text-center hover:bg-gold/5 cursor-pointer transition-colors"
                        >
                          Heed back to tray
                        </button>
                      </div>
                    </form>
                  )}

                  {checkoutStep === 'success' && orderSummary && (
                    <motion.div 
                      initial={{ scale: 0.95, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="text-center space-y-6 py-8"
                    >
                      <div className="h-16 w-16 bg-emerald/15 text-emerald border border-emerald/30 mx-auto rounded-full flex items-center justify-center">
                        <CheckCircle size={32} />
                      </div>
                      
                      <div className="space-y-2">
                        <h4 className="font-display font-medium text-lg text-gold">Order Summoned!</h4>
                        <p className="text-xs text-beige/70 leading-relaxed max-w-[280px] mx-auto">
                          Our royal kitchen has accepted your request. Preparing signature recipes under dry mud clay coals instantly.
                        </p>
                      </div>

                      <div className="p-4 rounded-2xl bg-gold/5 border border-gold/15 text-left text-xs space-y-2">
                        <div className="flex justify-between">
                          <span className="text-beige/50">Tracking Index:</span>
                          <span className="font-mono text-white font-bold">{orderSummary.id}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-beige/50">Transport Time:</span>
                          <span className="text-saffron font-bold">~35 Minutes</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-beige/50">Destination:</span>
                          <span className="text-white font-medium truncate max-w-[160px]">{orderSummary.address}</span>
                        </div>
                      </div>

                      <div className="pt-4 space-y-3">
                        <button
                          onClick={onClose}
                          className="w-full py-4 rounded-full bg-gradient-to-r from-gold to-saffron text-maroon text-xs uppercase font-extrabold tracking-widest hover:opacity-95 cursor-pointer flex items-center justify-center gap-2"
                        >
                          <span>Track Live progression</span>
                          <ArrowRight size={14} />
                        </button>
                      </div>
                    </motion.div>
                  )}
                </>
              )}

            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
