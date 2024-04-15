const db = require("../../database/models");
const { validationResult } = require("express-validator");

module.exports = {
  contact: async (req, res) => {
    const body = req.body;
    const validationErrors = validationResult(req);

    try {
      if (!validationErrors.isEmpty()) {
        const response = {
          meta: {
            status: 200,
            total: validationErrors.errors.length,
            url: req.originalUrl,
          },
          data: validationErrors.mapped(),
        };

        return res.json(response);
      } else {
        const contactCreate = await db.Contacts.create({
          name: body.name,
          lastname: body.lastname,
          email: body.email,
          description: body.description,
        });
        const contactsDb = await db.Contacts.findAll().catch((error) => {
          console.log(error);
        });

        const contactsUsersCreate = await db.Users_contacts.create({
          id_user: body.id,
          id_contact: contactCreate.id,
          quantity_contacts: contactsDb.length,
        }).catch((error) => {
          console.log(error);
        });

        const response = {
          meta: {
            status: 200,
            total: validationErrors.errors.length,
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
