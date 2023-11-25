const bcrypt = require("bcryptjs");
const {saltRounds, secret} = require('../config/authConfig')

const hashPassword = async (req, res, next) => {
  const { password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    req.hashedPassword = hashedPassword
    next();
   
  } catch (err) {
    res.status(400).send({ message: "Unable to hash password due to" + err });
  }
};


module.exports = {
    hashPassword
}