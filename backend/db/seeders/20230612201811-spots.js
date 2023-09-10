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
        description: 'A perfectly cromulent place to stay.',
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
        description: 'Have a gay old time at this rustic chalet.',
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
        description: 'If nautical nonsense be something you wish, then book a stay at this underwater paradise.',
        price: 200
      },
      {
        ownerId: 4,
        address: '2010 Adventure Road',
        city: 'Grass Lands',
        state: 'CK',
        country: 'Ooo',
        lat: 46,
        lng: 96,
        name: 'Magical tree house',
        description: 'This gorgeous arboreal fort includes a living room, a bedroom, a kitchen, a pond, a well, a bathroom, a chicken coop, a treasure room, an attic, a storage cave/garage, a secret place, and a wide look-out view.',
        price: 100
      },
      {
        ownerId: 4,
        address: '107 Pokey Oaks South',
        city: 'Townsville',
        state: 'CN',
        country: 'USA',
        lat: 46,
        lng: 96,
        name: 'Quaint family home',
        description: 'This cute suburban home boasts multiple bedrooms perfect for a girls night and a fully functional science laboratory.',
        price: 100
      },
      {
        ownerId: 4,
        address: 'A113 Main Street',
        city: 'Paradise Falls',
        state: 'PX',
        country: 'Venezuela',
        lat: 46,
        lng: 96,
        name: 'Beautiful aerostatic mobile home',
        description: 'Adventure is out there! Come find it during a stay at this highly mobile spot.',
        price: 150
      },
      {
        ownerId: 4,
        address: '120 Conch Street',
        city: 'Bikini Bottom',
        state: 'OC',
        country: 'USA',
        lat: 46,
        lng: 96,
        name: 'Rugged lithic pad',
        description: "Simple single-family dwelling perfect for those who wanna get closer to nature.",
        price: 50
      },
      {
        ownerId: 4,
        address: '122 Conch Street',
        city: 'Bikini Bottom',
        state: 'OC',
        country: 'USA',
        lat: 46,
        lng: 96,
        name: 'Moai-inspired home in friendly neighborhood',
        description: "You'll find absolutely no annoying neighbors during a nice relaxing stay at this beautiful underwater tribute to Easter Island.",
        price: 175
      },
      {
        ownerId: 4,
        address: '3 Frigid Path',
        city: 'Arendelle',
        state: 'FZ',
        country: 'Norway',
        lat: 46,
        lng: 96,
        name: 'Breath-taking ice palance',
        description: "Take all your worries and let them go while staying at this magnificent castle made of pure ice.",
        price: 200
      },
      {
        ownerId: 4,
        address: '31 Spooner Street',
        city: 'Quahog',
        state: 'RI',
        country: 'USA',
        lat: 46,
        lng: 96,
        name: 'Good old-fashioned home',
        description: "Book a stay at this quaint Rhode Island home complete with 4 bedrooms, garage, enclosed porch, and spacious backyard.",
        price: 150
      },
      {
        ownerId: 4,
        address: '98 Dirt Road',
        city: 'Nearburg',
        state: 'NK',
        country: 'USA',
        lat: 46,
        lng: 96,
        name: 'Rustic two-story country home',
        description: "You and your guests will feel closer than ever after a stay at this unique home.",
        price: 50
      },
      {
        ownerId: 4,
        address: 'The Beach',
        city: 'Beach City',
        state: 'DM',
        country: 'USA',
        lat: 46,
        lng: 96,
        name: 'Breezy beach house',
        description: "Located right by a beutiful sandy beach, this is the perfect place to hang with friends.",
        price: 100
      },
      {
        ownerId: 4,
        address: '618 Gopher Road',
        city: 'Gravity Falls',
        state: 'OR',
        country: 'USA',
        lat: 46,
        lng: 96,
        name: 'Mysterious shack in a curious town',
        description: "Come explore all that Gravity Falls has to offer at this fun and totally not dilapidated or cursed rustic cabin",
        price: 999
      },
      {
        ownerId: 4,
        address: '4040 Vine Street #3',
        city: 'Big City',
        state: 'WA',
        country: 'USA',
        lat: 46,
        lng: 96,
        name: 'Bedroom at Sunset Arms',
        description: "One of a kind top floor bedroom, complete with skylighting and roof access",
        price: 100
      },
      {
        ownerId: 4,
        address: '2308 Maple Drive',
        city: 'City',
        state: 'CA',
        country: 'USA',
        lat: 46,
        lng: 96,
        name: 'Regular house',
        description: "Please enjoy your stay at this spacious home with nearby park access",
        price: 200
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Spots';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      country: { [Op.in]: ['USA', 'Norway'] }
    }, {});
  }
};
