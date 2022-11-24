const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.status(401).json({ message: "Null Token" });
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.status(401).json({ error: err.message });
    req.user = user;
    next();
  });
};

module.exports = { authenticateToken };
