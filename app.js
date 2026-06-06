/**
 * SHIVANSH RESTRO - Pure Static Vanilla Engine App.js
 * Controls all cart drawers, reservation forms, banquet estimators, lightboxes, 
 * cinema transcripts logs, and the 2D Pathmaker Canvas tracker.
 */

(function () {
  // --- APPLICATION STATE ---
  let cart = [];
  let activeOrder = null;
  let orderProgressInterval = null;
  let orderCountdownInterval = null;
  let orderSecondsRemaining = 0;
  
  // Custom deals & active reviewer models
  let selectedMenuCategory = 'all';
  let searchQuery = '';
  let filterVegOnly = false;
  let filterSpicyOnly = false;
  
  let activeCelebrationDate = '';
  let activeCelebrationTime = '';
  let celebrationGuests = 2;

  let activeOccasion = 'Weddings';
  let banquetGuests = 50;
  let banquetPlatingStyle = 'gold'; // silver, gold, diamond

  let currentGalleryCategory = 'all';
  let currentReviewClip = null;
  let reviewerVideoTimer = null;
  let reviewerVideoSeconds = 0;
  let reviewerVideoIsMuted = false;
  let reviewerVideoIsPlaying = true;

  // --- INITIALIZATION ---
  document.addEventListener('DOMContentLoaded', () => {
    initScrollTracker();
    renderSignatureCarousel();
    renderDelicaciesCards();
    initLocalHooks();
    initPathmaker();
    
    // Auto replace static lucide icons on load
    if (window.lucide) {
      window.lucide.createIcons();
    }
  });

  // --- SCROLL & NAVBAR ACTIONS ---
  function initScrollTracker() {
    const scrollIndicator = document.getElementById('scroll-gauge');
    const navbar = document.getElementById('navbar-container');
    const backToTop = document.getElementById('back-to-top-anchor');

    window.addEventListener('scroll', () => {
      // Is scrolled backdrop glassmorphism
      if (window.scrollY > 50) {
        navbar.classList.add('bg-maroon/90', 'backdrop-blur-md', 'py-3', 'border-b', 'border-gold/20', 'shadow-2xl');
        navbar.classList.remove('bg-transparent', 'py-5');
        if (backToTop) backToTop.classList.remove('opacity-0', 'pointer-events-none');
      } else {
        navbar.classList.add('bg-transparent', 'py-5');
        navbar.classList.remove('bg-[#2A040D]/35', 'bg-maroon/90', 'backdrop-blur-md', 'py-3', 'border-b', 'border-gold/20', 'shadow-2xl');
        if (backToTop) backToTop.classList.add('opacity-0', 'pointer-events-none');
      }

      // Scroll Progress Gauge
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const percentage = (window.scrollY / totalHeight) * 100;
        if (scrollIndicator) scrollIndicator.style.width = `${percentage}%`;
      }

      // Check current active visibility section
      const activeTabs = ['home', 'about', 'signature', 'menu', 'delivery', 'booking', 'events', 'gallery', 'contact'];
      for (const section of activeTabs) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120 && rect.bottom >= 120) {
            // Uncheck previous highlighted desktop anchors and underline elements
            document.querySelectorAll('.nav-link').forEach(btn => {
              if (btn.getAttribute('data-sec') === section) {
                btn.classList.add('text-gold', 'font-medium');
                btn.classList.remove('text-ivory/80');
                const dot = btn.querySelector('.nav-dot');
                if (dot) dot.classList.remove('opacity-0');
              } else {
                btn.classList.remove('text-gold', 'font-medium');
                btn.classList.add('text-ivory/80');
                const dot = btn.querySelector('.nav-dot');
                if (dot) dot.classList.add('opacity-0');
              }
            });
            break;
          }
        }
      }
    });

    // Mobile nav trigger
    const mobileButton = document.getElementById('mobile-nav-toggle-btn');
    const mobileDrawer = document.getElementById('mobile-nav-block');
    if (mobileButton && mobileDrawer) {
      mobileButton.addEventListener('click', () => {
        mobileDrawer.classList.toggle('hidden');
      });
    }

    // Attach scroll to section coordinates on button click
    document.querySelectorAll('.nav-scroll-trigger').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const targetSec = btn.getAttribute('data-sec');
        scrollToSection(targetSec);
        if (mobileDrawer) mobileDrawer.classList.add('hidden');
      });
    });
  }

  function scrollToSection(id) {
    const el = document.getElementById(id);
    if (el) {
      const offset = 80;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  }

  // Make functions globally accessible
  window.scrollToSection = scrollToSection;

  // --- RENDERING CAROUSEL SIGNATURES ---
  function renderSignatureCarousel() {
    const container = document.getElementById('signature-carousel-inner');
    if (!container || !window.SIGNATURE_DISHES) return;

    container.innerHTML = window.SIGNATURE_DISHES.map((dish, i) => `
      <div 
        class="min-w-[280px] sm:min-w-[340px] md:min-w-[380px] w-[380px] bg-[#180509]/80 rounded-3xl overflow-hidden glassmorphism transform-gpu snap-start group relative flex flex-col justify-between border border-gold/20 hover:border-gold/50 shadow-2xl transition-all duration-500 hover:shadow-gold/15 hover:-translate-y-2"
      >
        <div>
          <!-- Image Container -->
          <div class="relative h-[220px] overflow-hidden">
            <img 
              src="${dish.image}" 
              alt="${dish.name}" 
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-750 brightness-[0.9]"
              referrerpolicy="no-referrer"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-[#180509] to-transparent opacity-60"></div>
            
            <!-- Tags -->
            <div class="absolute top-4 left-4 flex gap-2">
              <span class="px-2.5 py-1 text-[10px] uppercase font-bold tracking-wider rounded-lg bg-maroon/90 text-gold border border-gold/30 backdrop-blur-md">
                Signature
              </span>
              ${dish.isVeg ? `
                <span class="px-2.5 py-1 text-[10px] uppercase font-bold tracking-wider rounded-lg bg-emerald/90 text-white backdrop-blur-md">
                  Veg
                </span>
              ` : ''}
            </div>

            <!-- Rating badge -->
            <div class="absolute bottom-4 right-4 flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-bold rounded-lg bg-black/75 text-amber backdrop-blur-sm shadow-md">
              <i data-lucide="star" class="w-3 h-3 fill-amber text-amber"></i>
              <span>${dish.rating}</span>
            </div>
          </div>

          <!-- Description details -->
          <div class="p-6">
            <h3 class="font-display font-medium text-lg text-gold group-hover:text-amber tracking-wide transition-colors duration-300">
              ${dish.name}
            </h3>
            <p class="text-xs text-beige/70 mt-2.5 line-clamp-3 leading-relaxed font-light">
              ${dish.description}
            </p>
          </div>
        </div>

        <!-- Price card row -->
        <div class="px-6 pb-6 pt-2 border-t border-gold/10 flex items-center justify-between">
          <div>
            <span class="text-[10px] text-beige/50 font-sans block uppercase tracking-wider">Royal Tier Price</span>
            <span class="text-xl font-bold font-display text-gradient bg-clip-text bg-gradient-to-r from-gold via-amber to-saffron">
              $${dish.price}.00
            </span>
          </div>

          <button
            data-id="${dish.id}"
            class="add-to-cart-signature flex items-center gap-2 px-4.5 py-2.5 rounded-full bg-gradient-to-r from-gold/10 to-saffron/10 hover:from-saffron hover:to-gold hover:text-maroon text-gold border border-gold/40 text-xs uppercase font-bold tracking-wider transition-all duration-300 cursor-pointer shadow-md active:scale-95"
          >
            <i data-lucide="shopping-cart" class="w-3.5 h-3.5"></i>
            <span>Order Now</span>
          </button>
        </div>
      </div>
    `).join('');

    // Attach Events
    container.querySelectorAll('.add-to-cart-signature').forEach(button => {
      button.addEventListener('click', () => {
        const id = button.getAttribute('data-id');
        const dish = window.SIGNATURE_DISHES.find(d => d.id === id);
        if (dish) {
          addToCart(dish);
          triggerAddAnimation(button);
        }
      });
    });

    // Scroll buttons functionality
    const leftBtn = document.getElementById('sig-scroll-left-btn');
    const rightBtn = document.getElementById('sig-scroll-right-btn');
    if (leftBtn && rightBtn) {
      leftBtn.addEventListener('click', () => {
        container.scrollBy({ left: -container.clientWidth * 0.75, behavior: 'smooth' });
      });
      rightBtn.addEventListener('click', () => {
        container.scrollBy({ left: container.clientWidth * 0.75, behavior: 'smooth' });
      });
    }
  }

  // --- RENDERING DELICACIES & FILTERING ---
  function renderDelicaciesCards() {
    const grid = document.getElementById('menu-delicacies-grid');
    if (!grid || !window.MENU_ITEMS) return;

    // Filter items
    const items = window.MENU_ITEMS.filter((item) => {
      if (selectedMenuCategory !== 'all' && item.category !== selectedMenuCategory) return false;
      if (filterVegOnly && !item.isVeg) return false;
      if (filterSpicyOnly && !item.isSpicy) return false;
      
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        return (
          item.name.toLowerCase().includes(query) ||
          item.description.toLowerCase().includes(query)
        );
      }
      return true;
    });

    if (items.length === 0) {
      grid.innerHTML = `
        <div class="col-span-full text-center py-16 p-8 rounded-3xl glassmorphism border border-gold/15">
          <h4 class="font-display font-medium text-lg text-gold mb-2">No Imperial Delicacies Found</h4>
          <p class="text-sm text-beige/60">Try clearing active search queries or toggling diet switches.</p>
        </div>
      `;
      return;
    }

    grid.innerHTML = items.map((item) => `
      <div 
        class="rounded-3xl bg-[#1c060b]/70 overflow-hidden border border-gold/15 hover:border-gold/40 shadow-xl shadow-black/20 flex flex-col justify-between hover:-translate-y-2.5 transition-all duration-500 hover:shadow-2xl hover:shadow-gold/10 group"
      >
        <div>
          <!-- Media cover -->
          <div class="relative h-48 overflow-hidden">
            <img 
              src="${item.image}" 
              alt="${item.name}" 
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-750 brightness-95"
              referrerpolicy="no-referrer"
            />
            <div class="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#1b050a] to-transparent"></div>
            
            <!-- Indicators badges -->
            <div class="absolute top-4 left-4 flex gap-2">
              ${item.isVeg ? `
                <span class="flex items-center gap-1 px-2.5 py-1 text-[9px] font-bold uppercase rounded bg-emerald/90 text-white backdrop-blur-md shadow">
                  <i data-lucide="leaf" class="w-2.5 h-2.5"></i> Veg
                </span>
              ` : `
                <span class="px-2.5 py-1 text-[9px] font-bold uppercase rounded bg-maroon/90 text-gold border border-gold/30 backdrop-blur-md shadow">
                  Meat
                </span>
              `}
              ${item.isSpicy ? `
                <span class="flex items-center gap-1 px-2.5 py-1 text-[9px] font-bold uppercase rounded bg-saffron/90 text-white backdrop-blur-md shadow">
                  <i data-lucide="flame" class="w-2.5 h-2.5 animate-pulse"></i> Spicy
                </span>
              ` : ''}
            </div>

            <!-- Score rating -->
            <div class="absolute bottom-3 right-4 flex items-center gap-1 px-2.5 py-0.5 rounded bg-black/80 border border-gold/20 text-[10px] text-amber font-semibold backdrop-blur-sm shadow">
              <i data-lucide="star" class="w-2.5 h-2.5 fill-amber text-amber"></i>
              <span>${item.rating}</span>
            </div>
          </div>

          <!-- Info details -->
          <div class="p-6">
            <h4 class="font-display font-medium text-base text-gold tracking-wide group-hover:text-amber transition-colors">
              ${item.name}
            </h4>
            <p class="text-xs text-beige/70 mt-2 line-clamp-2 leading-relaxed font-light">
              ${item.description}
            </p>
          </div>
        </div>

        <!-- Add Tray actions -->
        <div class="px-6 pb-6 pt-3 border-t border-gold/10 flex items-center justify-between">
          <span class="font-display font-bold text-lg text-gradient bg-clip-text bg-gradient-to-r from-gold to-saffron">
            $${item.price}.00
          </span>

          <button
            data-id="${item.id}"
            class="add-to-cart-menu-btn flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider bg-gold hover:bg-saffron text-maroon active:scale-95 transition-all duration-300 cursor-pointer shadow"
          >
            <i data-lucide="plus" class="w-3.5 h-3.5"></i>
            <span>Add to Cart</span>
          </button>
        </div>
      </div>
    `).join('');

    // Attach Event Listeners
    grid.querySelectorAll('.add-to-cart-menu-btn').forEach(button => {
      button.addEventListener('click', () => {
        const id = button.getAttribute('data-id');
        const dish = window.MENU_ITEMS.find(m => m.id === id);
        if (dish) {
          addToCart(dish);
          
          // Temporary "added" visual trigger feedback
          button.classList.add('bg-emerald', 'text-maroon');
          button.classList.remove('bg-gold', 'hover:bg-saffron');
          button.innerHTML = `<i data-lucide="check" class="w-3.5 h-3.5"></i><span>Added</span>`;
          if (window.lucide) window.lucide.createIcons();

          setTimeout(() => {
            button.classList.remove('bg-emerald', 'text-maroon');
            button.classList.add('bg-gold', 'hover:bg-saffron');
            button.innerHTML = `<i data-lucide="plus" class="w-3.5 h-3.5"></i><span>Add to Cart</span>`;
            if (window.lucide) window.lucide.createIcons();
          }, 1500);
        }
      });
    });

    if (window.lucide) {
      window.lucide.createIcons();
    }
  }

  // --- LOCAL EVENT HOOKS ---
  function initLocalHooks() {
    // 1. Menu Search and Category selectors
    const searchBar = document.getElementById('menu-item-search');
    if (searchBar) {
      searchBar.addEventListener('input', (e) => {
        searchQuery = e.target.value;
        renderDelicaciesCards();
      });
    }

    const vegSwitch = document.getElementById('menu-filter-veg');
    if (vegSwitch) {
      vegSwitch.addEventListener('click', () => {
        filterVegOnly = !filterVegOnly;
        vegSwitch.classList.toggle('bg-emerald/15', filterVegOnly);
        vegSwitch.classList.toggle('border-emerald', filterVegOnly);
        vegSwitch.classList.toggle('text-emerald', filterVegOnly);
        vegSwitch.classList.toggle('border-gold/15', !filterVegOnly);
        vegSwitch.classList.toggle('text-beige/80', !filterVegOnly);
        const leafIcon = vegSwitch.querySelector('.lucide-leaf');
        if (leafIcon) leafIcon.classList.toggle('animate-pulse', filterVegOnly);
        renderDelicaciesCards();
      });
    }

    const spicySwitch = document.getElementById('menu-filter-spicy');
    if (spicySwitch) {
      spicySwitch.addEventListener('click', () => {
        filterSpicyOnly = !filterSpicyOnly;
        spicySwitch.classList.toggle('bg-saffron/15', filterSpicyOnly);
        spicySwitch.classList.toggle('border-saffron', filterSpicyOnly);
        spicySwitch.classList.toggle('text-saffron', filterSpicyOnly);
        spicySwitch.classList.toggle('border-gold/15', !filterSpicyOnly);
        spicySwitch.classList.toggle('text-beige/80', !filterSpicyOnly);
        const flameIcon = spicySwitch.querySelector('.lucide-flame');
        if (flameIcon) flameIcon.classList.toggle('animate-pulse', filterSpicyOnly);
        renderDelicaciesCards();
      });
    }

    document.querySelectorAll('.menu-category-selectors button').forEach(button => {
      button.addEventListener('click', () => {
        document.querySelectorAll('.menu-category-selectors button').forEach(btn => {
          btn.classList.remove('bg-gradient-to-r', 'from-gold', 'via-amber', 'to-saffron', 'text-maroon', 'font-bold');
          btn.classList.add('text-beige/70', 'border-gold/15');
        });
        
        button.classList.add('bg-gradient-to-r', 'from-gold', 'via-amber', 'to-saffron', 'text-maroon', 'font-bold');
        button.classList.remove('text-beige/70', 'border-gold/15');
        
        selectedMenuCategory = button.getAttribute('data-cat');
        renderDelicaciesCards();
      });
    });

    // 2. Cart panel sliders
    const cartToggleBtns = document.querySelectorAll('.cart-drawer-trigger');
    const drawerOverlay = document.getElementById('cart-drawer-overlay');
    const cartDrawer = document.getElementById('cart-drawer-container');
    const closeDrawerBtn = document.getElementById('close-cart-drawer');

    cartToggleBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        drawerOverlay.classList.remove('hidden');
        cartDrawer.style.transform = 'translateX(0)';
        renderCartSheet();
      });
    });

    const hideCartDraw = () => {
      cartDrawer.style.transform = 'translateX(100%)';
      setTimeout(() => drawerOverlay.classList.add('hidden'), 250);
    };

    if (drawerOverlay) drawerOverlay.addEventListener('click', hideCartDraw);
    if (closeDrawerBtn) closeDrawerBtn.addEventListener('click', hideCartDraw);

    // 3. Checkout controllers
    const proceedToCheckoutBtn = document.getElementById('cart-proceed-checkout-btn');
    const checkoutCartBlock = document.getElementById('cart-drawer-items-view');
    const checkoutFormBlock = document.getElementById('cart-drawer-checkout-form');
    const backToCartBtn = document.getElementById('back-to-cart-drawer');
    const submitOrderForm = document.getElementById('royal-order-checkout-form');

    if (proceedToCheckoutBtn) {
      proceedToCheckoutBtn.addEventListener('click', () => {
        checkoutCartBlock.classList.add('hidden');
        checkoutFormBlock.classList.remove('hidden');
      });
    }

    if (backToCartBtn) {
      backToCartBtn.addEventListener('click', () => {
        checkoutFormBlock.classList.add('hidden');
        checkoutCartBlock.classList.remove('hidden');
      });
    }

    // Payment methods toggles
    const payCOD = document.getElementById('pay-method-cod');
    const payCard = document.getElementById('pay-method-card');
    const cardField = document.getElementById('pay-card-number-wrapper');

    if (payCOD && payCard && cardField) {
      payCOD.addEventListener('click', () => {
        payCOD.classList.add('bg-gold/15', 'border-gold', 'text-gold');
        payCOD.classList.remove('border-gold/15', 'text-beige/50');
        payCard.classList.remove('bg-gold/15', 'border-gold', 'text-gold');
        payCard.classList.add('border-gold/15', 'text-beige/50');
        cardField.classList.add('hidden');
        const cardInput = cardField.querySelector('input');
        if (cardInput) cardInput.removeAttribute('required');
      });

      payCard.addEventListener('click', () => {
        payCard.classList.add('bg-gold/15', 'border-gold', 'text-gold');
        payCard.classList.remove('border-gold/15', 'text-beige/50');
        payCOD.classList.remove('bg-gold/15', 'border-gold', 'text-gold');
        payCOD.classList.add('border-gold/15', 'text-beige/50');
        cardField.classList.remove('hidden');
        const cardInput = cardField.querySelector('input');
        if (cardInput) cardInput.setAttribute('required', 'true');
      });
    }

    if (submitOrderForm) {
      submitOrderForm.addEventListener('submit', (e) => {
        e.preventDefault();
        placeRoyalOrder();
      });
    }

    // Secure code application
    const promoBtn = document.getElementById('apply-secret-promo-btn');
    const promoInput = document.getElementById('cart-coupon-input-box');
    if (promoBtn && promoInput) {
      promoBtn.addEventListener('click', () => {
        applySovereignCoupon(promoInput.value);
      });
    }

    // Order cancellation
    const cancelOrderBtn = document.getElementById('cancel-courier-btn');
    if (cancelOrderBtn) {
      cancelOrderBtn.addEventListener('click', () => {
        cancelActiveOrder();
      });
    }

    // Clear active tracker button
    const trackingDoneBtn = document.getElementById('tracking-done-return-btn');
    if (trackingDoneBtn) {
      trackingDoneBtn.addEventListener('click', () => {
        activeOrder = null;
        if (orderProgressInterval) clearInterval(orderProgressInterval);
        if (orderCountdownInterval) clearInterval(orderCountdownInterval);
        hideCartDraw();
        updateMenuButtonsCount();
      });
    }

    // 4. Reservation Grid Selectors
    document.querySelectorAll('.guest-num-card-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.guest-num-card-btn').forEach(b => {
          b.classList.remove('bg-gradient-to-tr', 'from-gold', 'via-amber', 'to-saffron', 'text-maroon', 'border-gold', 'text-sm');
          b.classList.add('border-gold/15', 'text-beige');
        });
        
        btn.classList.add('bg-gradient-to-tr', 'from-gold', 'via-amber', 'to-saffron', 'text-maroon', 'border-gold', 'text-sm');
        btn.classList.remove('border-gold/15', 'text-beige');
        celebrationGuests = parseInt(btn.getAttribute('data-count'));
      });
    });

    const datesTape = document.getElementById('auspicious-dates-tape');
    if (datesTape && window.DATES_AVAILABLE) {
      datesTape.innerHTML = window.DATES_AVAILABLE.map((dateStr) => {
        const dateObj = new Date(dateStr);
        const dayNum = dateObj.getDate();
        const monthStr = dateObj.toLocaleString('en-US', { month: 'short' });
        return `
          <button
            type="button"
            data-date="${dateStr}"
            class="date-select-bullet px-4.5 py-2.5 rounded-xl border text-center shrink-0 flex flex-col justify-center min-w-[70px] cursor-pointer bg-transparent border-gold/10 text-beige/80 hover:border-gold/30 hover:bg-gold/5 transition-all text-xs"
          >
            <span class="text-[9px] uppercase tracking-wider font-light opacity-80">${monthStr}</span>
            <span class="text-lg font-black font-display">${dayNum}</span>
          </button>
        `;
      }).join('');

      datesTape.querySelectorAll('.date-select-bullet').forEach(bullet => {
        bullet.addEventListener('click', () => {
          datesTape.querySelectorAll('.date-select-bullet').forEach(b => {
            b.classList.remove('bg-gradient-to-r', 'from-gold', 'to-saffron', 'text-maroon', 'border-gold', 'font-bold', 'scale-102');
            b.classList.add('border-gold/10', 'text-beige/80');
          });
          
          bullet.classList.add('bg-gradient-to-r', 'from-gold', 'to-saffron', 'text-maroon', 'border-gold', 'font-bold', 'scale-102');
          bullet.classList.remove('border-gold/10', 'text-beige/80');
          activeCelebrationDate = bullet.getAttribute('data-date');
        });
      });
    }

    const timesTape = document.getElementById('auspicious-times-tape');
    if (timesTape && window.TIMES_AVAILABLE) {
      timesTape.innerHTML = window.TIMES_AVAILABLE.map((t) => `
        <button
          type="button"
          data-time="${t}"
          class="time-select-bullet px-4.5 py-2 rounded-full border shrink-0 text-xs font-semibold cursor-pointer bg-transparent border-gold/10 text-beige/80 hover:border-gold/30 transition-all text-xs"
        >
          ${t}
        </button>
      `).join('');

      timesTape.querySelectorAll('.time-select-bullet').forEach(bullet => {
        bullet.addEventListener('click', () => {
          timesTape.querySelectorAll('.time-select-bullet').forEach(b => {
            b.classList.remove('bg-gradient-to-r', 'from-gold', 'to-saffron', 'text-maroon', 'border-gold', 'font-bold');
            b.classList.add('border-gold/10', 'text-beige/80');
          });
          
          bullet.classList.add('bg-gradient-to-r', 'from-gold', 'to-saffron', 'text-maroon', 'border-gold', 'font-bold');
          bullet.classList.remove('border-gold/10', 'text-beige/80');
          activeCelebrationTime = bullet.getAttribute('data-time');
        });
      });
    }

    const reservationForm = document.getElementById('noble-table-reservation-form');
    if (reservationForm) {
      reservationForm.addEventListener('submit', (e) => {
        e.preventDefault();
        saveReservationSeating();
      });
    }

    const cancelResTicketBtn = document.getElementById('cancel-res-ticket-btn');
    if (cancelResTicketBtn) {
      cancelResTicketBtn.addEventListener('click', () => {
        document.getElementById('noble-reservation-screen-form').classList.remove('hidden');
        document.getElementById('noble-reservation-screen-ticket').classList.add('hidden');
      });
    }

    // 5. BANQUETING HALL & PRICING PRICER
    const banquetGuestSlider = document.getElementById('banquet-guests-range');
    const banquetPlateSilver = document.getElementById('dining-plate-silver');
    const banquetPlateGold = document.getElementById('dining-plate-gold');
    const banquetPlateDiamond = document.getElementById('dining-plate-diamond');
    const banquetForm = document.getElementById('stately-banquet-inquiry-form');

    if (banquetGuestSlider) {
      banquetGuestSlider.addEventListener('input', (e) => {
        banquetGuests = parseInt(e.target.value);
        document.getElementById('banquet-guests-count-display').innerText = `${banquetGuests} Noble Guests`;
        updateBanquetInceptionPrice();
      });
    }

    const setPlatingClass = (style) => {
      banquetPlatingStyle = style;
      
      [banquetPlateSilver, banquetPlateGold, banquetPlateDiamond].forEach(b => {
        if (!b) return;
        b.classList.remove('bg-gradient-to-tr', 'from-gold/20', 'to-saffron/20', 'border-gold', 'shadow');
        b.classList.add('border-gold/15', 'bg-gold/5');
        const bullet = b.querySelector('.plating-check-bullet');
        if (bullet) bullet.classList.add('opacity-0');
      });

      let targetBtn = banquetPlateGold;
      if (style === 'silver') targetBtn = banquetPlateSilver;
      if (style === 'diamond') targetBtn = banquetPlateDiamond;

      if (targetBtn) {
        targetBtn.classList.add('bg-gradient-to-tr', 'from-gold/20', 'to-saffron/20', 'border-gold', 'shadow');
        targetBtn.classList.remove('border-gold/15', 'bg-gold/5');
        const bullet = targetBtn.querySelector('.plating-check-bullet');
        if (bullet) bullet.classList.remove('opacity-0');
      }

      updateBanquetInceptionPrice();
    };

    if (banquetPlateSilver) banquetPlateSilver.addEventListener('click', () => setPlatingClass('silver'));
    if (banquetPlateGold) banquetPlateGold.addEventListener('click', () => setPlatingClass('gold'));
    if (banquetPlateDiamond) banquetPlateDiamond.addEventListener('click', () => setPlatingClass('diamond'));

    if (banquetForm) {
      banquetForm.addEventListener('submit', (e) => {
        e.preventDefault();
        savePrivateBanquetRequest();
      });
    }

    const hideBanquetReceiptBtn = document.getElementById('close-banquet-receipt');
    if (hideBanquetReceiptBtn) {
      hideBanquetReceiptBtn.addEventListener('click', () => {
        document.getElementById('banquet-negotiator-box-form').classList.remove('hidden');
        document.getElementById('banquet-negotiator-box-receipt').classList.add('hidden');
      });
    }

    // Occasion selector clicks
    document.querySelectorAll('.banquet-occasion-card').forEach(card => {
      card.addEventListener('click', () => {
        document.querySelectorAll('.banquet-occasion-card').forEach(c => {
          c.classList.remove('bg-maroon/65', 'border-gold', 'text-white', 'shadow-2xl', 'shadow-gold/10');
          c.classList.add('bg-gold/5', 'border-gold/10', 'text-beige/80');
          const tick = c.querySelector('.active-check');
          if (tick) tick.classList.add('hidden');
        });
        
        card.classList.add('bg-maroon/65', 'border-gold', 'text-white', 'shadow-2xl', 'shadow-gold/10');
        card.classList.remove('bg-gold/5', 'border-gold/10', 'text-beige/80');
        const tick = card.querySelector('.active-check');
        if (tick) tick.classList.remove('hidden');
        
        activeOccasion = card.getAttribute('data-occ');
        document.getElementById('banquet-ledgers-occasion').innerText = activeOccasion;
        updateBanquetInceptionPrice();
      });
    });

    // 6. Direct Patron support Negotiators
    const budgetDealToggleLink = document.getElementById('budget-negotiator-toggle-link');
    const budgetDealSection = document.getElementById('budget-deal-expandable-section');
    const directCalcBtn = document.getElementById('run-direct-deal-negotiate');
    const groupSizeSelect = document.getElementById('negotiator-group-selection-box');

    if (budgetDealToggleLink && budgetDealSection) {
      budgetDealToggleLink.addEventListener('click', () => {
        budgetDealSection.classList.toggle('hidden');
      });
    }

    if (directCalcBtn && groupSizeSelect) {
      directCalcBtn.addEventListener('click', () => {
        simulateDirectPatronDeal(parseInt(groupSizeSelect.value));
      });
    }

    // 7. Testimonials Review Cinema sub-layers
    const testimonialCards = document.querySelectorAll('.testimonial-slider-slide-card');
    const movieOverlay = document.getElementById('cinema-player-modal-backdrop');
    const closeMovieBtn = document.getElementById('close-cinema-cinema');

    testimonialCards.forEach((card, idx) => {
      card.addEventListener('click', () => {
        if (!window.TESTIMONIALS) return;
        const review = window.TESTIMONIALS[idx];
        if (review) {
          triggerCinemaScreen(review);
        }
      });
    });

    const triggerCinemaScreen = (review) => {
      currentReviewClip = review;
      reviewerVideoSeconds = 0;
      reviewerVideoIsPlaying = true;
      reviewerVideoIsMuted = false;
      
      const popup = document.getElementById('cinema-player-modal');
      const movieBackdrop = document.getElementById('cinema-player-modal-backdrop');
      
      movieBackdrop.classList.remove('hidden');
      popup.innerHTML = `
        <div class="space-y-4 text-left">
          <div class="flex items-center justify-between border-b border-gold/15 pb-3">
            <div class="flex items-center gap-2">
              <i data-lucide="video" class="text-gold w-5 h-5"></i>
              <h4 class="font-display font-bold text-sm text-gold uppercase tracking-wider">Shivansh Cinema: Guest Review Video</h4>
            </div>
            <button id="kill-cinema" class="p-1 px-2.5 rounded bg-gold/15 border border-gold/20 text-gold text-xs font-bold hover:bg-gold/25 cursor-pointer">X</button>
          </div>

          <!-- Video frame -->
          <div class="relative aspect-video rounded-2xl overflow-hidden border border-gold/30 bg-black flex flex-col items-center justify-center">
            <!-- Simulated moving background -->
            <img 
              src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=400&q=80" 
              class="absolute inset-0 w-full h-full object-cover opacity-20 filter brightness-[0.5] contrast-125 blur-sm"
              id="cinema-sim-video-bg"
            />
            
            <div class="relative z-10 flex flex-col items-center justify-center text-center p-6 space-y-4">
              <img src="${review.image}" class="w-16 h-16 rounded-full border border-gold/40 object-cover shadow-2xl animate-pulse" />
              <div>
                <h5 class="font-bold text-white text-xs">${review.name}</h5>
                <p class="text-[9px] text-beige/50">${review.role}</p>
              </div>
            </div>

            <!-- Glowing bottom live transcription -->
            <div class="absolute bottom-4 left-6 right-6 z-20 p-2.5 rounded-xl bg-black/85 border border-dashed border-gold/25 text-center transition-all">
              <p id="cinema-caption-display" class="font-mono text-xs text-saffron tracking-wide leading-relaxed">
                Loading subtitles...
              </p>
            </div>
          </div>

          <!-- Player Controls Row -->
          <div class="flex items-center justify-between font-sans text-xs pt-1.5 px-1 bg-gold/5 border border-gold/10 p-3 rounded-xl gap-6">
            <div class="flex items-center gap-3">
              <button id="toggle-cinema-play" class="p-1.5 rounded hover:bg-gold/15 text-gold tooltip text-xs font-bold cursor-pointer">
                PAUSE
              </button>
              <button id="toggle-cinema-mute" class="p-1.5 rounded hover:bg-gold/15 text-gold text-xs font-bold cursor-pointer">
                MUTE
              </button>
            </div>
            
            <div class="flex-1 max-w-sm rounded bg-gold/10 h-1 relative overflow-hidden group">
              <div id="cinema-video-progress-fill" class="absolute left-0 top-0 bottom-0 bg-gold transition-all duration-1000" style="width: 0%"></div>
            </div>

            <span id="cinema-time-clock" class="font-mono text-[10px] text-beige/50">0:00 / 0:17</span>
          </div>
        </div>
      `;

      if (window.lucide) window.lucide.createIcons();

      // Launch simulated video intervals
      if (reviewerVideoTimer) clearInterval(reviewerVideoTimer);
      reviewerVideoTimer = setInterval(tickCinemaVideoFrame, 1000);
      tickCinemaVideoFrame();

      // Hook local player controls
      document.getElementById('kill-cinema').addEventListener('click', stopCinemaPlayer);
      document.getElementById('toggle-cinema-play').addEventListener('click', () => {
        reviewerVideoIsPlaying = !reviewerVideoIsPlaying;
        document.getElementById('toggle-cinema-play').innerText = reviewerVideoIsPlaying ? 'PAUSE' : 'PLAY';
      });
      document.getElementById('toggle-cinema-mute').addEventListener('click', () => {
        reviewerVideoIsMuted = !reviewerVideoIsMuted;
        document.getElementById('toggle-cinema-mute').innerText = reviewerVideoIsMuted ? 'UNMUTE' : 'MUTE';
        const bgVideo = document.getElementById('cinema-sim-video-bg');
        if (bgVideo) bgVideo.style.opacity = reviewerVideoIsMuted ? '0.04' : '0.2';
      });
    };

    const tickCinemaVideoFrame = () => {
      if (!currentReviewClip || !reviewerVideoIsPlaying) return;
      
      reviewerVideoSeconds++;
      if (reviewerVideoSeconds > 17) {
        reviewerVideoSeconds = 1; // loop video track
      }

      // Progress bar fill
      const percentage = (reviewerVideoSeconds / 17) * 100;
      document.getElementById('cinema-video-progress-fill').style.width = `${percentage}%`;
      document.getElementById('cinema-time-clock').innerText = `0:${reviewerVideoSeconds < 10 ? '0' + reviewerVideoSeconds : reviewerVideoSeconds} / 0:17`;

      // Match transcript captions
      const captionElement = document.getElementById('cinema-caption-display');
      if (captionElement) {
        let matchingLine = '"Listening to transcription logs particles..."';
        const transcriptions = currentReviewClip.videoTranscription;
        
        for (const log of transcriptions) {
          const range = log.time.split(' - ');
          const start = parseInt(range[0].split(':')[1]);
          const end = parseInt(range[1].split(':')[1]);
          
          if (reviewerVideoSeconds >= start && reviewerVideoSeconds <= end) {
            matchingLine = log.text;
            break;
          }
        }
        captionElement.innerText = matchingLine;
      }
    };

    const stopCinemaPlayer = () => {
      if (reviewerVideoTimer) clearInterval(reviewerVideoTimer);
      document.getElementById('cinema-player-modal-backdrop').classList.add('hidden');
      currentReviewClip = null;
    };

    if (closeMovieBtn) closeMovieBtn.addEventListener('click', stopCinemaPlayer);
    if (movieOverlay) movieOverlay.addEventListener('click', stopCinemaPlayer);

    // 8. Image gallery filter triggers
    document.querySelectorAll('.gallery-category-trigger-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.gallery-category-trigger-btn').forEach(b => {
          b.classList.remove('bg-gradient-to-r', 'from-gold', 'via-amber', 'to-saffron', 'text-maroon', 'font-black');
          b.classList.add('text-beige/70', 'border-gold/15');
        });
        
        btn.classList.add('bg-gradient-to-r', 'from-gold', 'via-amber', 'to-saffron', 'text-maroon', 'font-black');
        btn.classList.remove('text-beige/70', 'border-gold/15');
        
        currentGalleryCategory = btn.getAttribute('data-cat');
        renderGalleryItemsGrid();
      });
    });

    renderGalleryItemsGrid();

    // 9. Feedback forms dispatch console
    const feedback = document.getElementById('noble-contact-feedback-ledgers');
    if (feedback) {
      feedback.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Namaste. Your message has been sealed in ink and dispatched directly to the Proprietor. Shivansh Agrawal will respond within 1 business day.');
        feedback.reset();
      });
    }

    // 10. Newsletter newsletter updates
    const newsForm = document.getElementById('newsletter-subscription-box');
    if (newsForm) {
      newsForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const code = 'SHIV-VIP-' + Math.floor(1000 + Math.random()*9000);
        alert(`Congratulations! You have entered our Elite Nobles Newsletter Club. Present code [${code}] during your next physical table dining to claim your complimentary Chef Surprise Dessert course!`);
        newsForm.reset();
      });
    }
  }

  // --- RENDERING GALLERY COMPONENT ---
  function renderGalleryItemsGrid() {
    const grid = document.getElementById('gallery-items-canvas-wrapper');
    if (!grid || !window.GALLERY_ITEMS) return;

    const filtered = window.GALLERY_ITEMS.filter(item => {
      if (currentGalleryCategory === 'all') return true;
      return item.category === currentGalleryCategory;
    });

    grid.innerHTML = filtered.map(item => `
      <div 
        data-id="${item.id}"
        class="gallery-lightbox-trigger relative rounded-3xl overflow-hidden border border-gold/15 h-64 sm:h-72 cursor-pointer shadow-xl group"
      >
        <img 
          src="${item.image}" 
          alt="${item.caption}" 
          class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-750 brightness-[0.8]"
          referrerpolicy="no-referrer"
        />
        <!-- Ambient overlay text block -->
        <div class="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/40 to-transparent p-5 text-left translate-y-3 group-hover:translate-y-0 transition-transform duration-300">
          <i data-lucide="zoom-in" class="text-gold w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity mb-1"></i>
          <span class="text-[9px] uppercase tracking-widest text-gold font-sans font-bold">${item.category}</span>
          <p class="text-white text-xs mt-1.5 truncate text-wrap line-clamp-2 leading-relaxed font-light">${item.caption}</p>
        </div>
      </div>
    `).join('');

    if (window.lucide) window.lucide.createIcons();

    // Attach Lightbox lightbox overlay events
    grid.querySelectorAll('.gallery-lightbox-trigger').forEach(card => {
      card.addEventListener('click', () => {
        const id = card.getAttribute('data-id');
        const item = window.GALLERY_ITEMS.find(g => g.id === id);
        if (item) {
          triggerLightboxOverlay(item);
        }
      });
    });
  }

  function triggerLightboxOverlay(item) {
    const overlay = document.getElementById('lightbox-backdrop-modal-holder');
    const image = document.getElementById('lightbox-zoomed-picture');
    const caption = document.getElementById('lightbox-image-caption-card');

    image.src = item.image;
    caption.innerText = item.caption;
    overlay.classList.remove('hidden');

    const killBox = () => overlay.classList.add('hidden');
    document.getElementById('kill-lightbox-popup').onclick = killBox;
    overlay.onclick = (e) => {
      if (e.target === overlay || e.target === document.querySelector('.lightbox-inner-box')) {
        killBox();
      }
    };
  }

  // --- DIRECT PATRON SIMULATED DEAL DEPOSIT ---
  function simulateDirectPatronDeal(size) {
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

    const receiptCode = 'OWNER-' + Math.floor(2000 + Math.random() * 8000);
    const box = document.getElementById('direct-deal-generated-outputs');
    
    box.classList.remove('hidden');
    box.innerHTML = `
      <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-emerald/20 pb-3 gap-3">
        <div>
          <span class="text-[9px] uppercase text-emerald block font-bold leading-none mb-1">Patron Approved Deal Match</span>
          <h5 class="font-display font-medium text-sm text-gold">Exclusive ${size}+ Guest Package offer</h5>
        </div>
        <div class="flex items-center gap-1.5 text-xs font-mono font-bold text-saffron bg-black/60 px-3 py-1 rounded-md border border-gold/15">
          Code: ${receiptCode}
        </div>
      </div>

      <div class="space-y-2 text-xs text-left">
        <p class="text-beige/85">
          My private ledger booking system has approved a sovereign <span class="text-emerald font-black text-sm font-serif">${discount}% Discount</span> on catering rates for your gathering!
        </p>
        
        <div class="space-y-1 pt-1 text-left">
          <span class="text-[9px] uppercase font-bold text-gold">Accompanying Royal Perks:</span>
          <ul class="space-y-1 pl-4 list-disc text-[11px] text-beige/70">
            ${perks.map(p => `<li>${p}</li>`).join('')}
          </ul>
        </div>

        <p class="text-[10px] italic text-beige/40 pt-1.5 border-t border-emerald/10 flex items-center gap-1.5">
          <i data-lucide="shield-check" class="text-emerald w-3 h-3 animate-pulse"></i> 
          Present this code during your direct call or copy it directly into the promo-code box of your home courier checkout drawer!
        </p>
      </div>
    `;

    if (window.lucide) window.lucide.createIcons();
  }

  // --- BANQUET PRIVATE COST CALCULATOR ---
  function updateBanquetInceptionPrice() {
    let pricePerPlate = 50; // gold default
    if (banquetPlatingStyle === 'silver') pricePerPlate = 35;
    if (banquetPlatingStyle === 'diamond') pricePerPlate = 95;

    const baseCost = pricePerPlate * banquetGuests;
    
    let decorativeTax = 1000;
    if (activeOccasion === 'Weddings') decorativeTax = 2500;
    if (activeOccasion === 'Corporate Events') decorativeTax = 1800;
    if (activeOccasion === 'Birthday Parties') decorativeTax = 800;

    const grandEstimateSum = baseCost + decorativeTax;

    document.getElementById('banquet-pricer-plate-sum').innerText = `$${pricePerPlate}.00`;
    document.getElementById('banquet-pricer-guests-sum').innerText = `${banquetGuests} Nobles`;
    document.getElementById('banquet-pricer-decor-bonus').innerText = `$${decorativeTax}.00`;
    document.getElementById('banquet-pricer-grand-estimation').innerText = `$${grandEstimateSum}.00`;
  }

  function savePrivateBanquetRequest() {
    const bDate = document.getElementById('banquet-booking-desired-date').value;
    const bName = document.getElementById('banquet-customer-full-title').value;
    const bPhone = document.getElementById('banquet-customer-phone').value;
    const bEmail = document.getElementById('banquet-customer-email').value;

    if (!bDate || !bName || !bPhone || !bEmail) {
      alert('Kindly configure your contact details and desired event date correctly.');
      return;
    }

    let pricePerPlate = 50; 
    if (banquetPlatingStyle === 'silver') pricePerPlate = 35;
    if (banquetPlatingStyle === 'diamond') pricePerPlate = 95;
    const baseCost = pricePerPlate * banquetGuests;
    let decorativeTax = 1000;
    if (activeOccasion === 'Weddings') decorativeTax = 2500;
    if (activeOccasion === 'Corporate Events') decorativeTax = 1800;
    if (activeOccasion === 'Birthday Parties') decorativeTax = 800;
    const grandEstimateSum = baseCost + decorativeTax;

    const code = 'ROY-' + Math.floor(10000 + Math.random() * 90000);

    document.getElementById('banquet-negotiator-box-form').classList.add('hidden');
    const receiptBox = document.getElementById('banquet-negotiator-box-receipt');
    receiptBox.classList.remove('hidden');

    receiptBox.innerHTML = `
      <div class="h-14 w-14 bg-emerald/15 text-emerald border border-emerald/30 rounded-full flex items-center justify-center mx-auto mb-4">
        <i data-lucide="shield-check" class="w-6 h-6"></i>
      </div>

      <div class="space-y-2 text-center">
        <h4 class="font-display font-medium text-lg text-gold">Sovereign Inquiry Logged</h4>
        <p class="text-xs text-beige/70 leading-relaxed max-w-sm mx-auto">
          Your private palace banquet request code has been written under royal ink. Our premium events planner will contact you via e-mail within 4 hours.
        </p>
      </div>

      <!-- Receipt Voucher -->
      <div class="w-full mt-4 p-5 bg-gradient-to-r from-gold/10 to-saffron/10 border border-gold/30 rounded-2xl text-left text-xs space-y-3 relative overflow-hidden font-sans">
        <div class="absolute inset-0 radial-gold-glow pointer-events-none opacity-20"></div>
        
        <div class="flex justify-between items-center pb-2 border-b border-gold/20 relative z-10">
          <div>
            <span class="text-[8px] uppercase text-beige/50 block font-bold leading-none mb-1">Exclusive Banquet inquiry voucher</span>
            <h5 class="font-bold text-gold text-xs leading-none mt-1">${activeOccasion} Royal Gala</h5>
          </div>
          <span class="font-mono text-saffron text-sm font-bold">${code}</span>
        </div>

        <div class="space-y-1.5 relative z-10 text-beige/80">
          <div class="flex justify-between">
            <span>Sovereign Host:</span>
            <span class="text-white font-bold">${bName}</span>
          </div>
          <div class="flex justify-between">
            <span>Desired Date:</span>
            <span class="text-white font-medium">${bDate}</span>
          </div>
          <div class="flex justify-between">
            <span>Assemble Scale:</span>
            <span class="text-white font-medium">${banquetGuests} Noble Guests</span>
          </div>
          <div class="flex justify-between">
            <span>Plating Premium:</span>
            <span class="text-gold font-bold uppercase">${banquetPlatingStyle} Plating ($${pricePerPlate}/plate)</span>
          </div>
          <div class="flex justify-between border-t border-dashed border-gold/15 pt-2 mt-2 text-gold">
            <span>Estimated Grand Value:</span>
            <span class="text-saffron font-extrabold font-mono text-sm">$${grandEstimateSum}.00</span>
          </div>
        </div>
      </div>

      <button
        id="dismiss-private-banquet-estimate"
        class="mt-6 px-8 py-3 rounded-full border border-gold/30 text-gold text-xs font-bold uppercase tracking-wider hover:bg-gold/5 cursor-pointer transition-colors"
      >
        Close Ledger inquiry
      </button>
    `;

    if (window.lucide) window.lucide.createIcons();

    document.getElementById('dismiss-private-banquet-estimate').addEventListener('click', () => {
      document.getElementById('stately-banquet-inquiry-form').reset();
      receiptBox.classList.add('hidden');
      document.getElementById('banquet-negotiator-box-form').classList.remove('hidden');
    });
  }

  // --- CART MECHANICS SHIELD ---
  function addToCart(menuItem) {
    const existing = cart.find(item => item.menuItem.id === menuItem.id);
    if (existing) {
      existing.quantity++;
    } else {
      cart.push({ menuItem, quantity: 1 });
    }
    
    updateHeaderCartBadgesCount();
    renderCartSheet();
    triggerCartFloatingBounce();
  }

  function triggerAddAnimation(button) {
    if(!button) return;
    const originalText = button.innerHTML;
    button.classList.add('from-emerald', 'to-emerald', 'text-white');
    button.innerHTML = `<i data-lucide="check" class="w-3.5 h-3.5"></i><span>Added!</span>`;
    if (window.lucide) window.lucide.createIcons();

    setTimeout(() => {
      button.classList.remove('from-emerald', 'to-emerald', 'text-white');
      button.innerHTML = originalText;
      if (window.lucide) window.lucide.createIcons();
    }, 1500);
  }

  function updateHeaderCartBadgesCount() {
    const totalCount = cart.reduce((acc, current) => acc + current.quantity, 0);
    document.querySelectorAll('.header-cart-badges').forEach(badge => {
      badge.innerText = totalCount;
      if (totalCount > 0) {
        badge.classList.remove('scale-0');
      } else {
        badge.classList.add('scale-0');
      }
    });
  }

  function triggerCartFloatingBounce() {
    const trigs = document.querySelectorAll('.cart-drawer-trigger');
    trigs.forEach(btn => {
      btn.classList.add('animate-bounce');
      setTimeout(() => btn.classList.remove('animate-bounce'), 1000);
    });
  }

  let cartAppliedCouponReductionPercent = 0;
  let activeCouponString = '';

  function applySovereignCoupon(code) {
    const norm = code.trim().toUpperCase();
    const feedbackText = document.getElementById('cart-coupon-matches-notice');
    
    if (norm === '') {
      alert('Kindly configure or enter a coupon code.');
      return;
    }

    if (norm === 'ROYAL20') {
      cartAppliedCouponReductionPercent = 20;
      activeCouponString = 'ROYAL20';
      feedbackText.innerText = 'Promo ROYAL20 success: Sovereign 20% Discount applied on subtotal!';
      feedbackText.className = 'text-xs text-emerald mt-1 italic animate-pulse font-medium';
    } else if (norm.startsWith('OWNER-')) {
      cartAppliedCouponReductionPercent = 15; // default simulated mediator code
      // Match size discount percent if it was generated
      cartAppliedCouponReductionPercent = 15;
      activeCouponString = norm;
      feedbackText.innerText = `Patron Match Promo ${norm} success: Exclusive 15% Reduction Applied!`;
      feedbackText.className = 'text-xs text-emerald mt-1 italic animate-pulse font-medium';
    } else {
      feedbackText.innerText = 'Invalid voucher code. Double check spelling or generate deals with the Patron Proprietor first.';
      feedbackText.className = 'text-xs text-red-400 mt-1 italic font-medium';
    }
    
    renderCartSheet();
  }

  function renderCartSheet() {
    const tray = document.getElementById('drawer-cart-items-scroller');
    if (!tray) return;

    if (cart.length === 0) {
      tray.innerHTML = `
        <div class="text-center py-16">
          <i data-lucide="shopping-bag" class="text-gold/20 mx-auto mb-4 w-14 h-14"></i>
          <h4 class="font-display font-medium text-gold">Your Royal Tray is Empty</h4>
          <p class="text-xs text-beige/65 max-w-[240px] mx-auto mt-2 leading-relaxed">
            Ascend to our culinary card menu, and summon some signature delicacies.
          </p>
        </div>
      `;
      document.getElementById('cart-sub-totals-block').classList.add('hidden');
      document.getElementById('cart-proceed-checkout-btn').classList.add('hidden');
      return;
    }

    document.getElementById('cart-sub-totals-block').classList.remove('hidden');
    document.getElementById('cart-proceed-checkout-btn').classList.remove('hidden');

    tray.innerHTML = cart.map(item => `
      <div 
        class="flex items-center gap-4 p-3 rounded-2xl bg-gold/5 border border-gold/10 hover:border-gold/25 transition-colors duration-300 text-left"
      >
        <img 
          src="${item.menuItem.image}" 
          alt="${item.menuItem.name}" 
          class="w-16 h-16 rounded-xl object-cover border border-gold/20 shrink-0"
          referrerpolicy="no-referrer"
        />

        <div class="flex-1 min-w-0">
          <h5 class="font-display font-bold text-xs truncate text-gold">${item.menuItem.name}</h5>
          <span class="text-[10px] text-beige/65 uppercase tracking-wider block mt-0.5">
            $${item.menuItem.price}.00 each
          </span>
          
          <div class="flex items-center gap-2.5 mt-2">
            <button
              data-id="${item.menuItem.id}"
              class="cart-dec-btn p-1 rounded bg-maroon border border-gold/15 text-gold hover:text-amber transition-colors cursor-pointer"
            >
              <i data-lucide="minus" class="w-2.5 h-2.5"></i>
            </button>
            <span class="text-xs font-bold font-mono text-white">${item.quantity}</span>
            <button
              data-id="${item.menuItem.id}"
              class="cart-inc-btn p-1 rounded bg-maroon border border-gold/15 text-gold hover:text-amber transition-colors cursor-pointer"
            >
              <i data-lucide="plus" class="w-2.5 h-2.5"></i>
            </button>
          </div>
        </div>

        <div class="flex flex-col items-end gap-3 shrink-0">
          <span class="font-display font-black text-xs text-saffron">
            $${item.menuItem.price * item.quantity}.00
          </span>
          <button
            data-id="${item.menuItem.id}"
            class="cart-remove-btn p-1 text-beige/40 hover:text-red-400 transition-colors cursor-pointer"
            title="Retract Item"
          >
            <i data-lucide="trash-2" class="w-3.5 h-3.5"></i>
          </button>
        </div>
      </div>
    `).join('');

    if (window.lucide) window.lucide.createIcons();

    // Attach Inc, Dec, Remove Event Hooks
    tray.querySelectorAll('.cart-inc-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        const match = cart.find(item => item.menuItem.id === id);
        if(match) match.quantity++;
        renderCartSheet();
        updateHeaderCartBadgesCount();
      });
    });

    tray.querySelectorAll('.cart-dec-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        const match = cart.find(item => item.menuItem.id === id);
        if(match) {
          match.quantity--;
          if (match.quantity <= 0) {
            cart = cart.filter(item => item.menuItem.id !== id);
          }
        }
        renderCartSheet();
        updateHeaderCartBadgesCount();
      });
    });

    tray.querySelectorAll('.cart-remove-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        cart = cart.filter(item => item.menuItem.id !== id);
        renderCartSheet();
        updateHeaderCartBadgesCount();
      });
    });

    // Sum details calculation
    const subtotal = cart.reduce((acc, current) => acc + (current.menuItem.price * current.quantity), 0);
    const deliveryFee = subtotal > 50 ? 0 : 5;
    
    // Percent Reduction calculation
    let promoDeductionPrice = 0;
    if (cartAppliedCouponReductionPercent > 0) {
      promoDeductionPrice = Math.round(subtotal * (cartAppliedCouponReductionPercent / 100));
    }

    const taxedPrise = Math.round((subtotal - promoDeductionPrice) * 0.08); // 8% Gst
    const grandBalanceSum = (subtotal - promoDeductionPrice) + deliveryFee + taxedPrise;

    document.getElementById('sum-total').innerText = `$${subtotal}.00`;
    
    const deliverySpan = document.getElementById('shipping-fee');
    if (deliveryFee === 0) {
      deliverySpan.innerHTML = `<span class="text-emerald font-bold font-sans">FREE sovereign dispatch</span>`;
    } else {
      deliverySpan.innerText = `$${deliveryFee}.00`;
    }

    const promoRow = document.getElementById('cart-promo-reduction-row');
    const promoSpan = document.getElementById('cart-discount-value');
    if (promoDeductionPrice > 0) {
      promoRow.classList.remove('hidden');
      promoSpan.innerText = `-$${promoDeductionPrice}.00`;
    } else {
      promoRow.classList.add('hidden');
    }

    document.getElementById('saffron-tax-sum').innerText = `$${taxedPrise}.00`;
    
    const finalBalanceNodes = document.querySelectorAll('.final-grand-amount');
    finalBalanceNodes.forEach(lbl => {
      lbl.innerText = `$${grandBalanceSum}.00`;
    });
  }

  // --- PLACING ORDERS ---
  function placeRoyalOrder() {
    const oName = document.getElementById('checkout-noble-title').value;
    const oPhone = document.getElementById('checkout-courier-phone').value;
    const oAddress = document.getElementById('checkout-destination-address').value;

    if (!oName || !oPhone || !oAddress) {
      alert('Kindly configure your title, phone and transit address details correctly.');
      return;
    }

    const subtotal = cart.reduce((acc, current) => acc + (current.menuItem.price * current.quantity), 0);
    const deliveryFee = subtotal > 50 ? 0 : 5;
    let promoDeductionPrice = 0;
    if (cartAppliedCouponReductionPercent > 0) {
      promoDeductionPrice = Math.round(subtotal * (cartAppliedCouponReductionPercent / 100));
    }
    const taxedPrise = Math.round((subtotal - promoDeductionPrice) * 0.08);
    const grandTotal = (subtotal - promoDeductionPrice) + deliveryFee + taxedPrise;

    const orderId = 'SHV-' + Math.floor(100000 + Math.random() * 900000);
    
    activeOrder = {
      id: orderId,
      customerName: oName,
      address: oAddress,
      totalAmount: grandTotal,
      status: 0,
      timestamp: new Date()
    };

    // Wipe cart
    cart = [];
    updateHeaderCartBadgesCount();
    
    // Switch Drawer UI tabs
    document.getElementById('cart-drawer-checkout-form').classList.add('hidden');
    document.getElementById('cart-active-tracking-view').classList.remove('hidden');

    document.getElementById('tracker-order-code').innerText = activeOrder.id;
    document.getElementById('tracker-courier-destination').innerText = activeOrder.address;

    // Reset checkout form fields
    document.getElementById('royal-order-checkout-form').reset();
    document.getElementById('cart-coupon-matches-notice').innerText = '';
    cartAppliedCouponReductionPercent = 0;
    activeCouponString = '';

    // Fire sound buzzer and begin simulation progressing sliders
    orderSecondsRemaining = 2100; // 35 minutes
    
    if (orderCountdownInterval) clearInterval(orderCountdownInterval);
    orderCountdownInterval = setInterval(updateLiveCountdownClock, 1000);
    updateLiveCountdownClock();

    if (orderProgressInterval) clearInterval(orderProgressInterval);
    orderProgressInterval = setInterval(progressSimulatedCourierStep, 15000); // 15 seconds progress leaps
    updateTrackingVisualStepper();

    updateMenuButtonsCount();
  }

  function updateLiveCountdownClock() {
    if (orderSecondsRemaining <= 0) {
      document.getElementById('tracker-arriving-index').innerText = 'Arrived!';
      clearInterval(orderCountdownInterval);
      return;
    }

    orderSecondsRemaining--;
    const mins = Math.floor(orderSecondsRemaining / 60);
    const secs = orderSecondsRemaining % 60;
    document.getElementById('tracker-arriving-index').innerText = `~${mins} Mins ${secs < 10 ? '0' + secs : secs} Secs`;
  }

  function progressSimulatedCourierStep() {
    if (!activeOrder) return;
    
    if (activeOrder.status < 3) {
      activeOrder.status++;
      updateTrackingVisualStepper();
    } else {
      clearInterval(orderProgressInterval);
    }
  }

  function updateTrackingVisualStepper() {
    if (!activeOrder) return;
    const steps = activeOrder.status; // 0, 1, 2, 3

    for (let i = 0; i <= 3; i++) {
      const bullet = document.getElementById(`step-badge-${i}`);
      const line = document.getElementById(`step-wire-${i}`);
      const label = document.getElementById(`step-title-${i}`);

      if (!bullet) continue;

      if (i < steps) {
        // Completed step
        bullet.className = 'w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold border relative z-10 bg-emerald border-emerald text-maroon';
        bullet.innerHTML = '✓';
        if (label) label.className = 'font-sans text-xs font-bold text-emerald';
        if (line) line.className = 'absolute top-6 left-[11px] bottom-0 w-[2px] bg-emerald';
      } else if (i === steps) {
        // Active step
        bullet.className = 'w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold border relative z-10 bg-gold border-gold text-maroon animate-pulse';
        bullet.innerHTML = i + 1;
        if (label) label.className = 'font-sans text-xs font-bold text-gold';
        if (line) line.className = 'absolute top-6 left-[11px] bottom-0 w-[2px] bg-gold/15';
      } else {
        // Future steps
        bullet.className = 'w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold border relative z-10 bg-[#180509] border-gold/20 text-gold/40';
        bullet.innerHTML = i + 1;
        if (label) label.className = 'font-sans text-xs font-bold text-beige/40';
        if (line) line.className = 'absolute top-6 left-[11px] bottom-0 w-[2px] bg-gold/15';
      }
    }
  }

  function cancelActiveOrder() {
    const verify = confirm('Noble Patron, do you truly wish to recall your simulated order? Chefs are slow charcoal oven-cooking special spices details right now.');
    if (verify) {
      activeOrder = null;
      if (orderProgressInterval) clearInterval(orderProgressInterval);
      if (orderCountdownInterval) clearInterval(orderCountdownInterval);
      
      // Return back to empty cart viewport
      document.getElementById('cart-active-tracking-view').classList.add('hidden');
      document.getElementById('cart-drawer-items-view').classList.remove('hidden');
      checkoutCartBlock = document.getElementById('cart-drawer-items-view');
      checkoutCartBlock.classList.remove('hidden');
      document.getElementById('cart-drawer-checkout-form').classList.add('hidden');
      
      hideCartDraw();
      updateMenuButtonsCount();
    }
  }

  function updateMenuButtonsCount() {
    // Show Alert spin tracking triggers if live tracking is active
    const desktopTrackerBtn = document.getElementById('active-tracker-spin-trigger');
    const mobileTrackerBtn = document.getElementById('active-tracker-mobile-spin-trigger');

    if (activeOrder) {
      if (desktopTrackerBtn) desktopTrackerBtn.classList.remove('hidden');
      if (mobileTrackerBtn) mobileTrackerBtn.classList.remove('hidden');
    } else {
      if (desktopTrackerBtn) desktopTrackerBtn.classList.add('hidden');
      if (mobileTrackerBtn) mobileTrackerBtn.classList.add('hidden');
    }
  }

  const desktopTrackerButton = document.getElementById('active-tracker-spin-trigger');
  const mobileTrackerButton = document.getElementById('active-tracker-mobile-spin-trigger');
  
  const showActiveTrackerDirectly = () => {
    const overlay = document.getElementById('cart-drawer-overlay');
    const container = document.getElementById('cart-drawer-container');
    overlay.classList.remove('hidden');
    container.style.transform = 'translateX(0)';

    document.getElementById('cart-drawer-items-view').classList.add('hidden');
    document.getElementById('cart-drawer-checkout-form').classList.add('hidden');
    document.getElementById('cart-active-tracking-view').classList.remove('hidden');
    updateTrackingVisualStepper();
  };

  if (desktopTrackerButton) desktopTrackerButton.addEventListener('click', showActiveTrackerDirectly);
  if (mobileTrackerButton) mobileTrackerButton.addEventListener('click', showActiveTrackerDirectly);

  // --- SEATING RESERVATION SYSTEM ---
  function saveReservationSeating() {
    const nameStr = document.getElementById('res-customer-name').value;
    const phoneStr = document.getElementById('res-customer-phone').value;
    const emailStr = document.getElementById('res-customer-email').value;
    const reqs = document.getElementById('res-special-reqs').value;

    if (!activeCelebrationDate || !activeCelebrationTime) {
      alert('Noble Host! Kindly choose an auspicious Date and Time from our select indicators charts first.');
      return;
    }

    const ticketNo = 'REC-' + Math.floor(1000 + Math.random() * 9000);
    const blockReceipt = document.getElementById('noble-reservation-screen-ticket');
    
    document.getElementById('noble-reservation-screen-form').classList.add('hidden');
    blockReceipt.classList.remove('hidden');

    blockReceipt.innerHTML = `
      <div class="h-16 w-16 bg-emerald/15 text-emerald border border-emerald/30 rounded-full flex items-center justify-center mx-auto mb-4">
        <i data-lucide="check-circle-2" class="w-8 h-8 animate-bounce"></i>
      </div>

      <div class="space-y-2 text-center">
        <h3 class="font-display font-medium text-lg text-gold">Seating Verified!</h3>
        <p class="text-xs text-beige/70 max-w-sm mx-auto leading-relaxed">
          Your royal table reservation details are recorded in our ledgers. Present this digital ticket upon arrival.
        </p>
      </div>

      <!-- Royal Golden Ticket -->
      <div class="w-full max-w-md mx-auto p-6 bg-gradient-to-r from-[#D4AF37]/15 to-[#FFBF00]/15 border-2 border-dashed border-gold/40 rounded-2xl relative overflow-hidden backdrop-blur shadow-2xl flex flex-col gap-4 text-left font-sans mt-6">
        <!-- Ticket cut notches -->
        <div class="absolute -left-3 top-1/2 -translate-y-1/2 h-6 w-6 rounded-full bg-[#0A0204]"></div>
        <div class="absolute -right-3 top-1/2 -translate-y-1/2 h-6 w-6 rounded-full bg-[#0A0204]"></div>
        
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 radial-gold-glow pointer-events-none w-52 h-52 opacity-30"></div>

        <div class="flex items-center justify-between border-b border-gold/20 pb-3 relative z-10">
          <div>
            <h4 class="font-display font-bold text-sm text-gold">SHIVANSH RESTRO</h4>
            <span class="text-[8px] uppercase tracking-widest text-beige/50">Maharaja Dining Entry</span>
          </div>
          <i data-lucide="ticket" class="text-gold w-6 h-6"></i>
        </div>

        <div class="grid grid-cols-2 gap-4 relative z-10 text-xs text-beige/90">
          <div>
            <span class="text-[9px] uppercase text-beige/40 block">Guest Host:</span>
            <span class="text-white font-semibold">${nameStr}</span>
          </div>
          <div>
            <span class="text-[9px] uppercase text-beige/40 block">Assemble size:</span>
            <span class="text-white font-semibold">${celebrationGuests} ${celebrationGuests === 1 ? 'Guest' : 'Guests'}</span>
          </div>
          <div>
            <span class="text-[9px] uppercase text-beige/40 block">Sovereign Date:</span>
            <span class="text-white font-semibold">${activeCelebrationDate}</span>
          </div>
          <div>
            <span class="text-[9px] uppercase text-beige/40 block">Auspicious Time:</span>
            <span class="text-white font-semibold">${activeCelebrationTime}</span>
          </div>
        </div>

        <div class="pt-3 border-t border-gold/20 flex justify-between items-center relative z-10">
          <div>
            <span class="text-[8px] uppercase text-beige/40 block">Royal Seat Code:</span>
            <span class="font-mono text-saffron text-sm font-bold tracking-wider">${ticketNo}</span>
          </div>
          <span class="text-[9px] font-mono text-emerald bg-emerald/10 border border-emerald/30 px-2 py-0.5 rounded uppercase font-bold animate-pulse">
            CONFIRMED
          </span>
        </div>
      </div>

      <button
        id="res-book-another-btn"
        class="mt-6 px-8 py-3 rounded-full border border-gold/30 text-gold text-xs font-bold uppercase tracking-wider hover:bg-gold/5 cursor-pointer transition-all"
      >
        Book Another Seating
      </button>
    `;

    if (window.lucide) window.lucide.createIcons();

    document.getElementById('res-book-another-btn').addEventListener('click', () => {
      document.getElementById('noble-table-reservation-form').reset();
      
      // Clear selections visual anchors
      document.querySelectorAll('.date-select-bullet').forEach(b => {
        b.classList.remove('bg-gradient-to-r', 'from-gold', 'to-saffron', 'text-maroon', 'border-gold', 'font-bold', 'scale-102');
        b.classList.add('border-gold/10', 'text-beige/80');
      });
      document.querySelectorAll('.time-select-bullet').forEach(b => {
        b.classList.remove('bg-gradient-to-r', 'from-gold', 'to-saffron', 'text-maroon', 'border-gold', 'font-bold');
        b.classList.add('border-gold/10', 'text-beige/80');
      });

      activeCelebrationDate = '';
      activeCelebrationTime = '';

      document.getElementById('noble-reservation-screen-ticket').classList.add('hidden');
      document.getElementById('noble-reservation-screen-form').classList.remove('hidden');
    });
  }

  // --- 2D CANVAS PATHMAKER MAP MECHANICS ---
  let mapCanvas, mapCtx;
  let animationFrameId = null;
  let chariotX = 50;
  let chariotY = 150;
  let progressIndex = 0;
  let isNavigating = false;
  let sparklesParticles = [];

  const PATH_STOPS = [
    { x: 50, y: 150, label: 'Guest Manor' },
    { x: 120, y: 90, label: 'Lotus Garden' },
    { x: 200, y: 140, label: 'Maharaja Avenue' },
    { x: 280, y: 210, label: 'Shiva Archway' },
    { x: 410, y: 150, label: 'Shivansh Restro' }
  ];

  function initPathmaker() {
    mapCanvas = document.getElementById('chariot-nav-canvas');
    if (!mapCanvas) return;
    mapCtx = mapCanvas.getContext('2d');

    // Handle high DPI retina display sizing
    const dpr = window.devicePixelRatio || 1;
    mapCanvas.width = 460 * dpr;
    mapCanvas.height = 300 * dpr;
    mapCanvas.style.width = '100%';
    mapCanvas.style.height = '300px';
    mapCtx.scale(dpr, dpr);

    drawStaticCartography();

    const triggerBtn = document.getElementById('trigger-chariot-route-animation');
    if (triggerBtn) {
      triggerBtn.addEventListener('click', () => {
        if (isNavigating) return;
        runChariotNavigationSimulation();
      });
    }
  }

  function drawStaticCartography() {
    if (!mapCtx) return;
    mapCtx.clearRect(0, 0, 460, 300);

    // 1. Draw grid backdrop lines
    mapCtx.strokeStyle = 'rgba(212, 175, 55, 0.05)';
    mapCtx.lineWidth = 1;
    for (let x = 0; x < 460; x += 30) {
      mapCtx.beginPath();
      mapCtx.moveTo(x, 0);
      mapCtx.lineTo(x, 300);
      mapCtx.stroke();
    }
    for (let y = 0; y < 300; y += 30) {
      mapCtx.beginPath();
      mapCtx.moveTo(0, y);
      mapCtx.lineTo(460, y);
      mapCtx.stroke();
    }

    // 2. Draw ancient path curves
    mapCtx.strokeStyle = 'rgba(212, 175, 55, 0.2)';
    mapCtx.lineWidth = 3;
    mapCtx.setLineDash([4, 6]);
    mapCtx.beginPath();
    mapCtx.moveTo(PATH_STOPS[0].x, PATH_STOPS[0].y);
    for (let i = 1; i < PATH_STOPS.length; i++) {
      mapCtx.lineTo(PATH_STOPS[i].x, PATH_STOPS[i].y);
    }
    mapCtx.stroke();
    mapCtx.setLineDash([]); // Reset line dashes

    // 3. Draw Landmark dots & labels
    PATH_STOPS.forEach((stop, i) => {
      const isStart = i === 0;
      const isEnd = i === PATH_STOPS.length - 1;

      // Glow circle aura
      mapCtx.beginPath();
      mapCtx.arc(stop.x, stop.y, isEnd || isStart ? 10 : 6, 0, Math.PI * 2);
      mapCtx.fillStyle = isEnd ? 'rgba(255, 153, 51, 0.25)' : 'rgba(212, 175, 55, 0.15)';
      mapCtx.fill();

      // Main point
      mapCtx.beginPath();
      mapCtx.arc(stop.x, stop.y, isEnd || isStart ? 6 : 4, 0, Math.PI * 2);
      mapCtx.fillStyle = isEnd ? '#FF9933' : isStart ? '#D4AF37' : '#FFFFF0';
      mapCtx.fill();

      // Text names
      mapCtx.font = 'bold 8px Poppins, sans-serif';
      mapCtx.fillStyle = isEnd ? '#FFBF00' : isStart ? '#D4AF37' : 'rgba(255, 255, 240, 0.6)';
      mapCtx.fillText(stop.label, stop.x - 30, stop.y - 14);
    });
  }

  function runChariotNavigationSimulation() {
    isNavigating = true;
    progressIndex = 0;
    chariotX = PATH_STOPS[0].x;
    chariotY = PATH_STOPS[0].y;
    sparklesParticles = [];
    
    const outputText = document.getElementById('chariot-arrival text-notice');
    if (outputText) {
      outputText.innerText = 'Chariot Departing Manor Gates... Spices Steaming!';
      outputText.className = 'text-xs text-gold font-mono tracking-wider animate-pulse';
    }

    if (animationFrameId) cancelAnimationFrame(animationFrameId);
    animateChariotTraversal();
  }

  function animateChariotTraversal() {
    if (!isNavigating) return;

    // Check progress matches
    const target = PATH_STOPS[progressIndex + 1];
    if (!target) {
      // Arrived at destination!
      isNavigating = false;
      const outputText = document.getElementById('chariot-arrival text-notice');
      if (outputText) {
        outputText.innerHTML = `
          <div class="p-3 bg-emerald/10 border border-emerald/30 rounded-2xl animate-gold-pulse">
            <span class="text-emerald font-bold block uppercase text-[10px]">Destination Reached</span>
            <p class="text-[11px] text-white mt-1">Your Royal Chariot has arrived. Your Saffron Welcome drink is brewed!</p>
          </div>
        `;
      }
      return;
    }

    // Move chariot coordinate closer to segment target stop
    const dx = target.x - chariotX;
    const dy = target.y - chariotY;
    const distance = Math.sqrt(dx * dx + dy * dy);

    const speed = 2.0; // Travel pixels per frame

    if (distance <= speed) {
      chariotX = target.x;
      chariotY = target.y;
      progressIndex++;
    } else {
      chariotX += (dx / distance) * speed;
      chariotY += (dy / distance) * speed;
    }

    // Add star particles
    if (Math.random() < 0.3) {
      sparklesParticles.push({
        x: chariotX,
        y: chariotY,
        vx: (Math.random() - 0.5) * 1.5,
        vy: (Math.random() - 0.5) * 1.5,
        alpha: 1.0,
        size: 1.5 + Math.random() * 2
      });
    }

    // Render Canvas updates
    drawStaticCartography();
    renderDynamicEmitters();

    animationFrameId = requestAnimationFrame(animateChariotTraversal);
  }

  function renderDynamicEmitters() {
    // 1. Draw glowing particle trail
    sparklesParticles.forEach((p, idx) => {
      p.x += p.vx;
      p.y += p.vy;
      p.alpha -= 0.02;

      if (p.alpha <= 0) {
        sparklesParticles.splice(idx, 1);
        return;
      }

      mapCtx.beginPath();
      mapCtx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      mapCtx.fillStyle = `rgba(255, 180, 0, ${p.alpha})`;
      mapCtx.fill();
    });

    // 2. Draw chariot body indicator icon
    mapCtx.beginPath();
    mapCtx.arc(chariotX, chariotY, 8, 0, Math.PI * 2);
    mapCtx.fillStyle = '#C49B37';
    mapCtx.fill();

    mapCtx.beginPath();
    mapCtx.arc(chariotX, chariotY, 5, 0, Math.PI * 2);
    mapCtx.fillStyle = '#6A0D25';
    mapCtx.fill();

    // Small gold core
    mapCtx.beginPath();
    mapCtx.arc(chariotX, chariotY, 2.5, 0, Math.PI * 2);
    mapCtx.fillStyle = '#FFFFF0';
    mapCtx.fill();
  }

})();
