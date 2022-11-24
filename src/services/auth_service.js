const {
  requestResponse,
  jwtTokens: { jwtTokens, jwtRefresh },
} = require("../utils");
const { checkUser } = require("./queries/user_query");
const pool = require("../config/config");
const bcrypt = require("bcrypt");

const login = async (data) => {
  const { email, password } = data;
  const user = await pool.query(checkUser, [email]);
  if (user.rowCount == 0) {
    return { ...requestResponse.unauthorized };
  }

  const isValidPassword = await bcrypt.compare(
    password,
    user.rows[0].user_password
  );

  if (!isValidPassword) {
    return { ...requestResponse.unauthorized };
  }
  const token = jwtTokens(user.rows[0]);
  return {
    ...requestResponse.success,
    data: {
      ...token,
    },
  };
};

const refreshToken = (val) => {
  const tokenRefresh = val;
  if (tokenRefresh == null)
    return {
      ...requestResponse.unauthorized,
      message: "Null refresh token",
    };

  const token = jwtRefresh(val);
  return token;
};
module.exports = { login, refreshToken };
