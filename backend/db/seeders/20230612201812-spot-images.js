'use strict';
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'SpotImages';
    return queryInterface.bulkInsert(options, [
      {
        spotId: 1,
        url: '#1a',
        preview: true
      },
      {
        spotId: 1,
        url: '#1b',
        preview: false
      },
      {
        spotId: 1,
        url: '#1c',
        preview: false
      },
      {
        spotId: 2,
        url: '#2a',
        preview: false
      },
      {
        spotId: 2,
        url: '#2b',
        preview: true
      },
      {
        spotId: 2,
        url: '#2c',
        preview: false
      },
      {
        spotId: 3,
        url: '#3a',
        preview: false
      },
      {
        spotId: 3,
        url: '#3b',
        preview: false
      },
      {
        spotId: 3,
        url: '#3c',
        preview: true
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'SpotImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      url: { [Op.substring]: ['#'] }
    }, {});
  }
};
