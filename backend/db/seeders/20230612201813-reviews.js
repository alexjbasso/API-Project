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
        userId: 1,
        review: 'Spot 1 is good',
        stars: 1
      },
      {
        spotId: 2,
        userId: 2,
        review: 'Spot 2 is good',
        stars: 2
      },
      {
        spotId: 3,
        userId: 3,
        review: 'Spot 3 is good',
        stars: 3
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Reviews';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      review: { [Op.in]: ['Spot 1 is good', 'Spot 2 is good', 'Spot 3 is good'] }
    }, {});
  }
};
