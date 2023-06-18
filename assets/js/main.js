const productsContainer = document.querySelector(".products-container");
const btnTodos = document.querySelectorAll(".btn-Todos");
const btnCategories = document.querySelectorAll(".btn-categories");
const cartLabel = document.querySelector(".cart-label");
const cartShopping = document.querySelector(".cart-shopping");
const cartShoppingContainer = document.querySelector(
  ".cart-shopping-container"
);
const cartBubble = document.querySelector(".cart-bubble");
// const BtnProductsAgregar = document.querySelector(".card-products-agregar");
// console.dir(BtnProductsAgregar);

let cart = JSON.parse(localStorage.getItem("cart")) || [];
console.log(cart);

const saveCart = () => {
  localStorage.setItem("cart", JSON.stringify(cart));
};
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
                <p>U$D ${Precio}</p>
              </div>
              <div class="card-products-carrito">
                <button 
                class="card-products-agregar" 
                 data-categoryMarca="${Marca}"
                data-id="${id}"
                data-name="${name}" 
                data-Precio="${Precio}"
                 data-cardImg="${cardImg}">Agregar</button>
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
  const { id, name, precio, cardimg, cantidad, marca } = cartProduct;
  return `
    <div class="cart-shopping-item">
              <div class="cart-shopping-detail">
                <img
                  src="${cardimg}"
                  alt="${name}"
                />
                <div class="cart-shopping-precio">
                  <span>${name}</span>
                  <p>U$D ${precio}  </p>
                </div>
              </div>

              <div class="cart-shopping-detail">
                <div class="cart-shopping-control">
                  <span class="cart-control down" data-id=${id}>-</span>
                  <span class="cart-control">${cantidad}</span>
                  <span class="cart-control up" data-id=${id}>+</span>
                  <span class="hidden"> ${marca}</span>
                </div>
          </div>
    </div>
	`;
};

/*carrito* */
const toggleCart = () => {
  cartShopping.classList.toggle("open-cart");
};

//Renderizar Carrito
const renderCarrito = () => {
  if (!cart.length) {
    cartShoppingContainer.innerHTML = `<p class="empty-msg">No hay productos en el carrito.</p>`;
    return;
  }
  cartShoppingContainer.innerHTML = cart
    .map(createCartProductTemplate)
    .join("");
};

//Validar si existe el auto seleccionado en el carrito
const existId = (id) => {
  return cart.find((item) => {
    return item.id === id;
  });
};

const createProductData = (product) => {
  const { id, name, precio, cardimg, categorymarca } = product;
  return { id, name, precio, cardimg, categorymarca };
};
const createCartProduct = (product) => {
  cart = [
    ...cart,
    {
      ...product,
      cantidad: 1,
    },
  ];
};

const agregarCarrito = (e) => {
  debugger;
  if (!e.target.classList.contains("card-products-agregar")) {
    return;
  }
  const product = createProductData(e.target.dataset);

  if (existId(product.id)) {
    alert("El auto seleccionado ya se encuentra en el carrito");
    return;
  }
  createCartProduct(product);
  updateCartState();

  // console.log(cart);
};

//aumentar cantidad al carrito
const addUnitToProduct = (idproduct) => {
  try {
    cart = cart.map((idCar) => {
      if (idCar.id === idproduct) {
        idCar.cantidad++;
      }
      return idCar;
    });
  } catch (error) {
    alert(error);
  }
};

//filtrar producto eliminado
const removeProductFromCart = (existingProduct) => {
  cart = cart.filter((product) => {
    return product.id !== existingProduct.id;
  });
  updateCartState();
};
//eliminar producto del carrito
const eliminarCartProduct = (idproduct) => {
  const existingCartProduct = cart.find((item) => item.id === idproduct);

  if (existingCartProduct.cantidad === 1) {
    debugger;
    //Eliminar producto

    if (
      window.confirm(
        `¿Desea eliminar el auto : "${existingCartProduct.categorymarca} ${existingCartProduct.name}" del carrito?`
      )
    ) {
      removeProductFromCart(existingCartProduct);
    }
    return;
  }
};
//reducir cantidad al carrito
const reduccUnitToProduct = (idproduct) => {
  try {
    if (eliminarCartProduct(idproduct) == 0) {
      return;
    }
    cart = cart.map((idCar) => {
      if (idCar.id === idproduct) {
        idCar.cantidad--;
      }
      return idCar;
    });
  } catch (error) {
    alert(error);
  }
};

//cantidades carrito
const handleQuantity = (e) => {
  if (e.target.classList.contains("down")) {
    reduccUnitToProduct(e.target.dataset.id);
  } else if (e.target.classList.contains("up")) {
    addUnitToProduct(e.target.dataset.id);
  }

  updateCartState();
};

//refrescar todo
const updateCartState = () => {
  saveCart();
  renderCarrito();
  renderCartBubble();
};

//burbuja carrito
const renderCartBubble = () => {
  cartBubble.textContent = cart.length;
};
const init = () => {
  renderProducts();
  cartLabel.addEventListener("click", toggleCart); //toggle carrito
  document.addEventListener("DOMContentLoaded", renderCarrito); //carrito
  productsContainer.addEventListener("click", agregarCarrito);
  cartShoppingContainer.addEventListener("click", handleQuantity);
  renderCartBubble();
};
init();
