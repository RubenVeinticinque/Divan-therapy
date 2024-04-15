const db = require("../../database/models");

module.exports = {
  addressTherapist: async (req, res) => {
    const body = req.body;

    try {
      const therapistDb = await db.Therapists.findAll({
        where: { email: body.email },
      }).catch((error) => console.log(error));

      const establishmentDb = await db.Establishments.findAll({
        where: { id: therapistDb[0].dataValues.id_name_est },
      }).catch((error) => console.log(error));

      const establishmentTherapist = {
        address: establishmentDb[0].dataValues.name_establishment,
        email: therapistDb[0].dataValues.email,
        phone: therapistDb[0].dataValues.phone,
      };
      const response = {
        meta: {
          status: 200,
          total: 1,
          url: req.originalUrl,
        },
        data: establishmentTherapist,
      };

      res.json(response);
    } catch (error) {
      console.log(error);
    }
  },
};
