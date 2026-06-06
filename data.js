/**
 * SHIVANSH RESTRO - Imperial Indian Gastronomy Static Catalog Data
 * Pure Client-side Data Object Module
 */

window.SIGNATURE_DISHES = [
  {
    id: 'sig-1',
    name: 'Royal Shahi Butter Chicken',
    description: 'Tender tandoori chicken simmered in a rich, velvet-smooth tomato gravy enriched with genuine Kashmir saffron, freshly churned white butter, and aromatic dry fenugreek.',
    price: 32,
    rating: 4.9,
    category: 'main_course',
    image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=800&q=80',
    isSpicy: false,
    isVeg: false,
    isPopular: true
  },
  {
    id: 'sig-2',
    name: 'Kashmiri Paneer Tikka Elixir',
    description: 'Pristine organic paneer skewers marinated in Greek yogurt, cold-pressed mustard oil, and our hand-ground artisanal blend of 17 secret royal herbs and spices, coal-roasted.',
    price: 28,
    rating: 4.8,
    category: 'starters',
    image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=800&q=80',
    isSpicy: true,
    isVeg: true,
    isPopular: true
  },
  {
    id: 'sig-3',
    name: 'Imperial Hyderabadi Dum Biryani',
    description: 'Long-grained aged Basmati rice layered with milk-fed spring lamb, pure saffron strands, rose water, and caramelised onions, sealed in clay-pots and slow-cooked over a live woodfire.',
    price: 36,
    rating: 4.95,
    category: 'biryani',
    image: 'https://images.unsplash.com/photo-1633945274405-b6c8069047b0?auto=format&fit=crop&w=800&q=80',
    isSpicy: true,
    isVeg: false,
    isPopular: true
  },
  {
    id: 'sig-4',
    name: 'Suhana Dal Makhani Legacy',
    description: 'Whole black lentils and red kidney beans slow-simmered for exactly 36 hours on a brick hearth, finished with freshly grated nutmeg, home cream, and activated charcoal smokiness.',
    price: 24,
    rating: 4.9,
    category: 'main_course',
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80',
    isSpicy: false,
    isVeg: true,
    isPopular: true
  },
  {
    id: 'sig-5',
    name: 'Grand Emperor Tandoori Platter',
    description: 'A sovereign presentation of our charcoal oven secrets containing gold-leaf seekh kebabs, malai chicken tikka, fish peshawari, and fire-scorched farm vegetables.',
    price: 48,
    rating: 4.9,
    category: 'tandoori',
    image: 'https://images.unsplash.com/photo-1628294895950-9805252327bc?auto=format&fit=crop&w=800&q=80',
    isSpicy: true,
    isVeg: false,
    isPopular: true
  },
  {
    id: 'sig-6',
    name: 'Nawabi Gulab Jamun Shahi',
    description: 'Sublime condensed hot milk dumplings stuffed with green pistachios & dried organic figs, thoroughly drenched in a premium wild-rose and genuine gold-flecked sugar reduction.',
    price: 16,
    rating: 4.9,
    category: 'desserts',
    image: 'https://images.unsplash.com/photo-1601314002592-b8734bca6604?auto=format&fit=crop&w=800&q=80',
    isSpicy: false,
    isVeg: true,
    isPopular: true
  }
];

window.MENU_ITEMS = [
  // STARTERS
  {
    id: 'srt-1',
    name: 'Amritsari Samosa Crown',
    description: 'Flaky artisanal pastry stuffed with heavily spiced potatoes, farm-fresh green peas, and hand-torn mint foliage, dressed in dry sweet date chutney.',
    price: 14,
    rating: 4.7,
    category: 'starters',
    image: 'https://images.unsplash.com/photo-1601050690597-df056fb4ce78?auto=format&fit=crop&w=800&q=80',
    isVeg: true,
    isSpicy: false
  },
  {
    id: 'srt-2',
    name: 'Kashmiri Paneer Tikka Elixir',
    description: 'Pristine organic paneer skewers marinated in Greek yogurt, cold-pressed mustard oil, and wild saffron, roasted over live tandoor embers.',
    price: 28,
    rating: 4.8,
    category: 'starters',
    image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=800&q=80',
    isVeg: true,
    isSpicy: true
  },
  {
    id: 'srt-3',
    name: 'Palace Beetroot Seekh Kebab',
    description: 'Velvety minced garden beetroots mingled with toasted pine nuts, local herbs, cooked over slow volcanic tandoor mud embers.',
    price: 19,
    rating: 4.6,
    category: 'starters',
    image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=800&q=80',
    isVeg: true,
    isSpicy: false
  },

  // MAIN COURSE
  {
    id: 'mn-1',
    name: 'Royal Shahi Butter Chicken',
    description: 'Tender tandoori chicken simmered in an incredibly rich, velvet-smooth tomato gravy enriched with fresh churned white butter.',
    price: 32,
    rating: 4.9,
    category: 'main_course',
    image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=800&q=80',
    isVeg: false,
    isSpicy: false
  },
  {
    id: 'mn-2',
    name: 'Suhana Dal Makhani Legacy',
    description: 'Whole black lentils slow-simmered for exactly 36 hours on a brick hearth with rich cream.',
    price: 24,
    rating: 4.9,
    category: 'main_course',
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80',
    isVeg: true,
    isSpicy: false
  },
  {
    id: 'mn-3',
    name: 'Imperial Awadhi Lamb Rogan Josh',
    description: 'Slow-braised tender premium lamb shoulder chunks infused with genuine dry red Kashmiri chillies, warm cardamom cloves, and premium saffron.',
    price: 38,
    rating: 4.9,
    category: 'main_course',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
    isVeg: false,
    isSpicy: true
  },
  {
    id: 'mn-4',
    name: 'Avadh Cashew Malai Kofta',
    description: 'Golden paneer dumplings filled with royal pistachio cores, floating in an ultra-luxurious, white cashmerelike cashew creme gravy.',
    price: 29,
    rating: 4.75,
    category: 'main_course',
    image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=800&q=80',
    isVeg: true,
    isSpicy: false
  },

  // TANDOORI SPECIALS
  {
    id: 'td-1',
    name: 'Grand Emperor Tandoori Platter',
    description: 'A sovereign presentation of our charcoal oven secrets containing kebabs, malai tikka, and farm-fresh sizzlers.',
    price: 48,
    rating: 4.9,
    category: 'tandoori',
    image: 'https://images.unsplash.com/photo-1628294895950-9805252327bc?auto=format&fit=crop&w=800&q=80',
    isVeg: false,
    isSpicy: true
  },
  {
    id: 'td-2',
    name: 'Peshawari Garlic Naan Velvet',
    description: 'Traditional refined wheat flatbread punched with wet crushed garlic flakes, freshly sheared coriander foliage, and brushed in rich ghee.',
    price: 6,
    rating: 4.85,
    category: 'tandoori',
    image: 'https://images.unsplash.com/photo-1601356616077-695728ecf769?auto=format&fit=crop&w=800&q=80',
    isVeg: true,
    isSpicy: false
  },

  // BIRYANI
  {
    id: 'by-1',
    name: 'Imperial Hyderabadi Dum Biryani',
    description: 'Long-grained aged Basmati rice layered with premium spring lamb, pure saffron strands, and caravan spices.',
    price: 36,
    rating: 4.95,
    category: 'biryani',
    image: 'https://images.unsplash.com/photo-1633945274405-b6c8069047b0?auto=format&fit=crop&w=800&q=80',
    isVeg: false,
    isSpicy: true
  },
  {
    id: 'by-2',
    name: 'Shabnam Basmati Garden Biryani',
    description: 'A sovereign greenhouse of baby organic potatoes, sweet cauliflower, carrots, and sweet green peas slow dum-cooked with genuine saffron water.',
    price: 28,
    rating: 4.7,
    category: 'biryani',
    image: 'https://images.unsplash.com/photo-1633945274405-b6c8069047b0?auto=format&fit=crop&w=800&q=80',
    isVeg: true,
    isSpicy: true
  },

  // SOUTH INDIAN
  {
    id: 'si-1',
    name: 'Royal Ghee Roast Masala Dosa',
    description: 'Stunning 3-foot long wafer-thin fermented rice paper crepe lathered heavily in clarified white cow butter, filled with spiced potato mash.',
    price: 22,
    rating: 4.8,
    category: 'south_indian',
    image: 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=800&q=80',
    isVeg: true,
    isSpicy: false
  },

  // CHINESE
  {
    id: 'ch-1',
    name: 'Palace Szechuan Chili Paneer Sizzle',
    description: 'Stir-fried organic crispy cottage cheese cubes with dense capsicums, thick spring scallions, and a rich, tongue-tingling ginger soy syrup.',
    price: 24,
    rating: 4.7,
    category: 'chinese',
    image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=800&q=80',
    isVeg: true,
    isSpicy: true
  },

  // DESSERTS
  {
    id: 'ds-1',
    name: 'Nawabi Gulab Jamun Shahi',
    description: 'Sublime condensed hot milk dumplings stuffed with green pistachios and dried organic figs, in rose syrup.',
    price: 16,
    rating: 4.9,
    category: 'desserts',
    image: 'https://images.unsplash.com/photo-1601314002592-b8734bca6604?auto=format&fit=crop&w=800&q=80',
    isVeg: true,
    isSpicy: false
  },
  {
    id: 'ds-2',
    name: 'Pistachio Kesar Kulfi Luxury',
    description: 'Slow-churned frozen milk cream deeply condensed with Kashmiri saffron cords, green cardamom pods, and slivered organic roasted pistachios.',
    price: 14,
    rating: 4.8,
    category: 'desserts',
    image: 'https://images.unsplash.com/photo-1505394033641-40c6ad1178d7?auto=format&fit=crop&w=800&q=80',
    isVeg: true,
    isSpicy: false
  },

  // BEVERAGES
  {
    id: 'bv-1',
    name: 'Golden Mango Lassi Splendor',
    description: 'Smooth luxury whipped yogurt integrated with sweet Alphonso mango pulp, absolute milk cream, and fine golden almond flakes.',
    price: 10,
    rating: 4.9,
    category: 'beverages',
    image: 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?auto=format&fit=crop&w=800&q=80',
    isVeg: true,
    isSpicy: false
  },
  {
    id: 'bv-2',
    name: 'Nirvana Masala Chai Sensation',
    description: 'Fresh biological black tea decoction thoroughly cooked with creamy organic milk, wet green ginger, fresh cinnamon wood, and black peppers.',
    price: 8,
    rating: 4.85,
    category: 'beverages',
    image: 'https://images.unsplash.com/photo-1561336313-0bd5e0b27ec8?auto=format&fit=crop&w=800&q=80',
    isVeg: true,
    isSpicy: false
  }
];

window.TESTIMONIALS = [
  {
    id: 'test-1',
    name: 'Lady Victoria Sterling',
    role: 'Luxury Travel Journalist & Food Critic',
    text: 'A gastronomic pilgrimage into the heart of royal India. The Dum Biryani at Shivansh Restro isn’t just fuel—it is heritage, cooked with supreme passion. The ambience mirrors a maharaja’s majestic courtyard.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    videoTranscription: [
      { time: '0:01 - 0:04', text: '"Greeting everyone! Today I am testing the imperial cuisine at Shivansh Restro."' },
      { time: '0:05 - 0:08', text: '"Look at this lamb biryani bone sliding out of slow sealed earthen clay. It smells of real cedar wood and saffron."' },
      { time: '0:09 - 0:12', text: '"It feels precisely like a gourmet banquet served under marble palaces in Old Rajasthan in the 19th Century."' },
      { time: '0:13 - 0:17', text: '"This is truly a 5-star crown jewel of luxury hospitality in New Delhi!"' }
    ]
  },
  {
    id: 'test-2',
    name: 'Chef Rajveer Malhotra',
    role: 'Michelin-Starred Consultant',
    text: 'Every single plate serves exceptional technique and high respect for raw regional spices. The 36-hour cooked Dal Makhani is a marvel of culinary endurance. Exceptional standard of authentic Indian luxury.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    videoTranscription: [
      { time: '0:01 - 0:04', text: '"Namaste. As a culinary consultant, I look closely for proper spice maturation, fat levels, and charcoal timing."' },
      { time: '0:05 - 0:09', text: '"Shivansh Restro is doing slow cooking perfectly. Their 36-hour slow simmering makhani bean is flawlessly textured."' },
      { time: '0:10 - 0:13', text: '"No shortcuts. Pure wood smoke ash absorption, fresh home ghee, and traditional mortar stone grids."' },
      { time: '0:14 - 0:17', text: '"A highly-recommended heritage landmark of the culinary subcontinent."' }
    ]
  },
  {
    id: 'test-3',
    name: 'Samantha & Richard Chen',
    role: 'Vows & Celebrations Client',
    text: 'We hosted our grand engagement party for 180 guests here. The Shivansh banquet team handled everything with spotless elite hospitality. The gold leaf desserts made our evenings legendary.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80',
    videoTranscription: [
      { time: '0:01 - 0:04', text: '"Oh my God! The wedding banquets arrangement here was absolutely spectacular from start to finish."' },
      { time: '0:05 - 0:08', text: '"The silver dining services, royal seating chairs, and flower petals canopy made our guests feel like kings!"' },
      { time: '0:09 - 0:12', text: '"Sitar artists played ancient tracks beautifully in the backgrounds during the dining courses."' },
      { time: '0:13 - 0:17', text: '"We couldn\'t have asked for a more luxurious or heartwarming destination. Deep gratitude to the Patron Shivansh!"' }
    ]
  }
];

window.GALLERY_ITEMS = [
  {
    id: 'gal-1',
    image: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1200&q=80',
    caption: 'Palatial Main Dining Hall decorated with golden chandeliers',
    category: 'interior'
  },
  {
    id: 'gal-2',
    image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=1200&q=80',
    caption: 'Chef special Royal Butter Chicken ready for gold garnishing',
    category: 'food'
  },
  {
    id: 'gal-3',
    image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=80',
    caption: 'A breathtaking private wedding cocktail banquet layout',
    category: 'events'
  },
  {
    id: 'gal-4',
    image: 'https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&w=1200&q=80',
    caption: 'A warm, intimate candle-lit family table celebration',
    category: 'customers'
  },
  {
    id: 'gal-5',
    image: 'https://images.unsplash.com/photo-1633945274405-b6c8069047b0?auto=format&fit=crop&w=1200&q=80',
    caption: 'Slow-pot sealed Dum Biryani escaping warm sandalwood vapor',
    category: 'food'
  },
  {
    id: 'gal-6',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1200&q=80',
    caption: 'Ultra-exclusive VIP Private Chef Table chamber decoration',
    category: 'interior'
  }
];

window.DATES_AVAILABLE = [
  '2026-06-07', '2026-06-08', '2026-06-09', '2026-06-10', '2026-06-11', '2026-06-12', 
  '2026-06-13', '2026-06-14', '2026-06-15', '2026-06-16', '2026-06-17', '2026-06-18'
];

window.TIMES_AVAILABLE = [
  '12:00 PM', '12:30 PM', '01:00 PM', '01:30 PM', '02:00 PM', 
  '07:00 PM', '07:30 PM', '08:00 PM', '08:30 PM', '09:00 PM', '09:30 PM', '10:00 PM'
];
