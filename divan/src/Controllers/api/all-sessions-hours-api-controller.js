const db = require("../../database/models");

module.exports = {
  allSessionsHours: async (req, res) => {
    const sessionsHours = [];

    try {
      const sessionsHoursDb = await db.Session_hours.findAll().catch(
        (error) => {
          console.log(error);
        }
      );
      for (let i = 0; i < sessionsHoursDb.length; i++) {
        const newSessionHour = {
          id: sessionsHoursDb[i].dataValues.id,
          session_hours: sessionsHoursDb[i].dataValues.session_hours + " min",
        };
        sessionsHours.push(newSessionHour);
      }
      const response = {
        meta: {
          status: 200,
          total: sessionsHours.length,
          url: req.originalUrl,
        },
        data: sessionsHours,
      };
      return res.json(response);
    } catch (error) {
      console.log(error);

      const response = {
        meta: {
          status: 200,
          total: sessionsHours.length,
          url: req.originalUrl,
        },
        data: "Error in operation",
      };
      return res.json(response);
    }
  },
};
