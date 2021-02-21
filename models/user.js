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
    });
    // models 에는 db 오브젝트가 들어간다. 
    user.associate = function(models){
        // Link 는 설정한 모델 이름이다.  
        user.hasMany(models.Link); 
    };
    user.associate = function(models){
        user.hasOne(models.Profile); 
    }; 
    // 
    return user;
} 