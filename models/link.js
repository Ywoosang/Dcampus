module.exports = function(sequelize,DataTypes){
    let link = sequelize.define("Link",{
        name : {
            type : DataTypes.STRING(100),
            allowNull : false
        },
        content :{
            type : DataTypes.TEXT,
            allowNull: false
        }
    });
    // 
    link.associate = function(models) {
        link.belongsTo(models.User,{ foreignKey :{ allowNull:false},onDelete:'CASCADE'});
    }
    return link; 

}