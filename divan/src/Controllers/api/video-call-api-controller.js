const db = require("../../database/models");

module.exports = {
  videoCall: async (req, res) => {
    const body = req.body;

    try {
      const dateNow = new Date();
      const year = dateNow.getFullYear().toString();
      const month = (dateNow.getMonth() + 1).toString();
      const date = dateNow.getDate().toString();

      const dateStr = `${year}/${month.length <= 1 ? "0" + month : month}/${
        date.length <= 1 ? "0" + date : date
      }`;

      const dateTime = `${dateNow.getHours()}:00:00`;

      const medicalAppointmentDb = await db.Medical_appointments.findAll({
        where: {
          date: new Date(dateStr),
          time: dateTime,
          modality: "En línea",
        },
      });

      if (medicalAppointmentDb == "") {
        const response = {
          meta: {
            status: 200,
            total: medicalAppointmentDb.length,
            url: req.originalUrl,
          },
          data: "There is no medical appointment",
        };

        return res.json(response);
      } else {
        for (const i of medicalAppointmentDb) {
          if (i.id_user === body.id || i.id_therapist === body.id) {
            const user = await db.Users.findByPk(i.id_user);
            const therapist = await db.Therapists.findByPk(i.id_therapist);

            const response = {
              meta: {
                status: 200,
                total: medicalAppointmentDb.length,
                url: req.originalUrl,
              },
              data: { user: user.email, therapist: therapist.email },
            };

            return res.json(response);
          } else {
            const response = {
              meta: {
                status: 200,
                total: medicalAppointmentDb.length,
                url: req.originalUrl,
              },
              data: "There is no medical appointment",
            };

            return res.json(response);
          }
        }
      }
    } catch (error) {
      console.log(error);

      const response = {
        meta: {
          status: 200,
          total: 0,
          url: req.originalUrl,
        },
        data: "Error of medical appointment",
      };

      return res.json(response);
    }
  },
};
