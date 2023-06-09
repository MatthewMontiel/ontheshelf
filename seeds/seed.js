// seeding js file
const sequelize = require("../config/connection");
const { User, Game } = require("../models");
const userData = require("./userData.json");
const gameData = require("./gameData.json");
// function to pre seed models into data base
const seedDatabase = async () => {
  await sequelize.sync({ force: true });
  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });
  for (const game of gameData) {
    await Game.create({
      ...game,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }
  process.exit(0);
};
// call function
seedDatabase();
