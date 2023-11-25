const db = require("../models");
const User = db.User;
exports.validateEmail = async (req, res, next) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email: email });
    if (user) {
      res.status(409).send({
        message:
          "The user with the following email already exists. Please enter a different email address",
      });
      return;
    }
    next();
  } catch (err) {
    res.status(500).send({ message: "Internal Server Error" });
  }
};
