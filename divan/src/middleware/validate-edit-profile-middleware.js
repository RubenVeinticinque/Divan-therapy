const { body } = require("express-validator");
const { extname } = require("path");

const validateEditProfile = [
  body("name")
    .notEmpty()
    .trim()
    .withMessage("Tienes que escribir un nombre")
    .isString()
    .matches("^(?=.*[a-zA-Z'`üäëïöÄËÏÖÜ])")
    .withMessage("Debes ingresar caracteres alfabéticos"),
  body("lastname")
    .notEmpty()
    .trim()
    .withMessage("Tienes que escribir un apellido")
    .isString()
    .matches("^(?=.*[a-zA-Z'`üäëïöÄËÏÖÜ])")
    .withMessage("Debes ingresar caracteres alfabéticos"),
  body("email")
    .notEmpty()
    .trim()
    .withMessage("Tienes que escribir un email")
    .bail()
    .isEmail()
    .withMessage("Debes escribir un correo válido"),
  body("password")
    .notEmpty()
    .trim()
    .withMessage("Tienes que escribir una contraseña")
    .bail()
    .isLength({ min: 6 })
    .withMessage("Debe contener 6 caracteres")
    .matches("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{6,})")
    .withMessage(
      "Debe contener un número,una mayúscula,una minúscula y un caracter especial (@$!%*?&)"
    ),
];
const validateEditProfileFile = [
  body("avatar").custom((value, { req }) => {
    let file = req.file;
    let extencionesAceptadas = [".jpg", ".png", ".gif"];

    if (req.validationFileRegisterError) {
      throw new Error(req.validationFileRegisterError);
    } else {
      if (!file) {
        return true;
      } else {
        let fileExtension = extname(file.originalname);
        if (!extencionesAceptadas.includes(fileExtension)) {
          throw new Error(
            `Las extensiones permitidas son ${extencionesAceptadas.join(", ")}`
          );
        }
      }
    }
    return true;
  }),
];

module.exports = { validateEditProfile, validateEditProfileFile };
