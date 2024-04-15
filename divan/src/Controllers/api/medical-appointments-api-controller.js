const db = require("../../database/models");

module.exports = {
  medicalApointments: async (req, res) => {
    let datetime;
    const body = req.body;

    const date =
      body.datetime.slice(6, 10) +
      "-" +
      body.datetime.slice(3, 5) +
      "-" +
      body.datetime.slice(0, 2);
    const time = body.datetime.slice(11) + ":00";

    try {
      const therapistDb = await db.Therapists.findAll({
        where: { email: body.email },
      }).catch((error) => console.log(error));

      const medicalAppointmentsDb = await db.Medical_appointments.findAll({
        where: {
          date: date,
          time: time,
          id_therapist: therapistDb[0].dataValues.id,
        },
      }).catch((error) => console.log(error));

      if (medicalAppointmentsDb.length > 0) {
        datetime = {
          date: medicalAppointmentsDb[0].dataValues.date,
          time: medicalAppointmentsDb[0].dataValues.time.slice(0, 5),
        };
      }

      const response = {
        meta: {
          status: 200,
          total: medicalAppointmentsDb.length > 0 ? 1 : 0,
          url: req.originalUrl,
        },
        data: medicalAppointmentsDb.length > 0 ? datetime : [],
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
        data: "Error in operation",
      };
      return res.json(response);
    }
  },
};
