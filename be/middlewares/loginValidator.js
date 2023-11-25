const db = require("../models");
const User = db.User;
const bcrypt = require("bcryptjs");
exports.validateEmail = async (req, res, next) => {
  
  const { email } = req.body;
  try {
    const user = await User.findOne({ email: email });

    if (!user) {
      res.status(404).send({
        message:
          "The user with the following email does not exists. Please enter a different email address or register",
      });
      return;
    }
    req.userId = user._id;
    next();
  } catch (err) {
    res.status(500).send({ message: "Internal Server Error" });
  }
};

exports.validatePassword = async (req, res, next) => {
  const { password } = req.body;

  try {
    const user = await User.findOne({ _id: req.userId });

    try {
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return res.status(401).send({ message: "Password is incorrect" });
      }
      next();
    } catch (err) {
      res
        .status(400)
        .send({ message: "Error in comparig the password : " + err });
    }
  } catch (err) {
    res.status(500).send({ message: "Internal Server Error" });
  }
};
