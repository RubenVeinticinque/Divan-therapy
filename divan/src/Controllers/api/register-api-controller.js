const db = require("../../database/models");
const { validationResult } = require("express-validator");
const bcryptjs = require("bcryptjs");

module.exports = {
  processRegister: async (req, res) => {
    const body = req.body;
    const file = req.file;
    const emailAdmin = "divantherapy.com";
    const errorsValidationsRegister = validationResult(req);

    try {
      //Encriptar el password.
      const passwordBcryptjs = bcryptjs.hashSync(body.password, 10);
      //Compara el password si son iguales.
      const passwordOk = bcryptjs.compareSync(body.password2, passwordBcryptjs);
      //Verifico si existe el usuario de DB según su email.
      const userDb = await db.Users.findAll({ where: { email: body.email } });

      if (!errorsValidationsRegister.isEmpty()) {
        const response = {
          meta: {
            status: 200,
            total: errorsValidationsRegister.errors.length,
            url: req.originalUrl,
          },
          data: errorsValidationsRegister.mapped(),
        };
        return res.json(response);
      } else {
        //Si el email existe en la DB; mensaje.
        if (userDb[0] !== undefined) {
          const userEmail = userDb[0].dataValues.email;

          if (userEmail) {
            const response = {
              meta: {
                status: 200,
                total: 1,
                url: req.originalUrl,
              },
              data: {
                email: {
                  msg: "El email ya esta registrado",
                },
              },
            };
            return res.json(response);
          }
        } else if (!passwordOk) {
          const response = {
            meta: {
              status: 200,
              total: 1,
              url: req.originalUrl,
            },
            data: {
              password2: {
                msg: "Credenciales no válidas",
              },
            },
          };
          return res.json(response);
        } else {
          const userCategory = body.email.includes(emailAdmin);

          const newUser = await db.Users.create({
            name: body.name,
            lastname: body.lastname,
            email: body.email,
            avatar: file.filename,
            password: passwordBcryptjs,
            id_user_category: userCategory ? 1 : 2,
          });
          const response = {
            meta: {
              status: 200,
              total: errorsValidationsRegister.errors.length,
              url: req.originalUrl,
            },
            data: errorsValidationsRegister.mapped(),
          };
          return res.json(response);
        }
      }
    } catch (err) {
      console.log(err);
    }
  },
};
