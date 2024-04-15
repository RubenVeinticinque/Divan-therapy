const db = require("../../database/models");

module.exports = {
  sessionHours: async (req, res) => {
    const id = 1;
    try {
      const sessionHoursDb = await db.Session_hours.findByPk(id).catch(
        (error) => console.log(error)
      );
      const response = {
        meta: {
          status: 200,
          total: id,
          url: req.originalUrl,
        },
        data: sessionHoursDb,
      };

      res.json(response);
    } catch (error) {
      console.log(error);
    }
  },
};
