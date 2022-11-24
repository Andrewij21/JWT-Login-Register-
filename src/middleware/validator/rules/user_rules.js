const { body } = require("express-validator");
const pool = require("../../../config/config");
const { checkUser } = require("../../../services/queries/user_query");
const userValidationRules = {
  registrationRules: [
    body("username")
      .exists({ checkFalsy: true, checkNull: true })
      .withMessage("username cannot be empty"),
    body("email")
      .isEmail()
      .withMessage("Email is invalid")
      .custom(async (value) => {
        const user = await pool.query(checkUser, [value]);
        if (user.rowCount > 0) {
          return Promise.reject("E-mail already in use");
        }
      }),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password at least 6 character"),
  ],
  loginRules: [
    body("email")
      .exists({ checkFalsy: true, checkNull: true })
      .withMessage("Email cannot be empty"),
    body("password")
      .exists({ checkFalsy: true, checkNull: true })
      .withMessage("Password can not be empty"),
  ],
};

module.exports = userValidationRules;
