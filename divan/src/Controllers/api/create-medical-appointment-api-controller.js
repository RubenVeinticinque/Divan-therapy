const db = require("../../database/models");

module.exports = {
  createMedicalAppointment: async (req, res) => {
    const body = req.body;

    try {
      const therapistDb = await db.Therapists.findAll({
        where: { email: body.therapist },
      }).catch((error) => console.log(error));

      if (therapistDb) {
        const newMedicalAppointment = {
          date: body.date,
          time: body.time,
          modality: body.modality ? "En línea" : "Presencial",
          id_user: body.userLogged,
          id_therapist: therapistDb[0].dataValues.id,
        };

        const createMedicalAppointment = await db.Medical_appointments.create({
          ...newMedicalAppointment,
        }).catch((error) => console.log(error));

        const response = {
          meta: {
            status: 200,
            url: req.originalUrl,
          },
          data: "Created medical appointment",
        };

        return res.json(response);
      } else {
        const response = {
          meta: {
            status: 200,
            url: req.originalUrl,
          },
          data: "Error creating medical appointment",
        };

        return res.json(response);
      }
    } catch (error) {
      console.log(error);
      const response = {
        meta: {
          status: 200,
          url: req.originalUrl,
        },
        data: "Error creating medical appointment",
      };

      return res.json(response);
    }
  },
};
