const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Game extends Model {}

Game.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    genre: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    minplayers: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    maxplayers: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    difficulty: {
      /* droplist option maybe? */
      type: DataTypes.STRING,
      allowNull: true,
    },
    ages: {
      /* droplist option maybe: all ages 6+ 10+ 13+ mature */
      type: DataTypes.STRING,
      allowNull: true,
    },
    playtime: {
      /* droplist option maybe? */
      type: DataTypes.INTEGER,
      allowNull: true,
    },
   //  comment: {
   //    type: DataTypes.STRING,
   //    allowNull: false,
   //  },
    userID: {
      type: DataTypes.INTEGER,
      references: {
        model: "user",
        key: "id",
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "game",
  }
);

module.exports = Game;
