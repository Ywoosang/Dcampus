module.exports = (sequelize,DataTypes) => {
    let profile = sequelize.define('Profile',{
        intro : {
            type : DataTypes.TEXT,
        },
        // img : {
        //     type : DataTypes.BLOB('long'),
        // },
    });
    // 
    profile.associate = function(models) {
        profile.belongsTo(models.User,{ forignKey :{name: 'userId',allowNull:false},onDelete:'CASCADE'}); 
    }; 
    // 
    return profile; 
}