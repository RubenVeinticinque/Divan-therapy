const db = require("../../database/models");
const { validationResult } = require("express-validator");
const bcryptjs = require("bcryptjs");

module.exports = {
  updateProfile: async (req, res) => {
    const body = req.body;
    const id = Number(body.id);
    const file = req.file;
    const errorFile = req.validationFileError;
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
        if (errorFile) {
          const response = {
            meta: {
              status: 200,
              url: req.originalUrl,
            },
            data: {
              avatar: {
                msg: errorFile,
              },
            },
          };
          return res.json(response);
        }

        const emailAdmin = "divantherapy.com";
        const passwordBcryptjs = bcryptjs.hashSync(body.password, 10);
        const userCategory = body.email.includes(emailAdmin);

        const usersDb = await db.Users.findByPk(id).catch((error) => {
          console.log(error);
        });
        const usersEmailDb = await db.Users.findAll().catch((error) => {
          console.log(error);
        });

        for (const i of usersEmailDb) {
          if (i.email === body.email && i.email !== usersDb.dataValues.email) {
            const response = {
              meta: {
                status: 200,
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

        const userUpdate = {
          ...body,
          id: id,
          avatar: file ? file.filename : usersDb.dataValues.avatar,
          password: passwordBcryptjs,
          id_user_category: userCategory ? 1 : 2,
        };

        const userUpdateOfdb = await db.Users.update(
          {
            ...userUpdate,
          },
          { where: { id: id } }
        );

        const response = {
          meta: {
            status: 200,
            total: validationErrors.errors.length,
            url: req.originalUrl,
          },
          data: "Modified profile",
        };
        return res.json(response);
      }
    } catch (err) {
      console.log(err);

      const response = {
        meta: {
          status: 200,
          total: validationErrors.errors.length,
          url: req.originalUrl,
        },
        data: "Error when editing profile",
      };
      return res.json(response);
    }
  },
};
