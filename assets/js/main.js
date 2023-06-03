const productsContainer = document.querySelector(".products-container");
const btnTodos = document.querySelectorAll(".btn-Todos");
const btnCategories = document.querySelectorAll(".btn-categories");

//crear cards products
const createProductsCards = (product) => {
  const { name, Precio, Color, Marca, cardImg } = product;

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
                <button data-categoryMarca="${Marca}">Agregar</button>
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
const init = () => {
  renderProducts();
};
init();
