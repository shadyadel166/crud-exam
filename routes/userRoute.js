const UserController=require("../controller/UserController")

const route=require("express").Router()
const bcrypt=require("bcrypt")



route.post("/register",async(req,res)=>{   
    let { username, email,password } = req.body
    if (password.length <= 6) {
     return res.status(400).json({ message: "Password less than 6 characters" })
    }
    else{
        bcrypt.hash(password, 10, async function (err, hash) {
            let data = await UserController.register(username, email, hash)
            return res.status(200).json({ message: "done" })
        });
    }
})

route.post("/login",async(req,res)=>{
        try {
            let {username,password}=req.body
          const user = await UserController.findOne({ username, password })
          if (user) {
            res.status(200).json({
              message: "Login  successful",
              error: "User found",
            })
          } 
          else {
            res.status(401).json({
              message: "Login not successful",
              user,
            })
          }
        } catch (error) {
          res.status(400).json({
            message: "An error occurred",
            error: error.message,
          })
        }
      }

)




module.exports = route;