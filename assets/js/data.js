const productsData = [
  {
    id: 1,
    name: "Cruze",
    Precio: 1000000,
    user: "thetroncous",
    category: "futbol",

    cardImg: "./assets/img/products/goldenmessi.png",
  },
  {
    id: 2,
    name: "Diego Maradona",
    Precio: 5.89,
    user: "kirik8",
    category: "futbol",

    cardImg: "./assets/img/products/diego.png",
  },
  {
    id: 3,
    name: "L10nel Messi",
    Precio: 4.89,
    user: "FD10S",
    category: "futbol",

    cardImg: "./assets/img/products/beardedmessi.png",
  },
  {
    id: 4,
    name: "M. Schumacher",
    Precio: 3.67,
    user: "Urastream",
    category: "autos",

    cardImg: "./assets/img/products/schumacher.png",
  },
  {
    id: 5,
    name: "Fernando Alonso",
    Precio: 4.52,
    user: "Gulineta",
    category: "autos",

    cardImg: "./assets/img/products/alonso.png",
  },
  {
    id: 6,
    name: "Dominic Toretto",
    Precio: 7.33,
    user: "HardBena",
    category: "autos",

    cardImg: "./assets/img/products/toretto.png",
  },
  {
    id: 7,
    name: "Donald Trump",
    Precio: 2.2,
    user: "ThingyCake",
    category: "politicos",

    cardImg: "./assets/img/products/trump.png",
  },
  {
    id: 8,
    name: "Xi Jinping",
    Precio: 1.12,
    user: "NickyG",
    category: "politicos",

    cardImg: "./assets/img/products/jinping.png",
  },
  {
    id: 9,
    name: "Vladimir Putin",
    Precio: 0.5,
    user: "ThingyBit",
    category: "politicos",

    cardImg: "./assets/img/products/putin.png",
  },
  {
    id: 10,
    name: "Michael Jackson",
    Precio: 8.35,
    user: "LilKenny",
    category: "musica",

    cardImg: "./assets/img/products/jackson.png",
  },
  {
    id: 11,
    name: "Bruno Mars",
    Precio: 8.65,
    user: "Sharkenetta",
    category: "musica",

    cardImg: "./assets/img/products/mars.png",
  },
  {
    id: 12,
    name: "Bad Bunny",
    Precio: 9.29,
    user: "MG9",
    category: "musica",

    cardImg: "./assets/img/products/bunny.png",
  },
  {
    id: 13,
    name: "Keanu Reeves",
    Precio: 8.27,
    user: "MrMoustache",
    category: "peliculas",

    cardImg: "./assets/img/products/reeves.png",
  },
  {
    id: 14,
    name: "Jason Stathan",
    Precio: 5.55,
    user: "PasquSaw",
    category: "peliculas",

    cardImg: "./assets/img/products/stathan.png",
  },
  {
    id: 15,
    name: "Angelina Jolie",
    Precio: 7.46,
    user: "CamiCrow",
    category: "peliculas",

    cardImg: "./assets/img/products/jolie.png",
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
