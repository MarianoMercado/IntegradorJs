const productsData = [
  {
    id: 1,
    name: "Cruze",
    Precio: 1000000,
    Color: "Blanco",
    Marca: "Chevrolet",
    cardImg: "/assets/imagenes/chevrolet.jpg",
  },
  {
    id: 2,
    name: "Onix",
    Precio: 2000000,
    Color: "Gris",
    Marca: "Chevrolet",
    cardImg: "/assets/imagenes/chevrolet.jpg",
  },
  {
    id: 3,
    name: "Agile",
    Precio: 3000000,
    Color: "Plateado",
    Marca: "Chevrolet",
    cardImg: "/assets/imagenes/chevrolet.jpg",
  },
  {
    id: 4,
    name: "Camaro",
    Precio: 3000000,
    Color: "Rojo",
    Marca: "Chevrolet",
    cardImg: "/assets/imagenes/chevrolet.jpg",
  },
  {
    id: 5,
    name: "Focus",
    Precio: 3000000,
    Color: "Morado",
    Marca: "Ford",
    cardImg: "/assets/imagenes/ford 2.jpg",
  },
  {
    id: 6,
    name: "Falcon",
    Precio: 3000000,
    Color: "Azul",
    Marca: "Ford",
    cardImg: "/assets/imagenes/ford 2.jpg",
  },
  {
    id: 7,
    name: "Fiesta",
    Precio: 3000000,
    Color: "Rojo",
    Marca: "Ford",
    cardImg: "/assets/imagenes/ford 2.jpg",
  },
  {
    id: 8,
    name: "Mustang",
    Precio: 3000000,
    Color: "Gris",
    Marca: "Ford",
    cardImg: "/assets/imagenes/ford 2.jpg",
  },
  {
    id: 9,
    name: "Ranger",
    Precio: 3000000,
    Color: "Negro",
    Marca: "Ford",
    cardImg: "/assets/imagenes/ford 2.jpg",
  },
  {
    id: 10,
    name: "F-150",
    Precio: 3000000,
    Color: "Blanco",
    Marca: "Ford",
    cardImg: "/assets/imagenes/ford 2.jpg",
  },
  {
    id: 11,
    name: "TT",
    Precio: 100000000,
    Color: "Plateado",
    Marca: "Audi",
    cardImg: "/assets/imagenes/audi.jpg",
  },
  {
    id: 12,
    name: "A1",
    Precio: 100000000,
    Color: "Negro",
    Marca: "Audi",
    cardImg: "/assets/imagenes/audi.jpg",
  },
  {
    id: 13,
    name: "A2",
    Precio: 100000000,
    Color: "Blanco",
    Marca: "Audi",
    cardImg: "/assets/imagenes/audi.jpg",
  },
  {
    id: 14,
    name: "A3",
    Precio: 100000000,
    Color: "Azul",
    Marca: "Audi",
    cardImg: "/assets/imagenes/audi.jpg",
  },
  {
    id: 15,
    name: "A4",
    Precio: 100000000,
    Color: "Plateado",
    Marca: "Audi",
    cardImg: "/assets/imagenes/audi.jpg",
  },
];

const divideProductsInParts = (size) => {
  let productsList = [];
  for (let i = 0; i < productsData.length; i += size) {
    productsList.push(productsData.slice(i, i + size));
  }
  return productsList;
};

const appState = {
  products: divideProductsInParts(6),
  currentProductsIndex: 0,
  productsLimit: divideProductsInParts(6).length,
  activeFilter: null,
};
