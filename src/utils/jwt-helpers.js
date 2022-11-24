const jwt = require("jsonwebtoken");
const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = process.env;

const jwtTokens = ({ user_id, user_email, user_name }) => {
  const user = { user_id, user_email, user_name };
  const accessToken = jwt.sign(user, ACCESS_TOKEN_SECRET, { expiresIn: "30s" });
  const refreshToken = jwt.sign(user, REFRESH_TOKEN_SECRET, {
    expiresIn: "1m",
  });
  return { username: user_name, accessToken, refreshToken };
};

const jwtRefresh = (tokenRefresh) => {
  const token = jwt.verify(tokenRefresh, REFRESH_TOKEN_SECRET, (err, user) => {
    if (err)
      return {
        status: 403,
        message: "token expired",
      };
    const token = jwtTokens(user);
    return { status: 200, message: "Success", token };
  });
  return token;
};
module.exports = { jwtTokens, jwtRefresh };
