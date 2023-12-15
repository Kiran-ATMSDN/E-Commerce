const express = require("express");
const router = express.Router();
router.use(express.json());

// Import the pool or database connection
const pool = require("../../db");

router.get("/porductImages", function (req, res) {
  res.send("it's Home Page!!!");
});

//add product images page
router.post("/productImage/addProductImage", async (req, res) => {
  try {
    const { image_url, alternate_text, is_primary_image, product_id } =
      req.body;

    // Execute the query using the established pool
    const newProdImg = await pool.query(
      "INSERT INTO product_images (image_url, alternate_text, is_primary_image, product_id) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [image_url, alternate_text, is_primary_image, product_id]
    );

    res.json({
      responseCode: 200,
      responseMsg: "Product image added",
      data: newProdImg.rows[0],
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// All product images
router.get("/productImage/allProductsImages", async (req, res) => {
  try {
    const allProductsImages = await pool.query(
      "SELECT id, image_url, alternate_text, is_primary_image, product_id FROM product_images"
    );
    if (allProductsImages.rows.length === 0) {
      // If no user found, send a custom message
      return res.status(404).json({ message: "Product Images not found" });
    }

    res.json({
      responseCode: 200,
      responseMsg: "all Porduct images",
      data: allProductsImages.rows,
    }); // Send rows from the query result
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
});

// search product Image
router.get("/productImage/ProductImage/:id", async (req, res) => {
  try {
    const { id } = req.params; // Extract id from params
    const productImgSearch = await pool.query(
      "SELECT id, image_url, alternate_text, is_primary_image, product_id FROM product_images WHERE id = $1",
      [id]
    );

    if (productImgSearch.rows.length === 0) {
      // If no user found, send a custom message
      return res.status(404).json({ message: "Product Image not found" });
    }

    res.json({
      responseCode: 200,
      responseMsg: "Product image data",
      data: productImgSearch.rows[0],
    }); // Send rows from the query result
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

// update productImage
router.put("/productImage/updateProductImage/:id", async (req, res) => {
  try {
    const { id } = req.params; // Extract id from params

    const { image_url, alternate_text, is_primary_image, product_id } =
      req.body; // Extract individual fields from req.body

    const updateProductImage = await pool.query(
      "UPDATE product_images SET image_url = $1, alternate_text = $2, is_primary_image = $3, product_id = $4 WHERE id =$5",
      [image_url, alternate_text, is_primary_image, product_id, id] // Add id to the parameter list
    );

    res.json("Product Image updated!!");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

// delete products
router.delete("/productImage/deleteProductImage/:id", async (req, res) => {
  try {
    const { id } = req.params; // Extract id from params

    const deleteProductImage = await pool.query(
      "DELETE FROM product_images WHERE id = $1",
      [id]
    );

    res.json("Product Image deleted!!");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
