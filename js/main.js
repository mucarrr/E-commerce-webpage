import { addToCart, renderCartItems, displayCartTotal } from "./cart.js";
import { fetchProducts, renderProducts } from "./product.js";
import { getFromLocalStorage,  updateCartIcon } from "./utils.js";

// TOGGLE MENU ICONU
document.getElementById("menu-icon").addEventListener("click", () => {
  document.querySelector(".navbar").classList.toggle("open-menu");
});

/* if(window.location.pathname.includes("cart.html")){
    console.log("cart sayfasi");
}else{
    console.log("anasayfa");
} */

//APIDEN ALINAN VERILERI CEKEN FONKSIYON
document.addEventListener("DOMContentLoaded", async () => {

  let cart = getFromLocalStorage();
  if (window.location.pathname.includes("cart.html")) {
    console.log("cart sayfasi");
    renderCartItems();
    displayCartTotal();
  } else {
    console.log("anasayfa");
    const product = await fetchProducts();
    renderProducts(product, (event) => {
    addToCart(event, product);
    });
  }
  updateCartIcon(cart);
});


