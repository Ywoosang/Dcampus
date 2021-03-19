module.exports = (sequelize,DataTypes)=> {
    let like = sequelize.define('Like',{
        like : {
            type : DataTypes.BOOLEAN,
            allowNull: false 
        },
        // createdAt, updatadAt 자동으로 설정됨
    },{
        updatedAt : false,
    });
    // 
    like.associate = function (models){
        like.belongsTo(models.Post,{ onDelete : 'CASCADE'});
        like.belongsTo(models.User,{ foreignKey:{allowNull:false},onDelete : 'CASCADE'});
        like.belongsTo(models.Comment,{ onDelete : 'CASCADE'});
    };
    //
    return like;   
}