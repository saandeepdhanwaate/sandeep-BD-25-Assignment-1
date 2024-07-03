const express = require("express");
const cors = require("cors");
const products = require("./product");
const port = 3000;
const app = express();

app.use(cors());
app.use(express.json());

// products/sort/popularity
function sortedProductRatings(rating1, rating2) {
  return rating1.rating - rating2.rating;
}
app.get("/products/sort/popularity", (req, res) => {
  let sortedProducts = products.slice();
  sortedProducts.sort(sortedProductRatings);
  res.json({ products: sortedProducts });
});

// products/sort/price-high-to-low
function sortProductPriceHighToLow(price1, price2) {
  return price1.price - price2.price;
}
app.get("/products/sort/price-high-to-low", (req, res) => {
  let sortedProducts = products.slice();
  sortedProducts.sort(sortProductPriceHighToLow);
  res.json({ products: sortedProducts });
});

// products/sort/price-low-to-high
function sortProductPriceLowToHigh(price1, price2) {
  return price2.price - price1.price;
}
app.get("/products/sort/price-low-to-high", (req, res) => {
  let sortedProducts = products.slice();
  sortedProducts.sort(sortProductPriceLowToHigh);
  res.json({ products: sortedProducts });
});

// products/filter/ram

function filterByRam(product, ram) {
  return product.ram === ram;
}

app.get("/products/filter/ram", (req, res) => {
  let ram = parseFloat(req.query.ram);
  let filteredProducts = products.filter((product) =>
    filterByRam(product, ram),
  );
  res.json({ products: filteredProducts });
});

//products/filter/rom
function filterByRom(product, rom) {
  return product.rom === rom;
}
app.get("/products/filter/rom", (req, res) => {
  let rom = parseFloat(req.query.rom);
  let sortedRom = products.filter((product) => filterByRom(product, rom));
  res.json({ products: sortedRom });
});

// products/filter/brand
function filterByBrand(product, brand) {
  return product.brand.toLowerCase() === brand;
}

app.get("/products/filter/brand", (req, res) => {
  let brand = req.query.brand;
  let filteredBrand = products.filter((product) =>
    filterByBrand(product, brand),
  );
  res.json({ products: filteredBrand });
});

// products/filter/os
function filterByOs(product, os) {
  return product.os.toLowerCase() === os;
}

app.get("/products/filter/os", (req, res) => {
  let os = req.query.os;
  let filteredOs = products.filter((product) => filterByOs(product, os));
  res.json({ products: filteredOs });
});

// products/filter/price
function filterByPrice(product, price) {
  return product.price <= price;
}
app.get("/products/filter/price", (req, res) => {
  let price = req.query.price;
  let filteredPrice = products.filter((product) =>
    filterByPrice(product, price),
  );
  res.json({ products: filteredPrice });
});

// original array
// products

app.get("/products", (req, res) => {
  res.json({ products: products });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
