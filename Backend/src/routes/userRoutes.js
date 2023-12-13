const express = require("express");
const router = express.Router();
router.use(express.json());
const bcrypt = require("bcrypt");

// Import the pool or database connection
const pool = require("../../db");

//home page
router.get("/user", function (req, res) {
  res.send("it's Home Page!!!");
});

//registration page
router.post("/user/registration", async (req, res) => {
  try {
    const {
      name,
      email,
      gender,
      mob_no,
      birth_date,
      address,
      pin_code,
      city,
      password,
    } = req.body;

    // Execute the query using the established pool
    const newUser = await pool.query(
      "INSERT INTO users ( name, email, gender, mob_no, birth_date, address, pin_code, city, password) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id, name, email, gender, mob_no, birth_date, address, pin_code, city, password",
      [
        name,
        email,
        gender,
        mob_no,
        birth_date,
        address,
        pin_code,
        city,
        password,
      ]
    );

    res.json({
      responseCode: 200,
      responsemsg: "User added !!",
      users: newUser.rows[0],
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// All users
router.get("/user/allUsers", async (req, res) => {
  try {
    const allUsers = await pool.query(
      "SELECT id, name, email, gender, mob_no, birth_date, address, pin_code, city, password FROM users"
    );
    if (allUsers.rows.length === 0) {
      // If no user found, send a custom message
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      responseCode: 200,
      responsemsg: "All Users",
      users: allUsers.rows,
    }); // Send rows from the query result
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
});

// search users
router.get("/user/users/:id", async (req, res) => {
  try {
    const { id } = req.params; // Extract id from params
    const userSearch = await pool.query(
      "SELECT id, name, email, gender, mob_no, birth_date, address, pin_code, city, password FROM users WHERE id = $1",
      [id]
    );

    if (userSearch.rows.length === 0) {
      // If no user found, send a custom message
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      responseCode: 200,
      responsemsg: "All Users",
      users: userSearch.rows[0],
    }); // Send the first (and only) user object directly
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

// update user
router.put("/user/updateUser/:id", async (req, res) => {
  try {
    const { id } = req.params; // Extract id from params

    const { name, mob_no, address, pin_code, city, password } = req.body; // Extract individual fields from req.body

    const updateUser = await pool.query(
      "UPDATE users SET name = $1, mob_no = $2, address = $3, pin_code = $4, city = $5, password = $6 WHERE id =$7",
      [name, mob_no, address, pin_code, city, password, id] // Add id to the parameter list
    );

    res.json("User updated!!");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

// delete users
router.delete("/user/deleteUser/:id", async (req, res) => {
  try {
    const { id } = req.params; // Extract id from params

    const deleteUser = await pool.query("DELETE FROM users WHERE id = $1", [
      id,
    ]);

    res.json("User deleted!!");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

router.post("/user/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if email and password are provided
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Please provide email and password" });
    }

    // Query to find user by email
    const user = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    // Check if user exists
    if (user.rows.length === 0) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const hashedPassword = user.rows[0].password; // Assuming the password is stored in the 'password' column

    // Compare the provided password with the hashed password in the database
    const passwordMatch = await bcrypt.compare(password, hashedPassword);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    return res.status(200).json({ message: "Login successful" });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
