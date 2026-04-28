const CART_KEY = "pandaPrintCart";

function getCart() {
  return JSON.parse(localStorage.getItem(CART_KEY)) || [];
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

function addToCart(product) {
  const cart = getCart();

  const existingItem = cart.find(item => item.id === product.id);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1
    });
  }

  saveCart(cart);
  alert(`${product.name} added to cart`);
}

function updateQuantity(productId, quantity) {
  let cart = getCart();

  cart = cart.map(item => {
    if (item.id === productId) {
      return { ...item, quantity: quantity };
    }
    return item;
  });

  cart = cart.filter(item => item.quantity > 0);
  saveCart(cart);
  renderCart();
}

function removeFromCart(productId) {
  const cart = getCart().filter(item => item.id !== productId);
  saveCart(cart);
  renderCart();
}

function renderCart() {
  const cartContainer = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");

  if (!cartContainer || !cartTotal) return;

  const cart = getCart();

  if (cart.length === 0) {
    cartContainer.innerHTML = `<p class="empty-cart">Your cart is empty.</p>`;
    cartTotal.innerHTML = "$0.00";
    return;
  }

  let total = 0;

  cartContainer.innerHTML = cart.map(item => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;

    return `
      <div class="cart-item">
        <img src="${item.image}" alt="${item.name}">

        <div class="cart-info">
          <h3>${item.name}</h3>
          <p>$${item.price.toFixed(2)}</p>

          <div class="cart-actions">
            <button onclick="updateQuantity('${item.id}', ${item.quantity - 1})">−</button>
            <span>${item.quantity}</span>
            <button onclick="updateQuantity('${item.id}', ${item.quantity + 1})">+</button>
          </div>
        </div>

        <div class="cart-right">
          <strong>$${itemTotal.toFixed(2)}</strong>
          <button class="remove-btn" onclick="removeFromCart('${item.id}')">Remove</button>
        </div>
      </div>
    `;
  }).join("");

  cartTotal.innerHTML = `$${total.toFixed(2)}`;
}

document.addEventListener("DOMContentLoaded", renderCart);