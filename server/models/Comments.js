// Exporting sequelize and storing it in a variable
module.exports = (sequelize , DataTypes) => {
    
    // Creating table called comments with columns ( title , postText , username )
        const Comments = sequelize.define("Comments" , {
            commentBody :{
                type : DataTypes.STRING , 
                allowNull : false 
            }, 
            date: { 
                type: DataTypes.DATEONLY
            } , 
            username : {
                type : DataTypes.STRING , 
                allowNull : false   
            }

        }) 
        return Comments
    }