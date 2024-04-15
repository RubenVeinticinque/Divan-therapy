const db = require("../../database/models");

module.exports = {
  price: async (req, res) => {
    const id = 1;
    try {
      const priceDb = await db.Prices.findByPk(id).catch((error) => {
        console.log(error);
      });
      const response = {
        meta: {
          status: 200,
          total: id,
          url: req.originalUrl,
        },
        data: priceDb,
      };

      res.json(response);
    } catch (error) {
      console.log(error);
    }
  },
};
