const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const { v4: uuidv4 } = require('uuid');

class Shelf extends Model {};

// copied logic still needs adjusting

User.init(
   {



     id: uuidv4(),
     name: {
       type: DataTypes.STRING,
       allowNull: false,
     },
     email: {
       type: DataTypes.STRING,
       allowNull: false,
       unique: true,
       validate: {
         isEmail: true,
       },
     },
     password: {
       type: DataTypes.STRING,
       allowNull: false,
       validate: {
         len: [8, 23]
       },
     },
   },
   {

      // VINCENT DIG INTO BCRYPT

     hooks: {
       beforeCreate: async (newUserData) => {
         newUserData.password = await bcrypt.hash(newUserData.password, 10);
         return newUserData;
       },
       beforeUpdate: async (updatedUserData) => {
         updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
         return updatedUserData;
       },
     },

     // timestamps? underscored?

     sequelize,
     timestamps: false,
     freezeTableName: true,
     underscored: true,
     modelName: 'user',
   }
 );