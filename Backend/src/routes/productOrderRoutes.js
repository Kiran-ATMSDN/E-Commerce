const express = require("express");
const router = express.Router();
router.use(express.json());

// Import the pool or database connection
const pool = require("../../db");

router.get("/porductOrder", function (req, res) {
  res.send("it's product order Page!!!");
});

//add product order page
router.post("/productOrder/addProductOrder", async (req, res) => {
  try {
    const {
      id,
      user_id,
      date_time,
      shipping_address,
      shipping_pin,
      shipping_city,
      shipping_status,
    } = req.body;

    // Execute the query using the established pool
    const newProductOrder = await pool.query(
      "INSERT INTO orders (id, user_id, date_time, shipping_address, shipping_pin, shipping_city, shipping_status) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
      [
        id,
        user_id,
        date_time,
        shipping_address,
        shipping_pin,
        shipping_city,
        shipping_status,
      ]
    );

    res.json(newProductOrder.rows[0]);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// All product orders
router.get("/productOrder/allProductsOrder", async (req, res) => {
  try {
    const allProductsOrder = await pool.query(
      "SELECT id, user_id, date_time, shipping_address, shipping_pin, shipping_city, shipping_status FROM orders"
    );
    if (allProductsOrder.rows.length === 0) {
      // If no user found, send a custom message
      return res.status(404).json({ message: "Orders not found" });
    }

    res.json(allProductsOrder.rows); // Send rows from the query result
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
});

// search product order
router.get("/productOrder/ProductOrder/:id", async (req, res) => {
  try {
    const { id } = req.params; // Extract id from params
    const productOrderSearch = await pool.query(
      "SELECT id, user_id, date_time, shipping_address, shipping_pin, shipping_city, shipping_status FROM orders WHERE id = $1",
      [id]
    );

    if (productOrderSearch.rows.length === 0) {
      // If no user found, send a custom message
      return res.status(404).json({ message: "Order not found !!!" });
    }

    res.json(productOrderSearch.rows[0]); // Send rows from the query result
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

// update product order
router.put("/productOrder/updateProductOrder/:id", async (req, res) => {
  try {
    const { id } = req.params; // Extract id from params

    const { user_id, date_time, shipping_address, shipping_pin, shipping_city, shipping_status } = req.body; // Extract individual fields from req.body

    const updateProductPrice = await pool.query(
      "UPDATE product_price SET user_id = $1, date_time = $2, shipping_address = $3, shipping_pin = $4, shipping_city = $5, shipping_status = $6 WHERE id =$7",
      [user_id, date_time, shipping_address, shipping_pin, shipping_city, shipping_status, id] // Add id to the parameter list
    );

    res.json("Product Order updated!!");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

// delete product order
router.delete("/productOrder/deleteProductOrder/:id", async (req, res) => {
  try {
    const { id } = req.params; // Extract id from params

    const deleteProductImage = await pool.query(
      "DELETE FROM orders WHERE id = $1",
      [id]
    );

    res.json("Product Order deleted!!");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
