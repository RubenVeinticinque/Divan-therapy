const db = require("../../database/models");
const { validationResult } = require("express-validator");
const bcryptjs = require("bcryptjs");

module.exports = {
  newPasswordProccess: async (req, res) => {
    const body = req.body;
    const validationErrors = validationResult(req);

    try {
      if (!validationErrors.isEmpty()) {
        const response = {
          meta: {
            status: 200,
            url: req.originalUrl,
          },
          data: validationErrors.mapped(),
        };

        return res.json(response);
      } else {
        if (body.password !== body.password2) {
          const response = {
            meta: {
              status: 200,
              url: req.originalUrl,
            },
            data: {
              password2: {
                msg: "Credenciales no válidas",
              },
            },
          };

          return res.json(response);
        }
        //Contiene el email del usuario.
        if (body.email) {
          const userDb = await db.Users.findAll({
            where: { email: body.email },
          }).catch((error) => {
            console.log(error);
          });

          if (userDb[0]) {
            //Encriptar el nuevo password.
            const newPasswordBcryptjs = bcryptjs.hashSync(body.password, 10);

            const passwordUpdate = await db.Users.update(
              { password: newPasswordBcryptjs },
              { where: { id: userDb[0].id } }
            );

            const response = {
              meta: {
                status: 200,
                url: req.originalUrl,
              },
              data: "Modified password",
            };

            return res.json(response);
          } else {
            const response = {
              meta: {
                status: 200,
                url: req.originalUrl,
              },
              data: "Unmodified password",
            };

            return res.json(response);
          }
        } else {
          const response = {
            meta: {
              status: 200,
              url: req.originalUrl,
            },
            data: "Error email",
          };

          return res.json(response);
        }
      }
    } catch (error) {
      console.log(error);
      const response = {
        meta: {
          status: 200,
          url: req.originalUrl,
        },
        data: "Error when changing password",
      };

      return res.json(response);
    }
  },
};
