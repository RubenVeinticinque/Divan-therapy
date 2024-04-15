const db = require("../../database/models");
const { validationResult } = require("express-validator");

module.exports = {
  priceSearchProccess: async (req, res) => {
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
        const priceDb = await db.Prices.findByPk(body.search).catch((error) => {
          console.log(error);
        });

        if (priceDb) {
          const newPrice = {
            id: priceDb.dataValues.id,
            price: priceDb.dataValues.price,
          };
          const response = {
            meta: {
              status: 200,
              total: 0,
              url: req.originalUrl,
            },
            data: newPrice,
          };

          return res.json(response);
        } else {
          const response = {
            meta: {
              status: 200,
              total: 0,
              url: req.originalUrl,
            },
            data: "Price not found",
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
