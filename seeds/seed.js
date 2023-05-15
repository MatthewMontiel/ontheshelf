const sequelize = require('../config/connection');
const { User, GameShelf } = require('../models');

const userData = require('./userData.json');
// const projectData = require('./projectData.json');
// put game stuff here

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });
// const gameshelf = await Gameshelf(gameshelf-data)
  process.exit(0);
};

seedDatabase();
