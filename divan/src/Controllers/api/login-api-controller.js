const db = require("../../database/models");
const { validationResult } = require("express-validator");
const bcryptjs = require("bcryptjs");

module.exports = {
  processLogin: async (req, res) => {
    const body = req.body;
    const errorsValidationsLogin = validationResult(req);

    try {
      //Verifico si existe el usuario de DB según su email.
      const userDb = await db.Users.findAll({
        where: { email: body.email },
      }).catch((error) => {
        console.log(error);
      });

      if (!errorsValidationsLogin.isEmpty()) {
        const response = {
          meta: {
            status: 200,
            total: errorsValidationsLogin.errors.length,
            url: req.originalUrl,
          },
          data: errorsValidationsLogin.mapped(),
        };

        return res.json(response);
      } else {
        if (!userDb[0]) {
          const response = {
            meta: {
              status: 200,
              total: 1,
              url: req.originalUrl,
            },
            data: {
              email: {
                msg: "Email no registrado",
              },
            },
          };

          return res.json(response);
        } else {
          //Compara el password si son iguales.
          const passwordOk = bcryptjs.compareSync(
            body.password,
            userDb[0].dataValues.password
          );
          if (!passwordOk) {
            const response = {
              meta: {
                status: 200,
                total: 1,
                url: req.originalUrl,
              },
              data: {
                password: {
                  msg: "Credenciales no válidas",
                },
              },
            };

            return res.json(response);
          } else {
            //Verifico si el usuario es un terapista de DB según su email.
            const userIsTherapistDb = await db.Therapists.findAll({
              where: { email: body.email },
            }).catch((error) => {
              console.log(error);
            });

            const response = {
              meta: {
                status: 200,
                total: 1,
                url: req.originalUrl,
              },
              data: {
                id: userDb[0].dataValues.id,
                name: userDb[0].dataValues.name,
                lastname: userDb[0].dataValues.lastname,
                userEmail: userDb[0].dataValues.email,
                avatar: `http://localhost:3001/img/users/${userDb[0].dataValues.avatar}`,
                userIsTherapist: userIsTherapistDb[0] ? true : false,
              },
            };
            return res.json(response);
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  },
};
