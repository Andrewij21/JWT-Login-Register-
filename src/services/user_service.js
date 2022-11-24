const { requestResponse } = require("../utils");
const { addUser, checkUser, getAll } = require("./queries/user_query");
const pool = require("../config/config");
const bcrypt = require("bcrypt");

const create = async (data) => {
  const { username, email, password } = data;
  const hashPassword = await bcrypt.hash(password, 10);
  const user = await pool.query(addUser, [username, email, hashPassword]);
  return { ...requestResponse.success, user: user.rows };
};

const get = async () => {
  const users = await pool.query(getAll);
  if (users.rowCount < 0) {
    return {
      ...requestResponse.success,
      message: "Users is empty",
    };
  }
  return { ...requestResponse.success, users: users.rows };
};
module.exports = { create, get };
