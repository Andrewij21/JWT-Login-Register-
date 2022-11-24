const { validationResult } = require("express-validator");
const { requestResponse } = require("../../utils");
const userValidationRules = require("./rules/user_rules");
function validate(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json({ ...requestResponse.incomplete_body, error: errors.array() });
  }
  next();
}
module.exports = { userValidationRules, validate };
