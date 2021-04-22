module.exports = (sequelize,DataTypes) => {
    let hashtag = sequelize.define('Hashtag',{
        title : {
            type : DataTypes.STRING(15),
            allowNull : false,
            unique : true,
        },
    },{
        // 이모티콘을 해시태그로 다는 경우 
        charset :'utf8mb4',
        collate : 'utf8mb4_general_ci' 
    });
    hashtag.associate = (models) => {
        hashtag.belongsToMany(models.Post,{ through : 'PostHashtag' }); 
    }
    return hashtag;   
}