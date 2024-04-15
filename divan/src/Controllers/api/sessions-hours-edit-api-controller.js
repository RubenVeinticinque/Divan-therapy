const db = require("../../database/models");
const { validationResult } = require("express-validator");

module.exports = {
  sessionHoursUpdate: async (req, res) => {
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
        const newSessionHours = {
          session_hours: body.session_hours,
        };

        const sessionHoursUpdate = await db.Session_hours.update(
          { ...newSessionHours },
          { where: { id: 1 } }
        ).catch((error) => {
          console.log(error);
        });

        const response = {
          meta: {
            status: 200,
            total: 1,
            url: req.originalUrl,
          },
          data: "Session hour update",
        };

        return res.json(response);
      }
    } catch (error) {
      console.log(error);

      const response = {
        meta: {
          status: 200,
          total: 1,
          url: req.originalUrl,
        },
        data: "Error in operation",
      };

      return res.json(response);
    }
  },
};
