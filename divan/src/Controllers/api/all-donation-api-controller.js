const db = require("../../database/models");

module.exports = {
  allDonations: async (req, res) => {
    const donations = [];
    const page = Number(req.query.page) || 0;
    const pageSize = req.query.pageSize ?? 10;

    try {
      const donationsDb = await db.Donations.findAndCountAll({
        limit: pageSize,
        offset: page * pageSize,
      });

      for (const i of donationsDb.rows) {
        const newDonation = {
          id: i.dataValues.id,
          date: i.dataValues.date,
          time: i.dataValues.time,
          donation: i.dataValues.donation,
          userEmail: i.dataValues.donor_email,
        };
        donations.push(newDonation);
      }

      const response = {
        meta: {
          status: 200,
          total: donationsDb.count,
          url: req.originalUrl,
          prevPage: page > 0,
          nextPage: (page + 1) * pageSize < donationsDb.count,
        },
        data: donations,
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
