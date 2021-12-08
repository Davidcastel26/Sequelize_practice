const {DataTypes} = require('sequelize');

module.exports = sequelize => {
    sequelize.define('Team',{
        code:{
            type:DataTypes.UUID,
            primaryKey: true
        },
        name:{
            type:DataTypes.STRING
        }
     },{
    
     });
    
}
