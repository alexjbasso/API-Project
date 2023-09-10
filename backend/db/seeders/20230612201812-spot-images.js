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
        url: 'https://i.imgur.com/ZH5pc88.jpg',
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
        url: 'https://i.imgur.com/SwVMfv0.jpg',
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
        spotId: 2,
        url: 'https://m.media-amazon.com/images/M/MV5BYTBmNThlYTAtYjc2Mi00OWEwLThlZmUtYzRmYjFjZWFiYWViXkEyXkFqcGdeQXVyODUyNjgzNTY@._V1_.jpg',
        preview: false
      },
      {
        spotId: 2,
        url: 'https://i.imgur.com/SnAc9Q9.jpeg',
        preview: false
      },
      {
        spotId: 3,
        url: 'https://i.imgur.com/J9ozxrJ.jpg',
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
        url: 'https://i.imgur.com/sX07YK6.jpg',
        preview: false
      },
      {
        spotId: 4,
        url: 'https://i.imgur.com/OIuNHJu.jpg',
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
        spotId: 4,
        url: 'https://i.pinimg.com/originals/4e/dc/f0/4edcf07d541d2c65bc1cf289ec89ba17.jpg',
        preview: false
      },
      {
        spotId: 4,
        url: 'https://pbs.twimg.com/ext_tw_video_thumb/1641779652086865920/pu/img/xCBxuDetcbhAzMhW.jpg',
        preview: false
      },
      // Utonium
      {
        spotId: 5,
        url: 'https://i.imgur.com/vEpFDgv.jpg',
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
      // Frederickson
      {
        spotId: 6,
        url: 'https://static1.colliderimages.com/wordpress/wp-content/uploads/2023/05/up-movie-carls-house-social-feature.jpg',
        preview: true
      },
      {
        spotId: 6,
        url: 'https://i.imgur.com/cDWFA49.jpg',
        preview: false
      },
      {
        spotId: 6,
        url: 'https://www.wired.com/images_blogs/wiredscience/2009/05/pixar-up-frame1.jpg',
        preview: false
      },
      {
        spotId: 6,
        url: 'https://i.imgur.com/1cY8t4s.jpg',
        preview: false
      },
      {
        spotId: 6,
        url: 'https://i.pinimg.com/originals/21/fe/2f/21fe2f2839aac4bad4c4db1f1877fff0.jpg',
        preview: false
      },
      // Star
      {
        spotId: 7,
        url: "https://i.imgur.com/GNNdbWP.jpg",
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
      // Tentacles
      {
        spotId: 8,
        url: "https://i.imgur.com/LyO3Q1O.jpg",
        preview: true
      },
      {
        spotId: 8,
        url: "https://i.imgur.com/aC4asea.jpg",
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
      // Elsa
      {
        spotId: 9,
        url: "http://www.rotoscopers.com/wp-content/uploads/2013/10/1239196_10151914675692184_571540977_o.jpg",
        preview: true
      },
      {
        spotId: 9,
        url: "https://i.ytimg.com/vi/WbcS2epXItI/maxresdefault.jpg",
        preview: false
      },
      {
        spotId: 9,
        url: "https://media1.popsugar-assets.com/files/thumbor/Rf6AefO5F2nAqL1nxDdNni2rGDQ/fit-in/2048xorig/filters:format_auto-!!-:strip_icc-!!-/2020/02/10/917/n/3019466/dca5874d5e41c47fc0cba9.43556459_MCDFROZ_EC03/i/Elsa-ice-palace-changes-color-reflect-her-feelings.jpg",
        preview: false
      },
      {
        spotId: 9,
        url: "https://blenderartists.org/uploads/default/original/4X/2/4/5/245b20d7e312b1656ad7363e191fee4e9adc2dca.jpg",
        preview: false
      },
      {
        spotId: 9,
        url: "https://disneycruiselineblog.com/wp-content/uploads/2013/11/Disney-Frozen-Elsa-Ice-Palace-Chandelier.jpg",
        preview: false
      },
      // Griffin
      {
        spotId: 10,
        url: "https://i.imgur.com/TI9CaQS.jpg",
        preview: true
      },
      {
        spotId: 10,
        url: "https://virtualbackgrounds.site/wp-content/uploads/2022/03/family-guy-living-room.jpg",
        preview: false
      },
      {
        spotId: 10,
        url: "https://pbs.twimg.com/media/EV0rQYpXYAMpWQ6.jpg",
        preview: false
      },
      {
        spotId: 10,
        url: "https://i.ytimg.com/vi/OepbkuCtZmc/maxresdefault.jpg",
        preview: false
      },
      {
        spotId: 10,
        url: "https://i.imgur.com/0kj9WvE.jpg",
        preview: false
      },
      // Catdog
      {
        spotId: 11,
        url: "https://64.media.tumblr.com/e529d8de9c3c54e2435d555df41aa6ef/tumblr_p3r43a0rMN1rvsfh9o2_1280.jpg",
        preview: true
      },
      {
        spotId: 11,
        url: "https://64.media.tumblr.com/e675fa1197e19a7e7c3874c274cc189e/tumblr_p3r43a0rMN1rvsfh9o6_1280.jpg",
        preview: false
      },
      {
        spotId: 11,
        url: "https://64.media.tumblr.com/d3fcb28c61445b4ff63b78b92ecf461b/tumblr_p3r43a0rMN1rvsfh9o1_1280.jpg",
        preview: false
      },
      {
        spotId: 11,
        url: "https://64.media.tumblr.com/42842ffbc3a6d6435c2d1c0fe25115cb/tumblr_p3r43a0rMN1rvsfh9o3_1280.jpg",
        preview: false
      },
      {
        spotId: 11,
        url: "https://64.media.tumblr.com/318966842996a2645773a540d84fa818/tumblr_p3r43a0rMN1rvsfh9o7_1280.jpg",
        preview: false
      },
      // Universe
      {
        spotId: 12,
        url: "https://i.imgur.com/UJ4xx3l.jpeg",
        preview: true
      },
      {
        spotId: 12,
        url: "https://i.imgur.com/anDg8Lc.jpeg",
        preview: false
      },
      {
        spotId: 12,
        url: "https://i.imgur.com/IvXmKxK.jpg",
        preview: false
      },
      {
        spotId: 12,
        url: "https://i.imgur.com/kjUGqG1.jpg",
        preview: false
      },
      {
        spotId: 12,
        url: "https://i.pinimg.com/originals/6a/a5/03/6aa5030169b7ecd7ef52158893c62575.png",
        preview: false
      },
      // Pines
      {
        spotId: 13,
        url: "https://i.imgur.com/ekS7m9w.jpg",
        preview: true
      },
      {
        spotId: 13,
        url: "https://paintbynumberscanvas.com/wp-content/uploads/2020/10/mystery-shack-interior-paint-by-number.jpg",
        preview: false
      },
      {
        spotId: 13,
        url: "https://i.imgur.com/5SEMDWx.jpg",
        preview: false
      },
      {
        spotId: 13,
        url: "https://i.imgur.com/fyB7JLs.jpg",
        preview: false
      },
      {
        spotId: 13,
        url: "https://cdn.80.lv/api/upload/content/aa/images/62a8747598895/widen_1840x0.jpg",
        preview: false
      },
      // Shortman
      {
        spotId: 14,
        url: "https://res.cloudinary.com/sagacity/image/upload/c_crop,h_1679,w_3000,x_0,y_0/c_limit,dpr_auto,f_auto,fl_lossy,q_80,w_1080/HA_1001_03_BG_BoardingHouseExtAcrossTheStreetA_color_x9fd0p.jpg",
        preview: true
      },
      {
        spotId: 14,
        url: "https://i.imgur.com/mhqF491.jpg",
        preview: false
      },
      {
        spotId: 14,
        url: "https://i.imgur.com/GT1fYLF.jpg",
        preview: false
      },
      {
        spotId: 14,
        url: "https://i.imgur.com/bkFGhfJ.jpg",
        preview: false
      },
      {
        spotId: 14,
        url: "https://i.imgur.com/i2fEWJt.jpg",
        preview: false
      },
      // Pops
      {
        spotId: 15,
        url: "https://i.imgur.com/z5eKDU2.jpg",
        preview: true
      },
      {
        spotId: 15,
        url: "https://i.imgur.com/XvtXPZh.jpg",
        preview: false
      },
      {
        spotId: 15,
        url: "https://i.imgur.com/wtUaUAh.jpg",
        preview: false
      },
      {
        spotId: 15,
        url: "https://i.imgur.com/5OViV5a.jpg",
        preview: false
      },
      {
        spotId: 15,
        url: "https://static.wikia.nocookie.net/theregularshow/images/0/01/S2E11.005_Mr._Maellard%27s_Office.png",
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
