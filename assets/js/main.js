const productsContainer = document.querySelector(".products-container");
const btnTodos = document.querySelectorAll(".btn-Todos");
const btnCategories = document.querySelectorAll(".btn-categories");
const cartLabel = document.querySelector(".cart-label");
const cartShopping = document.querySelector(".cart-shopping");
const cartShoppingContainer = document.querySelector(
  ".cart-shopping-container"
);
const BtnProductsAgregar = document.querySelector(".card-products-agregar");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

//crear cards products
const createProductsCards = (product) => {
  const { id, name, Precio, Color, Marca, cardImg } = product;

  return `

  <div class="card-products">
            <img src="${cardImg}" alt="${name}" />
            <div class="card-products-info">
              <div class="card-products-marca">
                <h4>${Marca}</h4>
                <h4>${name}</h4>
              </div>
              <div class="card-products-color">
                <h4>Color</h4>
                <p>${Color}</p>
              </div>
              <div class="card-products-precio">
                <h4>Precio</h4>
                <p>$${Precio}</p>
              </div>
              <div class="card-products-carrito">
                <button data-categoryMarca="${Marca}"
                data-id="${id}"
                data-name="${name}" 
                data-precio="${Precio}"
                 data-img="${cardImg}">Agregar</button>
                <i class="fa-solid fa-cart-shopping cart-icon"></i>
              </div>
            </div>
          </div>
  
  `;
};

//renderizar products
const renderProducts = () => {
  productsContainer.innerHTML = productsData.map(createProductsCards).join("");
};

//filtrar products
btnCategories.forEach((button) => {
  button.addEventListener("click", (event) => {
    // Obtener la categoría seleccionada
    const category = event.target.dataset.categorymarca;

    if (category === "Todos") {
      renderProducts();
      return;
    } else {
      // Filtrar el array según la categoría seleccionada
      const filteredArray = productsData.filter(
        (product) => product.Marca === category
      );

      // Renderizar las tarjetas filtradas en el contenedor
      productsContainer.innerHTML = filteredArray
        .map(createProductsCards)
        .join("");
    }
    // const categoryActive = event.target;
    // categoryActive.classList.remove("Active-btn-categories");
    // categoryActive.classList.add("Active-btn-categories");
  });
});

// Activar el botón seleccionado y desactivar los demás
btnCategories.forEach((button) => {
  button.addEventListener("click", (event) => {
    // Desactivar todos los botones
    btnCategories.forEach((btn) =>
      btn.classList.remove("Active-btn-categories")
    );

    // Activar el botón en el que se ha hecho clic
    event.target.classList.add("Active-btn-categories");
  });
});

const createCartProductTemplate = (cartProduct) => {
  const { id, name, Precio, Color, Marca, cardImg } = cartProduct;
  return `
    <div class="cart-shopping-item">
              <div class="cart-shopping-detail">
                <img
                  src="${cardImg}"
                  alt="${name}"
                />
                <div class="cart-shopping-precio">
                  <span>${name}</span>
                  <p>${Precio}</p>
                </div>
              </div>

              <div class="cart-shopping-detail">
                <div class="cart-shopping-control">
                  <span class="cart-control down">-</span>
                  <span class="cart-control">1</span>
                  <span class="cart-control up">+</span>
                </div>
          </div>
    </div>
	`;
};

/*carrito* */
const toggleCart = () => {
  cartShopping.classList.toggle("open-cart");
};

const renderCarrito = () => {
  if (!cart.length) {
    cartShoppingContainer.innerHTML = `<p class="empty-msg">No hay productos en el carrito.</p>`;
    return;
  }
  cartShoppingContainer.innerHTML = cart
    .map(createCartProductTemplate)
    .join("");
};

const agregarCarrito = () => {
  const auto = event.target.dataset.categorymarca;
  cartShoppingContainer.innerHTML = auto.filter();
};
const init = () => {
  renderProducts();
  cartLabel.addEventListener("click", toggleCart); //toggle carrito
  document.addEventListener("DOMContentLoaded", renderCarrito); //carrito
  BtnProductsAgregar.addEventListener("click", agregarCarrito);
};
init();
