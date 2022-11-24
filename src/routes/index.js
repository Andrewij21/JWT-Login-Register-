const router = require("express").Router();
const userRoute = require("./user_router");
router.use("/api/v1/user", userRoute);

module.exports = router;
