const express = require('express');
const morgan = require('morgan')
const {db, Player, Team} = require('./db')

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