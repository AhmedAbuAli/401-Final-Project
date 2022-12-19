// Calling express and store it in a varirable 
const express = require("express");

// Define the router 
const router = express.Router()

// Creating an instance from the post we created in the models
const { Comments } = require("../models")

const {validateToken} = require("../middlewares/AuthMiddleware")

router.get("/:postId" , async (req , res) => {
    const postId = req.params.postId
    const comments  = await Comments.findAll(
        {
            where: {
                PostId : postId
            }
          }
    )
    res.json(comments)
})

router.post("/" , validateToken , async(req , res) =>{
    const comment = req.body
    const username  = req.user.username
    comment.username = username
    await Comments.create(comment)
    res.json(comment) 

})

// Allow only the owner of the comment to delete it ! 
router.delete("/:commentId" , validateToken , async(req , res) =>{
    const commentId = req.params.commentId 

    Comments.destroy({
        where : {
            id : commentId , 
            
        }
    })
} )


module.exports = router
