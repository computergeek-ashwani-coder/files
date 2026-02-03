
let cart = [];
let currentPage = 'home';

function showPage(page) {
    // Hide all pages
    document.querySelectorAll('.page-container').forEach(p => p.classList.remove('active'));
    
    // Show selected page
    const pageMap = {
        'home': 'homePage',
        'categories': 'categoriesPage',
        'bouquets': 'bouquetsPage',
        'teddy': 'teddyPage',
        'hampers': 'hampersPage',
        'cards': 'cardsPage',
        'contact': 'contactPage'
    };
    
    const pageId = pageMap[page];
    if (pageId) {
        document.getElementById(pageId).classList.add('active');
        currentPage = page;
        
        // Close mobile menu if open
        const navLinks = document.getElementById('navLinks');
        navLinks.classList.remove('active');
        
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

function toggleMobileMenu() {
    const navLinks = document.getElementById('navLinks');
    navLinks.classList.toggle('active');
}

function toggleCart() {
    const sidebar = document.getElementById('cartSidebar');
    sidebar.classList.toggle('active');
}

function addToCart(event, name, price, icon) {
    event.stopPropagation();

    const existingItem = cart.find(item => item.name === name);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ name, price, icon, quantity: 1 });
    }

    updateCart();

    const button = event.target;
    const originalText = button.textContent;
    const originalBg = button.style.background;

    button.textContent = 'Added! ✓';
    button.style.background = '#4CAF50';

    setTimeout(() => {
        button.textContent = originalText;
        button.style.background = originalBg;
    }, 1000);

    const cartCount = document.getElementById('cartCount');
    cartCount.style.animation = 'none';
    setTimeout(() => {
        cartCount.style.animation = 'cartBounce 0.5s ease';
    }, 10);
}


function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}

function updateCart() {
    const cartCount = document.getElementById('cartCount');
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    const totalPrice = document.getElementById('totalPrice');
    
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
    
    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="empty-cart">
                <div class="empty-cart-icon">🛒</div>
                <p>Your cart is empty</p>
            </div>
        `;
        cartTotal.style.display = 'none';
    } else {
        cartItems.innerHTML = cart.map((item, index) => `
            <div class="cart-item">
                <div class="cart-item-icon">${item.icon}</div>
                <div class="cart-item-details">
                    <h4>${item.name}</h4>
                    <p class="cart-item-price">${item.price === 0 ? 'Contact for price' : '₹' + item.price.toLocaleString()} × ${item.quantity}</p>
                </div>
                <button class="remove-item" onclick="removeFromCart(${index})" title="Remove item">🗑️</button>
            </div>
        `).join('');
        
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        totalPrice.textContent = total === 0 ? 'Contact for price' : `₹${total.toLocaleString()}`;
        cartTotal.style.display = 'block';
    }
}

function checkout() {
    if (cart.length === 0) {
        alert('Your cart is empty! Please add items first.');
        return;
    }

    let message = '🛍️ *New Valentine Order* %0A%0A';

    cart.forEach((item, index) => {
        message += `${index + 1}. ${item.name}%0A`;
        message += `   Quantity: ${item.quantity}%0A`;
        message += `   Price: ${item.price === 0 ? 'Contact for price' : '₹' + item.price}%0A%0A`;
    });

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    message += `*Total:* ${total === 0 ? 'Contact for price' : '₹' + total}`;

    // 🔴 Replace with your WhatsApp number
    const phoneNumber = '916205719857';

    const whatsappURL = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappURL, '_blank');
}


// Close mobile menu when clicking outside
document.addEventListener('click', function(event) {
    const navLinks = document.getElementById('navLinks');
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    
    if (navLinks && navLinks.classList.contains('active')) {
        if (!navLinks.contains(event.target) && !mobileToggle.contains(event.target)) {
            navLinks.classList.remove('active');
        }
    }
});

// Close cart when clicking outside
document.addEventListener('click', function(event) {
    const cartSidebar = document.getElementById('cartSidebar');
    const cartIcon = document.querySelector('.cart-icon');
    
    if (cartSidebar && cartSidebar.classList.contains('active')) {
        if (!cartSidebar.contains(event.target) && !cartIcon.contains(event.target)) {
            cartSidebar.classList.remove('active');
        }
    }
});

// Smooth scroll behavior for all links
document.addEventListener('DOMContentLoaded', function() {
    // Add loading animation to images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
    });
});

// Add entrance animations on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all product cards for scroll animations
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.product-card');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
});

