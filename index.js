const {Sequelize} = require('sequelize');
const modelPlayer = require('./Models/Player')
const modelTeam = require('./Models/Team');

// connect into a db 
 const sequelize =  new Sequelize('postgres://davidcastellanos:@localhost:5432/seq'/**we can create an obj here where we can delarte if we would like to get more option */,{
     //options:

     //default
     //---logging: console.log,

     //show aditional infromation more than the query SQL
    //  logging:(...msg) => console.log(msg),
     
     //Disable the loggin
     // logging: false,
 })

 //to confirm that you were able to conect with the local host
 sequelize.authenticate().then(()=>console.log('success')).catch(e=>console.log(e));

 //Tables
 modelPlayer(sequelize);
 modelTeam(sequelize);
 //----------------------

//  let p = Player.findByPk(1);
//  P -> OBJ  => p = {FisrtName, lastNmae, age, .... fullName}
// p.fullName ---> firstName lastaName

console.log(sequelize.models);

 //to create all the models in the db
sequelize.sync({force:true}); 

//apply all the changes needed to a table to engache with the model
// Alter = true: UPDATE / false: DO NOT UPDATE
// Player.sync({alter:true})

//if you would like just create one model follow the sintax below
// Force = true: CREATE / false: DO NOT CREATE
// await Model.sync({force:true})