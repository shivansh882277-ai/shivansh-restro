/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  rating: number;
  category: 'starters' | 'main_course' | 'tandoori' | 'biryani' | 'south_indian' | 'chinese' | 'desserts' | 'beverages';
  image: string;
  isSpicy?: boolean;
  isVeg?: boolean;
  isPopular?: boolean;
}

export interface CartItem {
  menuItem: MenuItem;
  quantity: number;
}

export interface Reservation {
  name: string;
  phone: string;
  email: string;
  date: string;
  time: string;
  guests: number;
  specialRequests?: string;
}

export interface PrivateEvent {
  eventType: string;
  guestCount: number;
  budget: number;
  date: string;
  specialRequirements: string;
  name: string;
  phone: string;
  email: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  text: string;
  rating: number;
  image: string;
  videoUrl?: string; // If a video is opened
}

export interface GalleryItem {
  id: string;
  image: string;
  caption: string;
  category: 'food' | 'interior' | 'events' | 'customers';
}
