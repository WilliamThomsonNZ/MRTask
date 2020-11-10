"use strict";

//DOM Elements
const sizeBtns = document.getElementById("sizeBtns"),
  sizeIndicator = document.getElementById("size"),
  addToCart = document.getElementById("addToCart"),
  cartItems = document.getElementById("cartItems"),
  cartItemsMobile = document.getElementById("cartItemsMobile"),
  shoppingCart = document.getElementById("shoppingCart"),
  mobileCartBtn = document.getElementById("mobileCartBtn"),
  cartBtn = document.getElementById("cartBtn");

let selectedSize;
let storedCart = [];
let mobileCartOpen = false;
//Show and hide cart when clicked/hover
const showCart = () => {
  shoppingCart.style.display = "block";
  mobileCartOpen = true;
};
const hideCart = () => {
  shoppingCart.style.display = "none";
};

const hideMobileCart = (e) => {
  if (!e.target.classList.contains("mobileCart")) {
    shoppingCart.style.display = "none";
  }
};

cartBtn.addEventListener("mouseover", showCart);
cartBtn.addEventListener("mouseout", hideCart);
mobileCartBtn.addEventListener("click", showCart);
document.addEventListener("click", hideMobileCart);

//Select size
const sizeSelect = (e) => {
  if (e.target.classList.contains("sizingBtn")) {
    selectedSize = e.target.value;
    sizeIndicator.textContent = selectedSize;
  }
};
//Update product count
const updateProductCount = (arr) => {
  if (arr === null) {
    cartItemsMobile.textContent = 1;
    cartItems.textContent = 1;
  } else {
    cartItemsMobile.textContent = arr.length + 1;
    cartItems.textContent = arr.length + 1;
  }
};
let counts = {};

//Add item to local storage
const addItemToStorage = () => {
  const storedItems = JSON.parse(localStorage.getItem("cartItems"));
  if (storedItems) {
    storedCart = [selectedSize, ...storedItems];
    localStorage.setItem("cartItems", JSON.stringify(storedCart));
  } else {
    storedCart.push(selectedSize);
    localStorage.setItem("cartItems", JSON.stringify(selectedSize));
  }

  //Update the counter next to show cart button
  updateProductCount(storedItems);

  //counting products
  storedCart.forEach((product) => {
    counts[product] = (counts[product] || 0) + 1;
  });
  for (const product in counts) {
    createCartItem(product, counts[product]);
  }
  counts = {};
};

//Clear cart before adding more products;
const clearMiniCart = () => {
  shoppingCart.innerHTML = "";
};

//Add to cart
const addItemToCart = () => {
  if (selectedSize) {
    clearMiniCart();
    addItemToStorage();
  } else {
    alert("you must select a size before adding to the cart");
  }
};

//Create element in shoppingCart
const createCartItem = (size, quantity) => {
  const newItem = document.createElement("div");
  newItem.classList.add("product");
  newItem.innerHTML = `<img src="src/classic-tee.jpg" />
          <div class="productInfo">
            <h3>Classic Tee</h3>
            <h3>
              <span id="prodcutAmount">${quantity}</span>
              x
              <strong>$75.00</strong>
            </h3>
            <h3>
              Size:
              <span id="productSize">${size}</span>
            </h3>
          </div>`;
  shoppingCart.appendChild(newItem);
};

sizeBtns.addEventListener("click", sizeSelect);
addToCart.addEventListener("click", addItemToCart);
