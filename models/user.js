module.exports = function(sequelize,DataTypes){
    let user = sequelize.define('User',{
        name : {
            type : DataTypes.STRING(20),
            allowNull : false,
            unique : true
        },
        nickname : {
            type : DataTypes.STRING(20),
            allowNull :false
        },
        password : {
            type : DataTypes.STRING(20),
            allowNull : false
        },
        authId : {
            type : DataTypes.INTEGER(11),
        }
    });
    // models 는 db 오브젝트
    user.associate = function(models){
        // Link 는 설정한 모델 이름
        user.hasMany(models.Link); 
    };
    user.associate = function(models){
        user.hasOne(models.Profile); 
    }; 
    // 
    return user;
} 