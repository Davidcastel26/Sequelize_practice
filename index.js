const express = require('express');
const morgan = require('morgan')
const {db, Player, Team} = require('./db')

// db.sync({force:false}); 

const server = express();

server.use(express.json())
server.use(morgan('dev'))

server.listen(3000, () => {
    console.log('sever listing on port 3000')
    db.sync({force:true})
})