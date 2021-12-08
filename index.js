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
        res.json(newPlayer)
    }catch(e){
        console.log(e);
    }
})

server.listen(3000, () => {
    console.log('sever listing on port 3000')
    db.sync({force:true})
})