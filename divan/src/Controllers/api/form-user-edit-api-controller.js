const db = require("../../database/models");
const { validationResult } = require("express-validator");
const bcryptjs = require("bcryptjs");

module.exports = {
  userUpdate: async (req, res) => {
    const body = req.body;
    const file = req.file;
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
        const userDb = await db.Users.findByPk(body.id).catch((error) => {
          console.log(error);
        });
        const usersDb = await db.Users.findAll().catch((error) => {
          console.log(error);
        });

        for (const i of usersDb) {
          if (body.email === i.email && Number(body.id) !== i.id) {
            const response = {
              meta: {
                status: 200,
                total: 1,
                url: req.originalUrl,
              },
              data: {
                email: {
                  msg: "Este email esta registrado",
                },
              },
            };

            return res.json(response);
          }
        }

        const category = body.category === "Admin" ? 1 : 2;

        const passwordBcryptjs = bcryptjs.hashSync(body.password, 10);

        const newUserUpdate = {
          ...body,
          avatar: file ? file.filename : userDb.dataValues.avatar,
          password: passwordBcryptjs,
          id_user_category: category,
        };

        const userUpdate = await db.Users.update(
          { ...newUserUpdate },
          { where: { id: body.id } }
        ).catch((error) => {
          console.log(error);
        });

        const response = {
          meta: {
            status: 200,
            total: 1,
            url: req.originalUrl,
          },
          data: "User update",
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
