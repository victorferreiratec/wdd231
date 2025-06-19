document.addEventListener('DOMContentLoaded', () => {
    const acaiGrid = document.querySelector('.acai-menu-grid');

    async function fetchAcaiProducts() {
        try {
            const response = await fetch('data/acai.json'); // Caminho para o seu arquivo JSON
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const products = await response.json();
            displayAcaiProducts(products);
        } catch (error) {
            console.error('Error fetching açaí products:', error);
            acaiGrid.innerHTML = '<p>Failed to load açaí menu. Please try again later.</p>';
        }
    }

    function displayAcaiProducts(products) {
        products.forEach(product => {
            const card = document.createElement('div');
            card.classList.add('acai-card');

            card.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <div class="acai-card-content">
                    <h3>${product.name}</h3>
                    <p class="ingredients">${product.ingredients}</p>
                    <p class="price">R$ ${product.price.toFixed(2)}</p>
                    <button class="buy-button">Add to Cart</button>
                </div>
            `;
            acaiGrid.appendChild(card);
        });
    }

    fetchAcaiProducts(); // Chama a função para carregar os produtos quando a página carrega
});

document.addEventListener('DOMContentLoaded', () => {
    const acaiGrid = document.querySelector('.acai-menu-grid');
    const cartIcon = document.getElementById('cartIcon');
    const cartCountSpan = document.getElementById('cart-count');
    const cartModalOverlay = document.getElementById('cartModalOverlay');
    const closeCartBtn = document.getElementById('closeCartBtn');
    const cartItemsContainer = document.getElementById('cartItemsContainer');
    const cartSubtotalSpan = document.getElementById('cartSubtotal');
    const cartTaxSpan = document.getElementById('cartTax');
    const cartTotalSpan = document.getElementById('cartTotal');
    const emptyCartMessage = document.querySelector('.empty-cart-message');
    const checkoutBtn = document.getElementById('checkoutBtn');

    let acaiProducts = [];
    let cart = [];

    const TAX_RATE = 0.05; // 5% tax

    // --- Cart Management Functions ---

    // Loads cart from localStorage
    function loadCartFromLocalStorage() {
        const storedCart = localStorage.getItem('acaiCart');
        if (storedCart) {
            cart = JSON.parse(storedCart);
            updateCartDisplay();
        }
    }

    // Saves cart to localStorage
    function saveCartToLocalStorage() {
        localStorage.setItem('acaiCart', JSON.stringify(cart));
    }

    // Adds an item to the cart
    function addToCart(productId) {
        const product = acaiProducts.find(p => p.id === productId);
        if (!product) return;

        const existingItem = cart.find(item => item.id === productId);

        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({ ...product, quantity: 1 });
        }

        saveCartToLocalStorage();
        updateCartDisplay();
        showCartModal(); // Optional: show cart when adding an item
    }

    // Updates the quantity of an item in the cart
    function updateQuantity(productId, newQuantity) {
        const item = cart.find(item => item.id === productId);
        if (item) {
            item.quantity = Math.max(1, newQuantity); // Ensures minimum quantity is 1
            saveCartToLocalStorage();
            updateCartDisplay();
        }
    }

    // Removes an item from the cart
    function removeItem(productId) {
        cart = cart.filter(item => item.id !== productId);
        saveCartToLocalStorage();
        updateCartDisplay();
    }

    // --- Cart Rendering Functions ---

    function updateCartDisplay() {
        cartCountSpan.textContent = cart.reduce((total, item) => total + item.quantity, 0);
        renderCartItems();
        calculateCartTotals();
    }

    function renderCartItems() {
        cartItemsContainer.innerHTML = ''; // Clears existing items

        if (cart.length === 0) {
            emptyCartMessage.style.display = 'block';
            return;
        } else {
            emptyCartMessage.style.display = 'none';
        }

        cart.forEach(item => {
            const cartItemDiv = document.createElement('div');
            cartItemDiv.classList.add('cart-item');
            cartItemDiv.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-item-details">
                    <h4>${item.name}</h4>
                    <p>$ ${item.price.toFixed(2)}</p>
                    <button class="remove-item-btn" data-id="${item.id}">Remove</button>
                </div>
                <div class="cart-item-quantity">
                    <button class="quantity-btn decrease" data-id="${item.id}">-</button>
                    <input type="number" class="quantity-input" value="${item.quantity}" min="1" data-id="${item.id}">
                    <button class="quantity-btn increase" data-id="${item.id}">+</button>
                </div>
            `;
            cartItemsContainer.appendChild(cartItemDiv);
        });

        // Add event listeners for quantity and remove buttons
        document.querySelectorAll('.quantity-btn.decrease').forEach(button => {
            button.addEventListener('click', (e) => {
                const productId = e.target.dataset.id;
                const input = document.querySelector(`.quantity-input[data-id="${productId}"]`);
                updateQuantity(productId, parseInt(input.value) - 1);
            });
        });

        document.querySelectorAll('.quantity-btn.increase').forEach(button => {
            button.addEventListener('click', (e) => {
                const productId = e.target.dataset.id;
                const input = document.querySelector(`.quantity-input[data-id="${productId}"]`);
                updateQuantity(productId, parseInt(input.value) + 1);
            });
        });

        document.querySelectorAll('.quantity-input').forEach(input => {
            input.addEventListener('change', (e) => {
                const productId = e.target.dataset.id;
                updateQuantity(productId, parseInt(e.target.value));
            });
        });

        document.querySelectorAll('.remove-item-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const productId = e.target.dataset.id;
                removeItem(productId);
            });
        });
    }

    function calculateCartTotals() {
        const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const tax = subtotal * TAX_RATE;
        const total = subtotal + tax;

        cartSubtotalSpan.textContent = `$ ${subtotal.toFixed(2)}`;
        cartTaxSpan.textContent = `$ ${tax.toFixed(2)}`;
        cartTotalSpan.textContent = `$ ${total.toFixed(2)}`;
    }

    // --- Cart Modal Display Functions ---

    function showCartModal() {
        cartModalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // Disable body scroll
    }

    function hideCartModal() {
        cartModalOverlay.classList.remove('active');
        document.body.style.overflow = ''; // Re-enable body scroll
    }

    // --- Global Event Listeners ---

    cartIcon.addEventListener('click', showCartModal);
    closeCartBtn.addEventListener('click', hideCartModal);
    cartModalOverlay.addEventListener('click', (e) => {
        // Close modal if clicking on the overlay (outside modal content)
        if (e.target === cartModalOverlay) {
            hideCartModal();
        }
    });

    checkoutBtn.addEventListener('click', () => {
        if (cart.length > 0) {
            alert('Proceeding to checkout! Your total is: ' + cartTotalSpan.textContent);
            // Here you would integrate with a real payment system
            // For now, let's clear the cart after "checkout"
            cart = [];
            saveCartToLocalStorage();
            updateCartDisplay();
            hideCartModal();
        } else {
            alert('Your cart is empty. Please add some items before checking out.');
        }
    });

    // --- Initialization ---

    // Function to fetch and display açaí products
    async function fetchAcaiProducts() {
        try {
            const response = await fetch('data/acai.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            acaiProducts = await response.json(); // Save products for global use
            displayAcaiProducts(acaiProducts);
        } catch (error) {
            console.error('Error fetching açaí products:', error);
            acaiGrid.innerHTML = '<p>Failed to load açaí menu. Please try again later.</p>';
        }
    }

    function displayAcaiProducts(products) {
        acaiGrid.innerHTML = ''; // Clear before adding
        products.forEach(product => {
            const card = document.createElement('div');
            card.classList.add('acai-card');

            card.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <div class="acai-card-content">
                    <h3>${product.name}</h3>
                    <p class="ingredients">${product.ingredients}</p>
                    <p class="price">$ ${product.price.toFixed(2)}</p>
                    <button class="buy-button" data-id="${product.id}">Add to Cart</button>
                </div>
            `;
            acaiGrid.appendChild(card);
        });

        // Add event listeners to the new "Add to Cart" buttons
        document.querySelectorAll('.buy-button').forEach(button => {
            button.addEventListener('click', (e) => {
                addToCart(e.target.dataset.id);
            });
        });
    }

    // Load products and cart on page load
    fetchAcaiProducts();
    loadCartFromLocalStorage();
});