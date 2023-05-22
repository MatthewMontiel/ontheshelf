// required dependencies
const User = require("./User");
const Game = require("./Game");

// connecting models
User.hasMany(Game, {
  foreignKey: "userID",
  onDelete: "CASCADE",
});

Game.belongsTo(User, {
  foreignKey: "userID",
});

module.exports = { User, Game };
