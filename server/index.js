// Calling express and store it in a varirable 
const express = require("express");
const app = express();
const cors = require("cors")

app.use(express.json())
app.use(cors())


// Connecting to DB
const db = require("./models");

// Routers 
const postRouter = require("./routes/posts")
app.use("/posts" , postRouter)
 
const commentsRouter = require("./routes/Comments")
app.use("/comments" , commentsRouter)


const usersRouter = require("./routes/Users")
app.use("/auth" , usersRouter)

//Checking Server 
db.sequelize.sync().then(()=>{
    app.listen(3001 , () => {
        console.log("Ahmad server is alive on port 3001");
    }) 
})



