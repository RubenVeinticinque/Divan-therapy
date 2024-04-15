const db = require("../../database/models");

module.exports = {
  allPrices: async (req, res) => {
    const price = [];

    try {
      const pricesDb = await db.Prices.findAll().catch((error) => {
        console.log(error);
      });

      for (let i = 0; i < pricesDb.length; i++) {
        const newPrice = {
          id: pricesDb[i].dataValues.id,
          price: pricesDb[i].dataValues.price,
        };
        price.push(newPrice);
      }
      const response = {
        meta: {
          status: 200,
          total: price.length,
          url: req.originalUrl,
        },
        data: price,
      };
      return res.json(response);
    } catch (error) {
      console.log(error);

      const response = {
        meta: {
          status: 200,
          total: price.length,
          url: req.originalUrl,
        },
        data: "Error in operation",
      };
      return res.json(response);
    }
  },
};
