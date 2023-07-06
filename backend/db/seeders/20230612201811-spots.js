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
        address: '742 Evergreen Terrace',
        city: 'Springfield',
        state: 'TV',
        country: 'USA',
        lat: 58,
        lng: 134,
        name: '4 bedroom surburban palace',
        description: 'A perfectly cromulent place to stay',
        price: 100
      },
      {
        ownerId: 2,
        address: '201 Cobblestone Lane',
        city: 'Bedrock',
        state: 'AZ',
        country: 'USA',
        lat: 36,
        lng: 86,
        name: 'Modern Stone Age getaway',
        description: 'Have a gay old time at this rustic chalet',
        price: 150
      },
      {
        ownerId: 3,
        address: '124 Conch Street',
        city: 'Bikini Bottom',
        state: 'OC',
        country: 'USA',
        lat: 46,
        lng: 96,
        name: 'A pineapple under the sea',
        description: 'If nautical nonsense be something you wish, then book a stay at this underwater paradise',
        price: 200
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
