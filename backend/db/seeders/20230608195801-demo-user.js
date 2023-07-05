'use strict';
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Users';
    return queryInterface.bulkInsert(options, [
      {
        email: 'user1@email.com',
        username: 'User1',
        hashedPassword: bcrypt.hashSync('password'),
        firstName: 'Homer',
        lastName: 'Simpson'
      },
      {
        email: 'user2@email.com',
        username: 'User2',
        hashedPassword: bcrypt.hashSync('password'),
        firstName: 'Fred',
        lastName: 'Flintstone'
      },
      {
        email: 'user3@email.com',
        username: 'User3',
        hashedPassword: bcrypt.hashSync('password'),
        firstName: 'SpongeBob',
        lastName: 'SquarePants'
      },
      {
        email: 'demo@email.com',
        username: 'Demo',
        hashedPassword: bcrypt.hashSync('password'),
        firstName: 'Demo',
        lastName: 'User'
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Users';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      username: { [Op.in]: ['User1', 'User2', 'User3'] }
    }, {});
  }
};
