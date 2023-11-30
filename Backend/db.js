const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  password: "P@ssw0rd",
  host: "localhost",
  port: 5432,
  database: "e_commerce", 
});

module.exports = pool;
