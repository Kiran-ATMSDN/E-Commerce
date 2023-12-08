const express = require("express");
const router = express.Router();
router.use(express.json());

// Import the pool or database connection
const pool = require("../../db");

router.get("/porductPrice", function (req, res) {
  res.send("it's Home Page!!!");
});

//add product images page
router.post("/productPrice/addProductPrice", async (req, res) => {
  try {
    const { id, product_id, price, from_date, to_date, added_on } = req.body;

    // Execute the query using the established pool
    const newProductPrice = await pool.query(
      "INSERT INTO product_price (id, product_id, price, from_date, to_date, added_on) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [id, product_id, price, from_date, to_date, added_on]
    );

    res.json(newProductPrice.rows[0]);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// All product price
router.get("/productPrice/allProductsPrice", async (req, res) => {
  try {
    const allProductsPrice = await pool.query(
      "SELECT id, product_id, price, from_date, to_date, added_on FROM product_price"
    );
    if (allProductsPrice.rows.length === 0) {
      // If no user found, send a custom message
      return res.status(404).json({ message: "Product Price not found" });
    }

    res.json(allProductsPrice.rows); // Send rows from the query result
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
});

// search product price
router.get("/productPrice/ProductPrice/:id", async (req, res) => {
  try {
    const { id } = req.params; // Extract id from params
    const productPriceSearch = await pool.query(
      "SELECT id, product_id, price, from_date, to_date, added_on FROM product_price WHERE id = $1",
      [id]
    );

    if (productPriceSearch.rows.length === 0) {
      // If no user found, send a custom message
      return res.status(404).json({ message: "Product Image not found" });
    }

    res.json(productPriceSearch.rows[0]); // Send rows from the query result
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

// update product Price
router.put("/productPrice/updateProductPrice/:id", async (req, res) => {
  try {
    const { id } = req.params; // Extract id from params

    const { product_id, price, from_date, to_date, added_on } =
      req.body; // Extract individual fields from req.body

    const updateProductPrice = await pool.query(
      "UPDATE product_price SET product_id = $1, price = $2, from_date = $3, to_date = $4, added_on = $5 WHERE id =$6",
      [product_id, price, from_date, to_date, added_on, id] // Add id to the parameter list
    );

    res.json("Product Price updated!!");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

// delete product Price
router.delete("/productPrice/deleteProductPrice/:id", async (req, res) => {
  try {
    const { id } = req.params; // Extract id from params

    const deleteProductImage = await pool.query(
      "DELETE FROM product_price WHERE id = $1",
      [id]
    );

    res.json("Product Image deleted!!");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
