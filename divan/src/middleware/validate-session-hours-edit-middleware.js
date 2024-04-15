const { body } = require("express-validator");

const validateSessionHoursEdit = [
  body("session_hours")
    .notEmpty()
    .withMessage("Debes ingresar el valor en minutos")
    .trim()
    .bail()
    .isInt()
    .withMessage("Debes ingresar caracteres numéricos")
    .exists()
    .withMessage("Las horas de sesión no es un valor válido"),
];

module.exports = validateSessionHoursEdit;
