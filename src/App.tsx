/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import SignatureDishes from './components/SignatureDishes';
import Menu from './components/Menu';
import Delivery from './components/Delivery';
import TableBooking from './components/TableBooking';
import Events from './components/Events';
import OwnerOffer from './components/OwnerOffer';
import Reviews from './components/Reviews';
import Gallery from './components/Gallery';
import WhyChooseUs from './components/WhyChooseUs';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { MenuItem, CartItem } from './types';

export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeOrder, setActiveOrder] = useState<{
    id: string;
    items: CartItem[];
    customerName: string;
    address: string;
    deliveryTime: string;
    status: number;
  } | null>(null);

  // Cart logic triggers
  const handleAddToCart = (item: MenuItem) => {
    setCartItems((prevItems) => {
      const existing = prevItems.find((ci) => ci.menuItem.id === item.id);
      if (existing) {
        return prevItems.map((ci) =>
          ci.menuItem.id === item.id ? { ...ci, quantity: ci.quantity + 1 } : ci
        );
      }
      return [...prevItems, { menuItem: item, quantity: 1 }];
    });
  };

  const handleIncrementQuantity = (item: MenuItem) => {
    setCartItems((prevItems) =>
      prevItems.map((ci) =>
        ci.menuItem.id === item.id ? { ...ci, quantity: ci.quantity + 1 } : ci
      )
    );
  };

  const handleDecrementQuantity = (item: MenuItem) => {
    setCartItems((prevItems) =>
      prevItems
        .map((ci) =>
          ci.menuItem.id === item.id ? { ...ci, quantity: ci.quantity - 1 } : ci
        )
        .filter((ci) => ci.quantity > 0)
    );
  };

  const handleRemoveFromCart = (item: MenuItem) => {
    setCartItems((prevItems) => prevItems.filter((ci) => ci.menuItem.id !== item.id));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  // Order Placement and tracking simulated progressions
  const handleOrderPlaced = (order: {
    id: string;
    items: CartItem[];
    customerName: string;
    address: string;
    deliveryTime: string;
  }) => {
    setActiveOrder({
      ...order,
      status: 0, // State 0: Received
    });
  };

  const handleCancelOrder = () => {
    setActiveOrder(null);
  };

  const handleSetOrderStatus = (status: number) => {
    setActiveOrder((prev) => {
      if (!prev) return null;
      return { ...prev, status };
    });
  };

  // Dynamic targeting triggers
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="relative min-h-screen text-ivory royal-maroon-gradient selection:bg-gold selection:text-maroon antialiased overflow-x-hidden md:text-base text-sm font-sans">
      
      {/* Background radial lighting accentures */}
      <div className="absolute top-0 inset-x-0 h-[600px] hero-radial-lighting pointer-events-none -z-10" />

      {/* NAVBAR */}
      <Navbar
        cartCount={totalCartCount}
        onCartClick={() => setIsCartOpen(true)}
        onMakeReservationClick={() => scrollToSection('booking')}
        onTrackOrderClick={() => setIsCartOpen(true)}
        hasActiveOrder={activeOrder !== null}
      />

      {/* HERO SECTION */}
      <Hero
        onOrderNowClick={() => scrollToSection('menu')}
        onBookTableClick={() => scrollToSection('booking')}
      />

      {/* STATS & STORY - ABOUT SECTION */}
      <About />

      {/* SIGNATURE SELECTIONS */}
      <SignatureDishes onAddToCart={handleAddToCart} />

      {/* MAIN DELICACIES MENU */}
      <Menu onAddToCart={handleAddToCart} />

      {/* WHY CHOOSE US HIGHLIGHTS */}
      <WhyChooseUs />

      {/* DIRECT PATRON NEGOTIATOR SECTION */}
      <OwnerOffer />

      {/* TESTIMONIAL REVIEWS & GUEST VIDEO REEL */}
      <Reviews />

      {/* BANQUET & EVENTS BOOKING SECTION */}
      <Events onBanquetsReserved={(details) => console.log('Banquets request registered:', details)} />

      {/* PALACE IMAGE GALLERY */}
      <Gallery />

      {/* CONTACT INFORMATION & PATHMAKER */}
      <Contact />

      {/* LUXURY FOOTER & NEWSLETTER SIGNUPS */}
      <Footer />

      {/* SHOPPING CART DRAWER & ACTIVE ORDER TRACKER POPUP */}
      <Delivery
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onIncrementQuantity={handleIncrementQuantity}
        onDecrementQuantity={handleDecrementQuantity}
        onRemoveFromCart={handleRemoveFromCart}
        onClearCart={handleClearCart}
        onOrderPlaced={handleOrderPlaced}
        activeOrder={activeOrder}
        onCancelOrder={handleCancelOrder}
        onSetStatus={handleSetOrderStatus}
      />

    </div>
  );
}
