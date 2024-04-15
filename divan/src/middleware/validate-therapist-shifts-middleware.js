const { body } = require("express-validator");

const validateTherapistShifts = [
  body("date")
    .notEmpty()
    .withMessage("Debes seleccionar una fecha")
    .trim()
    .toDate()
    .withMessage("La fecha no es un valor válido")
    .bail(),
  body("modality")
    .notEmpty()
    .withMessage("Debes escribir una modalidad")
    .trim()
    .bail()
    .exists()
    .isIn(["Presencial", "En línea"])
    .withMessage("La modalidad no es un valor válido"),
];

module.exports = { validateTherapistShifts };
