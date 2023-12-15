const express = require("express");
const router = express.Router();
router.use(express.json());

// Import the pool or database connection
const pool = require("../../db");

router.get("/categories", function (req, res) {
  res.send("it's categories Page!!!");
});

//add categories
router.post("/category/addCategory", async (req, res) => {
  try {
    const { title, image_url } = req.body;

    // Execute the query using the established pool
    const newCategory = await pool.query(
      "INSERT INTO main_category ( title, image_url) VALUES ($1, $2) RETURNING id, title, image_url",
      [title, image_url]
    );

    res.json({
      responseCode: 200,
      responseMsg: "main category added",
      data: newCategory.rows[0],
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// all main categories
router.get("/category/allCategories", async (req, res) => {
  try {
    const allCategories = await pool.query(
      "SELECT id, title, image_url FROM main_category"
    );
    if (allCategories.rows.length === 0) {
      // If no user found, send a custom message
      return res.status(404).json({ message: "category not found" });
    }

    res.json({
      responseCode: 200,
      responseMsg: "all main categories",
      data: allCategories.rows,
    }); // Send rows from the query result
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
});

// search main categories
router.get("/category/categories/:id", async (req, res) => {
  try {
    const { id } = req.params; // Extract id from params
    const searchCategory = await pool.query(
      "SELECT id, title, image_url FROM main_category WHERE id = $1",
      [id]
    );

    if (searchCategory.rows.length === 0) {
      // If no user found, send a custom message
      return res.status(404).json({ message: "Category not found" });
    }

    res.json({
      responseCode: 200,
      responseMsg: "main category data",
      data: searchCategory.rows[0],
    }); // Send rows from the query result
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

// update category
router.put("/category/updateCategory/:id", async (req, res) => {
  try {
    const { id } = req.params; // Extract id from params

    const { title, image_url } = req.body; // Extract individual fields from req.body

    const updateCategory = await pool.query(
      "UPDATE main_category SET title = $1, image_url = $2 WHERE id =$3",
      [title, image_url, id] // Add id to the parameter list
    );

    res.json("Category updated!!");
    res.json(updateCategory);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

// delete category
router.delete("/category/deleteCategory/:id", async (req, res) => {
  try {
    const { id } = req.params; // Extract id from params

    const deleteCategory = await pool.query(
      "DELETE FROM main_category WHERE id = $1",
      [id]
    );

    res.json("Category deleted!!");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
