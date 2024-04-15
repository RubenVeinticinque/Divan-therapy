const { body } = require("express-validator");

const validateUsersMessages = [
  body("countries")
    .notEmpty()
    .trim()
    .custom(async (value) => {
      if (value === "Seleccione el país") {
        throw new Error("Debes elegir una opción");
      }
    })
    .bail(),
  body("provinces")
    .notEmpty()
    .trim()
    .custom(async (value) => {
      if (value === "Seleccione la provincia") {
        throw new Error("Debes elegir una opción");
      }
    })
    .bail(),
  body("cities")
    .notEmpty()
    .trim()
    .custom(async (value) => {
      if (value === "Seleccione la ciudad") {
        throw new Error("Debes elegir una opción");
      }
    })
    .bail(),
  body("description")
    .notEmpty()
    .trim()
    .withMessage("Ingresa alguna descripción")
    .bail()
    .matches("^([a-zA-Z0-9°áéíóú.,'`´üäëïöÄËÏÖÜ ]+)(s[a-zA-Z]+)*$")
    .withMessage("Deben ser caracteres alfanuméricos")
    .isLength({ min: 20 })
    .withMessage("Debe contener mpinimo 20 caracteres")
    .isLength({ max: 255 })
    .withMessage("Debe contener máximo 255 caracteres"),
];

module.exports = validateUsersMessages;
