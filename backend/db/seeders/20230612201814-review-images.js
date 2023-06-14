'use strict';
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'ReviewImages';
    return queryInterface.bulkInsert(options, [
      {
        reviewId: 1,
        url: '#'
      },
      {
        reviewId: 2,
        url: '#'
      },
      {
        reviewId: 3,
        url: '#'
      },
      {
        reviewId: 4,
        url: '#'
      },
      {
        reviewId: 5,
        url: '#'
      },
      {
        reviewId: 6,
        url: '#'
      },
      {
        reviewId: 7,
        url: '#'
      },
      {
        reviewId: 8,
        url: '#'
      },
      {
        reviewId: 9,
        url: '#'
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'ReviewImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      url: { [Op.in]: ['#'] }
    }, {});
  }
};
