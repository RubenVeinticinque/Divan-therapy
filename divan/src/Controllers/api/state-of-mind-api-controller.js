const db = require("../../database/models");

module.exports = {
  stateOfMind: async (req, res) => {
    const body = req.body;

    try {
      const date = new Date();
      const dateCreated =
        date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
      const timeCreated =
        date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();

      const moods = {
        date: dateCreated,
        time: timeCreated,
        mood: body.moods,
      };

      const moodCreate = await db.Moods.create({ ...moods }).catch((error) => {
        console.log(error);
      });
      const userDb = await db.Users.findAll({
        where: { email: body.userEmail },
      }).catch((error) => {
        console.log(error);
      });
      const moodUser = {
        id_mood: moodCreate.dataValues.id,
        id_user: userDb[0].dataValues.id,
      };

      const moodsUsersCreate = await db.Moods_users.create({
        ...moodUser,
      }).catch((error) => {
        console.log(error);
      });

      const response = {
        meta: {
          status: 200,
          total: 1,
          url: req.originalUrl,
        },
        data: "Created state of mind",
      };
      return res.status(200).json(response);
    } catch (error) {
      console.log(error);

      const response = {
        meta: {
          status: 200,
          total: 1,
          url: req.originalUrl,
        },
        data: "Uncreated state of mind",
      };
      return res.status(200).json(response);
    }
  },
};
