const { login, refreshToken } = require("../services/auth_service");
const { create, get } = require("../services/user_service");
const { requestResponse } = require("../utils");
let response;

const signIn = async (req, res) => {
  try {
    const user = await login(req.body);
    // console.log("user", user);
    res.cookie("refresh_token", user.data.refreshToken, { httpOnly: true });
    response = { ...user };
  } catch (error) {
    response = { ...requestResponse.server_error, msg: error };
  }
  res.status(response.status).json(response);
};

const signUp = async (req, res) => {
  try {
    const user = await create(req.body);
    response = { ...user };
  } catch (error) {
    response = { ...requestResponse.server_error, msg: error };
  }
  res.status(response.status).json(response);
};

const tokenRefresh = (req, res) => {
  try {
    const token = refreshToken(req.cookies.refresh_token);
    if (!token.status == 403)
      return res.cookie("refresh_token", token.token.refreshToken);

    console.log("token ref", token);
    response = { ...token };
  } catch (error) {
    response = { ...requestResponse.server_error, error };
  }
  res.status(response.status).json(response);
};

const getAll = async (req, res) => {
  try {
    console.log("headers", req.headers);
    const users = await get();
    response = { ...users };
  } catch (error) {
    response = { ...requestResponse.server_error, msg: error };
  }
  res.status(response.status).json(response);
};
module.exports = { signIn, signUp, getAll, tokenRefresh };
