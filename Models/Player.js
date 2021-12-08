const {DataTypes} = require('sequelize')

//  define(modelName, attributes, options)
// if the modelName is using upperCase we'll need to use "name"
//but if the modelName is in lowerCase we do not need to use ""
// const Player = sequelize.define('Player',{
module.exports = sequelize => {
    sequelize.define('Player',
    {
    //a serail primary key number will be the one who's is automatically created by the id since we did not set as default
   firstName:{
       type: DataTypes.STRING
   },
   lastName:{
       type: DataTypes.STRING
   },
   userName:{
       type: DataTypes.STRING,
       allowNull: false,//NOT NULL
       unique: true, //UNIQUE

   },
   birthday:{
       type: DataTypes.DATEONLY, //MM-DD-YYYY
       defaultValue: DataTypes.NOW // data from actual day
   },
   age:{
       type: DataTypes.INTEGER
   },
   city:{
       type: DataTypes.STRING
   },
   fullName:{
       // we won't have the colum fullname
       //it's a data who is calling by other data
       type: DataTypes.VIRTUAL,
       get(){
           return`${this.firstName} ${this.lastName}`
       }
   },
   country:{
       //accept only the elemtn into the ENUM
       type: DataTypes.ENUM('Guatemala','El Salvador','Belice','Nicaragua','Panama','Costa Rica','Honduras')
   }
    },
    {
        //  if we do not want to get the colums (CREATE_AT & UPDATE_AT) We could set timestamps as false or true if we would like to get it
        timestamps: true,//false
        //if we would like to set our owns names we could do as we are doing right below \\ seting the name with -> ''
        createdAt: 'Created',
        //and we can chouse if one colum will be at the table or not like we are doing right below
        updatedAt: false
    })
}