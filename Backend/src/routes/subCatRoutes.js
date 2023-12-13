const express = require("express");
const router = express.Router();
router.use(express.json());

// Import the pool or database connection
const pool = require("../../db");

router.get("/subCategories", function (req, res) {
  res.send("it's sub categories Page!!!");
});

//add sub_categories
router.post("/subCategory/addSubCategory", async (req, res) => {
  try {
    const { title, main_category_id } = req.body;

    // Execute the query using the established pool
    const newSubCategory = await pool.query(
      "INSERT INTO sub_category (title, main_category_id,) VALUES ($1, $2) RETURNING id, title, main_category_id",
      [title, main_category_id]
    );

    res.json({
      responseCode: 200,
      responseMsg: "subCategory added",
      data: newSubCategory.rows[0],
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// all categories
router.get("/subCategory/allSubCategories", async (req, res) => {
  try {
    const allSubCategories = await pool.query(
      "SELECT id, title, main_category_id FROM sub_category"
    );
    if (allSubCategories.rows.length === 0) {
      // If no user found, send a custom message
      return res.status(404).json({ message: "Sub Category not found" });
    }

    res.json({
      responseCode: 200,
      responseMsg: "all subCategory",
      data: allSubCategories.rows,
    }); // Send rows from the query result
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
});

// search categories
router.get("/subCategory/subCategories/:id", async (req, res) => {
  try {
    const { id } = req.params; // Extract id from params
    const searchSubCategory = await pool.query(
      "SELECT id, title, main_category_id FROM sub_category WHERE id = $1",
      [id]
    );

    if (searchSubCategory.rows.length === 0) {
      // If no user found, send a custom message
      return res.status(404).json({ message: "Sub Category not found" });
    }

    res.json(searchSubCategory.rows[0]); // Send rows from the query result
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

// update category
router.put("/subCategory/updateSubCategory/:id", async (req, res) => {
  try {
    const { id } = req.params; // Extract id from params

    const { title, main_category_id } = req.body; // Extract individual fields from req.body

    const updateCategory = await pool.query(
      "UPDATE sub_category SET title = $1, main_category_id = $2 WHERE id =$3",
      [title, main_category_id, id] // Add id to the parameter list
    );

    res.json("Sub Category updated!!");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

// delete category
router.delete("/subCategory/deleteSubCategory/:id", async (req, res) => {
  try {
    const { id } = req.params; // Extract id from params

    const deleteSubCategory = await pool.query(
      "DELETE FROM sub_category WHERE id = $1",
      [id]
    );

    res.json("Sub Category deleted!!");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
