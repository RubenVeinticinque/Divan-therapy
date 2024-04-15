const db = require("../../database/models");

module.exports = {
  allMoods: async (req, res) => {
    const moods = [];
    const page = Number(req.query.page) || 0;
    const pageSize = req.query.pageSize ?? 10;

    try {
      const moodsDb = await db.Moods.findAndCountAll({
        limit: pageSize,
        offset: page * pageSize,
      });

      for (const i of moodsDb.rows) {
        const userTemp = await db.Moods_users.findAll({
          where: {
            id_mood: i.dataValues.id,
          },
        }).catch((error) => {
          console.log(error);
        });
        if (userTemp[0]) {
          const userDb = await db.Users.findByPk(
            userTemp[0].dataValues.id_user
          ).catch((error) => {
            console.log(error);
          });
          const newMood = {
            id: i.dataValues.id,
            date: i.dataValues.date,
            time: i.dataValues.time,
            mood: i.dataValues.mood,
            userEmail: userDb.dataValues.email,
          };
          moods.push(newMood);
        }
      }

      const response = {
        meta: {
          status: 200,
          total: moodsDb.count,
          url: req.originalUrl,
          prevPage: page > 0,
          nextPage: (page + 1) * pageSize < moodsDb.count,
        },
        data: moods,
      };
      res.json(response);
    } catch (error) {
      console.log(error);

      const response = {
        meta: {
          status: 200,
          total: moods.length,
          url: req.originalUrl,
        },
        data: "Error in operation",
      };
      return res.json(response);
    }
  },
};
