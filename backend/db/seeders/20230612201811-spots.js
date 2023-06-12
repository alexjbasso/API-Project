'use strict';
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Spots';
    return queryInterface.bulkInsert(options, [
      {
        ownerId: 1,
        address: '101 Main Street',
        city: 'Juneau',
        state: 'Alaska',
        country: 'USA',
        lat: 1,
        lng: 1,
        name: 'Test 1',
        description: 'Test 1 description',
        price: 101
      },
      {
        ownerId: 2,
        address: '102 Main Street',
        city: 'Nashville',
        state: 'Tennessee',
        country: 'USA',
        lat: 2,
        lng: 2,
        name: 'Test 2',
        description: 'Test 2 description',
        price: 102
      },
      {
        ownerId: 3,
        address: '103 Main Street',
        city: 'Fargo',
        state: 'North Dakota',
        country: 'USA',
        lat: 3,
        lng: 3,
        name: 'Test 3',
        description: 'Test 3 description',
        price: 103
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Spots';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      country: { [Op.in]: ['USA'] }
    }, {});
  }
};
