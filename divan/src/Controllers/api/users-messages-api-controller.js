const db = require("../../database/models");
const { validationResult } = require("express-validator");

module.exports = {
  userMessage: async (req, res) => {
    const body = req.body;
    const validationErrors = validationResult(req);

    const errors = Object.keys(validationErrors.mapped());

    try {
      if (!validationErrors.isEmpty()) {
        const response = {
          meta: {
            status: 200,
            total: errors.length,
            url: req.originalUrl,
          },
          data: validationErrors.mapped(),
        };

        return res.json(response);
      } else {
        const date = new Date();

        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();

        let monthStr = month.toString();
        let dayStr = day.toString();

        monthStr = monthStr.length < 2 ? "0" + monthStr : monthStr;
        dayStr = dayStr.length < 2 ? "0" + dayStr : dayStr;

        const message = {
          city_message: body.cities,
          province_message: body.provinces,
          country_message: body.countries,
          date_message: `${year}-${monthStr}-${dayStr}`,
          message: body.description,
          id_user_message: body.id,
        };

        const messageCreate = await db.Messages.create({ ...message }).catch(
          (error) => {
            console.log(error);
          }
        );

        const response = {
          meta: {
            status: 200,
            total: errors.length,
            url: req.originalUrl,
          },
          data: validationErrors.mapped(),
        };

        return res.json(response);
      }
    } catch (error) {
      console.log(error);
    }
  },
};
