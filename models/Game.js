// required dependencies
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

// game model to organize the shelf before table gets flipped
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
    minplayers: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    maxplayers: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    difficulty: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    ages: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    playtime: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    // future enhancement to allow users to put in specific commentary judging the game on the shelf
    // comment: {
    //   type: DataTypes.STRING,
    //   allowNull: false,
    // },
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
