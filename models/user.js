module.exports = function(sequelize,DataTypes){
    let user = sequelize.define('User',{
        name : {
            type : DataTypes.STRING(20),
            allowNull : false,
        },
        email : {
            type : DataTypes.STRING,
            allowNull :false
        },
        password : {
            type : DataTypes.STRING,
        },
        authId : {
            type : DataTypes.INTEGER(11),
        },
        provider : {
            type : DataTypes.STRING(10),
        }
        
    });
    // models 는 db 오브젝트
    user.associate = function(models){
        // Link 는 설정한 모델 이름
        user.hasMany(models.Link); 
        user.hasOne(models.Profile); 
        user.hasMany(models.Comment);
        user.hasMany(models.Post);
    };
    // 
    return user;
} 