module.exports = (sequelize,DataTypes)=>{
    let post = sequelize.define('Post',{
        title : {
            type : DataTypes.STRING(50),
            allowNull : false
        },
        content : {
            type : DataTypes.TEXT,
            allowNull: false,
        },
        user : {
            type : DataTypes.STRING(10),
            allowNull: false
        }
        // createdAt, updatadAt 자동으로 설정됨
    });
    // 
    post.associate = function(models){
        post.belongsTo(models.User,{ foreignKey : {allowNull:false},onDelete:'CASCADE'}); 
        post.hasMany(models.Comment); 
    }; 
    // 
    return post;   
}
