const express = require("express");
const router = express.Router();
router.use(express.json());

const pool = require("../../db");

// Home page
router.get("/orderDetails", (req, res) => {
  res.send("It's order details Home pgae!!");
});

// add order details
router.post("/orderDetails/addOrderDetails", async (req, res) => {
  try {
    const { id, order_id, product_id, product_quantity, product_status } =
      req.body;

    const newOrderDetails = await pool.query(
      "INSERT INTO order_details(id, order_id,product_id,product_quantity,product_status) VALUES ($1,$2,$3,$4,$5) RETURNING *",
      [id, order_id, product_id, product_quantity, product_status]
    );
    res.json(newOrderDetails.rows[0]);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error!!");
  }
});

// all order details
router.get("/orderDetails/allOrderDetails", async (req, res) => {
  try {
    const allOrderDetails = await pool.query(
      "SELECT id, order_id,product_id,product_quantity,product_status FROM order_details"
    );
    if (allOrderDetails.rows.length === 0) {
      // if orderDetails not found, send custom message
      return res.status(404).json({ message: "Order details not found!!" });
    }
    res.json(allOrderDetails.rows);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error!!");
  }
});

module.exports = router;
