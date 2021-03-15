module.exports = (sequelize,DataTypes)=> {
    let comment = sequelize.define('Comment',{
        content : {
            type : DataTypes.TEXT,
            allowNull: false 
        },
        user : {
            type : DataTypes.STRING(10),
            allowNull : false,
        }
        // createdAt, updatadAt 자동으로 설정됨
    });
    // 
    comment.associate = function (models){
        comment.belongsTo(models.User,{ forignKey :{allowNull:false},onDelete:'CASCADE'}); 
        comment.belongsTo(models.Post,{ forignKey :{ allowNull:false}});
    };
    //
    return comment;   
}