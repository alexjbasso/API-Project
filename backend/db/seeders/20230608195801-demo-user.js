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
        email: 'fred@email.com',
        username: 'Fred',
        hashedPassword: bcrypt.hashSync('password'),
        firstName: 'Fred',
        lastName: 'Flintstone'
      },
      {
        email: 'pops@email.com',
        username: 'Pops',
        hashedPassword: bcrypt.hashSync('password'),
        firstName: 'Pops',
        lastName: 'Maellard'
      },
      {
        email: 'peter@email.com',
        username: 'Peter',
        hashedPassword: bcrypt.hashSync('password'),
        firstName: 'Peter',
        lastName: 'Griffin'
      },
      {
        email: 'patrick@email.com',
        username: 'Patrick',
        hashedPassword: bcrypt.hashSync('password'),
        firstName: 'Patrick',
        lastName: 'Star'
      },
      {
        email: 'catdog@email.com',
        username: 'CatDog',
        hashedPassword: bcrypt.hashSync('password'),
        firstName: 'Cat',
        lastName: 'and Dog'
      },
      {
        email: 'elsa@email.com',
        username: 'elsa',
        hashedPassword: bcrypt.hashSync('password'),
        firstName: 'Queen Elsa',
        lastName: 'of Arendelle'
      },
      {
        email: 'squidward@email.com',
        username: 'Squidward',
        hashedPassword: bcrypt.hashSync('password'),
        firstName: 'Squidward',
        lastName: 'Tentacles'
      },
      {
        email: 'carl@email.com',
        username: 'Carl',
        hashedPassword: bcrypt.hashSync('password'),
        firstName: 'Carl',
        lastName: 'Fredricksen'
      },
      {
        email: 'professor@email.com',
        username: 'Professor',
        hashedPassword: bcrypt.hashSync('password'),
        firstName: 'Professor',
        lastName: 'Utonium'
      },
      {
        email: 'steven@email.com',
        username: 'Steven',
        hashedPassword: bcrypt.hashSync('password'),
        firstName: 'Steven',
        lastName: 'Universe'
      },
      {
        email: 'arnold@email.com',
        username: 'Arnold',
        hashedPassword: bcrypt.hashSync('password'),
        firstName: 'Arnold',
        lastName: 'Shortman'
      },
      {
        email: 'stanley@email.com',
        username: 'Stanley',
        hashedPassword: bcrypt.hashSync('password'),
        firstName: 'Stanley',
        lastName: 'Pines'
      },
      {
        email: 'finn@email.com',
        username: 'Finn',
        hashedPassword: bcrypt.hashSync('password'),
        firstName: 'Finn',
        lastName: 'The Human'
      },
      {
        email: 'Homer@email.com',
        username: 'Homer',
        hashedPassword: bcrypt.hashSync('password'),
        firstName: 'Homer',
        lastName: 'Simpson'
      },
      {
        email: 'spongebob@email.com',
        username: 'SpongeBob',
        hashedPassword: bcrypt.hashSync('password'),
        firstName: 'SpongeBob',
        lastName: 'SquarePants'
      },
      {
        email: 'bugs@email.com',
        username: 'Bugs',
        hashedPassword: bcrypt.hashSync('password'),
        firstName: 'Bugs',
        lastName: 'Bunny'
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Users';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      email: { [Op.substring]: ['@'] }
    }, {});
  }
};
