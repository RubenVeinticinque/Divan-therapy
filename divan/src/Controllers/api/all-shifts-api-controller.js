const db = require("../../database/models");

module.exports = {
  allTurns: async (req, res) => {
    const turn = [];
    const page = Number(req.query.page) || 0;
    const pageSize = req.query.pageSize ?? 10;

    try {
      const ma = await db.Medical_appointments.findAndCountAll({
        limit: pageSize,
        offset: page * pageSize,
      });

      for (const i of ma.rows) {
        const userTemp = await db.Users.findByPk(i.dataValues.id_user).catch(
          (error) => {
            console.log(error);
          }
        );
        const therapistTemp = await db.Therapists.findByPk(
          i.dataValues.id_therapist
        ).catch((error) => {
          console.log(error);
        });
        const newTurn = {
          id: i.dataValues.id,
          date: i.dataValues.date,
          time: i.dataValues.time,
          modality: i.dataValues.modality,
          userEmail: userTemp.dataValues.email,
          therapistEmail: therapistTemp.dataValues.email,
        };
        turn.push(newTurn);
      }

      const response = {
        meta: {
          status: 200,
          total: ma.count,
          url: req.originalUrl,
          prevPage: page > 0,
          nextPage: (page + 1) * pageSize < ma.count,
        },
        data: turn,
      };
      res.json(response);
    } catch (error) {
      console.log(error);

      const response = {
        meta: {
          status: 200,
          total: turn.length,
          url: req.originalUrl,
        },
        data: "Error in operation",
      };
      return res.json(response);
    }
  },
};
