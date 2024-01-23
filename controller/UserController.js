//user controller
const User = require("../model/User");// required module user
const bcrypt = require("bcrypt"); // required module bcrypt for password hashing

/*
    UserController is a class that contains methods for registering, logging in, getting all users, and deleting users.
    The methods are asynchronous and use the User model to interact with the database.
*/



const register =async(_username,_email,_password)=>{

 let data = await User.create({ userName: _username, email: _email, password: _password });
 console.log(data);
  if (data) {
   console.log("register is done")
 }
 else {
   console.log("please again");
 }
}   

/*  
    Login is a function that takes in a username and password,
*/

const login = async (_username,_password) => {
  try {
    let user = await User.findOne({
      username: _username});
    if (user) {
      console.log("user found");
    }
    else {
      console.log("user not found");
    }
    const match = await bcrypt.compare(_password, user.password);
    if (match) {
      console.log("Login done ")
    
    }else {
        console.log("login not done ")
      }
  }
  catch (e) {
    console.log(e);

  }
}

  module.exports = { register, login };



  exports.login = async (req, res) => {
    const { username, password } = req.body;
  
    // Check if username and password are provided (retaining this check for clarity)
    if (!username || !password) {
      return res.status(400).json({
        message: "Username or Password not present",
      });
    }
  
    try {
      // Passport takes care of authentication and attaching user to req.user
      await next();
  
      res.status(200).json({
        message: "Login successful",
        user: req.user,
      });
    } catch (error) {
      res.status(400).json({
        message: "An error occurred",
        error: error.message,
      });
    }
  };
  