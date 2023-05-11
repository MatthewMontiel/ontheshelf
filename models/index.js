const User = require('./User');
const GameShelf = require('./GameShelf');

// will foreign key work with our use of uuid
User.hasMany(GameShelf, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

GameShelf.belongsTo(User, {
  foreignKey: 'user_id'
});

module.exports = { User, GameShelf };