var express = require("express");
var app = express();
const cors = require("cors");
const pool = require("./db");

// Middleware
app.use(cors());
app.use(express.json()); // Access for body for request

// ROUTES
//Users routes
const userRoutes = require("./src/routes/userRoutes");
app.use(userRoutes);

// main_category routes
const mainCatRoutes = require("./src/routes/mainCatRoutes");
app.use(mainCatRoutes);

//sub_category routes
const subCatRoutes = require("./src/routes/subCatRoutes");
app.use(subCatRoutes);

// products routes
const productRoutes = require("./src/routes/productRoutes");
app.use(productRoutes);

// product images
const productImgRoutes = require("./src/routes/productsImgRoutes");
app.use(productImgRoutes);

// product price
const productPriceRoutes = require("./src/routes/productPriceRoutes");
app.use(productPriceRoutes);

// product orders
const productOrderRoutes = require("./src/routes/productOrderRoutes");
app.use(productOrderRoutes);

app.listen(3000, function () {
  console.log("Server started on port 3000...");
});
