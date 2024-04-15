const db = require("../../database/models");
const { validationResult } = require("express-validator");

module.exports = {
  sessionHoursEdit: async (req, res) => {
    const body = req.body;
    const validationsErrors = validationResult(req);

    try {
      if (!validationsErrors.isEmpty()) {
        const response = {
          meta: {
            status: 200,
            total: validationsErrors.errors.length,
            url: req.originalUrl,
          },
          data: validationsErrors.mapped(),
        };

        return res.json(response);
      } else {
        const sessionsHoursDb = await db.Session_hours.findByPk(
          body.search
        ).catch((error) => {
          console.log(error);
        });

        if (sessionsHoursDb) {
          const newSessionHours = {
            id: sessionsHoursDb.dataValues.id,
            session_hours: sessionsHoursDb.dataValues.session_hours,
          };

          const response = {
            meta: {
              status: 200,
              total: 0,
              url: req.originalUrl,
            },
            data: newSessionHours,
          };

          return res.json(response);
        } else {
          const response = {
            meta: {
              status: 200,
              total: 0,
              url: req.originalUrl,
            },
            data: "Session hour not found",
          };

          return res.json(response);
        }
      }
    } catch (error) {
      console.log(error);

      const response = {
        meta: {
          status: 200,
          total: validationsErrors.errors.length,
          url: req.originalUrl,
        },
        data: "Error in operation",
      };

      return res.json(response);
    }
  },
};
