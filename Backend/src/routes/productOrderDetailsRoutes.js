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
    const { order_id, product_id, product_quantity, product_status } = req.body;

    const newOrderDetails = await pool.query(
      "INSERT INTO order_details( order_id,product_id,product_quantity,product_status) VALUES ($1,$2,$3,$4) RETURNING id, order_id,product_id,product_quantity,product_status",
      [order_id, product_id, product_quantity, product_status]
    );
    res.json({
      responseCode: 200,
      responseMsg: "order details added",
      data: newOrderDetails.rows[0],
    });
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
    res.json({
      responseCode: 200,
      responseMsg: "all order details",
      data: allOrderDetails.rows,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error!!");
  }
});

// search order details
router.get("/orderDetails/orderDetails/:id", async (req, res) => {
  try {
    const { id } = req.params; // Extract id from params
    const searchOrderDetails = await pool.query(
      "SELECT id, order_id, product_id, product_quantity, product_status FROM order_details WHERE id = $1",
      [id]
    );

    if (searchOrderDetails.rows.length === 0) {
      // If no user found, send a custom message
      return res.status(404).json({ message: "Order details not found" });
    }

    res.json({
      responseCode: 200,
      responseMsg: "subCategory data",
      data: searchOrderDetails.rows[0],
    }); // Send rows from the query result
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

// update order details
router.put("/orderDetails/updateOrderDetails/:id", async (req, res) => {
  try {
    const { id } = req.params; // Extract id from params

    const { order_id, product_id, product_quantity, product_status } = req.body; // Extract individual fields from req.body

    const updateCategory = await pool.query(
      "UPDATE order_details SET order_id = $1, product_id = $2, product_quantity = $3, product_status = $4 WHERE id =$5",
      [order_id, product_id, product_quantity, product_status, id] // Add id to the parameter list
    );

    res.json("order details updated!!");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

// delete order details
router.delete("/orderDetails/deleteOrderDetails/:id", async (req, res) => {
  try {
    const { id } = req.params; // Extract id from params

    const deleteSubCategory = await pool.query(
      "DELETE FROM order_details WHERE id = $1",
      [id]
    );

    res.json("order details deleted!!");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
