const Pool = require("pg").Pool;
const { USER, PASSWORD, HOST, DATABASE, PORT_PG } = process.env;
const pool = new Pool({
  user: USER,
  host: HOST,
  password: PASSWORD,
  database: DATABASE,
  port: PORT_PG,
});

module.exports = pool;
