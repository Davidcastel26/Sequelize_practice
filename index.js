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

server.get('/player/:id', async (req, res)=>{
    const {id} = req.params;
    try {
        //lookin by getting the primary key
        const player = await Player.findByPk(id);
        res.json(player ? player : 'There is no one here with that id please call 911 ASAP')

    } catch (error) {
        res.send(error)
    }
})

// server.get('player/findOrCreate', async (req, res)=>{
//     const {firstName, lastName, userName, season, country} = req.body;
//     try{
//         const [player, created] = await Player.findOrCreate({
//             where:{userName: userName},
//             defaults:{
//                 firstName,
//                 lastName,
//                 userName,
//                 season,
//                 country
//             }
//         })
//         res.json({created:created,player})
//     }catch(err){
//         console.log(err);
//     }
// })


server.put('player/:name', async(req,res)=>{
    const {name} = req.params;
    const player = await Player.update({
        firstName:'david'
    },{
        where:{
            firstName: name
        }
    })
    res.send(player)
})

server.delete('/player/:name', async(req,res)=>{
    // const jane = await User.create({name:"Jane"});
    // await jane.destroy()
    let {name} = req.params;
    const player = await Player.destroy({
        where:{firstName:name}
    })
    res.send(player)
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


QUERIES
-finders

const instance = await model.findByPk(4); // null if there is nothing in there

const instance = await Model.findOne({
    where:{name:'Dave'}
}); // null if is unable to find it

const [instance, created]= await Model.findOrCreate({
    where: {name:'Goku'},
    defaults:{
        gender:'M',
        race:'Saiyan'
    }
});




OPERATORS

//-- BASICS --
[Op.eq]: 3      // === 3
[Op.ne]: 20     // != 20
[Op.is]: null   // IS NULL
[Op.not]:true   // IS NOT NULL

//-- Number comparasions --
[Op.gt]: 6              // > 6
[Op.lt]: 10             // < 10
[Op.between]:[6,10]     // BETWEEN 6 AND 10
[Op.notBetween]:[11,15] // NOT BETWEEN 11 AND 15

//-- Number comparasions --
[Op.in]: 6              // IN[1,2]
[Op.notIn]: 10          // NOT IN [1,2]


UPDATE

await User.update({ transformation: 'SS1},(
    where:{
        name:'Goku'
    }
))

*/