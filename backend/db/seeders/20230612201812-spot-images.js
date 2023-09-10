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
        url: 'https://static.wikia.nocookie.net/flinstones/images/0/01/Flintstone_Home_-_Ladies%27_Night_at_the_Lodge_-_The_Flintstones.jpg',
        preview: true
      },
      {
        spotId: 2,
        url: 'https://www.realtor.com/wp-content/uploads/2015/09/11802652_851167121633815_4659965730943563884_o.jpg',
        preview: false
      },
      {
        spotId: 2,
        url: 'https://lostmediawiki.com/w/images/thumb/9/94/Flintstones_2013_4.jpeg/729px-Flintstones_2013_4.jpeg',
        preview: false
      },
      {
        spotId: 3,
        url: 'https://static.wikia.nocookie.net/crossovia/images/e/e4/Spongebob-pineapple-house.webp',
        preview: true
      },
      {
        spotId: 3,
        url: 'https://i.pinimg.com/474x/86/4b/80/864b8017cfbbff1a2554b89918df514f.jpg',
        preview: false
      },
      {
        spotId: 3,
        url: 'https://i.pinimg.com/originals/bf/68/66/bf686658c7a3a826a8152ea51e4a88fb.gif',
        preview: false
      },
      {
        spotId: 3,
        url: 'https://www.spriters-resource.com/resources/sheets/150/153352.png',
        preview: false
      },
      {
        spotId: 3,
        url: 'https://static.wikia.nocookie.net/spongebob/images/4/4f/Sleepy_Time_032.png',
        preview: false
      },
      {
        spotId: 4,
        url: 'https://static.wikia.nocookie.net/adventuretimewithfinnandjake/images/9/9f/TreeHouseINT.png',
        preview: true
      },
      {
        spotId: 4,
        url: 'https://i.pinimg.com/originals/89/fc/cc/89fccca43accec7535e4f2ae6498922f.jpg',
        preview: false
      },
      {
        spotId: 4,
        url: 'https://cdna.artstation.com/p/assets/images/images/062/652/916/large/ellie-cairns-betterrenders-0015.jpg',
        preview: false
      },
      {
        spotId: 5,
        url: 'https://static.wikia.nocookie.net/warner-bros-entertainment/images/d/df/Professor_Utonium%27s_House.jpeg',
        preview: true
      },
      {
        spotId: 5,
        url: 'https://static.wikia.nocookie.net/powerpuff/images/9/9c/Vlcsnap-2015-09-01-22h34m32s223.png',
        preview: false
      },
      {
        spotId: 5,
        url: 'https://static.wikia.nocookie.net/powerpuff/images/8/82/Utonium_residence_-_Living_Room.PNG',
        preview: false
      },
      {
        spotId: 5,
        url: 'https://static.wikia.nocookie.net/powerpuff/images/9/9a/Utonium_residence_-_Utonium%27s_Room.PNG',
        preview: false
      },
      {
        spotId: 5,
        url: 'https://static.wikia.nocookie.net/powerpuff/images/0/03/Utonium_residence_-_Utonium%27s_Lab.PNG',
        preview: false
      },
      {
        spotId: 6,
        url: 'https://i.ytimg.com/vi/X1nM__RkMP4/maxresdefault.jpg',
        preview: true
      },
      {
        spotId: 6,
        url: 'https://static.wikia.nocookie.net/disney/images/4/40/Carl%27s_house_New.jpg',
        preview: false
      },
      {
        spotId: 6,
        url: 'https://www.wired.com/images_blogs/wiredscience/2009/05/pixar-up-frame1.jpg',
        preview: false
      },
      {
        spotId: 6,
        url: 'https://static.wikia.nocookie.net/disney-x/images/5/50/Paradise_Falls.jpg',
        preview: false
      },
      {
        spotId: 7,
        url: "https://static.wikia.nocookie.net/spongebob/images/f/f0/Patrick%27s_house.png",
        preview: true
      },
      {
        spotId: 7,
        url: "https://static.wikia.nocookie.net/spongebob/images/6/6d/PatrickHouseOpenedStock.png",
        preview: false
      },
      {
        spotId: 7,
        url: "https://pbs.twimg.com/media/DbttasKX4AA5gYg.jpg",
        preview: false
      },
      {
        spotId: 7,
        url: "https://static.wikia.nocookie.net/spongebob/images/8/8f/Pat_the_Horse_001.png",
        preview: false
      },
      {
        spotId: 7,
        url: "https://pbs.twimg.com/media/Dg4krO_UcAEcVzQ.jpg",
        preview: false
      },
      {
        spotId: 8,
        url: "https://static.wikia.nocookie.net/spongebobgalaxy/images/2/23/Squidwards_House.png",
        preview: true
      },
      {
        spotId: 8,
        url: "https://static.wikia.nocookie.net/spongebob/images/3/3e/Enchanted_Tiki_Dreams_004.png",
        preview: false
      },
      {
        spotId: 8,
        url: "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/c2047868-eb3f-45a9-84ac-a12510bfedd9/dg0h1zx-b3e5b87b-36f9-4628-bb7e-7023fa828636.png/v1/fill/w_1131,h_707,q_70,strp/squidwards_bedroom__by_dracoawesomeness_dg0h1zx-pre.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9ODAwIiwicGF0aCI6IlwvZlwvYzIwNDc4NjgtZWIzZi00NWE5LTg0YWMtYTEyNTEwYmZlZGQ5XC9kZzBoMXp4LWIzZTViODdiLTM2ZjktNDYyOC1iYjdlLTcwMjNmYTgyODYzNi5wbmciLCJ3aWR0aCI6Ijw9MTI4MCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.mNF7f2_JS1LnooeiRTNb8eIZ3AVD24I9Sluw5ODba2c",
        preview: false
      },
      {
        spotId: 8,
        url: "https://i.imgur.com/cR5W6f5.jpg",
        preview: false
      },
      {
        spotId: 8,
        url: "https://64.media.tumblr.com/e9d54b2ebc2723623d47c771028c0ee7/tumblr_pykg36MqW51wbov75o2_400.jpg",
        preview: false
      },
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
