// Task 3: cart badge and mini cart (plain JavaScript)

// N = 31, so one product can be added at most (31 % 4) + 2 = 5 times
const MAX_PER_PRODUCT = 5;

// The cart is an array. Each item looks like { name: "Dark Roast Coffee", price: 16.99 }
let cart = [];

const cartToggle = document.getElementById("cart-toggle");
const cartBadge = document.getElementById("cart-badge");
const miniCart = document.getElementById("mini-cart");
const cartList = document.getElementById("cart-list");
const cartEmpty = document.getElementById("cart-empty");
const cartTotal = document.getElementById("cart-total");
const addButtons = document.querySelectorAll(".product-card .btn");

// Read the product name from a card
function getName(button) {
  return button.closest(".product-card").querySelector(".product-name").textContent.trim();
}

// Read the price from a card: "$13.99" becomes 13.99
function getPrice(button) {
  const text = button.closest(".product-card").querySelector(".product-price").textContent;
  return parseFloat(text.replace("$", ""));
}

// Redraw everything that depends on the cart array
function render() {
  // 1. badge
  cartBadge.textContent = cart.length;
  cartToggle.setAttribute("aria-label", "Cart, " + cart.length + " items");

  // 2. list of items with a Remove button
  cartList.innerHTML = "";
  cart.forEach(function (item, index) {
    const li = document.createElement("li");

    const name = document.createElement("span");
    name.className = "item-name";
    name.textContent = item.name;

    const price = document.createElement("span");
    price.textContent = "$" + item.price.toFixed(2);

    const remove = document.createElement("button");
    remove.type = "button";
    remove.className = "btn btn-sm btn-outline-light";
    remove.textContent = "Remove";
    remove.dataset.index = index;

    li.append(name, price, remove);
    cartList.append(li);
  });

  // 3. empty message
  cartEmpty.hidden = cart.length > 0;

  // 4. total, calculated with reduce()
  const total = cart.reduce(function (sum, item) {
    return sum + item.price;
  }, 0);
  cartTotal.textContent = "$" + total.toFixed(2);

  // 5. limit per product: disable the button when it has been added 5 times
  addButtons.forEach(function (button) {
    const name = getName(button);
    const count = cart.filter(function (item) {
      return item.name === name;
    }).length;

    if (count >= MAX_PER_PRODUCT) {
      button.textContent = "Limit reached";
      button.disabled = true;
    } else {
      button.textContent = "Add to Cart";
      button.disabled = false;
    }
  });
}

// Add to Cart buttons
addButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    cart.push({ name: getName(button), price: getPrice(button) });
    render();
  });
});

// Remove buttons (one listener on the list handles all of them)
cartList.addEventListener("click", function (event) {
  if (event.target.matches("button")) {
    cart.splice(Number(event.target.dataset.index), 1);
    render();
  }
});

// Cart icon opens and closes the mini cart
cartToggle.addEventListener("click", function (event) {
  event.preventDefault(); // stay on the page instead of going to checkout.html
  const isOpen = miniCart.classList.toggle("open");
  cartToggle.setAttribute("aria-expanded", isOpen);
});

render();
