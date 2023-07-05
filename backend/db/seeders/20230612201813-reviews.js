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
        spotId: 1,
        userId: 2,
        review: 'Spot 1 is bad',
        stars: 1
      },
      {
        spotId: 1,
        userId: 3,
        review: 'Spot 1 is good',
        stars: 3
      },
      {
        spotId: 2,
        userId: 1,
        review: 'Spot 2 is bad',
        stars: 1
      },
      {
        spotId: 2,
        userId: 3,
        review: 'Spot 2 is good',
        stars: 3
      },
      {
        spotId: 3,
        userId: 1,
        review: 'Spot 3 is bad',
        stars: 1
      },
      {
        spotId: 3,
        userId: 2,
        review: 'Spot 3 is great',
        stars: 5
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Reviews';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      review: { [Op.substring]: ['is'] }
    }, {});
  }
};
