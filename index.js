
let cart = []; // Store items in the cart

// Function to add item to the cart
function addItemToCart(itemName, itemPrice) {
    const item = cart.find(cartItem => cartItem.name === itemName);

    if (item) {
        item.quantity++;
    } else {
        cart.push({ name: itemName, price: itemPrice, quantity: 1 });
    }
    updateCartDisplay();
}

// Function to remove item from the cart
function removeItemFromCart(itemName) {
    cart = cart.filter(cartItem => cartItem.name !== itemName);
    updateCartDisplay();
}

// Function to update item quantity
function updateItemQuantity(itemName, newQuantity) {
    const item = cart.find(cartItem => cartItem.name === itemName);
    if (item && newQuantity > 0) {
        item.quantity = newQuantity;
    } else {
        removeItemFromCart(itemName);
    }
    updateCartDisplay();
}

// Calculate total price
function calculateTotalPrice() {
    return cart.reduce((total, cartItem) => total + cartItem.price * cartItem.quantity, 0);
}

// Update the cart display and total price
function updateCartDisplay() {
    const cartContainer = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');

    cartContainer.innerHTML = ''; // Clear current cart display

    if (cart.length === 0) {
        cartContainer.innerHTML = '<p>Your cart is empty.</p>';
    } else {
        cart.forEach(cartItem => {
            const cartRow = document.createElement('div');
            cartRow.classList.add('cart-item');

            cartRow.innerHTML = `
                <span>${cartItem.name}</span>
                <input type="number" min="1" value="${cartItem.quantity}" class="cart-quantity" onchange="updateItemQuantity('${cartItem.name}', this.value)">
                <span>$${(cartItem.price * cartItem.quantity).toFixed(2)}</span>
                <button onclick="removeItemFromCart('${cartItem.name}')">Remove</button>
            `;
            cartContainer.appendChild(cartRow);
        });
    }

    totalPriceElement.innerText = `Total: $${calculateTotalPrice().toFixed(2)}`;
}

// Checkout process - navigate to order summary page
function checkout() {
    window.location.href = "#order-summary"; // Navigate to the order summary section
    updateOrderSummary();
}

// Function to update the order summary section
function updateOrderSummary() {
    const orderSummaryContainer = document.getElementById('order-summary-items');
    const totalPriceSummaryElement = document.getElementById('summary-total-price');

    orderSummaryContainer.innerHTML = ''; // Clear order summary display

    cart.forEach(cartItem => {
        const orderRow = document.createElement('div');
        orderRow.classList.add('order-summary-item');

        orderRow.innerHTML = `
            <span>${cartItem.name} (x${cartItem.quantity})</span>
            <span>$${(cartItem.price * cartItem.quantity).toFixed(2)}</span>
        `;
        orderSummaryContainer.appendChild(orderRow);
    });

    totalPriceSummaryElement.innerText = `Total: $${calculateTotalPrice().toFixed(2)}`;
}

// Validate form before confirming order
function validateOrderForm() {
    const address = document.getElementById('address').value;
    const phoneNumber = document.getElementById('phone-number').value;
    const errorMessage = document.getElementById('error-message');

    if (address === "" || phoneNumber === "") {
        errorMessage.innerText = "Please fill in all required fields.";
        return false;
    } else if (!/^\d{10}$/.test(phoneNumber)) {
        errorMessage.innerText = "Please enter a valid 10-digit phone number.";
        return false;
    } else {
        errorMessage.innerText = ""; // Clear any previous error message
        alert("Order confirmed! Thank you for your purchase.");
        return true;
    }
}


