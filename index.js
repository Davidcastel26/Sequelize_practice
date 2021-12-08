const {Sequelize, DataTypes} = require('sequelize');


// connect into a db 
 const sequelize =  new Sequelize('postgres://davidcastellanos:@localhost:5432/seq')

 //to confirm that you were able to conect with the local host
 sequelize.authenticate().then(()=>console.log('success')).catch(e=>console.log(e));

//  define(modelName, attributes, options)
// if the modelName is using upperCase we'll need to use "name"
//but if the modelName is in lowerCase we do not need to use ""
 const Player = sequelize.define('Player',{
     //a serail primary key number will be the one who's is automatically created by the id since we did not set as default
    firstName:{
        type: DataTypes.STRING
    },
    lastName:{
        type: DataTypes.STRING
    }
 },{
    //  if we do not want to get the colums (CREATE_AT & UPDATE_AT) We could set timestamps as false or true if we would like to get it
    timestamps: true,//false
    //if we would like to set our owns names we could do as we are doing right below \\ seting the name with -> ''
    createdAt: 'Created',
    //and we can chouse if one colum will be at the table or not like we are doing right below
    updatedAt: false
 });

 const Team = sequelize.define('Team',{
    code:{
        type:DataTypes.UUID,
        primaryKey: true
    },
    name:{
        type:DataTypes.STRING
    }
 },{

 });

sequelize.sync({force:true}); 