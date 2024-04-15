const { body } = require("express-validator");

const validatePriceEdit = [
  body("price")
    .notEmpty()
    .withMessage("Debes ingresar el valor de honorarios")
    .trim()
    .bail()
    .isInt()
    .withMessage("Debes ingresar caracteres numéricos")
    .exists()
    .withMessage("Honorarios no es un valor válido"),
];

module.exports = validatePriceEdit;
