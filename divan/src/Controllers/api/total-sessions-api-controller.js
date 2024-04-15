const db = require("../../database/models");

module.exports = {
  totalSessions: async (req, res) => {
    let totalSessions = 0;
    try {
      const totalSessionsDb = await db.Therapists.findAll().catch((error) => {
        console.log(error);
      });

      for (const totalSession of totalSessionsDb) {
        totalSessions += totalSession.total_sessions;
      }

      const response = {
        meta: {
          status: 200,
          total: totalSessions,
          url: req.originalUrl,
        },
        data: totalSessions,
      };

      res.json(response);
    } catch (error) {
      console.log(error);
    }
  },
};
