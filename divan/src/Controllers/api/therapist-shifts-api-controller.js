const db = require("../../database/models");
const { validationResult } = require("express-validator");

module.exports = {
  therapistShifts: async (req, res) => {
    const body = req.body;
    const errorsValidationsTherapistShifts = validationResult(req);
    const turns = [];

    try {
      if (!errorsValidationsTherapistShifts.isEmpty()) {
        const response = {
          meta: {
            status: 200,
            total: errorsValidationsTherapistShifts.errors.length,
            url: req.originalUrl,
          },
          data: errorsValidationsTherapistShifts.mapped(),
        };

        return res.json(response);
      }

      const year = body.date.getFullYear();
      const month = body.date.getMonth() + 1;
      const date = body.date.getDate() + 1;

      const newDate = `${year}-${
        month.toString().length <= 1 ? "0" + month : month
      }-${date.toString().length <= 1 ? "0" + date : date}`;

      const therapistDb = await db.Therapists.findAll({
        where: {
          email: body.therapistEmail,
        },
      });
      const turnsDb = await db.Medical_appointments.findAll({
        where: {
          date: newDate,
          modality: body.modality,
          id_therapist: therapistDb[0].dataValues.id,
        },
      });

      for (const i of turnsDb) {
        const userDb = await db.Users.findByPk(i.id_user);
        const data = {
          id: i.id,
          date: i.date,
          time: i.time,
          modality: i.modality,
          username: userDb.dataValues.name,
          userLastname: userDb.dataValues.lastname,
          userEmail: userDb.dataValues.email,
        };
        turns.push(data);
      }

      const response = {
        meta: {
          status: 200,
          total: turnsDb.length,
          url: req.originalUrl,
        },
        data: turns,
      };

      return res.json(response);
    } catch (error) {
      console.log(error);

      const response = {
        meta: {
          status: 200,
          total: 0,
          url: req.originalUrl,
        },
        data: "Error in opeartion",
      };

      return res.json(response);
    }
  },
};
