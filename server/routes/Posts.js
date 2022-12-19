// Calling express and store it in a varirable 
const express = require("express");

// Define the router 
const router = express.Router()

// Creating an instance from the post we created in the models
const { Posts } = require("../models")


// Create a GET request ( tested on postman)
router.get("/" , async (req , res) => {
    // Retrive all row in the posts table 
    const listOfPosts = await Posts.findAll()
    res.json(listOfPosts)
})

router.get("/byid/:id" , async (req , res) => {
    const id = req.params.id
    const post  = await Posts.findByPk(id);
    res.json(post)
})



// Create a POST request ( tested on postman)
router.post("/" , async (req , res) => {
    const post = req.body

    // This will add the instance ( Row ) to our database
    // we used await to wait for the data to be inserted before moving to the next request 
    await Posts.create(post)

    res.json(post)

})


module.exports = router 