const checkUser = "SELECT * FROM users WHERE user_email = $1";
const addUser =
  "INSERT INTO users(user_name,user_email,user_password) VALUES ($1,$2,$3) RETURNING *";
const getAll = "SELECT * FROM users";
module.exports = { checkUser, addUser, getAll };
