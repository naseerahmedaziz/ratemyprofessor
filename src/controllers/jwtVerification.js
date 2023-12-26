const jwt = require("jsonwebtoken");

const SECRET_KEY = "MY_SECRET_KEY";

const verifyToken = (req, res, next) => {
  const bearerHeader = req.headers["authorization"];
  if (!bearerHeader) {
    return res
      .status(403)
      .json({ message: "A token is required for authentication" });
  }

  const bearer = bearerHeader.split(" ");
  const bearerToken = bearer[1]; // Get the token part

  try {
    const decoded = jwt.verify(bearerToken, SECRET_KEY);
    req.user = decoded;
    next();
  } catch (err) {
    return res
      .status(401)
      .json({ message: "Invalid Token", error: err.message });
  }
};


module.exports = {verifyToken};
  