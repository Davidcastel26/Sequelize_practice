const express = require('express');
const morgan = require('morgan')
const {db, Player, Op, Team} = require('./db')
//Op -> and or eq 


// db.sync({force:false}); 

const server = express();

server.use(express.json())
server.use(morgan('dev'))

server.post('/players', async(req,res)=>{
    const {firstName, lastName, userName, age, city, season, country} = req.body;

    try{
        const newPlayer= await Player.create({
            firstName,
            lastName,
            userName,
            age,
            city,
            season,
            country
        })

        console.log(newPlayer.toJSON());
        res.json(newPlayer)
    }catch(e){
        console.log(e);
    }
})

server.get('/players', async (req, res)=>{
    const {userName, lastName} = req.query;
    try {
        if(userName && lastName){
            //we are saying here that give me only the data from the usernama that it is into the db
            const players = await Player.findAll(
                {   
                    // SELECT firstName, birthday, userName FROM "Players" WHERE firstName = name AND lastName=lastName;
                    // here we are setting the attributes from the player, only the attributes from here will show up in the request
                    attributes:['firstName','birthday','userName'],
                    //get the userName 
                    where:{
                        [Op.and]:[
                            {firstName:userName},
                            {lastName:lastName}
                        ]
                    }
                } 
            ) 
            res.send(players.length > 0 ? players:'there is no one here')
        }else{
            //we are saying here, give me all the players in the db
            const players = await Player.findAll();
            res.send(players.length > 0 ? players: 'There are no players  ')
        } 

   } catch (error) {
       console.log(error);
   }

})

server.delete('/player', async(req,res)=>{
    // const jane = await User.create({name:"Jane"});
    // await jane.destroy()
}) 

server.listen(3000, () => {
    console.log('sever listing on port 3000')
    db.sync({force:false})
})


/*

const instancias = await Model.findAll();

//SELECT foo, bar FROM ....
Model.findAll({
    attributes:['foo',]
})

//SELECT foo, bar as baz FROM ....
Model.findAll({
    attirbutes:['foo',['bar','baz']]
})

//Exclude some attribute
Model.findAll({
    attributes: {exclude:['baz']}
})
---------------------------------------------------------

const instances = Model.findAll({
    where:{
        clothe:'orange'
        status:'good'
    }
})
---------------------------------------------------------

const {Op} = require{"sequelize"};
Model.findAll({
    where:{
        [Op.and]:[
            {clothe: 'orange'},
            {status:'good'}
        ]
    }
})


*/