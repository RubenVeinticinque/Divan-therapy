const { body } = require("express-validator");

const validateTherapistSearchEdit = [
  body("search")
    .notEmpty()
    .trim()
    .withMessage("Tienes que escribir el id del terapeuta")
    .isInt()
    .withMessage("Debes ingresar caracteres numéricos"),
];
const validateUserSearchEdit = [
  body("search")
    .notEmpty()
    .trim()
    .withMessage("Tienes que escribir el id del ususario")
    .isInt()
    .withMessage("Debes ingresar caracteres numéricos"),
];
const validatePriceSearchEdit = [
  body("search")
    .notEmpty()
    .trim()
    .withMessage("Tienes que escribir el id de honorarios")
    .isInt()
    .withMessage("Debes ingresar caracteres numéricos"),
];
const validateSessionsHoursSearchEdit = [
  body("search")
    .notEmpty()
    .trim()
    .withMessage("Tienes que escribir el id del horario")
    .isInt()
    .withMessage("Debes ingresar caracteres numéricos"),
];

module.exports = {
  validateTherapistSearchEdit,
  validateUserSearchEdit,
  validatePriceSearchEdit,
  validateSessionsHoursSearchEdit,
};
