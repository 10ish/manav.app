const db = require("../models/index");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { saltRounds, secret } = require("../config/authConfig");
const User = db.User;

exports.login = async (req, res) => {
    try {
      const token = jwt.sign({ userId: req.userId }, secret, {
        expiresIn: "1d",
      });
  
      res.cookie("token", token);
      res.status(200).send({ message: "User logged in successfully" });
    } catch (err) {
      console.error(err); 
      res.status(400).send({ message: "Error in assigning token", error: err.message });
    }
  };
  
exports.signup = async (req, res) => {
  const userData = {
    fullName: req.body.fullName,
    email: req.body.email,
    password: req.hashedPassword,
    address: req.body.address,
    phoneNumber: req.body.phoneNumber,
  };
  try {
    const user = await User.create(userData);
    console.log("User created with the name of " + user.fullName);
    res
      .status(200)
      .send({ message: "User created with the name of " + user.fullName });
  } catch (err) {
    res.status(500).send({ message: "Internal Server Error" + err });
  }
};
exports.logout = async (req, res) => {
  try {
    await res.clearCookie("token");
    res.status(200).send({ message: "Logged Out Successfully" });
  } catch (err) {
    res.status(500).send({ message: "Unable to logout" });
  }

};

exports.getUserDetails = async (req,res)=>{
  const userId = req.userId;
  try{
const user = await User.findOne({_id: userId});
res.status(200).send(user)
  }
  catch(err){
    res.status(500).send({message: 'Internal Server Error'})
  }
}
