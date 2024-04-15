const { body } = require("express-validator");

const validateContact = [
  body("name")
    .notEmpty()
    .trim()
    .withMessage("Tienes que escribir un nombre")
    .bail()
    .isString()
    .matches("^([a-zA-Záéíóú'`´üäëïöÄËÏÖÜ]+)(s[a-zA-Z]+)*$")
    .withMessage("Debes ingresar caracteres alfabéticos"),
  body("lastname")
    .notEmpty()
    .trim()
    .withMessage("Tienes que escribir un apellido")
    .bail()
    .isString()
    .matches("^([a-zA-Záéíóú'`´üäëïöÄËÏÖÜ]+)(s[a-zA-Z]+)*$")
    .withMessage("Debes ingresar caracteres alfabéticos"),
  body("email")
    .notEmpty()
    .trim()
    .withMessage("Tienes que escribir un email")
    .bail()
    .isEmail()
    .withMessage("Escribe un formato de correo válido"),
  body("description")
    .notEmpty()
    .trim()
    .withMessage("Ingresa alguna descripción")
    .bail()
    .matches("^([a-zA-Z0-9áéíóú°.,'`´üäëïöÄËÏÖÜ ]+)(s[a-zA-Z]+)*$")
    .withMessage("Deben ser caracteres alfanuméricos")
    .isLength({ min: 20 })
    .withMessage("Debe contener mínimo 20 caracteres")
    .isLength({ max: 255 })
    .withMessage("Debe contener máximo 255 caracteres"),
];

module.exports = validateContact;
