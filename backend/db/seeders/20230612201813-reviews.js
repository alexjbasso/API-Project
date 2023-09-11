'use strict';
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Reviews';
    return queryInterface.bulkInsert(options, [
      {
        spotId: 12,
        userId: 2,
        review: "Place was dilapidated and I'm pretty sure it's cursed.",
        stars: 1
      },
      {
        spotId: 15,
        userId: 4,
        review: 'Great place to stay and the host is so friendly!',
        stars: 5
      },
      {
        spotId: 14,
        userId: 3,
        review: 'It reminded me of my place but even better!',
        stars: 4
      },
      {
        spotId: 4,
        userId: 1,
        review: 'It rocks!',
        stars: 5
      },
      {
        spotId: 8,
        userId: 12,
        review: 'I swear, the house was like that when I got there.',
        stars: 3
      },
      {
        spotId: 5,
        userId: 13,
        review: 'This place is algebraic!',
        stars: 5
      },
      {
        spotId: 13,
        userId: 10,
        review: 'Hosts were great! Made me bacon pancakes every morning!',
        stars: 4
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Reviews';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      review: { [Op.substring]: ['.', '!'] }
    }, {});
  }
};
