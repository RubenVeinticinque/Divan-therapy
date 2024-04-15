const { body } = require("express-validator");

const validateLogin = [
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

module.exports = validateLogin;
