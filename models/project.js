module.exports = function(sequelize,DataTypes){
    let project = sequelize.define('Project',{
        content : {
            type : DataTypes.TEXT,
            allowNull: false 
        }
    });
    project.associate = function(models){
        project.belongsTo(models.User,{ foreignKey : {name: 'userId',allowNull:false},onDelete:'CASCADE'}); 
    }
    return project;   
}