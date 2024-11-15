// URUNLERI API DEN ALAN FONKSIYON
export const fetchProducts = async () => {
  try {
    const response = await fetch("db.json");

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    return await response.json();
  } catch (error) {
    console.log("Error fetching data:", error);
    return [];
  }
};

export const renderProducts = (products, addToCartCallBack) => {
  const productList = document.querySelector("#product-list");
  productList.innerHTML = products
    .map(
      (product) =>
        `<div class="product">
                <img src="${product.image}" alt="product-img" class="product-img">
                <div class="product-info">
                    <h3 class="product-title">${product.title}</h3>
                    <p class="product-price">$${product.price}</p>
                    <a  class="add-to-cart" data-id="${product.id}">Add to cart</a>
                </div>
            </div>`
    )
    .join("");
  // products bir dizi oldugu icin aralara virgul yansitti. elemanlar arasi bosluk olsun demek icin join metodu kullandim.

  // add-to-cart butonunu calistirma
  const addToCartButtons = document.getElementsByClassName("add-to-cart");
  for (let i = 0; i < addToCartButtons.length; i++) {
    // herbir butonu ayri ayri secmek icin bunu yapiyorum
    const addToCartButton = addToCartButtons[i];
    addToCartButton.addEventListener("click", addToCartCallBack);
  }
};
