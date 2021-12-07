const {Sequelize, DataTypes} = require('sequelize');


// connect into a db 
 const sequelize =  new Sequelize('postgres://davidcastellanos:@localhost:5432/seq')

 //to confirm that you were able to conect with the local host
 sequelize.authenticate().then(()=>console.log('success')).catch(e=>console.log(e));

//  define(modelName, attributes, options)
 const Player = sequelize.define('Player',{
    firstName:{
        type: DataTypes.STRING
    },
    lastName:{
        type: DataTypes.STRING
    }
 },{

 })

 