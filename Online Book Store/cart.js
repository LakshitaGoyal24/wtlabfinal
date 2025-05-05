// cart.js

// Sample books to display


// Initialize cart
function getCookie(name) {
    let cookieArr = document.cookie.split(";");
    for (let i = 0; i < cookieArr.length; i++) {
        let cookie = cookieArr[i].trim();
        if (cookie.indexOf(name + "=") === 0) {
            return cookie.substring(name.length + 1, cookie.length);
        }
    }
    return null;
}
function setCookie(name, value, days) {
    const d = new Date();
    d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000)); // Set expiration in days
    const expires = "expires=" + d.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}
let cart = JSON.parse(getCookie('cart')) || [];



// Function to display books
function displayBooks() {
    const booksDiv = document.getElementById('cart-items');
    booksDiv.innerHTML=''
    cart.forEach(book => {
        const bookDiv = document.createElement('div');
        bookDiv.classList.add('book');
        bookDiv.innerHTML = `
            <div class="d-flex align-items-center mb-3 border-black border-2 rounded-3 bg-light-subtle p-3 shadow-sm position-relative">
    <!-- Image on the left -->
    <img src="${book.image}" alt="${book.title}" class="img-fluid" style="width: 150px; height: 150px; object-fit: cover; margin-right: 15px;">
    
    <!-- Book details on the right -->
    <div class="d-flex flex-column justify-content-between" style="flex: 1;">
        <p class="m-0"><strong>${book.title}</strong></p>
        <p class="m-0">Price: $${book.price}</p>
    </div>
    
    <!-- Remove button at bottom right -->
    <div style="flex-shrink: 0;">
        <button onclick="removeFromCart('${book.title}')" class="btn btn-close-white btn-sm fs-5" style="position: absolute; top: 5px; right: 5px;">x</button>
        <div class="h-50">
                <button onclick="decrement('${book.title}')" class="btn btn-dark px-2 py-0">-</button>
                <span class="text-sencondary fs-6">${book.qty}</span>
                <button onclick="addToCart(1, '${book.title}', '${book.author}', '${book.description}', ${book.price}, '${book.image}')" class="btn btn-secondary px-2 py-0">+</button>
                </div>
    </div>
</div>
        `;
        booksDiv.appendChild(bookDiv);
    });
    const cartTotalItems = document.getElementById('cart-total-items');
    const cartTotalPrice = document.getElementById('cart-total-price');
    cartTotalItems.textContent = `Total Items: ${cart.reduce((sum, item) => sum + Number(item.qty), 0)}`;
    cartTotalPrice.textContent = `Total Price: $${cart.reduce((sum, item) => sum + Number(item.price)*Number(item.qty), 0).toFixed(2)}`;
}

// Function to add book to cart
function removeFromCart(title) {
    cart = cart.filter(item => item.title !== title);
    setCookie('cart', JSON.stringify(cart), 7);
    displayBooks();
}

function decrement(title) {
    if(cart[cart.findIndex(item=>item.title==title)].qty>=2){
        cart[cart.findIndex(item=>item.title==title)].qty-=1
    }else{
    cart = cart.filter(item => item.title !== title);
    }
    setCookie('cart', JSON.stringify(cart), 7); // Update the cart cookie
    displayBooks();
}
function addToCart(qty, title, author, description, price, image) {
    const book = { qty, title, author, description, price, image };
    cart[cart.findIndex(item=>item.title==title)].qty+=1;
    
    setCookie('cart', JSON.stringify(cart), 7); // Store the cart in a cookie that expires in 7 days
    displayBooks()
}

// Function to update the cart display
function updateCart() {
    const cartList = document.getElementById('cart');
    cartList.innerHTML = ''; // Clear the current cart
    cart.forEach(item => {
        const listItem = document.createElement('li');
        listItem.textContent = `${item.title} - $${item.price}`;
        cartList.appendChild(listItem);
    });
    document.getElementById('total-items').textContent = cart.length;
}
function clearCart() {
    cart = [];
    setCookie('cart', JSON.stringify(cart), 7); // Clear the cart cookie
    displayBooks();
}

// Display books when the page loads
window.onload = function() {
    displayBooks();
};
