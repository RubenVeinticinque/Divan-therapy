const { body } = require("express-validator");
const { extname } = require("path");

const validateFormTherapists = [
  body("name")
    .notEmpty()
    .trim()
    .withMessage("Debes escribir un nombre")
    .isString()
    .matches("^([a-zA-Záéíóú'`´üäëïöÄËÏÖÜ]+)(s[a-zA-Z]+)*$")
    .withMessage("Debes ingresar caracteres alfabéticos"),
  body("lastname")
    .notEmpty()
    .trim()
    .withMessage("Debes escribir un apellido")
    .isString()
    .matches("^([a-zA-Záéíóú'`´üäëïöÄËÏÖÜ]+)(s[a-zA-Z]+)*$")
    .withMessage("Debes ingresar caracteres alfabéticos"),
  body("email")
    .notEmpty()
    .trim()
    .withMessage("Debes escribir un email")
    .bail()
    .isEmail()
    .withMessage("Debes escribir un correo válido"),
  body("birthdate")
    .notEmpty()
    .trim()
    .toDate()
    .withMessage("Debes seleccionar una fecha")
    .bail(),
  body("speciality")
    .notEmpty()
    .trim()
    .withMessage("Debes ingresar una especialidad")
    .isString()
    .withMessage("Debes ingresar caracteres alfabéticos")
    .bail()
    .matches("^([a-zA-Záéíóú'`´üäëïöÄËÏÖÜ ]+)(s[a-zA-Z]+)*$")
    .withMessage("Ingresa mayúsculas, minúsculas"),
  body("type_therapist")
    .notEmpty()
    .trim()
    .withMessage("Debes ingresar el tipo de terapeuta")
    .isString()
    .withMessage("Debes ingresar caracteres alfabéticos")
    .bail()
    .matches("^([a-zA-Záéíóú'`´üäëïöÄËÏÖÜ ]+)(s[a-zA-Z]+)*$")
    .withMessage("Ingresa mayúsculas, minúsculas"),
  body("phone")
    .notEmpty()
    .trim()
    .withMessage("Debes escribir un teléfono")
    .isInt()
    .withMessage("Debes ingresar sólo números")
    .bail()
    .isLength({ min: 13 })
    .withMessage("Debe contener 13 caracteres"),
  body("medical_registration")
    .notEmpty()
    .trim()
    .withMessage("Debes ingresar tu matrícula")
    .isInt()
    .withMessage("Debes ingresar sólo números")
    .bail(),
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
  body("zone")
    .notEmpty()
    .trim()
    .withMessage("Debes ingresar tu barrio")
    .matches("^([a-zA-Z0-9áéíóú'`´üäëïöÄËÏÖÜ°.]+)(s[a-zA-Z]+)*$")
    .withMessage("Ingresa números, mayúsculas ó minúsculas"),
  body("establishment")
    .notEmpty()
    .trim()
    .withMessage("Ingresa la dirección donde atenderas")
    .matches("^([a-zA-Z0-9áéíóú'`´üäëïöÄËÏÖÜ°. ]+)(s[a-zA-Z]+)*$")
    .withMessage("Ingresa números, mayúsculas ó minúsculas")
    .isLength({ min: 3 })
    .withMessage("Debe contener 3 caracteres"),
  body("gender")
    .notEmpty()
    .trim()
    .custom(async (value) => {
      if (value === "Seleccione su género") {
        throw new Error("Debes elegir una opción");
      }
    }),
];
const validateTherapistFile = [
  body("avatar").custom((value, { req }) => {
    let file = req.file;
    let extencionesAceptadas = [".jpg", ".png", ".gif"];

    //Mensaje de error cuando rechaza la carga de file.
    if (req.validationFileError) {
      throw new Error(req.validationFileError);
    } else {
      if (!file) {
        throw new Error("Debes subir una imagen");
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

module.exports = { validateFormTherapists, validateTherapistFile };
