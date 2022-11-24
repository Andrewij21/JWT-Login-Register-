const router = require("express").Router();
const {
  signIn,
  signUp,
  getAll,
  tokenRefresh,
} = require("../controller/user_controller");
const {
  userValidationRules: { registrationRules, loginRules },
  validate,
} = require("../middleware/validator");
const { authenticateToken } = require("../middleware/verifyToken/verifyToken");

router.get("/", authenticateToken, getAll);
router.post("/login", loginRules, validate, signIn);
router.post("/registration", registrationRules, validate, signUp);
router.get("/refreshToken", tokenRefresh);
module.exports = router;
