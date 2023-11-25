const { secret } = require("../config/authConfig");
const jwt = require("jsonwebtoken");

exports.verifyToken = async (req, res, next) => {
  try {
    let token = req.cookies.token;
    if (!token) {
      return res.status(403).send({ message: "No token provided" });
    }

    const decoded = await jwt.verify(token, secret);
    req.userId = decoded.userId;
    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).send({ message: "Token has expired" });
    }
    return res.status(401).send({ message: "Token Invalid" });
  }
};