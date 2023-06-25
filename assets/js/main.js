const productsContainer = document.querySelector(".products-container");
const btnTodos = document.querySelectorAll(".btn-Todos");
const btnCategories = document.querySelectorAll(".btn-categories");
const btnCategoriesFilter = document.querySelectorAll(".btn-categories button");
const cartLabel = document.querySelector(".cart-label");
const cartShopping = document.querySelector(".cart-shopping");
const cartShoppingContainer = document.querySelector(
  ".cart-shopping-container"
);
const cartBubble = document.querySelector(".cart-bubble");
const cartFooter = document.querySelector(".cart-footer");
const cartTotal = document.querySelector(".cart-footer-total");
const cartComprar = document.querySelector(".cart-footer-add");
const cartEliminar = document.querySelector(".cart-footer-eliminar");
const modal = document.querySelector(".add-modal");
const modalMsj = document.querySelector(".modale-body");
const MenuNavbar = document.querySelector(".toggle-menu");
const navbarlist = document.querySelector(".navbarlist");
const overlay = document.querySelector(".overlay");

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
                
              </div>
            </div>
          </div>
  
  `;
};

//renderizar products
const renderProducts = () => {
  productsContainer.innerHTML = productsData.map(createProductsCards).join("");
};

const filterProducts = () => {
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
    });
  });
};

// Activar el botón seleccionado y desactivar los demás
// const btnFilter = () => {
//   btnCategories.forEach((button) => {
//     button.addEventListener("click", () => {

//       btnCategories.forEach((btn) =>
//         btn.classList.remove("Active-btn-categories")
//       );

//       button.classList.add("Active-btn-categories");
//     });
//   });
// };

const createCartProductTemplate = (cartProduct) => {
  const { id, name, precio, cardimg, cantidad, marca } = cartProduct;
  return `
    <div  class="cart-shopping-item">
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
  if (navbarlist.classList.contains("open-Navbar")) {
    navbarlist.classList.remove("open-Navbar");
    return;
  }
  overlay.classList.toggle("show-overlay");
};
/*navbar* */
const toggleMenu = () => {
  navbarlist.classList.toggle("open-Navbar");
  if (cartShopping.classList.contains("open-cart")) {
    cartShopping.classList.remove("open-cart");
    return;
  }
  overlay.classList.toggle("show-overlay");
};
//cerrar carrito/menu al hacer click en overlay
const closeOnOverlayClick = () => {
  navbarlist.classList.remove("open-Navbar");
  cartShopping.classList.remove("open-cart");
  overlay.classList.toggle("show-overlay");
};
const closeOnClick = (e) => {
  if (!e.target.classList.contains("navbar-link")) {
    return;
  }
  navbarlist.classList.remove("open-Navbar");
  overlay.classList.remove("show-overlay");
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

//destructuracion
const createProductData = (product) => {
  const { id, name, precio, cardimg, categorymarca } = product;
  return { id, name, precio, cardimg, categorymarca };
};

//crear prodcuto carrito
const createCartProduct = (product) => {
  cart = [
    ...cart,
    {
      ...product,
      cantidad: 1,
    },
  ];
  showSuccessModal("El producto se agregó correctamente", 0);
};

//agregar producto al carrito
const agregarCarrito = (e) => {
  try {
    if (!e.target.classList.contains("card-products-agregar")) {
      return;
    }
    const product = createProductData(e.target.dataset);

    if (existId(product.id)) {
      showSuccessModal(
        "El auto seleccionado ya se encuentra en el carrito",
        -1
      );
      return;
    }
    createCartProduct(product);
    updateCartState();
  } catch (error) {
    showSuccessModal(error);
  }
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
    showSuccessModal(error, -1);
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
    //Eliminar producto

    if (
      window.confirm(
        `¿Desea eliminar el auto : "${existingCartProduct.categorymarca} ${existingCartProduct.name}" del carrito?`
      )
    ) {
      removeProductFromCart(existingCartProduct);
    }
    return 0;
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
    showSuccessModal(error, -1);
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
  renderCartFooter();
  showCartTotal();
  // btnFilter();
  // filterProducts();
};

//burbuja carrito
const renderCartBubble = () => {
  return (cartBubble.textContent = cart.length);
};
//footer carrito
const renderCartFooter = () => {
  if (cart.length === 0) {
    cartFooter.classList.add("hidden");
  } else {
    cartFooter.classList.remove("hidden");
  }
};
//Calculo de compra
const getCartTotal = () => {
  return cart.reduce((acc, val) => {
    return acc + Number(val.precio) * Number(val.cantidad);
  }, 0);
};

//total de compra
const showCartTotal = () => {
  if (cart.length === 0) {
    return;
  }
  cartTotal.innerHTML = `U$D ${getCartTotal()} `;
};

const resetCartItem = () => {
  cart = [];
  updateCartState();
};

const completeCartAction = (confirmMsg, successMsg) => {
  if (!cart.length) return;

  if (window.confirm(confirmMsg)) {
    resetCartItem();
    showSuccessModal(successMsg, 0);
  }
};

const completeBuy = () => {
  completeCartAction("¿Desea completar su compra?", "¡Gracias por su compra!");
};

const deleteCart = () => {
  completeCartAction("¿Desea vaciar el carrito?");
  showSuccessModal("No hay productos en el carrito", -1);
};
//modal
const showSuccessModal = (msg, SuccError) => {
  if (SuccError === 0) {
    modal.classList.add("active-modal");
    modal.classList.remove("error");
    modal.classList.add("success");
    modalMsj.textContent = msg;
  } else {
    modal.classList.add("active-modal");
    modal.classList.remove("success");
    modal.classList.add("error");
    modalMsj.textContent = msg;
  }

  setTimeout(() => {
    modal.classList.remove("active-modal");
  }, 2000);
};

const init = () => {
  renderProducts();
  cartLabel.addEventListener("click", toggleCart); //toggle carrito
  document.addEventListener("DOMContentLoaded", renderCarrito); //carrito
  document.addEventListener("DOMContentLoaded", filterProducts);
  // document.addEventListener("DOMContentLoaded", btnFilter);
  productsContainer.addEventListener("click", agregarCarrito);
  cartShoppingContainer.addEventListener("click", handleQuantity);
  renderCartBubble();
  renderCartFooter();
  document.addEventListener("DOMContentLoaded", showCartTotal);
  cartComprar.addEventListener("click", completeBuy);
  cartEliminar.addEventListener("click", deleteCart);
  MenuNavbar.addEventListener("click", toggleMenu);
  overlay.addEventListener("click", closeOnOverlayClick);
  navbarlist.addEventListener("click", closeOnClick);
};
init();
