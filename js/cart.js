// sepete ekleme yapacak fonksiyon
import {
  getFromLocalStorage,
  saveToLocalStorage,
  calculateCartTotal,
  updateCartIcon,
  /* cartItemPriceTotal, */
} from "./utils.js";

let cart = getFromLocalStorage();
//sepete urun ekleyen fonksiyon
export const addToCart = (event, products) => {
  //tiklanan urunun id sine eris
  const productId = parseInt(event.target.dataset.id);
  // bu id ye ait baska urun var mi
  const product = products.find((product) => product.id === productId);
  if (product) {
    // eger urun varsa bunu bul
    const exitingItem = cart.find((item) => item.id === productId);
    // miktarini bir arttir
    if (exitingItem) {
      exitingItem.quantity++;
      saveToLocalStorage(cart);
      updateCartIcon(cart);
    
    } else {
      const cartItem = {
        // sepete eklenecek objeyi olustur
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        quantity: 1,
      };
      // olusturulan cartItem i sepete ekle
      cart.push(cartItem);
      // tiklayinca added yazsin
      event.target.textContent = "Added";
      // localStorage i guncelle
      saveToLocalStorage(cart);
      updateCartIcon(cart);
    }
  }
};
const removeFromCart = (event) => {
  const productId = parseInt(event.target.dataset.id);
  cart = cart.filter((item) => item.id !== productId);
  saveToLocalStorage(cart);
  renderCartItems();
  displayCartTotal();
  updateCartIcon(cart);
};

export const renderCartItems = () => {
  const cartItemsElement = document.querySelector(".cart-data");
  cartItemsElement.innerHTML = cart
    .map(
      (item) =>
        `<div class="cart-item">
        <img src="${item.image}" alt="">
        <div class="cart-item-info">
        <h2>${item.title}</h2>
        <input type="number" min="1" value="${item.quantity}" class="cart-item-quantity" data-id="${item.id}">
    </div>
    <h2 class="cart-item-price">$${item.price}</h2>
    <button class="remove-from-cart" data-id="${item.id}">Remove</button>
    </div>`
    )
    .join("");

  const removeButtons = document.querySelectorAll(".remove-from-cart");
  for (let i = 0; i < removeButtons.length; i++) {
    const removeButton = removeButtons[i];
    removeButton.addEventListener("click", removeFromCart);
  }

  const quantityInputs = document.querySelectorAll(".cart-item-quantity");
  for (let i = 0; i < quantityInputs.length; i++) {
    const quantityInput = quantityInputs[i];
    quantityInput.addEventListener("change", onQuantityChange);
  }
};

const onQuantityChange = (event) => {
  const newQuantity = +event.target.value;
  const productId = +event.target.dataset.id;

  if (newQuantity > 0) {
    const cartItem = cart.find((item) => item.id === productId);
    if (!cartItem) return;
    cartItem.quantity = newQuantity;
    saveToLocalStorage(cart);
    /* displayItemTotal(); */
    displayCartTotal();  
    updateCartIcon(cart);
}
};

export const displayCartTotal = () => {
  document.querySelector(
    "#cart-total"
  ).textContent = `Total: $${calculateCartTotal(cart).toFixed(2)}`;
};

/* const displayItemTotal =(cart)=>{
    document.querySelectorAll(".cart-item-price").textContent = `$${cartItemPriceTotal(cart).toFixed(2)}`;
} */
