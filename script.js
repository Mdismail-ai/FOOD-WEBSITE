// Menu Data
const menuData = [
    {
        id: 1,
        name: "Margherita Pizza",
        category: "pizza",
        price: 12.99,
        rating: 4.5,
        image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1381&q=80",
        description: "Classic pizza with tomato sauce, mozzarella, and basil"
    },
    {
        id: 2,
        name: "Pepperoni Pizza",
        category: "pizza",
        price: 14.99,
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80",
        description: "Pizza with tomato sauce, mozzarella, and pepperoni"
    },
    {
        id: 3,
        name: "Cheeseburger",
        category: "burger",
        price: 8.99,
        rating: 4.3,
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1598&q=80",
        description: "Beef patty with cheese, lettuce, tomato, and special sauce"
    },
    {
        id: 4,
        name: "Chicken Burger",
        category: "burger",
        price: 9.99,
        rating: 4.2,
        image: "https://images.unsplash.com/photo-1603064752734-4c48eff53d05?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1588&q=80",
        description: "Grilled chicken with lettuce, tomato, and mayo"
    },
    {
        id: 5,
        name: "Spaghetti Carbonara",
        category: "pasta",
        price: 11.99,
        rating: 4.6,
        image: "https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        description: "Pasta with creamy sauce, pancetta, and parmesan"
    },
    {
        id: 6,
        name: "Caesar Salad",
        category: "salad",
        price: 7.99,
        rating: 4.0,
        image: "https://images.unsplash.com/photo-1546793665-c74683f339c1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1587&q=80",
        description: "Romaine lettuce with Caesar dressing, croutons, and parmesan"
    },
    {
        id: 7,
        name: "Greek Salad",
        category: "salad",
        price: 8.99,
        rating: 4.1,
        image: "https://images.unsplash.com/photo-1607532941433-304659e8198a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1378&q=80",
        description: "Fresh vegetables with feta cheese and olives"
    },
    {
        id: 8,
        name: "Penne Arrabiata",
        category: "pasta",
        price: 10.99,
        rating: 4.4,
        image: "https://images.unsplash.com/photo-1588013273468-315fd88ea34c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1469&q=80",
        description: "Penne pasta with spicy tomato sauce"
    }
];

// Cart State
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// DOM Elements
const menuGrid = document.getElementById('menuGrid');
const cartIcon = document.getElementById('cartIcon');
const cartCount = document.getElementById('cartCount');
const cartModal = document.getElementById('cartModal');
const overlay = document.getElementById('overlay');
const closeCart = document.getElementById('closeCart');
const cartItems = document.getElementById('cartItems');
const subtotal = document.getElementById('subtotal');
const total = document.getElementById('total');
const checkoutBtn = document.getElementById('checkoutBtn');
const tabBtns = document.querySelectorAll('.tab-btn');

// Initialize the app
function init() {
    renderMenuItems(menuData);
    updateCartCount();
    setupEventListeners();
    animateFoodCards();
}

// Render menu items
function renderMenuItems(items) {
    menuGrid.innerHTML = '';
    items.forEach((item, index) => {
        const foodCard = document.createElement('div');
        foodCard.className = 'food-card';
        foodCard.style.animationDelay = `${index * 0.1}s`;
        foodCard.innerHTML = `
            <div class="food-img">
                <img src="${item.image}" alt="${item.name}">
            </div>
            <div class="food-info">
                <h3>${item.name}</h3>
                <p>${item.description}</p>
                <div class="food-price">$${item.price.toFixed(2)}</div>
            </div>
            <button class="add-to-cart" data-id="${item.id}">
                <i class="fas fa-plus"></i>
            </button>
        `;
        menuGrid.appendChild(foodCard);
    });
}

// Filter menu by category
function filterMenu(category) {
    tabBtns.forEach(btn => btn.classList.remove('active'));
    document.querySelector(`.tab-btn[data-category="${category}"]`).classList.add('active');
    
    if (category === 'all') {
        renderMenuItems(menuData);
    } else {
        const filteredItems = menuData.filter(item => item.category === category);
        renderMenuItems(filteredItems);
    }
    animateFoodCards();
}

// Animate food cards on scroll
function animateFoodCards() {
    const foodCards = document.querySelectorAll('.food-card');
    
    foodCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    foodCards.forEach(card => observer.observe(card));
}

// Update cart count
function updateCartCount() {
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = count;
    
    if (count > 0) {
        cartCount.style.transform = 'scale(1.2)';
        setTimeout(() => {
            cartCount.style.transform = 'scale(1)';
        }, 300);
    }
}

// Update cart total
function updateCartTotal() {
    const subtotalValue = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    subtotal.textContent = `$${subtotalValue.toFixed(2)}`;
    total.textContent = `$${(subtotalValue + 2.99).toFixed(2)}`;
}

// Render cart items
function renderCartItems() {
    cartItems.innerHTML = '';
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
        return;
    }
    
    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <div class="cart-item-img">
                <img src="${item.image}" alt="${item.name}">
            </div>
            <div class="cart-item-details">
                <div class="cart-item-title">${item.name}</div>
                <div class="cart-item-price">$${(item.price * item.quantity).toFixed(2)}</div>
                <div class="cart-item-actions">
                    <button class="quantity-btn minus" data-id="${item.id}">-</button>
                    <span class="item-quantity">${item.quantity}</span>
                    <button class="quantity-btn plus" data-id="${item.id}">+</button>
                    <button class="remove-item" data-id="${item.id}">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `;
        cartItems.appendChild(cartItem);
    });
    
    updateCartTotal();
}

// Add item to cart
function addToCart(id) {
    const item = menuData.find(item => item.id === id);
    const existingItem = cart.find(item => item.id === id);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...item, quantity: 1 });
    }
    
    saveCart();
    updateCartCount();
    
    // Show added animation
    const addedItem = document.querySelector(`.add-to-cart[data-id="${id}"]`);
    addedItem.innerHTML = '<i class="fas fa-check"></i>';
    setTimeout(() => {
        addedItem.innerHTML = '<i class="fas fa-plus"></i>';
    }, 1000);
}

// Remove item from cart
function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    saveCart();
    updateCartCount();
    renderCartItems();
}

// Update item quantity
function updateQuantity(id, change) {
    const item = cart.find(item => item.id === id);
    if (!item) return;
    
    item.quantity += change;
    
    if (item.quantity < 1) {
        removeFromCart(id);
    } else {
        saveCart();
        renderCartItems();
        updateCartCount();
    }
}

// Save cart to localStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Toggle cart modal
function toggleCart() {
    cartModal.classList.toggle('open');
    overlay.classList.toggle('active');
    
    if (cartModal.classList.contains('open')) {
        renderCartItems();
    }
}

// Setup event listeners
function setupEventListeners() {
    // Add to cart buttons
    document.addEventListener('click', (e) => {
        if (e.target.closest('.add-to-cart')) {
            const id = parseInt(e.target.closest('.add-to-cart').dataset.id);
            addToCart(id);
        }
        
        // Quantity buttons in cart
        if (e.target.closest('.minus')) {
            const id = parseInt(e.target.closest('.minus').dataset.id);
            updateQuantity(id, -1);
        }
        
        if (e.target.closest('.plus')) {
            const id = parseInt(e.target.closest('.plus').dataset.id);
            updateQuantity(id, 1);
        }
        
        // Remove item buttons
        if (e.target.closest('.remove-item')) {
            const id = parseInt(e.target.closest('.remove-item').dataset.id);
            removeFromCart(id);
        }
    });
    
    // Cart icon click
    cartIcon.addEventListener('click', toggleCart);
    
    // Close cart
    closeCart.addEventListener('click', toggleCart);
    overlay.addEventListener('click', toggleCart);
    
    // Tab buttons
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterMenu(btn.dataset.category);
        });
    });
    
    // Checkout button
    checkoutBtn.addEventListener('click', () => {
        if (cart.length === 0) return;
        alert('Order placed successfully!');
        cart = [];
        saveCart();
        updateCartCount();
        toggleCart();
    });
}

// Initialize the app
init();
