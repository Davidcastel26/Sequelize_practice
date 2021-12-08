const {Sequelize, DataTypes} = require('sequelize');


// connect into a db 
 const sequelize =  new Sequelize('postgres://davidcastellanos:@localhost:5432/seq')

 //to confirm that you were able to conect with the local host
 sequelize.authenticate().then(()=>console.log('success')).catch(e=>console.log(e));

//  define(modelName, attributes, options)
// if the modelName is using upperCase we'll need to use "name"
//but if the modelName is in lowerCase we do not need to use ""
 const Player = sequelize.define('Player',{
    firstName:{
        type: DataTypes.STRING
    },
    lastName:{
        type: DataTypes.STRING
    }
 },{

 })

 const Team = sequelize.define('Team',{
    code:{
        type:DataTypes.UUID
    },
    name:{
        type:DataTypes.STRING
    }
 },{

 })

sequelize.sync({force:true}); 