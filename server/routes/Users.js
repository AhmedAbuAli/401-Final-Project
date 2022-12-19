const express = require("express");
const router = express.Router();
const { Users } = require("../models");
const bcrypt = require("bcrypt");
const { sign} = require("jsonwebtoken");
const { validateToken } = require("../middlewares/AuthMiddleware");
const { json } = require("sequelize");





router.post("/", async (req, res) => {
  const { username, password } = req.body;
  bcrypt.hash(password, 10).then((hash) => {
    Users.create({
      username: username,
      password: hash,
    });
    res.json("SUCCESS");
  });
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await Users.findOne({ where: { username: username } });
  if(user){
    bcrypt.compare(password, user.password).then(async (match) => {
        if (!match) res.json({ error: "Wrong Username And Password Combination" });
    
        else {
            const accessToken = sign ( {username : user.username , id : user.id} , "ImportantSecret" )
            console.log(accessToken)
            res.json(accessToken);}
                })
            }
    else {
            res.json( {error : "User Does not Exist" })

    }
        })


router.get("/auth" , validateToken , ( async (req , res ) =>{
    res.json(req.user)
}))
module.exports = router;
