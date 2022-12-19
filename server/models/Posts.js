const { Sequelize } = require(".")

// Exporting sequelize and storing it in a variable
module.exports = (sequelize , DataTypes) => {
    
// Creating table called posts with columns ( title , postText , username )
    const Posts = sequelize.define("Posts" , {
        title :{
            type : DataTypes.STRING , 
            allowNull : false 
        },

        postText :{
            type : DataTypes.STRING , 
            allowNull : false 
        },

        username :{
            type : DataTypes.STRING , 
            allowNull : false 
        },
        date: { 
            type: DataTypes.DATEONLY
          }
    })

    Posts.associate = (models) => {
        Posts.hasMany(models.Comments , {
            onDelete : 'cascade' ,
        })
    }
    Posts.associate = ( models) =>{Posts.hasMany(models.Comments ,{
        // To Delete all coments when deleting a post 
        onDelete : "cascade"  
    })} 
    return Posts
}