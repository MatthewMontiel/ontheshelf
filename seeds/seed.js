const sequelize = require("../config/connection");
const { User, Game } = require("../models");
const userData = require("./userData.json");
const gameData = require("./gameData.json");

const seedDatabase = async () => {
  await sequelize.sync({ force: true }); //confirm how works true v false

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });
  // check the syntax of game
  for (const game of gameData) {
    await Game.create({
      ...game,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
    process.exit(0);
  }
};

seedDatabase();
