const db = require("../../database/models");
const { validationResult } = require("express-validator");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");

require("dotenv").config();

let tokenCopy = "";

module.exports = {
  forgetPasswordProccess: async (req, res) => {
    const body = req.body;
    const validationErrors = validationResult(req);

    try {
      //Verifico si existe el usuario de DB según su email.
      const userDb = await db.Users.findAll({ where: { email: body.email } });

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
        if (!userDb[0]) {
          const response = {
            meta: {
              status: 200,
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
          const userFromJwt = {
            name: userDb[0].dataValues.name,
            lastname: userDb[0].dataValues.lastname,
            email: userDb[0].dataValues.email,
          };

          const token = jwt.sign(userFromJwt, process.env.PRIVATE_KEY, {
            expiresIn: "3m",
          });

          tokenCopy += token;

          const transporter = nodemailer.createTransport({
            service: "Gmail",
            auth: {
              user: process.env.USER,
              pass: process.env.PASSWORD_GENERATED,
            },
          });
          const mailOptions = {
            from: process.env.USER,
            to: process.env.USER, //Valor correspondiente body.email.Valor de prueba process.env.USER
            subject: "Olvido de contraseña",
            html: `<h3>Sigue estos pasos para poder iniciar sesión, has click en Link nuevo password</h3><br>
          <a href="http://localhost:3000/new-password/${token}" style="text-decoration:none;font-size:1rem;background-color:#fe5b00;color:#ffffff;width:max-content;padding:12px;margin:25px;display:flex;justify-content:center;align-items:center;border-radius:8px">Link new password</a>
          `,
          };
          transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
              console.log(error);

              const response = {
                meta: {
                  status: 200,
                  url: req.originalUrl,
                },
                data: "Mail sending error",
              };

              return res.json(response);
            } else {
              console.log("Mensaje enviado" + info.response);

              const response = {
                meta: {
                  status: 200,
                  url: req.originalUrl,
                },
                data: "Email sent",
              };

              return res.json(response);
            }
          });
        }
      }
    } catch (error) {
      console.log(error);
      const response = {
        meta: {
          status: 200,
          url: req.originalUrl,
        },
        data: "Error sending email",
      };

      return res.json(response);
    }
  },
};
