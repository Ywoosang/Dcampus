module.exports = (sequelize,DataTypes) => {
    let profile = sequelize.define('Profile',{
        intro : {
            type : DataTypes.TEXT,
            allowNull:false
        },
        img : {
            type : DataTypes.TEXT,
            allowNull:false
        },
    });
    // 
    profile.associate = function(models) {
        profile.belongsTo(models.User,{ foreignKey :{allowNull:false},onDelete:'CASCADE'}); 
    }; 
    // 
    return profile; 
}