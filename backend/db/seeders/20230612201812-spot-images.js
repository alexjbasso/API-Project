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
        url: 'https://static.wikia.nocookie.net/simpsons/images/6/65/800px-742_Evergreen_Terrace.png',
        preview: true
      },
      {
        spotId: 1,
        url: 'https://i2.wp.com/www.funnymeetingbackgrounds.com/wp-content/uploads/2020/11/Simpsons-Kitchen.jpg',
        preview: false
      },
      {
        spotId: 1,
        url: 'https://cdn.mos.cms.futurecdn.net/CFubit7V5muExqJPkbjRwg.jpg',
        preview: false
      },
      {
        spotId: 1,
        url: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/1ea947e2-92ff-42c8-97d5-48fab39cd849/dff5j0y-83338c6e-c29d-4b42-af9a-029e5de0992d.gif/v1/fill/w_1192,h_670,q_85,strp/homer_simpson_and_marge_simpson_s_pajamas_by_darth19_dff5j0y-pre.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9Njc1IiwicGF0aCI6IlwvZlwvMWVhOTQ3ZTItOTJmZi00MmM4LTk3ZDUtNDhmYWIzOWNkODQ5XC9kZmY1ajB5LTgzMzM4YzZlLWMyOWQtNGI0Mi1hZjlhLTAyOWU1ZGUwOTkyZC5naWYiLCJ3aWR0aCI6Ijw9MTIwMCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.FOiSzUqwW5pvKAXU7mzhx6gmLK9LwrMaumMC9vFp0jM',
        preview: false
      },
      {
        spotId: 1,
        url: 'https://i.pinimg.com/736x/8b/90/cd/8b90cd410795bfdda456eb15943dde1c.jpg',
        preview: false
      },
      {
        spotId: 2,
        url: '',
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
      url: { [Op.substring]: ['.'] }
    }, {});
  }
};
