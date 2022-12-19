const { Sequelize } = require(".")

// Exporting sequelize and storing it in a variable
module.exports = (sequelize , DataTypes) => {
    
    const Users = sequelize.define("Users" , {

        username :{
            type : DataTypes.STRING , 
            allowNull : false 
        },

        password :{
            type : DataTypes.STRING , 
            allowNull : false 
        },
    })

    Users.associate = (models) => {
        Users.hasMany(models.Posts , {
            onDelete : 'cascade' ,
        })
    }
    /*
    Posts.associate = ( models) =>{Posts.hasMany(models.Comments ,{
        // To Delete all coments when deleting a post 
        onDelete : "cascade"  
    })} */
    return Users
}