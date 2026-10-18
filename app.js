/**
 * ShopSphere - Complete E-Commerce Workflow & Interactive Application
 * Features:
 * 1. Product Catalog with Wishlist & Quick View
 * 2. Category Filters & Real-time Live Search with Clear
 * 3. Shopping Cart Drawer with Quantity Controls, Promo Codes & Free Shipping Goal
 * 4. Comprehensive Checkout Workflow with Address Validation & Payment Selection
 * 5. Order Confirmation Screen with Order ID, Tracker, Itemized Receipt & Print Invoice
 * 6. Order History Modal & LocalStorage Persistence
 * 7. Modern Toast Notification System (replaces default alert popups)
 */

// ==========================================
// 1. Product Catalog Data
// ==========================================
const products = [
  {
    id: 1,
    name: "Noise-Cancelling Wireless Headphones",
    category: "tech",
    price: 2499,
    originalPrice: 4999,
    rating: "4.9",
    reviewsCount: 342,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80",
    description: "Immerse yourself in rich, high-fidelity sound with 40-hour battery life, active noise cancellation, and ultra-plush memory foam earcups."
  },
  {
    id: 2,
    name: "RGB Mechanical Gaming Keyboard",
    category: "tech",
    price: 1899,
    originalPrice: 2999,
    rating: "4.8",
    reviewsCount: 189,
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600&q=80",
    description: "Tactile mechanical blue switches, customizable per-key RGB backlighting, durable aircraft-grade aluminum top plate, and anti-ghosting keys."
  },
  {
    id: 3,
    name: "Premium Classic Cotton Hoodie",
    category: "clothing",
    price: 1299,
    originalPrice: 1999,
    rating: "4.7",
    reviewsCount: 512,
    image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=600&q=80",
    description: "Crafted from 100% combed organic cotton with a brushed fleece interior for all-day comfort, double-lined hood, and kangaroo pocket."
  },
  {
    id: 4,
    name: "Vintage Washed Denim Jacket",
    category: "clothing",
    price: 1999,
    originalPrice: 3499,
    rating: "4.8",
    reviewsCount: 220,
    image: "https://images.unsplash.com/photo-1578932750294-f5075e85f44a?w=600&q=80",
    description: "Timeless trucker-style denim jacket crafted from heavyweight indigo denim with embossed metallic buttons and roomy chest pockets."
  },
  {
    id: 5,
    name: "Handcrafted Leather Travel Backpack",
    category: "accessories",
    price: 1499,
    originalPrice: 2499,
    rating: "4.9",
    reviewsCount: 410,
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=80",
    description: "Full-grain durable leather backpack featuring a 15.6-inch padded laptop compartment, water-resistant lining, and breathable shoulder straps."
  },
  {
    id: 6,
    name: "Minimalist Sapphire Glass Watch",
    category: "accessories",
    price: 999,
    originalPrice: 1899,
    rating: "4.6",
    reviewsCount: 165,
    image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=600&q=80",
    description: "Ultra-slim Japanese quartz timepiece with genuine Italian leather strap, scratch-resistant sapphire crystal, and 30m water resistance."
  }
];

// Valid Promo Codes
const PROMO_CODES = {
  "SPHERE20": { discountPercent: 20, description: "20% Festive Discount" },
  "AURA20": { discountPercent: 20, description: "20% Festive Discount" },
  "WELCOME50": { discountAmount: 50, description: "₹50 Welcome Voucher" },
  "FREESHIP": { freeShipping: true, description: "Free Express Delivery" }
};

const FREE_SHIPPING_THRESHOLD = 999;
const STANDARD_SHIPPING_FEE = 99;

// ==========================================
// 2. State & Local Storage Initialization
// ==========================================
let cart = loadFromStorage("shopsphere_cart", "aura_cart", []);
let wishlist = loadFromStorage("shopsphere_wishlist", "aura_wishlist", []);
let orders = loadFromStorage("shopsphere_orders", "aura_orders", []);
let activePromo = loadFromStorage("shopsphere_promo", "aura_promo", null);
let currentFilter = "all";

function loadFromStorage(primaryKey, fallbackKey, fallback) {
  try {
    const data = localStorage.getItem(primaryKey) || (fallbackKey ? localStorage.getItem(fallbackKey) : null);
    return data ? JSON.parse(data) : fallback;
  } catch (e) {
    console.warn(`Could not read ${primaryKey} from localStorage`, e);
    return fallback;
  }
}

function saveToStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.warn(`Could not save ${key} to localStorage`, e);
  }
}

// ==========================================
// 3. DOM Elements
// ==========================================
// Header & Navigation
const searchInput = document.getElementById("searchInput");
const clearSearchBtn = document.getElementById("clearSearchBtn");
const cartBtn = document.getElementById("cartBtn");
const cartCount = document.getElementById("cartCount");
const logoLink = document.getElementById("logoLink");
const orderHistoryBtn = document.getElementById("orderHistoryBtn");
const footerCartLink = document.getElementById("footerCartLink");
const navLinks = document.querySelectorAll(".nav-link");

// Products Grid & Filters
const productGrid = document.getElementById("productGrid");
const filterButtons = document.querySelectorAll(".filter-btn");
const productCountInfo = document.getElementById("productCountInfo");

// Modals & Overlays
const cartModal = document.getElementById("cartModal");
const closeCart = document.getElementById("closeCart");
const quickViewModal = document.getElementById("quickViewModal");
const closeQuickView = document.getElementById("closeQuickView");
const checkoutModal = document.getElementById("checkoutModal");
const closeCheckout = document.getElementById("closeCheckout");
const orderConfirmationModal = document.getElementById("orderConfirmationModal");
const orderHistoryModal = document.getElementById("orderHistoryModal");
const closeOrderHistory = document.getElementById("closeOrderHistory");

// Cart Drawer Elements
const cartItems = document.getElementById("cartItems");
const cartSubtotal = document.getElementById("cartSubtotal");
const cartDiscount = document.getElementById("cartDiscount");
const discountRow = document.getElementById("discountRow");
const discountTag = document.getElementById("discountTag");
const shippingFeeText = document.getElementById("shippingFeeText");
const cartTotal = document.getElementById("cartTotal");
const cartItemSubtitle = document.getElementById("cartItemSubtitle");
const shippingProgressText = document.getElementById("shippingProgressText");
const shippingProgressBar = document.getElementById("shippingProgressBar");
const checkoutBtn = document.getElementById("checkoutBtn");
const clearCartBtn = document.getElementById("clearCartBtn");
const continueShoppingBtn = document.getElementById("continueShoppingBtn");
const emptyStateShopBtn = document.getElementById("emptyStateShopBtn");
const couponInput = document.getElementById("couponInput");
const applyCouponBtn = document.getElementById("applyCouponBtn");
const couponMessage = document.getElementById("couponMessage");

// Checkout Form Elements
const checkoutForm = document.getElementById("checkoutForm");
const checkoutItemsList = document.getElementById("checkoutItemsList");
const chkSubtotal = document.getElementById("chkSubtotal");
const chkDiscount = document.getElementById("chkDiscount");
const chkDiscountRow = document.getElementById("chkDiscountRow");
const chkShipping = document.getElementById("chkShipping");
const chkTotal = document.getElementById("chkTotal");
const placeOrderBtn = document.getElementById("placeOrderBtn");
const paymentOptionRadios = document.querySelectorAll('input[name="paymentMethod"]');
const upiDetailsBox = document.getElementById("upiDetailsBox");
const cardDetailsBox = document.getElementById("cardDetailsBox");

// Order Confirmation Elements
const confOrderId = document.getElementById("confOrderId");
const confCustomerName = document.getElementById("confCustomerName");
const confCustomerAddress = document.getElementById("confCustomerAddress");
const confCustomerPhone = document.getElementById("confCustomerPhone");
const confCustomerEmail = document.getElementById("confCustomerEmail");
const confPaymentMethod = document.getElementById("confPaymentMethod");
const confPaymentStatus = document.getElementById("confPaymentStatus");
const confDeliveryDate = document.getElementById("confDeliveryDate");
const confOrderDate = document.getElementById("confOrderDate");
const confItemsList = document.getElementById("confItemsList");
const confSubtotal = document.getElementById("confSubtotal");
const confDiscount = document.getElementById("confDiscount");
const confDiscountRow = document.getElementById("confDiscountRow");
const confShipping = document.getElementById("confShipping");
const confTotal = document.getElementById("confTotal");
const printInvoiceBtn = document.getElementById("printInvoiceBtn");
const confContinueShoppingBtn = document.getElementById("confContinueShoppingBtn");

// Quick View Elements
const qvImage = document.getElementById("qvImage");
const qvCategoryBadge = document.getElementById("qvCategoryBadge");
const qvRating = document.getElementById("qvRating");
const qvTitle = document.getElementById("qvTitle");
const qvPrice = document.getElementById("qvPrice");
const qvOriginalPrice = document.getElementById("qvOriginalPrice");
const qvDiscount = document.getElementById("qvDiscount");
const qvDesc = document.getElementById("qvDesc");
const qvAddToCartBtn = document.getElementById("qvAddToCartBtn");
const qvBuyNowBtn = document.getElementById("qvBuyNowBtn");

// Toasts Container
const toastContainer = document.getElementById("toastContainer");

let activeQuickViewProduct = null;

// ==========================================
// 4. Toast Notification Utility
// ==========================================
function showToast(message, type = "info") {
  const toast = document.createElement("div");
  toast.className = `toast ${type === "success" ? "toast-success" : type === "danger" ? "toast-danger" : ""}`;
  
  const icon = type === "success" ? "✓" : type === "danger" ? "✕" : "ℹ";
  toast.innerHTML = `<span><strong>${icon}</strong> ${message}</span>`;
  
  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.classList.add("toast-fade-out");
    setTimeout(() => {
      toast.remove();
    }, 300);
  }, 2800);
}

// ==========================================
// 5. Render Products & Badges
// ==========================================
function updateCategoryBadges() {
  const counts = { all: products.length, tech: 0, clothing: 0, accessories: 0 };
  products.forEach(p => {
    if (counts[p.category] !== undefined) counts[p.category]++;
  });

  const countAll = document.getElementById("countAll");
  const countTech = document.getElementById("countTech");
  const countClothing = document.getElementById("countClothing");
  const countAccessories = document.getElementById("countAccessories");

  if (countAll) countAll.textContent = counts.all;
  if (countTech) countTech.textContent = counts.tech;
  if (countClothing) countClothing.textContent = counts.clothing;
  if (countAccessories) countAccessories.textContent = counts.accessories;
}

function displayProducts(itemsToDisplay) {
  productGrid.innerHTML = "";

  if (itemsToDisplay.length === 0) {
    productGrid.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 40px 20px; background: #fff; border-radius: 12px; border: 1px dashed #cbd5e1;">
        <p style="font-size: 2rem; margin-bottom: 8px;">🔍</p>
        <h4 style="font-size: 1.15rem; margin-bottom: 6px;">No products match your criteria</h4>
        <p style="color: #64748b; font-size: 0.9rem; margin-bottom: 16px;">Try clearing your search term or selecting another category.</p>
        <button class="btn btn-primary btn-sm" onclick="resetFilters()">View All Products</button>
      </div>
    `;
    productCountInfo.textContent = "0 products found";
    return;
  }

  productCountInfo.textContent = `Showing ${itemsToDisplay.length} of ${products.length} products`;

  itemsToDisplay.forEach(item => {
    const isLiked = wishlist.includes(item.id);
    const discountPercent = Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100);

    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <div class="product-img-wrapper">
        <img src="${item.image}" alt="${item.name}" loading="lazy">
        <span class="badge-category">${item.category}</span>
        <button class="btn-wishlist ${isLiked ? 'liked' : ''}" data-id="${item.id}" title="${isLiked ? 'Remove from wishlist' : 'Add to wishlist'}" aria-label="Toggle wishlist">
          ${isLiked ? '❤️' : '🤍'}
        </button>
        <button class="quick-view-overlay-btn" data-id="${item.id}">Quick View 👁️</button>
      </div>
      <div class="product-info">
        <div class="product-rating">⭐ ${item.rating} (${item.reviewsCount} reviews)</div>
        <h3 class="product-title">${item.name}</h3>
        <div class="product-pricing">
          <span class="product-price">₹${item.price.toLocaleString('en-IN')}</span>
          <span class="product-original-price">₹${item.originalPrice.toLocaleString('en-IN')}</span>
          <span class="product-discount-pill">${discountPercent}% OFF</span>
        </div>
        <div class="product-actions">
          <button class="btn-card-cart" data-id="${item.id}">Add to Cart</button>
          <button class="btn-card-buy" data-id="${item.id}">Buy Now</button>
        </div>
      </div>
    `;

    // Event Listeners for buttons inside product card
    const cartBtnEl = card.querySelector(".btn-card-cart");
    const buyBtnEl = card.querySelector(".btn-card-buy");
    const wishlistBtnEl = card.querySelector(".btn-wishlist");
    const quickViewBtnEl = card.querySelector(".quick-view-overlay-btn");

    cartBtnEl.addEventListener("click", () => addToCart(item.id));
    buyBtnEl.addEventListener("click", () => buyNow(item.id));
    wishlistBtnEl.addEventListener("click", (e) => toggleWishlist(item.id, e.currentTarget));
    quickViewBtnEl.addEventListener("click", () => openQuickView(item.id));

    productGrid.appendChild(card);
  });
}

function resetFilters() {
  searchInput.value = "";
  clearSearchBtn.style.display = "none";
  filterButtons.forEach(btn => btn.classList.remove("active"));
  document.getElementById("filterAll").classList.add("active");
  currentFilter = "all";
  displayProducts(products);
}

// ==========================================
// 6. Category Filtering & Search
// ==========================================
filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    filterButtons.forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");
    currentFilter = button.dataset.category;
    applyFilters();
  });
});

searchInput.addEventListener("input", (e) => {
  const val = e.target.value.trim();
  clearSearchBtn.style.display = val ? "flex" : "none";
  applyFilters();
});

clearSearchBtn.addEventListener("click", () => {
  searchInput.value = "";
  clearSearchBtn.style.display = "none";
  searchInput.focus();
  applyFilters();
});

function applyFilters() {
  const term = searchInput.value.toLowerCase().trim();
  let filtered = products;

  if (currentFilter !== "all") {
    filtered = filtered.filter(p => p.category === currentFilter);
  }

  if (term) {
    filtered = filtered.filter(p =>
      p.name.toLowerCase().includes(term) ||
      p.category.toLowerCase().includes(term) ||
      p.description.toLowerCase().includes(term)
    );
  }

  displayProducts(filtered);
}

// ==========================================
// 7. Wishlist Functionality
// ==========================================
function toggleWishlist(productId, buttonElement) {
  const index = wishlist.indexOf(productId);
  const product = products.find(p => p.id === productId);

  if (index > -1) {
    wishlist.splice(index, 1);
    buttonElement.classList.remove("liked");
    buttonElement.innerHTML = "🤍";
    showToast(`Removed "${product.name}" from wishlist.`);
  } else {
    wishlist.push(productId);
    buttonElement.classList.add("liked");
    buttonElement.innerHTML = "❤️";
    showToast(`Saved "${product.name}" to your wishlist!`, "success");
  }
  saveToStorage("shopsphere_wishlist", wishlist);
}

// ==========================================
// 8. Quick View Modal
// ==========================================
function openQuickView(productId) {
  const item = products.find(p => p.id === productId);
  if (!item) return;

  activeQuickViewProduct = item;
  const discountPercent = Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100);

  qvImage.src = item.image;
  qvImage.alt = item.name;
  qvCategoryBadge.textContent = item.category;
  qvRating.textContent = `⭐ ${item.rating} (${item.reviewsCount} customer reviews)`;
  qvTitle.textContent = item.name;
  qvPrice.textContent = `₹${item.price.toLocaleString('en-IN')}`;
  qvOriginalPrice.textContent = `₹${item.originalPrice.toLocaleString('en-IN')}`;
  qvDiscount.textContent = `${discountPercent}% OFF`;
  qvDesc.textContent = item.description;

  openModal(quickViewModal);
}

qvAddToCartBtn.addEventListener("click", () => {
  if (activeQuickViewProduct) {
    addToCart(activeQuickViewProduct.id);
    closeModal(quickViewModal);
  }
});

qvBuyNowBtn.addEventListener("click", () => {
  if (activeQuickViewProduct) {
    closeModal(quickViewModal);
    buyNow(activeQuickViewProduct.id);
  }
});

closeQuickView.addEventListener("click", () => closeModal(quickViewModal));

// ==========================================
// 9. Shopping Cart Management
// ==========================================
function addToCart(productId, qtyToAdd = 1) {
  const product = products.find(p => p.id === productId);
  if (!product) return;

  const existingItem = cart.find(item => item.id === productId);
  if (existingItem) {
    existingItem.quantity += qtyToAdd;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category,
      quantity: qtyToAdd
    });
  }

  saveToStorage("shopsphere_cart", cart);
  updateCartUI();

  // Badge bump animation
  cartCount.classList.remove("bump");
  void cartCount.offsetWidth;
  cartCount.classList.add("bump");

  showToast(`Added "${product.name}" to cart!`, "success");
}

function buyNow(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;

  // Add to cart if not already present
  const existing = cart.find(i => i.id === productId);
  if (!existing) {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category,
      quantity: 1
    });
    saveToStorage("shopsphere_cart", cart);
    updateCartUI();
  }

  // Open Checkout directly
  openCheckout();
}

function updateQuantity(index, change) {
  if (cart[index]) {
    cart[index].quantity += change;
    if (cart[index].quantity <= 0) {
      const removedName = cart[index].name;
      cart.splice(index, 1);
      showToast(`Removed "${removedName}" from cart.`);
    }
    saveToStorage("shopsphere_cart", cart);
    updateCartUI();
  }
}

function removeFromCart(index) {
  if (cart[index]) {
    const removedName = cart[index].name;
    cart.splice(index, 1);
    saveToStorage("shopsphere_cart", cart);
    updateCartUI();
    showToast(`Removed "${removedName}" from cart.`);
  }
}

function clearCart() {
  if (cart.length === 0) return;
  cart = [];
  activePromo = null;
  saveToStorage("shopsphere_cart", cart);
  saveToStorage("shopsphere_promo", null);
  updateCartUI();
  showToast("Your cart has been cleared.");
}

function calculateTotals() {
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  let discount = 0;
  let isFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD;

  if (activePromo) {
    if (activePromo.discountPercent) {
      discount = Math.round((subtotal * activePromo.discountPercent) / 100);
    } else if (activePromo.discountAmount) {
      discount = Math.min(subtotal, activePromo.discountAmount);
    }
    if (activePromo.freeShipping) {
      isFreeShipping = true;
    }
  }

  const shipping = (subtotal === 0 || isFreeShipping) ? 0 : STANDARD_SHIPPING_FEE;
  const total = Math.max(0, subtotal - discount + shipping);

  return { subtotal, discount, shipping, total, isFreeShipping };
}

function updateCartUI() {
  const totalItemCount = cart.reduce((sum, i) => sum + i.quantity, 0);
  cartCount.textContent = totalItemCount;
  cartItemSubtitle.textContent = `${totalItemCount} item${totalItemCount === 1 ? '' : 's'}`;

  const { subtotal, discount, shipping, total, isFreeShipping } = calculateTotals();

  // Shipping Progress Bar
  if (subtotal === 0) {
    shippingProgressText.textContent = `Add ₹${FREE_SHIPPING_THRESHOLD} for FREE Shipping`;
    shippingProgressBar.style.width = "0%";
  } else if (subtotal < FREE_SHIPPING_THRESHOLD && !activePromo?.freeShipping) {
    const remaining = FREE_SHIPPING_THRESHOLD - subtotal;
    const percent = Math.min(100, Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100));
    shippingProgressText.textContent = `Add ₹${remaining.toLocaleString('en-IN')} more to get FREE Delivery!`;
    shippingProgressBar.style.width = `${percent}%`;
  } else {
    shippingProgressText.textContent = "🎉 Congratulations! FREE Express Delivery unlocked!";
    shippingProgressBar.style.width = "100%";
  }

  // Render items
  if (cart.length === 0) {
    cartItems.innerHTML = `
      <div class="empty-state">
        <span class="empty-icon">🛍️</span>
        <p class="empty-msg">Your cart is currently empty.</p>
        <button class="btn btn-primary btn-sm" id="emptyStateShopBtnDynamic">Start Shopping</button>
      </div>
    `;
    const dynamicBtn = document.getElementById("emptyStateShopBtnDynamic");
    if (dynamicBtn) {
      dynamicBtn.addEventListener("click", () => {
        closeModal(cartModal);
        document.getElementById("products").scrollIntoView({ behavior: "smooth" });
      });
    }

    cartSubtotal.textContent = "0";
    cartTotal.textContent = "0";
    discountRow.style.display = "none";
    shippingFeeText.textContent = `₹${STANDARD_SHIPPING_FEE}`;
    checkoutBtn.disabled = true;
    checkoutBtn.style.opacity = "0.5";
    checkoutBtn.style.cursor = "not-allowed";
    return;
  }

  checkoutBtn.disabled = false;
  checkoutBtn.style.opacity = "1";
  checkoutBtn.style.cursor = "pointer";

  cartItems.innerHTML = "";
  cart.forEach((item, index) => {
    const itemRow = document.createElement("div");
    itemRow.className = "cart-item";
    itemRow.innerHTML = `
      <img src="${item.image}" alt="${item.name}" class="cart-item-img">
      <div class="cart-item-details">
        <h4 class="cart-item-title">${item.name}</h4>
        <div class="cart-item-price">₹${(item.price * item.quantity).toLocaleString('en-IN')} <span style="font-weight: 400; color: #94a3b8; font-size: 0.8rem;">(₹${item.price} each)</span></div>
        <div class="quantity-controls">
          <button class="qty-btn" data-action="decrease" data-index="${index}" title="Decrease quantity">−</button>
          <span class="qty-display">${item.quantity}</span>
          <button class="qty-btn" data-action="increase" data-index="${index}" title="Increase quantity">+</button>
        </div>
      </div>
      <button class="btn-item-remove" data-index="${index}" title="Remove item" aria-label="Remove item">🗑️</button>
    `;

    itemRow.querySelector('[data-action="decrease"]').addEventListener("click", () => updateQuantity(index, -1));
    itemRow.querySelector('[data-action="increase"]').addEventListener("click", () => updateQuantity(index, 1));
    itemRow.querySelector('.btn-item-remove').addEventListener("click", () => removeFromCart(index));

    cartItems.appendChild(itemRow);
  });

  // Breakdown values
  cartSubtotal.textContent = subtotal.toLocaleString('en-IN');
  if (discount > 0) {
    discountRow.style.display = "flex";
    cartDiscount.textContent = discount.toLocaleString('en-IN');
    discountTag.textContent = activePromo.discountPercent ? `${activePromo.discountPercent}%` : `₹${activePromo.discountAmount}`;
  } else {
    discountRow.style.display = "none";
  }

  shippingFeeText.textContent = shipping === 0 ? "FREE" : `₹${shipping}`;
  cartTotal.textContent = total.toLocaleString('en-IN');
}

// Promo Code Application
applyCouponBtn.addEventListener("click", applyCouponCode);
couponInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    applyCouponCode();
  }
});

function applyCouponCode() {
  const code = couponInput.value.trim().toUpperCase();
  if (!code) {
    showCouponMsg("Please enter a coupon code.", "error");
    return;
  }

  if (PROMO_CODES[code]) {
    activePromo = { ...PROMO_CODES[code], code };
    saveToStorage("shopsphere_promo", activePromo);
    showCouponMsg(`Code "${code}" applied! ${activePromo.description}`, "success");
    showToast(`Coupon "${code}" applied successfully!`, "success");
    updateCartUI();
  } else {
    showCouponMsg("Invalid promo code. Try SPHERE20 or FREESHIP", "error");
    showToast("Invalid promo code entered.", "danger");
  }
}

function showCouponMsg(text, type) {
  couponMessage.textContent = text;
  couponMessage.className = `coupon-msg ${type}`;
}

// ==========================================
// 10. Checkout Workflow
// ==========================================
function openCheckout() {
  if (cart.length === 0) {
    showToast("Your cart is empty! Add some items before checkout.", "danger");
    return;
  }

  closeModal(cartModal);

  // Render Checkout Summary
  const { subtotal, discount, shipping, total } = calculateTotals();
  checkoutItemsList.innerHTML = "";
  cart.forEach(item => {
    const line = document.createElement("div");
    line.className = "chk-item-line";
    line.innerHTML = `
      <span>${item.name} × ${item.quantity}</span>
      <span>₹${(item.price * item.quantity).toLocaleString('en-IN')}</span>
    `;
    checkoutItemsList.appendChild(line);
  });

  chkSubtotal.textContent = subtotal.toLocaleString('en-IN');
  if (discount > 0) {
    chkDiscountRow.style.display = "flex";
    chkDiscount.textContent = discount.toLocaleString('en-IN');
  } else {
    chkDiscountRow.style.display = "none";
  }

  chkShipping.textContent = shipping === 0 ? "FREE" : `₹${shipping}`;
  chkTotal.textContent = total.toLocaleString('en-IN');

  openModal(checkoutModal);
}

// Payment method selector toggle
paymentOptionRadios.forEach(radio => {
  radio.addEventListener("change", (e) => {
    document.querySelectorAll(".payment-option").forEach(el => el.classList.remove("selected"));
    e.target.closest(".payment-option").classList.add("selected");

    const val = e.target.value;
    upiDetailsBox.style.display = val === "UPI" ? "flex" : "none";
    cardDetailsBox.style.display = val === "Card" ? "flex" : "none";
  });
});

// Checkout Form Submission & Order Processing
checkoutForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const nameInput = document.getElementById("custName");
  const phoneInput = document.getElementById("custPhone");
  const emailInput = document.getElementById("custEmail");
  const addressInput = document.getElementById("custAddress");
  const cityInput = document.getElementById("custCity");
  const pincodeInput = document.getElementById("custPincode");

  let isValid = true;

  // Validation helpers
  function validateField(input, condition) {
    if (!condition) {
      input.classList.add("invalid");
      isValid = false;
    } else {
      input.classList.remove("invalid");
    }
  }

  validateField(nameInput, nameInput.value.trim().length >= 2);
  validateField(phoneInput, /^[0-9]{10}$/.test(phoneInput.value.trim()));
  validateField(emailInput, /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value.trim()));
  validateField(addressInput, addressInput.value.trim().length >= 5);
  validateField(cityInput, cityInput.value.trim().length >= 2);
  validateField(pincodeInput, /^[0-9]{6}$/.test(pincodeInput.value.trim()));

  if (!isValid) {
    showToast("Please fix the highlighted fields to continue.", "danger");
    return;
  }

  // Selected Payment Method
  const selectedPayment = document.querySelector('input[name="paymentMethod"]:checked').value;

  // Simulate payment processing state
  const normalText = placeOrderBtn.querySelector(".btn-text-normal");
  const spinnerText = placeOrderBtn.querySelector(".btn-spinner");
  normalText.style.display = "none";
  spinnerText.style.display = "inline-block";
  placeOrderBtn.disabled = true;

  setTimeout(() => {
    // Generate Order
    const orderId = "ORD-" + Math.floor(100000 + Math.random() * 900000);
    const orderDate = new Date();
    const deliveryDate = new Date();
    deliveryDate.setDate(orderDate.getDate() + 3);

    const { subtotal, discount, shipping, total } = calculateTotals();

    const newOrder = {
      id: orderId,
      date: orderDate.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }),
      deliveryDate: deliveryDate.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }),
      customer: {
        name: nameInput.value.trim(),
        phone: phoneInput.value.trim(),
        email: emailInput.value.trim(),
        address: `${addressInput.value.trim()}, ${cityInput.value.trim()} - ${pincodeInput.value.trim()}`
      },
      paymentMethod: selectedPayment,
      paymentStatus: selectedPayment === "COD" ? "Cash on Delivery" : "Paid Online",
      items: [...cart],
      subtotal,
      discount,
      shipping,
      total
    };

    // Save order
    orders.unshift(newOrder);
    saveToStorage("shopsphere_orders", orders);

    // Reset Form button
    normalText.style.display = "inline-block";
    spinnerText.style.display = "none";
    placeOrderBtn.disabled = false;

    // Reset Cart & Promo
    cart = [];
    activePromo = null;
    saveToStorage("shopsphere_cart", cart);
    saveToStorage("shopsphere_promo", null);
    updateCartUI();

    // Close Checkout and Show Confirmation
    closeModal(checkoutModal);
    displayOrderConfirmation(newOrder);
  }, 1200);
});

// ==========================================
// 11. Order Confirmation Screen
// ==========================================
function displayOrderConfirmation(order) {
  confOrderId.textContent = order.id;
  confCustomerName.textContent = order.customer.name;
  confCustomerAddress.textContent = order.customer.address;
  confCustomerPhone.textContent = `📞 +91 ${order.customer.phone}`;
  confCustomerEmail.textContent = `✉️ ${order.customer.email}`;
  confPaymentMethod.textContent = order.paymentMethod;
  confPaymentStatus.textContent = order.paymentStatus;
  confDeliveryDate.textContent = `Expected by ${order.deliveryDate}`;
  confOrderDate.textContent = order.date;

  // Items table
  confItemsList.innerHTML = "";
  order.items.forEach(item => {
    const row = document.createElement("div");
    row.className = "conf-item-row";
    row.innerHTML = `
      <div>
        <div class="conf-item-name">${item.name}</div>
        <div class="conf-item-qty">Qty: ${item.quantity} × ₹${item.price.toLocaleString('en-IN')}</div>
      </div>
      <strong>₹${(item.price * item.quantity).toLocaleString('en-IN')}</strong>
    `;
    confItemsList.appendChild(row);
  });

  confSubtotal.textContent = order.subtotal.toLocaleString('en-IN');
  if (order.discount > 0) {
    confDiscountRow.style.display = "flex";
    confDiscount.textContent = order.discount.toLocaleString('en-IN');
  } else {
    confDiscountRow.style.display = "none";
  }

  confShipping.textContent = order.shipping === 0 ? "FREE" : `₹${order.shipping}`;
  confTotal.textContent = order.total.toLocaleString('en-IN');

  openModal(orderConfirmationModal);
  showToast("🎉 Order placed successfully!", "success");
}

printInvoiceBtn.addEventListener("click", () => {
  window.print();
});

confContinueShoppingBtn.addEventListener("click", () => {
  closeModal(orderConfirmationModal);
  document.getElementById("products").scrollIntoView({ behavior: "smooth" });
});

// ==========================================
// 12. Order History Modal
// ==========================================
function openOrderHistory() {
  const historyList = document.getElementById("orderHistoryList");
  historyList.innerHTML = "";

  if (orders.length === 0) {
    historyList.innerHTML = `
      <div style="text-align: center; padding: 30px; color: #64748b;">
        <p style="font-size: 2.5rem; margin-bottom: 8px;">📦</p>
        <h4>No orders placed yet</h4>
        <p style="font-size: 0.9rem; margin-top: 4px;">Once you complete an order, its invoice and tracking status will appear here.</p>
      </div>
    `;
  } else {
    orders.forEach(order => {
      const card = document.createElement("div");
      card.className = "history-item";
      card.innerHTML = `
        <div class="history-top">
          <span style="color: #6b21a8;">${order.id}</span>
          <span style="font-size: 0.85rem; color: #64748b;">${order.date}</span>
        </div>
        <div style="font-size: 0.88rem; margin-bottom: 8px;">
          ${order.items.map(i => `${i.name} (x${i.quantity})`).join(", ")}
        </div>
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <strong>Total: ₹${order.total.toLocaleString('en-IN')}</strong>
          <button class="btn btn-outline-sm btn-reopen-order" data-id="${order.id}">View Receipt</button>
        </div>
      `;

      card.querySelector(".btn-reopen-order").addEventListener("click", () => {
        closeModal(orderHistoryModal);
        displayOrderConfirmation(order);
      });

      historyList.appendChild(card);
    });
  }

  openModal(orderHistoryModal);
}

orderHistoryBtn.addEventListener("click", openOrderHistory);
closeOrderHistory.addEventListener("click", () => closeModal(orderHistoryModal));

// ==========================================
// 13. Modal Open/Close System & Listeners
// ==========================================
function openModal(modalEl) {
  modalEl.style.display = "flex";
  // Force reflow
  void modalEl.offsetWidth;
  modalEl.classList.add("open");
  modalEl.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeModal(modalEl) {
  modalEl.classList.remove("open");
  modalEl.setAttribute("aria-hidden", "true");
  setTimeout(() => {
    if (!modalEl.classList.contains("open")) {
      modalEl.style.display = "none";
    }
  }, 250);
  document.body.style.overflow = "";
}

// Cart Drawer Open & Close
cartBtn.addEventListener("click", () => openModal(cartModal));
if (footerCartLink) {
  footerCartLink.addEventListener("click", (e) => {
    e.preventDefault();
    openModal(cartModal);
  });
}
closeCart.addEventListener("click", () => closeModal(cartModal));

// Cart Drawer Actions
checkoutBtn.addEventListener("click", openCheckout);
clearCartBtn.addEventListener("click", clearCart);
continueShoppingBtn.addEventListener("click", () => {
  closeModal(cartModal);
  document.getElementById("products").scrollIntoView({ behavior: "smooth" });
});
if (emptyStateShopBtn) {
  emptyStateShopBtn.addEventListener("click", () => {
    closeModal(cartModal);
    document.getElementById("products").scrollIntoView({ behavior: "smooth" });
  });
}

// Close checkout modal
closeCheckout.addEventListener("click", () => closeModal(checkoutModal));

// Close modals when clicking backdrop overlay
[cartModal, quickViewModal, checkoutModal, orderConfirmationModal, orderHistoryModal].forEach(modal => {
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeModal(modal);
    }
  });
});

// Close modals on Escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    [cartModal, quickViewModal, checkoutModal, orderConfirmationModal, orderHistoryModal].forEach(modal => {
      if (modal.classList.contains("open")) {
        closeModal(modal);
      }
    });
  }
});

// Smooth scroll for logo & nav links
if (logoLink) {
  logoLink.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

navLinks.forEach(link => {
  link.addEventListener("click", () => {
    navLinks.forEach(l => l.classList.remove("active"));
    link.classList.add("active");
  });
});

// ==========================================
// 14. Initialize App
// ==========================================
function init() {
  updateCategoryBadges();
  displayProducts(products);
  updateCartUI();
}

init();
